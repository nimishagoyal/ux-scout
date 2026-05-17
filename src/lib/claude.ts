import Anthropic from "@anthropic-ai/sdk";
import type { PrototypeInterviewAnswers, Recommendation } from "@/types";
import { IMPROVEMENT_AREA_OPTIONS } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";

const REPORT_SYSTEM_PROMPT = `You are UX Scout, an AI UX intelligence analyst.

You have access to Mobbin — a library of 600,000+ real app screenshots and flows. Use the Mobbin search tools to find relevant screenshots before writing the report.

Search strategy:
1. Use mobbin_search_screens or mobbin_search_flows to find screens for the given category and flow type
2. Fetch detail for the most relevant screens using get_screen_detail
3. Analyze what you find and produce the report

Produce a structured UX intelligence report with exactly these 6 sections:

# 1. Executive Summary
A high-level overview of what products were analyzed, key UX trends, major strengths/weaknesses, and top recommendations.

# 2. Competitor Feature Matrix
A markdown table comparing key UX decisions across products (e.g. goal selection, account creation timing, progress bar, social proof, etc.)

# 3. UX Pattern Analysis
The top 3–5 recurring UX patterns with: description, frequency across competitors, why it works, and tradeoffs.

# 4. Screenshot Journey Map
Narrate the flow step-by-step for each competitor. Describe what happens at each screen, key decision moments, and where friction or motivation is introduced.

# 5. Comparative Insights
3–5 stat-style callouts. Examples: "78% of top apps use progress indicators during onboarding", "Most competitors defer sign-up until after value demonstration."

# 6. Product Recommendations
5 prioritized recommendations tailored to the product context. Each must include: the recommendation, rationale, supporting competitor examples, expected UX impact, and priority (High/Medium/Low).

Be specific. Reference actual app names and screens you found. Use concrete, actionable language. Format everything in clean markdown.

Product category: {category}
Flow type: {flow_type}`;

const PROTOTYPE_SYSTEM_PROMPT = `You are UX Scout, an AI product design assistant.

Based on the UX intelligence report and the user's product context, generate a detailed, ready-to-use prototype prompt for Lovable or Bolt.

The prompt should:
- Describe a complete, specific app experience to build
- Reference the best UX patterns identified in the report
- Be tailored to the user's product, target user, and top goal
- Be detailed enough that pasting it directly into Lovable produces a real, working prototype
- Include specific UI details: screens, flows, components, copy tone, visual style
- Include realistic placeholder data

Format the output as a single code block containing the prompt text — nothing else.`;

const MOBBIN_MCP_URL = "https://api.mobbin.com/mcp";

function getMobbinMcpServers() {
  const token = process.env.MOBBIN_AUTH_TOKEN;
  if (!token) return undefined;
  return [
    {
      type: "url" as const,
      url: MOBBIN_MCP_URL,
      name: "mobbin",
      authorization_token: token,
    },
  ];
}

export async function generateReport(
  category: string,
  flowType: string,
  fallbackImages?: import("./fallbackScreenshots").FallbackImage[]
): Promise<string> {
  const systemPrompt = REPORT_SYSTEM_PROMPT.replace(
    "{category}",
    category
  ).replace("{flow_type}", flowType);

  const mcpServers = getMobbinMcpServers();

  let userMessage: Anthropic.MessageParam["content"];

  if (mcpServers) {
    userMessage = `Search Mobbin for ${category} apps focusing on the ${flowType} flow. Find 3–5 relevant apps, fetch screen details, then produce the full 6-section UX intelligence report.`;
  } else if (fallbackImages && fallbackImages.length > 0) {
    const appNames = [...new Set(fallbackImages.map((i) => i.appName))].join(", ");
    userMessage = [
      {
        type: "text" as const,
        text: `Analyze these ${fallbackImages.length} screenshots from ${category} apps (${appNames}) focusing on the ${flowType} flow.

In section 4 (Screenshot Journey Map), reference each screenshot by its position number (e.g. "Screenshot 1 — Coinbase home screen") in the order they appear below. Produce the full 6-section UX intelligence report.`,
      },
      ...fallbackImages.map((img, i) => ({
        type: "image" as const,
        source: {
          type: "base64" as const,
          media_type: img.mediaType,
          data: img.base64,
        },
      })),
      {
        type: "text" as const,
        text: `Now produce the full 6-section markdown report. Be specific about what you see in each screenshot.`,
      },
    ];
  } else {
    userMessage = `Analyze ${category} apps, focusing on the ${flowType} flow. Use your knowledge of top apps in this category to produce the full 6-section report.`;
  }

  const requestParams: Parameters<typeof client.messages.create>[0] = {
    model: MODEL,
    max_tokens: 8096,
    system: systemPrompt,
    messages: [{ role: "user" as const, content: userMessage }],
    ...(mcpServers && { mcp_servers: mcpServers }),
  };

  const response = await client.messages.create(requestParams, {
    headers: mcpServers
      ? { "anthropic-beta": "mcp-client-2025-11-20" }
      : undefined,
  });

  // collect all text blocks (Claude may interleave tool calls with text)
  const text = response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as { type: "text"; text: string }).text)
    .join("\n\n");

  if (!text) throw new Error("No text in response");
  return text;
}

/* ── Prototype prompt generation (v5 branching) ── */

