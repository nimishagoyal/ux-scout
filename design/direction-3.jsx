// DIRECTION 3 — WARM RESEARCH COMPANION
// Inspired by Granola, Claude, Readwise.
// Warm cream paper, serif reading, document-feel, quiet confident interface.

const D3 = {
  bg: '#F2EBDD',
  paper: '#FBF5E6',
  ink: '#2B2620',
  rule: '#D9CFB9',
  faint: '#E7DFC9',
  soft: '#7A6F5C',
  accent: '#B85D3B',   // soft terracotta
  sage: '#697A5A',
};

const d3Wrap = (children, pad = 56) => (
  <div style={{
    width: '100%', height: '100%', background: D3.bg, color: D3.ink,
    fontFamily: 'DM Sans, system-ui, sans-serif', padding: pad, boxSizing: 'border-box',
    overflow: 'hidden',
  }}>{children}</div>
);

const d3Label = (t) => (
  <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase', color: D3.soft, fontWeight: 500 }}>{t}</div>
);

// ─────────────── 3.A  FOUNDATIONS ───────────────
const D3_Foundations = () => (
  d3Wrap(
    <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 48, height: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {d3Label('Direction 03 · Foundations')}
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 56, lineHeight: .95, marginTop: 16, letterSpacing: '-.015em', fontWeight: 400 }}>
            A warm<br /><span style={{ fontStyle: 'italic', color: D3.accent }}>companion</span><br />for thought.
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, marginTop: 22, maxWidth: 200, color: D3.soft, fontFamily: 'Newsreader, serif' }}>
            Reads like a notebook a careful researcher kept on your behalf. Less chrome, more thinking.
          </div>
        </div>
        <div style={{ fontSize: 11, color: D3.soft, letterSpacing: '.04em', fontFamily: 'DM Sans, sans-serif' }}>
          References — Granola · Claude · Readwise
        </div>
      </div>

      <div style={{ borderLeft: `1px solid ${D3.rule}`, paddingLeft: 48, display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Type ramp */}
        <div>
          {d3Label('Typography — Newsreader · DM Sans')}
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, marginTop: 14 }}>
            <div>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 56, lineHeight: 1.05, letterSpacing: '-.015em' }}>
                The checkout, gently <span style={{ fontStyle: 'italic', color: D3.accent }}>reconsidered</span>.
              </div>
              <div style={{ fontSize: 10, color: D3.soft, letterSpacing: '.04em', marginTop: 8 }}>Display · Newsreader · 56 / -1.5%</div>
            </div>
            <div>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, lineHeight: 1.55, color: D3.ink }}>
                People are quietly hesitant. The total shifts beneath them as they enter their address, and by the time the card field appears they are no longer sure what they are paying.
              </div>
              <div style={{ fontSize: 10, color: D3.soft, letterSpacing: '.04em', marginTop: 8, fontFamily: 'DM Sans, sans-serif' }}>Body · Newsreader · 18 / 1.55 · reading column</div>
              <div style={{ fontSize: 13, marginTop: 14, color: D3.ink, fontWeight: 500 }}>UI · DM Sans — labels, controls, metadata</div>
              <div style={{ fontSize: 10, color: D3.soft, letterSpacing: '.04em', marginTop: 4 }}>Sans only inside interactive surfaces.</div>
            </div>
          </div>
        </div>

        {/* Palette */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 36 }}>
          <div>
            {d3Label('Palette — paper, ink, terracotta, sage')}
            <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
              {[
                ['Page', D3.bg, D3.ink],
                ['Card', D3.paper, D3.ink],
                ['Faint', D3.faint, D3.ink],
                ['Soft', D3.soft, '#fff'],
                ['Accent', D3.accent, '#fff'],
                ['Sage', D3.sage, '#fff'],
              ].map(([n,c,t])=>(
                <div key={n} style={{ background: c, color: t, padding: 10, borderRadius: 10, height: 82, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: c===D3.bg ? `1px solid ${D3.rule}` : 0 }}>
                  <span style={{ fontSize: 11, fontWeight: 500 }}>{n}</span>
                  <span style={{ fontSize: 9.5, opacity: .75, letterSpacing: '.04em' }}>{c}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: D3.soft, marginTop: 12, lineHeight: 1.6, fontFamily: 'Newsreader, serif' }}>
              Cream paper, warm ink, terracotta for marginalia and care, sage for completed states. Everything just slightly off-square.
            </div>
          </div>
          <div>
            {d3Label('Shape · rhythm')}
            <div style={{ display: 'flex', gap: 10, marginTop: 12, alignItems: 'flex-end' }}>
              {[6,10,14,20].map(r => (
                <div key={r} style={{ textAlign: 'center' }}>
                  <div style={{ width: 56, height: 56, background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: r }} />
                  <div style={{ fontSize: 10, color: D3.soft, marginTop: 4 }}>{r}px</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12, color: D3.soft, marginTop: 14, lineHeight: 1.6, fontFamily: 'Newsreader, serif' }}>
              10px is the default. Pills are 999. Cards are not floating — they sit on the page.
            </div>

            <div style={{ marginTop: 18 }}>
              {d3Label('Reading measure')}
              <div style={{ marginTop: 8, height: 14, background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 999, position: 'relative' }}>
                <div style={{ position: 'absolute', left: '8%', right: '32%', top: 0, bottom: 0, background: D3.accent, opacity: .9, borderRadius: 999 }} />
              </div>
              <div style={{ fontSize: 10.5, color: D3.soft, marginTop: 6, display: 'flex', justifyContent: 'space-between' }}>
                <span>0</span><span>620 – 720px reading column</span><span>1440</span>
              </div>
            </div>
          </div>
        </div>

        {/* Voice */}
        <div>
          {d3Label('Voice — the AI as a careful note-taker')}
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 18 }}>
            {[
              ['Not','Here are 10 best practices for checkout optimization.', D3.soft],
              ['But','A few patterns held across the references I read.', D3.ink],
              ['And','I noticed something worth pausing on, on page three.', D3.accent],
            ].map(([h,t,c]) => (
              <div key={h} style={{ background: D3.paper, padding: 14, borderRadius: 10, border: `1px solid ${D3.rule}` }}>
                <div style={{ fontSize: 10.5, color: D3.soft, letterSpacing: '.1em', textTransform: 'uppercase' }}>{h}</div>
                <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15.5, fontStyle: 'italic', lineHeight: 1.4, marginTop: 6, color: c }}>"{t}"</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
);

