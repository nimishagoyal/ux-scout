/**
 * Word export — converts the markdown report to a fully formatted .docx file.
 * Handles: headings, paragraphs, bullet lists, numbered lists, tables (with
 * styled header row and alternating row shading), blockquotes, and inline
 * bold / italic text.
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";

// ─── Inline text parser ───────────────────────────────────────────────────────

function parseInline(text: string): TextRun[] {
  // Handle **bold**, *italic*, and plain segments
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
  const runs: TextRun[] = [];

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith("**") && part.endsWith("**")) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true }));
    } else if (part.startsWith("*") && part.endsWith("*")) {
      runs.push(new TextRun({ text: part.slice(1, -1), italics: true }));
    } else {
      runs.push(new TextRun({ text: part }));
    }
  }

  return runs.length > 0 ? runs : [new TextRun({ text })];
}

// ─── Markdown block parser ────────────────────────────────────────────────────

type Block =
  | { kind: "heading"; level: number; text: string }
  | { kind: "paragraph"; text: string }
  | { kind: "bullet"; text: string }
  | { kind: "numbered"; n: number; text: string }
  | { kind: "blockquote"; text: string }
  | { kind: "table"; rows: string[][] }
  | { kind: "blank" };

function isTableRow(line: string) {
  return line.trim().startsWith("|") && line.trim().endsWith("|");
}

function isSeparatorRow(line: string) {
  return /^\s*\|[\s\-:|]+\|\s*$/.test(line);
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .slice(1, -1) // strip outer |
    .split("|")
    .map((c) => c.trim());
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Table block
    if (isTableRow(line)) {
      const tableLines: string[] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines
        .filter((l) => !isSeparatorRow(l))
        .map(parseTableRow);
      if (rows.length > 0) blocks.push({ kind: "table", rows });
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        kind: "heading",
        level: headingMatch[1].length,
        text: headingMatch[2],
      });
      i++;
      continue;
    }

    // Bullet list
    if (/^[\-\*]\s+/.test(line)) {
      blocks.push({ kind: "bullet", text: line.replace(/^[\-\*]\s+/, "") });
      i++;
      continue;
    }

    // Numbered list
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      blocks.push({ kind: "numbered", n: parseInt(numMatch[1]), text: numMatch[2] });
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith("> ")) {
      blocks.push({ kind: "blockquote", text: line.replace(/^>\s*/, "") });
      i++;
      continue;
    }

    // Blank / separator
    if (line.trim() === "" || /^---+$/.test(line.trim())) {
      blocks.push({ kind: "blank" });
      i++;
      continue;
    }

    // Paragraph
    blocks.push({ kind: "paragraph", text: line });
    i++;
  }

  return blocks;
}

// ─── Table builder ────────────────────────────────────────────────────────────

const BRAND_BLUE = "3B55E6";
const STRIPE_BLUE = "EEF2FF";

function buildDocxTable(rows: string[][]): Table {
  if (rows.length === 0)
    return new Table({ rows: [new TableRow({ children: [] })] });

  const [header, ...body] = rows;

  const headerRow = new TableRow({
    tableHeader: true,
    children: header.map(
      (cell) =>
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({ text: cell, bold: true, color: "FFFFFF", size: 20 }),
              ],
            }),
          ],
          shading: { fill: BRAND_BLUE, type: ShadingType.CLEAR, color: "auto" },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
        })
    ),
  });

  const bodyRows = body.map(
    (row, idx) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({ children: parseInline(cell) }),
              ],
              shading:
                idx % 2 === 1
                  ? { fill: STRIPE_BLUE, type: ShadingType.CLEAR, color: "auto" }
                  : { fill: "FFFFFF", type: ShadingType.CLEAR, color: "auto" },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
            })
        ),
      })
  );

  return new Table({
    rows: [headerRow, ...bodyRows],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function exportToDocx(
  reportMarkdown: string,
  filename = "ux-scout-report.docx"
) {
  const blocks = parseBlocks(reportMarkdown);
  const children: (Paragraph | Table)[] = [];

  // Document title
  children.push(
    new Paragraph({
      text: "UX Scout — Intelligence Report",
      heading: HeadingLevel.TITLE,
    }),
    new Paragraph({ text: "" })
  );

  for (const block of blocks) {
    switch (block.kind) {
      case "heading": {
        const level =
          block.level === 1
            ? HeadingLevel.HEADING_1
            : block.level === 2
            ? HeadingLevel.HEADING_2
            : HeadingLevel.HEADING_3;
        children.push(new Paragraph({ text: block.text, heading: level }));
        break;
      }

      case "paragraph":
        children.push(
          new Paragraph({
            children: parseInline(block.text),
            alignment: AlignmentType.LEFT,
          })
        );
        break;

      case "bullet":
        children.push(
          new Paragraph({
            children: parseInline(block.text),
            bullet: { level: 0 },
          })
        );
        break;

      case "numbered":
        // Manually prefix the number — avoids docx numbering config complexity
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: `${block.n}. `, bold: true }),
              ...parseInline(block.text),
            ],
          })
        );
        break;

      case "blockquote":
        children.push(
          new Paragraph({
            children: parseInline(block.text),
            indent: { left: 720, right: 0 },
          })
        );
        break;

      case "table":
        children.push(buildDocxTable(block.rows));
        children.push(new Paragraph({ text: "" }));
        break;

      case "blank":
        children.push(new Paragraph({ text: "" }));
        break;
    }
  }

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}
