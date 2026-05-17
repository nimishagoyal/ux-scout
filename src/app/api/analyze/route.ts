/**
 * POST /api/analyze
 * Nimisha + Jose own this endpoint.
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
    let screenshots: object[] = [];

    // Extract ![alt](url) images embedded by Claude in the report
    function extractEmbeddedScreenshots(md: string): object[] {
      const regex = /!\[([^\]]*)\]\((https?:\/\/[^)]+)\)/g;
      const found: object[] = [];
      let match;
      while ((match = regex.exec(md)) !== null) {
        const alt = match[1]; // e.g. "Coinbase — Home Screen"
        const url = match[2];
        const appName = alt.split(/[—–-]/)[0].trim() || "App";
        found.push({
          id: `embedded-${found.length}`,
          appName,
          imageUrl: url,
          flowType,
          platform: "ios",
          stepLabel: alt.split(/[—–-]/).slice(1).join("—").trim() || undefined,
        });
      }
      return found;
    }

    try {
      // Path 1: CLI with live Mobbin MCP
      report = await generateReportViaCLI(category, flowType);
      screenshots = extractEmbeddedScreenshots(report);
    } catch (cliErr) {
      console.warn(
        "[/api/analyze] CLI path failed, falling back to direct API:",
        cliErr
      );
      // Path 2 & 3: direct API (uses Mobbin MCP token if set, else fallback screenshots, else knowledge)
      const fallbackImages = loadFallbackScreenshots();
      report = await generateReport(
        category,
        flowType,
        fallbackImages.length > 0 ? fallbackImages : undefined
      );

      // Check if Claude embedded Mobbin image URLs in the report (API MCP path)
      const embedded = extractEmbeddedScreenshots(report);
      if (embedded.length > 0) {
        screenshots = embedded;
      } else if (fallbackImages.length > 0) {
        // Fall back to returning the base64 images we sent to Claude
        console.log(`[/api/analyze] Used ${fallbackImages.length} fallback screenshots`);
        screenshots = fallbackImages.map((img, i) => ({
          id: `fallback-${i}`,
          appName: img.appName,
          imageUrl: `data:${img.mediaType};base64,${img.base64}`,
          flowType,
          platform: "ios",
          stepLabel: img.filename
            .replace(/\.png$|\.jpg$/i, "")
            .replace(/^\S+ \d+$/, `Screen ${i + 1}`),
        }));
      }
    }

    return NextResponse.json({ report, screenshots });
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
