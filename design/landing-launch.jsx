// Landing page launch tile for the design canvas.

const LandingLaunchTile = () => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: `radial-gradient(ellipse 72% 55% at 22% 14%, rgba(217,150,62,0.16) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 84% 92%, rgba(79,115,174,0.10) 0%, transparent 55%), #14171C`,
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
    color: '#E8E3D2',
  }}>
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)`,
      mixBlendMode: 'overlay', opacity: .45,
    }} />

    {/* Constellation hint behind the CTA */}
    {[
      { x: '8%',  y: '22%', size: 3, color: '#F4E0B4' },
      { x: '88%', y: '26%', size: 2.5, color: '#88A6D8' },
      { x: '16%', y: '72%', size: 2 },
      { x: '80%', y: '68%', size: 2.5, color: '#F4E0B4' },
      { x: '50%', y: '14%', size: 2 },
    ].map((d, i) => (
      <div key={i} aria-hidden="true" style={{
        position: 'absolute', left: d.x, top: d.y, width: d.size, height: d.size,
        borderRadius: '50%', background: d.color || '#F4E0B4', opacity: 0.45,
        boxShadow: `0 0 ${d.size * 4}px ${d.color || '#F4E0B4'}`,
        animation: 'lumen-pulse 6s ease-in-out infinite',
        animationDelay: `${i * 0.5}s`,
      }} />
    ))}

    {/* Top brand */}
    <div style={{
      position: 'absolute', top: 36, left: 56, right: 56,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 4,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%', background: '#F4CC7D',
          boxShadow: `0 0 22px #F4CC7D`, animation: 'lumen-pulse 3s ease-in-out infinite',
        }} />
        <div style={{
          fontVariationSettings: "'opsz' 18, 'wdth' 96, 'wght' 500",
          fontSize: 18, color: '#E8E3D2',
        }}>UX Scout</div>
        <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8A8472' }}>
          · marketing landing
        </div>
      </div>
      <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#5A564B' }}>
        single-screen · prompt directly · no signup
      </div>
    </div>

    {/* Center stage */}
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 5,
      width: '78%', maxWidth: 980,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '.20em', textTransform: 'uppercase', color: '#F4CC7D', fontWeight: 500 }}>
        the public landing page
      </div>
      <div style={{
        fontSize: 80, lineHeight: 1.0,
        fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 400",
        color: '#E8E3D2', marginTop: 22, letterSpacing: '-.025em',
      }}>
        Turn UX questions into{' '}
        <span style={{ color: '#F4CC7D', fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 500" }}>evidence-backed</span>{' '}
        decisions.
      </div>
      <div style={{
        fontFamily: 'Newsreader, serif', fontWeight: 300, fontSize: 17, lineHeight: 1.55,
        color: '#CFC9B5', marginTop: 24, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto',
      }}>
        A living universe of product intelligence. Type a UX question into the centerpiece, refine the scope with orbital category chips, or tap one of the inspirational prompts drifting in the periphery. No signup. No login. Click Begin and the research starts.
      </div>

      <a href="Landing.html" target="_blank" rel="noopener" style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        marginTop: 36, padding: '16px 28px',
        background: '#F4CC7D', color: '#1a1310',
        boxShadow: `0 26px 70px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(217,150,62,0.5)`,
        textDecoration: 'none',
        fontSize: 15, fontVariationSettings: "'opsz' 15, 'wdth' 100, 'wght' 500",
      }}>
        <span>Open the landing page</span>
        <span style={{ fontSize: 17 }}>↗</span>
      </a>

      <div style={{ marginTop: 18, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A564B' }}>
        opens fullscreen in a new tab
      </div>
    </div>

    {/* Bottom — section ribbon */}
    <div style={{
      position: 'absolute', left: 56, right: 56, bottom: 32, zIndex: 4,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {['interactive prompt','orbital inspirations','category chips','one-click begin'].map((sc,i,arr) => (
          <React.Fragment key={sc}>
            <div style={{
              fontSize: 12.5,
              fontVariationSettings: "'opsz' 13, 'wdth' 100, 'wght' 400",
              color: i === 0 ? '#E8E3D2' : '#8A8472',
            }}>{sc}</div>
            {i < arr.length - 1 && <span style={{ width: 14, height: 1, background: '#3A372F' }} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

window.LandingLaunchTile = LandingLaunchTile;
