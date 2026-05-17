"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useRouter } from "next/navigation";
import { S, Stype, sf } from "@/lib/tokens";

const INSPIRATION_PROMPTS = [
  "Design onboarding for a rideshare app.",
  "Benchmark fintech KYC flows.",
  "Analyze ecommerce checkout UX.",
  "Redesign empty states for AI productivity.",
  "Rethink paywall psychology in health apps.",
  "Compare onboarding rhythm in travel super-apps.",
];

// Hero gravitational anchor
const HERO_CX = 34;
const HERO_CY = 44;
const HERO_W = 560;

type ClusterId = "industry" | "touchpoint" | "goal";
type Accent = "amber" | "cobalt";

interface Chip {
  v: string;
  dx: number;
  dy: number;
}

interface Cluster {
  id: ClusterId;
  label: string;
  cx: number;
  cy: number;
  accent: Accent;
  chips: Chip[];
}

const CONSTELLATIONS: Cluster[] = [
  {
    id: "industry",
    label: "industry",
    cx: 80,
    cy: 22,
    accent: "amber",
    chips: [
      { v: "AI productivity", dx: 0, dy: -120 },
      { v: "rideshare", dx: 140, dy: -78 },
      { v: "ecommerce", dx: 170, dy: 8 },
      { v: "fintech", dx: 118, dy: 90 },
      { v: "health", dx: 0, dy: 130 },
      { v: "social", dx: -120, dy: 70 },
      { v: "travel", dx: -160, dy: -42 },
    ],
  },
  {
    id: "touchpoint",
    label: "touchpoint",
    cx: 80,
    cy: 72,
    accent: "cobalt",
    chips: [
      { v: "onboarding", dx: 0, dy: -120 },
      { v: "checkout", dx: 130, dy: -80 },
      { v: "paywall", dx: 150, dy: 6 },
      { v: "navigation", dx: 120, dy: 86 },
      { v: "KYC", dx: 8, dy: 128 },
      { v: "empty states", dx: -110, dy: 94 },
      { v: "charts", dx: -150, dy: 16 },
      { v: "notifications", dx: -132, dy: -70 },
    ],
  },
  {
    id: "goal",
    label: "goal",
    cx: 20,
    cy: 78,
    accent: "amber",
    chips: [
      { v: "improve activation", dx: 18, dy: -120 },
      { v: "reduce friction", dx: 170, dy: -68 },
      { v: "increase trust", dx: 190, dy: 24 },
      { v: "improve retention", dx: 140, dy: 104 },
      { v: "improve conversion", dx: -40, dy: 130 },
      { v: "simplify complexity", dx: -180, dy: 60 },
      { v: "benchmark competitors", dx: -188, dy: -58 },
      { v: "create delight", dx: -90, dy: -130 },
    ],
  },
];

const GOAL_TEMPLATES: Record<string, (ind?: string, tch?: string) => string> = {
  "improve activation": (ind, tch) => `Improve activation in ${[ind, tch].filter(Boolean).join(" ") || "our product"}.`,
  "reduce friction": (ind, tch) => `Reduce friction in ${[ind, tch].filter(Boolean).join(" ") || "the experience"}.`,
  "increase trust": (ind, tch) => `Build trust into ${[ind, tch].filter(Boolean).join(" ") || "the product"}.`,
  "improve retention": (ind, tch) => `Improve retention through ${[ind, tch].filter(Boolean).join(" ") || "our UX"}.`,
  "benchmark competitors": (ind, tch) => `Benchmark ${tch || "product UX"} across ${ind || "top"} apps.`,
  "improve conversion": (ind, tch) => `Lift conversion in ${[ind, tch].filter(Boolean).join(" ") || "the funnel"}.`,
  "simplify complexity": (ind, tch) => `Simplify ${[ind, tch].filter(Boolean).join(" ") || "the flow"}.`,
  "create delight": (ind, tch) => `Add delight to ${[ind, tch].filter(Boolean).join(" ") || "the experience"}.`,
};

