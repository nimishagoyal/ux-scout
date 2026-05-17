// Shared helpers used across the three directions.
// All purely presentational. No state.

const Placeholder = ({ label, w, h, tone = 'light', tilt = 0, style = {} }) => {
  const bg = tone === 'dark' ? '#1a1a1a' : tone === 'cream' ? '#E8E0CE' : '#E5E2DA';
  const fg = tone === 'dark' ? '#888' : '#7a7468';
  const stripe = tone === 'dark' ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.035)';
  return (
    <div style={{
      width: w, height: h, background: bg,
      backgroundImage: `repeating-linear-gradient(135deg, ${stripe} 0 8px, transparent 8px 16px)`,
      display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
      padding: 10, fontFamily: 'Geist Mono, monospace', fontSize: 10, color: fg,
      letterSpacing: '.08em', textTransform: 'uppercase',
      transform: `rotate(${tilt}deg)`, transformOrigin: 'center',
      ...style,
    }}>
      {label}
    </div>
  );
};

// A tiny vector "screenshot" stand-in that hints at a UI without inventing one.
const RefScreenshot = ({ palette, kind = 'list', label }) => {
  const { bg, ink, mute, accent } = palette;
  return (
    <div style={{ background: bg, color: ink, padding: 10, position: 'relative', overflow: 'hidden', height: '100%' }}>
      <div style={{ height: 6, width: 30, background: ink, opacity: .8, marginBottom: 8 }} />
      {kind === 'list' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <div style={{ width: 14, height: 14, background: mute }} />
              <div style={{ flex: 1, height: 6, background: mute, opacity: .8 - i*0.1 }} />
              <div style={{ width: 22, height: 6, background: accent, opacity: .5 }} />
            </div>
          ))}
        </div>
      )}
      {kind === 'cards' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: mute, padding: 6, opacity: .9 }}>
              <div style={{ height: 16, background: ink, opacity: .15, marginBottom: 4 }} />
              <div style={{ height: 4, background: ink, opacity: .25, marginBottom: 2 }} />
              <div style={{ height: 4, background: ink, opacity: .25, width: '70%' }} />
            </div>
          ))}
        </div>
      )}
      {kind === 'form' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ height: 24, background: mute }} />
          <div style={{ height: 24, background: mute }} />
          <div style={{ height: 60, background: mute }} />
          <div style={{ height: 18, width: 70, background: accent }} />
        </div>
      )}
      {kind === 'detail' && (
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ width: 60, background: mute, height: 120 }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ height: 8, background: ink, opacity: .8, width: '60%' }} />
            <div style={{ height: 4, background: mute, marginTop: 4 }} />
            <div style={{ height: 4, background: mute }} />
            <div style={{ height: 4, background: mute, width: '80%' }} />
            <div style={{ height: 4, background: mute, width: '70%' }} />
            <div style={{ height: 14, width: 40, background: accent, marginTop: 6 }} />
          </div>
        </div>
      )}
      {label && (
        <div style={{ position: 'absolute', bottom: 6, left: 10, fontSize: 8, fontFamily: 'Geist Mono, monospace', opacity: .55, letterSpacing: '.08em', textTransform: 'uppercase' }}>{label}</div>
      )}
    </div>
  );
};

const Annotation = ({ children, style }) => (
  <div style={{
    fontFamily: 'Geist Mono, monospace', fontSize: 10,
    letterSpacing: '.08em', textTransform: 'uppercase',
    color: '#9a9286', ...style,
  }}>{children}</div>
);

Object.assign(window, { Placeholder, RefScreenshot, Annotation });