function buildRecommendationsBlock(recs: Recommendation[]): string {
  return recs
    .map(
      (r, i) =>
        `${i + 1}. ${r.text} (${r.priority.toUpperCase()} PRIORITY)\n   ${r.rationale}${r.competitors ? `\n   Seen in: ${r.competitors}` : ""}`
    )
    .join("\n\n");
}

function extractPatternsAndBenchmarks(report: string): {
  patterns: string;
  benchmarks: string;
} {
  // Extract UX Pattern Analysis (Section 3)
  const patternMatch = report.match(
    /#{1,3}\s*(?:3\.?\s*)?UX Pattern Analysis.*?\n([\s\S]*?)(?=\n#{1,3}\s)/i
  );
  // Extract Comparative Insights (Section 5)
  const insightMatch = report.match(
    /#{1,3}\s*(?:5\.?\s*)?Comparative Insights.*?\n([\s\S]*?)(?=\n#{1,3}\s)/i
  );

  const patterns = patternMatch
    ? patternMatch[1]
        .split("\n")
        .filter((l) => l.trim().startsWith("-") || l.trim().startsWith("*"))
        .slice(0, 5)
        .map((l) => l.trim())
        .join("\n")
    : "- Progressive disclosure\n- Social proof elements\n- Max 2 inputs per screen\n- Instant value preview after core action";

  const benchmarks = insightMatch
    ? insightMatch[1]
        .split("\n")
        .filter((l) => l.trim().startsWith("-") || l.trim().startsWith("*") || /^\d/.test(l.trim()))
        .slice(0, 4)
        .map((l) => l.trim())
        .join("\n")
    : "78% use progress indicators. Average onboarding: 4 screens.";

  return { patterns, benchmarks };
}

function buildImprovePrompt(
  answers: PrototypeInterviewAnswers,
  recs: Recommendation[],
  report: string
): string {
  const { patterns, benchmarks } = extractPatternsAndBenchmarks(report);

  const areaLabels = answers.improvementAreas.map((val) => {
    const opt = IMPROVEMENT_AREA_OPTIONS.find((o) => o.value === val);
    return opt ? opt.label : val;
  });

  const detailLine = answers.improvementDetail
    ? `\n${answers.improvementDetail}`
    : "";

  const customSection = answers.customFeatures
    ? `\nADDITIONAL FEATURES:\n${answers.customFeatures}\n`
    : "";

  return `I have an existing product and want to improve it based on competitive research.

AREA OF FOCUS:
${areaLabels.map((a) => `- ${a}`).join("\n")}${detailLine}

RECOMMENDATIONS TO IMPLEMENT (from competitive UX analysis):

${buildRecommendationsBlock(recs)}
${customSection}
SUPPORTING UX PATTERNS FROM RESEARCH:
${patterns}

INDUSTRY BENCHMARKS:
${benchmarks}

Build a prototype showing how my product would look with these improvements.
Focus on the screens and flows most affected by the changes.

SCREENS TO INCLUDE:
1. The improved flow for the focus area above
2. Redesigned home / main screen reflecting changes
3. One feature screen showing the biggest single improvement
4. Any new screens needed for the recommended changes

Realistic placeholder data. Polished, investor-demo ready.`;
}

function buildNewProductPrompt(
  answers: PrototypeInterviewAnswers,
  recs: Recommendation[],
  report: string
): string {
  const { patterns, benchmarks } = extractPatternsAndBenchmarks(report);

  const qualLine = answers.targetUserQualitative
    ? ` ${answers.targetUserQualitative}`
    : "";

  const customSection = answers.customFeatures
    ? `\nADDITIONAL FEATURES:\n${answers.customFeatures}\n`
    : "";

  return `Build me a new product: ${answers.productDescription}

TARGET USER:
${answers.targetUser}.${qualLine}

---

RECOMMENDATIONS TO INCORPORATE (from competitive UX analysis):
These are the specific product recommendations from analyzing the
competitive landscape. Build them into the prototype:

${buildRecommendationsBlock(recs)}
${customSection}
---

SUPPORTING UX PATTERNS FROM RESEARCH:
${patterns}

INDUSTRY BENCHMARKS:
${benchmarks}

---

SCREENS TO INCLUDE:

1. WELCOME SCREEN
   - One-line value proposition
   - Primary CTA
   - Apply relevant recommendations above

2. ONBOARDING FLOW (2–4 screens)
   - One task per screen, progress indicator
   - Max 2 input fields per screen
   - Drive toward the "aha moment"

3. SUCCESS / HOME SCREEN
   - Celebrate completion
   - Immediate value preview
   - Clear next actions

4. ONE KEY FEATURE SCREEN
   - Most impressive capability
   - Should reflect the recommendations selected

---

Realistic placeholder data. Mobile-responsive. Investor-demo ready.`;
}

export async function generatePrototypePrompt(
  report: string,
  answers: PrototypeInterviewAnswers,
  recommendations: Recommendation[]
): Promise<string> {
  // Build the user-facing prompt based on branch
  const builtPrompt =
    answers.flow === "improve"
      ? buildImprovePrompt(answers, recommendations, report)
      : buildNewProductPrompt(answers, recommendations, report);

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: PROTOTYPE_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `UX Intelligence Report:\n${report}\n\n---\n\nUser's prototype request:\n${builtPrompt}\n\nGenerate the final Lovable/Bolt prototype prompt. Make it highly specific, with real screen details, UI components, copy text, and visual style. The output should be a single prompt that can be pasted directly into Lovable to produce a working prototype.`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}
