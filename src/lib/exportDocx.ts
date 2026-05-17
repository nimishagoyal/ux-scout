/**
 * Word export — Jose owns this file.
 * Converts the markdown report string into a .docx file and triggers download.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from "docx";
import { saveAs } from "file-saver";

function markdownToDocxParagraphs(markdown: string): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const lines = markdown.split("\n");

  for (const line of lines) {
    if (line.startsWith("# ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^# /, ""),
          heading: HeadingLevel.HEADING_1,
        })
      );
    } else if (line.startsWith("## ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^## /, ""),
          heading: HeadingLevel.HEADING_2,
        })
      );
    } else if (line.startsWith("### ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^### /, ""),
          heading: HeadingLevel.HEADING_3,
        })
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      paragraphs.push(
        new Paragraph({
          text: line.replace(/^[-*] /, ""),
          bullet: { level: 0 },
        })
      );
    } else if (line.trim() === "") {
      paragraphs.push(new Paragraph({ text: "" }));
    } else {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: line })],
          alignment: AlignmentType.LEFT,
        })
      );
    }
  }

  return paragraphs;
}

export async function exportToDocx(
  reportMarkdown: string,
  filename = "ux-scout-report.docx"
) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: "UX Scout — Intelligence Report",
            heading: HeadingLevel.TITLE,
          }),
          new Paragraph({ text: "" }),
          ...markdownToDocxParagraphs(reportMarkdown),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
