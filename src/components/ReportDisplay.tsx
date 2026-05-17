"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

interface ReportDisplayProps {
  report: string;
}

// Detect ✓/✗ and short badges in table cells
function CellContent({ children }: { children: React.ReactNode }) {
  const text = String(children).trim();
  if (text === "✓")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-700">
        ✓
      </span>
    );
  if (text === "✗")
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-500">
        ✗
      </span>
    );
  if (text === "High")
    return (
      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-700">
        High
      </span>
    );
  if (text === "Medium")
    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">
        Medium
      </span>
    );
  if (text === "Low")
    return (
      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
        Low
      </span>
    );
  return <>{children}</>;
}

const SECTION_COLORS: Record<string, string> = {
  "1": "bg-violet-600",
  "2": "bg-blue-600",
  "3": "bg-indigo-600",
  "4": "bg-cyan-600",
  "5": "bg-teal-600",
  "6": "bg-brand-600",
};

const components: Components = {
  // ── Section headers with numbered badge ──────────────────────────────────
  h1: ({ children }) => {
    const text = String(children);
    const match = text.match(/^(\d+)\.\s+(.+)$/);
    const num = match?.[1];
    const title = match?.[2] ?? text;
    const color = num ? (SECTION_COLORS[num] ?? "bg-brand-600") : "bg-brand-600";

    return (
      <div className="mb-5 mt-10 border-b border-gray-100 pb-4 first:mt-0">
        <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900">
          {num && (
            <span
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${color} text-sm font-bold text-white`}
            >
              {num}
            </span>
          )}
          {title}
        </h2>
      </div>
    );
  },

  h2: ({ children }) => (
    <h3 className="mb-3 mt-6 text-lg font-semibold text-gray-800">{children}</h3>
  ),

  h3: ({ children }) => {
    const text = String(children);
    const match = text.match(/^(\d+)\.\s+(.+)$/);

    // Numbered h3 = Product Recommendation → numbered badge card
    if (match) {
      return (
        <div className="recommendation-card mb-2 mt-6 flex items-center gap-3 rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white px-4 py-3 shadow-sm">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
            {match[1]}
          </span>
          <span className="font-semibold text-gray-900">{match[2]}</span>
        </div>
      );
    }

    // Non-numbered h3 = UX Pattern name or Journey Map app name → accent card
    return (
      <div className="mb-2 mt-6 flex items-center gap-2 rounded-lg border-l-4 border-indigo-400 bg-indigo-50/60 px-4 py-2.5">
        <span className="font-semibold text-gray-900">{children}</span>
      </div>
    );
  },

  // ── Tables ────────────────────────────────────────────────────────────────
  table: ({ children }) => (
    <div className="report-table-wrap mb-6 overflow-hidden rounded-xl shadow-sm ring-1 ring-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">{children}</table>
      </div>
    </div>
  ),

  thead: ({ children }) => (
    <thead className="bg-brand-600 text-white">{children}</thead>
  ),

  th: ({ children }) => (
    <th className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-white">
      {children}
    </th>
  ),

  tbody: ({ children }) => <tbody className="divide-y divide-gray-100 bg-white">{children}</tbody>,

  tr: ({ children }) => (
    <tr className="transition-colors hover:bg-brand-50/50">{children}</tr>
  ),

  td: ({ children }) => (
    <td className="px-4 py-3 text-gray-700">
      <CellContent>{children}</CellContent>
    </td>
  ),

  // ── Blockquotes → insight callout cards ──────────────────────────────────
  blockquote: ({ children }) => (
    <div className="insight-card my-3 flex gap-3 rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-white px-5 py-4">
      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand-500" />
      <div className="text-sm leading-relaxed text-gray-800 [&>p]:mb-0">{children}</div>
    </div>
  ),

  // ── Inline elements ───────────────────────────────────────────────────────
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),

  p: ({ children }) => (
    <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
  ),

  li: ({ children }) => (
    <li className="mb-1.5 leading-relaxed text-gray-700">{children}</li>
  ),

  // ── Code ──────────────────────────────────────────────────────────────────
  code: ({ className, children }) => {
    const isBlock = className?.includes("language-");
    if (isBlock)
      return (
        <pre className="mb-4 overflow-x-auto rounded-xl bg-gray-900 p-4">
          <code className="font-mono text-sm text-gray-100">{children}</code>
        </pre>
      );
    return (
      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-sm text-gray-800">
        {children}
      </code>
    );
  },
};

export default function ReportDisplay({ report }: ReportDisplayProps) {
  return (
    <div id="report-content" className="report-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {report}
      </ReactMarkdown>
    </div>
  );
}
