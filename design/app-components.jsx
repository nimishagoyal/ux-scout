// ─────────────────────────────────────────────────────────────
// UX SCOUT — Reusable component library for the production app.
// All components named, no italics, Söhne-inspired typography.
// ─────────────────────────────────────────────────────────────

// ─── Button ──────────────────────────────────────────────────
const Button = ({ variant = 'primary', size = 'm', children, onClick, icon, trailing, disabled, style = {}, ...rest }) => {
  const variants = {
    primary: {
      background: S.amberGlow, color: '#1a1310',
      boxShadow: `0 0 28px rgba(244,204,125,0.32)`,
      border: 0,
    },
    secondary: {
      background: 'transparent', color: S.bone,
      border: `1px solid ${S.threadStrong}`,
    },
    ghost: {
      background: 'transparent', color: S.bone,
      border: `1px solid ${S.rule}`,
    },
    link: {
      background: 'transparent', color: S.amberGlow,
      border: 0, padding: 0,
    },
    danger: {
      background: 'transparent', color: S.cross,
      border: `1px solid ${S.cross}`,
    },
  };

  const sizes = {
    s: { padding: '6px 14px', fontSize: 12.5 },
    m: { padding: '10px 20px', fontSize: 13.5 },
    l: { padding: '14px 26px', fontSize: 15 },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        ...Stype.bodyMed, ...sizes[size], ...variants[variant],
        display: 'inline-flex', alignItems: 'center', gap: 10,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 200ms ease',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {icon && <span style={{ fontSize: '1.1em', lineHeight: 1 }}>{icon}</span>}
      <span>{children}</span>
      {trailing && <span style={{ fontSize: '1.1em', lineHeight: 1, opacity: .8 }}>{trailing}</span>}
    </button>
  );
};

// ─── Card — base container ───────────────────────────────────
const Card = ({ accent, lit, children, padding = 24, style = {} }) => (
  <div style={{
    background: lit
      ? `linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.88) 100%)`
      : `linear-gradient(135deg, rgba(30,34,40,0.55) 0%, rgba(22,25,30,0.62) 100%)`,
    boxShadow: lit
      ? `0 0 0 1px rgba(244,204,125,0.30), 0 24px 50px -20px rgba(0,0,0,0.6), 0 0 80px -28px rgba(217,150,62,0.30)`
      : `0 0 0 1px rgba(232,227,210,0.08), 0 16px 30px -16px rgba(0,0,0,0.45)`,
    padding,
    transition: 'all 250ms ease',
    ...style,
  }}>{children}</div>
);

// ─── Priority chip (for recommendations) ─────────────────────
const PriorityTag = ({ level }) => {
  const color = level === 'HIGH' ? S.amberGlow : level === 'MEDIUM' ? S.cobaltGlow : S.soft;
  return (
    <span style={{
      ...Stype.eyebrow, fontSize: 9.5, padding: '3px 10px',
      border: `1px solid ${color}`, color, letterSpacing: '.18em',
      display: 'inline-block',
    }}>{level}</span>
  );
};

// ─── Status pill (for studies) ───────────────────────────────
const StatusPill = ({ status }) => {
  const map = {
    fresh:    { c: S.amberGlow, label: 'fresh' },
    reviewed: { c: S.cobaltGlow, label: 'reviewed' },
    archived: { c: S.soft,       label: 'archived' },
    draft:    { c: S.faint,      label: 'draft' },
  };
  const m = map[status] || map.draft;
  return (
    <span style={{
      ...Stype.eyebrow, fontSize: 9, padding: '3px 9px',
      color: m.c, border: `1px solid ${m.c}`, letterSpacing: '.18em',
    }}>{m.label}</span>
  );
};

// ─── App Icon — small reused glyph ───────────────────────────
const AppIcon = ({ name, size = 28, color = S.amberGlow }) => {
  // Render the first letter inside a soft square. Avoids fake logos.
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: size, height: size, borderRadius: size * 0.22,
      background: S.raisedWarm, color,
      ...sf(size * 0.45, 500, 96),
      letterSpacing: '-.02em',
      boxShadow: `0 0 0 1px ${S.rule}`,
    }}>{name[0]}</span>
  );
};

