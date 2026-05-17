/**
 * Fallback screenshots loaded from public/ when Mobbin MCP isn't available.
 * Picks 2 screens per app from Coinbase, Kraken, and Binance.
 */

import fs from "fs";
import path from "path";

export interface FallbackImage {
  appName: string;
  filename: string;
  base64: string;
  mediaType: "image/png" | "image/jpeg";
}

const SELECTED: { folder: string; appName: string; indices: number[] }[] = [
  { folder: "Coinbase iOS Buying crypto", appName: "Coinbase", indices: [0, 1] },
  { folder: "Kraken iOS Buying a coin", appName: "Kraken", indices: [0, 1] },
  { folder: "Binance iOS Buying with USD", appName: "Binance", indices: [0, 1] },
];

export function loadFallbackScreenshots(): FallbackImage[] {
  const publicDir = path.join(process.cwd(), "public");
  const images: FallbackImage[] = [];

  for (const { folder, appName, indices } of SELECTED) {
    for (const idx of indices) {
      const filename = `${folder} ${idx}.png`;
      const filepath = path.join(publicDir, folder, filename);
      if (!fs.existsSync(filepath)) continue;

      const buffer = fs.readFileSync(filepath);
      images.push({
        appName,
        filename,
        base64: buffer.toString("base64"),
        mediaType: "image/png",
      });
    }
  }

  return images;
}
