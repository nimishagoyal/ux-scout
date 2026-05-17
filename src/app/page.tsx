"use client";

import { useState } from "react";
import { Telescope } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import ReportDisplay from "@/components/ReportDisplay";
import ExportButtons from "@/components/ExportButtons";
import ScreenshotJourney from "@/components/ScreenshotJourney";
import PrototypeInterview from "@/components/PrototypeInterview";
import PrototypePromptOutput from "@/components/PrototypePromptOutput";
import type { AnalyzeRequest, MobbinScreenshot } from "@/types";

type AppState = "idle" | "loading" | "report" | "prototype" | "prompt";

export default function HomePage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [report, setReport] = useState("");
  const [screenshots, setScreenshots] = useState<MobbinScreenshot[]>([]);
  const [prototypePrompt, setPrototypePrompt] = useState("");
  const [error, setError] = useState("");

  async function handleAnalyze(req: AnalyzeRequest) {
    setAppState("loading");
    setError("");
    setReport("");
    setPrototypePrompt("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Analysis failed");
      }

      const data = await res.json();
      setReport(data.report);
      setScreenshots(data.screenshots ?? []);
      setAppState("report");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setAppState("idle");
    }
  }

  function handlePromptGenerated(prompt: string) {
    setPrototypePrompt(prompt);
    setAppState("prompt");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header — hidden when printing */}
      <header className="no-print mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700">
          <Telescope className="h-4 w-4" />
          AI-Powered Competitive UX Intelligence
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          UX Scout
        </h1>
        <p className="mt-2 text-lg text-gray-500">
          Analyze competitor apps. Identify design patterns. Get actionable
          recommendations.
        </p>
      </header>

      {/* Search — hidden when printing */}
      <div className="no-print card mb-8">
        <SearchForm
          onSubmit={handleAnalyze}
          isLoading={appState === "loading"}
        />
      </div>

      {/* Error — hidden when printing */}
      {error && (
        <div className="no-print mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading state */}
      {appState === "loading" && (
        <div className="no-print card flex flex-col items-center gap-4 py-16 text-center">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" />
          <div>
            <p className="font-semibold text-gray-800">Analyzing competitor UX…</p>
            <p className="mt-1 text-sm text-gray-500">
              Fetching screenshots · Detecting patterns · Generating report
            </p>
          </div>
        </div>
      )}

      {/* Report */}
      {(appState === "report" || appState === "prototype" || appState === "prompt") && report && (
        <div className="card mb-8">
          {/* Export buttons — hidden when printing */}
          <div className="no-print mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              UX Intelligence Report
            </h2>
            <ExportButtons reportMarkdown={report} />
          </div>

          {/* Report content — always visible including print */}
          <ReportDisplay report={report} />

          {/* Screenshot journey — shown when Mobbin screenshots are available */}
          {screenshots.length > 0 && (
            <ScreenshotJourney screenshots={screenshots} />
          )}
        </div>
      )}

      {/* Prototype interview — hidden when printing */}
      {appState === "report" && (
        <div className="no-print card mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Generate a Prototype
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Answer 3 quick questions and get a ready-to-paste prompt for
              Lovable or Bolt.
            </p>
          </div>
          <PrototypeInterview
            report={report}
            onPromptGenerated={handlePromptGenerated}
          />
        </div>
      )}

      {/* Prototype prompt output — hidden when printing */}
      {appState === "prompt" && prototypePrompt && (
        <div className="no-print card">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Your Prototype Prompt
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Inspired by the best patterns across the market, tailored to your
              product.
            </p>
          </div>
          <PrototypePromptOutput prompt={prototypePrompt} />
        </div>
      )}
    </div>
  );
}