type ChipMap = Record<ClusterId, string[]>;

function assembleQuery(chips: ChipMap): string {
  const ind = chips.industry?.[0];
  const tch = chips.touchpoint?.[0];
  const gl = chips.goal?.[0];
  if (gl && GOAL_TEMPLATES[gl]) return GOAL_TEMPLATES[gl](ind, tch);
  if (ind && tch) return `Improve ${tch} for ${ind} apps.`;
  if (ind) return `Research UX patterns in ${ind} apps.`;
  if (tch) return `Improve ${tch}.`;
  return "";
}

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    setVp({ w: window.innerWidth, h: window.innerHeight });
    const onResize = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return vp;
}

function useCursor() {
  const [c, setC] = useState({ x: -1000, y: -1000 });
  useEffect(() => {
    let raf: number | null = null;
    let pending: { x: number; y: number } | null = null;
    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (pending) setC(pending);
        raf = null;
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return c;
}

function SemanticNode({
  chip,
  clusterPx,
  clusterPy,
  cursor,
  active,
  onClick,
  accent,
}: {
  chip: Chip;
  clusterPx: number;
  clusterPy: number;
  cursor: { x: number; y: number };
  active: boolean;
  onClick: () => void;
  accent: Accent;
}) {
  const chipPx = clusterPx + chip.dx;
  const chipPy = clusterPy + chip.dy;
  const cdx = cursor.x - chipPx;
  const cdy = cursor.y - chipPy;
  const dist = Math.sqrt(cdx * cdx + cdy * cdy);
  const proximity = dist < 240 ? Math.max(0, 1 - dist / 240) : 0;
  const pull = proximity * 10;
  const pullX = dist > 0 ? (cdx / dist) * pull : 0;
  const pullY = dist > 0 ? (cdy / dist) * pull : 0;
  const scale = (active ? 1.05 : 1) + proximity * 0.05;
  const c = accent === "cobalt" ? S.cobaltGlow : S.amberGlow;
  const textColor = active
    ? S.bone
    : `rgba(232,227,210,${0.55 + proximity * 0.45})`;
  const dotFill = active ? 1 : proximity > 0.45 ? (proximity - 0.45) * 1.8 : 0;
  const isAmber = c === S.amberGlow;

  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute",
        left: `calc(50% + ${chip.dx}px)`,
        top: `calc(50% + ${chip.dy}px)`,
        transform: `translate(calc(-50% + ${pullX}px), calc(-50% + ${pullY}px)) scale(${scale})`,
        transition: "transform 220ms ease-out",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "4px 6px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        background: "none",
        border: 0,
        color: "inherit",
        font: "inherit",
      }}
    >
      <span
        style={{
          width: active ? 7 : 5,
          height: active ? 7 : 5,
          borderRadius: "50%",
          background: `rgba(${isAmber ? "244,204,125" : "136,166,216"}, ${dotFill})`,
          border: `1px solid rgba(232,227,210, ${0.2 + proximity * 0.35})`,
          boxShadow: active
            ? `0 0 16px ${c}`
            : proximity > 0.5
            ? `0 0 ${proximity * 14}px ${c}80`
            : "none",
          transition: "all 280ms ease",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          ...Stype.body,
          fontSize: 12.5,
          color: textColor,
          letterSpacing: ".005em",
          transition: "color 280ms ease",
          textShadow: active ? `0 0 18px ${c}44` : "none",
        }}
      >
        {chip.v}
      </span>
    </button>
  );
}

