"use client";

import { useState } from "react";
import { FileDown, FileText } from "lucide-react";

interface ExportButtonsProps {
  reportMarkdown: string;
}

export default function ExportButtons({ reportMarkdown }: ExportButtonsProps) {
  const [docxLoading, setDocxLoading] = useState(false);

  function handlePdfExport() {
    window.print();
  }

  async function handleDocxExport() {
    setDocxLoading(true);
    try {
      const { exportToDocx } = await import("@/lib/exportDocx");
      await exportToDocx(reportMarkdown);
    } catch (err) {
      console.error("Word export failed", err);
      alert("Word export failed. See console for details.");
    } finally {
      setDocxLoading(false);
    }
  }

  return (
    <div className="flex gap-3">
      <button className="btn-secondary" onClick={handlePdfExport}>
        <FileDown className="h-4 w-4" />
        Save as PDF
      </button>

      <button
        className="btn-secondary"
        onClick={handleDocxExport}
        disabled={docxLoading}
      >
        {docxLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        ) : (
          <FileText className="h-4 w-4" />
        )}
        Export Word
      </button>
    </div>
  );
}
