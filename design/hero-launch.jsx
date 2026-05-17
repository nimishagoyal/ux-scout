// Launch tile for the UX Scout cinematic hero walkthrough.
// No italics. No Mobbin references. UX Scout naming throughout.

const HeroLaunchTile = () => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: `radial-gradient(ellipse 72% 55% at 22% 14%, rgba(217,150,62,0.18) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 84% 92%, rgba(79,115,174,0.14) 0%, transparent 55%), #14171C`,
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
    color: '#E8E3D2',
  }}>
    {/* Grain */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)`,
      mixBlendMode: 'overlay', opacity: .5,
    }} />

    {/* Constellation dots — ambient */}
    {[
      { x: '8%',  y: '20%', size: 2.5, opacity: 0.5,  delay: 0.0 },
      { x: '22%', y: '52%', size: 3,   opacity: 0.4,  delay: 1.2, color: '#88A6D8' },
      { x: '36%', y: '34%', size: 2,   opacity: 0.4,  delay: 2.0 },
      { x: '64%', y: '40%', size: 2,   opacity: 0.45, delay: 1.6 },
      { x: '76%', y: '54%', size: 3,   opacity: 0.4,  delay: 2.4, color: '#88A6D8' },
      { x: '88%', y: '36%', size: 2.5, opacity: 0.5,  delay: 0.4 },
      { x: '32%', y: '78%', size: 2,   opacity: 0.35, delay: 1.8 },
      { x: '60%', y: '76%', size: 2.5, opacity: 0.5,  delay: 2.6, color: '#F4E0B4' },
      { x: '92%', y: '82%', size: 2,   opacity: 0.35, delay: 0.6 },
    ].map((d, i) => (
      <div key={i} style={{
        position: 'absolute', left: d.x, top: d.y, width: d.size, height: d.size,
        borderRadius: '50%', background: d.color || '#F4E0B4', opacity: d.opacity,
        boxShadow: `0 0 ${d.size * 4}px ${d.color || '#F4E0B4'}`,
        animation: 'lumen-pulse 6s ease-in-out infinite',
        animationDelay: `${d.delay}s`,
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
          fontSize: 18, color: '#E8E3D2', letterSpacing: '-.005em',
        }}>UX Scout</div>
        <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#8A8472' }}>
          · cinematic walkthrough
        </div>
      </div>
      <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#5A564B' }}>
        eight scenes · ~ 90 seconds
      </div>
    </div>

    {/* Center stage */}
    <div style={{
      position: 'absolute', left: '50%', top: '46%',
      transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 5,
      width: '78%', maxWidth: 980,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '.20em', textTransform: 'uppercase', color: '#F4CC7D', fontWeight: 500 }}>
        watch a UX question become a prototype prompt
      </div>
      <div style={{
        fontSize: 88, lineHeight: 1.0,
        fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 400",
        color: '#E8E3D2', marginTop: 24, letterSpacing: '-.025em',
      }}>
        Improve onboarding for a{' '}
        <span style={{ color: '#F4CC7D', fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 500" }}>rideshare</span> app.
      </div>
      <div style={{
        fontFamily: 'Newsreader, serif', fontWeight: 300, fontSize: 18.5, lineHeight: 1.55,
        color: '#CFC9B5', marginTop: 26, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
      }}>
        UX Scout reads the competitive landscape, surfaces the patterns that hold, builds a feature matrix, writes ranked recommendations, and walks you through a guided interview that ends with a prompt you can paste into Lovable, Bolt or v0.
      </div>

      <a href="Hero Sequence.html" target="_blank" rel="noopener" style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        marginTop: 40, padding: '16px 28px',
        background: 'linear-gradient(135deg, rgba(48,40,28,0.85) 0%, rgba(35,31,24,0.9) 100%)',
        boxShadow: `0 0 0 1px rgba(244,204,125,0.45), 0 26px 70px -20px rgba(0,0,0,0.8), 0 0 100px -20px rgba(217,150,62,0.4)`,
        color: '#E8E3D2', textDecoration: 'none',
        fontSize: 15, fontVariationSettings: "'opsz' 15, 'wdth' 100, 'wght' 500",
      }}>
        <span style={{
          width: 26, height: 26, borderRadius: '50%',
          border: '1px solid #F4CC7D', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center',
          color: '#F4CC7D',
        }}>▶</span>
        <span>Open the cinematic walkthrough</span>
        <span style={{ fontSize: 17, color: '#F4CC7D' }}>↗</span>
      </a>

      <div style={{ marginTop: 18, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A564B' }}>
        best on a desktop · scroll to advance
      </div>
    </div>

    {/* Bottom — scene ribbon */}
    <div style={{
      position: 'absolute', left: 56, right: 56, bottom: 32, zIndex: 4,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          'the galaxy','reading','patterns','feature matrix',
          'insights','recommendations','interview','prototype'
        ].map((sc,i,arr) => (
          <React.Fragment key={sc}>
            <div style={{
              fontSize: 13,
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

window.HeroLaunchTile = HeroLaunchTile;
