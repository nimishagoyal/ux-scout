// ─────────────────────────────────────────────────────────────
// LUMEN — a cinematic thinking environment.
// Tokens, primitives, ambient motion.
// ─────────────────────────────────────────────────────────────

const L = {
  // Deep ground — warm graphite, not pure black
  deep:         '#0D0F12',
  graphite:     '#14171C',
  warmGraphite: '#191915',
  raised:       '#1F2228',
  raisedWarm:   '#231F18',
  // Hairlines, all luminous-low
  rule:         'rgba(232,227,210,0.10)',
  hairline:     'rgba(232,227,210,0.05)',
  threadFaint:  'rgba(244,224,180,0.18)',
  threadStrong: 'rgba(244,224,180,0.55)',
  // Ink — warm bone, not white
  bone:    '#E8E3D2',
  ink:     '#CFC9B5',
  soft:    '#8A8472',
  faint:   '#5A564B',
  dim:     '#3A372F',
  // Accents — restrained, luminous, analog
  cobalt:     '#4F73AE',
  cobaltGlow: '#88A6D8',
  amber:      '#D9963E',
  amberGlow:  '#F4CC7D',
  warmLight:  '#F4E0B4',
  ember:      '#7A3D1C',
};

const Ltype = {
  marquee:  { fontFamily: 'Instrument Serif, serif', fontWeight: 400, letterSpacing: '-.02em', lineHeight: .95 },
  italic:   { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', letterSpacing: '-.005em' },
  reading:  { fontFamily: 'Newsreader, serif', fontWeight: 300, lineHeight: 1.6 },
  readingI: { fontFamily: 'Newsreader, serif', fontStyle: 'italic', lineHeight: 1.45 },
  ui:       { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 400 },
  uiThin:   { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 300 },
  micro:    { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: L.soft, fontWeight: 400 },
};

// Inject keyframes once. Ambient only — slow pulse, slow drift.
if (typeof document !== 'undefined' && !document.getElementById('lumen-keyframes')) {
  const style = document.createElement('style');
  style.id = 'lumen-keyframes';
  style.textContent = `
    @keyframes lumen-pulse  { 0%, 100% { opacity: .55; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
    @keyframes lumen-drift  { 0% { transform: translate(0,0); } 50% { transform: translate(4px, -3px); } 100% { transform: translate(0,0); } }
    @keyframes lumen-breath { 0%, 100% { opacity: .85; } 50% { opacity: 1; } }
    @keyframes lumen-scan   { 0% { transform: translateX(-30%); opacity: 0; } 30% { opacity: .35; } 70% { opacity: .35; } 100% { transform: translateX(130%); opacity: 0; } }
    @keyframes lumen-fade   { 0%, 100% { opacity: .25; } 50% { opacity: .55; } }
    @keyframes lumen-dotdrift { 0% { transform: translate(0,0); } 100% { transform: translate(8px, -6px); } }
  `;
  document.head.appendChild(style);
}

// Wrap — sets up the warm-graphite canvas with a subtle radial light from the
// upper-left simulating tungsten ambient light. Adds a faint film grain.
const Lwrap = (children, opts = {}) => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: opts.bg || `radial-gradient(ellipse 90% 70% at 18% 10%, rgba(217,150,62,0.10) 0%, rgba(217,150,62,0.03) 30%, transparent 60%), ${L.graphite}`,
    color: L.bone,
    fontFamily: 'Geist, system-ui, sans-serif',
    padding: opts.pad ?? 44, boxSizing: 'border-box',
    ...(opts.style || {}),
  }}>
    {/* Soft grain / atmosphere layer */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: 'radial-gradient(ellipse 60% 50% at 80% 100%, rgba(79,115,174,0.10) 0%, transparent 55%)',
      mixBlendMode: 'screen', opacity: .8,
    }} />
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)`,
      mixBlendMode: 'overlay', opacity: .5,
    }} />
    {children}
  </div>
);

// Micro label — used for spatial coordinates, section marks, ambient metadata.
const Lmicro = (txt, color) => <div style={{ ...Ltype.micro, color: color || L.soft }}>{txt}</div>;

// Soft luminous halo behind a focused object — implies warmth, not glow.
const Halo = ({ x = '50%', y = '50%', w = 360, h = 240, color = 'rgba(217,150,62,0.18)', blur = 80 }) => (
  <div aria-hidden="true" style={{
    position: 'absolute', left: x, top: y, transform: 'translate(-50%,-50%)',
    width: w, height: h, borderRadius: '50%',
    background: color, filter: `blur(${blur}px)`, pointerEvents: 'none',
  }} />
);

// Reference plate — small framed screenshot pinned to the wall.
const Plate = ({ x, y, w = 130, h = 96, rot = 0, kind = 'list', label, source, accent = 'amber', dim = false, active = false, animateDelay = 0 }) => {
  const aColor = accent === 'cobalt' ? L.cobalt : accent === 'amberGlow' ? L.amberGlow : L.amber;
  return (
    <figure style={{
      position: 'absolute', left: x, top: y, width: w, margin: 0,
      transform: `rotate(${rot}deg)`,
      opacity: dim ? 0.32 : (active ? 1 : 0.82),
      filter: dim ? 'blur(.4px)' : 'none',
      animation: active ? 'lumen-breath 7s ease-in-out infinite' : 'lumen-drift 14s ease-in-out infinite',
      animationDelay: `${animateDelay}s`,
      transition: 'all 600ms ease',
    }}>
      <div style={{
        height: h, background: L.raisedWarm,
        boxShadow: active
          ? `0 0 0 1px rgba(244,224,180,0.35), 0 24px 50px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(217,150,62,0.35)`
          : `0 0 0 1px rgba(232,227,210,0.08), 0 14px 24px -12px rgba(0,0,0,0.6)`,
        overflow: 'hidden', padding: 6, boxSizing: 'border-box',
      }}>
        <RefScreenshot palette={{ bg: L.raised, ink: L.bone, mute: L.dim, accent: aColor }} kind={kind} />
      </div>
      {(label || source) && (
        <figcaption style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {label && <div style={{ ...Ltype.italic, fontSize: 11, color: L.bone, lineHeight: 1.25 }}>{label}</div>}
          {source && <div style={{ ...Ltype.micro, fontSize: 8, color: dim ? L.faint : L.soft, letterSpacing: '.18em' }}>{source}</div>}
        </figcaption>
      )}
    </figure>
  );
};

// SVG thread line connecting two points — for cluster connections.
const Thread = ({ x1, y1, x2, y2, strong = false, dashed = false }) => (
  <line x1={x1} y1={y1} x2={x2} y2={y2}
    stroke={strong ? L.threadStrong : L.threadFaint}
    strokeWidth={strong ? 1.2 : 0.8}
    strokeDasharray={dashed ? '2 4' : 'none'} />
);

// Tiny moving dot — for ambient scanning.
const Mote = ({ x, y, color = L.amberGlow, size = 3, delay = 0, opacity = 0.6 }) => (
  <div style={{
    position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%',
    background: color, opacity, boxShadow: `0 0 ${size*3}px ${color}`,
    animation: 'lumen-pulse 4s ease-in-out infinite',
    animationDelay: `${delay}s`,
  }} />
);

// Cinematic chip — pill with hairline border, slight inner glow.
const Chip = ({ children, accent = 'soft', size = 'm' }) => {
  const c = accent === 'amber' ? L.amberGlow : accent === 'cobalt' ? L.cobaltGlow : accent === 'bone' ? L.bone : L.soft;
  const pad = size === 's' ? '2px 9px' : '3px 12px';
  const fs = size === 's' ? 10.5 : 11.5;
  return (
    <span style={{
      ...Ltype.italic, fontSize: fs, padding: pad, borderRadius: 999,
      border: `1px solid ${c}`, color: c,
      letterSpacing: '.01em',
      boxShadow: `inset 0 0 14px ${c}10`,
    }}>{children}</span>
  );
};

Object.assign(window, { L, Ltype, Lwrap, Lmicro, Halo, Plate, Thread, Mote, Chip });