// ─────────────── 3.B  COMPONENT LANGUAGE ───────────────
const D3_Components = () => (
  d3Wrap(
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          {d3Label('Direction 03 · Components')}
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 40, marginTop: 8, letterSpacing: '-.01em' }}>
            Objects that <span style={{ fontStyle: 'italic', color: D3.accent }}>sit on the page</span>, not above it.
          </div>
        </div>
        <div style={{ maxWidth: 280, fontFamily: 'Newsreader, serif', fontSize: 14, lineHeight: 1.5, color: D3.soft, textAlign: 'right', fontStyle: 'italic' }}>
          No shadows. Soft rules. Generous breathing room. The interface should feel touched, not assembled.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.1fr', gap: 24, flex: 1 }}>
        {/* Actions */}
        <div style={{ background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {d3Label('Action')}
          <button style={{ background: D3.ink, color: D3.bg, border: 0, borderRadius: 999, padding: '12px 20px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, textAlign: 'center' }}>Read the synthesis ↵</button>
          <button style={{ background: 'transparent', color: D3.ink, border: `1px solid ${D3.rule}`, borderRadius: 999, padding: '11px 20px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500 }}>Add a reference</button>
          <button style={{ background: D3.accent, color: '#fff', border: 0, borderRadius: 999, padding: '12px 20px', fontFamily: 'inherit', fontSize: 14, fontWeight: 500 }}>Save to notebook</button>
          <div style={{ borderTop: `1px solid ${D3.rule}`, paddingTop: 14 }}>
            {d3Label('Tags & feeling')}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
              {[['evidence: strong', D3.sage],['needs a closer look', D3.accent],['heuristic', D3.soft],['pattern', D3.ink],['draft', D3.soft]].map(([t,c]) => (
                <span key={t} style={{ fontSize: 11.5, padding: '4px 11px', borderRadius: 999, background: 'transparent', border: `1px solid ${c}`, color: c, fontFamily: 'DM Sans, sans-serif' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Prompt + margin note */}
        <div style={{ background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {d3Label('A question')}
          <div style={{ background: D3.bg, border: `1px solid ${D3.rule}`, borderRadius: 12, padding: 16 }}>
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, lineHeight: 1.3, fontStyle: 'italic', color: D3.ink }}>
              "Why are people quietly leaving us at step three?"
            </div>
            <div style={{ borderTop: `1px solid ${D3.rule}`, marginTop: 14, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11.5, color: D3.soft }}>14 references · 3 sessions in scope</span>
              <span style={{ fontSize: 12, color: D3.accent, fontWeight: 500 }}>Begin →</span>
            </div>
          </div>
          <div>
            {d3Label('Marginal note · the AI thinking aloud')}
            <div style={{ marginTop: 8, padding: 14, borderLeft: `3px solid ${D3.accent}`, fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 15, lineHeight: 1.5, color: D3.ink }}>
              The drop-off looks like a shipping problem at first. It might be a trust problem. Worth holding both possibilities for a moment.
            </div>
          </div>
        </div>

        {/* Reference card */}
        <div style={{ background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 14, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {d3Label('Reference — handled gently')}
          <div style={{ background: D3.bg, borderRadius: 12, overflow: 'hidden', border: `1px solid ${D3.rule}` }}>
            <div style={{ height: 132, padding: 10 }}>
              <RefScreenshot palette={{ bg: D3.paper, ink: D3.ink, mute: D3.faint, accent: D3.accent }} kind="form" />
            </div>
            <div style={{ padding: 14, borderTop: `1px solid ${D3.rule}` }}>
              <div style={{ fontSize: 10.5, color: D3.soft, letterSpacing: '.1em', textTransform: 'uppercase' }}>Reference 03</div>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 18, marginTop: 4 }}>Total in the header, all the way through.</div>
              <div style={{ fontFamily: 'Newsreader, serif', fontSize: 13.5, color: D3.soft, marginTop: 6, lineHeight: 1.5, fontStyle: 'italic' }}>
                The price sits with the customer for the whole flow. Nothing changes underneath them.
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, border: `1px solid ${D3.sage}`, color: D3.sage }}>strong evidence</span>
                <span style={{ fontSize: 11, padding: '3px 9px', borderRadius: 999, border: `1px solid ${D3.rule}`, color: D3.soft }}>pattern</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
);

// ─────────────── 3.C  WORKSPACE BLUEPRINT ───────────────
const D3_Workspace = () => (
  d3Wrap(
    <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '210px 1fr 300px', gap: 0 }}>
      {/* Left: notebook */}
      <div style={{ borderRight: `1px solid ${D3.rule}`, padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontFamily: 'Newsreader, serif', fontSize: 24, letterSpacing: '-.01em' }}>
          notebook<span style={{ color: D3.accent, fontStyle: 'italic' }}>.</span>
        </div>
        <div>
          {d3Label('Studies')}
          <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8, fontFamily: 'Newsreader, serif', fontSize: 14.5 }}>
            <div style={{ color: D3.ink, fontWeight: 500 }}>Checkout step three</div>
            <div style={{ color: D3.soft }}>Onboarding feels long</div>
            <div style={{ color: D3.soft }}>Search returns too much</div>
            <div style={{ color: D3.soft }}>Notification fatigue</div>
            <div style={{ color: D3.soft, fontStyle: 'italic' }}>+ new study</div>
          </div>
        </div>
        <div>
          {d3Label('In this study')}
          <ol style={{ paddingLeft: 0, listStyle: 'none', margin: 0, marginTop: 8, fontFamily: 'Newsreader, serif', fontSize: 14, lineHeight: 1.9, color: D3.soft }}>
            <li>The question</li>
            <li style={{ color: D3.ink, fontWeight: 500 }}>Review · what I noticed</li>
            <li>Patterns I trust</li>
            <li>What I'd try next</li>
            <li>Things to do</li>
            <li>References (14)</li>
          </ol>
        </div>
      </div>

      {/* Center: reading column */}
      <div style={{ padding: '36px 64px', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          {d3Label('Review · 17 May')}
          <span style={{ fontSize: 11, color: D3.soft }}>2 min read · saved</span>
        </div>
        <h1 style={{ fontFamily: 'Newsreader, serif', fontSize: 52, lineHeight: 1.05, margin: '14px 0 6px', letterSpacing: '-.015em', fontWeight: 400 }}>
          What I noticed at <span style={{ fontStyle: 'italic', color: D3.accent }}>step three.</span>
        </h1>
        <div style={{ fontSize: 13, color: D3.soft, marginBottom: 26, fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>A short synthesis. 14 references, three recordings, one strong hunch.</div>

        <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, lineHeight: 1.6, margin: 0, maxWidth: 560, color: D3.ink }}>
          The drop-off at step three is steady but quiet. People reach the card field, pause for a few seconds, and leave. They don't bounce — they hesitate. <span style={{ background: '#F4DDC8', padding: '0 2px' }}>The total has shifted twice by the time they get there</span>, and they no longer trust the number they are about to commit to.
        </p>

        <div style={{ display: 'flex', gap: 20, margin: '24px 0', alignItems: 'flex-start' }}>
          <div style={{ width: 4, background: D3.accent, alignSelf: 'stretch', borderRadius: 2 }} />
          <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, lineHeight: 1.35, color: D3.ink, maxWidth: 520 }}>
            They leave at the price they didn't expect, not the form they didn't want to fill.
          </div>
        </div>

        <p style={{ fontFamily: 'Newsreader, serif', fontSize: 18, lineHeight: 1.6, margin: 0, maxWidth: 560, color: D3.ink }}>
          Nine of the fourteen references I read keep the total fixed in the payment-step header. Those that don't, including ours, all show the same drop-off shape — concentrated at card entry, never earlier.
        </p>
      </div>

      {/* Right: references gallery + margin notes */}
      <div style={{ borderLeft: `1px solid ${D3.rule}`, padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div>
          {d3Label('Margin')}
          <div style={{ fontFamily: 'Newsreader, serif', fontSize: 14, lineHeight: 1.5, fontStyle: 'italic', color: D3.accent, marginTop: 8 }}>
            "Three references called this exact pattern out by name."
          </div>
          <div style={{ fontSize: 10.5, color: D3.soft, marginTop: 8, letterSpacing: '.04em' }}>— companion, after read 9 of 14</div>
        </div>
        <div>
          {d3Label('References in scope')}
          <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              ['Stripe','form'],
              ['Airbnb','list'],
              ['Booking','cards'],
              ['Shopify','detail'],
              ['Lyft','form'],
              ['Instacart','cards'],
            ].map(([n,k])=>(
              <div key={n} style={{ background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 8, overflow: 'hidden' }}>
                <div style={{ height: 72 }}>
                  <RefScreenshot palette={{ bg: D3.paper, ink: D3.ink, mute: D3.faint, accent: D3.accent }} kind={k} />
                </div>
                <div style={{ padding: '6px 8px', fontSize: 11, color: D3.soft, fontFamily: 'DM Sans, sans-serif' }}>{n}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 11, color: D3.accent, marginTop: 10, fontStyle: 'italic', fontFamily: 'Newsreader, serif' }}>+ 8 more, gathered while reading</div>
        </div>
      </div>
    </div>, 0
  )
);

// ─────────────── 3.D  AI SYNTHESIS MODULES ───────────────
const D3_Synthesis = () => (
  d3Wrap(
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: '100%' }}>
      <div>
        {d3Label('Direction 03 · Synthesis modules')}
        <div style={{ fontFamily: 'Newsreader, serif', fontSize: 40, marginTop: 6, letterSpacing: '-.01em' }}>
          The AI's output, <span style={{ fontStyle: 'italic', color: D3.accent }}>as a letter</span> back to you.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28, flex: 1 }}>
        {/* Recommendations as paragraphs */}
        <div>
          {d3Label('What I\'d try next — three suggestions, in order')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 14 }}>
            {[
              ['One','Let the total sit in the payment header, fixed, all the way through.','Across nine of fourteen references this is the dominant pattern. The change is small and the evidence is unusually consistent.','strong'],
              ['Two','Pre-calculate shipping the moment the address validates.','Most teams treat this as an engineering detail; it reads on the page as a trust gesture. Worth treating as a design decision.','strong'],
              ['Three','Collapse the gift, promo, and notes fields behind a single quiet disclosure.','Less certain. Three references support it, two argue the opposite. I would test it after the first two have landed.','tentative'],
            ].map(([n,h,b,e],i)=>(
              <div key={n} style={{ borderTop: i?`1px solid ${D3.rule}`:0, paddingTop: i?16:0 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 110px', gap: 18 }}>
                  <div style={{ fontFamily: 'Newsreader, serif', fontStyle: 'italic', fontSize: 22, color: D3.accent }}>{n}.</div>
                  <div>
                    <div style={{ fontFamily: 'Newsreader, serif', fontSize: 22, lineHeight: 1.25, fontWeight: 400, letterSpacing: '-.005em' }}>{h}</div>
                    <div style={{ fontFamily: 'Newsreader, serif', fontSize: 15, color: D3.soft, marginTop: 6, lineHeight: 1.55, fontStyle: 'italic' }}>{b}</div>
                  </div>
                  <div style={{ fontSize: 11, color: e==='strong'?D3.sage:D3.accent, alignSelf: 'start', borderTop: `1px solid ${e==='strong'?D3.sage:D3.accent}`, paddingTop: 6, letterSpacing: '.06em' }}>
                    {e==='strong' ? 'EVIDENCE · STRONG' : 'EVIDENCE · TENTATIVE'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* To-dos as a list + closing note */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ background: D3.paper, border: `1px solid ${D3.rule}`, borderRadius: 14, padding: 22 }}>
            {d3Label('Things to do this week')}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 12 }}>
              {[
                ['Move the total into the sticky payment header', false, 'design'],
                ['Pre-fetch shipping when the address validates', false, 'eng'],
                ['Audit the form, mark non-essential fields', true, 'design'],
                ['Draft a one-line "expected by" hint near total', false, 'content'],
                ['Set up funnel tracking for the new flow', false, 'data'],
              ].map(([t,done,o],i)=>(
                <label key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 60px', alignItems: 'start', gap: 10, padding: '8px 0', borderBottom: i<4?`1px dashed ${D3.rule}`:0, cursor: 'pointer' }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: '50%',
                    border: `1.5px solid ${done?D3.sage:D3.soft}`, background: done?D3.sage:'transparent',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 10, marginTop: 2,
                  }}>{done && '✓'}</span>
                  <span style={{ fontFamily: 'Newsreader, serif', fontSize: 16, lineHeight: 1.4, color: done?D3.soft:D3.ink, textDecoration: done?'line-through':'none' }}>{t}</span>
                  <span style={{ fontSize: 10.5, color: D3.soft, letterSpacing: '.1em', textTransform: 'uppercase', fontFamily: 'DM Sans, sans-serif', textAlign: 'right', marginTop: 4 }}>{o}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ background: D3.accent, color: '#FBF5E6', padding: 22, borderRadius: 14 }}>
            {d3Label('A closing thought')}
            <div style={{ fontFamily: 'Newsreader, serif', fontSize: 19, lineHeight: 1.4, marginTop: 10, fontStyle: 'italic' }}>
              "Most of this is a single change pretending to be three. If you only do the first, the rest will tell you what they want to be."
            </div>
            <div style={{ fontSize: 11, marginTop: 14, opacity: .8, letterSpacing: '.06em' }}>— your companion · medium confidence · 14 refs</div>
          </div>
        </div>
      </div>
    </div>
  )
);

window.D3_Foundations = D3_Foundations;
window.D3_Components = D3_Components;
window.D3_Workspace = D3_Workspace;
window.D3_Synthesis = D3_Synthesis;
