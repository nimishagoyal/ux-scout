/**
 * POST /api/prototype
 * Muyun owns this endpoint.
 *
 * Takes the generated report + branching interview answers + selected recommendations,
 * returns a Lovable/Bolt-ready prototype prompt.
 */

import { NextRequest, NextResponse } from "next/server";
import { generatePrototypePrompt } from "@/lib/claude";
import type { PrototypeInterviewAnswers, Recommendation } from "@/types";

interface PrototypeRequest {
  report: string;
  answers: PrototypeInterviewAnswers;
  recommendations: Recommendation[];
}

export async function POST(req: NextRequest) {
  try {
    const body: PrototypeRequest = await req.json();
    const { report, answers, recommendations } = body;

    if (!report || !answers || !recommendations || recommendations.length === 0) {
      return NextResponse.json(
        { error: "Report, answers, and at least one recommendation are required." },
        { status: 400 }
      );
    }

    const prompt = await generatePrototypePrompt(report, answers, recommendations);

    return NextResponse.json({ prompt });
  } catch (err) {
    console.error("[/api/prototype]", err);
    return NextResponse.json(
      { error: "Prototype prompt generation failed. Check server logs." },
      { status: 500 }
    );
  }
}
