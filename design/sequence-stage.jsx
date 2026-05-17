// UX SCOUT — Hero Sequence Stage.
// 8 scenes · scroll-driven · no italics anywhere.

const useScrollProgress = () => {
  const [p, setP] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - window.innerHeight;
      setP(max > 0 ? el.scrollTop / max : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return p;
};

// ─── Top chrome ──────────────────────────────────────────────
const TopChrome = ({ p }) => {
  const past1 = clamp01((p - SCENES[0].end * 0.8) * 6);
  const currentScene = SCENES.find(s => p >= s.start && p < s.end) || SCENES[SCENES.length - 1];
  const sceneIdx = SCENES.indexOf(currentScene);

  return (
    <header style={{
      position: 'absolute', top: 28, left: 64, right: 64, zIndex: 30,
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{
          width: 9, height: 9, borderRadius: '50%', background: S.amberGlow,
          boxShadow: `0 0 20px ${S.amberGlow}`,
          animation: 'pulse 3s ease-in-out infinite',
        }} />
        <div style={{ ...sf(16, 500, 96), fontSize: 16, color: S.bone, letterSpacing: '-.005em' }}>
          UX Scout
        </div>
        <div style={{
          ...Stype.body, fontSize: 12.5, color: S.soft,
          opacity: past1, transition: 'opacity 600ms ease',
        }}>
          · <span style={{ color: S.ink }}>{QUESTION}</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
        <Eyebrow style={{ color: S.faint, fontSize: 9 }}>scene</Eyebrow>
        <span style={{ ...Stype.tabular, fontSize: 12, color: S.amberGlow }}>
          {String(sceneIdx + 1).padStart(2, '0')}
        </span>
        <span style={{ ...Stype.body, fontSize: 12, color: S.faint }}>/ 0{SCENES.length}</span>
        <span style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone, marginLeft: 10 }}>{currentScene.label}</span>
      </div>
    </header>
  );
};

// ─── Bottom scrubber ─────────────────────────────────────────
const Scrubber = ({ p }) => {
  const scrollTo = (frac) => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: max * frac, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'absolute', left: 64, right: 64, bottom: 28, zIndex: 30,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      pointerEvents: 'auto',
    }}>
      <div style={{ ...Stype.micro, color: S.faint, fontSize: 9 }}>scroll to advance</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {SCENES.map((sc, i) => {
          const active = p >= sc.start && p < sc.end;
          const past = p >= sc.end;
          return (
            <React.Fragment key={sc.id}>
              <button
                onClick={() => scrollTo((sc.start + sc.end) / 2)}
                style={{
                  background: 'transparent', border: 0, padding: 4, cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                }}
              >
                <span style={{
                  width: active ? 9 : 6, height: active ? 9 : 6, borderRadius: '50%',
                  background: active ? S.amberGlow : past ? S.amber : S.dim,
                  boxShadow: active ? `0 0 14px ${S.amberGlow}` : 'none',
                  transition: 'all 400ms ease',
                }} />
                <span style={{
                  ...Stype.eyebrow, fontSize: 9,
                  color: active ? S.bone : past ? S.soft : S.faint,
                  transition: 'color 400ms ease',
                  letterSpacing: '.16em',
                }}>{sc.label}</span>
              </button>
              {i < SCENES.length - 1 && (
                <span style={{
                  width: 18, height: 1,
                  background: past ? S.amber : S.dim,
                  opacity: .5, marginBottom: 14,
                  transition: 'background 400ms ease',
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div style={{ ...Stype.tabular, fontSize: 10, color: S.faint, letterSpacing: '.04em' }}>
        {String(Math.round(p * 100)).padStart(2, '0')}%
      </div>
    </div>
  );
};

// ─── Adaptive atmosphere — shifts with scene ─────────────────
const AdaptiveAtmosphere = ({ p }) => {
  const amber = 1
    + 0.25 * subRaw(p, SCENES[2].start, SCENES[2].end)
    + 0.35 * subRaw(p, SCENES[5].start, SCENES[5].end)
    + 0.30 * subRaw(p, SCENES[7].start, SCENES[7].end);
  const cobalt = 1
    + 0.20 * subRaw(p, SCENES[4].start, SCENES[4].end)
    + 0.25 * subRaw(p, SCENES[6].start, SCENES[6].end);
  return <Atmosphere amberStrength={amber} cobaltStrength={cobalt} vignette={true} />;
};

// ─── Main component ──────────────────────────────────────────
const HeroSequence = () => {
  const p = useScrollProgress();

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height: '880vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh', width: '100%',
          overflow: 'hidden', background: S.graphite,
        }}>
          <AdaptiveAtmosphere p={p} />

          <SceneGalaxy p={p} />
          <SceneReading p={p} />
          <ScenePatterns p={p} />
          <SceneMatrix p={p} />
          <SceneInsights p={p} />
          <SceneRecommendations p={p} />
          <SceneInterview p={p} />
          <ScenePrototype p={p} />

          <TopChrome p={p} />
          <Scrubber p={p} />
        </div>
      </div>
    </div>
  );
};

window.HeroSequence = HeroSequence;
