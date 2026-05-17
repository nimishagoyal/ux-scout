/**
 * PDF export — triggers the browser's native print-to-PDF.
 * This produces perfect vector text, correct pagination, and full fidelity
 * compared to html2canvas (which rasterizes and can truncate long content).
 *
 * The @media print rules in globals.css hide everything except the report.
 * User selects "Save as PDF" (or equivalent) in the print dialog.
 */
export function exportToPdf() {
  window.print();
}
