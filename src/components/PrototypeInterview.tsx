"use client";

/**
 * PrototypeInterview — Muyun owns this component.
 * Branching interview flow (v5):
 *   Q1: Improve existing or build new?
 *   Branch A: Which area needs improvement? (MC + text)
 *   Branch B: What product? (text) → Who's the user? (MC + text)
 *   Q-FINAL: Product recommendations from report Section 6 (MC + text)
 */

import { useState, useMemo } from "react";
import {
  Wrench,
  Rocket,
  ArrowLeft,
  ArrowRight,
  Wand2,
  Check,
  Sparkles,
} from "lucide-react";
import type {
  PrototypeInterviewAnswers,
  Recommendation,
  InterviewFlow,
} from "@/types";
import {
  EMPTY_ANSWERS,
  TARGET_USER_OPTIONS,
  IMPROVEMENT_AREA_OPTIONS,
} from "@/types";

/* ── helpers ── */

function parseRecommendations(report: string): Recommendation[] {
  // Extract Section 6 from the report markdown
  const s6Regex =
    /#{1,3}\s*(?:6\.?\s*)?Product[- ]Specific Recommendations.*?\n([\s\S]*?)(?=\n#{1,3}\s|\z)/i;
  const altRegex =
    /#{1,3}\s*(?:6\.?\s*)?Product Recommendations.*?\n([\s\S]*?)(?=\n#{1,3}\s|\z)/i;

  const match = report.match(s6Regex) || report.match(altRegex);
  if (!match) return fallbackRecommendations();

  const section = match[1];
  const recs: Recommendation[] = [];

  // Try to parse numbered recommendations
  const items = section.split(/\n(?=\d+\.\s)/);
  for (const item of items) {
    const titleMatch = item.match(/^\d+\.\s*\*?\*?(.+?)\*?\*?\s*$/m);
    if (!titleMatch) continue;

    const text = titleMatch[1].trim().replace(/\*\*/g, "");
    const priorityMatch = item.match(/priority[:\s]*(high|medium|low)/i);
    const priority = (priorityMatch?.[1]?.charAt(0).toUpperCase() +
      (priorityMatch?.[1]?.slice(1).toLowerCase() ?? "")) as
      | "High"
      | "Medium"
      | "Low";

    // Grab the next line(s) as rationale
    const lines = item.split("\n").filter((l) => l.trim());
    const rationale =
      lines
        .slice(1, 3)
        .map((l) => l.replace(/^[-*]\s*/, "").trim())
        .join(" ") || "";

    const competitorMatch = item.match(
      /(?:example|seen in|from|like)\s*[:.]?\s*([A-Z][\w\s,&]+)/i
    );
    const competitors = competitorMatch?.[1]?.trim() ?? "";

    recs.push({
      text,
      priority: priority || "Medium",
      rationale,
      competitors,
    });
  }

  return recs.length > 0 ? recs.slice(0, 6) : fallbackRecommendations();
}

function fallbackRecommendations(): Recommendation[] {
  return [
    {
      text: "Reduce onboarding to 4 screens max",
      priority: "High",
      rationale:
        "Top competitors achieve activation in 3–4 screens; every extra screen loses ~15% of users",
      competitors: "Robinhood, Cleo",
    },
    {
      text: "Add trust-building moments before sensitive data collection",
      priority: "High",
      rationale:
        "Security badges and encryption messaging before KYC increase completion rates",
      competitors: "Revolut, Coinbase",
    },
    {
      text: "Show value before requiring sign-up",
      priority: "Medium",
      rationale:
        "60% of top apps let users explore before requiring an account",
      competitors: "Multiple competitors",
    },
    {
      text: "Introduce personalization earlier in the flow",
      priority: "Medium",
      rationale:
        "Goal-setting questions on screen 2 lead to 2x better retention",
      competitors: "Wealthfront",
    },
    {
      text: "Use conversational, personality-driven microcopy",
      priority: "Medium",
      rationale:
        "Warm, casual language reduces perceived friction and increases engagement",
      competitors: "Cleo",
    },
  ];
}

/* ── step definitions ── */

type Step = "q1" | "q2a" | "q2b" | "q3b" | "final";

function getSteps(flow: InterviewFlow): Step[] {
  if (flow === "improve") return ["q1", "q2a", "final"];
  if (flow === "new") return ["q1", "q2b", "q3b", "final"];
  return ["q1"];
}

/* ── props ── */

