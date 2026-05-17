import Anthropic from "@anthropic-ai/sdk";
import { readFileSync } from "fs";
import { join } from "path";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const MODEL = "claude-sonnet-4-20250514";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AgentScreenshot {
  appName: string;
  url: string;
  stepLabel?: string;
}

export interface AgentInput {
  category: string;
  flowType: string;
  screenshots?: AgentScreenshot[];
  competitors?: string[];
}

// ─── System prompt ────────────────────────────────────────────────────────────

// Loaded from prompts/system-prompt.md at runtime.
// Embedded fallback keeps the server running if the file is somehow missing.
const EMBEDDED_SYSTEM_PROMPT = `You are UX Scout, an AI UX intelligence analyst.
Produce a structured UX intelligence report with exactly these 6 sections:
# 1. Executive Summary
# 2. Competitor Feature Matrix
# 3. UX Pattern Analysis
# 4. Screenshot Journey Map
# 5. Comparative Insights
# 6. Product Recommendations
Be specific. Reference actual app names. Use concrete, actionable language. Format in clean markdown.`;

function loadSystemPrompt(): string {
  try {
    return readFileSync(
      join(process.cwd(), "prompts", "system-prompt.md"),
      "utf-8"
    );
  } catch {
    console.warn("[agent] prompts/system-prompt.md not found — using fallback");
    return EMBEDDED_SYSTEM_PROMPT;
  }
}

// ─── Message builder ──────────────────────────────────────────────────────────

function isRealUrl(url: string): boolean {
  return url.startsWith("https://") && !url.includes("placeholder");
}

function buildUserMessage(
  input: AgentInput
): Anthropic.Messages.MessageParam {
  const { category, flowType, screenshots = [], competitors = [] } = input;

  const realScreenshots = screenshots.filter((s) => isRealUrl(s.url));
  const hasImages = realScreenshots.length > 0;

  // ── Text preamble ──────────────────────────────────────────────────────────
  const lines: string[] = [
    `Product category: ${category}`,
    `Flow type: ${flowType}`,
  ];

  if (competitors.length > 0) {
    lines.push(`Apps to analyze: ${competitors.join(", ")}`);
  }

  if (hasImages) {
    lines.push(
      `\nAnalyze these ${realScreenshots.length} competitor screenshots and produce the full 6-section report:`
    );
  } else if (screenshots.length > 0) {
    // Named apps but no real images — knowledge-based analysis
    const appList = [...new Set(screenshots.map((s) => s.appName))];
    lines.push(
      `\nAnalyze the following apps — no screenshot images are available, so base the analysis on your knowledge of these products:`
    );
    lines.push(appList.map((name, i) => `${i + 1}. ${name}`).join("\n"));
  } else {
    lines.push(
      `\nNo screenshots provided. Use your knowledge of the top apps in this category to produce the full report. Note this in the Executive Summary.`
    );
  }

  const preamble: Anthropic.Messages.TextBlockParam = {
    type: "text",
    text: lines.join("\n"),
  };

  // ── Multimodal content (when real images are present) ──────────────────────
  if (!hasImages) {
    return { role: "user", content: [preamble] };
  }

  const content: Anthropic.Messages.ContentBlockParam[] = [preamble];

  for (const screenshot of realScreenshots) {
    // Label each image so Claude can reference it by name in the report
    content.push({
      type: "text",
      text: `\n**${screenshot.appName}${screenshot.stepLabel ? ` — ${screenshot.stepLabel}` : ""}**`,
    });

    content.push({
      type: "image",
      source: {
        type: "url",
        url: screenshot.url,
      } as Anthropic.Messages.URLImageSource,
    });
  }

  return { role: "user", content };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function generateReport(input: AgentInput): Promise<string> {
  const systemPrompt = loadSystemPrompt();

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8192,
    system: systemPrompt,
    messages: [buildUserMessage(input)],
  });

  const block = response.content[0];
  if (block.type !== "text") throw new Error("Unexpected response type from Claude");
  return block.text;
}
