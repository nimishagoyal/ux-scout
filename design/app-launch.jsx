// Launch tile for the production UX Scout app.
// Sits on the design canvas next to the cinematic walkthrough tile.

const AppLaunchTile = () => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: `radial-gradient(ellipse 72% 55% at 22% 14%, rgba(217,150,62,0.14) 0%, transparent 55%), radial-gradient(ellipse 60% 50% at 84% 92%, rgba(79,115,174,0.10) 0%, transparent 55%), #14171C`,
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
    fontVariationSettings: "'opsz' 14, 'wdth' 100",
    color: '#E8E3D2',
  }}>
    {/* Grain */}
    <div aria-hidden="true" style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      background: `repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 3px)`,
      mixBlendMode: 'overlay', opacity: .45,
    }} />

    {/* Sketch of the app shell behind the CTA — faint preview */}
    <div aria-hidden="true" style={{
      position: 'absolute', left: 64, right: 64, top: 96, bottom: 200,
      display: 'grid', gridTemplateColumns: '260px 1fr',
      opacity: 0.18, pointerEvents: 'none',
      gap: 0,
    }}>
      <div style={{ background: '#101317', boxShadow: `inset -1px 0 0 rgba(232,227,210,0.10)`, padding: 20 }}>
        <div style={{ height: 12, width: 100, background: 'rgba(232,227,210,0.20)', marginBottom: 22 }} />
        {[1,1,1,1,1,1,1].map((_,i) => (
          <div key={i} style={{ height: 8, background: 'rgba(232,227,210,0.10)', marginBottom: 10, width: i % 2 ? '85%' : '70%' }} />
        ))}
      </div>
      <div style={{ padding: 28 }}>
        <div style={{ height: 22, width: 280, background: 'rgba(232,227,210,0.18)', marginBottom: 12 }} />
        <div style={{ height: 10, width: 480, background: 'rgba(232,227,210,0.10)', marginBottom: 32 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[1,1,1].map((_,i) => (
            <div key={i} style={{ height: 140, background: 'rgba(232,227,210,0.06)' }} />
          ))}
        </div>
      </div>
    </div>

    {/* Top brand strip */}
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
          · production app
        </div>
      </div>
      <div style={{ fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#5A564B' }}>
        six screens · navigable · handoff-ready
      </div>
    </div>

    {/* Center stage */}
    <div style={{
      position: 'absolute', left: '50%', top: '50%',
      transform: 'translate(-50%, -50%)', textAlign: 'center', zIndex: 5,
      width: '78%', maxWidth: 980,
    }}>
      <div style={{ fontSize: 11, letterSpacing: '.20em', textTransform: 'uppercase', color: '#88A6D8', fontWeight: 500 }}>
        the navigable prototype · ready for claude code
      </div>
      <div style={{
        fontSize: 76, lineHeight: 1.0,
        fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 400",
        color: '#E8E3D2', marginTop: 22, letterSpacing: '-.025em',
      }}>
        Open the{' '}
        <span style={{ color: '#F4CC7D', fontVariationSettings: "'opsz' 96, 'wdth' 90, 'wght' 500" }}>real</span> product.
      </div>
      <div style={{
        fontFamily: 'Newsreader, serif', fontWeight: 300, fontSize: 18, lineHeight: 1.55,
        color: '#CFC9B5', marginTop: 24, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto',
      }}>
        Library, new research, study viewer with all six report sections, guided interview, and prototype handoff. Every screen wired to navigate. Component library named and reusable.
      </div>

      <a href="UX Scout.html" target="_blank" rel="noopener" style={{
        display: 'inline-flex', alignItems: 'center', gap: 14,
        marginTop: 36, padding: '16px 28px',
        background: '#F4CC7D', color: '#1a1310',
        boxShadow: `0 26px 70px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(217,150,62,0.5)`,
        textDecoration: 'none',
        fontSize: 15, fontVariationSettings: "'opsz' 15, 'wdth' 100, 'wght' 500",
      }}>
        <span>Open the UX Scout app</span>
        <span style={{ fontSize: 17 }}>↗</span>
      </a>

      <div style={{ marginTop: 18, fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: '#5A564B' }}>
        opens fullscreen in a new tab · 1440px viewport recommended
      </div>
    </div>

    {/* Bottom — screen ribbon */}
    <div style={{
      position: 'absolute', left: 56, right: 56, bottom: 32, zIndex: 4,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {[
          'library','new research','processing','study viewer','guided interview','prototype prompt'
        ].map((sc,i,arr) => (
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

window.AppLaunchTile = AppLaunchTile;
