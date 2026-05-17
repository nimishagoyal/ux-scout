// UX SCOUT — Scenes 4-8: Matrix, Insights, Recommendations, Interview, Prototype

// ─── SCENE 4 · COMPETITOR FEATURE MATRIX ──────────────────────
const MATRIX = {
  competitors: ['Lyft', 'Uber', 'Bolt', 'Didi', 'Grab'],
  features: [
    { key: 'mapFirst',    label: 'Map first' },
    { key: 'phoneOnly',   label: 'Phone-only auth' },
    { key: 'deferSignup', label: 'Defer signup' },
    { key: 'payAfter',    label: 'Pay after first' },
    { key: 'idVerify',    label: 'ID verify at signup' },
    { key: 'tutorial',    label: 'Tutorial' },
    { key: 'promo',       label: 'Promo / referral' },
  ],
  values: {
    Lyft: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'y', payAfter: 'y', idVerify: 'n', tutorial: 'n', promo: 'y' },
    Uber: { mapFirst: 'y', phoneOnly: 'y', deferSignup: '-', payAfter: 'n', idVerify: 'n', tutorial: 'y', promo: 'y' },
    Bolt: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'y', payAfter: 'y', idVerify: 'n', tutorial: 'n', promo: 'y' },
    Didi: { mapFirst: '-', phoneOnly: 'y', deferSignup: 'n', payAfter: 'n', idVerify: 'y', tutorial: 'y', promo: 'y' },
    Grab: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'n', payAfter: 'y', idVerify: 'n', tutorial: 'y', promo: 'y' },
  },
};

const MatrixCell = ({ v, lit }) => {
  if (v === 'y') return (
    <span style={{ color: lit ? S.amberGlow : S.check, ...sf(16, 400, 100) }}>✓</span>
  );
  if (v === 'n') return (
    <span style={{ color: S.faint, ...sf(14, 400, 100) }}>✗</span>
  );
  if (v === '-') return (
    <span style={{ color: S.soft, ...sf(12, 400, 100), letterSpacing: '.04em' }}>partial</span>
  );
  return <span style={{ color: S.soft }}>{v}</span>;
};

