"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { S, Stype, sf } from "@/lib/tokens";
import { exportToDocx } from "@/lib/exportDocx";
import { exportToPdf } from "@/lib/exportPdf";
import {
  parseReport,
  type ParsedJourney,
  type ParsedMatrix,
  type ParsedPattern,
  type ParsedRecommendation,
} from "@/lib/parseReport";
import {
  EMPTY_ANSWERS,
  IMPROVEMENT_AREA_OPTIONS,
  TARGET_USER_OPTIONS,
  type InterviewFlow,
  type PrototypeInterviewAnswers,
  type Recommendation,
} from "@/types";

const SIDEBAR_W = 264;

type FlowType =
  | "onboarding"
  | "paywall"
  | "checkout"
  | "navigation"
  | "empty-state"
  | "search"
  | "settings";

interface Study {
  id: string;
  title: string;
  short: string;
  date: string;
  question: string;
  industry: string;
  touchpoint: string;
  goal: string;
  report: string;
  createdAt: number;
  prototypePrompt?: string;
}

const STORAGE_KEY = "uxscout:studies";
const FLOW_LIST: FlowType[] = [
  "onboarding",
  "paywall",
  "checkout",
  "navigation",
  "empty-state",
  "search",
  "settings",
];

const APP_CHIPS: { label: "industry" | "touchpoint" | "goal"; chips: string[] }[] = [
  {
    label: "industry",
    chips: [
      "AI productivity",
      "rideshare",
      "ecommerce",
      "fintech",
      "health",
      "social",
      "travel",
    ],
  },
  {
    label: "touchpoint",
    chips: [
      "onboarding",
      "checkout",
      "paywall",
      "navigation",
      "KYC",
      "empty states",
      "charts",
      "notifications",
    ],
  },
  {
    label: "goal",
    chips: [
      "improve activation",
      "reduce friction",
      "increase trust",
      "improve retention",
      "improve conversion",
      "simplify complexity",
      "benchmark competitors",
      "create delight",
    ],
  },
];

const PROCESSING_STEPS = [
  { id: "scan",    label: "Reading the competitive landscape", sub: "gathering flows · clustering by app" },
  { id: "pattern", label: "Identifying recurring UX patterns", sub: "comparing gestures across apps" },
  { id: "synth",   label: "Synthesizing comparative insights", sub: "benchmarking · weighting evidence" },
  { id: "write",   label: "Writing your recommendations",      sub: "tailored to your product context" },
];

type Screen = "library" | "new" | "processing" | "study" | "prototype" | "prompt";

function loadStudies(): Study[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Study[]) : [];
  } catch {
    return [];
  }
}

function saveStudies(studies: Study[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(studies));
  } catch {
    /* ignore */
  }
}

function inferFlowType(touchpoint: string): FlowType {
  const t = touchpoint.toLowerCase();
  for (const f of FLOW_LIST) {
    if (t.includes(f.replace("-", " ")) || t.includes(f)) return f;
  }
  if (t.includes("empty")) return "empty-state";
  if (t.includes("kyc")) return "onboarding";
  return "onboarding";
}

