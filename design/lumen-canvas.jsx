// LUMEN — I.B (Canvas at rest) + I.C (Mid-synthesis showpiece).
// The cinematic spatial environment in two moments in time.

// ─────────────────────────────────────────────────────────────
// I.B · CANVAS AT REST — establishing shot, before the question lands
// ─────────────────────────────────────────────────────────────
const Lumen_CanvasAtRest = () => Lwrap(
  <div style={{ position: 'relative', height: '100%', width: '100%' }}>

    {/* Atmosphere — two light wells + cobalt counter */}
    <Halo x="20%" y="22%" w={620} h={420} color="rgba(217,150,62,0.20)" blur={140} />
    <Halo x="78%" y="78%" w={520} h={360} color="rgba(79,115,174,0.16)" blur={140} />

    {/* Top chrome — minimal */}
    <div style={{ position: 'absolute', top: 36, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 22px ${L.amberGlow}`, animation: 'lumen-pulse 3.2s ease-in-out infinite' }} />
        <div style={{ ...Ltype.italic, fontSize: 17, color: L.bone, letterSpacing: '-.005em' }}>Lumen</div>
        <div style={{ ...Ltype.micro, fontSize: 10 }}>· rideshare · onboarding</div>
      </div>
      <div style={{ display: 'flex', gap: 22, alignItems: 'baseline' }}>
        {Lmicro('Read', L.bone)}
        {Lmicro('Cluster', L.soft)}
        {Lmicro('Notes', L.soft)}
        <div style={{ ...Ltype.italic, fontSize: 12, color: L.amberGlow }}>· you</div>
      </div>
    </div>

    {/* Drifting background reference shapes — faint, out of focus */}
    {[
      { x: '8%',  y: '64%', rot: -4, w: 110, h: 76, kind: 'list',   d: 0,   blur: .8, op: 0.18 },
      { x: '14%', y: '78%', rot: 3,  w: 96,  h: 70, kind: 'cards',  d: 1.2, blur: .6, op: 0.20 },
      { x: '86%', y: '22%', rot: -2, w: 120, h: 84, kind: 'form',   d: .6,  blur: 1,  op: 0.16 },
      { x: '92%', y: '42%', rot: 5,  w: 100, h: 72, kind: 'detail', d: 2,   blur: 1.4,op: 0.12 },
      { x: '4%',  y: '38%', rot: 6,  w: 88,  h: 64, kind: 'list',   d: 1.5, blur: 1.2,op: 0.14 },
      { x: '74%', y: '92%', rot: -3, w: 96,  h: 70, kind: 'cards',  d: 0.8, blur: .8, op: 0.18 },
    ].map((r,i) => (
      <div key={i} style={{
        position: 'absolute', left: r.x, top: r.y, width: r.w, height: r.h, transform: `rotate(${r.rot}deg)`,
        opacity: r.op, filter: `blur(${r.blur}px)`,
        animation: 'lumen-drift 16s ease-in-out infinite',
        animationDelay: `${r.d}s`,
        boxShadow: `0 0 0 1px rgba(232,227,210,0.06), 0 12px 28px -14px rgba(0,0,0,0.8)`,
        padding: 4, boxSizing: 'border-box', background: L.raisedWarm,
      }}>
        <RefScreenshot palette={{ bg: L.raised, ink: L.bone, mute: L.dim, accent: L.amber }} kind={r.kind} />
      </div>
    ))}

    {/* Floating motes / particles */}
    <Mote x="32%" y="42%" delay={0} size={2} />
    <Mote x="58%" y="32%" delay={1.2} size={3} color={L.cobaltGlow} opacity={0.4} />
    <Mote x="70%" y="58%" delay={0.6} size={2} />
    <Mote x="42%" y="68%" delay={2} size={2} opacity={0.3} />
    <Mote x="22%" y="50%" delay={1.6} size={3} color={L.warmLight} opacity={0.5} />

    {/* The question — the centerpiece */}
    <div style={{ position: 'absolute', left: '50%', top: '46%', transform: 'translate(-50%,-50%)', textAlign: 'center', width: '70%', zIndex: 4 }}>
      <div style={{ ...Ltype.micro, color: L.amberGlow }}>tonight's question</div>
      <div style={{ ...Ltype.italic, fontSize: 78, color: L.bone, lineHeight: 1.05, marginTop: 18, letterSpacing: '-.02em' }}>
        "Onboarding for a <span style={{ color: L.amberGlow }}>rideshare</span> app —<br />
        how do we shorten the path to <span style={{ color: L.cobaltGlow }}>first ride</span>?"
      </div>
      <div style={{ marginTop: 26, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.amberGlow, animation: 'lumen-pulse 1.4s ease-in-out infinite', boxShadow: `0 0 12px ${L.amberGlow}` }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.amberGlow, opacity: .6, animation: 'lumen-pulse 1.4s ease-in-out infinite', animationDelay: '0.3s' }} />
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: L.amberGlow, opacity: .35, animation: 'lumen-pulse 1.4s ease-in-out infinite', animationDelay: '0.6s' }} />
        </div>
        <div style={{ ...Ltype.italic, fontSize: 16, color: L.ink }}>reading 142 flows · across 38 apps · 9 minutes ago</div>
      </div>
    </div>

    {/* Scan band — subtle horizontal sweep */}
    <div style={{
      position: 'absolute', top: '46%', left: 0, right: 0, height: 80, transform: 'translateY(-50%)',
      background: `linear-gradient(90deg, transparent 0%, rgba(244,224,180,0.04) 50%, transparent 100%)`,
      width: '40%', animation: 'lumen-scan 7s ease-in-out infinite', pointerEvents: 'none', zIndex: 1,
    }} />

    {/* Bottom — spatial nav + status */}
    <div style={{ position: 'absolute', bottom: 36, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 5 }}>
      <div>
        {Lmicro('Field of view', L.faint)}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginTop: 6 }}>
          <span style={{ ...Ltype.italic, fontSize: 15, color: L.bone }}>rideshare</span>
          <span style={{ ...Ltype.micro, fontSize: 9, color: L.faint }}>·</span>
          <span style={{ ...Ltype.italic, fontSize: 15, color: L.soft }}>mobility</span>
          <span style={{ ...Ltype.micro, fontSize: 9, color: L.faint }}>·</span>
          <span style={{ ...Ltype.italic, fontSize: 15, color: L.soft }}>marketplaces</span>
          <span style={{ ...Ltype.italic, fontSize: 14, color: L.amberGlow, marginLeft: 10 }}>+ widen ↗</span>
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {Lmicro('pass 1 of 3 · ambient scan', L.amberGlow)}
        <div style={{ ...Ltype.italic, fontSize: 15, color: L.ink, marginTop: 6 }}>
          waiting for the patterns to <span style={{ color: L.amberGlow }}>emerge</span>…
        </div>
      </div>
    </div>
  </div>,
  { pad: 0 }
);

// ─────────────────────────────────────────────────────────────
// I.C · MID-SYNTHESIS — the populated canvas, clusters, crystallized insight
// ─────────────────────────────────────────────────────────────

// Cluster of refs around an insight. Positioned absolutely.
const Cluster = ({ cx, cy, label, count, accent, refs, lit = false }) => {
  const aColor = accent === 'amber' ? L.amberGlow : accent === 'cobalt' ? L.cobaltGlow : L.warmLight;
  return (
    <>
      {/* Halo behind cluster */}
      {lit && <Halo x={cx} y={cy} w={420} h={300} color={`${aColor}33`} blur={90} />}

      {/* Threads from refs to center (SVG layer) */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
        {refs.map((r,i) => (
          <line key={i}
            x1={`${r.x}%`} y1={`${r.y}%`}
            x2={cx} y2={cy}
            stroke={lit ? L.threadStrong : L.threadFaint}
            strokeWidth={lit && i < 2 ? 1.1 : 0.7}
            strokeDasharray={i % 3 === 0 ? '2 5' : 'none'}
          />
        ))}
      </svg>

      {/* Refs */}
      {refs.map((r,i) => (
        <Plate key={i} x={`${r.x}%`} y={`${r.y}%`} w={r.w || 116} h={r.h || 80}
          rot={r.rot || 0} kind={r.k || 'form'} accent={accent}
          source={r.s} active={lit && i === 0} animateDelay={i * 0.3} />
      ))}

      {/* Center label */}
      <div style={{
        position: 'absolute', left: cx, top: cy, transform: 'translate(-50%,-50%)',
        textAlign: 'center', zIndex: 3,
      }}>
        <div style={{
          ...Ltype.italic, fontSize: lit ? 22 : 18, color: lit ? L.bone : L.ink,
          maxWidth: 240, lineHeight: 1.2,
          textShadow: lit ? `0 0 24px ${aColor}88` : 'none',
        }}>{label}</div>
        <div style={{ ...Ltype.micro, marginTop: 6, fontSize: 9.5, color: lit ? aColor : L.soft }}>
          {count} refs · {lit ? 'crystallizing' : 'gathering'}
        </div>
      </div>
    </>
  );
};

const Lumen_MidSynthesis = () => Lwrap(
  <div style={{ position: 'relative', height: '100%', width: '100%' }}>

    {/* Atmosphere */}
    <Halo x="62%" y="48%" w={780} h={520} color="rgba(217,150,62,0.18)" blur={160} />
    <Halo x="20%" y="78%" w={420} h={300} color="rgba(79,115,174,0.14)" blur={120} />

    {/* Top chrome */}
    <div style={{ position: 'absolute', top: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', zIndex: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 9, height: 9, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 20px ${L.amberGlow}`, animation: 'lumen-pulse 3s ease-in-out infinite' }} />
        <div style={{ ...Ltype.italic, fontSize: 17, color: L.bone }}>Lumen</div>
        {Lmicro('· rideshare · onboarding · the path to first ride', L.soft)}
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'baseline' }}>
        {Lmicro('Read', L.soft)}
        {Lmicro('Cluster', L.amberGlow)}
        {Lmicro('Notes', L.soft)}
      </div>
    </div>

    {/* The question, smaller, top-left */}
    <div style={{ position: 'absolute', top: 88, left: 44, maxWidth: 460, zIndex: 5 }}>
      {Lmicro('your question', L.amberGlow)}
      <div style={{ ...Ltype.italic, fontSize: 32, color: L.bone, lineHeight: 1.15, marginTop: 10 }}>
        "How do we shorten the path to <span style={{ color: L.amberGlow }}>first ride</span>?"
      </div>
      <div style={{ ...Ltype.readingI, fontSize: 14, color: L.soft, marginTop: 10 }}>
        142 flows read · 38 apps · three patterns lifting
      </div>
    </div>

    {/* CLUSTERS in space */}

    {/* Cluster A — STRONGEST, lit. Top-right region. */}
    <Cluster
      cx="68%" cy="40%" lit accent="amber" count={9}
      label='"First action under 8 seconds."'
      refs={[
        { x: 78, y: 22, k: 'form',   s: 'lyft · A-01', rot: -3, w: 130, h: 90 },
        { x: 84, y: 38, k: 'cards',  s: 'didi · A-02', rot: 2,  w: 116, h: 80 },
        { x: 80, y: 56, k: 'list',   s: 'grab · A-04', rot: -2, w: 110, h: 78 },
        { x: 62, y: 22, k: 'detail', s: 'uber · A-03', rot: 1,  w: 116, h: 80 },
        { x: 58, y: 56, k: 'form',   s: 'bolt · A-05', rot: -4, w: 110, h: 78 },
        { x: 56, y: 40, k: 'cards',  s: 'ola · A-06',  rot: 3,  w: 100, h: 70 },
      ]}
    />

    {/* Cluster B — MEDIUM. Bottom-left. */}
    <Cluster
      cx="26%" cy="70%" accent="cobalt" count={6}
      label='"Driver ETA visible before signup."'
      refs={[
        { x: 14, y: 56, k: 'detail', s: 'lyft · B-01', rot: 2,  w: 110, h: 76 },
        { x: 12, y: 78, k: 'form',   s: 'kapten · B-02', rot: -3, w: 104, h: 72 },
        { x: 30, y: 86, k: 'cards',  s: 'cabify · B-03', rot: 1,  w: 110, h: 76 },
        { x: 38, y: 64, k: 'list',   s: 'grab · B-04',  rot: -2, w: 100, h: 72 },
      ]}
    />

    {/* Cluster C — TENTATIVE. Faint, far-right. */}
    <Cluster
      cx="86%" cy="78%" accent="soft" count={3}
      label='"Trust gestures: license, plate."'
      refs={[
        { x: 92, y: 64, k: 'form',   s: 'didi · C-01', rot: -2, w: 86,  h: 60 },
        { x: 94, y: 86, k: 'list',   s: 'uber · C-02', rot: 3,  w: 86,  h: 60 },
      ]}
    />

    {/* Inter-cluster threads, semantic links */}
    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
      <line x1="36%" y1="64%" x2="58%" y2="46%" stroke={L.threadFaint} strokeDasharray="2 6" strokeWidth="0.7" />
      <line x1="78%" y1="60%" x2="84%" y2="72%" stroke={L.threadFaint} strokeDasharray="2 6" strokeWidth="0.7" />
    </svg>

    {/* AI marginalia — floating italic notes in space */}
    <div style={{ position: 'absolute', left: '46%', top: '28%', transform: 'translate(-50%,0)', maxWidth: 200, zIndex: 4 }}>
      <div style={{ ...Ltype.italic, fontSize: 14, color: L.amberGlow, lineHeight: 1.45, opacity: .9, animation: 'lumen-breath 5s ease-in-out infinite' }}>
        "Three flows put the map up <span style={{ color: L.bone }}>before</span> the signup gate. They are the fast ones."
      </div>
      <div style={{ ...Ltype.micro, fontSize: 9, color: L.amber, marginTop: 6 }}>— margin · pass 2</div>
    </div>

    <div style={{ position: 'absolute', left: '44%', top: '78%', transform: 'translate(-50%,0)', maxWidth: 230, zIndex: 4 }}>
      <div style={{ ...Ltype.italic, fontSize: 13, color: L.cobaltGlow, lineHeight: 1.45, opacity: .85, animation: 'lumen-breath 6s ease-in-out infinite', animationDelay: '1s' }}>
        "Cluster B may collapse into A — they may be the same gesture."
      </div>
    </div>

    {/* Crystallized recommendation — the moment of insight */}
    <div style={{
      position: 'absolute', left: '62%', top: '42%', transform: 'translate(-50%,-50%)',
      width: 320, padding: '22px 24px', zIndex: 5,
      background: `linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.9) 100%)`,
      boxShadow: `0 0 0 1px rgba(244,204,125,0.40), 0 30px 80px -20px rgba(0,0,0,0.8), 0 0 100px -20px rgba(217,150,62,0.55)`,
      animation: 'lumen-breath 6s ease-in-out infinite',
    }}>
      <div style={{ ...Ltype.micro, color: L.amberGlow }}>insight · forming</div>
      <div style={{ ...Ltype.marquee, fontSize: 28, color: L.bone, marginTop: 10, lineHeight: 1.1 }}>
        Show the map <span style={{ ...Ltype.italic, color: L.amberGlow }}>before</span> the signup.
      </div>
      <div style={{ ...Ltype.reading, fontSize: 13.5, color: L.ink, marginTop: 10, lineHeight: 1.55 }}>
        Across the fastest nine, the map is visible — sometimes interactive — before the user is asked to commit anything.
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 14, borderTop: `1px solid ${L.rule}`, paddingTop: 10 }}>
        <div style={{ ...Ltype.italic, fontSize: 12, color: L.amberGlow }}>9 of 142 · strong</div>
        <div style={{ ...Ltype.italic, fontSize: 13, color: L.bone }}>open the chain ↗</div>
      </div>
    </div>

    {/* Bottom — synthesis pass timeline + status */}
    <div style={{ position: 'absolute', bottom: 28, left: 44, right: 44, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {Lmicro('synthesis', L.faint)}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {['scan','cluster','recommend'].map((s,i) => (
            <React.Fragment key={s}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: i < 2 ? L.amberGlow : 'transparent',
                border: i === 2 ? `1px solid ${L.amberGlow}` : 0,
                boxShadow: i === 1 ? `0 0 14px ${L.amberGlow}` : 'none',
                animation: i === 1 ? 'lumen-pulse 2s ease-in-out infinite' : 'none',
              }} />
              <div style={{ ...Ltype.italic, fontSize: 13.5, color: i <= 1 ? L.bone : L.soft }}>{s}</div>
              {i < 2 && <div style={{ width: 32, height: 1, background: L.rule }} />}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        {Lmicro('pass 2 of 3 · patterns lifting', L.amberGlow)}
        <div style={{ ...Ltype.italic, fontSize: 13, color: L.soft, marginTop: 4 }}>~ 2 min to recommendations</div>
      </div>
    </div>
  </div>,
  { pad: 0 }
);

window.Lumen_CanvasAtRest = Lumen_CanvasAtRest;
window.Lumen_MidSynthesis = Lumen_MidSynthesis;
