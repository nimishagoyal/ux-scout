/**
 * POST /api/analyze
 * Nimisha + Jose own this endpoint.
 *
<<<<<<< Updated upstream
 * 1. Fetch screenshots from Mobbin (Nimisha)
 * 2. Pass them to the Claude agent for analysis (Jose)
 * 3. Return the report markdown + screenshots used
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchScreenshots } from "@/lib/mobbin";
import { generateReport } from "@/lib/agent";
import type { AnalyzeRequest, AnalyzeResponse } from "@/types";
=======
 * Strategy:
 *   - If ANTHROPIC_API_KEY is set, call Claude directly (with Mobbin MCP if token available)
 *   - Mobbin MCP is accessed via the Claude Code CLI, which holds the OAuth session
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

STEP 2 — Write the report in markdown with EXACTLY these 6 sections:

# 1. Executive Summary

# 2. Competitor Feature Matrix
(markdown table comparing key UX decisions across apps)

# 3. UX Pattern Analysis
(top 3-5 recurring patterns with description, frequency, why it works)

# 4. Screenshot Journey Map
For each app, embed the actual screenshots inline using markdown image syntax:
![App Name — Screen Description](image_url)
Then narrate what is happening at each step of the flow.

# 5. Comparative Insights
(3-5 stat-style callouts)

# 6. Product Recommendations
(5 prioritized recommendations with rationale, competitor examples, priority level)

IMPORTANT: In section 4, always embed the real screenshot images using ![description](url) — do not skip the images.
Be specific. Reference actual app names. Use concrete, actionable language.
`.trim();

async function generateReportViaCLI(category: string, flowType: string): Promise<string> {
  const prompt = CLI_PROMPT(category, flowType).replace(/"/g, '\\"').replace(/\n/g, " ");

  // claude -p runs a non-interactive one-shot query and exits
  // --allowedTools lets it use the Mobbin MCP tools
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
>>>>>>> Stashed changes

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

<<<<<<< Updated upstream
    // Step 1: fetch screenshots from Mobbin (returns [] if MCP not connected)
    const mobbinScreenshots = await fetchScreenshots(category, flowType);

    // Map MobbinScreenshot → AgentScreenshot (normalize field names)
    const screenshots = mobbinScreenshots.map((s) => ({
      appName: s.appName,
      url: s.imageUrl,
      stepLabel: s.stepLabel,
    }));

    // Step 2: generate the 6-section report via Claude agent
    const report = await generateReport({
      category,
      flowType,
      screenshots,
      competitors,
    });

    const response: AnalyzeResponse = { report, screenshots: mobbinScreenshots };
    return NextResponse.json(response);
=======
    let report: string;

    // 1. Try CLI path (live Mobbin MCP access)
    // 2. Fall back to direct API with local fallback screenshots
    // 3. Last resort: knowledge-based only
    try {
      report = await generateReportViaCLI(category, flowType);
    } catch (cliErr) {
      console.warn("[/api/analyze] CLI path failed, trying fallback screenshots:", cliErr);
      const fallbackImages = loadFallbackScreenshots();
      report = await generateReport(category, flowType, fallbackImages.length > 0 ? fallbackImages : undefined);
      if (fallbackImages.length > 0) {
        console.log(`[/api/analyze] Used ${fallbackImages.length} fallback screenshots`);
      }
    }

    return NextResponse.json({ report });
>>>>>>> Stashed changes
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
