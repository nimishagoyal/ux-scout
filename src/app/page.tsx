"use client";

/**
 * Main page — Yijia owns this file.
 * Orchestrates the full UX Scout flow:
 *   1. Search form → triggers analysis
 *   2. Report display + export
 *   3. Prototype interview → prompt output
 */

import { useState } from "react";
import { Telescope } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import ReportDisplay from "@/components/ReportDisplay";
import ExportButtons from "@/components/ExportButtons";
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
      {/* Header */}
      <header className="mb-10 text-center">
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

      {/* Search */}
      <div className="card mb-8">
        <SearchForm
          onSubmit={handleAnalyze}
          isLoading={appState === "loading"}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Loading state */}
      {appState === "loading" && (
        <div className="card flex flex-col items-center gap-4 py-16 text-center">
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
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              UX Intelligence Report
            </h2>
            <ExportButtons reportMarkdown={report} />
          </div>
          <ReportDisplay report={report} />
        </div>
      )}

      {/* Prototype interview CTA */}
      {appState === "report" && (
        <div className="card mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Generate a Prototype
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Tell us about your product and get a ready-to-paste prompt for
              Lovable or Bolt — tailored to your goals.
            </p>
          </div>
          <PrototypeInterview
            report={report}
            onPromptGenerated={handlePromptGenerated}
          />
        </div>
      )}

      {/* Prototype prompt output */}
      {appState === "prompt" && prototypePrompt && (
        <div className="card">
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
