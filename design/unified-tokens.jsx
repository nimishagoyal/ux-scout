// ─────────────────────────────────────────────────────────────
// UNIFIED DIRECTION — MARGIN / ATELIER
// A merger of D1 (editorial cleanliness, hierarchy) +
// D3 (warmth, subtle color, emotional softness).
// Goal: feels like a research studio, not a tool.
// ─────────────────────────────────────────────────────────────

const U = {
  // Surfaces — warm paper, no pure whites or blacks
  paper:   '#F4EFE4',
  card:    '#FBF7EB',
  raised:  '#EBE4D2',   // for nested / curated surfaces
  ink:     '#1B1816',
  soft:    '#5F594E',
  faint:   '#9A9382',
  rule:    '#DDD4BF',
  hairline:'#EAE3CF',
  // Accents — curated, low-chroma, one-per-surface rule
  terracotta: '#B85B3A',   // warmth, AI voice, marginalia
  inkblue:    '#2D3F66',   // citations, intellect
  olive:      '#6B7656',   // validated / strong
  plum:       '#5E3848',   // rare callout / care
};

// Stylesheet block: shared text styles for the Unified direction.
// Defined as helpers, not classes, so each component composes them inline.
const Utype = {
  marquee:  { fontFamily: 'Instrument Serif, serif', fontWeight: 400, letterSpacing: '-.02em', lineHeight: .92 },
  italic:   { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', letterSpacing: '-.01em' },
  reading:  { fontFamily: 'Newsreader, serif', fontWeight: 400, lineHeight: 1.6 },
  readingI: { fontFamily: 'Newsreader, serif', fontStyle: 'italic', lineHeight: 1.45 },
  ui:       { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 400 },
  uiMed:    { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 500 },
  micro:    { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: U.soft, fontWeight: 500 },
};

const Uwrap = (children, opts = {}) => (
  <div style={{
    width: '100%', height: '100%', background: opts.bg || U.paper, color: U.ink,
    fontFamily: 'Geist, system-ui, sans-serif', padding: opts.pad ?? 56,
    boxSizing: 'border-box', overflow: 'hidden', position: 'relative',
    ...(opts.style || {}),
  }}>{children}</div>
);

const Umicro = (txt, color) => <div style={{ ...Utype.micro, color: color || U.soft }}>{txt}</div>;

// A tiny italic small-cap roman numeral, used as section / citation mark.
const Roman = ({ n, color = U.terracotta, size = 14 }) => (
  <span style={{ ...Utype.italic, fontSize: size, color, letterSpacing: '.04em' }}>{n}</span>
);

// Curated reference screenshot — softer than the shared one. Variable framings.
const URef = ({ kind = 'list', label, source, accent = U.terracotta, h = 160, frame = true }) => {
  const palette = { bg: U.card, ink: U.ink, mute: U.raised, accent };
  return (
    <figure style={{ margin: 0, position: 'relative' }}>
      <div style={{ height: h, background: U.card, border: frame ? `1px solid ${U.rule}` : 0, overflow: 'hidden' }}>
        <div style={{ padding: 10, height: '100%', boxSizing: 'border-box' }}>
          <RefScreenshot palette={palette} kind={kind} />
        </div>
      </div>
      {(label || source) && (
        <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, gap: 12 }}>
          <div style={{ ...Utype.readingI, fontSize: 13, color: U.ink }}>{label}</div>
          <div style={{ ...Utype.micro, fontSize: 9.5 }}>{source}</div>
        </figcaption>
      )}
    </figure>
  );
};

window.U = U;
window.Utype = Utype;
window.Uwrap = Uwrap;
window.Umicro = Umicro;
window.Roman = Roman;
window.URef = URef;
