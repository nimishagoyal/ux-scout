// LUMEN — I.A · Atmosphere & system foundations.
// The lit research wall, palette as light wells, type system on dark, motion principles.

const Lumen_Atmosphere = () => Lwrap(
  <div style={{ position: 'relative', height: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto', rowGap: 28 }}>

    {/* Warm light wells — implied tungsten */}
    <Halo x="14%" y="22%" w={520} h={320} color="rgba(217,150,62,0.20)" blur={120} />
    <Halo x="92%" y="72%" w={460} h={300} color="rgba(79,115,174,0.18)" blur={120} />

    {/* Running head */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', position: 'relative', zIndex: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 18px ${L.amberGlow}`, animation: 'lumen-pulse 3.6s ease-in-out infinite' }} />
        {Lmicro('Lumen · a thinking environment', L.bone)}
      </div>
      {Lmicro('§ I.A  Atmosphere', L.amberGlow)}
    </div>

    {/* Marquee + atmospheric note */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', columnGap: 24, position: 'relative', zIndex: 2 }}>
      <div style={{ gridColumn: '1 / span 10', alignSelf: 'center' }}>
        <div style={{ ...Ltype.marquee, fontSize: 108, color: L.bone, lineHeight: 1 }}>
          A studio<br />
          <span style={{ ...Ltype.italic, color: L.amberGlow }}>that thinks</span>{' '}
          <span style={{ ...Ltype.marquee, color: L.bone }}>with you</span>
          <span style={{ ...Ltype.italic, color: L.cobaltGlow }}>.</span>
        </div>
      </div>
      <div style={{ gridColumn: '11 / span 4', alignSelf: 'end' }}>
        <div style={{ ...Ltype.readingI, fontSize: 17, color: L.ink, lineHeight: 1.5 }}>
          Lit by tungsten, not LED. Warm graphite ground, references pinned to it, the AI quietly rearranging them as it reads.
        </div>
        <div style={{ ...Ltype.micro, marginTop: 10, color: L.amberGlow }}>
          — felt quality
        </div>
      </div>

      {/* Type system */}
      <div style={{ gridColumn: '1 / span 8', marginTop: 36, borderTop: `1px solid ${L.rule}`, paddingTop: 22 }}>
        {Lmicro('Type · three voices, lighter weights on dark')}
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div>
            <div style={{ ...Ltype.marquee, fontSize: 56, color: L.bone }}>
              Instrument <span style={{ ...Ltype.italic, color: L.amberGlow }}>Serif</span>
            </div>
            <div style={{ ...Ltype.micro, marginTop: 4 }}>display · 28 – 132 · italic carries voice</div>
          </div>
          <div>
            <div style={{ ...Ltype.reading, fontSize: 18.5, color: L.ink, maxWidth: 540 }}>
              Newsreader 300 weight, for paragraphs the AI writes back at the end of a long read.
            </div>
            <div style={{ ...Ltype.micro, marginTop: 4 }}>reading · newsreader · 300 · 16 – 21 / 1.6</div>
          </div>
          <div>
            <div style={{ ...Ltype.uiThin, fontSize: 14, color: L.bone }}>
              Geist, only where the interface has to speak — labels, coordinates, ambient metadata.
            </div>
            <div style={{ ...Ltype.micro, marginTop: 4 }}>ui · geist · 300/400 · 10 – 14 · wide tracked</div>
          </div>
        </div>
      </div>

      {/* Palette as light wells */}
      <div style={{ gridColumn: '9 / span 6', marginTop: 36, borderTop: `1px solid ${L.rule}`, paddingTop: 22 }}>
        {Lmicro('Palette · light wells, not chips')}
        <div style={{ position: 'relative', marginTop: 16, height: 220 }}>
          {[
            { x: '12%', y: '30%', color: 'rgba(217,150,62,0.55)',  size: 110, label: 'amber',     value: '#D9963E' },
            { x: '38%', y: '64%', color: 'rgba(244,224,180,0.55)', size: 90,  label: 'warm light', value: '#F4E0B4' },
            { x: '64%', y: '36%', color: 'rgba(79,115,174,0.55)',  size: 96,  label: 'cobalt',    value: '#4F73AE' },
            { x: '86%', y: '70%', color: 'rgba(232,227,210,0.32)', size: 70,  label: 'bone ink',  value: '#E8E3D2' },
          ].map((w,i) => (
            <div key={i} style={{ position: 'absolute', left: w.x, top: w.y, transform: 'translate(-50%,-50%)' }}>
              <div style={{
                width: w.size, height: w.size, borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, ${w.color} 0%, transparent 65%)`,
                filter: 'blur(2px)',
              }} />
              <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <div style={{ ...Ltype.italic, fontSize: 14, color: L.bone }}>{w.label}</div>
                <div style={{ ...Ltype.micro, fontSize: 8.5, color: L.soft, marginTop: 2 }}>{w.value}</div>
              </div>
            </div>
          ))}
          {/* Ground rectangle showing the warm graphite */}
          <div style={{ position: 'absolute', inset: 0, border: `1px solid ${L.rule}`, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: 6, left: 8 }}>{Lmicro('ground · #14171C  warm graphite', L.faint)}</div>
        </div>
      </div>

      {/* Motion principles — three slow loops */}
      <div style={{ gridColumn: '1 / span 14', marginTop: 36, borderTop: `1px solid ${L.rule}`, paddingTop: 22 }}>
        {Lmicro('Motion · ambient, semantic, never decorative')}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, marginTop: 18 }}>
          {/* Pulse */}
          <div style={{ position: 'relative', height: 110, padding: 14, border: `1px solid ${L.rule}` }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: L.amberGlow, boxShadow: `0 0 30px ${L.amberGlow}`, animation: 'lumen-pulse 3.2s ease-in-out infinite' }} />
            </div>
            <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
              <div style={{ ...Ltype.italic, fontSize: 14, color: L.bone }}>Pulse</div>
              {Lmicro('thinking · attention', L.faint)}
            </div>
          </div>
          {/* Drift */}
          <div style={{ position: 'relative', height: 110, padding: 14, border: `1px solid ${L.rule}`, overflow: 'hidden' }}>
            {[0, 1.4, 2.8, 0.7, 2.1].map((d,i) => (
              <div key={i} style={{
                position: 'absolute', left: `${20 + i*15}%`, top: `${30 + (i%2)*30}%`,
                width: 4, height: 4, borderRadius: '50%', background: L.warmLight, opacity: .55,
                boxShadow: `0 0 8px ${L.warmLight}`,
                animation: 'lumen-dotdrift 6s ease-in-out infinite alternate',
                animationDelay: `${d}s`,
              }} />
            ))}
            <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
              <div style={{ ...Ltype.italic, fontSize: 14, color: L.bone }}>Drift</div>
              {Lmicro('ambient · unread refs', L.faint)}
            </div>
          </div>
          {/* Scan */}
          <div style={{ position: 'relative', height: 110, padding: 14, border: `1px solid ${L.rule}`, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: `linear-gradient(90deg, transparent 0%, ${L.amberGlow}55 50%, transparent 100%)`,
              width: '30%', animation: 'lumen-scan 5s ease-in-out infinite',
            }} />
            <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
              <div style={{ ...Ltype.italic, fontSize: 14, color: L.bone }}>Scan</div>
              {Lmicro('reading · pattern sweep', L.faint)}
            </div>
          </div>
          {/* Settle */}
          <div style={{ position: 'relative', height: 110, padding: 14, border: `1px solid ${L.rule}`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '30%', top: '32%', width: 26, height: 26, border: `1px solid ${L.amberGlow}`, animation: 'lumen-breath 4s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', left: '48%', top: '36%', width: 18, height: 18, border: `1px solid ${L.cobaltGlow}`, opacity: .6, animation: 'lumen-breath 4s ease-in-out infinite', animationDelay: '1s' }} />
            <div style={{ position: 'absolute', left: '64%', top: '40%', width: 12, height: 12, border: `1px solid ${L.bone}`, opacity: .3, animation: 'lumen-breath 4s ease-in-out infinite', animationDelay: '2s' }} />
            <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
              <div style={{ ...Ltype.italic, fontSize: 14, color: L.bone }}>Settle</div>
              {Lmicro('crystallize · insight forms', L.faint)}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Footer running head */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', position: 'relative', zIndex: 2 }}>
      {Lmicro('I.A · atmosphere · 17.05.2026', L.faint)}
      {Lmicro('Lumen', L.amberGlow)}
    </div>
  </div>
);

window.Lumen_Atmosphere = Lumen_Atmosphere;
