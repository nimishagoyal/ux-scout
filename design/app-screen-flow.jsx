// ─────────────────────────────────────────────────────────────
// UX SCOUT — Guided Interview + Prototype Prompt screens.
// Real interaction: user picks answers, blueprint assembles,
// final prompt is generated.
// ─────────────────────────────────────────────────────────────

const INTERVIEW_QUESTIONS = [
  {
    id: 'references',
    prompt: 'Which competitor experiences should the prototype draw from most?',
    helper: 'Pick three or fewer. UX Scout will weight their gestures heaviest.',
    options: [
      { v: 'uber',  label: "Uber's map-first opening" },
      { v: 'lyft',  label: "Lyft's deferred signup" },
      { v: 'bolt',  label: "Bolt's payment-after-ride" },
      { v: 'didi',  label: "Didi's tier transparency" },
      { v: 'grab',  label: "Grab's promo entry" },
    ],
    type: 'chips',
    presetSelection: ['uber','lyft','bolt'],
    blueprintFrom: (sel) => sel.map(v => ({ uber:'Uber · map first', lyft:'Lyft · deferred signup', bolt:'Bolt · pay after ride', didi:'Didi · tier transparency', grab:'Grab · promo entry' }[v])).filter(Boolean),
  },
  {
    id: 'patterns',
    prompt: 'Which UX patterns must the prototype embody?',
    helper: 'Pick whatever the design must do.',
    options: [
      { v: 'mapFirst',     label: 'Map-first opening' },
      { v: 'phoneOnly',    label: 'Phone-only auth' },
      { v: 'deferSignup',  label: 'Deferred signup' },
      { v: 'noTutorial',   label: 'No tutorial' },
      { v: 'inlineValid',  label: 'Inline validation' },
      { v: 'darkOk',       label: 'Dark mode ready' },
    ],
    type: 'chips',
    presetSelection: ['mapFirst','phoneOnly','deferSignup','noTutorial'],
    blueprintFrom: (sel) => sel.map(v => ({
      mapFirst: 'Map-first opening',
      phoneOnly: 'Phone-only auth',
      deferSignup: 'Deferred signup',
      noTutorial: 'No tutorial',
      inlineValid: 'Inline validation',
      darkOk: 'Dark mode ready',
    }[v])).filter(Boolean),
  },
  {
    id: 'context',
    prompt: 'What is the product context — audience, platform, stage?',
    helper: 'Free-text. The more specific, the better the prototype.',
    type: 'text',
    preset: 'Growth-stage rideshare. Urban North America. iOS first, then Android.',
    blueprintFrom: (val) => (val || '').split('.').map(s => s.trim()).filter(Boolean),
  },
  {
    id: 'design',
    prompt: 'What design system or aesthetic should anchor it?',
    helper: 'A brand name, a style, or a few constraints. UX Scout will set the visual tone.',
    type: 'text',
    preset: 'Stripe-style restraint. Generous whitespace, single accent, no shadows.',
    blueprintFrom: (val) => (val || '').split('.').map(s => s.trim()).filter(Boolean),
  },
];

