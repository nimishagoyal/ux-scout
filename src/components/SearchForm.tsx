"use client";

/**
 * SearchForm — Yijia owns this component.
 * User inputs: product category + flow type → triggers analysis.
 */

import { useState } from "react";
import { Search } from "lucide-react";
import type { FlowType, AnalyzeRequest } from "@/types";

const FLOW_OPTIONS: { value: FlowType; label: string }[] = [
  { value: "onboarding", label: "Onboarding" },
  { value: "paywall", label: "Paywall / Subscription" },
  { value: "checkout", label: "Checkout" },
  { value: "navigation", label: "Navigation" },
  { value: "empty-state", label: "Empty State" },
  { value: "search", label: "Search & Discovery" },
  { value: "settings", label: "Settings" },
];

interface SearchFormProps {
  onSubmit: (req: AnalyzeRequest) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSubmit, isLoading }: SearchFormProps) {
  const [category, setCategory] = useState("fintech apps");
  const [flowType, setFlowType] = useState<FlowType>("onboarding");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category.trim()) return;
    onSubmit({ category: category.trim(), flowType });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Product Category
        </label>
        <input
          type="text"
          className="input"
          placeholder='e.g. "fintech apps", "AI productivity tools"'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="w-full sm:w-56">
        <label className="mb-1.5 block text-sm font-medium text-gray-700">
          Flow Type
        </label>
        <select
          className="input"
          value={flowType}
          onChange={(e) => setFlowType(e.target.value as FlowType)}
          disabled={isLoading}
        >
          {FLOW_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn-primary h-[42px]" disabled={isLoading || !category.trim()}>
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Analyzing…
          </>
        ) : (
          <>
            <Search className="h-4 w-4" />
            Analyze
          </>
        )}
      </button>
    </form>
  );
}
