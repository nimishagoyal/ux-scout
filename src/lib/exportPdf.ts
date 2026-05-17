/**
 * PDF export — Jose owns this file.
 * Uses html2canvas to capture the rendered report div, then jsPDF to save it.
 */

export async function exportToPdf(elementId: string, filename = "ux-scout-report.pdf") {
  const { default: jsPDF } = await import("jspdf");
  const { default: html2canvas } = await import("html2canvas");

  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Element #${elementId} not found`);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let yOffset = 0;
  let remainingHeight = imgHeight;

  while (remainingHeight > 0) {
    pdf.addImage(imgData, "PNG", 0, -yOffset, imgWidth, imgHeight);
    remainingHeight -= pageHeight;
    yOffset += pageHeight;
    if (remainingHeight > 0) pdf.addPage();
  }

  pdf.save(filename);
}
