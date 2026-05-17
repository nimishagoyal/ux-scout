// ─────────────────────────────────────────────────────────────
// UX SCOUT — Hero Sequence helpers.
// Tokens, math, primitives, type stack.
// No italics anywhere. Hierarchy via scale/weight/space.
// ─────────────────────────────────────────────────────────────

const S = {
  deep:         '#0D0F12',
  graphite:     '#14171C',
  warmGraphite: '#191915',
  raised:       '#1F2228',
  raisedWarm:   '#231F18',
  surface:      '#1B1E23',
  rule:         'rgba(232,227,210,0.10)',
  hairline:     'rgba(232,227,210,0.05)',
  threadFaint:  'rgba(244,224,180,0.18)',
  threadStrong: 'rgba(244,224,180,0.55)',
  bone:    '#E8E3D2',
  ink:     '#CFC9B5',
  soft:    '#8A8472',
  faint:   '#5A564B',
  dim:     '#3A372F',
  cobalt:     '#4F73AE',
  cobaltGlow: '#88A6D8',
  amber:      '#D9963E',
  amberGlow:  '#F4CC7D',
  warmLight:  '#F4E0B4',
  ember:      '#7A3D1C',
  check:      '#A9B98E',
  cross:      '#7C5040',
};

// Bricolage Grotesque variation axes
const sf = (opsz = 14, wght = 400, wdth = 100) => ({
  fontFamily: 'Bricolage Grotesque, system-ui, sans-serif',
  fontVariationSettings: `'opsz' ${opsz}, 'wdth' ${wdth}, 'wght' ${wght}`,
  fontWeight: wght,
  fontStyle: 'normal',
});

// Type system — NO italics. Hierarchy from scale, weight, tracking.
const Stype = {
  display:   { ...sf(96, 400, 92),  letterSpacing: '-.025em', lineHeight: 1.0 },
  displayLg: { ...sf(96, 500, 88),  letterSpacing: '-.03em',  lineHeight: 0.98 },
  title:     { ...sf(48, 400, 95),  letterSpacing: '-.02em',  lineHeight: 1.05 },
  titleMed:  { ...sf(48, 500, 92),  letterSpacing: '-.02em',  lineHeight: 1.05 },
  headline:  { ...sf(28, 400, 96),  letterSpacing: '-.015em', lineHeight: 1.12 },
  headlineMed: { ...sf(28, 500, 94), letterSpacing: '-.015em', lineHeight: 1.12 },
  // Long-form reading prose — Newsreader 300, no italics
  reading:   { fontFamily: 'Newsreader, serif', fontWeight: 300, fontStyle: 'normal', lineHeight: 1.6 },
  readingMed:{ fontFamily: 'Newsreader, serif', fontWeight: 400, fontStyle: 'normal', lineHeight: 1.55 },
  // UI body
  body:      { ...sf(14, 400, 100), lineHeight: 1.55 },
  bodyMed:   { ...sf(14, 500, 100), lineHeight: 1.55 },
  // Eyebrows — wide-tracked uppercase
  eyebrow:   { ...sf(11, 500, 100), letterSpacing: '.20em',  textTransform: 'uppercase' },
  micro:     { ...sf(10, 400, 100), letterSpacing: '.24em',  textTransform: 'uppercase' },
  // Tabular figures
  tabular:   { ...sf(14, 400, 100), fontVariantNumeric: 'tabular-nums' },
};

// ─── Math ─────────────────────────────────────────────────────
const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeOut = (t) => 1 - Math.pow(1 - clamp01(t), 2.5);
const easeIn = (t) => Math.pow(clamp01(t), 2.5);
const easeInOut = (t) => { t = clamp01(t); return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2; };
const subEased = (p, start, end, ease = easeInOut) => {
  if (end === start) return p < start ? 0 : 1;
  return ease(clamp01((p - start) / (end - start)));
};
const subRaw = (p, start, end) => {
  if (end === start) return p < start ? 0 : 1;
  return clamp01((p - start) / (end - start));
};

// ─── Atmosphere ───────────────────────────────────────────────
const Atmosphere = ({ amberStrength = 1, cobaltStrength = 1, vignette = true }) => (
  <React.Fragment>
    <div aria-hidden="true" style={{
      position: 'absolute', left: '18%', top: '8%', transform: 'translate(-50%,-50%)',
      width: '62vw', height: '52vh', borderRadius: '50%', pointerEvents: 'none',
      background: `radial-gradient(circle at 35% 35%, rgba(217,150,62,${0.16 * amberStrength}) 0%, transparent 60%)`,
      filter: 'blur(20px)',
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute', right: '8%', bottom: '8%', transform: 'translate(50%,50%)',
      width: '50vw', height: '42vh', borderRadius: '50%', pointerEvents: 'none',
      background: `radial-gradient(circle at 35% 35%, rgba(79,115,174,${0.12 * cobaltStrength}) 0%, transparent 60%)`,
      filter: 'blur(20px)',
    }} />
    {vignette && (
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.4) 100%)',
      }} />
    )}
  </React.Fragment>
);

const Halo = ({ x, y, w = 360, h = 240, color = 'rgba(217,150,62,0.18)', blur = 90, opacity = 1 }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)',
    width: w, height: h, borderRadius: '50%',
    background: color, filter: `blur(${blur}px)`,
    opacity, pointerEvents: 'none',
  }} />
);

