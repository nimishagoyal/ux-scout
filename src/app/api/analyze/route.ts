/**
 * POST /api/analyze
 * Nimisha + Jose own this endpoint.
 *
 * 1. Fetch screenshots from Mobbin (Nimisha)
 * 2. Pass them to Claude for analysis (Jose)
 * 3. Return the report markdown + screenshots used
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchScreenshots } from "@/lib/mobbin";
import { generateReport } from "@/lib/claude";
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
    const screenshots = await fetchScreenshots(category, flowType);

    // Step 2: generate the 6-section report via Claude
    const report = await generateReport(category, flowType, screenshots);

    const response: AnalyzeResponse = { report, screenshots };
    return NextResponse.json(response);
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