interface Props {
  report: string;
  onPromptGenerated: (prompt: string) => void;
}

/* ── component ── */

export default function PrototypeInterview({
  report,
  onPromptGenerated,
}: Props) {
  const [answers, setAnswers] = useState<PrototypeInterviewAnswers>({
    ...EMPTY_ANSWERS,
  });
  const [currentStep, setCurrentStep] = useState<Step>("q1");
  const [isLoading, setIsLoading] = useState(false);

  const recommendations = useMemo(
    () => parseRecommendations(report),
    [report]
  );

  const steps = getSteps(answers.flow);
  const stepIndex = steps.indexOf(currentStep);
  const totalSteps = answers.flow ? getSteps(answers.flow).length : 1;

  /* ── navigation ── */

  function goNext() {
    const idx = steps.indexOf(currentStep);
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1]);
  }

  function goBack() {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) {
      setCurrentStep(steps[idx - 1]);
    }
  }

  function canAdvance(): boolean {
    switch (currentStep) {
      case "q1":
        return answers.flow !== null;
      case "q2a":
        return answers.improvementAreas.length > 0;
      case "q2b":
        return answers.productDescription.trim().length > 0;
      case "q3b":
        return answers.targetUser.trim().length > 0;
      case "final":
        return answers.selectedRecommendations.length > 0;
      default:
        return false;
    }
  }

  /* ── updaters ── */

  function setFlow(flow: InterviewFlow) {
    setAnswers({ ...EMPTY_ANSWERS, flow });
    setCurrentStep(flow === "improve" ? "q2a" : "q2b");
  }

  function toggleImprovementArea(value: string) {
    setAnswers((prev) => {
      const areas = prev.improvementAreas.includes(value)
        ? prev.improvementAreas.filter((a) => a !== value)
        : [...prev.improvementAreas, value];
      return { ...prev, improvementAreas: areas };
    });
  }

  function toggleRecommendation(index: number) {
    setAnswers((prev) => {
      const selected = prev.selectedRecommendations.includes(index)
        ? prev.selectedRecommendations.filter((i) => i !== index)
        : [...prev.selectedRecommendations, index];
      return { ...prev, selectedRecommendations: selected };
    });
  }

  /* ── submit ── */

  async function handleGenerate() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          report,
          answers,
          recommendations: answers.selectedRecommendations.map(
            (i) => recommendations[i]
          ),
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      onPromptGenerated(data.prompt);
    } catch (err) {
      console.error("Prototype generation failed", err);
      alert("Prototype generation failed. See console for details.");
    } finally {
      setIsLoading(false);
    }
  }

  /* ── renders ── */

  function renderProgressDots() {
    return (
      <div className="mb-6 flex items-center justify-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              i === stepIndex
                ? "w-6 bg-brand-600"
                : i < stepIndex
                  ? "w-2 bg-brand-300"
                  : "w-2 bg-gray-200"
            }`}
          />
        ))}
      </div>
    );
  }

  function renderQ1() {
    return (
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          What brings you here?
        </h3>
        <p className="mb-5 text-sm text-gray-500">
          This determines the questions we'll ask you next.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFlow("improve")}
            className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/50 ${
              answers.flow === "improve"
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <Wrench className="h-8 w-8 text-brand-600" />
            <div>
              <p className="font-semibold text-gray-900">
                Improve my existing product
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Make it better based on what competitors are doing
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setFlow("new")}
            className={`flex flex-col items-center gap-3 rounded-xl border-2 p-6 text-center transition hover:border-brand-400 hover:bg-brand-50/50 ${
              answers.flow === "new"
                ? "border-brand-500 bg-brand-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <Rocket className="h-8 w-8 text-brand-600" />
            <div>
              <p className="font-semibold text-gray-900">
                Build something new
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Create a new product inspired by the competitive landscape
              </p>
            </div>
          </button>
        </div>
      </div>
    );
  }

  function renderQ2A() {
    return (
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Which area of your product needs the most improvement?
        </h3>
        <p className="mb-5 text-sm text-gray-500">
          Select one or more areas. This helps focus the recommendations.
        </p>
        <div className="flex flex-col gap-2.5">
          {IMPROVEMENT_AREA_OPTIONS.map((opt) => {
            const selected = answers.improvementAreas.includes(opt.value);
            const isAuto = opt.value === "auto";
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleImprovementArea(opt.value)}
                className={`flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm transition ${
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : isAuto
                      ? "border-dashed border-gray-300 bg-gray-50 hover:border-brand-400"
                      : "border-gray-200 bg-white hover:border-brand-400"
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                    selected ? "bg-brand-600" : "border border-gray-300"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <span className={isAuto ? "font-medium text-brand-700" : ""}>
                  {isAuto && <Sparkles className="mr-1.5 inline h-4 w-4" />}
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Describe the problem in your own words{" "}
            <span className="text-gray-400">(optional)</span>
          </label>
          <input
            type="text"
            className="input"
            placeholder='e.g. "Users drop off after the second onboarding screen"'
            value={answers.improvementDetail}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                improvementDetail: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderQ2B() {
    return (
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          What product do you want to build?
        </h3>
        <p className="mb-5 text-sm text-gray-500">
          Describe your product idea in one sentence.
        </p>
        <input
          type="text"
          className="input text-base"
          placeholder='e.g. "A Gen Z budgeting app that makes saving feel like a game"'
          value={answers.productDescription}
          onChange={(e) =>
            setAnswers((prev) => ({
              ...prev,
              productDescription: e.target.value,
            }))
          }
          autoFocus
        />
      </div>
    );
  }

  function renderQ3B() {
    return (
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Who is your target customer?
        </h3>
        <p className="mb-5 text-sm text-gray-500">
          Pick a category, then describe them in more detail below.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {TARGET_USER_OPTIONS.map((opt) => {
            const selected = answers.targetUser === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, targetUser: opt.value }))
                }
                className={`flex items-center gap-2 rounded-lg border-2 px-4 py-3 text-left text-sm transition ${
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-200 bg-white hover:border-brand-400"
                }`}
              >
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    selected
                      ? "bg-brand-600"
                      : "border-2 border-gray-300"
                  }`}
                >
                  {selected && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
                <span className="font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Describe your ideal user
          </label>
          <input
            type="text"
            className="input"
            placeholder='e.g. "College students aged 18-22 managing money for the first time"'
            value={answers.targetUserQualitative}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                targetUserQualitative: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  }

  function renderFinal() {
    return (
      <div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          Based on the research, here are our top recommendations.
        </h3>
        <p className="mb-5 text-sm text-gray-500">
          Select the ones you want built into your prototype.
        </p>

        <div className="flex flex-col gap-2.5">
          {recommendations.map((rec, i) => {
            const selected = answers.selectedRecommendations.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggleRecommendation(i)}
                className={`flex items-start gap-3 rounded-lg border-2 px-4 py-3.5 text-left transition ${
                  selected
                    ? "border-brand-500 bg-brand-50"
                    : "border-gray-200 bg-white hover:border-brand-400"
                }`}
              >
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded ${
                    selected ? "bg-brand-600" : "border border-gray-300"
                  }`}
                >
                  {selected && <Check className="h-3.5 w-3.5 text-white" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {rec.text}
                    </span>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                        rec.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : rec.priority === "Medium"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {rec.rationale}
                  </p>
                  {rec.competitors && (
                    <p className="mt-0.5 text-[11px] text-brand-600">
                      Seen in: {rec.competitors}
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Anything else you want in the prototype?
          </label>
          <input
            type="text"
            className="input"
            placeholder='e.g. "dark mode", "gamification", "make it feel like Cleo but look like Revolut"'
            value={answers.customFeatures}
            onChange={(e) =>
              setAnswers((prev) => ({
                ...prev,
                customFeatures: e.target.value,
              }))
            }
          />
        </div>
      </div>
    );
  }

  /* ── main render ── */

  return (
    <div className="flex flex-col gap-5">
      {answers.flow && renderProgressDots()}

      {currentStep === "q1" && renderQ1()}
      {currentStep === "q2a" && renderQ2A()}
      {currentStep === "q2b" && renderQ2B()}
      {currentStep === "q3b" && renderQ3B()}
      {currentStep === "final" && renderFinal()}

      {/* Navigation */}
      {currentStep !== "q1" && (
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={goBack}
            className="btn-secondary text-sm"
            disabled={isLoading}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          {currentStep !== "final" ? (
            <button
              type="button"
              onClick={goNext}
              className="btn-primary text-sm"
              disabled={!canAdvance()}
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleGenerate}
              className="btn-primary text-sm"
              disabled={!canAdvance() || isLoading}
            >
              {isLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating…
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Generate Prototype Prompt
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
