// UNIFIED — Component language, AI synthesis, curated reference module.
// Three artboards exported from this file.

// ─────────────────────────────────────────────────────────────
// B · COMPONENT LANGUAGE
// ─────────────────────────────────────────────────────────────
const U_Components = () => Uwrap(
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', columnGap: 24, rowGap: 32, height: '100%', alignContent: 'start' }}>

    {/* Running head */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      {Umicro('Margin · a studio for product research', U.soft)}
      {Umicro('§ I.B  Component Language', U.terracotta)}
    </div>

    {/* Marquee */}
    <div style={{ gridColumn: '1 / span 11', alignSelf: 'start' }}>
      <div style={{ ...Utype.marquee, fontSize: 84, color: U.ink, lineHeight: .92 }}>
        Few containers. <span style={{ ...Utype.italic, color: U.terracotta }}>Many gestures.</span>
      </div>
    </div>
    <div style={{ gridColumn: '12 / -1', alignSelf: 'end', paddingBottom: 8 }}>
      <div style={{ ...Utype.readingI, fontSize: 14, color: U.soft, lineHeight: 1.5 }}>
        Borders are hairlines or absent. Rhythm is carried by space and type.
      </div>
    </div>

    {/* A. Action — pill primary, soft ghost, italic link */}
    <section style={{ gridColumn: '1 / span 4', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      {Umicro('A · Action')}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
        <button style={{ background: U.ink, color: U.paper, border: 0, borderRadius: 999, padding: '12px 22px', ...Utype.uiMed, fontSize: 14, textAlign: 'left' }}>
          Read the synthesis  <span style={{ ...Utype.italic, fontSize: 16, marginLeft: 6 }}>↵</span>
        </button>
        <button style={{ background: 'transparent', color: U.ink, border: `1px solid ${U.ink}`, borderRadius: 999, padding: '11px 22px', ...Utype.uiMed, fontSize: 14, textAlign: 'left' }}>
          Add a reference
        </button>
        <div style={{ ...Utype.italic, fontSize: 16, color: U.terracotta, paddingTop: 4 }}>
          open in the reference rail →
        </div>
        <div style={{ ...Utype.italic, fontSize: 16, color: U.inkblue }}>
          see the evidence chain ↘
        </div>
      </div>
      <div style={{ marginTop: 22, paddingTop: 14, borderTop: `1px solid ${U.hairline}` }}>
        {Umicro('Keys', U.faint)}
        <div style={{ display: 'flex', gap: 10, marginTop: 8, alignItems: 'center' }}>
          <span style={{ ...Utype.ui, fontSize: 11, padding: '3px 7px', borderRadius: 5, background: U.raised, color: U.ink }}>⌘ K</span>
          <span style={{ ...Utype.italic, fontSize: 13, color: U.soft }}>open the studio</span>
        </div>
      </div>
    </section>

    {/* B. The question — no field, just a question */}
    <section style={{ gridColumn: '5 / span 5', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      {Umicro('B · A question, asked aloud')}
      <div style={{ marginTop: 18 }}>
        <div style={{ ...Utype.italic, fontSize: 34, lineHeight: 1.18, color: U.ink, letterSpacing: '-.01em' }}>
          "Why are people quietly leaving us at step three?"
        </div>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: `1px solid ${U.hairline}`, paddingTop: 10 }}>
          {Umicro('scope · 14 references · 3 recordings · the last week', U.soft)}
          <div style={{ ...Utype.italic, fontSize: 16, color: U.terracotta }}>begin →</div>
        </div>
      </div>
      <div style={{ marginTop: 18 }}>
        {Umicro('C · Citation marks · small italic roman', U.faint)}
        <div style={{ ...Utype.reading, fontSize: 16.5, color: U.ink, marginTop: 10, maxWidth: 460 }}>
          Hold the total in the payment-step header<sup><span style={{ ...Utype.italic, fontSize: 11, color: U.inkblue, padding: '0 1px' }}>iii</span></sup>, fixed throughout. Pre-fetch shipping the moment the address validates<sup><span style={{ ...Utype.italic, fontSize: 11, color: U.inkblue }}>vii</span></sup>.
        </div>
      </div>
    </section>

    {/* C. Chips, tags, evidence badges */}
    <section style={{ gridColumn: '10 / span 5', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      {Umicro('D · Chips · evidence, kind, mood')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 14 }}>
        {[
          ['evidence · strong',    U.olive],
          ['evidence · medium',    U.terracotta],
          ['evidence · tentative', U.soft],
          ['pattern',              U.ink],
          ['heuristic',            U.soft],
          ['anti-pattern',         U.plum],
          ['needs a closer look',  U.terracotta],
          ['draft',                U.faint],
        ].map(([t,c]) => (
          <span key={t} style={{ ...Utype.italic, fontSize: 13, padding: '3px 12px', borderRadius: 999, border: `1px solid ${c}`, color: c, background: 'transparent' }}>{t}</span>
        ))}
      </div>

      <div style={{ marginTop: 22 }}>
        {Umicro('E · Evidence meter · quiet, no bars', U.faint)}
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            ['Shipping surprise', 9, 14, U.olive],
            ['Field fatigue',     7, 14, U.terracotta],
            ['Trust deficit',     5, 14, U.terracotta],
            ['Performance',       2, 14, U.faint],
          ].map(([t,n,d,c])=>(
            <div key={t} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 12, alignItems: 'baseline', borderBottom: `1px solid ${U.hairline}`, paddingBottom: 6 }}>
              <span style={{ ...Utype.reading, fontSize: 14, color: U.ink }}>{t}</span>
              <span style={{ ...Utype.italic, fontSize: 16, color: c }}>{n} of {d}</span>
              <span style={{ ...Utype.micro, fontSize: 9 }}>refs</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* D. Footer running head */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 12 }}>
      {Umicro('I.B · components', U.soft)}
      {Umicro('M / Margin', U.terracotta)}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// C · AI SYNTHESIS — recommendations as editorial
// ─────────────────────────────────────────────────────────────
const U_Synthesis = () => Uwrap(
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', columnGap: 24, rowGap: 0, height: '100%' }}>

    {/* Running head */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 14, borderBottom: `1px solid ${U.hairline}` }}>
      {Umicro('Checkout · step three  /  §IV · What I would try', U.soft)}
      {Umicro('M / Margin', U.terracotta)}
    </div>

    {/* Marquee */}
    <div style={{ gridColumn: '1 / span 9', marginTop: 26 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 22 }}>
        <div style={{ ...Utype.italic, fontSize: 110, color: U.terracotta, lineHeight: .85 }}>IV</div>
        <div style={{ paddingTop: 18 }}>
          {Umicro('A short list, in order', U.soft)}
          <h1 style={{ ...Utype.marquee, fontSize: 60, color: U.ink, margin: '6px 0 0', letterSpacing: '-.015em' }}>
            What I'd try <span style={{ ...Utype.italic, color: U.ink }}>next</span>.
          </h1>
        </div>
      </div>
    </div>

    <div style={{ gridColumn: '11 / -1', marginTop: 26, alignSelf: 'end' }}>
      <div style={{ ...Utype.readingI, fontSize: 15, color: U.soft, lineHeight: 1.5 }}>
        Three suggestions. The first is the one I'd run a meeting on; the third is the one I'd hold lightly.
      </div>
    </div>

    {/* Recommendations as articles */}
    <div style={{ gridColumn: '1 / span 9', marginTop: 36, display: 'flex', flexDirection: 'column' }}>
      {[
        {
          n: 'i', size: 'large',
          h: 'Let the total sit in the payment header, fixed, all the way through.',
          b: 'Nine of fourteen references hold the price steady from the moment it is first shown. The remaining five let it shift — and every one of them shows the drop-off pattern we are seeing. The change is mechanically small and the evidence is unusually consistent.',
          tag: 'strong', cite: 'i · iii · vii · ix',
        },
        {
          n: 'ii', size: 'large',
          h: 'Pre-fetch shipping the moment the address validates.',
          b: 'Most teams treat this as an engineering detail. Read on the page, it is a trust gesture — the figure does not surprise the customer at the payment step because it has already arrived.',
          tag: 'strong', cite: 'ii · vii',
        },
        {
          n: 'iii', size: 'small',
          h: 'Collapse the gift, promo, and notes fields behind a single quiet disclosure.',
          b: 'Less certain. Three references favour this, two argue for visibility. I would test it after the first two have landed.',
          tag: 'tentative', cite: 'xi',
        },
      ].map((r,i) => (
        <article key={r.n} style={{ padding: '24px 0', borderTop: i ? `1px solid ${U.hairline}` : 0, display: 'grid', gridTemplateColumns: '54px 1fr 110px', gap: 22, alignItems: 'baseline' }}>
          <Roman n={r.n} size={36} color={r.tag === 'strong' ? U.terracotta : U.faint} />
          <div>
            <h2 style={{ ...Utype.marquee, fontSize: r.size === 'large' ? 30 : 22, color: U.ink, margin: 0, letterSpacing: '-.01em', lineHeight: 1.15 }}>{r.h}</h2>
            <p style={{ ...Utype.reading, fontSize: 15, color: U.soft, margin: '8px 0 0', maxWidth: 560 }}>{r.b}</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 10, alignItems: 'baseline' }}>
              {Umicro(`cited · ${r.cite}`, U.inkblue)}
            </div>
          </div>
          <div style={{ alignSelf: 'start' }}>
            <div style={{ ...Utype.italic, fontSize: 14, color: r.tag === 'strong' ? U.olive : U.terracotta }}>
              evidence · {r.tag}
            </div>
            <div style={{ width: 60, height: 1, background: r.tag === 'strong' ? U.olive : U.terracotta, marginTop: 6 }} />
          </div>
        </article>
      ))}
    </div>

    {/* Right column: things to do + closing note */}
    <aside style={{ gridColumn: '11 / -1', marginTop: 36, borderLeft: `1px solid ${U.hairline}`, paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 22 }}>
      <div>
        {Umicro('§ V · Things to do this week')}
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column' }}>
          {[
            ['Move the total into the sticky payment header', false, 'design'],
            ['Pre-fetch shipping when the address validates', false, 'eng'],
            ['Audit the form, mark non-essential fields', true,  'design'],
            ['Draft a one-line "expected by" hint near total', false, 'content'],
            ['Set up funnel tracking for the new flow', false, 'data'],
          ].map(([t,done,o],i) => (
            <label key={i} style={{ display: 'grid', gridTemplateColumns: '22px 1fr 56px', alignItems: 'start', gap: 10, padding: '10px 0', borderBottom: i<4 ? `1px solid ${U.hairline}` : 0, cursor: 'pointer' }}>
              <span style={{
                width: 14, height: 14, borderRadius: '50%', marginTop: 4,
                border: `1.5px solid ${done ? U.olive : U.soft}`,
                background: done ? U.olive : 'transparent',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                color: U.card, fontSize: 9,
              }}>{done && '✓'}</span>
              <span style={{ ...Utype.reading, fontSize: 14.5, color: done ? U.soft : U.ink, textDecoration: done ? 'line-through' : 'none', lineHeight: 1.4 }}>{t}</span>
              <span style={{ ...Utype.italic, fontSize: 12, color: U.terracotta, textAlign: 'right', marginTop: 4 }}>{o}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Editor's letter */}
      <div style={{ background: U.terracotta, color: '#FBF3E2', padding: 20, marginTop: 6 }}>
        {Umicro("Editor's note", '#FBF3E2')}
        <div style={{ ...Utype.italic, fontSize: 19, lineHeight: 1.35, marginTop: 10 }}>
          Most of this is one change pretending to be three. If you only do the first, the rest will tell you what they want to be.
        </div>
        <div style={{ ...Utype.micro, marginTop: 14, color: '#FBF3E2', opacity: .75 }}>— Margin · medium confidence · 14 refs</div>
      </div>
    </aside>

    {/* Footer */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 14, borderTop: `1px solid ${U.hairline}`, marginTop: 'auto' }}>
      {Umicro('IV · what i would try · 17.05.2026', U.soft)}
      {Umicro('iv. of vi.', U.terracotta)}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// D · CURATED REFERENCE MODULE — multiple ways to present screenshots
// ─────────────────────────────────────────────────────────────
const U_References = () => Uwrap(
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', columnGap: 24, rowGap: 24, height: '100%', alignContent: 'start' }}>

    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      {Umicro('Margin · a studio for product research', U.soft)}
      {Umicro('§ I.D  Reference Plates', U.terracotta)}
    </div>

    <div style={{ gridColumn: '1 / span 9' }}>
      <div style={{ ...Utype.marquee, fontSize: 72, color: U.ink, lineHeight: .95 }}>
        How a <span style={{ ...Utype.italic, color: U.terracotta }}>reference</span> sits on the page.
      </div>
    </div>
    <div style={{ gridColumn: '10 / -1', alignSelf: 'end', paddingBottom: 6 }}>
      <div style={{ ...Utype.readingI, fontSize: 14, color: U.soft, lineHeight: 1.5 }}>
        Curated like a magazine plate, never uniform. Four treatments — hero, companion, inline, comparison — composed by the reasoning, not by the grid.
      </div>
    </div>

    {/* Plate I — hero with caption + pull */}
    <div style={{ gridColumn: '1 / span 7', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <Roman n="i" size={28} color={U.terracotta} />
          <div style={{ ...Utype.italic, fontSize: 22, color: U.ink }}>Plate · hero</div>
        </div>
        {Umicro('full-bleed within rail', U.faint)}
      </div>
      <div style={{ marginTop: 14 }}>
        <URef kind="form" h={260} accent={U.terracotta} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 14, marginTop: 14 }}>
        <div>
          <div style={{ ...Utype.italic, fontSize: 19, color: U.ink, lineHeight: 1.35 }}>
            "The total sits with the customer for the entire flow. Nothing changes underneath them."
          </div>
          {Umicro('stripe · checkout · captured may 14', U.soft)}
        </div>
        <div style={{ ...Utype.italic, fontSize: 13, color: U.olive, alignSelf: 'start' }}>
          evidence · strong
          <div style={{ width: 56, height: 1, background: U.olive, marginTop: 6 }} />
        </div>
      </div>
    </div>

    {/* Plate II — companion, three small cards, varying tone */}
    <div style={{ gridColumn: '8 / -1', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <Roman n="ii" size={28} color={U.terracotta} />
          <div style={{ ...Utype.italic, fontSize: 22, color: U.ink }}>Plate · companions</div>
        </div>
        {Umicro('varied sizes, not a grid', U.faint)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', gap: 14, marginTop: 14 }}>
        <URef kind="list"   h={150} accent={U.olive}      label="One-tap reuse." source="airbnb · R-004" />
        <URef kind="cards"  h={150} accent={U.terracotta} label="Sticky summary." source="booking · R-009" />
        <URef kind="detail" h={150} accent={U.inkblue}    label="Quiet receipt." source="lyft · R-011" />
      </div>
      <div style={{ marginTop: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <Roman n="iii" size={28} color={U.terracotta} />
            <div style={{ ...Utype.italic, fontSize: 22, color: U.ink }}>Plate · inline</div>
          </div>
          {Umicro('thumbnail inside prose, like a footnote', U.faint)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 14, marginTop: 14, alignItems: 'start' }}>
          <div style={{ height: 64, background: U.card, border: `1px solid ${U.rule}`, padding: 6 }}>
            <RefScreenshot palette={{ bg: U.card, ink: U.ink, mute: U.raised, accent: U.terracotta }} kind="form" />
          </div>
          <p style={{ ...Utype.reading, fontSize: 15, color: U.ink, margin: 0, lineHeight: 1.55 }}>
            Stripe's checkout, <span style={{ ...Utype.italic, color: U.terracotta }}>here</span>, keeps the figure visible in the header on every step — including the card field — and it is the small detail that makes the larger argument feel obvious.
          </p>
        </div>
      </div>
    </div>

    {/* Plate IV — comparison */}
    <div style={{ gridColumn: '1 / -1', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <Roman n="iv" size={28} color={U.terracotta} />
          <div style={{ ...Utype.italic, fontSize: 22, color: U.ink }}>Plate · comparison</div>
        </div>
        {Umicro('two flows · the gesture is the contrast', U.faint)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px 1fr', gap: 18, marginTop: 16, alignItems: 'start' }}>
        <div>
          <URef kind="form" h={150} accent={U.olive} />
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ ...Utype.italic, fontSize: 16, color: U.ink }}>Total in the header.</div>
            {Umicro('9 of 14', U.olive)}
          </div>
        </div>
        <div style={{ ...Utype.italic, fontSize: 18, color: U.soft, textAlign: 'center', alignSelf: 'center', paddingTop: 24 }}>
          versus
        </div>
        <div>
          <URef kind="form" h={150} accent={U.plum} />
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <div style={{ ...Utype.italic, fontSize: 16, color: U.ink }}>Total deferred to the receipt.</div>
            {Umicro('5 of 14', U.plum)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

window.U_Components = U_Components;
window.U_Synthesis = U_Synthesis;
window.U_References = U_References;