function inferCategory(industry: string, question: string): string {
  if (industry) return industry;
  const q = question.toLowerCase();
  for (const known of ["rideshare", "fintech", "health", "ecommerce", "travel", "social", "productivity"]) {
    if (q.includes(known)) return known;
  }
  return "general";
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  if (sameDay) {
    return `today · ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  }
  const days = Math.floor((today.getTime() - ts) / (1000 * 60 * 60 * 24));
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? "" : "s"} ago`;
  return d.toLocaleDateString();
}

function firstSentence(text: string, max = 160): string {
  const t = text.trim().replace(/^#.*$/m, "").replace(/[\n\r]+/g, " ").trim();
  const m = t.match(/^[^.!?]+[.!?]/);
  const out = m ? m[0] : t;
  return out.length > max ? out.slice(0, max - 1) + "…" : out;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────
function Sidebar({
  screen,
  activeStudyId,
  studies,
  onNavigate,
  onOpenStudy,
}: {
  screen: Screen;
  activeStudyId: string | null;
  studies: Study[];
  onNavigate: (s: Screen) => void;
  onOpenStudy: (id: string) => void;
}) {
  const navItems: { id: Screen; icon: string; label: string }[] = [
    { id: "library", icon: "◇", label: "Library" },
    { id: "new", icon: "+", label: "New research" },
  ];

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        width: SIDEBAR_W,
        background: "#101317",
        borderRight: `1px solid ${S.rule}`,
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "26px 22px 16px", display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: S.amberGlow,
            boxShadow: `0 0 22px ${S.amberGlow}`,
            animation: "pulse 3s ease-in-out infinite",
          }}
        />
        <div>
          <div style={{ ...sf(18, 500, 96), fontSize: 17, color: S.bone, letterSpacing: "-.005em" }}>
            UX Scout
          </div>
          <div style={{ ...Stype.micro, fontSize: 9, color: S.faint, marginTop: 2 }}>
            research studio
          </div>
        </div>
      </div>

      <nav style={{ padding: "14px 12px 0" }}>
        {navItems.map((n) => {
          const active = screen === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 12px",
                borderRadius: 6,
                marginBottom: 2,
                background: active ? "rgba(217,150,62,0.10)" : "transparent",
                color: active ? S.bone : S.soft,
                transition: "all 200ms ease",
                cursor: "pointer",
                border: 0,
              }}
            >
              <span style={{ width: 18, textAlign: "center", fontSize: 14, color: active ? S.amberGlow : S.faint }}>
                {n.icon}
              </span>
              <span style={{ ...Stype.body, fontSize: 13.5 }}>{n.label}</span>
            </button>
          );
        })}
      </nav>

      <div
        style={{
          padding: "24px 22px 8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>Studies</div>
        <span style={{ ...Stype.tabular, fontSize: 10, color: S.faint }}>{studies.length}</span>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 12px" }}>
        {studies.length === 0 && (
          <div style={{ ...Stype.body, fontSize: 12, color: S.faint, padding: "10px 12px" }}>
            No studies yet — start one above.
          </div>
        )}
        {studies.map((st) => {
          const active = activeStudyId === st.id && (screen === "study" || screen === "prototype" || screen === "prompt");
          return (
            <button
              key={st.id}
              onClick={() => onOpenStudy(st.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 6,
                marginBottom: 2,
                background: active ? "rgba(244,204,125,0.08)" : "transparent",
                borderLeft: active ? `2px solid ${S.amberGlow}` : "2px solid transparent",
                borderTop: 0,
                borderRight: 0,
                borderBottom: 0,
                cursor: "pointer",
                transition: "all 200ms ease",
              }}
            >
              <div
                style={{
                  ...Stype.body,
                  fontSize: 13,
                  color: active ? S.bone : S.ink,
                  lineHeight: 1.3,
                  marginBottom: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {st.short}
              </div>
              <div style={{ ...Stype.micro, fontSize: 8.5, color: S.faint }}>{formatDate(st.createdAt)}</div>
            </button>
          );
        })}
      </div>

      <div
        style={{
          padding: "14px 22px",
          borderTop: `1px solid ${S.rule}`,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: S.raisedWarm,
            color: S.amberGlow,
            ...sf(13, 500, 96),
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 1px ${S.rule}`,
          }}
        >
          J
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...Stype.body, fontSize: 13, color: S.bone }}>Jamie</div>
          <div
            style={{
              ...Stype.body,
              fontSize: 11,
              color: S.faint,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Stripe · Growth
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ breadcrumb, actions }: { breadcrumb: { label: string; onClick?: () => void }[]; actions?: ReactNode }) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 5,
        height: 64,
        background: "rgba(20,23,28,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${S.rule}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {breadcrumb.map((b, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            {b.onClick ? (
              <button
                onClick={b.onClick}
                style={{
                  ...Stype.body,
                  fontSize: 13.5,
                  color: S.soft,
                  cursor: "pointer",
                  background: "none",
                  border: 0,
                  padding: 0,
                }}
              >
                {b.label}
              </button>
            ) : (
              <span
                style={{
                  ...Stype.body,
                  fontSize: 13.5,
                  color: i === breadcrumb.length - 1 ? S.bone : S.soft,
                }}
              >
                {b.label}
              </span>
            )}
            {i < breadcrumb.length - 1 && <span style={{ color: S.faint, fontSize: 12 }}>›</span>}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>{actions}</div>
    </header>
  );
}

function AppAtmosphere() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `radial-gradient(ellipse 70% 50% at 18% 8%, rgba(217,150,62,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 45% at 88% 96%, rgba(79,115,174,0.06) 0%, transparent 60%)`,
        }}
      />
    </>
  );
}

// ─── Library ─────────────────────────────────────────────────────────────────
function LibraryView({
  studies,
  onOpenStudy,
  onNew,
}: {
  studies: Study[];
  onOpenStudy: (id: string) => void;
  onNew: () => void;
}) {
  const [latest, ...rest] = studies;

  return (
    <div style={{ padding: "36px 48px 64px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 36 }}>
        <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 11 }}>library</div>
        <h1
          style={{
            ...Stype.title,
            fontSize: 48,
            color: S.bone,
            margin: "14px 0 6px",
            letterSpacing: "-.02em",
          }}
        >
          Welcome back, <span style={{ color: S.amberGlow }}>Jamie</span>.
        </h1>
        <p style={{ ...Stype.reading, fontSize: 17, color: S.ink, margin: 0, maxWidth: 640 }}>
          {studies.length === 0
            ? "No studies yet. Start your first research thread below."
            : `${studies.length} ${studies.length === 1 ? "study" : "studies"} in your library. Pick up where you left off — or start a new research thread.`}
        </p>
      </div>

      <button
        onClick={onNew}
        style={{
          width: "100%",
          textAlign: "left",
          padding: "22px 24px",
          background: "rgba(30,34,40,0.4)",
          boxShadow: `0 0 0 1px ${S.rule}`,
          cursor: "pointer",
          transition: "all 200ms ease",
          display: "flex",
          alignItems: "center",
          gap: 16,
          border: 0,
          marginBottom: 44,
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            background: "rgba(217,150,62,0.10)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: S.amberGlow,
            fontSize: 18,
            boxShadow: `0 0 0 1px ${S.amberGlow}33`,
          }}
        >
          +
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone }}>Start new research</div>
          <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>
            Ask a UX question · the studio will read the landscape
          </div>
        </div>
        <span style={{ color: S.faint, fontSize: 14 }}>→</span>
      </button>

      {latest && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 10, marginBottom: 10 }}>
            freshly delivered
          </div>
          <h2 style={{ ...Stype.title, fontSize: 32, color: S.bone, margin: "0 0 18px", letterSpacing: "-.02em" }}>
            Latest report
          </h2>
          <StudyCard study={latest} onOpen={onOpenStudy} featured />
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 10, marginBottom: 10 }}>
            your library
          </div>
          <h2 style={{ ...Stype.title, fontSize: 32, color: S.bone, margin: "0 0 24px", letterSpacing: "-.02em" }}>
            Recent studies
          </h2>
          <div
            style={{
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            }}
          >
            {rest.map((st) => (
              <StudyCard key={st.id} study={st} onOpen={onOpenStudy} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StudyCard({
  study,
  onOpen,
  featured,
}: {
  study: Study;
  onOpen: (id: string) => void;
  featured?: boolean;
}) {
  return (
    <button
      onClick={() => onOpen(study.id)}
      style={{
        textAlign: "left",
        width: "100%",
        background: featured
          ? "linear-gradient(135deg, rgba(48,40,28,0.78) 0%, rgba(35,31,24,0.85) 100%)"
          : "linear-gradient(135deg, rgba(30,34,40,0.5) 0%, rgba(22,25,30,0.6) 100%)",
        boxShadow: featured
          ? "0 0 0 1px rgba(244,204,125,0.30), 0 24px 50px -22px rgba(0,0,0,0.6), 0 0 60px -28px rgba(217,150,62,0.30)"
          : "0 0 0 1px rgba(232,227,210,0.08), 0 14px 30px -16px rgba(0,0,0,0.45)",
        padding: featured ? "26px 28px" : "22px 24px",
        cursor: "pointer",
        transition: "all 250ms ease",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        minHeight: featured ? 220 : 180,
        border: 0,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            ...Stype.eyebrow,
            fontSize: 9,
            padding: "3px 9px",
            color: S.amberGlow,
            border: `1px solid ${S.amberGlow}`,
            letterSpacing: ".18em",
          }}
        >
          fresh
        </span>
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{formatDate(study.createdAt)}</div>
      </div>

      <h3
        style={{
          ...Stype.headline,
          fontSize: featured ? 26 : 20,
          color: S.bone,
          margin: 0,
          lineHeight: 1.15,
          letterSpacing: "-.01em",
        }}
      >
        {study.title}
      </h3>

      <div style={{ ...Stype.reading, fontSize: 14, color: S.ink, lineHeight: 1.5, flex: 1 }}>
        {firstSentence(study.report) || "Open to read the full report."}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 14,
          borderTop: `1px solid ${S.hairline}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          {study.industry && (
            <span style={{ ...Stype.body, fontSize: 11.5, color: S.soft }}>{study.industry}</span>
          )}
          {study.industry && study.touchpoint && (
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: S.faint }} />
          )}
          {study.touchpoint && (
            <span style={{ ...Stype.body, fontSize: 11.5, color: S.soft }}>{study.touchpoint}</span>
          )}
        </div>
        <span style={{ ...Stype.body, fontSize: 12, color: S.amberGlow }}>open ↗</span>
      </div>
    </button>
  );
}

// ─── New research ────────────────────────────────────────────────────────────
function NewResearchView({
  initialQuestion,
  initialChips,
  onStart,
}: {
  initialQuestion: string;
  initialChips: Record<"industry" | "touchpoint" | "goal", string[]>;
  onStart: (args: { question: string; industry: string; touchpoint: string; goal: string }) => void;
}) {
  const [question, setQuestion] = useState(initialQuestion);
  const [chips, setChips] = useState(initialChips);

  const toggle = (group: "industry" | "touchpoint" | "goal", chip: string) => {
    setChips((prev) => {
      const cur = prev[group] || [];
      const on = cur.includes(chip);
      return { ...prev, [group]: on ? cur.filter((c) => c !== chip) : [...cur, chip] };
    });
  };

  const canStart = question.trim().length > 8;

  return (
    <div style={{ padding: "48px 48px 72px", maxWidth: 1280, margin: "0 auto", position: "relative" }}>
      <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 11 }}>new research</div>
      <h1
        style={{
          ...Stype.title,
          fontSize: 52,
          color: S.bone,
          margin: "14px 0 8px",
          letterSpacing: "-.025em",
          lineHeight: 1.0,
        }}
      >
        What product question are you asking?
      </h1>
      <p style={{ ...Stype.reading, fontSize: 17, color: S.ink, margin: 0, maxWidth: 720 }}>
        Describe the UX challenge in plain language. UX Scout reads the competitive landscape, surfaces the
        patterns that hold, and writes a recommendation report.
      </p>

      <div style={{ marginTop: 36, position: "relative" }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={3}
          placeholder="e.g. Reduce friction in our checkout · benchmark KYC across crypto apps"
          style={{
            width: "100%",
            resize: "vertical",
            background: "rgba(20,23,28,0.55)",
            border: 0,
            boxShadow: `0 0 0 1px ${S.threadStrong}`,
            color: S.bone,
            padding: "24px 28px",
            ...sf(28, 400, 95),
            lineHeight: 1.3,
            fontSize: 26,
            letterSpacing: "-.01em",
            outline: "none",
            minHeight: 130,
          }}
        />
      </div>

      <div style={{ marginTop: 64 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 18,
          }}
        >
          <div style={{ ...Stype.eyebrow, color: S.faint, fontSize: 11 }}>or refine by coordinates</div>
          <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>tap to select</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {APP_CHIPS.map((group) => {
            const selected = chips[group.label] || [];
            return (
              <div
                key={group.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "110px 1fr",
                  gap: 24,
                  alignItems: "baseline",
                }}
              >
                <div style={{ ...Stype.micro, fontSize: 9.5, color: S.faint, letterSpacing: ".22em" }}>
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {group.chips.map((c) => (
                    <button
                      key={c}
                      onClick={() => toggle(group.label, c)}
                      style={{
                        cursor: "pointer",
                        ...Stype.body,
                        fontSize: 12.5,
                        padding: "6px 12px",
                        borderRadius: 999,
                        border: `1px solid ${selected.includes(c) ? S.amberGlow : S.rule}`,
                        color: selected.includes(c) ? S.bone : S.soft,
                        background: selected.includes(c) ? "rgba(217,150,62,0.10)" : "transparent",
                        boxShadow: selected.includes(c)
                          ? "0 0 18px rgba(244,204,125,0.18)"
                          : "none",
                        transition: "all 200ms ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        style={{
          marginTop: 52,
          paddingTop: 28,
          borderTop: `1px solid ${S.hairline}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>scope</div>
          <div style={{ ...Stype.body, fontSize: 13.5, color: S.ink, marginTop: 4 }}>
            powered by Claude · 30–60 seconds to a full report
          </div>
        </div>
        <button
          disabled={!canStart}
          onClick={() =>
            onStart({
              question,
              industry: chips.industry[0] || "",
              touchpoint: chips.touchpoint[0] || "",
              goal: chips.goal[0] || "",
            })
          }
          style={{
            ...Stype.bodyMed,
            fontSize: 14,
            padding: "12px 22px",
            background: canStart ? S.amberGlow : "transparent",
            color: canStart ? "#1a1310" : S.faint,
            border: canStart ? 0 : `1px solid ${S.rule}`,
            boxShadow: canStart ? "0 0 28px rgba(244,204,125,0.32)" : "none",
            cursor: canStart ? "pointer" : "not-allowed",
            transition: "all 200ms ease",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span>Begin research</span>
          <span style={{ fontSize: 14 }}>↵</span>
        </button>
      </div>
    </div>
  );
}

// ─── Processing ─────────────────────────────────────────────────────────────
function ProcessingView({ question, done }: { question: string; done: boolean }) {
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    if (done) {
      setStepIdx(PROCESSING_STEPS.length);
      return;
    }
    if (stepIdx >= PROCESSING_STEPS.length - 1) return;
    const t = setTimeout(() => setStepIdx((i) => Math.min(i + 1, PROCESSING_STEPS.length - 1)), 8000);
    return () => clearTimeout(t);
  }, [stepIdx, done]);

  const progress = done ? 1 : Math.min((stepIdx + 0.5) / PROCESSING_STEPS.length, 0.95);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%,-50%)",
          width: 900,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle at 50% 45%, rgba(217,150,62,0.18) 0%, transparent 60%)",
          filter: "blur(80px)",
          animation: "breath 4s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", zIndex: 2, width: "min(720px, 90%)", textAlign: "center" }}>
        <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 11 }}>generating · UX Scout</div>
        <h1
          style={{
            ...Stype.title,
            fontSize: 36,
            color: S.bone,
            margin: "14px 0 12px",
            letterSpacing: "-.02em",
            lineHeight: 1.1,
          }}
        >
          &ldquo;{question}&rdquo;
        </h1>
        <p style={{ ...Stype.reading, fontSize: 16, color: S.soft, margin: 0 }}>
          A full report in ~ 60 seconds.
        </p>

        <div
          style={{
            marginTop: 56,
            textAlign: "left",
            background: "rgba(20,23,28,0.55)",
            boxShadow: `0 0 0 1px ${S.rule}`,
            padding: "20px 28px",
          }}
        >
          {PROCESSING_STEPS.map((step, i) => {
            const isDone = done || i < stepIdx;
            const active = !done && i === stepIdx;
            return (
              <div
                key={step.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "32px 1fr 64px",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: i < PROCESSING_STEPS.length - 1 ? `1px solid ${S.hairline}` : 0,
                  opacity: isDone ? 0.6 : 1,
                  transition: "opacity 400ms",
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                  {isDone && <span style={{ color: S.amberGlow, fontSize: 16 }}>✓</span>}
                  {active && (
                    <span
                      style={{
                        display: "inline-block",
                        width: 16,
                        height: 16,
                        borderRadius: "50%",
                        border: `1.5px solid ${S.amberGlow}33`,
                        borderTopColor: S.amberGlow,
                        animation: "spin 1s linear infinite",
                      }}
                    />
                  )}
                  {!isDone && !active && (
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        border: `1px solid ${S.faint}`,
                      }}
                    />
                  )}
                </div>
                <div>
                  <div style={{ ...Stype.bodyMed, fontSize: 14, color: isDone ? S.soft : S.bone }}>
                    {step.label}
                  </div>
                  <div style={{ ...Stype.body, fontSize: 12, color: S.faint, marginTop: 3 }}>{step.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 24 }}>
          <div style={{ height: 2, background: "rgba(232,227,210,0.10)", overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                background: S.amberGlow,
                boxShadow: `0 0 18px ${S.amberGlow}`,
                transformOrigin: "left",
                transform: `scaleX(${progress})`,
                transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Study viewer (markdown rendering) ─────────────────────────────────────────────
const markdownComponents = {
  h1: (props: React.ComponentPropsWithoutRef<"h1">) => (
    <h1
      {...props}
      style={{
        ...Stype.title,
        fontSize: 32,
        color: S.bone,
        margin: "36px 0 16px",
        letterSpacing: "-.02em",
        lineHeight: 1.1,
        borderBottom: `1px solid ${S.hairline}`,
        paddingBottom: 12,
      }}
    />
  ),
  h2: (props: React.ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      style={{
        ...Stype.headline,
        fontSize: 22,
        color: S.bone,
        margin: "28px 0 12px",
        letterSpacing: "-.015em",
      }}
    />
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      style={{
        ...Stype.headlineMed,
        fontSize: 17,
        color: S.amberGlow,
        margin: "20px 0 8px",
      }}
    />
  ),
  p: (props: React.ComponentPropsWithoutRef<"p">) => (
    <p {...props} style={{ ...Stype.reading, fontSize: 16, color: S.ink, margin: "0 0 16px" }} />
  ),
  li: (props: React.ComponentPropsWithoutRef<"li">) => (
    <li {...props} style={{ ...Stype.reading, fontSize: 16, color: S.ink, marginBottom: 6, lineHeight: 1.55 }} />
  ),
  ul: (props: React.ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} style={{ margin: "0 0 16px", paddingLeft: 22 }} />
  ),
  ol: (props: React.ComponentPropsWithoutRef<"ol">) => (
    <ol {...props} style={{ margin: "0 0 16px", paddingLeft: 22 }} />
  ),
  strong: (props: React.ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} style={{ color: S.bone, fontWeight: 600 }} />
  ),
  em: (props: React.ComponentPropsWithoutRef<"em">) => (
    <em {...props} style={{ color: S.warmLight, fontStyle: "italic" }} />
  ),
  hr: () => <hr style={{ border: 0, borderTop: `1px solid ${S.hairline}`, margin: "32px 0" }} />,
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <div style={{ overflowX: "auto", margin: "16px 0 24px" }}>
      <table
        {...props}
        style={{
          width: "100%",
          borderCollapse: "collapse",
          ...Stype.body,
          fontSize: 13,
          background: "rgba(20,23,28,0.5)",
          boxShadow: `0 0 0 1px ${S.rule}`,
        }}
      />
    </div>
  ),
  th: (props: React.ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      style={{
        padding: "10px 14px",
        textAlign: "left",
        background: "rgba(217,150,62,0.10)",
        color: S.amberGlow,
        ...Stype.eyebrow,
        fontSize: 10,
        letterSpacing: ".15em",
        borderBottom: `1px solid ${S.rule}`,
      }}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      style={{
        padding: "10px 14px",
        color: S.ink,
        borderBottom: `1px solid ${S.hairline}`,
        verticalAlign: "top",
      }}
    />
  ),
  blockquote: (props: React.ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      style={{
        ...Stype.reading,
        fontStyle: "italic",
        margin: "16px 0",
        padding: "12px 18px",
        borderLeft: `2px solid ${S.amberGlow}`,
        color: S.ink,
        background: "rgba(217,150,62,0.05)",
      }}
    />
  ),
  code: (props: React.ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontSize: 13,
        background: "rgba(232,227,210,0.06)",
        color: S.bone,
        padding: "2px 6px",
        borderRadius: 3,
      }}
    />
  ),
};

// ─── Helper components for the rich study viewer ────────────────────────────────
function AppIcon({
  name,
  size = 28,
  color = S.amberGlow,
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: S.raisedWarm,
        color,
        ...sf(size * 0.45, 500, 96),
        letterSpacing: "-.02em",
        boxShadow: `0 0 0 1px ${S.rule}`,
      }}
    >
      {name[0]?.toUpperCase()}
    </span>
  );
}

function KeyValue({
  label,
  value,
  color = S.bone,
}: {
  label: string;
  value: ReactNode;
  color?: string;
}) {
  return (
    <div>
      <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{label}</div>
      <div style={{ ...Stype.bodyMed, fontSize: 14, color, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function PriorityTag({ level }: { level: string }) {
  const lv = level.toUpperCase();
  const color = lv === "HIGH" ? S.amberGlow : lv === "MEDIUM" ? S.cobaltGlow : S.soft;
  return (
    <span
      style={{
        ...Stype.eyebrow,
        fontSize: 9.5,
        padding: "3px 10px",
        border: `1px solid ${color}`,
        color,
        letterSpacing: ".18em",
        display: "inline-block",
      }}
    >
      {lv}
    </span>
  );
}

function Eyebrow({
  children,
  color = S.amberGlow,
  style,
}: {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
}) {
  return <div style={{ ...Stype.eyebrow, color, fontSize: 11, ...style }}>{children}</div>;
}

function SectionHeader({
  eyebrow,
  title,
  right,
}: {
  eyebrow: string;
  title: string;
  right?: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 24,
        gap: 24,
        flexWrap: "wrap",
      }}
    >
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          style={{
            ...Stype.title,
            fontSize: 38,
            color: S.bone,
            margin: "10px 0 0",
            lineHeight: 1.05,
            letterSpacing: "-.02em",
          }}
        >
          {title}
        </h2>
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  );
}

function StudyMarkdown({ md }: { md: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
      {md}
    </ReactMarkdown>
  );
}

const STUDY_NAV: { id: string; n: string; label: string }[] = [
  { id: "summary", n: "01", label: "Executive Summary" },
  { id: "patterns", n: "02", label: "UX Patterns" },
  { id: "matrix", n: "03", label: "Competitor Matrix" },
  { id: "journeys", n: "04", label: "User Journeys" },
  { id: "insights", n: "05", label: "Comparative Insights" },
  { id: "recommendations", n: "06", label: "Recommendations" },
];

function StudySectionNav({
  activeId,
  onJump,
}: {
  activeId: string;
  onJump: (id: string) => void;
}) {
  return (
    <div
      style={{
        position: "sticky",
        top: 64,
        zIndex: 4,
        background: "rgba(20,23,28,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${S.rule}`,
        padding: "0 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "center",
          maxWidth: 1400,
          margin: "0 auto",
          overflow: "auto",
        }}
      >
        {STUDY_NAV.map((sec) => {
          const active = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => onJump(sec.id)}
              style={{
                padding: "14px 16px",
                borderBottom: `2px solid ${active ? S.amberGlow : "transparent"}`,
                color: active ? S.bone : S.soft,
                background: "none",
                borderLeft: 0,
                borderRight: 0,
                borderTop: 0,
                transition: "all 200ms",
                cursor: "pointer",
                whiteSpace: "nowrap",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ ...Stype.tabular, fontSize: 10, color: active ? S.amberGlow : S.faint }}>
                {sec.n}
              </span>
              <span style={{ ...Stype.body, fontSize: 13.5 }}>{sec.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 01 — Summary ──────────────────────────────────────────────────────
function SectionSummary({
  study,
  parsedText,
  topRec,
  apps,
}: {
  study: Study;
  parsedText: string;
  topRec: string;
  apps: string[];
}) {
  return (
    <section id="summary" style={{ scrollMarginTop: 130, padding: "56px 48px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader eyebrow="§01 · executive summary" title="The shape of the market." />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr",
            gap: 48,
            alignItems: "flex-start",
          }}
        >
          <div>
            <div style={{ ...Stype.reading, fontSize: 17, color: S.bone, lineHeight: 1.6 }}>
              <StudyMarkdown md={parsedText} />
            </div>
            {topRec && (
              <div
                style={{
                  marginTop: 28,
                  padding: "20px 24px",
                  background:
                    "linear-gradient(135deg, rgba(48,40,28,0.65) 0%, rgba(35,31,24,0.72) 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(244,204,125,0.30), 0 0 60px -28px rgba(217,150,62,0.30)",
                }}
              >
                <Eyebrow>top recommendation</Eyebrow>
                <div
                  style={{
                    ...Stype.title,
                    fontSize: 24,
                    color: S.bone,
                    marginTop: 10,
                    lineHeight: 1.2,
                  }}
                >
                  {topRec}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div
              style={{
                padding: 24,
                background: "rgba(30,34,40,0.4)",
                boxShadow: `0 0 0 1px ${S.hairline}`,
              }}
            >
              <Eyebrow color={S.faint}>study meta</Eyebrow>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 18,
                  marginTop: 16,
                }}
              >
                {study.industry && <KeyValue label="industry" value={study.industry} />}
                {study.touchpoint && <KeyValue label="touchpoint" value={study.touchpoint} />}
                {study.goal && <KeyValue label="goal" value={study.goal} />}
                <KeyValue label="competitors" value={apps.length || "—"} />
              </div>
            </div>

            {apps.length > 0 && (
              <div>
                <Eyebrow color={S.faint} style={{ marginBottom: 12 }}>
                  apps analyzed
                </Eyebrow>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {apps.map((app) => (
                    <div
                      key={app}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "6px 12px 6px 6px",
                        border: `1px solid ${S.hairline}`,
                        borderRadius: 999,
                        background: "rgba(30,34,40,0.45)",
                      }}
                    >
                      <AppIcon name={app} size={20} />
                      <span style={{ ...Stype.body, fontSize: 12.5, color: S.bone }}>{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Section 02 — Patterns ─────────────────────────────────────────────────────
function PatternCard({
  pt,
  index,
  lit,
}: {
  pt: ParsedPattern;
  index: number;
  lit?: boolean;
}) {
  const aColor = index % 2 === 0 ? S.amberGlow : S.cobaltGlow;
  return (
    <div
      style={{
        background: lit
          ? "linear-gradient(135deg, rgba(48,40,28,0.78) 0%, rgba(35,31,24,0.85) 100%)"
          : "linear-gradient(135deg, rgba(30,34,40,0.5) 0%, rgba(22,25,30,0.58) 100%)",
        boxShadow: lit
          ? "0 0 0 1px rgba(244,204,125,0.32), 0 22px 50px -22px rgba(0,0,0,0.55), 0 0 80px -32px rgba(217,150,62,0.30)"
          : `0 0 0 1px ${S.hairline}, 0 14px 30px -16px rgba(0,0,0,0.45)`,
        padding: 26,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ ...Stype.eyebrow, fontSize: 9.5, color: aColor }}>
          pattern · 0{index + 1}
        </div>
        {pt.frequency && (
          <div style={{ ...Stype.tabular, fontSize: 13, color: aColor }}>{pt.frequency}</div>
        )}
      </div>
      <h3
        style={{
          ...Stype.headline,
          fontSize: lit ? 24 : 20,
          color: S.bone,
          margin: 0,
          lineHeight: 1.15,
        }}
      >
        {pt.name}
      </h3>
      {pt.what && (
        <p style={{ ...Stype.reading, fontSize: 14, color: S.ink, margin: 0, lineHeight: 1.55 }}>
          {pt.what}
        </p>
      )}
      {pt.why && (
        <div
          style={{
            paddingTop: 12,
            borderTop: `1px solid ${S.hairline}`,
          }}
        >
          <Eyebrow color={aColor} style={{ fontSize: 9, marginBottom: 6 }}>
            why it works
          </Eyebrow>
          <p style={{ ...Stype.body, fontSize: 13, color: S.ink, margin: 0, lineHeight: 1.5 }}>
            {pt.why}
          </p>
        </div>
      )}
      {pt.tradeoff && (
        <div
          style={{
            paddingTop: 12,
            borderTop: `1px solid ${S.hairline}`,
          }}
        >
          <Eyebrow color={S.soft} style={{ fontSize: 9, marginBottom: 6 }}>
            tradeoff
          </Eyebrow>
          <p style={{ ...Stype.body, fontSize: 13, color: S.soft, margin: 0, lineHeight: 1.5 }}>
            {pt.tradeoff}
          </p>
        </div>
      )}
      {!pt.what && !pt.why && (
        <div style={{ ...Stype.body, fontSize: 13, color: S.ink, lineHeight: 1.5 }}>
          <StudyMarkdown md={pt.body} />
        </div>
      )}
    </div>
  );
}

function SectionPatterns({ patterns, fallbackMd }: { patterns: ParsedPattern[]; fallbackMd: string }) {
  if (patterns.length === 0) {
    return (
      <section
        id="patterns"
        style={{
          scrollMarginTop: 130,
          padding: "56px 48px",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionHeader eyebrow="§02 · UX pattern analysis" title="Patterns lifting." />
          <StudyMarkdown md={fallbackMd} />
        </div>
      </section>
    );
  }
  const [a, b, ...rest] = patterns;
  return (
    <section
      id="patterns"
      style={{
        scrollMarginTop: 130,
        padding: "56px 48px",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="§02 · UX pattern analysis"
          title={`${patterns.length} pattern${patterns.length === 1 ? "" : "s"} lifting.`}
        />
        {a && b ? (
          <div style={{ display: "grid", gap: 18, gridTemplateColumns: "1.4fr 1fr" }}>
            <PatternCard pt={a} index={0} lit />
            <PatternCard pt={b} index={1} lit />
          </div>
        ) : a ? (
          <PatternCard pt={a} index={0} lit />
        ) : null}
        {rest.length > 0 && (
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gap: 18,
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {rest.map((pt, i) => (
              <PatternCard key={pt.name} pt={pt} index={i + 2} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Section 03 — Matrix ──────────────────────────────────────────────────────
function MatrixCell({ v }: { v: string }) {
  const t = v.trim();
  if (!t || t === "-" || t === "—")
    return <span style={{ color: S.faint }}>—</span>;
  if (t === "✓" || /^y(es)?$/i.test(t))
    return <span style={{ color: S.amberGlow, fontSize: 16 }}>✓</span>;
  if (t === "✗" || /^n(o)?$/i.test(t))
    return <span style={{ color: S.faint, fontSize: 14 }}>✗</span>;
  if (/^partial$/i.test(t))
    return (
      <span style={{ color: S.soft, ...Stype.body, fontSize: 11.5 }}>partial</span>
    );
  return <span style={{ color: S.ink, ...Stype.body, fontSize: 12.5 }}>{t}</span>;
}

function SectionMatrix({
  matrix,
  fallbackMd,
}: {
  matrix: ParsedMatrix | null;
  fallbackMd: string;
}) {
  if (!matrix || matrix.competitors.length === 0 || matrix.features.length === 0) {
    return (
      <section id="matrix" style={{ scrollMarginTop: 130, padding: "56px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionHeader eyebrow="§03 · competitor feature matrix" title="How they differ." />
          <StudyMarkdown md={fallbackMd} />
        </div>
      </section>
    );
  }
  return (
    <section id="matrix" style={{ scrollMarginTop: 130, padding: "56px 48px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader eyebrow="§03 · competitor feature matrix" title="How they differ." />
        <div
          style={{
            background: "rgba(20,23,28,0.4)",
            boxShadow: `0 0 0 1px ${S.hairline}`,
            padding: "8px 24px 16px",
            overflowX: "auto",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: 600,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "14px 12px 14px 0",
                    borderBottom: `1px solid ${S.threadStrong}`,
                    ...Stype.eyebrow,
                    color: S.amberGlow,
                    fontSize: 10,
                  }}
                >
                  competitor
                </th>
                {matrix.features.map((f) => (
                  <th
                    key={f}
                    style={{
                      textAlign: "center",
                      padding: "14px 8px",
                      borderBottom: `1px solid ${S.threadStrong}`,
                      ...Stype.eyebrow,
                      color: S.bone,
                      fontSize: 9.5,
                    }}
                  >
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.competitors.map((comp) => (
                <tr key={comp}>
                  <td
                    style={{
                      padding: "14px 12px 14px 0",
                      borderBottom: `1px solid ${S.hairline}`,
                      verticalAlign: "middle",
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                      <AppIcon name={comp} size={24} />
                      <span style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone }}>{comp}</span>
                    </span>
                  </td>
                  {matrix.features.map((f) => (
                    <td
                      key={f}
                      style={{
                        padding: "14px 8px",
                        textAlign: "center",
                        borderBottom: `1px solid ${S.hairline}`,
                      }}
                    >
                      <MatrixCell v={matrix.values[comp]?.[f] || ""} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ─── Section 04 — Journeys ────────────────────────────────────────────────────
function JourneyStrip({ journey, index }: { journey: ParsedJourney; index: number }) {
  const aColor = index % 2 === 0 ? S.amberGlow : S.cobaltGlow;
  return (
    <div
      style={{
        padding: 24,
        background: "rgba(30,34,40,0.4)",
        boxShadow: `0 0 0 1px ${S.hairline}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 18,
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <AppIcon name={journey.app} size={32} />
          <div>
            <div style={{ ...Stype.headlineMed, fontSize: 20, color: S.bone }}>{journey.app}</div>
            <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>
              {journey.steps.length || "?"} steps
            </div>
          </div>
        </div>
      </div>
      {journey.steps.length > 0 ? (
        <div
          style={{
            display: "grid",
            gap: 14,
            gridTemplateColumns: `repeat(${journey.steps.length}, minmax(140px, 1fr))`,
            position: "relative",
          }}
        >
          {journey.steps.map((step, i) => (
            <div key={i} style={{ position: "relative" }}>
              <div
                style={{
                  height: 120,
                  padding: 5,
                  background: S.raisedWarm,
                  boxShadow: `0 0 0 1px rgba(232,227,210,0.08)`,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: S.raised,
                    padding: 10,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 6,
                      width: 30,
                      background: S.bone,
                      opacity: 0.6,
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <div style={{ height: 4, background: S.dim }} />
                    <div style={{ height: 4, background: S.dim, width: "80%" }} />
                    <div style={{ height: 4, background: S.dim, width: "60%" }} />
                    <div style={{ height: 12, width: 32, background: aColor, marginTop: 4 }} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ ...Stype.tabular, fontSize: 11, color: aColor }}>
                    0{i + 1}
                  </span>
                  <span style={{ ...Stype.bodyMed, fontSize: 13, color: S.bone }}>
                    {step.name}
                  </span>
                </div>
                {step.hint && (
                  <div style={{ ...Stype.body, fontSize: 11.5, color: S.soft, marginTop: 3 }}>
                    {step.hint}
                  </div>
                )}
              </div>
              {i < journey.steps.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: -14,
                    top: 56,
                    color: aColor,
                    fontSize: 14,
                  }}
                >
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: S.ink, fontSize: 14 }}>
          <StudyMarkdown md={journey.body} />
        </div>
      )}
    </div>
  );
}

function SectionJourneys({
  journeys,
  fallbackMd,
}: {
  journeys: ParsedJourney[];
  fallbackMd: string;
}) {
  if (journeys.length === 0) {
    return (
      <section
        id="journeys"
        style={{
          scrollMarginTop: 130,
          padding: "56px 48px",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="§04 · screenshots mapping user journeys"
            title="Exemplary flows."
          />
          <StudyMarkdown md={fallbackMd} />
        </div>
      </section>
    );
  }
  return (
    <section
      id="journeys"
      style={{
        scrollMarginTop: 130,
        padding: "56px 48px",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="§04 · screenshots mapping user journeys"
          title={`${journeys.length} exemplary flow${journeys.length === 1 ? "" : "s"}.`}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {journeys.map((j, i) => (
            <JourneyStrip key={j.app + i} journey={j} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 05 — Insights ────────────────────────────────────────────────────
function SectionInsights({
  insights,
  fallbackMd,
}: {
  insights: { stat: string; suffix?: string; body: string }[];
  fallbackMd: string;
}) {
  if (insights.length < 2) {
    return (
      <section id="insights" style={{ scrollMarginTop: 130, padding: "56px 48px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="§05 · comparative insights"
            title="What the market says."
          />
          <StudyMarkdown md={fallbackMd} />
        </div>
      </section>
    );
  }
  return (
    <section id="insights" style={{ scrollMarginTop: 130, padding: "56px 48px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="§05 · comparative insights"
          title="What the market says."
        />
        <div
          style={{
            display: "grid",
            gap: 18,
            gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
          }}
        >
          {insights.map((ins, i) => {
            const aColor = i % 2 === 0 ? S.amberGlow : S.cobaltGlow;
            return (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  background: "rgba(30,34,40,0.45)",
                  boxShadow: `0 0 0 1px ${S.hairline}`,
                  borderTop: `2px solid ${aColor}`,
                }}
              >
                <Eyebrow color={aColor} style={{ fontSize: 9 }}>
                  insight · 0{i + 1}
                </Eyebrow>
                <div style={{ marginTop: 18, display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span
                    style={{
                      fontFamily: "'Bricolage Grotesque', sans-serif",
                      fontVariationSettings: "'opsz' 96, 'wdth' 88, 'wght' 400",
                      fontSize: ins.stat.length > 5 ? 38 : 64,
                      color: S.bone,
                      letterSpacing: "-.04em",
                      lineHeight: 0.95,
                    }}
                  >
                    {ins.stat}
                  </span>
                  {ins.suffix && (
                    <span style={{ ...Stype.body, fontSize: 12, color: aColor, marginBottom: 8 }}>
                      {ins.suffix}
                    </span>
                  )}
                </div>
                <p
                  style={{
                    ...Stype.reading,
                    fontSize: 13,
                    color: S.ink,
                    marginTop: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {ins.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Section 06 — Recommendations ────────────────────────────────────────────────
function RecCard({
  rec,
  index,
  featured,
}: {
  rec: ParsedRecommendation;
  index: number;
  featured?: boolean;
}) {
  const aColor = featured ? S.amberGlow : index % 2 === 0 ? S.cobaltGlow : S.amberGlow;
  return (
    <div
      style={{
        padding: featured ? "32px 36px" : "24px 28px",
        background: featured
          ? "linear-gradient(135deg, rgba(48,40,28,0.92) 0%, rgba(35,31,24,0.94) 100%)"
          : "linear-gradient(135deg, rgba(30,34,40,0.65) 0%, rgba(22,25,30,0.75) 100%)",
        boxShadow: featured
          ? "0 0 0 1px rgba(244,204,125,0.40), 0 28px 60px -22px rgba(0,0,0,0.6), 0 0 100px -28px rgba(217,150,62,0.40)"
          : `0 0 0 1px rgba(136,166,216,0.18), 0 18px 36px -18px rgba(0,0,0,0.5)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        {rec.priority && <PriorityTag level={rec.priority} />}
        <span style={{ ...Stype.micro, fontSize: 9, color: S.soft }}>
          recommendation · 0{index + 1}
        </span>
      </div>
      <h3
        style={{
          ...Stype.title,
          fontSize: featured ? 30 : 22,
          color: S.bone,
          margin: "14px 0 0",
          lineHeight: 1.15,
          letterSpacing: "-.015em",
        }}
      >
        {rec.headline}
      </h3>
      {rec.rationale && (
        <p
          style={{
            ...Stype.reading,
            fontSize: featured ? 15 : 14,
            color: S.ink,
            marginTop: 14,
            lineHeight: 1.55,
          }}
        >
          {rec.rationale}
        </p>
      )}
      {(rec.impact || rec.effort || rec.cites?.length) && (
        <div
          style={{
            marginTop: 18,
            paddingTop: 14,
            borderTop: `1px solid ${S.rule}`,
            display: "flex",
            flexWrap: "wrap",
            gap: 28,
          }}
        >
          {rec.impact && <KeyValue label="impact" value={rec.impact} color={aColor} />}
          {rec.effort && <KeyValue label="effort" value={rec.effort} />}
          {rec.cites && rec.cites.length > 0 && (
            <KeyValue
              label="seen in"
              value={rec.cites.join(" · ")}
              color={S.soft}
            />
          )}
        </div>
      )}
      {!rec.rationale && !rec.impact && !rec.effort && (
        <div style={{ marginTop: 14 }}>
          <StudyMarkdown md={rec.body} />
        </div>
      )}
    </div>
  );
}

function SectionRecommendations({
  recs,
  fallbackMd,
  onPrototype,
}: {
  recs: ParsedRecommendation[];
  fallbackMd: string;
  onPrototype: () => void;
}) {
  if (recs.length === 0) {
    return (
      <section
        id="recommendations"
        style={{
          scrollMarginTop: 130,
          padding: "56px 48px",
          background: "rgba(255,255,255,0.012)",
        }}
      >
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <SectionHeader
            eyebrow="§06 · product-specific recommendations"
            title="What we'd try, in order."
          />
          <StudyMarkdown md={fallbackMd} />
          <div style={{ marginTop: 32 }}>
            <BuildCTA onPrototype={onPrototype} />
          </div>
        </div>
      </section>
    );
  }
  const [primary, ...rest] = recs;
  return (
    <section
      id="recommendations"
      style={{
        scrollMarginTop: 130,
        padding: "56px 48px",
        background: "rgba(255,255,255,0.012)",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="§06 · product-specific recommendations"
          title="What we'd try, in order."
        />
        <RecCard rec={primary} index={0} featured />
        {rest.length > 0 && (
          <div
            style={{
              marginTop: 18,
              display: "grid",
              gap: 18,
              gridTemplateColumns: rest.length === 1 ? "1fr" : "repeat(auto-fill, minmax(360px, 1fr))",
            }}
          >
            {rest.map((rec, i) => (
              <RecCard key={rec.headline + i} rec={rec} index={i + 1} />
            ))}
          </div>
        )}
        <div style={{ marginTop: 36 }}>
          <BuildCTA onPrototype={onPrototype} />
        </div>
      </div>
    </section>
  );
}

function BuildCTA({ onPrototype }: { onPrototype: () => void }) {
  return (
    <div
      style={{
        position: "relative",
        padding: "48px 48px",
        background:
          "linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.92) 100%)",
        boxShadow:
          "0 0 0 1px rgba(244,204,125,0.42), 0 36px 100px -22px rgba(0,0,0,0.7), 0 0 160px -30px rgba(217,150,62,0.50)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "-10%",
          top: "-30%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(217,150,62,0.20) 0%, transparent 60%)",
          filter: "blur(40px)",
          pointerEvents: "none",
          animation: "breath 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        <div>
          <Eyebrow>ready to act on this?</Eyebrow>
          <h2
            style={{
              ...Stype.title,
              fontSize: 38,
              color: S.bone,
              margin: "14px 0 16px",
              letterSpacing: "-.02em",
              lineHeight: 1.05,
            }}
          >
            Turn these recommendations into a prompt.
          </h2>
          <p style={{ ...Stype.reading, fontSize: 15, color: S.ink, margin: 0, lineHeight: 1.55, maxWidth: 540 }}>
            Answer three short questions and UX Scout assembles a ready-to-paste prompt for Lovable, Bolt or v0 — so the report becomes a working prototype.
          </p>
          <div style={{ marginTop: 24 }}>
            <button
              onClick={onPrototype}
              style={{
                ...Stype.bodyMed,
                fontSize: 14,
                padding: "12px 22px",
                background: S.amberGlow,
                color: "#1a1310",
                border: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                boxShadow: "0 0 28px rgba(244,204,125,0.32)",
              }}
            >
              <span>Start building</span>
              <span>→</span>
            </button>
          </div>
        </div>
        <div
          style={{
            background: "rgba(20,23,28,0.55)",
            boxShadow: `0 0 0 1px ${S.hairline}`,
            padding: "20px 22px",
          }}
        >
          <Eyebrow color={S.faint} style={{ fontSize: 9 }}>
            what happens next
          </Eyebrow>
          <ol style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              "Describe your product",
              "Name your target user",
              "Pin your top goal",
              "Copy the prompt → Lovable / Bolt / v0",
            ].map((step, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "24px 1fr", gap: 10, alignItems: "baseline" }}>
                <span style={{ ...Stype.tabular, fontSize: 11, color: S.amberGlow }}>0{i + 1}</span>
                <span style={{ ...Stype.body, fontSize: 13, color: S.bone, lineHeight: 1.4 }}>
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

// ─── Study viewer (bespoke 6-section layout) ─────────────────────────────────
function StudyView({
  study,
  onPrototype,
}: {
  study: Study;
  onPrototype: () => void;
}) {
  const [exporting, setExporting] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");

  const parsed = useMemo(() => parseReport(study.report), [study.report]);

  const onDocx = async () => {
    setExporting(true);
    try {
      await exportToDocx(study.report, `${study.short.replace(/[^a-z0-9]+/gi, "-")}.docx`);
    } finally {
      setExporting(false);
    }
  };

  const handleJump = (id: string) => {
    setActiveSection(id);
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 124;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      const offsets = STUDY_NAV.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, dist: Infinity };
        return { id: s.id, dist: Math.abs(el.getBoundingClientRect().top - 130) };
      });
      offsets.sort((a, b) => a.dist - b.dist);
      if (offsets[0]) setActiveSection(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      {/* Hero header */}
      <div style={{ padding: "36px 48px 28px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <span
              style={{
                ...Stype.eyebrow,
                fontSize: 9,
                padding: "3px 9px",
                color: S.amberGlow,
                border: `1px solid ${S.amberGlow}`,
                letterSpacing: ".18em",
              }}
            >
              fresh
            </span>
            <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>
              {formatDate(study.createdAt)}
            </span>
            {parsed.matrix && (
              <>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: S.faint }} />
                <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>
                  {parsed.matrix.competitors.length} apps · {parsed.matrix.features.length} features
                </span>
              </>
            )}
          </div>
          <h1
            style={{
              ...Stype.title,
              fontSize: 48,
              color: S.bone,
              margin: 0,
              letterSpacing: "-.025em",
              lineHeight: 1.0,
              maxWidth: 1100,
            }}
          >
            {study.title}
          </h1>

          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button
              onClick={onPrototype}
              style={{
                ...Stype.bodyMed,
                fontSize: 13,
                padding: "9px 16px",
                background: S.amberGlow,
                color: "#1a1310",
                border: 0,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                boxShadow: "0 0 18px rgba(244,204,125,0.25)",
              }}
            >
              {study.prototypePrompt ? "View prototype prompt" : "Generate prototype prompt"}
              <span>→</span>
            </button>
            <button
              onClick={onDocx}
              disabled={exporting}
              style={{
                ...Stype.bodyMed,
                fontSize: 13,
                padding: "9px 16px",
                background: "transparent",
                color: S.bone,
                border: `1px solid ${S.threadStrong}`,
                cursor: exporting ? "not-allowed" : "pointer",
                opacity: exporting ? 0.5 : 1,
              }}
            >
              {exporting ? "Exporting…" : "Export .docx"}
            </button>
            <button
              onClick={exportToPdf}
              style={{
                ...Stype.bodyMed,
                fontSize: 13,
                padding: "9px 16px",
                background: "transparent",
                color: S.bone,
                border: `1px solid ${S.threadStrong}`,
                cursor: "pointer",
              }}
            >
              Print / PDF
            </button>
          </div>
        </div>
      </div>

      <StudySectionNav activeId={activeSection} onJump={handleJump} />

      <SectionSummary
        study={study}
        parsedText={parsed.sections.summary || study.report}
        topRec={parsed.summary.topRec}
        apps={parsed.apps}
      />
      <SectionPatterns patterns={parsed.patterns} fallbackMd={parsed.sections.patterns} />
      <SectionMatrix matrix={parsed.matrix} fallbackMd={parsed.sections.matrix} />
      <SectionJourneys journeys={parsed.journeys} fallbackMd={parsed.sections.journeys} />
      <SectionInsights insights={parsed.insights} fallbackMd={parsed.sections.insights} />
      <SectionRecommendations
        recs={parsed.recommendations}
        fallbackMd={parsed.sections.recommendations}
        onPrototype={onPrototype}
      />
    </div>
  );
}

// ─── Prototype interview (v5 branching flow) ───────────────────────────────────────────
type Step = "q1" | "q2a" | "q2b" | "q3b" | "final";

function getSteps(flow: InterviewFlow): Step[] {
  if (flow === "improve") return ["q1", "q2a", "final"];
  if (flow === "new") return ["q1", "q2b", "q3b", "final"];
  return ["q1"];
}

const FALLBACK_RECS: Recommendation[] = [
  {
    text: "Reduce onboarding to 4 screens max",
    priority: "High",
    rationale: "Top competitors reach activation in 3–4 screens; every extra screen loses ~15% of users.",
    competitors: "Industry standard",
  },
  {
    text: "Show value before requiring sign-up",
    priority: "Medium",
    rationale: "60% of top apps let users explore before requiring an account.",
    competitors: "Multiple competitors",
  },
  {
    text: "Add trust-building moments before sensitive data collection",
    priority: "High",
    rationale: "Security/encryption messaging before KYC increases completion rates.",
    competitors: "Across category",
  },
];

function parsedToRecommendation(p: ParsedRecommendation): Recommendation {
  return {
    text: p.headline,
    priority: p.priority || "Medium",
    rationale: p.rationale || p.body.slice(0, 240).replace(/\n+/g, " ").trim(),
    competitors: p.cites?.join(", ") || "",
  };
}

function PrototypeView({
  recommendations,
  onSubmit,
  loading,
  error,
}: {
  recommendations: Recommendation[];
  onSubmit: (answers: PrototypeInterviewAnswers, selectedRecs: Recommendation[]) => void;
  loading: boolean;
  error: string | null;
}) {
  const [answers, setAnswers] = useState<PrototypeInterviewAnswers>({ ...EMPTY_ANSWERS });
  const [currentStep, setCurrentStep] = useState<Step>("q1");

  const steps = getSteps(answers.flow);
  const stepIndex = steps.indexOf(currentStep);
  const totalSteps = answers.flow ? getSteps(answers.flow).length : 1;

  function setFlow(flow: InterviewFlow) {
    setAnswers({ ...EMPTY_ANSWERS, flow });
    setCurrentStep(flow === "improve" ? "q2a" : "q2b");
  }

  function toggleImprovementArea(value: string) {
    setAnswers((prev) => {
      const areas = prev.improvementAreas.includes(value)
        ? prev.improvementAreas.filter((a) => a !== value)
        : [...prev.improvementAreas, value];
      return { ...prev, improvementAreas: areas };
    });
  }

  function toggleRecommendation(i: number) {
    setAnswers((prev) => {
      const selected = prev.selectedRecommendations.includes(i)
        ? prev.selectedRecommendations.filter((x) => x !== i)
        : [...prev.selectedRecommendations, i];
      return { ...prev, selectedRecommendations: selected };
    });
  }

  function canAdvance(): boolean {
    switch (currentStep) {
      case "q1":
        return answers.flow !== null;
      case "q2a":
        return answers.improvementAreas.length > 0;
      case "q2b":
        return answers.productDescription.trim().length > 0;
      case "q3b":
        return answers.targetUser.trim().length > 0;
      case "final":
        return answers.selectedRecommendations.length > 0;
      default:
        return false;
    }
  }

  function goNext() {
    const idx = steps.indexOf(currentStep);
    if (idx < steps.length - 1) setCurrentStep(steps[idx + 1]);
  }

  function goBack() {
    const idx = steps.indexOf(currentStep);
    if (idx > 0) setCurrentStep(steps[idx - 1]);
  }

  function handleGenerate() {
    const selectedRecs = answers.selectedRecommendations
      .map((i) => recommendations[i])
      .filter(Boolean);
    onSubmit(answers, selectedRecs);
  }

  return (
    <div style={{ padding: "36px 48px 96px", maxWidth: 780, margin: "0 auto" }}>
      <Eyebrow>turn it into a prototype</Eyebrow>
      <h1
        style={{
          ...Stype.title,
          fontSize: 38,
          color: S.bone,
          margin: "14px 0 8px",
          letterSpacing: "-.02em",
          lineHeight: 1.1,
        }}
      >
        Build a prototype from this report.
      </h1>
      <p style={{ ...Stype.reading, fontSize: 16, color: S.ink, margin: 0 }}>
        A short branching interview. We&rsquo;ll assemble a Lovable / Bolt-ready prompt grounded in the recommendations you select.
      </p>

      {/* Progress */}
      {answers.flow && (
        <div
          style={{
            marginTop: 28,
            display: "flex",
            alignItems: "center",
            gap: 6,
            justifyContent: "flex-start",
          }}
        >
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              style={{
                height: 2,
                width: i === stepIndex ? 32 : 14,
                background: i <= stepIndex ? S.amberGlow : "rgba(232,227,210,0.10)",
                boxShadow: i === stepIndex ? `0 0 12px ${S.amberGlow}` : "none",
                transition: "all 240ms ease",
              }}
            />
          ))}
          <span style={{ ...Stype.micro, fontSize: 9, color: S.faint, marginLeft: 12 }}>
            step {stepIndex + 1} of {totalSteps}
          </span>
        </div>
      )}

      <div style={{ marginTop: 36 }}>
        {currentStep === "q1" && <StepFlowPicker active={answers.flow} onPick={setFlow} />}
        {currentStep === "q2a" && (
          <StepImprovementAreas
            areas={answers.improvementAreas}
            detail={answers.improvementDetail}
            onToggle={toggleImprovementArea}
            onDetail={(v) => setAnswers((prev) => ({ ...prev, improvementDetail: v }))}
          />
        )}
        {currentStep === "q2b" && (
          <StepProductDescription
            value={answers.productDescription}
            onChange={(v) => setAnswers((prev) => ({ ...prev, productDescription: v }))}
          />
        )}
        {currentStep === "q3b" && (
          <StepTargetUser
            picked={answers.targetUser}
            qualitative={answers.targetUserQualitative}
            onPick={(v) => setAnswers((prev) => ({ ...prev, targetUser: v }))}
            onQualitative={(v) =>
              setAnswers((prev) => ({ ...prev, targetUserQualitative: v }))
            }
          />
        )}
        {currentStep === "final" && (
          <StepRecommendations
            recommendations={recommendations}
            selected={answers.selectedRecommendations}
            onToggle={toggleRecommendation}
            custom={answers.customFeatures}
            onCustom={(v) => setAnswers((prev) => ({ ...prev, customFeatures: v }))}
          />
        )}
      </div>

      {error && (
        <div
          style={{
            marginTop: 18,
            padding: 14,
            border: `1px solid ${S.cross}`,
            color: S.warmLight,
            ...Stype.body,
            fontSize: 13,
          }}
        >
          {error}
        </div>
      )}

      {currentStep !== "q1" && (
        <div
          style={{
            marginTop: 36,
            paddingTop: 24,
            borderTop: `1px solid ${S.hairline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={goBack}
            disabled={loading}
            style={{
              ...Stype.bodyMed,
              fontSize: 13,
              padding: "9px 16px",
              background: "transparent",
              color: S.bone,
              border: `1px solid ${S.threadStrong}`,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.5 : 1,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>←</span>
            <span>Back</span>
          </button>

          {currentStep !== "final" ? (
            <button
              onClick={goNext}
              disabled={!canAdvance()}
              style={{
                ...Stype.bodyMed,
                fontSize: 14,
                padding: "12px 22px",
                background: canAdvance() ? S.amberGlow : "transparent",
                color: canAdvance() ? "#1a1310" : S.faint,
                border: canAdvance() ? 0 : `1px solid ${S.rule}`,
                boxShadow: canAdvance() ? "0 0 24px rgba(244,204,125,0.28)" : "none",
                cursor: canAdvance() ? "pointer" : "not-allowed",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span>Next</span>
              <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleGenerate}
              disabled={!canAdvance() || loading}
              style={{
                ...Stype.bodyMed,
                fontSize: 14,
                padding: "12px 22px",
                background: canAdvance() && !loading ? S.amberGlow : "transparent",
                color: canAdvance() && !loading ? "#1a1310" : S.faint,
                border: canAdvance() && !loading ? 0 : `1px solid ${S.rule}`,
                boxShadow: canAdvance() && !loading ? "0 0 24px rgba(244,204,125,0.28)" : "none",
                cursor: canAdvance() && !loading ? "pointer" : "not-allowed",
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      display: "inline-block",
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      border: "1.5px solid rgba(26,19,16,0.3)",
                      borderTopColor: "#1a1310",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <span>Generating…</span>
                </>
              ) : (
                <>
                  <span>Generate prompt</span>
                  <span>→</span>
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Q1: pick branch ──────────────────────────────────────────────────────────
function StepFlowPicker({
  active,
  onPick,
}: {
  active: InterviewFlow;
  onPick: (flow: InterviewFlow) => void;
}) {
  return (
    <div>
      <h3 style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone, margin: "0 0 8px" }}>
        What brings you here?
      </h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.soft, margin: "0 0 24px" }}>
        This determines the questions we&rsquo;ll ask you next.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <FlowCard
          icon="⛒"
          label="Improve my existing product"
          sub="Make it better based on what competitors are doing."
          active={active === "improve"}
          onClick={() => onPick("improve")}
        />
        <FlowCard
          icon="↗"
          label="Build something new"
          sub="Create a new product inspired by the landscape."
          active={active === "new"}
          onClick={() => onPick("new")}
        />
      </div>
    </div>
  );
}

function FlowCard({
  icon,
  label,
  sub,
  active,
  onClick,
}: {
  icon: string;
  label: string;
  sub: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "28px 24px",
        background: active
          ? "linear-gradient(135deg, rgba(48,40,28,0.7) 0%, rgba(35,31,24,0.78) 100%)"
          : "rgba(30,34,40,0.4)",
        boxShadow: active
          ? `0 0 0 1px ${S.amberGlow}, 0 0 40px -16px rgba(217,150,62,0.4)`
          : `0 0 0 1px ${S.hairline}`,
        cursor: "pointer",
        transition: "all 200ms ease",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        border: 0,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: "rgba(217,150,62,0.10)",
          color: S.amberGlow,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          boxShadow: `0 0 0 1px ${active ? S.amberGlow : S.rule}`,
        }}
      >
        {icon}
      </div>
      <div style={{ ...Stype.bodyMed, fontSize: 16, color: S.bone }}>{label}</div>
      <div style={{ ...Stype.body, fontSize: 13, color: S.soft, lineHeight: 1.45 }}>{sub}</div>
    </button>
  );
}

// ─── Q2a: improvement areas ──────────────────────────────────────────────────
function StepImprovementAreas({
  areas,
  detail,
  onToggle,
  onDetail,
}: {
  areas: string[];
  detail: string;
  onToggle: (v: string) => void;
  onDetail: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone, margin: "0 0 8px" }}>
        Which area of your product needs the most improvement?
      </h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.soft, margin: "0 0 20px" }}>
        Select one or more. This helps focus the recommendations.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {IMPROVEMENT_AREA_OPTIONS.map((opt) => {
          const selected = areas.includes(opt.value);
          const isAuto = opt.value === "auto";
          return (
            <CheckCard
              key={opt.value}
              label={opt.label}
              selected={selected}
              dashed={isAuto && !selected}
              prefix={isAuto ? "✨" : undefined}
              onClick={() => onToggle(opt.value)}
            />
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <LumenInput
          label="Describe the problem in your own words (optional)"
          placeholder='e.g. "Users drop off after the second onboarding screen"'
          value={detail}
          onChange={onDetail}
        />
      </div>
    </div>
  );
}

// ─── Q2b: product description ──────────────────────────────────────────────────
function StepProductDescription({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone, margin: "0 0 8px" }}>
        What product do you want to build?
      </h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.soft, margin: "0 0 24px" }}>
        Describe your product idea in one sentence.
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='e.g. "A Gen Z budgeting app that makes saving feel like a game"'
        autoFocus
        style={{
          width: "100%",
          background: "rgba(20,23,28,0.55)",
          border: 0,
          boxShadow: `0 0 0 1px ${S.threadStrong}`,
          color: S.bone,
          padding: "18px 20px",
          ...sf(20, 400, 96),
          fontSize: 19,
          letterSpacing: "-.01em",
          outline: "none",
        }}
      />
    </div>
  );
}

// ─── Q3b: target user ───────────────────────────────────────────────────────────
function StepTargetUser({
  picked,
  qualitative,
  onPick,
  onQualitative,
}: {
  picked: string;
  qualitative: string;
  onPick: (v: string) => void;
  onQualitative: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone, margin: "0 0 8px" }}>
        Who is your target customer?
      </h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.soft, margin: "0 0 20px" }}>
        Pick a category, then describe them in more detail below.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {TARGET_USER_OPTIONS.map((opt) => {
          const selected = picked === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => onPick(opt.value)}
              style={{
                textAlign: "left",
                padding: "14px 16px",
                background: selected
                  ? "rgba(217,150,62,0.10)"
                  : "rgba(30,34,40,0.4)",
                boxShadow: selected
                  ? `0 0 0 1px ${S.amberGlow}, 0 0 24px -12px rgba(244,204,125,0.4)`
                  : `0 0 0 1px ${S.hairline}`,
                cursor: "pointer",
                transition: "all 200ms ease",
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: 0,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: selected ? S.amberGlow : "transparent",
                  border: `1.5px solid ${selected ? S.amberGlow : S.rule}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {selected && (
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1a1310" }} />
                )}
              </span>
              <span style={{ ...Stype.bodyMed, fontSize: 13.5, color: S.bone }}>{opt.label}</span>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <LumenInput
          label="Describe your ideal user"
          placeholder='e.g. "College students aged 18-22 managing money for the first time"'
          value={qualitative}
          onChange={onQualitative}
        />
      </div>
    </div>
  );
}

// ─── Final: recommendations + custom features ───────────────────────────────────────
function StepRecommendations({
  recommendations,
  selected,
  onToggle,
  custom,
  onCustom,
}: {
  recommendations: Recommendation[];
  selected: number[];
  onToggle: (i: number) => void;
  custom: string;
  onCustom: (v: string) => void;
}) {
  return (
    <div>
      <h3 style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone, margin: "0 0 8px" }}>
        Pick the recommendations to build in.
      </h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.soft, margin: "0 0 20px" }}>
        Select the ones you want in your prototype.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {recommendations.map((rec, i) => {
          const sel = selected.includes(i);
          return (
            <button
              key={i}
              onClick={() => onToggle(i)}
              style={{
                textAlign: "left",
                padding: "14px 16px",
                background: sel ? "rgba(217,150,62,0.10)" : "rgba(30,34,40,0.4)",
                boxShadow: sel
                  ? `0 0 0 1px ${S.amberGlow}, 0 0 24px -12px rgba(244,204,125,0.4)`
                  : `0 0 0 1px ${S.hairline}`,
                cursor: "pointer",
                transition: "all 200ms ease",
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                border: 0,
              }}
            >
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 3,
                  marginTop: 2,
                  background: sel ? S.amberGlow : "transparent",
                  border: `1.5px solid ${sel ? S.amberGlow : S.rule}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  color: "#1a1310",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                {sel && "✓"}
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone, lineHeight: 1.3 }}>
                    {rec.text}
                  </span>
                  <PriorityTag level={rec.priority} />
                </div>
                {rec.rationale && (
                  <p
                    style={{
                      ...Stype.body,
                      fontSize: 12.5,
                      color: S.soft,
                      margin: "6px 0 0",
                      lineHeight: 1.45,
                    }}
                  >
                    {rec.rationale}
                  </p>
                )}
                {rec.competitors && (
                  <div
                    style={{
                      ...Stype.body,
                      fontSize: 11.5,
                      color: S.amberGlow,
                      marginTop: 4,
                    }}
                  >
                    seen in: {rec.competitors}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 20 }}>
        <LumenInput
          label="Anything else you want in the prototype? (optional)"
          placeholder='e.g. "dark mode", "gamification", "feels like Cleo but looks like Revolut"'
          value={custom}
          onChange={onCustom}
        />
      </div>
    </div>
  );
}

// ─── Shared sub-components ──────────────────────────────────────────────────────────
function CheckCard({
  label,
  selected,
  dashed,
  prefix,
  onClick,
}: {
  label: string;
  selected: boolean;
  dashed?: boolean;
  prefix?: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        textAlign: "left",
        padding: "12px 16px",
        background: selected ? "rgba(217,150,62,0.10)" : "rgba(30,34,40,0.4)",
        boxShadow: selected
          ? `0 0 0 1px ${S.amberGlow}, 0 0 24px -12px rgba(244,204,125,0.4)`
          : `0 0 0 ${dashed ? "1.5" : "1"}px ${S.hairline}`,
        cursor: "pointer",
        transition: "all 200ms ease",
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: 0,
        ...(dashed && !selected
          ? { outline: `1px dashed ${S.rule}`, outlineOffset: -2, boxShadow: "none" }
          : {}),
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 3,
          background: selected ? S.amberGlow : "transparent",
          border: `1.5px solid ${selected ? S.amberGlow : S.rule}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          color: "#1a1310",
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {selected && "✓"}
      </span>
      <span style={{ ...Stype.body, fontSize: 13.5, color: S.bone }}>
        {prefix && <span style={{ marginRight: 6 }}>{prefix}</span>}
        {label}
      </span>
    </button>
  );
}

function LumenInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label
        style={{
          ...Stype.eyebrow,
          fontSize: 10,
          color: S.faint,
          display: "block",
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: "rgba(20,23,28,0.55)",
          border: 0,
          boxShadow: `0 0 0 1px ${S.rule}`,
          color: S.bone,
          padding: "12px 14px",
          ...sf(14, 400, 100),
          fontSize: 14,
          outline: "none",
        }}
      />
    </div>
  );
}

function PromptView({ prompt, onBack }: { prompt: string; onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };
  const clean = prompt.replace(/^```[a-z]*\n?/i, "").replace(/```$/, "").trim();

  return (
    <div style={{ padding: "36px 48px 96px", maxWidth: 920, margin: "0 auto" }}>
      <div style={{ ...Stype.eyebrow, color: S.amberGlow, fontSize: 11 }}>prototype prompt</div>
      <h1
        style={{
          ...Stype.title,
          fontSize: 38,
          color: S.bone,
          margin: "14px 0 8px",
          letterSpacing: "-.02em",
          lineHeight: 1.1,
        }}
      >
        Ready to paste into Lovable or Bolt.
      </h1>
      <p style={{ ...Stype.reading, fontSize: 15, color: S.ink, margin: 0, maxWidth: 720 }}>
        Copy this prompt and paste it into a prototype tool to scaffold a working interactive build.
      </p>

      <div style={{ display: "flex", gap: 10, marginTop: 22 }}>
        <button
          onClick={copy}
          style={{
            ...Stype.bodyMed,
            fontSize: 13,
            padding: "9px 16px",
            background: S.amberGlow,
            color: "#1a1310",
            border: 0,
            cursor: "pointer",
          }}
        >
          {copied ? "Copied!" : "Copy prompt"}
        </button>
        <button
          onClick={onBack}
          style={{
            ...Stype.bodyMed,
            fontSize: 13,
            padding: "9px 16px",
            background: "transparent",
            color: S.bone,
            border: `1px solid ${S.threadStrong}`,
            cursor: "pointer",
          }}
        >
          ← Back to report
        </button>
      </div>

      <pre
        style={{
          marginTop: 28,
          padding: 24,
          background: "rgba(20,23,28,0.7)",
          boxShadow: `0 0 0 1px ${S.rule}`,
          color: S.ink,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 13,
          lineHeight: 1.6,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        {clean}
      </pre>
    </div>
  );
}

// ─── Main app ────────────────────────────────────────────────────────────────────
function AppInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [studies, setStudies] = useState<Study[]>([]);
  const [screen, setScreen] = useState<Screen>("library");
  const [activeStudyId, setActiveStudyId] = useState<string | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState("");
  const [analyzeError, setAnalyzeError] = useState<string | null>(null);
  const [analyzeDone, setAnalyzeDone] = useState(false);
  const [prototypeLoading, setPrototypeLoading] = useState(false);
  const [prototypeError, setPrototypeError] = useState<string | null>(null);
  const consumedRef = useRef(false);

  const activeStudy = useMemo(
    () => studies.find((s) => s.id === activeStudyId) || null,
    [studies, activeStudyId]
  );

  // Load studies on mount
  useEffect(() => {
    setStudies(loadStudies());
  }, []);

  const runAnalyze = useCallback(
    async (args: { question: string; industry: string; touchpoint: string; goal: string }) => {
      setPendingQuestion(args.question);
      setScreen("processing");
      setAnalyzeError(null);
      setAnalyzeDone(false);
      const category = inferCategory(args.industry, args.question);
      const flowType = inferFlowType(args.touchpoint || args.question);

      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category, flowType }),
        });
        if (!res.ok) throw new Error(`Analyze failed (${res.status})`);
        const data = (await res.json()) as { report: string };
        const id = `study-${Date.now()}`;
        const study: Study = {
          id,
          title: args.question,
          short: args.question.length > 48 ? args.question.slice(0, 48) + "…" : args.question,
          date: "today",
          question: args.question,
          industry: args.industry,
          touchpoint: args.touchpoint,
          goal: args.goal,
          report: data.report,
          createdAt: Date.now(),
        };
        const next = [study, ...loadStudies()];
        saveStudies(next);
        setStudies(next);
        setActiveStudyId(id);
        setAnalyzeDone(true);
        setTimeout(() => setScreen("study"), 700);
      } catch (e) {
        setAnalyzeError(e instanceof Error ? e.message : "Something went wrong");
        setScreen("new");
      }
    },
    []
  );

  // Auto-start from URL params (coming from landing)
  useEffect(() => {
    if (consumedRef.current) return;
    const q = params.get("q");
    if (!q) return;
    consumedRef.current = true;
    runAnalyze({
      question: q,
      industry: params.get("industry") || "",
      touchpoint: params.get("touchpoint") || "",
      goal: params.get("goal") || "",
    });
    // Clear params from URL so refresh doesn't re-fire
    router.replace("/app");
  }, [params, runAnalyze, router]);

  const runPrototype = useCallback(
    async (answers: PrototypeInterviewAnswers, selectedRecs: Recommendation[]) => {
      if (!activeStudy) return;
      setPrototypeLoading(true);
      setPrototypeError(null);
      try {
        const res = await fetch("/api/prototype", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            report: activeStudy.report,
            answers,
            recommendations: selectedRecs,
          }),
        });
        if (!res.ok) throw new Error(`Prototype failed (${res.status})`);
        const data = (await res.json()) as { prompt: string };
        const updated = studies.map((s) =>
          s.id === activeStudy.id ? { ...s, prototypePrompt: data.prompt } : s
        );
        saveStudies(updated);
        setStudies(updated);
        setScreen("prompt");
      } catch (e) {
        setPrototypeError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setPrototypeLoading(false);
      }
    },
    [activeStudy, studies]
  );

  const activeStudyRecommendations = useMemo<Recommendation[]>(() => {
    if (!activeStudy) return [];
    const parsed = parseReport(activeStudy.report).recommendations;
    const mapped = parsed.map(parsedToRecommendation).filter((r) => r.text);
    return mapped.length > 0 ? mapped : FALLBACK_RECS;
  }, [activeStudy]);

  const onOpenStudy = (id: string) => {
    setActiveStudyId(id);
    setScreen("study");
  };

  const breadcrumb = useMemo(() => {
    if (screen === "library") return [{ label: "Library" }];
    if (screen === "new") return [{ label: "Library", onClick: () => setScreen("library") }, { label: "New research" }];
    if (screen === "processing") return [{ label: "Library", onClick: () => setScreen("library") }, { label: "Generating…" }];
    if (screen === "study" && activeStudy)
      return [
        { label: "Library", onClick: () => setScreen("library") },
        { label: activeStudy.short },
      ];
    if (screen === "prototype" && activeStudy)
      return [
        { label: "Library", onClick: () => setScreen("library") },
        { label: activeStudy.short, onClick: () => setScreen("study") },
        { label: "Prototype" },
      ];
    if (screen === "prompt" && activeStudy)
      return [
        { label: "Library", onClick: () => setScreen("library") },
        { label: activeStudy.short, onClick: () => setScreen("study") },
        { label: "Prompt" },
      ];
    return [{ label: "Library" }];
  }, [screen, activeStudy]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      <AppAtmosphere />
      <Sidebar
        screen={screen}
        activeStudyId={activeStudyId}
        studies={studies}
        onNavigate={(s) => {
          if (s === "library" || s === "new") setScreen(s);
        }}
        onOpenStudy={onOpenStudy}
      />
      <main style={{ marginLeft: SIDEBAR_W, position: "relative", zIndex: 1 }}>
        <TopBar breadcrumb={breadcrumb} />
        <div>
          {screen === "library" && (
            <LibraryView
              studies={studies}
              onOpenStudy={onOpenStudy}
              onNew={() => setScreen("new")}
            />
          )}
          {screen === "new" && (
            <>
              {analyzeError && (
                <div
                  style={{
                    margin: "0 48px",
                    marginTop: 24,
                    padding: 14,
                    border: `1px solid ${S.cross}`,
                    color: S.warmLight,
                    maxWidth: 1280,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  {analyzeError}
                </div>
              )}
              <NewResearchView
                initialQuestion=""
                initialChips={{ industry: [], touchpoint: [], goal: [] }}
                onStart={runAnalyze}
              />
            </>
          )}
          {screen === "processing" && <ProcessingView question={pendingQuestion} done={analyzeDone} />}
          {screen === "study" && activeStudy && (
            <StudyView study={activeStudy} onPrototype={() => setScreen("prototype")} />
          )}
          {screen === "prototype" && activeStudy && (
            <PrototypeView
              recommendations={activeStudyRecommendations}
              onSubmit={runPrototype}
              loading={prototypeLoading}
              error={prototypeError}
            />
          )}
          {screen === "prompt" && activeStudy && activeStudy.prototypePrompt && (
            <PromptView prompt={activeStudy.prototypePrompt} onBack={() => setScreen("study")} />
          )}
        </div>
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <Suspense fallback={null}>
      <AppInner />
    </Suspense>
  );
}
