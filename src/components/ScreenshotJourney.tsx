"use client";

import { ImageOff } from "lucide-react";
import type { MobbinScreenshot } from "@/types";

interface ScreenshotJourneyProps {
  screenshots: MobbinScreenshot[];
}

function isRealUrl(url: string) {
  return url.startsWith("https://") && !url.includes("placeholder");
}

export default function ScreenshotJourney({ screenshots }: ScreenshotJourneyProps) {
  if (screenshots.length === 0) return null;

  // Group by app name, preserving insertion order
  const byApp: Record<string, MobbinScreenshot[]> = {};
  for (const s of screenshots) {
    if (!byApp[s.appName]) byApp[s.appName] = [];
    byApp[s.appName].push(s);
  }

  const apps = Object.entries(byApp);

  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <div className="mb-5 flex items-center gap-2">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white">
          ↗
        </span>
        <h3 className="text-lg font-bold text-gray-900">Screenshot Journey Map</h3>
      </div>

      <div className="space-y-8">
        {apps.map(([appName, screens]) => (
          <div key={appName}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {appName}
            </p>
            <div className="flex gap-3 overflow-x-auto pb-3">
              {screens.map((screen, idx) => (
                <ScreenCard key={screen.id} screen={screen} index={idx} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenCard({ screen, index }: { screen: MobbinScreenshot; index: number }) {
  const real = isRealUrl(screen.imageUrl);

  return (
    <div className="flex w-36 flex-shrink-0 flex-col">
      {/* Step connector line */}
      <div className="mb-2 flex items-center gap-1.5">
        <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
          {index + 1}
        </span>
        {index < 99 && (
          <div className="h-px flex-1 bg-brand-100" />
        )}
      </div>

      {/* Screenshot frame */}
      <div className="relative overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200" style={{ height: "17rem" }}>
        {real ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={screen.imageUrl}
            alt={`${screen.appName} — ${screen.stepLabel ?? `Screen ${index + 1}`}`}
            className="h-full w-full object-cover object-top"
            crossOrigin="anonymous"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-gray-300">
            <ImageOff className="h-8 w-8" />
            <span className="text-center text-xs font-medium text-gray-400">
              {screen.appName}
            </span>
          </div>
        )}
      </div>

      {/* Label */}
      {screen.stepLabel && (
        <p className="mt-1.5 text-center text-xs leading-tight text-gray-500">
          {screen.stepLabel}
        </p>
      )}
    </div>
  );
}
