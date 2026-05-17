// UNIFIED — Foundations & atmosphere artboard
// Shows: type system, palette, voice, the felt quality.

const U_Foundations = () => Uwrap(
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gridTemplateRows: 'auto auto 1fr auto', columnGap: 24, rowGap: 44, height: '100%' }}>

    {/* Running head — barely there */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      {Umicro('Margin · a studio for product research', U.soft)}
      {Umicro('§ I  Foundations', U.terracotta)}
    </div>

    {/* Marquee — oversized italic, asymmetric, two controlled lines */}
    <div style={{ gridColumn: '1 / span 9', alignSelf: 'start' }}>
      <div style={{ ...Utype.marquee, fontSize: 104, color: U.ink, lineHeight: .95 }}>
        A studio <span style={{ ...Utype.italic, color: U.terracotta }}>for the</span><br />
        second <span style={{ ...Utype.italic, color: U.inkblue }}>look</span>
        <span style={{ ...Utype.marquee, color: U.ink }}>.</span>
      </div>
    </div>

    {/* Atmospheric note in margin */}
    <div style={{ gridColumn: '11 / span 4', alignSelf: 'end', paddingBottom: 16 }}>
      <div style={{ ...Utype.readingI, fontSize: 17, color: U.terracotta, lineHeight: 1.45 }}>
        "Less a tool, more a reading room — where the evidence breathes and the reasoning shows its work."
      </div>
      <div style={{ ...Utype.micro, marginTop: 12, fontSize: 9.5 }}>— Art direction · the felt quality</div>
    </div>

    {/* Type system — three voices */}
    <div style={{ gridColumn: '1 / span 8', borderTop: `1px solid ${U.rule}`, paddingTop: 22 }}>
      {Umicro('Type · three voices, three jobs')}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div>
          <div style={{ ...Utype.marquee, fontSize: 56, color: U.ink }}>
            Instrument <span style={{ ...Utype.italic, color: U.terracotta }}>Serif</span>
          </div>
          <div style={{ ...Utype.micro, marginTop: 4 }}>Display · marquee · pull quotes · 32 – 132 / -2%</div>
        </div>
        <div>
          <div style={{ ...Utype.reading, fontSize: 21, color: U.ink, maxWidth: 560 }}>
            Newsreader, for sentences that earn the reader's time — the long stretches of synthesis where the AI takes its breath and tells you what it found.
          </div>
          <div style={{ ...Utype.micro, marginTop: 6 }}>Reading · Newsreader · 16 – 21 / 1.6 · prose only</div>
        </div>
        <div>
          <div style={{ ...Utype.uiMed, fontSize: 14, color: U.ink, letterSpacing: '-.005em' }}>
            Geist, only inside the interface — labels, controls, the metadata that should never raise its voice.
          </div>
          <div style={{ ...Utype.micro, marginTop: 4 }}>Interface · Geist · 11 – 14 · controls · captions · running heads</div>
        </div>
      </div>
    </div>

    {/* Palette — large swatches with usage */}
    <div style={{ gridColumn: '9 / span 6', borderTop: `1px solid ${U.rule}`, paddingTop: 22 }}>
      {Umicro('Palette · one paper, four accents, one per surface')}

      {/* Neutrals row */}
      <div style={{ marginTop: 14, display: 'flex', gap: 0, height: 72 }}>
        {[
          ['Paper',  U.paper,  U.ink],
          ['Card',   U.card,   U.ink],
          ['Raised', U.raised, U.ink],
          ['Soft',   U.soft,   U.card],
          ['Ink',    U.ink,    U.card],
        ].map(([n,c,t]) => (
          <div key={n} style={{ background: c, color: t, flex: 1, padding: 10, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRight: `1px solid ${U.hairline}` }}>
            <span style={{ ...Utype.micro, color: t, opacity: .7, fontSize: 9 }}>{n}</span>
            <span style={{ fontSize: 9.5, fontFamily: 'Geist Mono, monospace', color: t, opacity: .55 }}>{c.toUpperCase()}</span>
          </div>
        ))}
      </div>

      {/* Accents — circular swatches with notes, more curatorial */}
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          ['Terracotta', U.terracotta, 'AI voice · marginalia · warmth'],
          ['Ink-blue',   U.inkblue,    'Citations · links · intellect'],
          ['Olive',      U.olive,      'Validated · strong evidence'],
          ['Plum',       U.plum,       'Care · rare antipattern'],
        ].map(([n,c,note]) => (
          <div key={n} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: c }} />
            <div style={{ ...Utype.italic, fontSize: 16, color: U.ink }}>{n}</div>
            <div style={{ ...Utype.reading, fontSize: 11.5, color: U.soft, lineHeight: 1.4 }}>{note}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Grid + measure */}
    <div style={{ gridColumn: '1 / span 8', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      {Umicro('Grid · 14 cols · prose locks to 3–7 · reference rail 9–13 · marginalia in the gutter')}
      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'repeat(14,1fr)', gap: 3, height: 48 }}>
        {Array.from({length:14}).map((_,i)=>{
          const isProse = i>=2 && i<=6;
          const isRail = i>=8 && i<=12;
          const isMargin = i===7;
          return <div key={i} style={{
            background: isProse ? U.ink : isRail ? U.terracotta : isMargin ? U.inkblue : U.raised,
            opacity: isProse ? .12 : isRail ? .18 : isMargin ? .25 : 1,
          }} />;
        })}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14,1fr)', gap: 3, marginTop: 4 }}>
        {Array.from({length:14}).map((_,i)=>(
          <div key={i} style={{ ...Utype.micro, fontSize: 8, textAlign: 'center', opacity: i<9 || i>13 ? .35 : 1, color: i===7 ? U.inkblue : i>=2 && i<=6 ? U.ink : i>=8 && i<=12 ? U.terracotta : U.faint }}>{i+1}</div>
        ))}
      </div>
    </div>

    {/* Voice principles */}
    <div style={{ gridColumn: '9 / span 6', borderTop: `1px solid ${U.rule}`, paddingTop: 18 }}>
      {Umicro('Voice · the AI as a thoughtful collaborator')}
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Not', 'Here are 10 best practices for checkout optimization.', U.faint, false],
          ['But', 'Across the references I read, three patterns held — and one of them surprised me.', U.ink, false],
          ['And', 'I want to flag one place where I am less sure than the others.', U.terracotta, true],
        ].map(([h,t,c,em]) => (
          <div key={h} style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: 14, alignItems: 'baseline' }}>
            <div style={{ ...Utype.micro, fontSize: 10, color: U.soft }}>{h}</div>
            <div style={{ ...Utype.readingI, fontSize: 15.5, color: c, lineHeight: 1.45, fontStyle: em ? 'italic' : 'italic' }}>"{t}"</div>
          </div>
        ))}
      </div>
    </div>

    {/* Footer running head */}
    <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      {Umicro('I.A · foundations · 17.05.2026', U.soft)}
      {Umicro('M / Margin', U.terracotta)}
    </div>
  </div>
);

window.U_Foundations = U_Foundations;
