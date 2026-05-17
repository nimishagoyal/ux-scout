"use client";

/**
 * ReportDisplay — Yijia owns this component.
 * Renders the 6-section markdown report returned from the Claude agent.
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ReportDisplayProps {
  report: string;
}

export default function ReportDisplay({ report }: ReportDisplayProps) {
  return (
    <div id="report-content" className="report-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{report}</ReactMarkdown>
    </div>
  );
}
