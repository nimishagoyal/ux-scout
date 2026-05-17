/**
 * Mobbin integration — Nimisha owns this file.
 *
 * MVP: Connect via Mobbin MCP in Claude Code.
 * Fallback: if MCP isn't ready, fetchScreenshots returns [] and the Claude
 * agent falls back to knowledge-based analysis.
 *
 * To connect the Mobbin MCP:
 *   1. Get API key from mobbin.com
 *   2. Add MOBBIN_API_KEY to .env.local
 *   3. Configure MCP in Claude Code settings
 *   4. Replace the stub below with real MCP tool calls
 */

import type { MobbinScreenshot, FlowType } from "@/types";

export async function fetchScreenshots(
  category: string,
  flowType: FlowType,
  limit = 20
): Promise<MobbinScreenshot[]> {
  if (!process.env.MOBBIN_API_KEY) {
    console.warn("MOBBIN_API_KEY not set — skipping screenshot fetch");
    return [];
  }

  // TODO (Nimisha): replace with real Mobbin MCP tool call
  // Example MCP call shape (adjust to actual Mobbin MCP API):
  //
  // const results = await mobbinMcp.searchScreens({
  //   query: `${category} ${flowType}`,
  //   limit,
  // });
  // return results.map(normalizeScreenshot);

  console.log(`Fetching Mobbin screenshots: category="${category}", flow="${flowType}", limit=${limit}`);
  return [];
}

// Curated fallback screenshots for the fintech/onboarding demo vertical.
// Use these if Mobbin MCP isn't connected in time.
export const DEMO_SCREENSHOTS: MobbinScreenshot[] = [
  {
    id: "revolut-onboarding-1",
    appName: "Revolut",
    imageUrl: "https://placeholder.com/revolut-1",
    flowType: "onboarding",
    platform: "ios",
  },
  {
    id: "robinhood-onboarding-1",
    appName: "Robinhood",
    imageUrl: "https://placeholder.com/robinhood-1",
    flowType: "onboarding",
    platform: "ios",
  },
  {
    id: "cleo-onboarding-1",
    appName: "Cleo",
    imageUrl: "https://placeholder.com/cleo-1",
    flowType: "onboarding",
    platform: "ios",
  },
  {
    id: "coinbase-onboarding-1",
    appName: "Coinbase",
    imageUrl: "https://placeholder.com/coinbase-1",
    flowType: "onboarding",
    platform: "ios",
  },
];
