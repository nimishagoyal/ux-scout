// ─────────────────────────────────────────────────────────────
// Markdown report → structured shapes for the bespoke study viewer.
//
// The backend agent is instructed to emit exactly 6 sections (# 1. Executive
// Summary, # 2. Competitor Feature Matrix, ...). We split by those headings
// and parse each section into the shapes the design expects.
//
// Forgiving: if a sub-parser fails, the renderer can fall back to the raw
// markdown for that section.
// ─────────────────────────────────────────────────────────────

export interface ParsedPattern {
  name: string;
  frequency?: string;
  what?: string;
  why?: string;
  tradeoff?: string;
  body: string;
}

export interface ParsedMatrix {
  competitors: string[];
  features: string[];
  values: Record<string, Record<string, string>>;
}

export interface ParsedJourney {
  app: string;
  steps: { name: string; hint: string }[];
  body: string;
}

export interface ParsedInsight {
  stat: string;
  suffix?: string;
  body: string;
}

export interface ParsedRecommendation {
  priority?: "High" | "Medium" | "Low";
  headline: string;
  rationale?: string;
  impact?: string;
  effort?: string;
  cites?: string[];
  body: string;
}

export interface ParsedReport {
  summary: { text: string; firstParagraph: string; topRec: string };
  matrix: ParsedMatrix | null;
  patterns: ParsedPattern[];
  journeys: ParsedJourney[];
  insights: ParsedInsight[];
  recommendations: ParsedRecommendation[];
  apps: string[]; // pulled from matrix
  sections: {
    summary: string;
    matrix: string;
    patterns: string;
    journeys: string;
    insights: string;
    recommendations: string;
  };
}

const stripMd = (s: string) =>
  s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").trim();

function splitSections(md: string): Record<string, string> {
  // Split on `# 1.`, `# 2.`, ... or `## 1.`, etc.
  // Allow optional bold/spacing variants.
  const lines = md.split("\n");
  const buckets: Record<string, string[]> = {
    summary: [],
    matrix: [],
    patterns: [],
    journeys: [],
    insights: [],
    recommendations: [],
  };
  let current: keyof typeof buckets | null = null;
  const headingRe = /^#{1,3}\s*\*?\*?(\d+)\.?\s+(.+?)\*?\*?\s*$/;

  for (const line of lines) {
    const m = line.match(headingRe);
    if (m) {
      const n = parseInt(m[1]);
      const title = m[2].toLowerCase();
      if (n === 1 || title.includes("summary")) current = "summary";
      else if (n === 2 || title.includes("matrix")) current = "matrix";
      else if (n === 3 || title.includes("pattern")) current = "patterns";
      else if (n === 4 || title.includes("journey") || title.includes("screenshot")) current = "journeys";
      else if (n === 5 || title.includes("insight")) current = "insights";
      else if (n === 6 || title.includes("recommend")) current = "recommendations";
      else current = null;
      continue;
    }
    if (current) buckets[current].push(line);
  }

  const out: Record<string, string> = {};
  for (const k of Object.keys(buckets)) {
    out[k] = buckets[k].join("\n").trim();
  }
  return out;
}

function parseSummary(md: string): { text: string; firstParagraph: string; topRec: string } {
  const clean = md.replace(/^---+\s*$/gm, "").trim();
  const paragraphs = clean.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const firstParagraph = paragraphs[0] ? stripMd(paragraphs[0]) : "";
  // Heuristic: the "top recommendation" is usually the last sentence of the
  // executive summary, or a sentence starting with "The single most..." /
  // "The most important..." etc.
  let topRec = "";
  const recMatch = clean.match(/The (?:single most |most )?important recommendation is[^.]*\./i) ||
    clean.match(/The biggest opportunity[^.]*\./i) ||
    clean.match(/(?:Top|Key) recommendation[s]?:?\s*[^.]*\./i);
  if (recMatch) topRec = stripMd(recMatch[0]);
  return { text: clean, firstParagraph, topRec };
}

function parseMatrix(md: string): ParsedMatrix | null {
  const lines = md.split("\n");
  const tableLines: string[] = [];
  for (const line of lines) {
    const t = line.trim();
    if (t.startsWith("|") && t.endsWith("|")) tableLines.push(t);
    else if (tableLines.length > 0 && t === "") break;
  }
  if (tableLines.length < 3) return null;

  const isSeparator = (l: string) => /^\|[\s\-:|]+\|$/.test(l);
  const cells = (l: string) =>
    l.slice(1, -1).split("|").map((c) => stripMd(c.trim()));

  const rows = tableLines.filter((l) => !isSeparator(l)).map(cells);
  if (rows.length < 2) return null;

  const [header, ...body] = rows;
  // First column is the competitor; rest are feature columns
  const features = header.slice(1);
  const competitors: string[] = [];
  const values: Record<string, Record<string, string>> = {};
  for (const row of body) {
    if (row.length < 2) continue;
    const name = row[0];
    if (!name) continue;
    competitors.push(name);
    values[name] = {};
    for (let i = 0; i < features.length; i++) {
      values[name][features[i]] = row[i + 1] || "";
    }
  }
  return { competitors, features, values };
}

