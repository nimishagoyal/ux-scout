// ─────────────────────────────────────────────────────────────
// UX SCOUT — Study Viewer screen.
// Header + sticky section nav + 6 report sections + prototype CTA.
// ─────────────────────────────────────────────────────────────

// ─── Section nav (sticky horizontal) ─────────────────────────
const StudySectionNav = ({ activeId, onJump }) => (
  <div style={{
    position: 'sticky', top: 64, zIndex: 4,
    background: 'rgba(20,23,28,0.92)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${S.rule}`,
    padding: '0 48px',
  }}>
    <div style={{
      display: 'flex', gap: 4, alignItems: 'center',
      maxWidth: 1400, margin: '0 auto',
      overflow: 'auto',
    }}>
      {STUDY_SECTIONS.map((sec) => {
        const active = activeId === sec.id;
        return (
          <button key={sec.id}
            onClick={() => onJump(sec.id)}
            style={{
              padding: '14px 16px',
              borderBottom: `2px solid ${active ? S.amberGlow : 'transparent'}`,
              color: active ? S.bone : S.soft,
              transition: 'all 200ms',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 10,
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

// ─── 01 — Executive Summary ──────────────────────────────────
const SectionSummary = ({ study }) => (
  <section id="summary" style={{ scrollMarginTop: 130, padding: '56px 48px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader eyebrow={`§01 · executive summary`} title="The shape of the market." />

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48 }}>
        {/* Summary prose */}
        <div>
          <p style={{ ...Stype.reading, fontSize: 19, color: S.bone, margin: 0, lineHeight: 1.55, maxWidth: 700 }}>
            {study.summary}
          </p>
          <div style={{
            marginTop: 28, padding: '20px 24px',
            background: `linear-gradient(135deg, rgba(48,40,28,0.65) 0%, rgba(35,31,24,0.72) 100%)`,
            boxShadow: `0 0 0 1px rgba(244,204,125,0.30), 0 0 60px -28px rgba(217,150,62,0.30)`,
          }}>
            <Eyebrow style={{ color: S.amberGlow }}>top recommendation</Eyebrow>
            <div style={{ ...Stype.title, fontSize: 28, color: S.bone, marginTop: 10, lineHeight: 1.15 }}>
              {study.tagline}
            </div>
            <div style={{ ...Stype.body, fontSize: 13, color: S.soft, marginTop: 12 }}>
              from {study.recsCount} ranked recommendations · evidence: high
            </div>
          </div>
        </div>

        {/* Right meta */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 24,
        }}>
          <div style={{
            padding: 24, background: 'rgba(30,34,40,0.4)',
            boxShadow: `0 0 0 1px ${S.hairline}`,
          }}>
            <Eyebrow style={{ color: S.faint }}>study meta</Eyebrow>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 16 }}>
              <KeyValue label="industry"   value={study.industry} />
              <KeyValue label="touchpoint" value={study.touchpoint} />
              <KeyValue label="goal"       value={study.goal} />
              <KeyValue label="confidence" value={study.confidence} color={S.amberGlow} />
              <KeyValue label="flows read" value={study.flows} />
              <KeyValue label="competitors" value={study.competitors} />
            </div>
          </div>

          <div>
            <Eyebrow style={{ color: S.faint, marginBottom: 12 }}>apps analyzed</Eyebrow>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {study.apps.map(app => (
                <div key={app} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '6px 12px 6px 6px',
                  border: `1px solid ${S.hairline}`, borderRadius: 999,
                  background: 'rgba(30,34,40,0.45)',
                }}>
                  <AppIcon name={app} size={20} />
                  <span style={{ ...Stype.body, fontSize: 12.5, color: S.bone }}>{app}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── 02 — UX Pattern Analysis ────────────────────────────────
const PatternCard = ({ pt, lit }) => {
  const aColor = pt.accent === 'amber' ? S.amberGlow : pt.accent === 'cobalt' ? S.cobaltGlow : S.soft;
  return (
    <div style={{
      background: lit
        ? `linear-gradient(135deg, rgba(48,40,28,0.78) 0%, rgba(35,31,24,0.85) 100%)`
        : `linear-gradient(135deg, rgba(30,34,40,0.5) 0%, rgba(22,25,30,0.58) 100%)`,
      boxShadow: lit
        ? `0 0 0 1px rgba(244,204,125,0.32), 0 22px 50px -22px rgba(0,0,0,0.55), 0 0 80px -32px rgba(217,150,62,0.30)`
        : `0 0 0 1px ${S.hairline}, 0 14px 30px -16px rgba(0,0,0,0.45)`,
      padding: 26, display: 'flex', flexDirection: 'column', gap: 16,
      opacity: pt.tentative ? 0.78 : 1,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ ...Stype.eyebrow, fontSize: 9.5, color: aColor }}>
          {pt.tentative ? 'tentative' : pt.strong ? 'strong · lifting' : 'medium'}
        </div>
        <div style={{ ...Stype.tabular, fontSize: 13, color: aColor }}>{pt.freq}</div>
      </div>
      <h3 style={{
        ...Stype.headline, fontSize: lit ? 26 : 22, color: S.bone,
        margin: 0, lineHeight: 1.15,
      }}>{pt.name}</h3>
      <p style={{ ...Stype.reading, fontSize: 14, color: S.ink, margin: 0, lineHeight: 1.55 }}>
        {pt.longNote}
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        {pt.shots.map((k, i) => (
          <AppShot key={i} kind={k} accent={aColor} w={62} h={86} />
        ))}
      </div>
      <div style={{
        paddingTop: 12, borderTop: `1px solid ${S.hairline}`,
        ...Stype.body, fontSize: 12, color: S.soft,
      }}>
        seen in: {pt.seenIn.slice(0, 3).join(' · ')}{pt.seenIn.length > 3 ? ` · +${pt.seenIn.length - 3} more` : ''}
      </div>
    </div>
  );
};

const SectionPatterns = () => (
  <section id="patterns" style={{ scrollMarginTop: 130, padding: '56px 48px', background: 'rgba(255,255,255,0.012)' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="§02 · UX pattern analysis"
        title="Five patterns lifting."
        right={
          <div style={{ display: 'flex', gap: 8 }}>
            <Button variant="ghost" size="s">All 5</Button>
            <Button variant="ghost" size="s">Strong only</Button>
          </div>
        }
      />
      <div style={{
        display: 'grid', gap: 18,
        gridTemplateColumns: '1.4fr 1fr',
      }}>
        <PatternCard pt={STUDY_PATTERNS[0]} lit />
        <PatternCard pt={STUDY_PATTERNS[1]} lit />
      </div>
      <div style={{
        marginTop: 18,
        display: 'grid', gap: 18,
        gridTemplateColumns: 'repeat(3, 1fr)',
      }}>
        {STUDY_PATTERNS.slice(2).map(pt => <PatternCard key={pt.id} pt={pt} />)}
      </div>
    </div>
  </section>
);

// ─── 03 — Competitor Feature Matrix ──────────────────────────
const SectionMatrix = () => (
  <section id="matrix" style={{ scrollMarginTop: 130, padding: '56px 48px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="§03 · benchmark · feature matrix"
        title="How they differ."
        right={
          <Button variant="ghost" size="s" icon="↓">Export CSV</Button>
        }
      />
      <div style={{
        background: 'rgba(20,23,28,0.4)',
        boxShadow: `0 0 0 1px ${S.hairline}`,
        padding: '8px 24px 16px',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '14%' }} />
            {STUDY_MATRIX.features.map((f, i) => (
              <col key={i} style={{ width: `${86 / STUDY_MATRIX.features.length}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              <th style={{
                textAlign: 'left', padding: '14px 12px 14px 0',
                borderBottom: `1px solid ${S.threadStrong}`,
                ...Stype.eyebrow, color: S.amberGlow, fontSize: 10,
              }}>
                competitor
              </th>
              {STUDY_MATRIX.features.map((f) => (
                <th key={f.key} style={{
                  textAlign: 'center', padding: '14px 8px',
                  borderBottom: `1px solid ${S.threadStrong}`,
                }}>
                  <div style={{ ...Stype.eyebrow, fontSize: 9.5, color: S.bone }}>{f.label}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDY_MATRIX.competitors.map((comp) => (
              <tr key={comp} style={{ transition: 'background 200ms' }}>
                <td style={{
                  padding: '18px 12px 18px 0', borderBottom: `1px solid ${S.hairline}`,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <AppIcon name={comp} size={26} />
                  <span style={{ ...Stype.bodyMed, fontSize: 16, color: S.bone }}>{comp}</span>
                </td>
                {STUDY_MATRIX.features.map((f) => {
                  const v = STUDY_MATRIX.values[comp][f.key];
                  const lit = f.key === 'deferSignup' && v === 'y';
                  return (
                    <td key={f.key} style={{
                      padding: '18px 8px', textAlign: 'center',
                      borderBottom: `1px solid ${S.hairline}`,
                      background: lit ? 'rgba(217,150,62,0.06)' : 'transparent',
                    }}>
                      <AppMatrixCell v={v} lit={lit} />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: 28,
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28,
      }}>
        <div>
          <Eyebrow style={{ color: S.amberGlow, fontSize: 10 }}>where they converge</Eyebrow>
          <p style={{ ...Stype.reading, fontSize: 16, color: S.ink, marginTop: 10, lineHeight: 1.55 }}>
            <span style={{ color: S.amberGlow }}>Map-first</span> and <span style={{ color: S.amberGlow }}>phone-only auth</span> are industry default. Five of five.
          </p>
        </div>
        <div>
          <Eyebrow style={{ color: S.cobaltGlow, fontSize: 10 }}>where they split</Eyebrow>
          <p style={{ ...Stype.reading, fontSize: 16, color: S.ink, marginTop: 10, lineHeight: 1.55 }}>
            Deferred signup is the live debate. <span style={{ color: S.cobaltGlow }}>Three apps</span> commit; two hold on.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// ─── 04 — User Journey Mapping ────────────────────────────────
const JourneyStrip = ({ journey }) => {
  const aColor = journey.accent === 'amber' ? S.amberGlow : journey.accent === 'cobalt' ? S.cobaltGlow : S.soft;
  return (
    <div style={{
      padding: 24,
      background: 'rgba(30,34,40,0.4)',
      boxShadow: `0 0 0 1px ${S.hairline}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <AppIcon name={journey.app} size={32} />
          <div>
            <div style={{ ...Stype.headlineMed, fontSize: 20, color: S.bone }}>{journey.app}</div>
            <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>{journey.flowLength}</div>
          </div>
        </div>
        <div style={{ ...Stype.body, fontSize: 13, color: aColor, maxWidth: 480, textAlign: 'right' }}>
          {journey.note}
        </div>
      </div>

      <div style={{
        display: 'grid', gap: 14,
        gridTemplateColumns: `repeat(${journey.steps.length}, 1fr)`,
        position: 'relative',
      }}>
        {journey.steps.map((step, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <AppShot kind={step.k} accent={aColor} w="100%" h={140} />
            <div style={{ marginTop: 10 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 6,
              }}>
                <span style={{ ...Stype.tabular, fontSize: 11, color: aColor }}>0{i+1}</span>
                <span style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone }}>{step.name}</span>
              </div>
              <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 3 }}>{step.hint}</div>
            </div>
            {i < journey.steps.length - 1 && (
              <div style={{
                position: 'absolute', right: -14, top: 65,
                color: aColor, fontSize: 14,
              }}>→</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionJourneys = () => (
  <section id="journeys" style={{ scrollMarginTop: 130, padding: '56px 48px', background: 'rgba(255,255,255,0.012)' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="§04 · screenshots mapping user journeys"
        title="Three exemplary flows."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {STUDY_JOURNEYS.map((j, i) => <JourneyStrip key={i} journey={j} />)}
      </div>
    </div>
  </section>
);

// ─── 05 — Comparative Insights ───────────────────────────────
const SectionInsights = () => (
  <section id="insights" style={{ scrollMarginTop: 130, padding: '56px 48px' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="§05 · comparative insights"
        title="What the market says."
      />
      <div style={{
        display: 'grid', gap: 18,
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}>
        {STUDY_INSIGHTS.map((ins, i) => {
          const aColor = ins.accent === 'amber' ? S.amberGlow : S.cobaltGlow;
          return (
            <div key={i} style={{
              padding: '32px 26px',
              background: 'rgba(30,34,40,0.45)',
              boxShadow: `0 0 0 1px ${S.hairline}`,
              borderTop: `2px solid ${aColor}`,
            }}>
              <Eyebrow style={{ color: aColor, fontSize: 9 }}>insight · 0{i+1}</Eyebrow>
              <div style={{ marginTop: 20, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{
                  fontFamily: 'Bricolage Grotesque, sans-serif',
                  fontVariationSettings: "'opsz' 96, 'wdth' 88, 'wght' 400",
                  fontSize: 80, color: S.bone, letterSpacing: '-.04em', lineHeight: .9,
                }}>{ins.stat}</span>
                {ins.suffix && (
                  <span style={{ ...Stype.body, fontSize: 13, color: aColor, marginBottom: 10 }}>{ins.suffix}</span>
                )}
              </div>
              <p style={{
                ...Stype.reading, fontSize: 14, color: S.ink, marginTop: 18,
                lineHeight: 1.5,
              }}>{ins.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── 06 — Product-Specific Recommendations ───────────────────
const RecCard = ({ rec, featured }) => {
  const aColor = rec.accent === 'amber' ? S.amberGlow : rec.accent === 'cobalt' ? S.cobaltGlow : S.soft;
  return (
    <div style={{
      padding: featured ? '32px 36px' : '24px 28px',
      background: featured
        ? `linear-gradient(135deg, rgba(48,40,28,0.92) 0%, rgba(35,31,24,0.94) 100%)`
        : `linear-gradient(135deg, rgba(30,34,40,0.65) 0%, rgba(22,25,30,0.75) 100%)`,
      boxShadow: featured
        ? `0 0 0 1px rgba(244,204,125,0.40), 0 28px 60px -22px rgba(0,0,0,0.6), 0 0 100px -28px rgba(217,150,62,0.40)`
        : `0 0 0 1px rgba(136,166,216,0.18), 0 18px 36px -18px rgba(0,0,0,0.5)`,
      opacity: rec.tentative ? 0.72 : 1,
      display: 'grid',
      gridTemplateColumns: featured ? '1.4fr 1fr' : '1fr',
      gap: featured ? 36 : 0,
    }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
          <PriorityTag level={rec.priority} />
          <span style={{ ...Stype.micro, fontSize: 9, color: S.soft }}>
            {featured ? 'recommendation · primary' : 'recommendation'}
          </span>
        </div>
        <h3 style={{
          ...Stype.title, fontSize: featured ? 36 : 22, color: S.bone,
          margin: '18px 0 0', lineHeight: 1.1,
        }}>
          {rec.headline}
        </h3>
        <p style={{
          ...Stype.reading, fontSize: featured ? 16 : 14, color: S.ink,
          marginTop: 16, lineHeight: 1.55, maxWidth: 540,
        }}>{rec.rationale}</p>
        <div style={{
          marginTop: 20, paddingTop: 14, borderTop: `1px solid ${S.rule}`,
          display: 'flex', flexWrap: 'wrap', gap: 32,
        }}>
          <KeyValue label="expected impact" value={rec.impact} color={aColor} />
          <KeyValue label="effort" value={rec.effort} />
          <KeyValue label="seen in" value={rec.cites.join(' · ')} color={S.soft} />
        </div>
      </div>

      {featured && (
        <div>
          <Eyebrow style={{ color: S.soft, fontSize: 9, marginBottom: 12 }}>
            supporting evidence · 3 of 9
          </Eyebrow>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {rec.cites.map((app, i) => (
              <div key={app} style={{
                display: 'grid', gridTemplateColumns: '76px 1fr', gap: 14, alignItems: 'center',
                paddingBottom: 10, borderBottom: i < rec.cites.length - 1 ? `1px solid ${S.hairline}` : 0,
                opacity: 0.85,
              }}>
                <AppShot kind={['form','detail','cards'][i]} accent={aColor} w="100%" h={52} />
                <div>
                  <div style={{ ...Stype.bodyMed, fontSize: 13, color: S.bone }}>{app}</div>
                  <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>
                    {['map pinned · signup deferred','destination tap · phone last','pickup tap · then signup'][i]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const SectionRecommendations = ({ onGeneratePrototype }) => (
  <section id="recommendations" style={{ scrollMarginTop: 130, padding: '56px 48px 0', background: 'rgba(255,255,255,0.012)' }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <SectionHeader
        eyebrow="§06 · product-specific recommendations"
        title="What we'd try, in order."
      />

      {/* Primary */}
      <RecCard rec={STUDY_RECS[0]} featured />

      {/* Secondary 2-up */}
      <div style={{
        marginTop: 18, display: 'grid', gap: 18,
        gridTemplateColumns: '1fr 1fr',
      }}>
        <RecCard rec={STUDY_RECS[1]} />
        <RecCard rec={STUDY_RECS[2]} />
      </div>

      {/* Tentative */}
      <div style={{ marginTop: 18 }}>
        <RecCard rec={STUDY_RECS[3]} />
      </div>
    </div>
  </section>
);

// ─── Build CTA — the prominent end-of-report handoff ─────────
const SectionBuild = ({ onGeneratePrototype }) => (
  <section id="build" style={{
    scrollMarginTop: 130, padding: '72px 48px 96px',
    background: 'rgba(255,255,255,0.012)',
  }}>
    <div style={{ maxWidth: 1400, margin: '0 auto' }}>
      <div style={{
        position: 'relative',
        padding: '56px 56px',
        background: `linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.92) 100%)`,
        boxShadow: `0 0 0 1px rgba(244,204,125,0.42), 0 36px 100px -22px rgba(0,0,0,0.7), 0 0 160px -30px rgba(217,150,62,0.50)`,
        overflow: 'hidden',
      }}>
        {/* Warm halo */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: '-10%', top: '-30%',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,150,62,0.20) 0%, transparent 60%)',
          filter: 'blur(40px)', pointerEvents: 'none',
          animation: 'breath 8s ease-in-out infinite',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 56, alignItems: 'center',
        }}>
          <div>
            <Eyebrow style={{ color: S.amberGlow, fontSize: 11 }}>ready to act on this?</Eyebrow>
            <h2 style={{
              ...Stype.title, fontSize: 48, color: S.bone, margin: '14px 0 18px',
              letterSpacing: '-.02em', lineHeight: 1.05,
            }}>
              Turn these recommendations into a prompt.
            </h2>
            <p style={{
              ...Stype.reading, fontSize: 17, color: S.ink, margin: 0,
              lineHeight: 1.55, maxWidth: 580,
            }}>
              Answer four short questions and UX Scout assembles a ready-to-paste prompt for Lovable, Bolt or v0 — so the report becomes a working prototype.
            </p>

            <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 18 }}>
              <Button variant="primary" size="l" trailing="→" onClick={onGeneratePrototype}>
                Start building
              </Button>
              <span style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
                ~ 2 minutes · 4 questions · copyable prompt
              </span>
            </div>
          </div>

          {/* Right: tiny preview of what's next */}
          <div style={{
            background: 'rgba(20,23,28,0.55)',
            boxShadow: `0 0 0 1px ${S.hairline}`,
            padding: '20px 22px',
          }}>
            <Eyebrow style={{ color: S.faint, fontSize: 9 }}>what happens next</Eyebrow>
            <ol style={{
              listStyle: 'none', padding: 0, margin: '14px 0 0',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              {[
                'Pick the references you want to draw from',
                'Choose the patterns to embody',
                'Set your product context',
                'Anchor on a design system',
              ].map((step, i) => (
                <li key={i} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ ...Stype.tabular, fontSize: 11, color: S.amberGlow }}>
                    0{i + 1}
                  </span>
                  <span style={{ ...Stype.body, fontSize: 13.5, color: S.bone, lineHeight: 1.4 }}>{step}</span>
                </li>
              ))}
            </ol>
            <div style={{
              marginTop: 16, paddingTop: 12, borderTop: `1px solid ${S.hairline}`,
              ...Stype.body, fontSize: 12, color: S.amberGlow,
            }}>
              then: copy → paste into Lovable / Bolt / v0
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Study Viewer screen ─────────────────────────────────────
const ScreenStudy = ({ study, onGeneratePrototype }) => {
  const [activeSection, setActiveSection] = React.useState('summary');

  const handleJump = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 124;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Scroll-spy for active section
  React.useEffect(() => {
    const onScroll = () => {
      const offsets = STUDY_SECTIONS.map(s => {
        const el = document.getElementById(s.id);
        if (!el) return { id: s.id, dist: Infinity };
        return { id: s.id, dist: Math.abs(el.getBoundingClientRect().top - 130) };
      });
      offsets.sort((a, b) => a.dist - b.dist);
      if (offsets[0]) setActiveSection(offsets[0].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div>
      {/* Hero / header */}
      <div style={{ padding: '36px 48px 32px' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <StatusPill status={study.status} />
            <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{study.date}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: S.faint }} />
            <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{study.flows} flows · {study.competitors} apps</span>
          </div>
          <h1 style={{
            ...Stype.title, fontSize: 56, color: S.bone, margin: 0,
            letterSpacing: '-.025em', lineHeight: 1.0, maxWidth: 1100,
          }}>
            {study.title}
          </h1>
        </div>
      </div>

      <StudySectionNav activeId={activeSection} onJump={handleJump} />

      <SectionSummary study={study} />
      <SectionPatterns />
      <SectionMatrix />
      <SectionJourneys />
      <SectionInsights />
      <SectionRecommendations onGeneratePrototype={onGeneratePrototype} />
      <SectionBuild onGeneratePrototype={onGeneratePrototype} />
    </div>
  );
};

window.ScreenStudy = ScreenStudy;
