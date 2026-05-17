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
  imageUrls: string[];
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

function extractImageUrls(body: string): string[] {
  const re = /!\[[^\]]*\]\(((?:https?:\/\/|\/)[^)]+)\)/g;
  const urls: string[] = [];
  let m;
  while ((m = re.exec(body)) !== null) {
    urls.push(m[1]);
  }
  return urls;
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
    journeys.push({ app, steps, body, imageUrls: extractImageUrls(body) });
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
      journeys.push({ app: name, steps: extractSteps(body), body, imageUrls: extractImageUrls(body) });
    }
  }
  return journeys;
}

function extractSteps(body: string): { name: string; hint: string }[] {
  const out: { name: string; hint: string }[] = [];

  // Primary format Jose's prompt enforces:
  //   1. **Title or Screenshot N — Real Name** — description
  const boldRe = /^\s*\d+[.)]\s+\*\*([^*]+?)\*\*\s*[—–\-:]?\s*(.*)$/gm;
  let m: RegExpExecArray | null;
  while ((m = boldRe.exec(body)) !== null) {
    const rawName = stripMd(m[1].trim()).replace(/\.$/, "");
    // Strip leading "Screenshot N — " when Claude prefixes the title.
    const cleanName =
      rawName.replace(/^Screen(?:shot)?\s*\d+\s*[—–\-:]?\s*/i, "").trim() ||
      rawName;
    const hint = stripMd(
      m[2]
        .trim()
        .replace(/^\*\*+|\*\*+$/g, "")
        .replace(/^[—–\-:]\s*/, "")
    );
    if (cleanName) out.push({ name: cleanName, hint });
  }

  // Fallback: plain numbered items without bold.
  if (out.length === 0) {
    const plainRe = /^\s*\d+[.)]\s+([^\n]+)$/gm;
    while ((m = plainRe.exec(body)) !== null) {
      const text = stripMd(m[1].trim());
      const dashMatch = text.match(/^(.{3,60}?)\s*[—–\-:]\s*(.+)$/);
      if (dashMatch) {
        out.push({
          name: dashMatch[1].trim(),
          hint: dashMatch[2].trim(),
        });
      } else if (text.length < 80) {
        out.push({ name: text, hint: "" });
      }
    }
  }

  return out.slice(0, 6);
}

function extractStatFromLead(lead: string): {
  stat: string;
  suffix: string;
  remainder: string;
} {
  const text = lead.trim();

  // "78%" / "78.5%"
  let m = text.match(/^([\d.]+%)/);
  if (m) {
    return { stat: m[1], suffix: "", remainder: text.slice(m[0].length).trim() };
  }

  // "3 of 4" / "9 / 12"
  m = text.match(/^([\d.]+)\s*(?:of|\/)\s*(\d+)/i);
  if (m) {
    return {
      stat: `${m[1]} / ${m[2]}`,
      suffix: "",
      remainder: text.slice(m[0].length).trim(),
    };
  }

  // "11s" / "30s" — number + single letter unit
  m = text.match(/^([\d.]+)([a-z])\b/);
  if (m) {
    return { stat: m[1], suffix: m[2], remainder: text.slice(m[0].length).trim() };
  }

  // "5.4 screens" — number + word unit
  m = text.match(/^([\d.]+)\s+([a-z]+s?)\b/i);
  if (m) {
    return {
      stat: m[1],
      suffix: m[2].toLowerCase(),
      remainder: text.slice(m[0].length).trim(),
    };
  }

  // "All 4 apps" / "Every app" / "Most apps"
  m = text.match(/^(All|Most|Every|None|Only|Some|Each|Half)(?:\s+(\d+))?\s+([a-z]+s?)\b/i);
  if (m) {
    const num = m[2] ? ` ${m[2]}` : "";
    return {
      stat: `${m[1]}${num}`,
      suffix: m[3].toLowerCase(),
      remainder: text.slice(m[0].length).trim(),
    };
  }

  // Pure number
  m = text.match(/^([\d.]+)/);
  if (m) {
    return { stat: m[1], suffix: "", remainder: text.slice(m[0].length).trim() };
  }

  // Fallback: first 1-2 words as stat
  const words = text.split(/\s+/);
  return {
    stat: words.slice(0, Math.min(2, words.length)).join(" "),
    suffix: "",
    remainder: words.slice(2).join(" "),
  };
}

function parseInsights(md: string): ParsedInsight[] {
  const insights: ParsedInsight[] = [];

  // Pattern 1: blockquotes with bold lead (Claude's preferred format).
  // > **All 4 apps prioritize phone verification** — signaling that phone numbers...
  // > **78% of top apps defer signup** until the first interaction.
  const blockquoteRe = /^>\s*\*\*([^*]+)\*\*\s*[—–\-]?\s*([^\n]*)$/gm;
  let m: RegExpExecArray | null;
  while ((m = blockquoteRe.exec(md)) !== null) {
    const boldLead = m[1].trim();
    const after = m[2].trim();
    const { stat, suffix, remainder } = extractStatFromLead(boldLead);
    const body = stripMd([remainder, after].filter(Boolean).join(" ").trim());
    insights.push({ stat, suffix, body });
  }

  // Pattern 2: bullets with bold lead.
  // - **78% of top apps...** body
  if (insights.length === 0) {
    const bulletBoldRe = /^(?:[-*]|\d+\.)\s+\*\*([^*]+)\*\*\s*[—–\-]?\s*([^\n]*)$/gm;
    while ((m = bulletBoldRe.exec(md)) !== null) {
      const boldLead = m[1].trim();
      const after = m[2].trim();
      const { stat, suffix, remainder } = extractStatFromLead(boldLead);
      const body = stripMd([remainder, after].filter(Boolean).join(" ").trim());
      insights.push({ stat, suffix, body });
    }
  }

  // Pattern 3: plain bullets starting with a stat-like prefix.
  if (insights.length === 0) {
    const plainBulletRe = /^(?:[-*]|\d+\.)\s+([^\n]+)$/gm;
    while ((m = plainBulletRe.exec(md)) !== null) {
      const line = stripMd(m[1].trim());
      if (!line) continue;
      const { stat, suffix, remainder } = extractStatFromLead(line);
      const body = remainder.replace(/^[:.\-—\s]+/, "");
      if (stat && body) insights.push({ stat, suffix, body });
    }
  }

  return insights.slice(0, 6);
}

