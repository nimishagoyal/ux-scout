"use client";

import type { CSSProperties, ReactNode } from "react";
import { L, Ltype } from "@/lib/tokens";

// ─── Lwrap — warm-graphite canvas with tungsten radial light ────────────────
export function Lwrap({
  children,
  bg,
  pad = 44,
  style,
}: {
  children: ReactNode;
  bg?: string;
  pad?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        background:
          bg ||
          `radial-gradient(ellipse 90% 70% at 18% 10%, rgba(217,150,62,0.10) 0%, rgba(217,150,62,0.03) 30%, transparent 60%), ${L.graphite}`,
        color: L.bone,
        fontFamily: "Geist, system-ui, sans-serif",
        padding: pad,
        ...style,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 50% at 80% 100%, rgba(79,115,174,0.10) 0%, transparent 55%)",
          mixBlendMode: "screen",
          opacity: 0.8,
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)",
          mixBlendMode: "overlay",
          opacity: 0.5,
        }}
      />
      {children}
    </div>
  );
}

export function Lmicro({ txt, color }: { txt: string; color?: string }) {
  return <div style={{ ...Ltype.micro, color: color || L.soft }}>{txt}</div>;
}

export function Halo({
  x = "50%",
  y = "50%",
  w = 360,
  h = 240,
  color = "rgba(217,150,62,0.18)",
  blur = 80,
}: {
  x?: string | number;
  y?: string | number;
  w?: number;
  h?: number;
  color?: string;
  blur?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: "translate(-50%,-50%)",
        width: w,
        height: h,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
      }}
    />
  );
}

export function Plate({
  x,
  y,
  w = 130,
  h = 96,
  rot = 0,
  kind = "list",
  label,
  source,
  accent = "amber",
  dim = false,
  active = false,
  animateDelay = 0,
}: {
  x: number | string;
  y: number | string;
  w?: number;
  h?: number;
  rot?: number;
  kind?: "list" | "cards" | "form" | "detail";
  label?: string;
  source?: string;
  accent?: "amber" | "amberGlow" | "cobalt";
  dim?: boolean;
  active?: boolean;
  animateDelay?: number;
}) {
  const aColor =
    accent === "cobalt" ? L.cobalt : accent === "amberGlow" ? L.amberGlow : L.amber;
  return (
    <figure
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        margin: 0,
        transform: `rotate(${rot}deg)`,
        opacity: dim ? 0.32 : active ? 1 : 0.82,
        filter: dim ? "blur(.4px)" : "none",
        animation: active
          ? "lumen-breath 7s ease-in-out infinite"
          : "lumen-drift 14s ease-in-out infinite",
        animationDelay: `${animateDelay}s`,
        transition: "all 600ms ease",
      }}
    >
      <div
        style={{
          height: h,
          background: L.raisedWarm,
          boxShadow: active
            ? `0 0 0 1px rgba(244,224,180,0.35), 0 24px 50px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(217,150,62,0.35)`
            : `0 0 0 1px rgba(232,227,210,0.08), 0 14px 24px -12px rgba(0,0,0,0.6)`,
          overflow: "hidden",
          padding: 6,
        }}
      >
        <RefScreenshot
          palette={{ bg: L.raised, ink: L.bone, mute: L.dim, accent: aColor }}
          kind={kind}
        />
      </div>
      {(label || source) && (
        <figcaption style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 1 }}>
          {label && (
            <div style={{ ...Ltype.italic, fontSize: 11, color: L.bone, lineHeight: 1.25 }}>
              {label}
            </div>
          )}
          {source && (
            <div style={{ ...Ltype.micro, fontSize: 8, color: dim ? L.faint : L.soft, letterSpacing: ".18em" }}>
              {source}
            </div>
          )}
        </figcaption>
      )}
    </figure>
  );
}

export function Thread({
  x1,
  y1,
  x2,
  y2,
  strong = false,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  strong?: boolean;
  dashed?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={strong ? L.threadStrong : L.threadFaint}
      strokeWidth={strong ? 1.2 : 0.8}
      strokeDasharray={dashed ? "2 4" : "none"}
    />
  );
}

export function Mote({
  x,
  y,
  color = L.amberGlow,
  size = 3,
  delay = 0,
  opacity = 0.6,
}: {
  x: number | string;
  y: number | string;
  color?: string;
  size?: number;
  delay?: number;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animation: "lumen-pulse 4s ease-in-out infinite",
        animationDelay: `${delay}s`,
      }}
    />
  );
}