function parsePatterns(md: string): ParsedPattern[] {
  // Split by ### headings
  const sections = md.split(/^###\s+/m).filter((s) => s.trim().length > 0);
  // The first chunk is intro text before any heading—drop if no "### " pattern preceded
  const withHeadings = md.match(/^###\s+/m) ? sections.slice(md.startsWith("###") ? 0 : 1) : [];
  const patterns: ParsedPattern[] = [];
  for (const chunk of withHeadings) {
    const [first, ...rest] = chunk.split("\n");
    const name = stripMd(first).replace(/^\s*\d+\.\s*/, "");
    if (!name) continue;
    const body = rest.join("\n").trim();

    const freqMatch = body.match(/\*?\*?Frequency[:\s]+\*?\*?\s*([^\n]+)/i);
    const whatMatch = body.match(/\*?\*?(?:What it is|Description)[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Why|Frequency|Tradeoff)|\n\s*###|\n\s*$)/i);
    const whyMatch = body.match(/\*?\*?Why(?: it works)?[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Tradeoff|Frequency)|\n\s*###|\n\s*$)/i);
    const tradeMatch = body.match(/\*?\*?Tradeoffs?[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*###|\n\s*$)/i);

    patterns.push({
      name,
      frequency: freqMatch ? stripMd(freqMatch[1].trim()) : undefined,
      what: whatMatch ? stripMd(whatMatch[1].trim()) : undefined,
      why: whyMatch ? stripMd(whyMatch[1].trim()) : undefined,
      tradeoff: tradeMatch ? stripMd(tradeMatch[1].trim()) : undefined,
      body,
    });
  }
  // Fallback: no ### headings — try bold headings
  if (patterns.length === 0) {
    const boldChunks = md.split(/^\*\*([^*]+)\*\*\s*$/m);
    for (let i = 1; i < boldChunks.length; i += 2) {
      const name = boldChunks[i].trim();
      const body = (boldChunks[i + 1] || "").trim();
      if (name) patterns.push({ name, body });
    }
  }
  return patterns;
}

function parseJourneys(md: string, competitorsHint: string[]): ParsedJourney[] {
  const journeys: ParsedJourney[] = [];
  // Try splitting by ### headings first
  const sections = md.split(/^###\s+/m).filter((s) => s.trim().length > 0);
  const headed = md.match(/^###\s+/m) ? (md.startsWith("###") ? sections : sections.slice(1)) : [];
  for (const chunk of headed) {
    const [first, ...rest] = chunk.split("\n");
    const app = stripMd(first).replace(/^[\s\d.]+/, "").trim();
    if (!app) continue;
    const body = rest.join("\n").trim();
    const steps = extractSteps(body);
    journeys.push({ app, steps, body });
  }
  // Fallback: split by bold competitor names
  if (journeys.length === 0 && competitorsHint.length > 0) {
    let remaining = md;
    for (let i = 0; i < competitorsHint.length; i++) {
      const name = competitorsHint[i];
      const start = remaining.indexOf(name);
      if (start === -1) continue;
      const nextName = competitorsHint
        .slice(i + 1)
        .map((n) => remaining.indexOf(n, start + name.length))
        .filter((idx) => idx > start)
        .sort((a, b) => a - b)[0];
      const end = nextName ?? remaining.length;
      const body = remaining.slice(start + name.length, end).trim();
      journeys.push({ app: name, steps: extractSteps(body), body });
    }
  }
  return journeys;
}

function extractSteps(body: string): { name: string; hint: string }[] {
  // Look for numbered or bulleted lists with short labels
  const stepRe = /^(?:\d+[.)]|\*|-)\s+\*?\*?([^:*\n]{3,60}?)\*?\*?\s*(?:[:—\-]\s*(.+))?$/gm;
  const out: { name: string; hint: string }[] = [];
  let m;
  while ((m = stepRe.exec(body)) !== null) {
    const name = stripMd(m[1].trim()).replace(/\.$/, "");
    const hint = m[2] ? stripMd(m[2].trim()) : "";
    if (name && name.length < 80) out.push({ name, hint });
  }
  return out.slice(0, 6);
}

function parseInsights(md: string): ParsedInsight[] {
  const insights: ParsedInsight[] = [];
  // Pattern: bullets that lead with a stat (e.g. "78% of top apps...", "Most apps...", "4 of 5")
  const bulletRe = /^(?:[-*]\s+|\d+\.\s+)\*?\*?"?([^"\n]+?)"?\*?\*?\s*$/gm;
  let m;
  while ((m = bulletRe.exec(md)) !== null) {
    const line = stripMd(m[1].trim());
    if (!line) continue;
    const statMatch = line.match(/^([\d.]+%?|[\d]+\s*(?:of|\/)\s*\d+|Most|All|None|Only)/i);
    if (statMatch) {
      const stat = statMatch[1];
      let suffix = "";
      const rest = line.slice(stat.length).trim();
      // Try to extract a short suffix like "of top apps"
      const suffixMatch = rest.match(/^(of [a-z ]+|apps|competitors)/i);
      if (suffixMatch) suffix = suffixMatch[1];
      const body = rest.replace(/^[:.\-—]\s*/, "");
      insights.push({ stat, suffix, body });
    } else if (line.length > 0 && line.length < 200) {
      // Generic insight: take first 3-4 words as the stat
      const words = line.split(/\s+/);
      const headStat = words.slice(0, 3).join(" ");
      const body = words.slice(3).join(" ");
      insights.push({ stat: headStat, body });
    }
  }
  return insights.slice(0, 6);
}

function parseRecommendations(md: string): ParsedRecommendation[] {
  const recs: ParsedRecommendation[] = [];
  // Split by ### heading
  const sections = md.split(/^###\s+/m).filter((s) => s.trim().length > 0);
  const headed = md.match(/^###\s+/m) ? (md.startsWith("###") ? sections : sections.slice(1)) : [];
  for (const chunk of headed) {
    const [first, ...rest] = chunk.split("\n");
    const headline = stripMd(first).replace(/^(?:Recommendation\s*)?(?:\d+[.:)]?\s*)/i, "").trim();
    if (!headline) continue;
    const body = rest.join("\n").trim();

    const priorityMatch = body.match(/\*?\*?Priority[:\s]+\*?\*?\s*(High|Medium|Low)/i);
    const rationaleMatch = body.match(/\*?\*?Rationale[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Supporting|Impact|Priority|Effort|Examples)|\n\s*\*\*|$)/i);
    const impactMatch = body.match(/\*?\*?(?:Expected\s+)?Impact[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Priority|Supporting|Effort)|\n\s*\*\*|$)/i);
    const effortMatch = body.match(/\*?\*?Effort[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Priority|Supporting)|\n\s*\*\*|$)/i);
    const citesMatch = body.match(/\*?\*?(?:Supporting|Examples?|Cite[ds]?|Seen in)[:\s]+\*?\*?\s*([\s\S]*?)(?=\n\s*[-*]\s*\*?\*?(?:Priority|Impact|Effort)|\n\s*\*\*|$)/i);

    let cites: string[] | undefined;
    if (citesMatch) {
      const citeText = stripMd(citesMatch[1]);
      cites = citeText
        .split(/[,;·•\n]+/)
        .map((c) => c.replace(/^[-*]\s*/, "").trim())
        .filter((c) => c.length > 0 && c.length < 60)
        .slice(0, 4);
    }

    const priority = priorityMatch
      ? (priorityMatch[1] as "High" | "Medium" | "Low")
      : undefined;

    recs.push({
      priority,
      headline,
      rationale: rationaleMatch ? stripMd(rationaleMatch[1].trim()).slice(0, 400) : undefined,
      impact: impactMatch ? stripMd(impactMatch[1].trim()).slice(0, 200) : undefined,
      effort: effortMatch ? stripMd(effortMatch[1].trim()).slice(0, 80) : undefined,
      cites,
      body,
    });
  }
  return recs;
}

export function parseReport(md: string): ParsedReport {
  const sections = splitSections(md);
  const summary = parseSummary(sections.summary || "");
  const matrix = parseMatrix(sections.matrix || "");
  const patterns = parsePatterns(sections.patterns || "");
  const journeys = parseJourneys(sections.journeys || "", matrix?.competitors || []);
  const insights = parseInsights(sections.insights || "");
  const recommendations = parseRecommendations(sections.recommendations || "");

  return {
    summary,
    matrix,
    patterns,
    journeys,
    insights,
    recommendations,
    apps: matrix?.competitors || [],
    sections: {
      summary: sections.summary || "",
      matrix: sections.matrix || "",
      patterns: sections.patterns || "",
      journeys: sections.journeys || "",
      insights: sections.insights || "",
      recommendations: sections.recommendations || "",
    },
  };
}