// Extract a single-line field value from a recommendation body.
// Tolerates:  **Field:** value   |   - **Field:** value   |   **Field**: value
//             |   **Field Name with spaces:** value
function extractField(body: string, nameRe: RegExp): string | undefined {
  const re = new RegExp(
    `(?:^|\\n)\\s*(?:[-*]\\s+)?\\*?\\*?(${nameRe.source})\\*?\\*?\\s*:\\s*\\*?\\*?\\s*([^\\n]+?)\\s*(?=\\n|$)`,
    "i"
  );
  const m = body.match(re);
  if (!m) return undefined;
  const value = m[2].replace(/\*+$/, "").trim();
  return value.length > 0 ? stripMd(value) : undefined;
}

// Same as extractField but greedy across multiple lines until the next field-like line.
function extractParagraph(body: string, nameRe: RegExp): string | undefined {
  const re = new RegExp(
    `(?:^|\\n)\\s*(?:[-*]\\s+)?\\*?\\*?(${nameRe.source})\\*?\\*?\\s*:\\s*([\\s\\S]*?)(?=\\n\\s*(?:[-*]\\s+)?\\*\\*[A-Z]|\\n\\s*###|\\z)`,
    "i"
  );
  const m = body.match(re);
  if (!m) return undefined;
  const value = stripMd(m[2].trim());
  return value.length > 0 ? value : undefined;
}

function parseRecommendations(md: string): ParsedRecommendation[] {
  const recs: ParsedRecommendation[] = [];
  const sections = md.split(/^###\s+/m).filter((s) => s.trim().length > 0);
  const headed = md.match(/^###\s+/m)
    ? md.startsWith("###")
      ? sections
      : sections.slice(1)
    : [];
  for (const chunk of headed) {
    const [first, ...rest] = chunk.split("\n");
    const headline = stripMd(first)
      .replace(/^(?:Recommendation\s*)?(?:\d+[.:)]?\s*)/i, "")
      .trim();
    if (!headline) continue;
    const body = rest.join("\n").trim();

    const priorityRaw = extractField(body, /Priority/);
    const priority = priorityRaw && /high|medium|low/i.test(priorityRaw)
      ? (priorityRaw.match(/high|medium|low/i)![0].replace(
          /^./,
          (c) => c.toUpperCase()
        ) as "High" | "Medium" | "Low")
      : undefined;

    // Recommendation field (Claude's separate sentence) becomes part of rationale.
    const recSentence = extractParagraph(body, /Recommendation/);
    const rationale = extractParagraph(body, /Rationale|Reasoning|Why/);
    const composedRationale = [recSentence, rationale]
      .filter(Boolean)
      .join(" ");

    const impact = extractParagraph(
      body,
      /Expected\s+(?:UX\s+)?Impact|Expected\s+(?:Business\s+)?Outcome|Impact/
    );
    const effort = extractParagraph(
      body,
      /Effort|Estimated\s+Effort|Cost|Build\s+Effort/
    );
    const citesText = extractParagraph(
      body,
      /Competitor\s+examples?|Supporting\s+examples?|Supporting\s+evidence|Supporting|Examples?|Cite[ds]?|Seen\s+in|Competitors/
    );

    let cites: string[] | undefined;
    if (citesText) {
      // Try splitting by comma/semicolon/bullet first.
      const parts = citesText
        .split(/[,;·•\n]+/)
        .map((c) => c.replace(/^[-*]\s*/, "").trim())
        .filter((c) => c.length > 0 && c.length < 60);

      // If we got a single long sentence, try to extract Capitalized brand-like tokens.
      if (parts.length <= 1) {
        const tokens = citesText.match(/\b[A-Z][A-Za-z0-9]+(?:\s+[A-Z][A-Za-z0-9]+)?\b/g) || [];
        // Filter common starter words like "The", "A", "While", "While", etc.
        const STOPWORDS = new Set([
          "The", "A", "An", "While", "And", "Or", "But", "For", "In", "On", "To",
          "Both", "Their", "Its", "This", "That", "These", "Those", "All", "Most",
          "Every", "Some", "None", "Only", "Each",
        ]);
        const brandTokens = [...new Set(tokens.filter((t) => !STOPWORDS.has(t)))];
        if (brandTokens.length > 0) cites = brandTokens.slice(0, 4);
      } else {
        cites = parts.slice(0, 4);
      }
    }

    recs.push({
      priority,
      headline,
      rationale: composedRationale
        ? composedRationale.slice(0, 500).trim()
        : undefined,
      impact: impact ? impact.slice(0, 240).trim() : undefined,
      effort: effort ? effort.slice(0, 80).trim() : undefined,
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
