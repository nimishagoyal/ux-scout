// ─────────────────────────────────────────────────────────────
// UX SCOUT — Hero Sequence scenes 1-3.
// No italics. No Mobbin references.
// ─────────────────────────────────────────────────────────────

const SCENES = [
  { id: 'galaxy',          label: 'the galaxy',       start: 0.00, end: 0.12 },
  { id: 'reading',         label: 'reading',          start: 0.10, end: 0.22 },
  { id: 'patterns',        label: 'patterns',         start: 0.20, end: 0.34 },
  { id: 'matrix',          label: 'matrix',           start: 0.32, end: 0.46 },
  { id: 'insights',        label: 'insights',         start: 0.44, end: 0.56 },
  { id: 'recommendations', label: 'recommendations',  start: 0.54, end: 0.74 },
  { id: 'interview',       label: 'interview',        start: 0.72, end: 0.86 },
  { id: 'prototype',       label: 'prototype',        start: 0.84, end: 1.00 },
];

const useScene = (p, start, end, { fadeOut = true } = {}) => {
  const raw = subRaw(p, start, end);
  const fadeIn = clamp01(raw / 0.18);
  const fadeOutVal = fadeOut ? 1 - clamp01((raw - 0.82) / 0.18) : 1;
  return { p: raw, opacity: Math.min(fadeIn, fadeOutVal), eased: easeInOut(raw) };
};

const QUESTION = "Improve onboarding for our rideshare app.";
const QUESTION_WORDS = QUESTION.split(' ');

// Ambient prompts — orbit the periphery only (never the hero band).
// `depth`: 1 foreground / 2 mid / 3 background. Cluster groups hint at semantic gravity.
const AMBIENT_PROMPTS = [
  // — TOP-LEFT REGION —
  { t: 'Analyze checkout flows for ecommerce.',                    x:  9, y: 16, depth: 1, orbit: 'orbitA', dur: 24, delay: 0,    cluster: 'commerce' },
  { t: 'Rethink paywall psychology in subscription health apps.',  x: 22, y:  9, depth: 2, orbit: 'orbitE', dur: 28, delay: 4,    cluster: 'commerce' },
  // — TOP-RIGHT REGION —
  { t: 'Improve fintech stock chart UX.',                          x: 88, y: 13, depth: 1, orbit: 'orbitB', dur: 26, delay: 2,    cluster: 'fintech' },
  { t: 'Benchmark KYC flows across crypto apps.',                  x: 75, y: 23, depth: 3, orbit: 'orbitF', dur: 32, delay: 6,    cluster: 'fintech' },
  // — LEFT FLANK —
  { t: 'Redesign empty-state activation for AI productivity.',     x:  3, y: 56, depth: 2, orbit: 'orbitC', dur: 25, delay: 3,    cluster: 'ai' },
  // — RIGHT FLANK —
  { t: 'Compare onboarding rhythm across travel super-apps.',      x: 97, y: 46, depth: 1, orbit: 'orbitD', dur: 27, delay: 5,    cluster: 'mobility' },
  // — UPPER-EDGE COUNTERBALANCE —
  { t: 'Restructure search & discovery for marketplaces.',         x: 50, y:  7, depth: 3, orbit: 'orbitE', dur: 30, delay: 8,    cluster: 'commerce' },
];

// Semantic gravity threads — faint connection lines hinting at clustering
const SEMANTIC_THREADS = [
  { a: 0, b: 1, op: 0.18 }, // commerce ↔ commerce
  { a: 0, b: 6, op: 0.12 }, // commerce ↔ commerce
  { a: 2, b: 3, op: 0.18 }, // fintech ↔ fintech
];

// Category chips for the entry
const CHIP_GROUPS = [
  {
    label: 'industry',
    chips: ['fintech', 'rideshare', 'ecommerce', 'AI productivity', 'health', 'social', 'travel'],
    active: 'rideshare',
  },
  {
    label: 'touchpoint',
    chips: ['onboarding', 'checkout', 'paywall', 'navigation', 'KYC', 'empty states', 'charts', 'notifications'],
    active: 'onboarding',
  },
  {
    label: 'goal',
    chips: ['improve activation', 'reduce friction', 'increase trust', 'improve retention', 'benchmark competitors', 'improve conversion', 'simplify complexity', 'create delight'],
    active: 'improve activation',
  },
];

