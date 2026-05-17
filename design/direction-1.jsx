// DIRECTION 1 — EDITORIAL INTELLIGENCE
// Inspired by Linear, Perplexity, Stripe Docs.
// Typography-first, restrained, monochrome, generous whitespace.

const D1 = {
  bg: '#FAFAF8',
  ink: '#0F0F0E',
  mute: '#E8E5DE',
  rule: '#D9D5CB',
  soft: '#6B675E',
  accent: '#2A3F6B',  // restrained ink-blue
  paper: '#F2EFE7',
};

const d1Wrap = (children, pad = 56) => (
  <div style={{
    width: '100%', height: '100%', background: D1.bg, color: D1.ink,
    fontFamily: 'Geist, system-ui, sans-serif', padding: pad, boxSizing: 'border-box',
    overflow: 'hidden',
  }}>{children}</div>
);

const d1Label = (txt) => (
  <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: D1.soft }}>{txt}</div>
);

// ───────────────────────── 1.A  FOUNDATIONS  ─────────────────────────
const D1_Foundations = () => (
  d1Wrap(
    <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 48, height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {d1Label('Direction 01 / Foundations')}
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 44, lineHeight: .95, marginTop: 18, letterSpacing: '-.01em' }}>
            Editorial<br /><em style={{ color: D1.soft }}>Intelligence</em>
          </div>
          <div style={{ fontSize: 12.5, color: D1.soft, marginTop: 22, lineHeight: 1.55, maxWidth: 160 }}>
            A research surface that reads like a thoughtful publication. Restraint, hierarchy, and quiet authority.
          </div>
        </div>
        <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, color: D1.soft, letterSpacing: '.1em' }}>
          REF — LINEAR · PERPLEXITY<br />STRIPE DOCS
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, borderLeft: `1px solid ${D1.rule}`, paddingLeft: 48 }}>
        {/* Type ramp */}
        <div>
          {d1Label('Typography — Instrument Serif · Geist · Geist Mono')}
          <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 64, lineHeight: 1, letterSpacing: '-.02em' }}>The checkout abandons at <em>step three</em>.</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, color: D1.soft, marginTop: 6, letterSpacing: '.08em' }}>DISPLAY / 64 · INSTRUMENT SERIF</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Geist', fontWeight: 500, fontSize: 22, lineHeight: 1.2 }}>Users hesitate when shipping costs first surface alongside the card form, not before.</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, marginTop: 10, color: '#2a2926' }}>Across 14 reference flows, 9 disclose total cost before payment. The remainder defer it — and report the same drop-off pattern at the payment field. The signal is consistent enough to act on.</div>
              <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, color: D1.soft, marginTop: 8, letterSpacing: '.08em' }}>H3 / 22 · BODY / 13.5 — 1.55</div>
            </div>
          </div>
        </div>

        {/* Color + Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 36 }}>
          <div>
            {d1Label('Palette — monochrome ink + single ink-blue accent')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 0, marginTop: 12, border: `1px solid ${D1.rule}` }}>
              {[
                ['Paper', D1.bg, D1.ink],
                ['Card', D1.paper, D1.ink],
                ['Rule', D1.mute, D1.ink],
                ['Soft', D1.soft, '#fff'],
                ['Ink', D1.ink, '#fff'],
                ['Accent', D1.accent, '#fff'],
              ].map(([n,c,t]) => (
                <div key={n} style={{ background: c, color: t, height: 76, padding: 8, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: 10 }}>
                  <span style={{ fontFamily: 'Geist Mono, monospace', letterSpacing: '.08em' }}>{n}</span>
                  <span style={{ fontFamily: 'Geist Mono, monospace', opacity: .7 }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: D1.soft, marginTop: 10, lineHeight: 1.5 }}>
              No more than one chromatic note on any surface. Accent reserved for citation marks and the single primary action.
            </div>
          </div>
          <div>
            {d1Label('Grid — 12 col · 72px gutter · 720 reading measure')}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 4, marginTop: 12, height: 76 }}>
              {Array.from({length:12}).map((_,i)=>(
                <div key={i} style={{ background: i===2||i===3||i===4||i===5||i===6||i===7 ? D1.accent : D1.mute, opacity: i===2||i===3||i===4||i===5||i===6||i===7 ? .15 : 1 }} />
              ))}
            </div>
            <div style={{ fontSize: 11.5, color: D1.soft, marginTop: 10, lineHeight: 1.5 }}>
              Prose locks to columns 3–8. Reference rail occupies 9–12. Asymmetry by intention, not by accident.
            </div>
          </div>
        </div>

        {/* Spacing scale */}
        <div>
          {d1Label('Spacing — 4 · 8 · 12 · 20 · 32 · 56 · 88')}
          <div style={{ display: 'flex', gap: 16, marginTop: 12, alignItems: 'flex-end' }}>
            {[4,8,12,20,32,56,88].map(n => (
              <div key={n} style={{ textAlign: 'center' }}>
                <div style={{ width: n, height: n, background: D1.ink }} />
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, color: D1.soft, marginTop: 6 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

// ───────────────────────── 1.B  COMPONENT LANGUAGE  ─────────────────────────
const D1_Components = () => (
  d1Wrap(
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          {d1Label('Direction 01 / Component Language')}
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, marginTop: 8, letterSpacing: '-.01em' }}>Hairlines, never shadows.</div>
        </div>
        <div style={{ fontSize: 11.5, color: D1.soft, maxWidth: 280, lineHeight: 1.5, textAlign: 'right' }}>
          1px rules carry the structure. Corners stay at 4px. Color is reserved for meaning, not decoration.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 28, flex: 1 }}>
        {/* Buttons */}
        <div style={{ border: `1px solid ${D1.rule}`, padding: 20 }}>
          {d1Label('Action')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            <button style={{ background: D1.ink, color: '#fff', border: 0, padding: '10px 16px', fontFamily: 'inherit', fontSize: 13, borderRadius: 4, textAlign: 'left' }}>Run analysis  ↵</button>
            <button style={{ background: 'transparent', color: D1.ink, border: `1px solid ${D1.ink}`, padding: '9px 16px', fontFamily: 'inherit', fontSize: 13, borderRadius: 4, textAlign: 'left' }}>Add reference</button>
            <button style={{ background: 'transparent', color: D1.soft, border: 0, padding: '4px 0', fontFamily: 'inherit', fontSize: 13, textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 3, textDecorationColor: D1.rule }}>View source flow →</button>
            <div style={{ borderTop: `1px solid ${D1.rule}`, marginTop: 4, paddingTop: 12, display: 'flex', gap: 6 }}>
              <span style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', border: `1px solid ${D1.rule}`, padding: '2px 6px', borderRadius: 3 }}>⌘</span>
              <span style={{ fontSize: 10, fontFamily: 'Geist Mono, monospace', border: `1px solid ${D1.rule}`, padding: '2px 6px', borderRadius: 3 }}>↵</span>
              <span style={{ fontSize: 10.5, color: D1.soft, alignSelf: 'center' }}>run</span>
            </div>
          </div>
        </div>

        {/* Input + Citation */}
        <div style={{ border: `1px solid ${D1.rule}`, padding: 20 }}>
          {d1Label('Prompt field')}
          <div style={{ marginTop: 14, border: `1px solid ${D1.ink}`, padding: 14, background: D1.bg }}>
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 20, fontStyle: 'italic', color: D1.soft }}>"Why are users dropping off at our checkout step three?"</div>
            <div style={{ borderTop: `1px solid ${D1.rule}`, marginTop: 12, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Annotation style={{ color: D1.soft }}>PMSEARCH · 14 REFERENCES</Annotation>
              <span style={{ fontSize: 11, color: D1.accent }}>Run ↵</span>
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            {d1Label('Citation mark')}
            <div style={{ fontSize: 13.5, lineHeight: 1.6, marginTop: 8 }}>
              Shipping cost should surface above the fold<sup style={{ color: D1.accent, fontFamily: 'Geist Mono, monospace', fontSize: 9, padding: '0 3px' }}>[3]</sup>, before payment details are requested<sup style={{ color: D1.accent, fontFamily: 'Geist Mono, monospace', fontSize: 9, padding: '0 3px' }}>[7]</sup>.
            </div>
          </div>
        </div>

        {/* Badges + Reference card */}
        <div style={{ border: `1px solid ${D1.rule}`, padding: 20 }}>
          {d1Label('Status / Pillars')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
            {['Heuristic','Pattern','Antipattern','Industry','Strong evidence','Weak evidence'].map(t => (
              <span key={t} style={{ fontSize: 11, padding: '3px 10px', border: `1px solid ${D1.rule}`, borderRadius: 999, color: D1.ink }}>{t}</span>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            {d1Label('Reference card')}
            <div style={{ border: `1px solid ${D1.rule}`, marginTop: 8, background: D1.paper }}>
              <div style={{ height: 84, borderBottom: `1px solid ${D1.rule}` }}>
                <RefScreenshot palette={{ bg: D1.paper, ink: D1.ink, mute: D1.mute, accent: D1.accent }} kind="form" />
              </div>
              <div style={{ padding: 10 }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9, color: D1.soft, letterSpacing: '.1em' }}>REF 03 / CHECKOUT</div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 17, marginTop: 2 }}>Cost transparency above the fold</div>
                <div style={{ fontSize: 11, color: D1.soft, marginTop: 4, lineHeight: 1.4 }}>Total visible before payment field appears. ↗</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

// ───────────────────────── 1.C  WORKSPACE BLUEPRINT  ─────────────────────────
const D1_Workspace = () => (
  d1Wrap(
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top chrome */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${D1.rule}`, paddingBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, letterSpacing: '-.01em' }}>Margin<em style={{ color: D1.soft }}>.</em></div>
          <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10.5, color: D1.soft, letterSpacing: '.08em' }}>WORKSPACE / CHECKOUT FRICTION / DRAFT 02</div>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 11.5, color: D1.soft }}>
          <span>Studies</span><span>Library</span><span>Threads</span><span style={{ color: D1.ink }}>You</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr 280px', gap: 0, flex: 1 }}>
        {/* Left rail */}
        <div style={{ borderRight: `1px solid ${D1.rule}`, paddingTop: 24, paddingRight: 20 }}>
          {d1Label('Contents')}
          <ol style={{ paddingLeft: 0, listStyle: 'none', margin: 0, marginTop: 12, fontSize: 12.5, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['01','The problem'],
              ['02','UX review'],
              ['03','Best practices'],
              ['04','Recommendations'],
              ['05','To-dos'],
              ['06','References'],
            ].map(([n,t],i)=> (
              <li key={n} style={{ display: 'flex', gap: 10, alignItems: 'baseline', color: i===3 ? D1.ink : D1.soft, lineHeight: 1.4 }}>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 10 }}>{n}</span>
                <span style={{ borderBottom: i===3 ? `1px solid ${D1.ink}` : 0, paddingBottom: 1 }}>{t}</span>
              </li>
            ))}
          </ol>
          <div style={{ borderTop: `1px solid ${D1.rule}`, marginTop: 24, paddingTop: 12 }}>
            {d1Label('Tags')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {['#checkout','#conversion','#fintech'].map(t => <span key={t} style={{ fontSize: 11, color: D1.soft }}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* Reading column */}
        <div style={{ padding: '24px 56px 0 56px', overflow: 'hidden' }}>
          {d1Label('UX Review · §02')}
          <h1 style={{ fontFamily: 'Instrument Serif, serif', fontSize: 52, lineHeight: 1.02, margin: '12px 0 4px', letterSpacing: '-.015em' }}>
            Cost is disclosed too late, and the form asks too much.
          </h1>
          <div style={{ fontSize: 12, color: D1.soft, fontStyle: 'italic', marginBottom: 22 }}>Synthesised from 14 reference flows and 3 internal session recordings.</div>

          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#1a1917', margin: 0, maxWidth: 560 }}>
            Step three asks users to commit a card number before the total has stabilised. Shipping is calculated after the address is entered, and tax is appended silently — by the time the user reaches payment, two figures on screen have already changed.
            <sup style={{ color: D1.accent, fontSize: 9, fontFamily: 'Geist Mono, monospace', padding: '0 3px' }}>[3]</sup>
          </p>
          <div style={{ borderLeft: `2px solid ${D1.ink}`, paddingLeft: 18, margin: '22px 0', fontFamily: 'Instrument Serif, serif', fontSize: 22, lineHeight: 1.3, color: D1.ink, fontStyle: 'italic', maxWidth: 520 }}>
            "Users do not abandon at payment. They abandon at the price they did not expect."
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#1a1917', margin: 0, maxWidth: 560 }}>
            Nine of fourteen reference flows present the order total in the header of the payment step, fixed and visible. The remaining five defer it — and all five report drop-off concentrated at the card-number field.
            <sup style={{ color: D1.accent, fontSize: 9, fontFamily: 'Geist Mono, monospace', padding: '0 3px' }}>[7]</sup>
          </p>
        </div>

        {/* Right rail — refs */}
        <div style={{ borderLeft: `1px solid ${D1.rule}`, paddingTop: 24, paddingLeft: 20 }}>
          {d1Label('References · §02')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 12 }}>
            {[
              ['[3]','Cost in header', 'cards'],
              ['[7]','Single-field payment', 'form'],
              ['[9]','Sticky order summary', 'list'],
            ].map(([n,t,k]) => (
              <div key={n}>
                <div style={{ height: 96, border: `1px solid ${D1.rule}` }}>
                  <RefScreenshot palette={{ bg: D1.paper, ink: D1.ink, mute: D1.mute, accent: D1.accent }} kind={k} />
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginTop: 6 }}>
                  <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9.5, color: D1.accent }}>{n}</span>
                  <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 15 }}>{t}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>, 0
  )
);

// ───────────────────────── 1.D  AI SYNTHESIS MODULES  ─────────────────────────
const D1_Synthesis = () => (
  d1Wrap(
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, height: '100%' }}>
      <div>
        {d1Label('Direction 01 / Synthesis Modules')}
        <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 36, marginTop: 6, letterSpacing: '-.01em' }}>How AI output presents itself.</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, flex: 1 }}>
        {/* Recommendations */}
        <div>
          {d1Label('Recommendations — numbered, prosaic')}
          <div style={{ marginTop: 14, borderTop: `1px solid ${D1.ink}` }}>
            {[
              ['01','Show order total in the payment-step header, fixed.','Strong evidence · 9 of 14 references'],
              ['02','Calculate shipping before the payment screen, not within it.','Pattern · industry standard since 2021'],
              ['03','Defer optional fields (gift, promo) behind a single disclosure.','Heuristic · reduces cognitive load'],
            ].map(([n,t,m]) => (
              <div key={n} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 180px', gap: 16, padding: '18px 0', borderBottom: `1px solid ${D1.rule}` }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 11, color: D1.soft }}>{n}</div>
                <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 21, lineHeight: 1.25, letterSpacing: '-.005em' }}>{t}</div>
                <div style={{ fontSize: 11, color: D1.soft, lineHeight: 1.45 }}>{m}</div>
              </div>
            ))}
          </div>
        </div>

        {/* To-dos */}
        <div>
          {d1Label('Action items — checklist as marginalia')}
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              ['Move total to sticky header', 'design', false],
              ['Pre-fetch shipping at address step', 'eng', false],
              ['Audit form for non-essential fields', 'design', true],
              ['Draft copy for "Expected by" inline hint', 'content', false],
              ['Set up funnel tracking for new flow', 'data', false],
            ].map(([t,o,done],i) => (
              <label key={i} style={{ display: 'grid', gridTemplateColumns: '20px 1fr 70px', gap: 10, alignItems: 'baseline', padding: '8px 0', borderBottom: `1px dashed ${D1.rule}`, cursor: 'pointer' }}>
                <span style={{ width: 14, height: 14, border: `1px solid ${D1.ink}`, display: 'inline-block', background: done ? D1.ink : 'transparent', position: 'relative', top: 2 }}>
                  {done && <span style={{ color: '#fff', fontSize: 11, position: 'absolute', left: 2, top: -3 }}>✓</span>}
                </span>
                <span style={{ fontSize: 14, textDecoration: done ? 'line-through' : 'none', color: done ? D1.soft : D1.ink }}>{t}</span>
                <span style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9.5, color: D1.soft, letterSpacing: '.1em', textTransform: 'uppercase', textAlign: 'right' }}>{o}</span>
              </label>
            ))}
          </div>

          <div style={{ marginTop: 28, padding: 18, background: D1.paper, border: `1px solid ${D1.rule}` }}>
            {d1Label('Editor\'s note — AI signed')}
            <div style={{ fontFamily: 'Instrument Serif, serif', fontSize: 18, fontStyle: 'italic', marginTop: 8, lineHeight: 1.4, color: D1.ink }}>
              "The evidence here leans on industry pattern more than primary research. Worth pairing with five recorded sessions before committing."
            </div>
            <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: 9.5, color: D1.soft, marginTop: 10, letterSpacing: '.08em' }}>— MARGIN · 14 REFS · MEDIUM CONFIDENCE</div>
          </div>
        </div>
      </div>
    </div>
  )
);

window.D1_Foundations = D1_Foundations;
window.D1_Components = D1_Components;
window.D1_Workspace = D1_Workspace;
window.D1_Synthesis = D1_Synthesis;