export function Chip({
  children,
  accent = "soft",
  size = "m",
}: {
  children: ReactNode;
  accent?: "amber" | "cobalt" | "bone" | "soft";
  size?: "s" | "m";
}) {
  const c =
    accent === "amber"
      ? L.amberGlow
      : accent === "cobalt"
      ? L.cobaltGlow
      : accent === "bone"
      ? L.bone
      : L.soft;
  const pad = size === "s" ? "2px 9px" : "3px 12px";
  const fs = size === "s" ? 10.5 : 11.5;
  return (
    <span
      style={{
        ...Ltype.italic,
        fontSize: fs,
        padding: pad,
        borderRadius: 999,
        border: `1px solid ${c}`,
        color: c,
        letterSpacing: ".01em",
        boxShadow: `inset 0 0 14px ${c}10`,
      }}
    >
      {children}
    </span>
  );
}

// ─── from shared.jsx ───────────────────────────────────────────────────────

export function Placeholder({
  label,
  w,
  h,
  tone = "light",
  tilt = 0,
  style,
}: {
  label?: string;
  w: number | string;
  h: number | string;
  tone?: "light" | "dark" | "cream";
  tilt?: number;
  style?: CSSProperties;
}) {
  const bg = tone === "dark" ? "#1a1a1a" : tone === "cream" ? "#E8E0CE" : "#E5E2DA";
  const fg = tone === "dark" ? "#888" : "#7a7468";
  const stripe = tone === "dark" ? "rgba(255,255,255,.04)" : "rgba(0,0,0,.035)";
  return (
    <div
      style={{
        width: w,
        height: h,
        background: bg,
        backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0 8px, transparent 8px 16px)`,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-start",
        padding: 10,
        fontFamily: "Geist Mono, monospace",
        fontSize: 10,
        color: fg,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        transform: `rotate(${tilt}deg)`,
        transformOrigin: "center",
        ...style,
      }}
    >
      {label}
    </div>
  );
}

export function RefScreenshot({
  palette,
  kind = "list",
  label,
}: {
  palette: { bg: string; ink: string; mute: string; accent: string };
  kind?: "list" | "cards" | "form" | "detail";
  label?: string;
}) {
  const { bg, ink, mute, accent } = palette;
  return (
    <div
      style={{
        background: bg,
        color: ink,
        padding: 10,
        position: "relative",
        overflow: "hidden",
        height: "100%",
      }}
    >
      <div style={{ height: 6, width: 30, background: ink, opacity: 0.8, marginBottom: 8 }} />
      {kind === "list" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 14, height: 14, background: mute }} />
              <div style={{ flex: 1, height: 6, background: mute, opacity: 0.8 - i * 0.1 }} />
              <div style={{ width: 22, height: 6, background: accent, opacity: 0.5 }} />
            </div>
          ))}
        </div>
      )}
      {kind === "cards" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} style={{ background: mute, padding: 6, opacity: 0.9 }}>
              <div style={{ height: 16, background: ink, opacity: 0.15, marginBottom: 4 }} />
              <div style={{ height: 4, background: ink, opacity: 0.25, marginBottom: 2 }} />
              <div style={{ height: 4, background: ink, opacity: 0.25, width: "70%" }} />
            </div>
          ))}
        </div>
      )}
      {kind === "form" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ height: 24, background: mute }} />
          <div style={{ height: 24, background: mute }} />
          <div style={{ height: 60, background: mute }} />
          <div style={{ height: 18, width: 70, background: accent }} />
        </div>
      )}
      {kind === "detail" && (
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 60, background: mute, height: 120 }} />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ height: 8, background: ink, opacity: 0.8, width: "60%" }} />
            <div style={{ height: 4, background: mute, marginTop: 4 }} />
            <div style={{ height: 4, background: mute }} />
            <div style={{ height: 4, background: mute, width: "80%" }} />
            <div style={{ height: 4, background: mute, width: "70%" }} />
            <div style={{ height: 14, width: 40, background: accent, marginTop: 6 }} />
          </div>
        </div>
      )}
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: 10,
            fontSize: 8,
            fontFamily: "Geist Mono, monospace",
            opacity: 0.55,
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}

export function Annotation({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: "Geist Mono, monospace",
        fontSize: 10,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        color: "#9a9286",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