// ─── SCENE 1 · THE GALAXY ──────────────────────────────────────
const SceneGalaxy = ({ p }) => {
  const s = useScene(p, SCENES[0].start, SCENES[0].end);
  if (s.opacity < 0.01) return null;

  // Hero types in early; chips appear late; prompts in between.
  const eyebrowOp = clamp01(s.p * 6);
  const typeReveal = clamp01((s.p - 0.04) * 3) * QUESTION_WORDS.length;
  const caretOp = clamp01(1 - (s.p - 0.40) * 5);
  const promptsOp = clamp01((s.p - 0.30) * 2.2);
  const chipsOp = clamp01((s.p - 0.52) * 3);
  const scrollHintOp = clamp01((s.p - 0.78) * 4) * (1 - clamp01((s.p - 0.94) * 8));

  // Depth → visual properties
  const depthStyle = (d) => {
    if (d === 1) return { fontSize: 16, opacity: 0.55, blur: 0 };
    if (d === 2) return { fontSize: 14, opacity: 0.38, blur: 0.4 };
    return { fontSize: 12, opacity: 0.24, blur: 1.0 };
  };

  return (
    <Scene opacity={s.opacity}>
      {/* Soft ambient field halo behind the hero — implies a gravitational center */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: '40%',
        transform: 'translate(-50%,-50%)',
        width: 920, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 45%, rgba(217,150,62,0.10) 0%, transparent 60%)',
        filter: 'blur(40px)',
        animation: 'fieldBreath 14s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Constellation dots — sparse, ambient */}
      {[
        { x: '4%',  y: '34%', size: 2.5, delay: 0.0 },
        { x: '14%', y: '70%', size: 2,   delay: 2.0, opacity: 0.4 },
        { x: '32%', y: '12%', size: 2,   delay: 1.4, opacity: 0.45 },
        { x: '46%', y: '88%', size: 2.5, delay: 0.8, color: '#88A6D8', opacity: 0.4 },
        { x: '68%', y: '11%', size: 2,   delay: 1.6, opacity: 0.4 },
        { x: '84%', y: '74%', size: 2.5, delay: 2.4, color: '#F4E0B4', opacity: 0.5 },
        { x: '96%', y: '34%', size: 2,   delay: 0.4, opacity: 0.35 },
        { x: '54%', y: '4%',  size: 2,   delay: 2.8, opacity: 0.3 },
      ].map((d, i) => <StarDot key={i} {...d} />)}

      {/* Semantic gravity threads — faint lines between clustered prompts */}
      <svg style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', opacity: promptsOp * 0.8,
      }}>
        {SEMANTIC_THREADS.map((t, i) => {
          const a = AMBIENT_PROMPTS[t.a], b = AMBIENT_PROMPTS[t.b];
          return (
            <line key={i}
              x1={`${a.x}%`} y1={`${a.y}%`}
              x2={`${b.x}%`} y2={`${b.y}%`}
              stroke={S.threadFaint} strokeOpacity={t.op}
              strokeWidth="0.6" strokeDasharray="2 6"
            />
          );
        })}
      </svg>

      {/* Floating prompts — orbit the periphery only, never cross the hero band */}
      {AMBIENT_PROMPTS.map((pr, i) => {
        const ds = depthStyle(pr.depth);
        const enter = easeOut(clamp01((s.p - 0.30 - i * 0.02) * 2.4));
        const exit = 1 - clamp01((s.p - 0.85) * 4);
        return (
          <div key={i} style={{
            position: 'absolute', left: `${pr.x}%`, top: `${pr.y}%`,
            transform: 'translate(-50%, -50%)',
            opacity: enter * exit * ds.opacity * promptsOp,
            maxWidth: 240, textAlign: 'center',
            pointerEvents: 'none',
            filter: ds.blur ? `blur(${ds.blur}px)` : 'none',
            animation: `${pr.orbit} ${pr.dur}s ease-in-out infinite`,
            animationDelay: `${pr.delay}s`,
            transition: 'opacity 800ms ease',
            zIndex: 4 - pr.depth,
          }}>
            <div style={{
              ...Stype.reading, fontSize: ds.fontSize, color: S.ink, lineHeight: 1.35,
            }}>"{pr.t}"</div>
          </div>
        );
      })}

      {/* Eyebrow — well above the hero, perfectly centered */}
      <div style={{
        position: 'absolute', left: '50%', top: '20%',
        transform: 'translate(-50%, -50%)', textAlign: 'center',
        opacity: eyebrowOp, transition: 'opacity 600ms',
      }}>
        <Eyebrow style={{ color: S.amberGlow, fontSize: 11 }}>
          tonight's research · friday 17 may · 09:42
        </Eyebrow>
      </div>

      {/* Hero — centered, with generous space above and below */}
      <div style={{
        position: 'absolute', left: '50%', top: '40%',
        transform: 'translate(-50%, -50%)', textAlign: 'center',
        width: 'min(1100px, 86%)',
        zIndex: 6,
      }}>
        <h1 style={{ ...Stype.display, fontSize: 88, color: S.bone, margin: 0, lineHeight: 1.02 }}>
          {QUESTION_WORDS.map((w, i) => {
            const op = clamp01(typeReveal - i);
            const isApp = w === 'rideshare';
            return (
              <span key={i} style={{
                opacity: op,
                color: isApp ? S.amberGlow : 'inherit',
                ...sf(92, isApp ? 500 : 400, 90),
                marginRight: i < QUESTION_WORDS.length - 1 ? '0.30em' : 0,
                display: 'inline-block',
                transition: 'opacity 320ms ease',
              }}>{w}</span>
            );
          })}
          <span style={{
            display: 'inline-block', width: 5, height: 66,
            background: S.amberGlow, verticalAlign: '-.45em', marginLeft: 8,
            opacity: caretOp, animation: 'caret 1s steps(2, end) infinite',
            boxShadow: `0 0 18px ${S.amberGlow}`,
          }} />
        </h1>
      </div>

      {/* Connector line between hero and chip system — implies semantic flow */}
      <div style={{
        position: 'absolute', left: '50%', top: '57%',
        transform: 'translateX(-50%)',
        opacity: chipsOp * 0.6, transition: 'opacity 700ms',
        textAlign: 'center',
      }}>
        <div style={{ width: 1, height: 24, background: S.amberGlow, opacity: 0.4, margin: '0 auto' }} />
        <div style={{ ...Stype.micro, fontSize: 9.5, color: S.soft, marginTop: 10 }}>
          or explore the universe — choose your coordinates
        </div>
      </div>

      {/* Category chip system — centered, three coherent rows */}
      <div style={{
        position: 'absolute', left: '50%', top: '74%',
        transform: 'translate(-50%, -50%)',
        width: 'min(1200px, 92%)',
        display: 'flex', flexDirection: 'column', gap: 20,
        opacity: chipsOp, transition: 'opacity 700ms ease',
      }}>
        {CHIP_GROUPS.map((group, gi) => {
          const rowEnter = easeOut(clamp01((chipsOp * 3) - gi * 0.45));
          return (
            <div key={group.label} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              opacity: rowEnter,
              transform: `translateY(${(1 - rowEnter) * 10}px)`,
              transition: 'opacity 500ms, transform 500ms',
            }}>
              <div style={{
                ...Stype.micro, fontSize: 9, color: S.faint, letterSpacing: '.26em',
              }}>
                {group.label}
              </div>
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center',
                maxWidth: '100%',
              }}>
                {group.chips.map((c) => (
                  <Chip key={c} active={c === group.active}
                    color={c === group.active ? 'amber' : 'soft'} size="s">{c}</Chip>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', left: '50%', bottom: '7%',
        transform: 'translateX(-50%)', textAlign: 'center',
        opacity: scrollHintOp, transition: 'opacity 500ms',
      }}>
        <div style={{ ...Stype.micro, color: S.soft, fontSize: 9 }}>scroll to begin</div>
        <div style={{ width: 1, height: 22, background: S.amberGlow, opacity: .7, margin: '8px auto 0' }} />
      </div>
    </Scene>
  );
};

