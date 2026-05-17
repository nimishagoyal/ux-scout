// ─────────────────────────────────────────────────────────────
// LUMEN — Design tokens. Ported from design/lumen-tokens.jsx.
// ─────────────────────────────────────────────────────────────

export const L = {
  deep:         '#0D0F12',
  graphite:     '#14171C',
  warmGraphite: '#191915',
  raised:       '#1F2228',
  raisedWarm:   '#231F18',
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
} as const;

export const Ltype = {
  marquee:  { fontFamily: 'Instrument Serif, serif', fontWeight: 400, letterSpacing: '-.02em', lineHeight: .95 },
  italic:   { fontFamily: 'Instrument Serif, serif', fontStyle: 'italic' as const, letterSpacing: '-.005em' },
  reading:  { fontFamily: 'Newsreader, serif', fontWeight: 300, lineHeight: 1.6 },
  readingI: { fontFamily: 'Newsreader, serif', fontStyle: 'italic' as const, lineHeight: 1.45 },
  ui:       { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 400 },
  uiThin:   { fontFamily: 'Geist, system-ui, sans-serif', fontWeight: 300 },
  micro:    { fontFamily: 'Geist, system-ui, sans-serif', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' as const, color: '#8A8472', fontWeight: 400 },
} as const;

// ─────────────────────────────────────────────────────────────
// SEQUENCE — Production app tokens (Bricolage Grotesque + Newsreader).
// Ported from design/sequence-helpers.jsx.
// ─────────────────────────────────────────────────────────────

export const S = {
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
} as const;

// Bricolage Grotesque variation axes helper.
export const sf = (opsz = 14, wght = 400, wdth = 100) => ({
  fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
  fontVariationSettings: `'opsz' ${opsz}, 'wdth' ${wdth}, 'wght' ${wght}`,
  fontWeight: wght,
  fontStyle: 'normal' as const,
});

export const Stype = {
  display:     { ...sf(96, 400, 92), letterSpacing: '-.025em', lineHeight: 1.0 },
  displayLg:   { ...sf(96, 500, 88), letterSpacing: '-.03em',  lineHeight: 0.98 },
  title:       { ...sf(48, 400, 95), letterSpacing: '-.02em',  lineHeight: 1.05 },
  titleMed:    { ...sf(48, 500, 92), letterSpacing: '-.02em',  lineHeight: 1.05 },
  headline:    { ...sf(28, 400, 96), letterSpacing: '-.015em', lineHeight: 1.12 },
  headlineMed: { ...sf(28, 500, 94), letterSpacing: '-.015em', lineHeight: 1.12 },
  reading:     { fontFamily: 'Newsreader, serif', fontWeight: 300, fontStyle: 'normal' as const, lineHeight: 1.6 },
  readingMed:  { fontFamily: 'Newsreader, serif', fontWeight: 400, fontStyle: 'normal' as const, lineHeight: 1.55 },
  body:        { ...sf(14, 400, 100), lineHeight: 1.55 },
  bodyMed:     { ...sf(14, 500, 100), lineHeight: 1.55 },
  eyebrow:     { ...sf(11, 500, 100), letterSpacing: '.20em', textTransform: 'uppercase' as const },
  micro:       { ...sf(10, 400, 100), letterSpacing: '.24em', textTransform: 'uppercase' as const },
  tabular:     { ...sf(14, 400, 100), fontVariantNumeric: 'tabular-nums' as const },
} as const;