function Constellation({
  cluster,
  active,
  onToggle,
  cursor,
  vp,
}: {
  cluster: Cluster;
  active: string[];
  onToggle: (group: ClusterId, chip: string) => void;
  cursor: { x: number; y: number };
  vp: { w: number; h: number };
}) {
  const clusterPx = (cluster.cx / 100) * vp.w;
  const clusterPy = (cluster.cy / 100) * vp.h;
  const accentColor = cluster.accent === "cobalt" ? S.cobaltGlow : S.amberGlow;
  const cdx = cursor.x - clusterPx;
  const cdy = cursor.y - clusterPy;
  const dist = Math.sqrt(cdx * cdx + cdy * cdy);
  const proximity = dist < 360 ? Math.max(0, 1 - dist / 360) : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: `${cluster.cx}%`,
        top: `${cluster.cy}%`,
        width: 0,
        height: 0,
        pointerEvents: "none",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: `translate(-50%,-50%) scale(${1 + proximity * 0.1})`,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${
            cluster.accent === "amber"
              ? `rgba(217,150,62, ${0.1 + proximity * 0.1})`
              : `rgba(79,115,174, ${0.1 + proximity * 0.1})`
          } 0%, transparent 60%)`,
          filter: "blur(20px)",
          transition: "transform 600ms ease",
          animation: "fieldBreath 20s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          pointerEvents: "none",
          zIndex: 4,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 ${18 + proximity * 14}px ${accentColor}`,
            opacity: 0.65 + proximity * 0.3,
            animation: "pulse 4s ease-in-out infinite",
            transition: "all 400ms ease",
          }}
        />
        <div
          style={{
            ...Stype.micro,
            fontSize: 9,
            color: accentColor,
            letterSpacing: ".28em",
            opacity: 0.7 + proximity * 0.25,
            transition: "opacity 400ms ease",
          }}
        >
          {cluster.label}
        </div>
      </div>
      <div style={{ pointerEvents: "auto" }}>
        {cluster.chips.map((chip) => (
          <SemanticNode
            key={chip.v}
            chip={chip}
            clusterPx={clusterPx}
            clusterPy={clusterPy}
            cursor={cursor}
            active={active.includes(chip.v)}
            onClick={() => onToggle(cluster.id, chip.v)}
            accent={cluster.accent}
          />
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [userTyping, setUserTyping] = useState(false);
  const [activeChips, setActiveChips] = useState<ChipMap>({
    industry: [],
    touchpoint: [],
    goal: [],
  });
  const [focused, setFocused] = useState(false);
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [phPhase, setPhPhase] = useState<"in" | "out">("in");
  const [submitting, setSubmitting] = useState(false);

  const vp = useViewport();
  const cursor = useCursor();

  useEffect(() => {
    if (query.length > 0) return;
    const interval = setInterval(() => {
      setPhPhase("out");
      setTimeout(() => {
        setPlaceholderIdx((i) => (i + 1) % INSPIRATION_PROMPTS.length);
        setPhPhase("in");
      }, 620);
    }, 4600);
    return () => clearInterval(interval);
  }, [query.length]);

  const toggleChip = (group: ClusterId, chip: string) => {
    setActiveChips((prev) => {
      const current = prev[group]?.[0];
      const next = { ...prev, [group]: current === chip ? [] : [chip] };
      if (!userTyping) {
        setQuery(assembleQuery(next));
      }
      return next;
    });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setQuery(v);
    setUserTyping(v.length > 0);
  };

  const totalChips = Object.values(activeChips).reduce(
    (a, b) => a + b.length,
    0
  );
  const canSubmit = query.trim().length > 4;

  const onSubmit = () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    const params = new URLSearchParams({
      q: query.trim(),
      industry: activeChips.industry[0] || "",
      touchpoint: activeChips.touchpoint[0] || "",
      goal: activeChips.goal[0] || "",
    });
    setTimeout(() => {
      router.push(`/app?${params.toString()}`);
    }, 480);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      onSubmit();
    }
  };

  const heroPx = { x: (HERO_CX / 100) * vp.w, y: (HERO_CY / 100) * vp.h };

  const activeThreads: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    accent: Accent;
  }[] = [];
  CONSTELLATIONS.forEach((cluster) => {
    const cx = (cluster.cx / 100) * vp.w;
    const cy = (cluster.cy / 100) * vp.h;
    activeChips[cluster.id].forEach((chipName) => {
      const chip = cluster.chips.find((c) => c.v === chipName);
      if (!chip) return;
      activeThreads.push({
        x1: cx + chip.dx,
        y1: cy + chip.dy,
        x2: heroPx.x,
        y2: heroPx.y,
        accent: cluster.accent,
      });
    });
  });

  const buttonStyle: CSSProperties = {
    ...Stype.bodyMed,
    fontSize: 13,
    padding: "9px 18px",
    background: canSubmit ? S.amberGlow : "transparent",
    color: canSubmit ? "#1a1310" : S.faint,
    border: canSubmit ? 0 : `1px solid ${S.rule}`,
    boxShadow: canSubmit
      ? `0 0 ${20 + totalChips * 6}px rgba(244,204,125,${
          0.3 + Math.min(totalChips * 0.1, 0.3)
        })`
      : "none",
    cursor: canSubmit ? "pointer" : "not-allowed",
    transition: "all 380ms ease",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
    transform: `scale(${
      canSubmit ? 1 + Math.min(totalChips * 0.02, 0.08) : 1
    })`,
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        opacity: submitting ? 0 : 1,
        transition: "opacity 480ms ease",
      }}
    >
      {/* Warm tungsten halo behind hero */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: `${HERO_CX}%`,
          top: `${HERO_CY}%`,
          transform: "translate(-50%,-50%)",
          width: 960,
          height: 540,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(217,150,62,0.10) 0%, transparent 60%)",
          filter: "blur(40px)",
          animation: "fieldBreath 18s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: "4%",
          top: "70%",
          width: 600,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(79,115,174,0.08) 0%, transparent 60%)",
          filter: "blur(40px)",
        }}
      />

      {/* Constellation dots */}
      {[
        { x: "10%", y: "10%", size: 2, delay: 0, opacity: 0.35 },
        { x: "60%", y: "46%", size: 1.5, delay: 4, opacity: 0.25 },
        { x: "94%", y: "92%", size: 2, delay: 1, opacity: 0.3 },
        { x: "6%", y: "94%", size: 1.5, delay: 3, opacity: 0.25 },
      ].map((d, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: "#F4E0B4",
            opacity: d.opacity,
            boxShadow: `0 0 ${d.size * 4}px #F4E0B4`,
            animation: "pulse 9s ease-in-out infinite",
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}

      {/* SVG: semantic threads */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: vp.w,
          height: vp.h,
          pointerEvents: "none",
        }}
      >
        {CONSTELLATIONS.map((c, i) => {
          const next = CONSTELLATIONS[(i + 1) % CONSTELLATIONS.length];
          return (
            <line
              key={i}
              x1={`${c.cx}%`}
              y1={`${c.cy}%`}
              x2={`${next.cx}%`}
              y2={`${next.cy}%`}
              stroke={S.threadFaint}
              strokeOpacity="0.10"
              strokeWidth="0.6"
              strokeDasharray="2 8"
            />
          );
        })}
        {activeThreads.map((t, i) => {
          const c = t.accent === "cobalt" ? S.cobaltGlow : S.amberGlow;
          return (
            <line
              key={i}
              x1={t.x1}
              y1={t.y1}
              x2={t.x2}
              y2={t.y2}
              stroke={c}
              strokeOpacity="0.34"
              strokeWidth="0.8"
              strokeDasharray="3 6"
              style={{ animation: "breath 6s ease-in-out infinite" }}
            />
          );
        })}
      </svg>

      {CONSTELLATIONS.map((cluster) => (
        <Constellation
          key={cluster.id}
          cluster={cluster}
          active={activeChips[cluster.id] || []}
          onToggle={toggleChip}
          cursor={cursor}
          vp={vp}
        />
      ))}

      {/* Top brand strip */}
      <header
        style={{
          position: "absolute",
          top: 28,
          left: 56,
          right: 56,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: S.amberGlow,
              boxShadow: `0 0 22px ${S.amberGlow}`,
              animation: "pulse 3.6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              ...sf(24, 500, 94),
              fontSize: 24,
              color: S.bone,
              letterSpacing: "-.015em",
            }}
          >
            UX Scout
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              paddingLeft: 20,
              marginLeft: 6,
              borderLeft: `1px solid ${S.rule}`,
            }}
          >
            <div
              style={{
                ...Stype.micro,
                fontSize: 14,
                color: S.bone,
                letterSpacing: ".18em",
                lineHeight: 1.25,
              }}
            >
              RESEARCH THE MARKET.
            </div>
            <div
              style={{
                ...Stype.micro,
                fontSize: 14,
                color: S.amberGlow,
                letterSpacing: ".18em",
                lineHeight: 1.25,
                textShadow: "0 0 16px rgba(244,204,125,0.40)",
              }}
            >
              BUILD WHAT WINS.
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div
        style={{
          position: "absolute",
          left: `${HERO_CX}%`,
          top: `${HERO_CY}%`,
          transform: "translate(-50%, -50%)",
          width: HERO_W,
          zIndex: 20,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: S.amberGlow,
              boxShadow: `0 0 14px ${S.amberGlow}`,
              animation: "pulse 3.4s ease-in-out infinite",
            }}
          />
          <span
            style={{
              ...Stype.micro,
              fontSize: 10,
              color: S.amberGlow,
              letterSpacing: ".24em",
            }}
          >
            tonight&apos;s research
          </span>
        </div>

        <div style={{ position: "relative", pointerEvents: "auto" }}>
          <textarea
            value={query}
            onChange={handleQueryChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={onKeyDown}
            rows={2}
            placeholder=""
            style={{
              width: "100%",
              resize: "none",
              border: 0,
              outline: "none",
              background: "transparent",
              color: S.bone,
              padding: "4px 0 16px",
              ...sf(38, 400, 92),
              fontSize: 36,
              lineHeight: 1.18,
              letterSpacing: "-.022em",
              borderBottom: `1px solid ${
                query.length > 0 || focused
                  ? S.amberGlow
                  : "rgba(244,204,125,0.30)"
              }`,
              transition: "border-color 320ms ease",
              minHeight: 86,
              position: "relative",
              zIndex: 2,
            }}
            autoFocus
          />

          {query.length === 0 && (
            <div
              style={{
                position: "absolute",
                top: 4,
                left: 0,
                right: 0,
                padding: "0 0 16px",
                pointerEvents: "none",
                zIndex: 1,
                ...sf(38, 400, 92),
                fontSize: 36,
                lineHeight: 1.18,
                letterSpacing: "-.022em",
                color: "rgba(232,227,210,0.30)",
                opacity: phPhase === "in" ? 1 : 0,
                transition: "opacity 620ms ease",
              }}
            >
              {INSPIRATION_PROMPTS[placeholderIdx]}
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "auto",
          }}
        >
          <span
            style={{
              ...Stype.body,
              fontSize: 12,
              color: S.soft,
              lineHeight: 1.5,
            }}
          >
            {query.length > 0
              ? `press ⌘↵ to begin · ${totalChips} ${
                  totalChips === 1 ? "coordinate" : "coordinates"
                } set`
              : "type freely · or tap nodes in the universe"}
          </span>
          <button onClick={onSubmit} disabled={!canSubmit} style={buttonStyle}>
            <span>Begin research</span>
            <span style={{ fontSize: 14 }}>{submitting ? "·" : "→"}</span>
          </button>
        </div>
      </div>

      {/* Bottom attribution */}
      <div
        style={{
          position: "absolute",
          bottom: 26,
          left: 56,
          right: 56,
          zIndex: 30,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>
          UX Scout · 2026
        </div>
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>
          a living universe of product intelligence
        </div>
      </div>
    </div>
  );
}
