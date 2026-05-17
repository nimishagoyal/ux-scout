// ─────────────────────────────────────────────────────────────
// UX SCOUT — New Research screen + Processing screen.
// Input + category chips + suggested prompts. Then loading state.
// ─────────────────────────────────────────────────────────────

const ScreenNewResearch = ({ onStartResearch, initialQuestion = '' }) => {
  const [question, setQuestion] = React.useState(initialQuestion || 'Improve onboarding for our rideshare app.');
  const [selectedChips, setSelectedChips] = React.useState({
    industry: ['rideshare'],
    touchpoint: ['onboarding'],
    goal: ['improve activation'],
  });

  const toggleChip = (group, chip) => {
    setSelectedChips(prev => {
      const current = prev[group] || [];
      const isOn = current.includes(chip);
      return { ...prev, [group]: isOn ? current.filter(c => c !== chip) : [...current, chip] };
    });
  };

  // Inspiration prompts rotate every 4s
  const [inspIdx, setInspIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setInspIdx(i => (i + 1) % INSPIRATION_PROMPTS.length), 4200);
    return () => clearInterval(t);
  }, []);

  const canStart = question.trim().length > 8;

  return (
    <div style={{ padding: '48px 48px 72px', maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
      {/* Eyebrow */}
      <Eyebrow style={{ color: S.amberGlow }}>new research</Eyebrow>

      <h1 style={{
        ...Stype.title, fontSize: 52, color: S.bone, margin: '14px 0 8px',
        letterSpacing: '-.025em', lineHeight: 1.0,
      }}>
        What product question are you asking?
      </h1>
      <p style={{ ...Stype.reading, fontSize: 17, color: S.ink, margin: 0, maxWidth: 720 }}>
        Describe the UX challenge in plain language. UX Scout reads the competitive landscape, surfaces the patterns that hold, and writes a recommendation report.
      </p>

      {/* Big input */}
      <div style={{ marginTop: 36 }}>
        <div style={{ position: 'relative' }}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={3}
            placeholder="e.g. Reduce friction in our checkout · benchmark KYC across crypto apps · rethink the empty state of our note-taking AI"
            style={{
              width: '100%', resize: 'vertical',
              background: 'rgba(20,23,28,0.55)',
              border: 0,
              boxShadow: `0 0 0 1px ${S.threadStrong}`,
              borderRadius: 0,
              color: S.bone,
              padding: '24px 28px',
              ...sf(28, 400, 95), lineHeight: 1.3,
              fontSize: 26, letterSpacing: '-.01em',
              outline: 'none',
              minHeight: 130,
            }}
          />
          {/* Inspiration ticker */}
          <div style={{
            position: 'absolute', left: 28, bottom: -28,
            display: 'flex', alignItems: 'center', gap: 12,
            ...Stype.body, fontSize: 12.5, color: S.soft,
          }}>
            <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>try:</span>
            <button onClick={() => setQuestion(INSPIRATION_PROMPTS[inspIdx] + '.')}
              style={{
                color: S.amberGlow, cursor: 'pointer',
                ...Stype.body, fontSize: 13,
                transition: 'opacity 600ms ease',
                animation: 'fadeIn 500ms ease',
              }}>"{INSPIRATION_PROMPTS[inspIdx]}"  ↗</button>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div style={{ marginTop: 64 }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 18,
        }}>
          <Eyebrow style={{ color: S.faint }}>or refine by coordinates</Eyebrow>
          <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>tap to select · multiple allowed</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {APP_CHIPS.map((group) => {
            const selected = selectedChips[group.label] || [];
            return (
              <div key={group.label} style={{
                display: 'grid', gridTemplateColumns: '110px 1fr', gap: 24, alignItems: 'baseline',
              }}>
                <div style={{ ...Stype.micro, fontSize: 9.5, color: S.faint, letterSpacing: '.22em' }}>
                  {group.label}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {group.chips.map((c) => (
                    <button key={c}
                      onClick={() => toggleChip(group.label, c)}
                      style={{
                        cursor: 'pointer',
                        ...Stype.body, fontSize: 12.5, padding: '6px 12px', borderRadius: 999,
                        border: `1px solid ${selected.includes(c) ? S.amberGlow : S.rule}`,
                        color: selected.includes(c) ? S.bone : S.soft,
                        background: selected.includes(c) ? 'rgba(217,150,62,0.10)' : 'transparent',
                        boxShadow: selected.includes(c) ? `0 0 18px rgba(244,204,125,0.18)` : 'none',
                        transition: 'all 200ms ease', whiteSpace: 'nowrap',
                      }}
                    >{c}</button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Start CTA */}
      <div style={{
        marginTop: 52, paddingTop: 28,
        borderTop: `1px solid ${S.hairline}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>scope</div>
          <div style={{ ...Stype.body, fontSize: 13.5, color: S.ink, marginTop: 4 }}>
            ~ 140 flows · 30+ apps · 2 minutes to a full report
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Button variant="secondary" size="m">Save as draft</Button>
          <Button
            variant="primary" size="m"
            disabled={!canStart}
            trailing="↵"
            onClick={() => onStartResearch({ question, scope: selectedChips })}
          >
            Begin research
          </Button>
        </div>
      </div>

      {/* Trending */}
      <div style={{ marginTop: 64 }}>
        <SectionHeader
          eyebrow="suggested research"
          title="What teams are studying this week"
        />
        <div style={{
          display: 'grid', gap: 14,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {SUGGESTED.map((s, i) => (
            <button key={i}
              onClick={() => { setQuestion(s.title + '.'); }}
              style={{
                textAlign: 'left', padding: 20,
                background: 'rgba(30,34,40,0.35)',
                boxShadow: `0 0 0 1px ${S.hairline}`,
                cursor: 'pointer', transition: 'all 200ms',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}
            >
              <Chip color="cobalt" size="s">{s.industry}</Chip>
              <div style={{ ...Stype.headlineMed, fontSize: 18, color: S.bone, lineHeight: 1.25 }}>
                {s.title}
              </div>
              <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 'auto' }}>
                {s.freq}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── PROCESSING SCREEN ──────────────────────────────────────
const PROCESSING_STEPS = [
  { id: 'scan',    label: 'Reading the competitive landscape', sub: 'gathering flows · clustering by app' },
  { id: 'pattern', label: 'Identifying recurring UX patterns', sub: 'comparing gestures across apps' },
  { id: 'synth',   label: 'Synthesizing comparative insights', sub: 'benchmarking · weighting evidence' },
  { id: 'write',   label: 'Writing your recommendations',      sub: 'tailored to your product context' },
];

const ScreenProcessing = ({ question, onComplete }) => {
  const [stepIdx, setStepIdx] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  React.useEffect(() => {
    if (stepIdx >= PROCESSING_STEPS.length) {
      // Auto-complete after final step
      const t = setTimeout(() => { setCompleted(true); onComplete && onComplete(); }, 1200);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStepIdx(i => i + 1), 1800);
    return () => clearTimeout(t);
  }, [stepIdx, onComplete]);

  return (
    <div style={{ position: 'relative', minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Soft halo */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%,-50%)',
        width: 900, height: 520, borderRadius: '50%',
        background: 'radial-gradient(circle at 50% 45%, rgba(217,150,62,0.18) 0%, transparent 60%)',
        filter: 'blur(80px)',
        animation: 'breath 4s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative', zIndex: 2, width: 'min(720px, 90%)',
        textAlign: 'center',
      }}>
        <Eyebrow style={{ color: S.amberGlow }}>generating · UX Scout</Eyebrow>
        <h1 style={{
          ...Stype.title, fontSize: 40, color: S.bone, margin: '14px 0 12px',
          letterSpacing: '-.02em', lineHeight: 1.1,
        }}>
          "{question}"
        </h1>
        <p style={{ ...Stype.reading, fontSize: 16, color: S.soft, margin: 0, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          A full report in ~ 2 minutes.
        </p>

        {/* Step list */}
        <div style={{
          marginTop: 56, textAlign: 'left',
          background: 'rgba(20,23,28,0.55)',
          boxShadow: `0 0 0 1px ${S.rule}`,
          padding: '20px 28px',
        }}>
          {PROCESSING_STEPS.map((step, i) => {
            const done = i < stepIdx;
            const active = i === stepIdx;
            return (
              <div key={step.id} style={{
                display: 'grid', gridTemplateColumns: '32px 1fr 64px', alignItems: 'center', gap: 14,
                padding: '14px 0',
                borderBottom: i < PROCESSING_STEPS.length - 1 ? `1px solid ${S.hairline}` : 0,
                opacity: done ? 0.6 : 1,
                transition: 'opacity 400ms',
              }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {done && <span style={{ color: S.olive || S.amberGlow, fontSize: 16 }}>✓</span>}
                  {active && <Spinner size={16} />}
                  {!done && !active && (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', border: `1px solid ${S.faint}` }} />
                  )}
                </div>
                <div>
                  <div style={{ ...Stype.bodyMed, fontSize: 14, color: done ? S.soft : S.bone }}>
                    {step.label}
                  </div>
                  <div style={{ ...Stype.body, fontSize: 12, color: S.faint, marginTop: 3 }}>
                    {step.sub}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  {active && <DotLoader size={4} />}
                  {done && <span style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>done</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 24 }}>
          <div style={{
            height: 2, background: 'rgba(232,227,210,0.10)', overflow: 'hidden',
          }}>
            <div style={{
              height: '100%', background: S.amberGlow,
              boxShadow: `0 0 18px ${S.amberGlow}`,
              transformOrigin: 'left',
              transform: `scaleX(${Math.min(1, stepIdx / PROCESSING_STEPS.length)})`,
              transition: 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
            }} />
          </div>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: 10, ...Stype.micro, fontSize: 9, color: S.faint,
          }}>
            <span>{completed ? 'complete' : `step ${Math.min(stepIdx + 1, PROCESSING_STEPS.length)} of ${PROCESSING_STEPS.length}`}</span>
            <span>{Math.round(Math.min(1, stepIdx / PROCESSING_STEPS.length) * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScreenNewResearch = ScreenNewResearch;
window.ScreenProcessing = ScreenProcessing;
