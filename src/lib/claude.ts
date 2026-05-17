import Anthropic from "@anthropic-ai/sdk";
import type { MobbinScreenshot } from "@/types";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = "claude-sonnet-4-20250514";

const REPORT_SYSTEM_PROMPT = `You are UX Scout, an AI UX intelligence analyst.

You will be given a set of screenshots from competitor apps in a specific product category and flow type.

Analyze them and produce a structured UX intelligence report with exactly these 6 sections:

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

Be specific. Reference actual screenshots and app names. Use concrete, actionable language. Format everything in clean markdown.

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

Format the output as a single code block containing the prompt text — nothing else.`;

export async function generateReport(
  category: string,
  flowType: string,
  screenshots: MobbinScreenshot[]
): Promise<string> {
  const systemPrompt = REPORT_SYSTEM_PROMPT.replace(
    "{category}",
    category
  ).replace("{flow_type}", flowType);

  const screenshotDescriptions = screenshots
    .map(
      (s, i) =>
        `Screenshot ${i + 1}: ${s.appName} — ${s.flowType} (${s.platform})\nImage URL: ${s.imageUrl}`
    )
    .join("\n\n");

  const userMessage =
    screenshots.length > 0
      ? `Analyze these ${screenshots.length} competitor screenshots from ${category} apps, focusing on the ${flowType} flow:\n\n${screenshotDescriptions}`
      : `Analyze ${category} apps, focusing on the ${flowType} flow. Use your knowledge of top apps in this category to produce the report.`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 4096,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}

export async function generatePrototypePrompt(
  report: string,
  productDescription: string,
  targetUser: string,
  topGoal: string
): Promise<string> {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    system: PROTOTYPE_SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `UX Intelligence Report:\n${report}\n\n---\n\nMy product: ${productDescription}\nMy target user: ${targetUser}\nTop goal I want to achieve: ${topGoal}\n\nGenerate the Lovable/Bolt prototype prompt.`,
      },
    ],
  });

  const content = response.content[0];
  if (content.type !== "text") throw new Error("Unexpected response type");
  return content.text;
}
