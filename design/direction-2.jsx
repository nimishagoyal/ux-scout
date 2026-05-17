// DIRECTION 2 — DATA-DENSE RESEARCH OS
// Inspired by Bloomberg Terminal, ClickHouse, professional research tools.
// LIGHT terminal: paper white + true black + amber. Sidesteps dark-cyberpunk trope.

const D2 = {
  bg: '#F2F1EC',
  card: '#FBFAF6',
  ink: '#0B0B0A',
  rule: '#1A1A18',
  faint: '#C9C6BD',
  soft: '#6E6A60',
  amber: '#B8580E',
  red: '#A8231A',
  green: '#2F6B2F',
};

const d2Wrap = (children, pad = 0) => (
  <div style={{
    width: '100%', height: '100%', background: D2.bg, color: D2.ink,
    fontFamily: 'IBM Plex Mono, monospace', padding: pad, boxSizing: 'border-box',
    overflow: 'hidden', fontSize: 11.5,
  }}>{children}</div>
);

const d2Tag = (txt, color = D2.ink) => (
  <span style={{ display: 'inline-block', fontFamily: 'IBM Plex Mono, monospace', fontSize: 9.5, padding: '1px 6px', border: `1px solid ${color}`, color, letterSpacing: '.08em' }}>{txt}</span>
);