const SceneMatrix = ({ p }) => {
  const s = useScene(p, SCENES[3].start, SCENES[3].end);
  if (s.opacity < 0.01) return null;

  return (
    <Scene opacity={s.opacity}>
      <div style={{ position: 'absolute', left: 64, top: 96, right: 64 }}>
        <Eyebrow>III · benchmark · feature matrix</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            How they differ.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft, maxWidth: 360, textAlign: 'right' }}>
            Five competitors · seven onboarding decisions
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: 256, transform: 'translateX(-50%)',
        width: 'min(1240px, calc(100% - 128px))',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '13%' }} />
            {MATRIX.features.map((f, i) => <col key={i} style={{ width: `${87 / MATRIX.features.length}%` }} />)}
          </colgroup>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left', padding: '14px 18px 14px 0',
                borderBottom: `1px solid ${S.threadStrong}`,
                ...Stype.eyebrow, color: S.amberGlow, fontSize: 10,
              }}>
                competitor
              </th>
              {MATRIX.features.map((f, i) => {
                const colReveal = easeOut(clamp01((s.p - 0.05 - i * 0.04) * 2.5));
                return (
                  <th key={f.key} style={{
                    textAlign: 'center', padding: '14px 8px',
                    borderBottom: `1px solid ${S.threadStrong}`,
                    opacity: colReveal,
                    transition: 'opacity 400ms',
                  }}>
                    <div style={{ ...Stype.eyebrow, fontSize: 10, color: S.bone }}>{f.label}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {MATRIX.competitors.map((comp, ri) => {
              const rowReveal = easeOut(clamp01((s.p - 0.18 - ri * 0.05) * 2.5));
              return (
                <tr key={comp} style={{ opacity: rowReveal, transition: 'opacity 400ms' }}>
                  <td style={{
                    padding: '18px 18px 18px 0', borderBottom: `1px solid ${S.hairline}`,
                    ...Stype.headlineMed, fontSize: 22, color: S.bone,
                  }}>
                    {comp}
                  </td>
                  {MATRIX.features.map((f) => {
                    const v = MATRIX.values[comp][f.key];
                    const lit = f.key === 'deferSignup' && v === 'y';
                    return (
                      <td key={f.key} style={{
                        padding: '18px 8px', textAlign: 'center',
                        borderBottom: `1px solid ${S.hairline}`,
                        background: lit ? 'rgba(217,150,62,0.06)' : 'transparent',
                      }}>
                        <MatrixCell v={v} lit={lit} />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{
          marginTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          opacity: clamp01((s.p - 0.55) * 3),
        }}>
          <div style={{ maxWidth: 480 }}>
            <Eyebrow style={{ color: S.amberGlow, fontSize: 10 }}>where they converge</Eyebrow>
            <div style={{ ...Stype.reading, fontSize: 16, color: S.ink, marginTop: 8, lineHeight: 1.55 }}>
              <span style={{ color: S.amberGlow }}>Map-first</span> and <span style={{ color: S.amberGlow }}>phone-only auth</span> are industry default. Five of five.
            </div>
          </div>
          <div style={{ maxWidth: 480, textAlign: 'right' }}>
            <Eyebrow style={{ color: S.cobaltGlow, fontSize: 10 }}>where they split</Eyebrow>
            <div style={{ ...Stype.reading, fontSize: 16, color: S.ink, marginTop: 8, lineHeight: 1.55 }}>
              Deferred signup is the live debate. <span style={{ color: S.cobaltGlow }}>Three apps</span> commit; two hold on.
            </div>
          </div>
        </div>
      </div>
    </Scene>
  );
};

// ─── SCENE 5 · COMPARATIVE INSIGHTS ───────────────────────────
const INSIGHTS = [
  { stat: '78%',    body: 'of top mobility apps defer signup until after the first interaction.', accent: 'amber' },
  { stat: '5.4',    suffix: 'screens', body: 'average onboarding length in 2026, down from 8.2 in 2024.', accent: 'cobalt' },
  { stat: '9 / 12', body: 'use a map-first opening gesture — the new industry default.', accent: 'amber' },
];

const SceneInsights = ({ p }) => {
  const s = useScene(p, SCENES[4].start, SCENES[4].end);
  if (s.opacity < 0.01) return null;

  return (
    <Scene opacity={s.opacity}>
      <div style={{ position: 'absolute', left: 64, top: 96, right: 64 }}>
        <Eyebrow>IV · comparative insights</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            What the market says.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft, maxWidth: 420, textAlign: 'right' }}>
            Drawn from 142 onboarding flows · weighted by user base
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: '52%',
        transform: 'translate(-50%, -50%)',
        width: '88%', maxWidth: 1280,
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36,
      }}>
        {INSIGHTS.map((ins, i) => {
          const enter = easeOut(clamp01((s.p - i * 0.10) * 2.2));
          const aColor = ins.accent === 'amber' ? S.amberGlow : S.cobaltGlow;
          return (
            <div key={i} style={{
              opacity: enter,
              transform: `translateY(${(1 - enter) * 24}px)`,
              transition: 'opacity 500ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
              padding: '40px 32px',
              background: `linear-gradient(135deg, rgba(35,31,24,0.55) 0%, rgba(25,28,32,0.6) 100%)`,
              boxShadow: `0 0 0 1px rgba(232,227,210,0.08), 0 24px 50px -20px rgba(0,0,0,0.6)`,
              borderTop: `2px solid ${aColor}`,
            }}>
              <Eyebrow style={{ color: aColor, fontSize: 9 }}>insight · 0{i+1}</Eyebrow>
              <div style={{ marginTop: 24, display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontVariationSettings: "'opsz' 96, 'wdth' 88, 'wght' 400",
                  fontSize: 110, color: S.bone, letterSpacing: '-.04em', lineHeight: .9,
                }}>{ins.stat}</span>
                {ins.suffix && (
                  <span style={{ ...Stype.body, fontSize: 16, color: aColor, marginBottom: 14 }}>{ins.suffix}</span>
                )}
              </div>
              <p style={{
                ...Stype.reading, fontSize: 17, color: S.ink, marginTop: 24,
                lineHeight: 1.5, maxWidth: 320,
              }}>{ins.body}</p>
            </div>
          );
        })}
      </div>

      <div style={{
        position: 'absolute', left: '50%', bottom: 110,
        transform: 'translateX(-50%)', textAlign: 'center',
        opacity: clamp01((s.p - 0.5) * 3),
      }}>
        <div style={{
          ...Stype.readingMed, fontSize: 18, color: S.amberGlow,
          maxWidth: 740, lineHeight: 1.45,
        }}>
          "The market has decided. The question is what to do with the eleven seconds you've earned."
        </div>
      </div>
    </Scene>
  );
};

// ─── SCENE 6 · PRODUCT-SPECIFIC RECOMMENDATIONS ───────────────
const RECS = {
  primary: {
    priority: 'HIGH',
    headline: 'Show the map before the signup gate.',
    rationale: 'Nine of twelve top apps put an interactive map up before any account commitment is asked. The signup moves to the moment a destination is tapped — the highest-intent moment in the entire flow.',
    impact: '+8–12% activation (est.)',
    effort: 'S · 1 sprint',
    cites: ['Lyft', 'Uber', 'Bolt'],
  },
  secondary: [
    {
      priority: 'MEDIUM',
      headline: 'Surface a driver ETA before the email field.',
      rationale: 'Six apps show a nearby car and an estimate before any credentials. A measurable trust gesture.',
      impact: '+3–5% activation',
      effort: 'M · 2 sprints',
      cites: ['Lyft', 'Kapten', 'Cabify'],
    },
    {
      priority: 'MEDIUM',
      headline: 'Defer payment capture until after the first ride.',
      rationale: 'Lyft, Bolt and Grab let users complete a first trip on auth-only. Conversion lifts in every measured deployment.',
      impact: '+4–6% activation',
      effort: 'L · cross-team',
      cites: ['Lyft', 'Bolt', 'Grab'],
    },
  ],
  tentative: {
    priority: 'LOW',
    headline: 'Confirm license & plate at pickup, not on home.',
  },
};

const PriorityChip = ({ level }) => {
  const color = level === 'HIGH' ? S.amberGlow : level === 'MEDIUM' ? S.cobaltGlow : S.soft;
  return (
    <span style={{
      ...Stype.eyebrow, fontSize: 10, padding: '3px 10px',
      border: `1px solid ${color}`, color, letterSpacing: '.16em',
      display: 'inline-block',
    }}>{level} priority</span>
  );
};

const SceneRecommendations = ({ p }) => {
  const s = useScene(p, SCENES[5].start, SCENES[5].end);
  if (s.opacity < 0.01) return null;

  const primaryEnter = easeOut(clamp01(s.p * 1.8));
  const secondaryEnter = easeOut(clamp01((s.p - 0.32) * 2));
  const tentativeEnter = easeOut(clamp01((s.p - 0.55) * 2));

  return (
    <Scene opacity={s.opacity}>
      <Halo
        x="50%" y="44%" w={920} h={520}
        color={`rgba(217,150,62,${0.22 * primaryEnter})`} blur={150}
        opacity={primaryEnter}
      />

      <div style={{ position: 'absolute', left: 64, top: 76, right: 64 }}>
        <Eyebrow>V · product-specific recommendations · for your rideshare app</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            What we'd try, in order.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
            three to act on · ranked by evidence + impact
          </div>
        </div>
      </div>

      {/* PRIMARY */}
      <div style={{
        position: 'absolute', left: '50%', top: 210,
        transform: `translateX(-50%) scale(${lerp(0.95, 1, primaryEnter)})`,
        width: 'min(1080px, calc(100% - 128px))',
        opacity: primaryEnter,
        padding: '36px 48px',
        background: `linear-gradient(135deg, rgba(48,40,28,0.92) 0%, rgba(35,31,24,0.94) 100%)`,
        boxShadow: `0 0 0 1px rgba(244,204,125,0.42), 0 36px 100px -20px rgba(0,0,0,0.8), 0 0 140px -20px rgba(217,150,62,0.5)`,
        display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 44,
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
            <PriorityChip level="HIGH" />
            <span style={{ ...Stype.micro, fontSize: 9, color: S.amber }}>recommendation 01 · primary</span>
          </div>
          <h3 style={{
            ...Stype.title, fontSize: 48, color: S.bone, margin: '20px 0 0',
            lineHeight: 1.05, fontVariationSettings: "'opsz' 72, 'wdth' 94, 'wght' 400",
          }}>
            Show the map <span style={{ color: S.amberGlow, ...sf(72, 500, 92) }}>before</span> the signup gate.
          </h3>
          <p style={{
            ...Stype.reading, fontSize: 17, color: S.ink, marginTop: 20,
            maxWidth: 540, lineHeight: 1.55,
          }}>
            {RECS.primary.rationale}
          </p>
          <div style={{
            marginTop: 24, paddingTop: 16, borderTop: `1px solid ${S.rule}`,
            display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 36,
          }}>
            <div>
              <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>expected impact</div>
              <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.amberGlow, marginTop: 4 }}>{RECS.primary.impact}</div>
            </div>
            <div>
              <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>effort</div>
              <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.bone, marginTop: 4 }}>{RECS.primary.effort}</div>
            </div>
            <div>
              <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>seen in</div>
              <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.bone, marginTop: 4 }}>
                {RECS.primary.cites.join(' · ')}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ ...Stype.micro, fontSize: 9, color: S.soft, marginBottom: 4 }}>
            supporting evidence · 3 of 9
          </div>
          {RECS.primary.cites.map((app, i) => (
            <div key={app} style={{
              display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, alignItems: 'center',
              paddingBottom: 10, borderBottom: i < 2 ? `1px solid ${S.hairline}` : 0,
              opacity: 0.78,
            }}>
              <div style={{ height: 56, padding: 4, background: S.raisedWarm, boxShadow: `0 0 0 1px ${S.rule}` }}>
                <Screenshot kind={['form','detail','cards'][i]} accent={S.amberGlow} />
              </div>
              <div>
                <div style={{ ...Stype.body, fontSize: 13, color: S.bone }}>{app}</div>
                <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>
                  {['map pinned · signup deferred','destination tap · phone last','pickup tap · then signup'][i]}
                </div>
              </div>
            </div>
          ))}
          <div style={{ ...Stype.body, fontSize: 12, color: S.amberGlow, marginTop: 4 }}>
            + 6 more in the appendix →
          </div>
        </div>
      </div>

      {/* SECONDARY */}
      <div style={{
        position: 'absolute', left: '50%', top: 624,
        transform: 'translateX(-50%)',
        width: 'min(1080px, calc(100% - 128px))',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24,
        opacity: secondaryEnter,
        transition: 'opacity 500ms',
      }}>
        {RECS.secondary.map((r, i) => (
          <div key={i} style={{
            padding: '22px 26px',
            background: `linear-gradient(135deg, rgba(30,34,40,0.78) 0%, rgba(22,25,30,0.85) 100%)`,
            boxShadow: `0 0 0 1px rgba(136,166,216,0.18), 0 22px 40px -18px rgba(0,0,0,0.6)`,
            transform: `translateY(${(1 - secondaryEnter) * 20}px)`,
            transition: 'transform 500ms',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <PriorityChip level="MEDIUM" />
              <span style={{ ...Stype.micro, fontSize: 9, color: S.soft }}>0{i+2} · secondary</span>
            </div>
            <h3 style={{ ...Stype.headlineMed, fontSize: 26, color: S.bone, margin: '14px 0 0', lineHeight: 1.15 }}>
              {r.headline}
            </h3>
            <p style={{ ...Stype.reading, fontSize: 14, color: S.ink, marginTop: 10, lineHeight: 1.55 }}>
              {r.rationale}
            </p>
            <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${S.hairline}`, display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ ...Stype.body, fontSize: 12, color: S.cobaltGlow }}>{r.impact}</div>
              <div style={{ ...Stype.body, fontSize: 12, color: S.soft }}>{r.cites.join(' · ')}</div>
            </div>
          </div>
        ))}
      </div>

      {/* TENTATIVE */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 86,
        transform: 'translateX(-50%)',
        width: 'min(1080px, calc(100% - 128px))',
        opacity: tentativeEnter * 0.7,
        transition: 'opacity 500ms',
        padding: '16px 22px',
        background: 'rgba(20,23,28,0.55)',
        boxShadow: `0 0 0 1px ${S.hairline}`,
        display: 'flex', alignItems: 'center', gap: 24,
      }}>
        <PriorityChip level="LOW" />
        <span style={{ ...Stype.body, fontSize: 14, color: S.ink, flex: 1 }}>
          <span style={{ color: S.bone }}>04 · </span>{RECS.tentative.headline}
        </span>
        <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>3 of 12 · tentative</span>
      </div>
    </Scene>
  );
};

// ─── SCENE 7 · GUIDED INTERVIEW ───────────────────────────────
const INTERVIEW = [
  {
    q: 'Which competitor experiences should the prototype draw from most?',
    a: "Uber's map-first opening. Lyft's deferred signup. Bolt's payment-after-ride.",
    blueprint: ['Uber · map first', 'Lyft · deferred signup', 'Bolt · pay after ride'],
    blueprintLabel: 'references',
  },
  {
    q: 'Which patterns must it embody?',
    a: 'Map-first, phone-only auth, deferred signup. Skip the tutorial.',
    blueprint: ['Map-first', 'Phone-only auth', 'Deferred signup', 'No tutorial'],
    blueprintLabel: 'patterns',
  },
  {
    q: 'Product context — audience, platform, stage?',
    a: 'Growth-stage rideshare. Urban North America. iOS first, then Android.',
    blueprint: ['Growth-stage', 'Urban NA', 'iOS first'],
    blueprintLabel: 'context',
  },
  {
    q: 'What design system should anchor it?',
    a: 'Stripe-style restraint. Generous whitespace, single accent, no shadows.',
    blueprint: ['Stripe-style restraint', 'Single accent', 'No shadows'],
    blueprintLabel: 'design system',
  },
];

const SceneInterview = ({ p }) => {
  const s = useScene(p, SCENES[6].start, SCENES[6].end);
  if (s.opacity < 0.01) return null;

  return (
    <Scene opacity={s.opacity}>
      <div style={{ position: 'absolute', left: 64, top: 76, right: 64 }}>
        <Eyebrow>VI · guided interview · making the prototype yours</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            A few questions, then a prototype.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft, maxWidth: 360, textAlign: 'right' }}>
            UX Scout asks four questions · 90 seconds · assembles a brief
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 64, right: 64, top: 220, bottom: 96,
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 44,
      }}>
        {/* LEFT — conversation flow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, overflow: 'hidden' }}>
          {INTERVIEW.map((turn, i) => {
            const qEnter = easeOut(clamp01((s.p - i * 0.13) * 2.5));
            const aEnter = easeOut(clamp01((s.p - i * 0.13 - 0.06) * 2.5));
            if (qEnter < 0.02) return null;
            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '36px 1fr', gap: 18,
                opacity: qEnter,
                transform: `translateY(${(1 - qEnter) * 14}px)`,
                transition: 'opacity 500ms, transform 500ms',
              }}>
                {/* Question number */}
                <div style={{
                  ...Stype.tabular, fontSize: 11, color: S.amber, letterSpacing: '.06em',
                  paddingTop: 4,
                }}>
                  {String(i+1).padStart(2,'0')}.
                </div>
                <div>
                  <div style={{ ...Stype.eyebrow, fontSize: 9, color: S.amberGlow, marginBottom: 6 }}>
                    UX Scout asks
                  </div>
                  <div style={{
                    ...Stype.headlineMed, fontSize: 22, color: S.bone, lineHeight: 1.25,
                    maxWidth: 580,
                  }}>{turn.q}</div>
                  {aEnter > 0.05 && (
                    <div style={{
                      marginTop: 12, paddingTop: 12, borderTop: `1px solid ${S.hairline}`,
                      display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14,
                      opacity: aEnter,
                      transition: 'opacity 400ms',
                    }}>
                      <div style={{ ...Stype.micro, fontSize: 9, color: S.cobaltGlow, paddingTop: 3 }}>
                        you said
                      </div>
                      <div style={{
                        ...Stype.reading, fontSize: 15.5, color: S.ink, lineHeight: 1.55,
                        maxWidth: 540,
                      }}>{turn.a}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — blueprint assembling */}
        <div style={{
          background: `linear-gradient(180deg, rgba(35,31,24,0.55) 0%, rgba(25,28,32,0.6) 100%)`,
          boxShadow: `0 0 0 1px ${S.hairline}, 0 22px 40px -18px rgba(0,0,0,0.5)`,
          padding: '28px 30px',
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            borderBottom: `1px solid ${S.rule}`, paddingBottom: 14,
          }}>
            <Eyebrow style={{ color: S.amberGlow }}>brief · assembling</Eyebrow>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 6, height: 6, borderRadius: '50%', background: S.amberGlow,
                boxShadow: `0 0 14px ${S.amberGlow}`,
                animation: 'pulse 2.4s ease-in-out infinite',
              }} />
              <span style={{ ...Stype.body, fontSize: 11.5, color: S.soft }}>
                {Math.min(4, Math.floor(s.p * 5))} of 4 answered
              </span>
            </div>
          </div>

          {INTERVIEW.map((turn, i) => {
            const blEnter = easeOut(clamp01((s.p - i * 0.13 - 0.07) * 2.5));
            const sectionLit = blEnter > 0.4;
            return (
              <div key={i} style={{
                opacity: lerp(0.3, 1, blEnter),
                transition: 'opacity 500ms',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8,
                }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: '50%',
                    background: sectionLit ? S.amberGlow : 'transparent',
                    border: `1px solid ${sectionLit ? S.amberGlow : S.faint}`,
                    boxShadow: sectionLit ? `0 0 12px ${S.amberGlow}` : 'none',
                    transition: 'all 400ms',
                  }} />
                  <div style={{
                    ...Stype.micro, fontSize: 9,
                    color: sectionLit ? S.amberGlow : S.faint,
                  }}>{turn.blueprintLabel}</div>
                </div>
                <div style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {turn.blueprint.map((b, j) => {
                    const itemEnter = clamp01(blEnter * 1.3 - j * 0.10);
                    return (
                      <div key={j} style={{
                        ...Stype.body, fontSize: 13.5, color: itemEnter > 0.5 ? S.bone : S.soft,
                        opacity: itemEnter,
                        transition: 'opacity 400ms, color 400ms',
                      }}>{b}</div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '50%', bottom: 30, transform: 'translateX(-50%)',
        textAlign: 'center', opacity: clamp01((s.p - 0.85) * 6),
      }}>
        <div style={{ ...Stype.micro, fontSize: 10, color: S.amberGlow }}>
          brief complete · generating prototype prompt
        </div>
      </div>
    </Scene>
  );
};

// ─── SCENE 8 · PROTOTYPE PROMPT HANDOFF ───────────────────────
const PROMPT_TEXT = `Build a rideshare onboarding flow with these decisions:

  · Map-first opening. Interactive map visible on launch (Uber pattern).
  · Defer signup until the user pins a destination (Lyft pattern).
  · Phone-only auth via SMS code. No password, no email.
  · No tutorial. No walkthrough.
  · Capture payment AFTER first ride completes (Bolt pattern).

Product context:
  · Growth-stage rideshare, urban North America, iOS first.
  · Audience: city commuters 22–40, primarily iOS.

Design system constraints (Stripe-style restraint):
  · Generous whitespace, single accent color, no shadows.
  · One primary action per screen.
  · Inline validation, never modal.

Stack: React + Tailwind. Output 4 screens:
  1) Map + destination input
  2) Destination confirmed + ETA + signup
  3) SMS code verification
  4) En-route trip status`;

const ScenePrototype = ({ p }) => {
  const s = useScene(p, SCENES[7].start, SCENES[7].end, { fadeOut: false });
  if (s.opacity < 0.01) return null;

  return (
    <Scene opacity={s.opacity}>
      <Halo
        x="50%" y="44%" w={1100} h={520}
        color={`rgba(217,150,62,0.20)`} blur={170}
      />

      <div style={{ position: 'absolute', left: 64, top: 76, right: 64 }}>
        <Eyebrow>VII · AI-assisted prototype generation</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
          <h2 style={{ ...Stype.title, fontSize: 56, color: S.bone, margin: 0 }}>
            Your prototype prompt.
          </h2>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
            ready to paste · 168 tokens · 4 screens
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: 220, transform: 'translateX(-50%)',
        width: 'min(1080px, calc(100% - 128px))',
        opacity: clamp01(s.p * 2),
        padding: '32px 38px',
        background: `linear-gradient(180deg, rgba(48,40,28,0.62) 0%, rgba(35,31,24,0.70) 100%)`,
        boxShadow: `0 0 0 1px rgba(244,204,125,0.40), 0 36px 80px -22px rgba(0,0,0,0.7), 0 0 140px -30px rgba(217,150,62,0.5)`,
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          borderBottom: `1px solid ${S.rule}`, paddingBottom: 16, marginBottom: 22,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Eyebrow style={{ color: S.amberGlow }}>prompt · for your vibe-coding tool</Eyebrow>
            <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>v1 · drafted by UX Scout</span>
          </div>
          <span style={{ ...Stype.body, fontSize: 12, color: S.bone }}>
            saved to your studio
          </span>
        </div>

        <pre style={{
          ...Stype.body, fontSize: 14, color: S.ink, lineHeight: 1.7,
          margin: 0, whiteSpace: 'pre-wrap',
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontVariationSettings: "'opsz' 14, 'wdth' 96, 'wght' 400",
          maxHeight: 320, overflow: 'auto',
        }}>{PROMPT_TEXT}</pre>

        <div style={{
          marginTop: 26, paddingTop: 20, borderTop: `1px solid ${S.rule}`,
          display: 'flex', gap: 12, alignItems: 'center',
          opacity: clamp01((s.p - 0.3) * 3),
        }}>
          <button style={{
            ...Stype.bodyMed, fontSize: 14,
            padding: '12px 24px', background: S.amberGlow, color: '#1a1310',
            border: 0, cursor: 'pointer',
            boxShadow: `0 0 30px rgba(244,204,125,0.4)`,
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 16 }}>⎘</span>
            <span>Copy prompt</span>
          </button>
          <button style={{
            ...Stype.bodyMed, fontSize: 14,
            padding: '12px 22px', background: 'transparent', color: S.bone,
            border: `1px solid ${S.threadStrong}`, cursor: 'pointer',
          }}>
            Open in Lovable ↗
          </button>
          <button style={{
            ...Stype.bodyMed, fontSize: 14,
            padding: '12px 22px', background: 'transparent', color: S.bone,
            border: `1px solid ${S.threadStrong}`, cursor: 'pointer',
          }}>
            Open in Bolt ↗
          </button>
          <button style={{
            ...Stype.bodyMed, fontSize: 14,
            padding: '12px 22px', background: 'transparent', color: S.bone,
            border: `1px solid ${S.threadStrong}`, cursor: 'pointer',
          }}>
            Open in v0 ↗
          </button>
          <div style={{ flex: 1 }} />
          <button style={{
            ...Stype.body, fontSize: 13, padding: '10px 18px',
            background: 'transparent', color: S.soft, border: 0, cursor: 'pointer',
          }}>
            Refine →
          </button>
        </div>
      </div>

      {/* Closing note */}
      <div style={{
        position: 'absolute', left: '50%', bottom: 70,
        transform: 'translateX(-50%)', textAlign: 'center',
        opacity: clamp01((s.p - 0.55) * 4),
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
      }}>
        <div style={{ ...Stype.readingMed, fontSize: 17, color: S.amberGlow, lineHeight: 1.4 }}>
          Saved to your studio. Share with your team — or start a new research thread.
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 14,
          padding: '12px 24px', borderRadius: 999,
          border: `1px solid ${S.threadStrong}`,
          ...Stype.body, fontSize: 13, color: S.bone,
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: S.amberGlow,
            boxShadow: `0 0 14px ${S.amberGlow}`,
            animation: 'pulse 2s ease-in-out infinite',
          }} />
          Ask another question
        </div>
      </div>
    </Scene>
  );
};

window.SceneMatrix = SceneMatrix;
window.SceneInsights = SceneInsights;
window.SceneRecommendations = SceneRecommendations;
window.SceneInterview = SceneInterview;
window.ScenePrototype = ScenePrototype;
window.MATRIX = MATRIX;
window.INSIGHTS = INSIGHTS;
window.RECS = RECS;
window.INTERVIEW = INTERVIEW;
