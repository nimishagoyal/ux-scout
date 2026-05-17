/**
 * POST /api/analyze
 *
 * Strategy (in priority order):
 *   1. CLI path — runs `claude -p` with Mobbin MCP tools for live screenshots
 *   2. Direct API path — claude.ts with Mobbin MCP via mcp_servers (if MOBBIN_AUTH_TOKEN set)
 *   3. Fallback screenshots — base64 images from public/ via fallbackScreenshots.ts
 *   4. Knowledge-based — Claude uses its training knowledge of top apps
 */

import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { generateReport } from "@/lib/claude";
import { loadFallbackScreenshots } from "@/lib/fallbackScreenshots";
import type { AnalyzeRequest } from "@/types";

const execAsync = promisify(exec);

const CLI_PROMPT = (category: string, flowType: string) => `
You are UX Scout, an AI UX intelligence analyst with access to the Mobbin MCP tool.

STEP 1 — Search Mobbin:
- Use mobbin_search_flows to find the ${flowType} flow for ${category} apps
- Pick 3-5 apps from the results
- For each app, call get_screen_detail on 2-3 screens to get the actual images
- Note the image URLs returned by get_screen_detail

STEP 2 — Write the report in markdown with EXACTLY these 6 sections. Follow the formatting rules precisely.

# 1. Executive Summary

# 2. Competitor Feature Matrix
(markdown table comparing key UX decisions across apps — use ✓ / ✗)

# 3. UX Pattern Analysis
For EACH pattern use this format:
### [Pattern Name]
- **Frequency:** X of N apps
- **What it is:** ...
- **Why it works:** ...
- **Tradeoff:** ...

# 4. Screenshot Journey Map
For EACH app use this format:
### [App Name]
1. **[Screen name]** — description
2. ...
Embed real screenshots: ![App — Screen](image_url)

# 5. Comparative Insights
> **[X of N apps] [do something]** — explanation

# 6. Product Recommendations
For EACH of the 5 recommendations use this format (blank lines between fields required):

### [N]. [Short title]

**Priority:** High / Medium / Low

**Recommendation:** [verb-led action]

**Rationale:** ...

**Competitor examples:** ...

**Expected UX impact:** ...

Be specific. Reference actual app names. Use concrete, actionable language.
`.trim();

async function generateReportViaCLI(
  category: string,
  flowType: string
): Promise<string> {
  const prompt = CLI_PROMPT(category, flowType)
    .replace(/"/g, '\\"')
    .replace(/\n/g, " ");

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not set");

  const home = process.env.HOME || "/Users/nimishagoyal";
  const claudeBin = `${home}/.nvm/versions/node/v22.16.0/bin/claude`;

  const { stdout, stderr } = await execAsync(
    `"${claudeBin}" -p "${prompt}" --allowedTools "mcp__mobbin__*" --model claude-sonnet-4-20250514 < /dev/null`,
    {
      timeout: 300000,
      maxBuffer: 1024 * 1024 * 10,
      cwd: home,
      env: {
        ...process.env,
        ANTHROPIC_API_KEY: apiKey,
        HOME: home,
        PATH: `${home}/.nvm/versions/node/v22.16.0/bin:${process.env.PATH}`,
      },
    }
  );

  if (stderr && !stdout) throw new Error(stderr);
  return stdout.trim();
}

// After Claude generates the report using fallback images, inject the public
// image URLs as markdown images into each app's journey section so the UI
// can render actual screenshots instead of wireframe placeholders.
function injectFallbackImageUrls(
  report: string,
  fallbackImages: import("@/lib/fallbackScreenshots").FallbackImage[]
): string {
  const byApp: Record<string, string[]> = {};
  for (const img of fallbackImages) {
    if (!byApp[img.appName]) byApp[img.appName] = [];
    byApp[img.appName].push(img.publicUrl);
  }

  return report.replace(/^(### )(.+)$/gm, (match, _prefix, name) => {
    const trimmed = name.trim();
    // Find a matching app name (case-insensitive, partial match)
    const appName = Object.keys(byApp).find(
      (a) => trimmed.toLowerCase().includes(a.toLowerCase()) || a.toLowerCase().includes(trimmed.toLowerCase())
    );
    const urls = appName ? byApp[appName] : undefined;
    if (!urls || urls.length === 0) return match;
    const imgTags = urls
      .map((url, i) => `![${appName} — Screenshot ${i + 1}](${url})`)
      .join("\n");
    return `${match}\n${imgTags}`;
  });
}

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json();
    const { category, flowType } = body;

    if (!category || !flowType) {
      return NextResponse.json(
        { error: "category and flowType are required" },
        { status: 400 }
      );
    }

    let report: string;

    // Always load fallback images — used for Claude vision AND for injecting
    // public URLs into the journey section regardless of which path runs.
    const fallbackImages = loadFallbackScreenshots();

    try {
      // Path 1: CLI with live Mobbin MCP
      report = await generateReportViaCLI(category, flowType);
    } catch (cliErr) {
      console.warn(
        "[/api/analyze] CLI path failed, falling back to direct API:",
        cliErr
      );
      // Path 2 & 3: direct API (uses Mobbin MCP token if set, else fallback screenshots, else knowledge)
      if (fallbackImages.length > 0) {
        console.log(
          `[/api/analyze] Using ${fallbackImages.length} fallback screenshots from public/`
        );
      }
      report = await generateReport(
        category,
        flowType,
        fallbackImages.length > 0 ? fallbackImages : undefined
      );
    }

    // Always inject fallback screenshot URLs so the UI shows real images.
    // This runs for both CLI and direct-API paths.
    if (fallbackImages.length > 0) {
      report = injectFallbackImageUrls(report, fallbackImages);
    }

    return NextResponse.json({ report });
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