// ─── Constellation dot — small luminous point, slow ambient motion
const StarDot = ({ x, y, size = 3, color = '#F4E0B4', opacity = 0.5, delay = 0 }) => (
  <div style={{
    position: 'absolute', left: x, top: y, width: size, height: size,
    borderRadius: '50%', background: color, opacity,
    boxShadow: `0 0 ${size * 4}px ${color}`,
    animation: 'pulse 6s ease-in-out infinite',
    animationDelay: `${delay}s`,
    pointerEvents: 'none',
  }} />
);

// ─── Screenshot mini ────────────────────────────────────────
const Screenshot = ({ kind, accent = S.amber }) => {
  if (window.RefScreenshot) {
    return <RefScreenshot palette={{ bg: S.raised, ink: S.bone, mute: S.dim, accent }} kind={kind} />;
  }
  return <div style={{ width: '100%', height: '100%', background: S.dim }} />;
};

// ─── Reference plate ────────────────────────────────────────
const Plate = ({
  xPct, yPct, w = 130, h = 90, rot = 0, kind = 'form', accent = 'amber',
  opacity = 1, scale = 1, lit = false, source, label, zIndex = 2,
  noCaption = false,
}) => {
  const aColor = accent === 'cobalt' ? S.cobaltGlow : accent === 'soft' ? S.soft : S.amberGlow;
  return (
    <figure style={{
      position: 'absolute', left: `${xPct}%`, top: `${yPct}%`,
      width: w, margin: 0, zIndex,
      transform: `translate(-50%, -50%) rotate(${rot}deg) scale(${scale})`,
      opacity,
      transition: 'opacity 600ms ease, transform 800ms cubic-bezier(0.22, 1, 0.36, 1)',
      pointerEvents: 'none',
    }}>
      <div style={{
        height: h, padding: 5, background: S.raisedWarm, position: 'relative',
        boxShadow: lit
          ? `0 0 0 1px rgba(244,204,125,0.45), 0 24px 50px -20px rgba(0,0,0,0.7), 0 0 70px -10px rgba(217,150,62,0.4)`
          : `0 0 0 1px rgba(232,227,210,0.08), 0 14px 24px -12px rgba(0,0,0,0.6)`,
        boxSizing: 'border-box', overflow: 'hidden',
      }}>
        <Screenshot kind={kind} accent={aColor} />
      </div>
      {!noCaption && (source || label) && opacity > 0.5 && (
        <figcaption style={{ marginTop: 7 }}>
          {label && <div style={{ ...Stype.body, fontSize: 12, color: S.bone, lineHeight: 1.3 }}>{label}</div>}
          {source && <div style={{ ...Stype.micro, fontSize: 9, color: S.soft, marginTop: 2 }}>{source}</div>}
        </figcaption>
      )}
    </figure>
  );
};

// SVG thread between two percent points
const Thread = ({ x1, y1, x2, y2, opacity = 0.5, strong = false, dashed = false }) => (
  <line
    x1={`${x1}%`} y1={`${y1}%`} x2={`${x2}%`} y2={`${y2}%`}
    stroke={strong ? S.threadStrong : S.threadFaint}
    strokeOpacity={opacity}
    strokeWidth={strong ? 1.1 : 0.7}
    strokeDasharray={dashed ? '2 5' : 'none'}
  />
);

// ─── Eyebrow + Chip + Scene ──────────────────────────────────
const Eyebrow = ({ children, color = S.amberGlow, style = {} }) => (
  <div style={{ ...Stype.eyebrow, color, fontSize: 11, ...style }}>{children}</div>
);

// Chip — pill with hairline border; lit when active
const Chip = ({ children, active = false, color = 'soft', size = 'm', style = {} }) => {
  const c = color === 'amber' ? S.amberGlow : color === 'cobalt' ? S.cobaltGlow : color === 'bone' ? S.bone : S.soft;
  const padding = size === 's' ? '4px 10px' : '6px 14px';
  const fs = size === 's' ? 11 : 13;
  return (
    <span style={{
      ...Stype.body, fontSize: fs, padding, borderRadius: 999,
      border: `1px solid ${active ? S.amberGlow : S.rule}`,
      color: active ? S.bone : c,
      background: active ? 'rgba(217,150,62,0.10)' : 'transparent',
      boxShadow: active ? `0 0 24px rgba(244,204,125,0.20), inset 0 0 14px rgba(244,204,125,0.05)` : 'none',
      transition: 'all 500ms ease',
      whiteSpace: 'nowrap',
      ...style,
    }}>{children}</span>
  );
};

const Scene = ({ opacity, children, zIndex = 3, style = {} }) => {
  if (opacity <= 0.01) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, opacity,
      transition: 'opacity 400ms ease',
      zIndex, pointerEvents: 'none',
      ...style,
    }}>{children}</div>
  );
};

Object.assign(window, {
  S, Stype, sf,
  clamp01, lerp, easeOut, easeIn, easeInOut, subEased, subRaw,
  Atmosphere, Halo, StarDot, Plate, Thread, Screenshot, Eyebrow, Chip, Scene,
});