// ─── Mini screenshot wrapper (uses RefScreenshot) ────────────
const AppShot = ({ kind = 'form', accent = S.amberGlow, w, h }) => (
  <div style={{
    width: w, height: h, padding: 5, background: S.raisedWarm,
    boxShadow: `0 0 0 1px rgba(232,227,210,0.08), 0 10px 22px -12px rgba(0,0,0,0.5)`,
  }}>
    <RefScreenshot palette={{ bg: S.raised, ink: S.bone, mute: S.dim, accent }} kind={kind} />
  </div>
);

// ─── Section header used inside study sections ───────────────
const SectionHeader = ({ eyebrow, title, right }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
    <div>
      {eyebrow && <div style={{ ...Stype.eyebrow, fontSize: 10, color: S.amberGlow }}>{eyebrow}</div>}
      <h2 style={{ ...Stype.title, fontSize: 38, color: S.bone, margin: '10px 0 0', lineHeight: 1.05 }}>
        {title}
      </h2>
    </div>
    {right && <div style={{ flexShrink: 0, marginLeft: 32 }}>{right}</div>}
  </div>
);

// ─── KeyValue — small metadata pair ──────────────────────────
const KeyValue = ({ label, value, color = S.bone }) => (
  <div>
    <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{label}</div>
    <div style={{ ...Stype.bodyMed, fontSize: 14, color, marginTop: 4 }}>{value}</div>
  </div>
);

// ─── Matrix cell renderer ────────────────────────────────────
const AppMatrixCell = ({ v, lit }) => {
  if (v === 'y') return (
    <span style={{ color: lit ? S.amberGlow : S.check, ...sf(16, 400, 100) }}>✓</span>
  );
  if (v === 'n') return (
    <span style={{ color: S.faint, ...sf(14, 400, 100) }}>✗</span>
  );
  if (v === '-') return (
    <span style={{ color: S.soft, ...sf(11, 400, 100), letterSpacing: '.04em' }}>partial</span>
  );
  return <span style={{ color: S.soft }}>{v}</span>;
};

// ─── Loader — animated dot trio ──────────────────────────────
const DotLoader = ({ color = S.amberGlow, size = 5 }) => (
  <div style={{ display: 'inline-flex', gap: size * 1.4, alignItems: 'center' }}>
    {[0, 0.2, 0.4].map((d, i) => (
      <span key={i} style={{
        width: size, height: size, borderRadius: '50%', background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animation: 'pulse 1.4s ease-in-out infinite',
        animationDelay: `${d}s`,
      }} />
    ))}
  </div>
);

// ─── Spinner ring (subtle) ───────────────────────────────────
const Spinner = ({ size = 16, color = S.amberGlow }) => (
  <span style={{
    display: 'inline-block', width: size, height: size,
    borderRadius: '50%', border: `1.5px solid ${color}33`,
    borderTopColor: color,
    animation: 'spin 1s linear infinite',
  }} />
);

// ─── Tooltip-ish small label (no positioning logic — just style) ──
const SmallTag = ({ children, color = S.soft, style = {} }) => (
  <span style={{
    ...Stype.body, fontSize: 11.5, padding: '2px 8px',
    borderRadius: 4, background: 'rgba(255,255,255,0.03)', color,
    border: `1px solid ${S.hairline}`,
    ...style,
  }}>{children}</span>
);

// ─── App ambient background — subtle warm-graphite gradient ──
const AppAtmosphere = ({ intensity = 1 }) => (
  <React.Fragment>
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
      background: `radial-gradient(ellipse 70% 50% at 18% 8%, rgba(217,150,62,${0.10 * intensity}) 0%, transparent 60%),
                   radial-gradient(ellipse 60% 45% at 88% 96%, rgba(79,115,174,${0.08 * intensity}) 0%, transparent 60%)`,
    }} />
  </React.Fragment>
);

Object.assign(window, {
  Button, Card, PriorityTag, StatusPill, AppIcon, AppShot,
  SectionHeader, KeyValue, AppMatrixCell, DotLoader, Spinner, SmallTag, AppAtmosphere,
});
