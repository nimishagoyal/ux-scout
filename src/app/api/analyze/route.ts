/**
 * POST /api/analyze
 * Nimisha + Jose own this endpoint.
 *
 * 1. Fetch screenshots from Mobbin (Nimisha)
 * 2. Pass them to the Claude agent for analysis (Jose)
 * 3. Return the report markdown + screenshots used
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchScreenshots } from "@/lib/mobbin";
import { generateReport } from "@/lib/agent";
import type { AnalyzeRequest, AnalyzeResponse } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: AnalyzeRequest = await req.json();
    const { category, flowType, competitors } = body;

    if (!category || !flowType) {
      return NextResponse.json(
        { error: "category and flowType are required" },
        { status: 400 }
      );
    }

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
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
