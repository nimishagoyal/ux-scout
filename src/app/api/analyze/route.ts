/**
 * POST /api/analyze
 *
 * Direct Anthropic API + bundled fallback screenshots (from public/).
 * Mobbin MCP path was dropped as unreliable; the CLI exec'd "claude -p"
 * trick only worked on Nimisha's local machine. Fallback PNGs ship with
 * the repo and Claude analyzes them as multimodal inputs.
 */

import { NextRequest, NextResponse } from "next/server";
import { generateReport } from "@/lib/claude";
import { loadFallbackScreenshots } from "@/lib/fallbackScreenshots";
import type { AnalyzeRequest } from "@/types";

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

    const fallbackImages = loadFallbackScreenshots();
    if (fallbackImages.length > 0) {
      console.log(
        `[/api/analyze] Using ${fallbackImages.length} fallback screenshots from public/`
      );
    }

    const report = await generateReport(
      category,
      flowType,
      fallbackImages.length > 0 ? fallbackImages : undefined
    );

    return NextResponse.json({ report });
  } catch (err) {
    console.error("[/api/analyze]", err);
    return NextResponse.json(
      { error: "Analysis failed. Check server logs." },
      { status: 500 }
    );
  }
}
