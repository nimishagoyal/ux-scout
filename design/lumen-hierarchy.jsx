// LUMEN — I.D (Hierarchy) + I.E (Adaptive focus).

// ─────────────────────────────────────────────────────────────
// I.D · RECOMMENDATION HIERARCHY
// Strongest dominates by scale + luminosity. Tentative recedes.
// Each recommendation carries its own constellation of evidence.
// ─────────────────────────────────────────────────────────────

const RecommendationCard = ({ size, headline, accent, evidence, x, y, scale = 1 }) => {
  const aColor = accent === 'amber' ? L.amberGlow : accent === 'cobalt' ? L.cobaltGlow : L.soft;
  const w = size === 'lg' ? 480 : size === 'md' ? 340 : 240;
  const lit = size === 'lg';
  const dim = size === 'sm';

  return (
    <div style={{
      position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${scale})`,
      width: w, zIndex: lit ? 5 : 4,
    }}>
      {lit && <Halo x="50%" y="50%" w={620} h={420} color="rgba(217,150,62,0.32)" blur={130} />}

      <div style={{
        position: 'relative',
        padding: lit ? '28px 30px' : dim ? '16px 18px' : '20px 22px',
        background: lit
          ? `linear-gradient(135deg, rgba(48,40,28,0.92) 0%, rgba(35,31,24,0.95) 100%)`
          : dim
            ? `linear-gradient(135deg, rgba(25,28,32,0.6) 0%, rgba(20,23,28,0.65) 100%)`
            : `linear-gradient(135deg, rgba(30,34,40,0.85) 0%, rgba(22,25,30,0.9) 100%)`,
        boxShadow: lit
          ? `0 0 0 1px rgba(244,204,125,0.45), 0 30px 90px -20px rgba(0,0,0,0.85), 0 0 120px -20px rgba(217,150,62,0.55)`
          : dim
            ? `0 0 0 1px rgba(232,227,210,0.06), 0 10px 26px -10px rgba(0,0,0,0.6)`
            : `0 0 0 1px rgba(232,227,210,0.12), 0 22px 50px -16px rgba(0,0,0,0.7)`,
        opacity: dim ? 0.7 : 1,
        animation: lit ? 'lumen-breath 6s ease-in-out infinite' : 'none',
      }}>
        <div style={{ ...Ltype.micro, color: aColor, fontSize: lit ? 10 : 9.5 }}>
          {lit ? 'recommendation · primary' : dim ? 'tentative' : 'recommendation · secondary'}
        </div>
        <div style={{
          ...Ltype.marquee, color: L.bone,
          fontSize: lit ? 40 : dim ? 18 : 24,
          marginTop: lit ? 14 : 8, lineHeight: 1.05, letterSpacing: '-.015em',
        }}>
          {headline}
        </div>
        {!dim && (
          <div style={{ ...Ltype.reading, fontSize: lit ? 14.5 : 13, color: L.ink, marginTop: 12, lineHeight: 1.6, fontWeight: 300 }}>
            {evidence.note}
          </div>
        )}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginTop: lit ? 18 : 12, paddingTop: 10, borderTop: `1px solid ${L.rule}`,
        }}>
          <div style={{ ...Ltype.italic, fontSize: lit ? 13 : 11.5, color: aColor }}>
            {evidence.count} · {evidence.label}
          </div>
          {!dim && <div style={{ ...Ltype.italic, fontSize: 12, color: L.bone }}>open ↗</div>}
        </div>
      </div>
    </div>
  );
};

// Tiny supporting plates clustered around a recommendation card.
const EvidenceConstellation = ({ cx, cy, refs, accent = 'amber', faint = false }) => {
  const aColor = accent === 'amber' ? L.amberGlow : accent === 'cobalt' ? L.cobaltGlow : L.soft;
  return (
    <>
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2 }}>
        {refs.map((r,i) => (
          <line key={i} x1={`${r.x}%`} y1={`${r.y}%`} x2={cx} y2={cy}
            stroke={faint ? L.threadFaint : L.threadStrong}
            strokeOpacity={faint ? 0.5 : 0.8}
            strokeWidth={faint ? 0.6 : (i < 2 ? 1.1 : 0.7)}
            strokeDasharray={i % 3 === 0 ? '2 5' : 'none'} />
        ))}
      </svg>
      {refs.map((r,i) => (
        <Plate key={i} x={`${r.x}%`} y={`${r.y}%`}
          w={r.w || (faint ? 70 : 100)} h={r.h || (faint ? 50 : 72)}
          rot={r.rot || 0} kind={r.k || 'form'} accent={accent}
          source={r.s} dim={faint} animateDelay={i * 0.4} />
      ))}
    </>
  );
};

const Lumen_Hierarchy = () => Lwrap(
  <div style={{ position: 'relative', height: '100%', width: '100%' }}>

    {/* Atmosphere */}
    <Halo x="60%" y="48%" w={900} h={620} color="rgba(217,150,62,0.18)" blur={170} />
    <Halo x="18%" y="22%" w={400} h={300} color="rgba(79,115,174,0.10)" blur={120} />

    {/* Top chrome */}
    <div style={{ position: 'absolute', top: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', zIndex: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 20px ${L.amberGlow}` }} />
        <div style={{ ...Ltype.italic, fontSize: 17, color: L.bone }}>Lumen</div>
        {Lmicro('· rideshare · onboarding · recommend', L.soft)}
      </div>
      <div style={{ display: 'flex', gap: 20 }}>
        {Lmicro('Read', L.soft)}
        {Lmicro('Cluster', L.soft)}
        {Lmicro('Recommend', L.amberGlow)}
        {Lmicro('Notes', L.soft)}
      </div>
    </div>

    {/* Title region — small, top-left */}
    <div style={{ position: 'absolute', top: 78, left: 44, maxWidth: 480, zIndex: 5 }}>
      {Lmicro('three suggestions · in order of confidence', L.amberGlow)}
      <div style={{ ...Ltype.marquee, fontSize: 56, color: L.bone, marginTop: 12, lineHeight: 1 }}>
        What I'd <span style={{ ...Ltype.italic, color: L.amberGlow }}>try</span> next.
      </div>
      <div style={{ ...Ltype.readingI, fontSize: 14, color: L.soft, marginTop: 10 }}>
        Sized to the evidence. The largest is the one I'd run a meeting on.
      </div>
    </div>

    {/* PRIMARY recommendation — large, center-right, lit */}
    <RecommendationCard
      size="lg" accent="amber"
      x="62%" y="48%"
      headline={<>Show the map <span style={{ ...Ltype.italic, color: L.amberGlow }}>before</span> the signup gate.</>}
      evidence={{
        count: '9 of 142',
        label: 'strong · highly consistent',
        note: 'Across the nine fastest flows, an interactive map appears before any commitment is asked of the user. The signup gate moves to the moment of action — when they tap a destination — not before.',
      }}
    />

    {/* PRIMARY constellation — large plates surrounding it */}
    <EvidenceConstellation cx="62%" cy="48%" accent="amber" refs={[
      { x: 48, y: 24, k: 'form',   s: 'lyft · A-01',  rot: -3, w: 124, h: 88 },
      { x: 80, y: 26, k: 'cards',  s: 'didi · A-02',  rot: 2,  w: 116, h: 82 },
      { x: 86, y: 50, k: 'detail', s: 'uber · A-03',  rot: -2, w: 110, h: 78 },
      { x: 84, y: 76, k: 'list',   s: 'grab · A-04',  rot: 3,  w: 110, h: 78 },
      { x: 50, y: 76, k: 'form',   s: 'bolt · A-05',  rot: -4, w: 110, h: 78 },
    ]} />

    {/* SECONDARY — medium, lower-left */}
    <RecommendationCard
      size="md" accent="cobalt"
      x="22%" y="68%"
      headline={<>Surface the <span style={{ ...Ltype.italic, color: L.cobaltGlow }}>driver ETA</span> before account creation.</>}
      evidence={{
        count: '6 of 142',
        label: 'strong',
        note: 'Half a dozen apps show a nearby car and an estimate before the email field. The trust earned is measurable in retention.',
      }}
    />

    {/* SECONDARY constellation */}
    <EvidenceConstellation cx="22%" cy="68%" accent="cobalt" refs={[
      { x: 6,  y: 56, k: 'detail', s: 'lyft · B-01',  rot: 2,  w: 92, h: 64 },
      { x: 8,  y: 78, k: 'form',   s: 'kapten · B-02', rot: -3, w: 92, h: 64 },
      { x: 36, y: 84, k: 'cards',  s: 'cabify · B-03', rot: 1,  w: 92, h: 64 },
    ]} />

    {/* TENTATIVE — small, far-right corner, dim */}
    <RecommendationCard
      size="sm" accent="soft"
      x="89%" y="86%"
      headline={<>Visible <span style={{ ...Ltype.italic }}>license &amp; plate</span> at pickup.</>}
      evidence={{ count: '3 of 142', label: 'tentative' }}
    />
    <EvidenceConstellation cx="89%" cy="86%" accent="soft" faint refs={[
      { x: 92, y: 74, k: 'form', s: 'didi · C-01', rot: -2 },
      { x: 96, y: 92, k: 'list', s: 'uber · C-02', rot: 3 },
    ]} />

    {/* Inter-recommendation threads — semantic links */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      <path d="M 24% 64% Q 42% 52%, 56% 50%" fill="none"
        stroke={L.threadFaint} strokeDasharray="2 6" strokeWidth="0.8" />
    </svg>

    {/* Editor's note — italic, floating top-right */}
    <div style={{ position: 'absolute', top: 86, right: 44, maxWidth: 240, zIndex: 5 }}>
      <div style={{ ...Ltype.italic, fontSize: 14, color: L.amberGlow, lineHeight: 1.45, animation: 'lumen-breath 6s ease-in-out infinite' }}>
        "Most of this is one change pretending to be three. The first will tell you what the others want to be."
      </div>
      <div style={{ ...Ltype.micro, marginTop: 8, color: L.amber, fontSize: 9 }}>— margin · medium confidence</div>
    </div>

    {/* Bottom — synthesis pass complete */}
    <div style={{ position: 'absolute', bottom: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        {Lmicro('synthesis', L.faint)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {['scan','cluster','recommend'].map((s,i) => (
            <React.Fragment key={s}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: L.amberGlow, boxShadow: i===2 ? `0 0 18px ${L.amberGlow}` : 'none' }} />
              <div style={{ ...Ltype.italic, fontSize: 13.5, color: L.bone }}>{s}</div>
              {i < 2 && <div style={{ width: 32, height: 1, background: L.threadStrong, opacity: .35 }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {Lmicro('pass 3 of 3 · settled · 11 min · 142 refs', L.amberGlow)}
        <div style={{ ...Ltype.italic, fontSize: 13, color: L.soft, marginTop: 4 }}>send to studio · share · save</div>
      </div>
    </div>
  </div>,
  { pad: 0 }
);

// ─────────────────────────────────────────────────────────────
// I.E · ADAPTIVE FOCUS — clicking an insight rearranges the world.
// The chosen recommendation moves to center stage; the evidence
// chain unfurls; everything else recedes.
// ─────────────────────────────────────────────────────────────

const Lumen_AdaptiveFocus = () => Lwrap(
  <div style={{ position: 'relative', height: '100%', width: '100%' }}>

    {/* Heavy amber light from above-left — focus is lit */}
    <Halo x="50%" y="42%" w={1100} h={620} color="rgba(217,150,62,0.22)" blur={180} />

    {/* Receded background — other recs are blurred ghosts */}
    <div aria-hidden="true" style={{
      position: 'absolute', left: '10%', top: '20%', width: 240, padding: 14,
      background: 'rgba(30,34,40,0.4)', opacity: 0.18, filter: 'blur(2px)',
      transform: 'scale(0.85) rotate(-2deg)',
    }}>
      <div style={{ ...Ltype.marquee, fontSize: 16, color: L.ink }}>Surface the driver ETA</div>
      <div style={{ ...Ltype.micro, fontSize: 9, color: L.faint, marginTop: 6 }}>recommendation · ii</div>
    </div>
    <div aria-hidden="true" style={{
      position: 'absolute', right: '8%', top: '76%', width: 200, padding: 12,
      background: 'rgba(30,34,40,0.4)', opacity: 0.12, filter: 'blur(2.5px)',
      transform: 'scale(0.75) rotate(2deg)',
    }}>
      <div style={{ ...Ltype.marquee, fontSize: 14, color: L.faint }}>Visible license</div>
    </div>

    {/* Top chrome */}
    <div style={{ position: 'absolute', top: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', zIndex: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 20px ${L.amberGlow}` }} />
        <div style={{ ...Ltype.italic, fontSize: 17, color: L.bone }}>Lumen</div>
        {Lmicro('· rideshare · onboarding ·  i. show the map before signup', L.soft)}
      </div>
      <div style={{ ...Ltype.italic, fontSize: 13, color: L.amberGlow }}>
        ← back to the constellation
      </div>
    </div>

    {/* The focused recommendation — centered, large */}
    <div style={{
      position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%,-50%)',
      width: 640, padding: '34px 40px', zIndex: 5,
      background: `linear-gradient(135deg, rgba(48,40,28,0.92) 0%, rgba(35,31,24,0.95) 100%)`,
      boxShadow: `0 0 0 1px rgba(244,204,125,0.50), 0 40px 120px -20px rgba(0,0,0,0.85), 0 0 160px -30px rgba(217,150,62,0.6)`,
      animation: 'lumen-breath 7s ease-in-out infinite',
    }}>
      <div style={{ ...Ltype.micro, color: L.amberGlow }}>i · primary · in focus</div>
      <div style={{ ...Ltype.marquee, fontSize: 56, color: L.bone, marginTop: 14, lineHeight: 1.02, letterSpacing: '-.02em' }}>
        Show the map <span style={{ ...Ltype.italic, color: L.amberGlow }}>before</span> the signup gate.
      </div>
      <div style={{ ...Ltype.reading, fontSize: 16, color: L.ink, marginTop: 16, lineHeight: 1.55, fontWeight: 300, maxWidth: 540 }}>
        The fastest nine flows put an interactive map up before any account commitment. The signup gate becomes the moment a destination is tapped — the most invested moment in the entire onboarding.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 22, paddingTop: 14, borderTop: `1px solid ${L.rule}` }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <Chip accent="amber">9 of 142 refs</Chip>
          <Chip accent="amber">strong</Chip>
          <Chip accent="cobalt">small change</Chip>
        </div>
        <div style={{ ...Ltype.italic, fontSize: 14, color: L.amberGlow }}>add to studio →</div>
      </div>
    </div>

    {/* Evidence chain — unfurls below, in a horizontal sequence */}
    <div style={{
      position: 'absolute', left: 44, right: 44, bottom: 110, zIndex: 5,
      display: 'flex', flexDirection: 'column', gap: 14,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        {Lmicro('evidence chain · five strongest', L.amberGlow)}
        {Lmicro('see all 9 ↗', L.soft)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, position: 'relative' }}>
        {/* Connecting line under the row */}
        <svg style={{ position: 'absolute', left: 0, right: 0, top: '50%', height: 2, width: '100%', pointerEvents: 'none' }}>
          <line x1="2%" y1="1" x2="98%" y2="1" stroke={L.threadStrong} strokeDasharray="3 6" strokeWidth="1" strokeOpacity="0.5" />
        </svg>
        {[
          { app: 'lyft',  k: 'form',   gesture: 'map · then destination · then signup' },
          { app: 'didi',  k: 'cards',  gesture: 'map + nearby cars · signup at pickup' },
          { app: 'uber',  k: 'detail', gesture: 'destination tap · then phone' },
          { app: 'grab',  k: 'list',   gesture: 'map first · login deferred' },
          { app: 'bolt',  k: 'form',   gesture: 'map · pickup tap · then signup' },
        ].map((r,i) => (
          <div key={r.app} style={{ position: 'relative' }}>
            <div style={{
              height: 122, padding: 6, position: 'relative', boxSizing: 'border-box',
              background: L.raisedWarm,
              boxShadow: `0 0 0 1px rgba(244,204,125,0.18), 0 18px 30px -14px rgba(0,0,0,0.6)`,
            }}>
              <RefScreenshot palette={{ bg: L.raised, ink: L.bone, mute: L.dim, accent: L.amberGlow }} kind={r.k} />
              <div style={{ position: 'absolute', top: 6, left: 8, ...Ltype.micro, fontSize: 8, color: L.amberGlow, letterSpacing: '.18em' }}>{i+1}.</div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div style={{ ...Ltype.italic, fontSize: 15, color: L.bone }}>{r.app}</div>
              <div style={{ ...Ltype.readingI, fontSize: 11.5, color: L.soft, marginTop: 2, lineHeight: 1.4 }}>{r.gesture}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* AI marginalia — floating, anticipates next move */}
    <div style={{ position: 'absolute', left: 44, top: 280, maxWidth: 220, zIndex: 4 }}>
      <div style={{ ...Ltype.italic, fontSize: 14, color: L.cobaltGlow, lineHeight: 1.45, opacity: .85, animation: 'lumen-breath 6s ease-in-out infinite' }}>
        "When you add this to the studio, ii. and iii. will reflow — they may not be needed."
      </div>
      <div style={{ ...Ltype.micro, fontSize: 9, color: L.soft, marginTop: 6 }}>— margin · anticipating</div>
    </div>

    {/* Bottom — adaptive status */}
    <div style={{ position: 'absolute', bottom: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 6 }}>
      <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
        {Lmicro('focus mode · everything else dims', L.amberGlow)}
        <span style={{ ...Ltype.italic, fontSize: 13, color: L.soft }}>esc to lift</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
        <span style={{ ...Ltype.italic, fontSize: 13, color: L.bone }}>← prev recommendation</span>
        <span style={{ ...Ltype.italic, fontSize: 13, color: L.bone }}>next recommendation →</span>
      </div>
    </div>
  </div>,
  { pad: 0 }
);

window.Lumen_Hierarchy = Lumen_Hierarchy;
window.Lumen_AdaptiveFocus = Lumen_AdaptiveFocus;
