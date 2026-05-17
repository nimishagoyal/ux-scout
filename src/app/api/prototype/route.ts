/**
 * POST /api/prototype
 * Muyun owns this endpoint.
 *
 * Takes the generated report + 3-question interview answers,
 * returns a Lovable/Bolt-ready prototype prompt.
 */

import { NextRequest, NextResponse } from "next/server";
import { generatePrototypePrompt } from "@/lib/claude";

interface PrototypeRequest {
  report: string;
  productDescription: string;
  targetUser: string;
  topGoal: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: PrototypeRequest = await req.json();
    const { report, productDescription, targetUser, topGoal } = body;

    if (!report || !productDescription || !targetUser || !topGoal) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const prompt = await generatePrototypePrompt(
      report,
      productDescription,
      targetUser,
      topGoal
    );

    return NextResponse.json({ prompt });
  } catch (err) {
    console.error("[/api/prototype]", err);
    return NextResponse.json(
      { error: "Prototype prompt generation failed. Check server logs." },
      { status: 500 }
    );
  }
}