// ─── SCENE 2 · READING (formerly "sources from Mobbin") ────────
const APPS = [
  { name: 'Lyft',    flows: 7, color: 'amber',  shots: ['form', 'list', 'cards', 'detail'] },
  { name: 'Uber',    flows: 6, color: 'amber',  shots: ['detail', 'form', 'cards'] },
  { name: 'Bolt',    flows: 8, color: 'cobalt', shots: ['form', 'list', 'detail', 'cards'] },
  { name: 'Didi',    flows: 9, color: 'amber',  shots: ['cards', 'form', 'detail'] },
  { name: 'Grab',    flows: 7, color: 'soft',   shots: ['list', 'cards', 'form'] },
];

const SceneReading = ({ p }) => {
  const s = useScene(p, SCENES[1].start, SCENES[1].end);
  if (s.opacity < 0.01) return null;

  const total = APPS.reduce((a, x) => a + x.flows, 0);
  const readCount = Math.round(easeOut(s.p) * total);

  return (
    <Scene opacity={s.opacity}>
      <div style={{ position: 'absolute', left: 64, top: 96, right: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <Eyebrow>I · reading the competitive landscape</Eyebrow>
            <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: '14px 0 0' }}>
              What we read.
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ ...Stype.tabular, fontSize: 13, color: S.soft }}>
              <span style={{ color: S.amberGlow }}>{readCount}</span> <span style={{ color: S.faint }}>/</span> {total} screens read
            </div>
            <div style={{ ...Stype.micro, fontSize: 9, color: S.faint, marginTop: 4 }}>
              5 leading apps · 12 onboarding flows
            </div>
          </div>
        </div>
        <div style={{
          ...Stype.reading, fontSize: 17, color: S.ink, marginTop: 14, maxWidth: 640,
          opacity: clamp01(s.p * 1.5),
        }}>
          The top mobility apps in the market, every onboarding flow, every screen. Grouped by app so we can compare like-for-like.
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 64, right: 64, top: 296, bottom: 110,
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 32,
      }}>
        {APPS.map((app, ai) => {
          const colEnter = easeOut(clamp01((s.p - ai * 0.08) * 2.2));
          const accentColor = app.color === 'amber' ? S.amberGlow : app.color === 'cobalt' ? S.cobaltGlow : S.soft;
          return (
            <div key={app.name} style={{
              opacity: colEnter,
              transform: `translateY(${(1 - colEnter) * 30}px)`,
              transition: 'opacity 500ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ borderBottom: `1px solid ${S.rule}`, paddingBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ ...Stype.headlineMed, fontSize: 22, color: S.bone }}>{app.name}</div>
                  <div style={{ ...Stype.micro, fontSize: 9, color: accentColor }}>{app.flows} screens</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {app.shots.map((k, i) => {
                  const sh = easeOut(clamp01((s.p - ai * 0.08 - i * 0.04) * 2.5));
                  return (
                    <div key={i} style={{
                      height: 78, background: S.raisedWarm, padding: 5,
                      opacity: sh,
                      transform: `translateY(${(1 - sh) * 12}px)`,
                      transition: 'opacity 400ms, transform 500ms',
                      boxShadow: `0 0 0 1px rgba(232,227,210,0.06), 0 10px 24px -12px rgba(0,0,0,0.6)`,
                    }}>
                      <Screenshot kind={k} accent={accentColor} />
                    </div>
                  );
                })}
              </div>
              <div style={{ ...Stype.micro, fontSize: 9, color: S.faint, marginTop: 4 }}>
                onboarding · 2024–26
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: 64, bottom: 96,
        opacity: clamp01((s.p - 0.75) * 4),
      }}>
        <div style={{
          ...Stype.readingMed, fontSize: 16, color: S.amberGlow, lineHeight: 1.4, maxWidth: 380,
          animation: 'breath 6s ease-in-out infinite',
        }}>
          "Three apps share the same opening gesture. Worth pulling on."
        </div>
        <div style={{ ...Stype.micro, fontSize: 9, color: S.amber, marginTop: 6 }}>UX Scout · pass 1 of 3</div>
      </div>
    </Scene>
  );
};

// ─── SCENE 3 · UX PATTERN ANALYSIS ────────────────────────────
const PATTERNS = [
  {
    id: 'map-first', name: 'Map-first onboarding',
    note: 'The map is up before the signup gate. Pin the destination, then sign in.',
    freq: '9 / 12', strong: true, accent: 'amber',
    shots: ['form', 'detail', 'cards'],
  },
  {
    id: 'delayed-account', name: 'Delayed account creation',
    note: 'Signup is requested after the first action, not before. Value first, friction later.',
    freq: '7 / 12', strong: true, accent: 'amber',
    shots: ['form', 'list'],
  },
  {
    id: 'phone-auth', name: 'Phone-only auth',
    note: 'No password, no email. SMS code only. Removes a credential decision.',
    freq: '11 / 12', accent: 'cobalt',
    shots: ['form', 'cards'],
  },
  {
    id: 'eta-preview', name: 'Driver ETA before signup',
    note: 'Show a nearby car and an estimate before the account form.',
    freq: '6 / 12', accent: 'cobalt',
    shots: ['detail', 'list'],
  },
  {
    id: 'trust', name: 'Trust gestures at pickup',
    note: 'License plate, photo, name. Confirmed inside the car, not on the home screen.',
    freq: '3 / 12', tentative: true, accent: 'soft',
    shots: ['detail'],
  },
];

const ScenePatterns = ({ p }) => {
  const s = useScene(p, SCENES[2].start, SCENES[2].end);
  if (s.opacity < 0.01) return null;

  return (
    <Scene opacity={s.opacity}>
      <div style={{ position: 'absolute', left: 64, top: 96, right: 64 }}>
        <Eyebrow>II · UX pattern analysis</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            Five patterns lifting.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
            ranked by frequency · UX Scout pass 2 of 3
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 64, right: 64, top: 240, bottom: 100,
        display: 'grid', gridTemplateRows: '1.15fr 1fr', gap: 26,
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 26 }}>
          {PATTERNS.slice(0, 2).map((pt, i) => {
            const enter = easeOut(clamp01((s.p - i * 0.06) * 2.2));
            const lit = pt.strong;
            const aColor = pt.accent === 'amber' ? S.amberGlow : pt.accent === 'cobalt' ? S.cobaltGlow : S.soft;
            return (
              <div key={pt.id} style={{
                opacity: enter,
                transform: `translateY(${(1 - enter) * 24}px)`,
                transition: 'opacity 500ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
                background: lit
                  ? `linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.88) 100%)`
                  : `linear-gradient(135deg, rgba(30,34,40,0.55) 0%, rgba(22,25,30,0.62) 100%)`,
                boxShadow: lit
                  ? `0 0 0 1px rgba(244,204,125,0.35), 0 26px 60px -20px rgba(0,0,0,0.7), 0 0 90px -20px rgba(217,150,62,0.35)`
                  : `0 0 0 1px rgba(232,227,210,0.10), 0 18px 36px -16px rgba(0,0,0,0.5)`,
                padding: 28,
                display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: 'auto 1fr auto',
                gap: 16,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <div style={{ ...Stype.micro, fontSize: 10, color: aColor }}>
                    {i === 0 ? 'strongest · lifting' : 'strong'}
                  </div>
                  <div style={{ ...Stype.tabular, fontSize: 14, color: aColor }}>{pt.freq}</div>
                </div>
                <div>
                  <h3 style={{ ...Stype.title, fontSize: i === 0 ? 38 : 30, color: S.bone, margin: 0, lineHeight: 1.05 }}>
                    {pt.name}
                  </h3>
                  <p style={{ ...Stype.reading, fontSize: i === 0 ? 16 : 14.5, color: S.ink, marginTop: 14, maxWidth: 480 }}>
                    {pt.note}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  {pt.shots.map((k, j) => (
                    <div key={j} style={{
                      flex: 1, height: 88, padding: 5, background: S.raisedWarm,
                      boxShadow: `0 0 0 1px rgba(232,227,210,0.06)`,
                    }}>
                      <Screenshot kind={k} accent={aColor} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26 }}>
          {PATTERNS.slice(2).map((pt, i) => {
            const enter = easeOut(clamp01((s.p - 0.15 - i * 0.06) * 2.2));
            const tent = pt.tentative;
            const aColor = pt.accent === 'amber' ? S.amberGlow : pt.accent === 'cobalt' ? S.cobaltGlow : S.soft;
            return (
              <div key={pt.id} style={{
                opacity: enter * (tent ? 0.7 : 1),
                transform: `translateY(${(1 - enter) * 20}px)`,
                transition: 'opacity 500ms, transform 600ms',
                background: `linear-gradient(135deg, rgba(25,28,32,0.6) 0%, rgba(20,23,28,0.65) 100%)`,
                boxShadow: `0 0 0 1px rgba(232,227,210,0.07), 0 14px 30px -14px rgba(0,0,0,0.5)`,
                padding: 22,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <div style={{ ...Stype.micro, fontSize: 9, color: aColor }}>
                    {tent ? 'tentative' : 'medium'}
                  </div>
                  <div style={{ ...Stype.tabular, fontSize: 13, color: aColor }}>{pt.freq}</div>
                </div>
                <h3 style={{ ...Stype.headlineMed, fontSize: 21, color: S.bone, margin: 0, lineHeight: 1.15 }}>
                  {pt.name}
                </h3>
                <p style={{ ...Stype.reading, fontSize: 13, color: S.soft, marginTop: 10, lineHeight: 1.55 }}>
                  {pt.note}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </Scene>
  );
};

window.SceneGalaxy = SceneGalaxy;
window.SceneReading = SceneReading;
window.ScenePatterns = ScenePatterns;
window.SCENES = SCENES;
window.useScene = useScene;
window.QUESTION = QUESTION;
window.QUESTION_WORDS = QUESTION_WORDS;
window.APPS = APPS;
window.PATTERNS = PATTERNS;
window.CHIP_GROUPS = CHIP_GROUPS;
window.AMBIENT_PROMPTS = AMBIENT_PROMPTS;
