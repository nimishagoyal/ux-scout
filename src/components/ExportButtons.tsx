"use client";

/**
 * ExportButtons — Jose owns this component.
 * One-click PDF and Word export of the rendered report.
 */

import { useState } from "react";
import { FileDown, FileText } from "lucide-react";

interface ExportButtonsProps {
  reportMarkdown: string;
}

export default function ExportButtons({ reportMarkdown }: ExportButtonsProps) {
  const [pdfLoading, setPdfLoading] = useState(false);
  const [docxLoading, setDocxLoading] = useState(false);

  async function handlePdfExport() {
    setPdfLoading(true);
    try {
      const { exportToPdf } = await import("@/lib/exportPdf");
      await exportToPdf("report-content");
    } catch (err) {
      console.error("PDF export failed", err);
      alert("PDF export failed. See console for details.");
    } finally {
      setPdfLoading(false);
    }
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
      <button
        className="btn-secondary"
        onClick={handlePdfExport}
        disabled={pdfLoading}
      >
        {pdfLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        ) : (
          <FileDown className="h-4 w-4" />
        )}
        Export PDF
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