// ───────────────────── 2.A  FOUNDATIONS  ─────────────────────
const D2_Foundations = () => (
  d2Wrap(
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr', padding: 0 }}>
      {/* Title bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${D2.rule}`, padding: '12px 24px', background: D2.ink, color: D2.bg }}>
        <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
          <span style={{ fontSize: 12, letterSpacing: '.16em' }}>DIRECTION_02 // FOUNDATIONS</span>
          <span style={{ fontSize: 10, opacity: .6 }}>SYS:PMOS · REV 0.4 · 17 MAY 2026 09:24:11</span>
        </div>
        <div style={{ fontSize: 10, opacity: .6 }}>[F1] HELP · [F2] CMD · [F3] SEARCH</div>
      </div>

      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 0 }}>
        {/* Left: type ramp + sample table */}
        <div style={{ borderRight: `1px solid ${D2.rule}`, paddingRight: 24 }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§ 01 · TYPE</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: '-.01em' }}>CHECKOUT.STEP_3 → ABANDON 41.2%</div>
            <div style={{ fontSize: 9, color: D2.soft }}>H1 · IBM PLEX MONO 500 · 32 / -1%</div>

            <div style={{ marginTop: 8, fontSize: 18, fontWeight: 500 }}>Total cost surfaces below the payment field.</div>
            <div style={{ fontSize: 9, color: D2.soft }}>H2 · 18 / 500</div>

            <div style={{ marginTop: 8, fontSize: 12.5, lineHeight: 1.55, fontFamily: 'IBM Plex Sans, sans-serif', maxWidth: 460 }}>
              Long-form synthesis switches to IBM Plex Sans only when reading exceeds ~140 characters. Below that threshold, monospace prevails — labels, IDs, counts, deltas, headlines.
            </div>
            <div style={{ fontSize: 9, color: D2.soft }}>BODY · IBM PLEX SANS · 12.5 / 1.55 · ONLY FOR LONG PROSE</div>

            <div style={{ marginTop: 8, fontSize: 10.5, color: D2.amber }}>// label · status · delta · count</div>
            <div style={{ fontSize: 9, color: D2.soft }}>LABEL · MONO · 10.5 · AMBER</div>
          </div>

          {/* Sample dense table */}
          <div style={{ marginTop: 28, fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§ 03 · TABLE — DENSITY REFERENCE</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8, fontSize: 11 }}>
            <thead>
              <tr style={{ borderTop: `1px solid ${D2.rule}`, borderBottom: `1px solid ${D2.rule}`, textAlign: 'left', background: D2.ink, color: D2.bg }}>
                {['REF','SOURCE','PATTERN','EVIDENCE','Δ CVR'].map(h => (
                  <th key={h} style={{ padding: '4px 8px', fontWeight: 500, letterSpacing: '.1em', fontSize: 9 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['R-001','stripe.com','total-in-header','STRONG','+4.1%'],
                ['R-002','shopify.com','single-page-pay','STRONG','+2.7%'],
                ['R-003','vercel.com','progressive-disclosure','MEDIUM','+1.4%'],
                ['R-004','airbnb.com','sticky-summary','STRONG','+3.8%'],
                ['R-005','linear.app','no-shipping-needed','—','n/a'],
                ['R-006','figma.com','team-billing-defer','WEAK','+0.6%'],
              ].map((row,i) => (
                <tr key={i} style={{ borderBottom: `1px dotted ${D2.faint}` }}>
                  {row.map((c,j) => (
                    <td key={j} style={{ padding: '4px 8px', color: j===3 && c==='STRONG' ? D2.green : j===3 && c==='WEAK' ? D2.red : j===4 ? D2.amber : D2.ink }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right: color, grid, density */}
        <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§ 02 · PALETTE</div>
            <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: `1px solid ${D2.rule}` }}>
              {[
                ['BG', D2.bg, D2.ink],
                ['CARD', D2.card, D2.ink],
                ['INK', D2.ink, D2.bg],
                ['SOFT', D2.soft, D2.bg],
                ['AMBER', D2.amber, D2.bg],
                ['RED', D2.red, D2.bg],
                ['GREEN', D2.green, D2.bg],
                ['RULE', D2.rule, D2.bg],
              ].map(([n,c,t])=>(
                <div key={n} style={{ background: c, color: t, fontSize: 9, padding: 8, height: 52, borderRight: `1px solid ${D2.rule}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', letterSpacing: '.08em' }}>
                  <span>{n}</span>
                  <span style={{ opacity: .7 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: D2.soft, marginTop: 6, lineHeight: 1.5 }}>Light terminal. Amber = call-out. Red = anti-pattern / warning. Green = validated.</div>
          </div>

          <div>
            <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§ 04 · DENSITY</div>
            <div style={{ marginTop: 10, fontSize: 10.5, lineHeight: 1.65 }}>
              <div>• Row height ………… <span style={{ color: D2.amber }}>22 px</span></div>
              <div>• Cell padding ……… <span style={{ color: D2.amber }}>4 / 8 px</span></div>
              <div>• Pane gutter ……… <span style={{ color: D2.amber }}>1 px rule</span></div>
              <div>• Min font size …… <span style={{ color: D2.amber }}>9 px (label only)</span></div>
              <div>• Body min ……… <span style={{ color: D2.amber }}>11 px</span></div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§ 05 · KEYBOARD-FIRST</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 10.5 }}>
              {[
                ['⌘ K','open command palette'],
                ['⌘ J','run next analysis'],
                ['G then R','go to references'],
                ['[ ]','prev/next pane'],
                [': /','grep within thread'],
              ].map(([k,t])=>(
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '90px 1fr' }}>
                  <span style={{ color: D2.amber }}>{k}</span>
                  <span style={{ color: D2.ink }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

// ───────────────────── 2.B  COMPONENT LANGUAGE  ─────────────────────
const D2_Components = () => (
  d2Wrap(
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 12, letterSpacing: '.16em' }}>DIRECTION_02 // COMPONENT_LANGUAGE</span>
        <span style={{ fontSize: 10, color: D2.soft }}>SIX PRIMITIVES, ZERO RADIUS, ZERO SHADOW.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, flex: 1 }}>
        {/* Cell: Action */}
        <div style={{ border: `1px solid ${D2.rule}`, background: D2.card, padding: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>ACTIONS</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={{ background: D2.ink, color: D2.bg, border: 0, fontFamily: 'inherit', fontSize: 11, padding: '8px 12px', textAlign: 'left', letterSpacing: '.08em' }}>[ RUN ] ANALYSIS — ⌘↵</button>
            <button style={{ background: D2.bg, color: D2.ink, border: `1px solid ${D2.rule}`, fontFamily: 'inherit', fontSize: 11, padding: '8px 12px', textAlign: 'left', letterSpacing: '.08em' }}>[ + ] ADD REFERENCE</button>
            <button style={{ background: 'transparent', color: D2.amber, border: 0, fontFamily: 'inherit', fontSize: 11, padding: '4px 0', textAlign: 'left', letterSpacing: '.05em' }}>→ open in ref-pane</button>
            <button style={{ background: 'transparent', color: D2.red, border: `1px dashed ${D2.red}`, fontFamily: 'inherit', fontSize: 11, padding: '8px 12px', textAlign: 'left', letterSpacing: '.08em' }}>[ ! ] DELETE THREAD</button>
          </div>

          <div style={{ marginTop: 18, fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>STATUS PILLS</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
            {d2Tag('STRONG', D2.green)}{d2Tag('MEDIUM', D2.amber)}{d2Tag('WEAK', D2.red)}{d2Tag('UNVERIFIED', D2.soft)}{d2Tag('PATTERN', D2.ink)}{d2Tag('ANTI-PATTERN', D2.red)}
          </div>
        </div>

        {/* Cell: Prompt + signal meter */}
        <div style={{ border: `1px solid ${D2.rule}`, background: D2.card, padding: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>QUERY</div>
          <div style={{ marginTop: 12, border: `1px solid ${D2.rule}`, padding: 10, background: D2.bg }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
              <span style={{ color: D2.amber }}>{'>'}</span>
              <span style={{ fontSize: 12 }}>why are users dropping at checkout step 3 ?</span>
            </div>
            <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', borderTop: `1px dotted ${D2.faint}`, paddingTop: 8 }}>
              <span style={{ fontSize: 9.5, color: D2.soft, letterSpacing: '.08em' }}>SCOPE: 14 REFS · 3 SESSIONS · 0 PRIORS</span>
              <span style={{ fontSize: 9.5, color: D2.amber, letterSpacing: '.08em' }}>RUN ⌘↵</span>
            </div>
          </div>

          <div style={{ marginTop: 16, fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>SIGNAL METER</div>
          <div style={{ marginTop: 8 }}>
            {[
              ['SHIPPING_SURPRISE', 92],
              ['FIELD_FATIGUE', 71],
              ['TRUST_DEFICIT', 44],
              ['PERF_LATENCY', 18],
            ].map(([k,v]) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 40px', gap: 8, alignItems: 'center', padding: '3px 0' }}>
                <span style={{ fontSize: 10 }}>{k}</span>
                <div style={{ height: 8, background: D2.bg, border: `1px solid ${D2.rule}` }}>
                  <div style={{ height: '100%', width: `${v}%`, background: v>70 ? D2.amber : v>40 ? D2.ink : D2.faint }} />
                </div>
                <span style={{ fontSize: 10, textAlign: 'right', color: D2.amber }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cell: Reference card + spark */}
        <div style={{ border: `1px solid ${D2.rule}`, background: D2.card, padding: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>REFERENCE_CARD</div>
          <div style={{ marginTop: 10, border: `1px solid ${D2.rule}`, background: D2.bg }}>
            <div style={{ borderBottom: `1px solid ${D2.rule}`, padding: '4px 8px', display: 'flex', justifyContent: 'space-between', fontSize: 9.5, letterSpacing: '.08em' }}>
              <span>R-001 · STRIPE.COM</span>
              <span style={{ color: D2.green }}>STRONG</span>
            </div>
            <div style={{ height: 110, padding: 6 }}>
              <RefScreenshot palette={{ bg: D2.card, ink: D2.ink, mute: D2.faint, accent: D2.amber }} kind="form" />
            </div>
            <div style={{ borderTop: `1px solid ${D2.rule}`, padding: '6px 8px', fontSize: 10.5 }}>
              total-in-header · cost surfaces before payment field
            </div>
            <div style={{ borderTop: `1px dotted ${D2.faint}`, padding: '4px 8px', fontSize: 9.5, color: D2.soft, display: 'flex', justifyContent: 'space-between' }}>
              <span>CITES: §02 §04</span><span style={{ color: D2.amber }}>↗ open</span>
            </div>
          </div>

          <div style={{ marginTop: 14, fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>SPARKBAR · CITATIONS BY SECTION</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 36, marginTop: 6 }}>
            {[3,7,2,9,4,6,8,5,2,1,0,3,5,2].map((v,i)=>(
              <div key={i} style={{ flex: 1, height: v*3.5, background: v>=7 ? D2.amber : D2.ink, opacity: v===0?0.15:1 }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

// ───────────────────── 2.C  WORKSPACE BLUEPRINT  ─────────────────────
const D2_Workspace = () => (
  d2Wrap(
    <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'auto auto 1fr auto' }}>
      {/* Top bar */}
      <div style={{ background: D2.ink, color: D2.bg, padding: '6px 12px', display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: '.12em' }}>
        <div style={{ display: 'flex', gap: 14 }}>
          <span style={{ color: D2.amber }}>PMOS</span>
          <span>WS / checkout-friction</span>
          <span style={{ opacity: .5 }}>BRANCH: draft-02</span>
          <span style={{ opacity: .5 }}>·</span>
          <span>14 REFS</span><span>·</span>
          <span>3 SESS</span><span>·</span>
          <span>5 TODOS</span>
        </div>
        <div style={{ display: 'flex', gap: 14, opacity: .8 }}>
          <span>⌘K</span><span>⌘J</span><span>[F1] HELP</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${D2.rule}`, display: 'flex', fontSize: 10.5, letterSpacing: '.1em', background: D2.bg }}>
        {['BRIEF','REVIEW','BEST PRACTICE','RECS','TODOS','REFS','TRACE'].map((t,i)=>(
          <div key={t} style={{ padding: '8px 14px', borderRight: `1px solid ${D2.rule}`, background: i===1 ? D2.card : 'transparent', color: i===1 ? D2.ink : D2.soft, borderBottom: i===1 ? `2px solid ${D2.amber}` : 0 }}>
            [{i+1}] {t}
          </div>
        ))}
        <div style={{ marginLeft: 'auto', padding: '8px 14px', color: D2.soft }}>SPLIT [ | ]</div>
      </div>

      {/* Main panes */}
      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 1fr 220px', overflow: 'hidden' }}>
        {/* Outline */}
        <div style={{ borderRight: `1px solid ${D2.rule}`, padding: 10, fontSize: 10.5, background: D2.bg }}>
          <div style={{ color: D2.soft, fontSize: 9, letterSpacing: '.15em' }}>OUTLINE</div>
          <div style={{ marginTop: 8, lineHeight: 1.9 }}>
            {[
              ['§01','brief'],
              ['§02','review · 4'],
              ['§03','best.pract · 6'],
              ['§04','recs · 3'],
              ['§05','todos · 5'],
              ['§06','refs · 14'],
            ].map(([n,t],i)=>(
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '30px 1fr', color: i===1 ? D2.amber : D2.ink }}>
                <span>{n}</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review pane */}
        <div style={{ borderRight: `1px solid ${D2.rule}`, padding: 14, overflow: 'hidden' }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§02 · REVIEW</div>
          <div style={{ fontSize: 16, fontWeight: 500, marginTop: 6 }}>CHECKOUT.STEP_3 · ABANDON @ 41.2%</div>
          <div style={{ marginTop: 10, display: 'flex', gap: 4 }}>
            {d2Tag('SHIPPING', D2.amber)}{d2Tag('PAYMENT', D2.ink)}{d2Tag('FORM', D2.ink)}
          </div>

          <div style={{ marginTop: 14, fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 12.5, lineHeight: 1.55 }}>
            Across 14 referenced flows, shipping cost surfaces above the fold in 9 cases. In the remaining 5 — including the current implementation — total moves only after the address field validates. <span style={{ background: '#fef0d6', borderBottom: `1px solid ${D2.amber}` }}>Drop-off concentrates at the card-number field on every deferred flow.</span>
          </div>

          <div style={{ marginTop: 12, border: `1px solid ${D2.rule}`, padding: 10, background: D2.card }}>
            <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>EVIDENCE LEDGER</div>
            <table style={{ width: '100%', fontSize: 10.5, marginTop: 6, borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['R-001','shipping surface', D2.green, '+4.1%'],
                  ['R-002','single-page-pay', D2.green, '+2.7%'],
                  ['R-004','sticky summary', D2.green, '+3.8%'],
                  ['R-006','team billing', D2.red, '+0.6%'],
                ].map((r,i)=>(
                  <tr key={i} style={{ borderTop: i?`1px dotted ${D2.faint}`:0 }}>
                    <td style={{ padding: '3px 0', color: D2.amber, width: 50 }}>{r[0]}</td>
                    <td style={{ padding: '3px 0' }}>{r[1]}</td>
                    <td style={{ padding: '3px 0', color: r[2], width: 40 }}>{r[2]===D2.green?'STR':'WEAK'}</td>
                    <td style={{ padding: '3px 0', textAlign: 'right' }}>{r[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best practice + recs pane */}
        <div style={{ borderRight: `1px solid ${D2.rule}`, padding: 14, overflow: 'hidden' }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§03 · BEST PRACTICE</div>
          <div style={{ marginTop: 8, fontSize: 11, lineHeight: 1.7 }}>
            {[
              ['BP-01','total ≤ payment-step header','9/14'],
              ['BP-02','progressive-disclosure: optional fields collapse','11/14'],
              ['BP-03','one-tap reuse of stored cards','13/14'],
              ['BP-04','no shipping-step where unnecessary','7/14'],
              ['BP-05','inline validation, never on blur alone','10/14'],
              ['BP-06','order-summary persists across steps','12/14'],
            ].map(([id,t,n])=>(
              <div key={id} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 40px', borderBottom: `1px dotted ${D2.faint}`, padding: '4px 0' }}>
                <span style={{ color: D2.amber }}>{id}</span>
                <span>{t}</span>
                <span style={{ color: D2.soft, textAlign: 'right' }}>{n}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§04 · RECOMMEND</div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6, fontSize: 11 }}>
            <div style={{ borderLeft: `3px solid ${D2.amber}`, paddingLeft: 8 }}>REC-01 · MOVE TOTAL TO PAYMENT HEADER · IMPACT +3.8% (est.)</div>
            <div style={{ borderLeft: `3px solid ${D2.amber}`, paddingLeft: 8 }}>REC-02 · PRE-FETCH SHIPPING AT ADDRESS · IMPACT +1.4%</div>
            <div style={{ borderLeft: `3px solid ${D2.soft}`, paddingLeft: 8, color: D2.soft }}>REC-03 · COLLAPSE PROMO/GIFT FIELDS · IMPACT +0.6%</div>
          </div>
        </div>

        {/* Refs pane */}
        <div style={{ padding: 10, overflow: 'hidden', background: D2.bg }}>
          <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>§06 · REFS</div>
          <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {['R-001','R-002','R-004','R-009','R-011','R-014'].map((id,i) => (
              <div key={id} style={{ border: `1px solid ${D2.rule}`, background: D2.card }}>
                <div style={{ fontSize: 9, padding: '2px 6px', display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${D2.rule}` }}>
                  <span style={{ color: D2.amber }}>{id}</span><span style={{ color: D2.soft }}>{['STR','STR','STR','MED','STR','WEAK'][i]}</span>
                </div>
                <div style={{ height: 56 }}>
                  <RefScreenshot palette={{ bg: D2.card, ink: D2.ink, mute: D2.faint, accent: D2.amber }} kind={['form','cards','list','form','cards','detail'][i]} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{ borderTop: `1px solid ${D2.rule}`, background: D2.ink, color: D2.bg, padding: '4px 12px', fontSize: 9.5, letterSpacing: '.1em', display: 'flex', justifyContent: 'space-between' }}>
        <span>READY · TOKENS 14,221 / 32K · MODEL: claude-research · LATENCY 412ms</span>
        <span style={{ color: D2.amber }}>⏵ ⌘↵ TO RUN · ⌘B TO BISECT EVIDENCE</span>
      </div>
    </div>
  )
);

// ───────────────────── 2.D  SYNTHESIS MODULES  ─────────────────────
const D2_Synthesis = () => (
  d2Wrap(
    <div style={{ padding: 24, height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 12, letterSpacing: '.16em' }}>DIRECTION_02 // SYNTHESIS_MODULES</span>
        <span style={{ fontSize: 10, color: D2.soft }}>AI OUTPUT AS A LEDGER. EVIDENCE IS A FIRST-CLASS CITIZEN.</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14, flex: 1 }}>
        {/* Recommendations ledger */}
        <div style={{ border: `1px solid ${D2.rule}`, background: D2.card, padding: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: D2.ink, color: D2.bg, padding: '6px 10px', fontSize: 10, letterSpacing: '.15em', display: 'flex', justifyContent: 'space-between' }}>
            <span>§04 · RECOMMENDATIONS_LEDGER</span><span style={{ color: D2.amber }}>3 / 3</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 10.5 }}>
            <thead>
              <tr style={{ background: D2.bg, borderBottom: `1px solid ${D2.rule}`, textAlign: 'left' }}>
                {['ID','RECOMMENDATION','EVIDENCE','CONF','Δ EST','EFFORT','OWNER'].map(h=>(
                  <th key={h} style={{ padding: '6px 8px', fontSize: 9, letterSpacing: '.1em', color: D2.soft, fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['R-01','Move total to payment header','R-001 R-004 R-009','STRONG','+3.8%','S','design'],
                ['R-02','Pre-fetch shipping at address','R-002 R-007','STRONG','+1.4%','M','eng'],
                ['R-03','Collapse promo + gift fields','R-011','MEDIUM','+0.6%','S','design'],
              ].map((r,i)=>(
                <tr key={i} style={{ borderBottom: `1px dotted ${D2.faint}` }}>
                  <td style={{ padding: '8px', color: D2.amber }}>{r[0]}</td>
                  <td style={{ padding: '8px' }}>{r[1]}</td>
                  <td style={{ padding: '8px', color: D2.soft }}>{r[2]}</td>
                  <td style={{ padding: '8px', color: r[3]==='STRONG'?D2.green:D2.amber }}>{r[3]}</td>
                  <td style={{ padding: '8px', color: D2.amber }}>{r[4]}</td>
                  <td style={{ padding: '8px' }}>{r[5]}</td>
                  <td style={{ padding: '8px', color: D2.soft }}>{r[6]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Trace */}
          <div style={{ background: D2.bg, borderTop: `1px solid ${D2.rule}`, padding: 12, fontSize: 10.5, fontFamily: 'IBM Plex Mono, monospace' }}>
            <div style={{ fontSize: 9, letterSpacing: '.15em', color: D2.soft }}>TRACE · R-01 EVIDENCE CHAIN</div>
            <pre style={{ margin: '6px 0 0', fontSize: 10, lineHeight: 1.55, color: D2.ink, whiteSpace: 'pre-wrap' }}>
{`◇ query   "why drop at step 3"
└─ retrieved 14 refs · scope=checkout
   ├─ R-001 stripe / total-in-header ........ STR  cited §02 §04
   ├─ R-004 airbnb / sticky-summary .......... STR  cited §02
   └─ R-009 booking / progressive ............ MED  cited §03
└─ conclusion: move total → header   confidence=0.86`}
            </pre>
          </div>
        </div>

        {/* TODO list as task queue */}
        <div style={{ border: `1px solid ${D2.rule}`, background: D2.card, display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: D2.ink, color: D2.bg, padding: '6px 10px', fontSize: 10, letterSpacing: '.15em', display: 'flex', justifyContent: 'space-between' }}>
            <span>§05 · TASK_QUEUE</span><span style={{ color: D2.amber }}>1/5 DONE</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {[
              ['T-01','MOVE TOTAL → STICKY HDR','design','OPEN', D2.amber],
              ['T-02','PREFETCH SHIPPING','eng','OPEN', D2.amber],
              ['T-03','AUDIT FIELDS, FLAG NONESSENTIAL','design','DONE', D2.green],
              ['T-04','COPY DRAFT — "EXPECTED BY"','content','OPEN', D2.amber],
              ['T-05','FUNNEL TRACKING (POST-LAUNCH)','data','BLOCKED', D2.red],
            ].map((row,i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '46px 1fr 58px 64px', alignItems: 'center', padding: '8px 10px', borderBottom: `1px dotted ${D2.faint}`, fontSize: 10.5 }}>
                <span style={{ color: D2.amber }}>{row[0]}</span>
                <span style={{ textDecoration: row[3]==='DONE'?'line-through':'none', color: row[3]==='DONE'?D2.soft:D2.ink }}>{row[1]}</span>
                <span style={{ color: D2.soft, fontSize: 9.5, letterSpacing: '.08em' }}>{row[2].toUpperCase()}</span>
                <span style={{ fontSize: 9.5, padding: '2px 6px', border: `1px solid ${row[4]}`, color: row[4], letterSpacing: '.08em', textAlign: 'center' }}>{row[3]}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${D2.rule}`, padding: 10, fontSize: 10, color: D2.soft, background: D2.bg }}>
            FILTER: ALL · GROUP: STATUS · SORT: PRIORITY ↓ · KEYS: J/K NAVIGATE · X TOGGLE
          </div>
        </div>
      </div>
    </div>
  )
);

window.D2_Foundations = D2_Foundations;
window.D2_Components = D2_Components;
window.D2_Workspace = D2_Workspace;
window.D2_Synthesis = D2_Synthesis;