// ─── Screen — Guided Interview ───────────────────────────────
const ScreenInterview = ({ study, onComplete, onCancel }) => {
  const [step, setStep] = React.useState(0);
  const [answers, setAnswers] = React.useState(() =>
    INTERVIEW_QUESTIONS.map(q => q.type === 'text' ? q.preset : [...(q.presetSelection || [])])
  );

  const current = INTERVIEW_QUESTIONS[step];
  const isLast = step === INTERVIEW_QUESTIONS.length - 1;

  const onNext = () => {
    if (isLast) {
      onComplete(answers);
    } else {
      setStep(s => s + 1);
    }
  };
  const onBack = () => setStep(s => Math.max(0, s - 1));

  const setAnswer = (val) => {
    setAnswers(prev => prev.map((a, i) => i === step ? val : a));
  };
  const toggleChip = (v) => {
    setAnswers(prev => prev.map((a, i) => {
      if (i !== step) return a;
      const arr = Array.isArray(a) ? a : [];
      return arr.includes(v) ? arr.filter(x => x !== v) : [...arr, v];
    }));
  };

  // Blueprint accumulating
  const blueprint = INTERVIEW_QUESTIONS.map((q, i) => ({
    id: q.id,
    label: ['references','patterns','context','design system'][i],
    items: i <= step ? q.blueprintFrom(answers[i]) : [],
    revealed: i <= step,
  }));

  return (
    <div style={{ padding: '36px 48px 80px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Eyebrow style={{ color: S.amberGlow }}>guided interview · making the prototype yours</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
          <h1 style={{
            ...Stype.title, fontSize: 44, color: S.bone, margin: 0,
            letterSpacing: '-.02em', lineHeight: 1.05,
          }}>
            A few questions, then a prototype.
          </h1>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
            study: {study.short}
          </div>
        </div>

        {/* Progress */}
        <div style={{
          marginTop: 26,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          {INTERVIEW_QUESTIONS.map((q, i) => (
            <React.Fragment key={q.id}>
              <button
                onClick={() => setStep(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '6px 10px',
                  cursor: 'pointer',
                  opacity: i > step ? 0.4 : 1,
                }}
              >
                <span style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: `1px solid ${i <= step ? S.amberGlow : S.faint}`,
                  background: i < step ? S.amberGlow : 'transparent',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  color: '#1a1310', fontSize: 10,
                  boxShadow: i === step ? `0 0 14px ${S.amberGlow}` : 'none',
                }}>{i < step ? '✓' : ''}</span>
                <span style={{
                  ...Stype.body, fontSize: 12.5,
                  color: i === step ? S.bone : i < step ? S.soft : S.faint,
                }}>
                  {['references','patterns','context','design system'][i]}
                </span>
              </button>
              {i < INTERVIEW_QUESTIONS.length - 1 && (
                <span style={{ width: 24, height: 1, background: i < step ? S.amber : S.dim }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Body: left question / right blueprint */}
        <div style={{
          marginTop: 36,
          display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 48,
        }}>
          {/* LEFT — current question */}
          <div style={{ animation: 'fadeUp 400ms ease' }}>
            <Eyebrow style={{ color: S.amberGlow, fontSize: 10 }}>question {step + 1} of {INTERVIEW_QUESTIONS.length}</Eyebrow>
            <h2 style={{
              ...Stype.headline, fontSize: 30, color: S.bone, margin: '12px 0 8px', lineHeight: 1.15,
            }}>{current.prompt}</h2>
            <p style={{ ...Stype.reading, fontSize: 15, color: S.soft, margin: 0 }}>
              {current.helper}
            </p>

            {/* Input area */}
            <div style={{ marginTop: 28 }}>
              {current.type === 'chips' && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {current.options.map((opt) => {
                    const selected = (answers[step] || []).includes(opt.v);
                    return (
                      <button key={opt.v}
                        onClick={() => toggleChip(opt.v)}
                        style={{
                          cursor: 'pointer', whiteSpace: 'nowrap',
                          ...Stype.body, fontSize: 13.5, padding: '10px 18px', borderRadius: 999,
                          border: `1px solid ${selected ? S.amberGlow : S.rule}`,
                          color: selected ? S.bone : S.soft,
                          background: selected ? 'rgba(217,150,62,0.10)' : 'transparent',
                          boxShadow: selected ? `0 0 24px rgba(244,204,125,0.20)` : 'none',
                          transition: 'all 200ms ease',
                        }}
                      >{opt.label}</button>
                    );
                  })}
                </div>
              )}
              {current.type === 'text' && (
                <textarea
                  value={answers[step] || ''}
                  onChange={(e) => setAnswer(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%', resize: 'vertical',
                    background: 'rgba(20,23,28,0.55)',
                    border: 0, boxShadow: `0 0 0 1px ${S.threadStrong}`,
                    color: S.bone, padding: '18px 22px',
                    ...sf(18, 400, 95), fontSize: 17, lineHeight: 1.4, letterSpacing: '-.005em',
                    outline: 'none', minHeight: 120,
                  }}
                />
              )}
            </div>

            {/* Footer actions */}
            <div style={{
              marginTop: 36, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <Button variant="ghost" size="m" onClick={step === 0 ? onCancel : onBack}>
                {step === 0 ? '← Back to study' : '← Previous'}
              </Button>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Button variant="link" size="m" onClick={() => onComplete(answers)}>
                  Skip & generate now
                </Button>
                <Button variant="primary" size="m" trailing="→" onClick={onNext}>
                  {isLast ? 'Generate prompt' : 'Next question'}
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT — blueprint assembling */}
          <div style={{
            background: 'rgba(20,23,28,0.55)',
            boxShadow: `0 0 0 1px ${S.hairline}`,
            padding: '24px 26px',
            position: 'sticky', top: 90,
            alignSelf: 'flex-start',
            display: 'flex', flexDirection: 'column', gap: 22,
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: `1px solid ${S.rule}`, paddingBottom: 14,
            }}>
              <Eyebrow style={{ color: S.amberGlow }}>brief · assembling</Eyebrow>
              <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>
                {step} of {INTERVIEW_QUESTIONS.length}
              </span>
            </div>
            {blueprint.map((b) => (
              <div key={b.id} style={{
                opacity: b.revealed ? 1 : 0.35,
                transition: 'opacity 400ms',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: b.revealed && b.items.length ? S.amberGlow : 'transparent',
                    border: `1px solid ${b.revealed && b.items.length ? S.amberGlow : S.faint}`,
                    boxShadow: b.revealed && b.items.length ? `0 0 12px ${S.amberGlow}` : 'none',
                  }} />
                  <div style={{ ...Stype.micro, fontSize: 9, color: b.revealed ? S.amberGlow : S.faint }}>
                    {b.label}
                  </div>
                </div>
                <div style={{ paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {b.items.length > 0 ? b.items.map((it, j) => (
                    <div key={j} style={{ ...Stype.body, fontSize: 13.5, color: S.bone }}>{it}</div>
                  )) : (
                    <div style={{ ...Stype.body, fontSize: 13, color: S.faint, fontStyle: 'normal' }}>
                      — pending —
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Build prompt from answers ───────────────────────────────
const buildPrompt = (answers, study) => {
  const refLabels = {
    uber: "Uber's map-first opening",
    lyft: "Lyft's deferred signup",
    bolt: "Bolt's payment-after-ride",
    didi: "Didi's tier transparency",
    grab: "Grab's promo entry",
  };
  const ptLabels = {
    mapFirst: 'Map-first opening · interactive map visible on launch',
    phoneOnly: 'Phone-only auth via SMS code · no password, no email',
    deferSignup: 'Defer signup until the user pins a destination',
    noTutorial: 'No tutorial. No walkthrough.',
    inlineValid: 'Inline validation, never modal',
    darkOk: 'Dark mode ready · honor system preference',
  };

  const refs = (answers[0] || []).map(v => '  · ' + (refLabels[v] || v)).join('\n');
  const pts = (answers[1] || []).map(v => '  · ' + (ptLabels[v] || v)).join('\n');
  const context = (answers[2] || '').trim();
  const design = (answers[3] || '').trim();

  return `Build a ${study.industry} ${study.touchpoint} flow with these decisions:

References to draw from:
${refs}

Required UX patterns:
${pts}

Product context:
  ${context}

Design system constraints:
  ${design}

Stack: React + Tailwind. Output 4 screens:
  1) Map + destination input
  2) Destination confirmed + ETA + signup
  3) SMS code verification
  4) En-route trip status`;
};

// ─── Screen — Prototype Prompt ───────────────────────────────
const ScreenPrototype = ({ study, answers, onBack, onReopen }) => {
  const prompt = buildPrompt(answers, study);
  const [copied, setCopied] = React.useState(false);
  const onCopy = () => {
    try {
      navigator.clipboard?.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (e) { /* ignore */ }
  };

  return (
    <div style={{ padding: '36px 48px 80px', minHeight: 'calc(100vh - 64px)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Eyebrow style={{ color: S.amberGlow }}>prototype prompt · ready</Eyebrow>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14 }}>
          <h1 style={{
            ...Stype.title, fontSize: 48, color: S.bone, margin: 0,
            letterSpacing: '-.025em', lineHeight: 1.0,
          }}>
            Your prototype prompt.
          </h1>
          <div style={{ ...Stype.body, fontSize: 13, color: S.soft }}>
            {prompt.split('\n').length} lines · ~ {Math.ceil(prompt.length / 5)} tokens
          </div>
        </div>

        <div style={{
          marginTop: 32,
          background: `linear-gradient(180deg, rgba(48,40,28,0.55) 0%, rgba(35,31,24,0.65) 100%)`,
          boxShadow: `0 0 0 1px rgba(244,204,125,0.40), 0 36px 80px -22px rgba(0,0,0,0.6), 0 0 140px -30px rgba(217,150,62,0.40)`,
          padding: '28px 36px',
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
            maxHeight: 360, overflow: 'auto',
          }}>{prompt}</pre>

          <div style={{
            marginTop: 26, paddingTop: 20, borderTop: `1px solid ${S.rule}`,
            display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap',
          }}>
            <Button variant="primary" size="m" icon={copied ? '✓' : '⎘'} onClick={onCopy}>
              {copied ? 'Copied' : 'Copy prompt'}
            </Button>
            <Button variant="secondary" size="m" trailing="↗">Open in Lovable</Button>
            <Button variant="secondary" size="m" trailing="↗">Open in Bolt</Button>
            <Button variant="secondary" size="m" trailing="↗">Open in v0</Button>
            <div style={{ flex: 1 }} />
            <Button variant="link" size="m" onClick={onReopen}>Refine the brief →</Button>
          </div>
        </div>

        <div style={{
          marginTop: 40, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18,
        }}>
          <div style={{ padding: 22, background: 'rgba(30,34,40,0.4)', boxShadow: `0 0 0 1px ${S.hairline}` }}>
            <Eyebrow style={{ color: S.faint }}>next</Eyebrow>
            <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.bone, marginTop: 8 }}>
              Share with your team
            </div>
            <div style={{ ...Stype.body, fontSize: 13, color: S.soft, marginTop: 6, lineHeight: 1.5 }}>
              Send a read-only link to the study and this prompt.
            </div>
            <Button variant="link" size="s" style={{ marginTop: 12 }} trailing="↗">Copy share link</Button>
          </div>
          <div style={{ padding: 22, background: 'rgba(30,34,40,0.4)', boxShadow: `0 0 0 1px ${S.hairline}` }}>
            <Eyebrow style={{ color: S.faint }}>iterate</Eyebrow>
            <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.bone, marginTop: 8 }}>
              Generate a variant
            </div>
            <div style={{ ...Stype.body, fontSize: 13, color: S.soft, marginTop: 6, lineHeight: 1.5 }}>
              Same brief, different design system or product context.
            </div>
            <Button variant="link" size="s" style={{ marginTop: 12 }} trailing="→">New variant</Button>
          </div>
          <div style={{ padding: 22, background: 'rgba(30,34,40,0.4)', boxShadow: `0 0 0 1px ${S.hairline}` }}>
            <Eyebrow style={{ color: S.faint }}>study</Eyebrow>
            <div style={{ ...Stype.bodyMed, fontSize: 15, color: S.bone, marginTop: 8 }}>
              Back to the report
            </div>
            <div style={{ ...Stype.body, fontSize: 13, color: S.soft, marginTop: 6, lineHeight: 1.5 }}>
              Review the patterns, recommendations, and evidence again.
            </div>
            <Button variant="link" size="s" style={{ marginTop: 12 }} onClick={onBack} trailing="←">Back to study</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

window.ScreenInterview = ScreenInterview;
window.ScreenPrototype = ScreenPrototype;
window.INTERVIEW_QUESTIONS = INTERVIEW_QUESTIONS;
