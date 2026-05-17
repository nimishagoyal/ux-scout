// UNIFIED — Workspace 'spread' artboard.
// The showpiece. Reading column + marginalia gutter + curated reference rail.

const U_Workspace = () => Uwrap(
  <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '170px 1fr', columnGap: 0 }}>

    {/* ─── Left rail: minimal, italic, no icons ─────────────────── */}
    <aside style={{ paddingTop: 6, paddingRight: 28, borderRight: `1px solid ${U.rule}`, display: 'flex', flexDirection: 'column', gap: 30 }}>
      <div>
        <div style={{ ...Utype.marquee, fontSize: 30, color: U.ink, letterSpacing: '-.02em' }}>
          M<span style={{ ...Utype.italic, color: U.terracotta }}>argin</span>
        </div>
        <div style={{ ...Utype.micro, marginTop: 6, fontSize: 9 }}>A studio · est. 2026</div>
      </div>

      <div>
        {Umicro('Studies', U.faint)}
        <ul style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            ['Checkout · step three', true],
            ['Onboarding feels long', false],
            ['Search returns too much', false],
            ['Notifications, fatigue', false],
          ].map(([t,active]) => (
            <li key={t} style={{ position: 'relative', paddingLeft: active ? 14 : 0 }}>
              {active && <span style={{ position: 'absolute', left: 0, top: 7, width: 6, height: 6, borderRadius: '50%', background: U.terracotta }} />}
              <div style={{ ...Utype.readingI, fontSize: active ? 16 : 15, color: active ? U.ink : U.soft, lineHeight: 1.35 }}>{t}</div>
            </li>
          ))}
          <li style={{ paddingTop: 4 }}>
            <div style={{ ...Utype.readingI, fontSize: 14, color: U.terracotta }}>+ a new question</div>
          </li>
        </ul>
      </div>

      <div>
        {Umicro('In this study', U.faint)}
        <ol style={{ listStyle: 'none', padding: 0, margin: '12px 0 0', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            ['I',   'The question',   false],
            ['II',  'Review',          true],
            ['III', 'Patterns I trust',false],
            ['IV',  "What I'd try",    false],
            ['V',   'Things to do',    false],
            ['VI',  'References (14)', false],
          ].map(([n,t,active]) => (
            <li key={n} style={{ display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8, alignItems: 'baseline' }}>
              <Roman n={n} color={active ? U.terracotta : U.faint} size={13} />
              <span style={{ ...Utype.reading, fontSize: 13, color: active ? U.ink : U.soft, lineHeight: 1.4 }}>{t}</span>
            </li>
          ))}
        </ol>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${U.hairline}` }}>
        <div style={{ ...Utype.micro, fontSize: 9 }}>14 refs · 3 sessions</div>
        <div style={{ ...Utype.readingI, fontSize: 13, color: U.soft, marginTop: 4 }}>Last read · today</div>
      </div>
    </aside>

    {/* ─── Spread: reading + marginalia + reference rail ─────────── */}
    <main style={{ padding: '0 0 0 36px', display: 'grid', gridTemplateColumns: '1.5fr 80px 1.05fr', columnGap: 28, overflow: 'hidden' }}>

      {/* COL 1 — reading */}
      <article style={{ paddingTop: 4, overflow: 'hidden' }}>
        {/* Running head */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${U.hairline}`, paddingBottom: 8 }}>
          {Umicro('Checkout · step three  /  §II · Review', U.soft)}
          <div style={{ ...Utype.italic, fontSize: 13, color: U.terracotta }}>ii. of vi.</div>
        </div>

        {/* Section marquee */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18, marginTop: 26 }}>
          <div style={{ ...Utype.italic, fontSize: 90, color: U.terracotta, lineHeight: .85 }}>II</div>
          <div style={{ paddingTop: 12 }}>
            {Umicro('What I noticed', U.soft)}
            <h1 style={{ ...Utype.marquee, fontSize: 54, color: U.ink, margin: '8px 0 0' }}>
              The total <span style={{ ...Utype.italic, color: U.ink }}>shifts</span> beneath them.
            </h1>
          </div>
        </div>

        <div style={{ ...Utype.readingI, fontSize: 14, color: U.soft, marginTop: 14 }}>
          A short synthesis · 14 references in scope, three internal recordings, one strong hunch.
        </div>

        {/* Body */}
        <div style={{ marginTop: 24, maxWidth: 560 }}>
          <p style={{ ...Utype.reading, fontSize: 18.5, color: U.ink, margin: 0 }}>
            <span style={{ ...Utype.italic, fontSize: 60, float: 'left', lineHeight: .85, marginRight: 10, marginTop: 6, color: U.ink }}>P</span>
            eople reach the card field, pause for a few seconds, and quietly leave. They do not bounce — they hesitate. By the time the card asks them to commit, the total has shifted twice — once when shipping resolved, once when tax appended<sup><span style={{ ...Utype.italic, fontSize: 12, color: U.inkblue, padding: '0 1px' }}>iii</span></sup>, and the number on screen no longer feels like the number they agreed to.
          </p>

          <p style={{ ...Utype.reading, fontSize: 18.5, color: U.ink, marginTop: 18 }}>
            Nine of fourteen referenced flows hold the total fixed in the payment-step header throughout. The remaining five defer it<sup><span style={{ ...Utype.italic, fontSize: 12, color: U.inkblue }}>vii</span></sup> — and every one of them reports the same drop-off shape, concentrated at card entry, never earlier.
          </p>

          {/* Pull quote */}
          <blockquote style={{ margin: '28px 0 0', padding: '0 0 0 22px', borderLeft: `2px solid ${U.terracotta}` }}>
            <div style={{ ...Utype.italic, fontSize: 28, lineHeight: 1.18, color: U.ink, letterSpacing: '-.01em' }}>
              They leave at the price they didn't expect, not the form they didn't want to fill.
            </div>
            <div style={{ ...Utype.micro, marginTop: 10, color: U.terracotta }}>Margin · medium confidence · 14 refs</div>
          </blockquote>

          <p style={{ ...Utype.reading, fontSize: 18.5, color: U.ink, marginTop: 28 }}>
            Treat this less as a shipping problem and more as a problem of <span style={{ ...Utype.italic, color: U.terracotta }}>steadiness</span> — the figure on screen should be the one the customer commits to, and it should arrive before the card field asks them to.
          </p>
        </div>

        {/* Footer of the page */}
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 26, borderTop: `1px solid ${U.hairline}`, marginTop: 28 }}>
          {Umicro('continue · §III patterns I trust  →', U.terracotta)}
          {Umicro('17.05.2026', U.faint)}
        </div>
      </article>

      {/* COL 2 — marginalia gutter */}
      <aside style={{ borderLeft: `1px dashed ${U.rule}`, borderRight: `1px dashed ${U.rule}`, padding: '60px 8px 0 8px', display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          {Umicro('margin · iii', U.terracotta)}
          <div style={{ ...Utype.readingI, fontSize: 12.5, color: U.terracotta, lineHeight: 1.45, marginTop: 6 }}>
            Three references called this exact pattern out by name.
          </div>
        </div>
        <div style={{ marginTop: 60 }}>
          {Umicro('margin · vii', U.terracotta)}
          <div style={{ ...Utype.readingI, fontSize: 12.5, color: U.terracotta, lineHeight: 1.45, marginTop: 6 }}>
            Two of the five also tax-defer. Worth separating those signals before acting.
          </div>
        </div>
        <div style={{ marginTop: 'auto', paddingBottom: 30 }}>
          {Umicro('reading', U.faint)}
          <div style={{ ...Utype.italic, fontSize: 14, color: U.soft, marginTop: 6 }}>~ 2 min</div>
        </div>
      </aside>

      {/* COL 3 — curated reference rail */}
      <aside style={{ paddingTop: 4, overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: `1px solid ${U.hairline}`, paddingBottom: 8 }}>
          {Umicro('Plates · references in scope', U.soft)}
          <div style={{ ...Utype.italic, fontSize: 13, color: U.terracotta }}>14</div>
        </div>

        {/* Hero plate */}
        <div style={{ marginTop: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <Roman n="iii" size={14} color={U.inkblue} />
            <div style={{ ...Utype.micro, fontSize: 9 }}>plate · hero</div>
          </div>
          <URef kind="form" h={210} accent={U.terracotta} label="Total in the payment header, all the way through." source="stripe / R-001" />
        </div>

        {/* Companion grid, varied sizes */}
        <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          <div>
            <Roman n="vii" size={13} color={U.inkblue} />
            <div style={{ marginTop: 4 }}>
              <URef kind="list" h={112} accent={U.olive} label="One-tap reuse of stored cards." source="airbnb / R-004" />
            </div>
          </div>
          <div>
            <Roman n="ix" size={13} color={U.inkblue} />
            <div style={{ marginTop: 4 }}>
              <URef kind="cards" h={112} accent={U.terracotta} label="Order summary, persistent." source="booking / R-009" />
            </div>
          </div>
        </div>

        {/* Inline citation strip */}
        <div style={{ marginTop: 22, paddingTop: 14, borderTop: `1px solid ${U.hairline}` }}>
          {Umicro('cited in this section', U.faint)}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
            {['stripe','shopify','airbnb','booking','vercel','lyft','instacart'].map((s,i) => (
              <span key={s} style={{ ...Utype.italic, fontSize: 13, color: i<4 ? U.ink : U.faint }}>{s}{i<6 && <span style={{ color: U.faint, marginLeft: 6 }}>·</span>}</span>
            ))}
          </div>
        </div>
      </aside>
    </main>
  </div>,
  { pad: 36 }
);

window.U_Workspace = U_Workspace;
