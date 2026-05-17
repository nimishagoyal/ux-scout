"use client";

/**
 * PrototypeInterview — Muyun owns this component.
 * 3-question form that captures the user's product context,
 * then calls /api/prototype to generate a Lovable/Bolt prompt.
 */

import { useState } from "react";
import { Wand2 } from "lucide-react";
import type { PrototypeInterviewAnswers } from "@/types";

interface PrototypeInterviewProps {
  report: string;
  onPromptGenerated: (prompt: string) => void;
}

export default function PrototypeInterview({
  report,
  onPromptGenerated,
}: PrototypeInterviewProps) {
  const [answers, setAnswers] = useState<PrototypeInterviewAnswers>({
    productDescription: "",
    targetUser: "",
    topGoal: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function update(field: keyof PrototypeInterviewAnswers, value: string) {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  }

  const isComplete =
    answers.productDescription.trim() &&
    answers.targetUser.trim() &&
    answers.topGoal.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isComplete) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/prototype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ report, ...answers }),
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          1. What is your product?
        </label>
        <input
          type="text"
          className="input"
          placeholder='e.g. "A personal finance app for Gen Z"'
          value={answers.productDescription}
          onChange={(e) => update("productDescription", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          2. Who is your target user?
        </label>
        <input
          type="text"
          className="input"
          placeholder='e.g. "College students who want to start investing"'
          value={answers.targetUser}
          onChange={(e) => update("targetUser", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          3. What is the #1 thing you want users to do?
        </label>
        <input
          type="text"
          className="input"
          placeholder='e.g. "Complete onboarding and make their first investment"'
          value={answers.topGoal}
          onChange={(e) => update("topGoal", e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        type="submit"
        className="btn-primary self-start"
        disabled={!isComplete || isLoading}
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
    </form>
  );
}
