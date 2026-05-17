// ─────────────────────────────────────────────────────────────
// UX SCOUT — Library screen.
// Landing for returning users. Recent studies + quick actions.
// ─────────────────────────────────────────────────────────────

const StudyCard = ({ study, onOpen, featured }) => {
  const accentColor = study.confidence === 'high' ? S.amberGlow : S.cobaltGlow;
  return (
    <button
      onClick={() => onOpen(study.id)}
      style={{
        textAlign: 'left', width: '100%',
        background: featured
          ? `linear-gradient(135deg, rgba(48,40,28,0.78) 0%, rgba(35,31,24,0.85) 100%)`
          : `linear-gradient(135deg, rgba(30,34,40,0.5) 0%, rgba(22,25,30,0.6) 100%)`,
        boxShadow: featured
          ? `0 0 0 1px rgba(244,204,125,0.30), 0 24px 50px -22px rgba(0,0,0,0.6), 0 0 60px -28px rgba(217,150,62,0.30)`
          : `0 0 0 1px rgba(232,227,210,0.08), 0 14px 30px -16px rgba(0,0,0,0.45)`,
        padding: featured ? '26px 28px' : '22px 24px',
        cursor: 'pointer',
        transition: 'all 250ms ease',
        display: 'flex', flexDirection: 'column', gap: 18,
        minHeight: featured ? 280 : 220,
      }}
    >
      {/* Top — status + date */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <StatusPill status={study.status} />
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>{study.date}</div>
      </div>

      {/* Title */}
      <h3 style={{
        ...Stype.headline, fontSize: featured ? 28 : 22, color: S.bone,
        margin: 0, lineHeight: 1.15, letterSpacing: '-.01em',
        fontVariationSettings: featured ? "'opsz' 32, 'wdth' 92, 'wght' 400" : "'opsz' 24, 'wdth' 96, 'wght' 400",
      }}>{study.title}</h3>

      {/* Tagline */}
      <div style={{
        ...Stype.reading, fontSize: 14, color: S.ink, lineHeight: 1.5,
        flex: 1,
      }}>
        {study.tagline}
      </div>

      {/* Footer meta */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 14, borderTop: `1px solid ${S.hairline}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ ...Stype.tabular, fontSize: 13, color: accentColor }}>
            {study.recsCount} recs
          </span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: S.faint }} />
          <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>{study.flows} flows</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: S.faint }} />
          <span style={{ ...Stype.body, fontSize: 12, color: S.soft }}>{study.competitors} apps</span>
        </div>
        <span style={{ ...Stype.body, fontSize: 12, color: S.amberGlow }}>open ↗</span>
      </div>

      {/* App stack */}
      <div style={{
        display: 'flex', gap: 6, marginTop: -6,
      }}>
        {study.apps.slice(0, 5).map((app, i) => (
          <AppIcon key={i} name={app} size={featured ? 30 : 24} />
        ))}
        {study.apps.length > 5 && (
          <span style={{
            ...Stype.tabular, fontSize: 11, color: S.faint, alignSelf: 'center', marginLeft: 4,
          }}>+{study.apps.length - 5}</span>
        )}
      </div>
    </button>
  );
};

const QuickAction = ({ label, sublabel, icon, onClick, accent = 'amber' }) => {
  const c = accent === 'amber' ? S.amberGlow : accent === 'cobalt' ? S.cobaltGlow : S.bone;
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, textAlign: 'left', padding: '20px 22px',
        background: 'rgba(30,34,40,0.4)',
        boxShadow: `0 0 0 1px ${S.rule}`,
        cursor: 'pointer', transition: 'all 200ms ease',
        display: 'flex', alignItems: 'center', gap: 16,
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: 'rgba(217,150,62,0.10)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: c, fontSize: 18,
        boxShadow: `0 0 0 1px ${c}33`,
      }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ ...Stype.bodyMed, fontSize: 14, color: S.bone }}>{label}</div>
        <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 2 }}>{sublabel}</div>
      </div>
      <span style={{ color: S.faint, fontSize: 14 }}>→</span>
    </button>
  );
};

const ScreenLibrary = ({ onNavigate, onOpenStudy }) => {
  const [latest, ...rest] = APP_STUDIES;

  return (
    <div style={{ padding: '36px 48px 64px', maxWidth: 1400, margin: '0 auto' }}>
      {/* Welcome hero */}
      <div style={{ marginBottom: 36 }}>
        <Eyebrow style={{ color: S.amberGlow }}>library · {APP_USER.workspace.toLowerCase()}</Eyebrow>
        <h1 style={{
          ...Stype.title, fontSize: 48, color: S.bone, margin: '14px 0 6px',
          letterSpacing: '-.02em',
        }}>
          Welcome back, <span style={{ color: S.amberGlow }}>{APP_USER.name}</span>.
        </h1>
        <p style={{ ...Stype.reading, fontSize: 17, color: S.ink, margin: 0, maxWidth: 640 }}>
          Five active studies, one fresh report today. Pick up where you left off — or start a new research thread.
        </p>
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 14, marginBottom: 44 }}>
        <QuickAction
          label="Continue your latest study"
          sublabel={latest.short + ' · ' + latest.recsCount + ' recommendations'}
          icon="↻"
          onClick={() => onOpenStudy(latest.id)}
          accent="amber"
        />
        <QuickAction
          label="Start new research"
          sublabel="Ask a UX question · the studio will read the landscape"
          icon="+"
          onClick={() => onNavigate('new')}
          accent="amber"
        />
        <QuickAction
          label="Browse trending"
          sublabel="What product teams are researching this week"
          icon="↗"
          onClick={() => onNavigate('new')}
          accent="cobalt"
        />
      </div>

      {/* Featured study */}
      <div style={{ marginBottom: 36 }}>
        <SectionHeader
          eyebrow="freshly delivered"
          title="Today's report"
          right={
            <Button variant="ghost" size="s" onClick={() => onOpenStudy(latest.id)} trailing="→">
              Open
            </Button>
          }
        />
        <StudyCard study={latest} onOpen={onOpenStudy} featured />
      </div>

      {/* Recent studies grid */}
      <div>
        <SectionHeader
          eyebrow="your library"
          title="Recent studies"
          right={
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="ghost" size="s">All</Button>
              <Button variant="ghost" size="s">Fresh</Button>
              <Button variant="ghost" size="s">Reviewed</Button>
              <Button variant="ghost" size="s">Archived</Button>
            </div>
          }
        />
        <div style={{
          display: 'grid', gap: 18,
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        }}>
          {rest.map(st => (
            <StudyCard key={st.id} study={st} onOpen={onOpenStudy} />
          ))}
        </div>
      </div>

      {/* Trending */}
      <div style={{ marginTop: 56 }}>
        <SectionHeader
          eyebrow="across the studio"
          title="Trending this week"
        />
        <div style={{
          display: 'grid', gap: 14,
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {SUGGESTED.map((s, i) => (
            <button key={i} onClick={() => onNavigate('new')} style={{
              textAlign: 'left', padding: 20,
              background: 'rgba(30,34,40,0.35)',
              boxShadow: `0 0 0 1px ${S.hairline}`,
              cursor: 'pointer', transition: 'all 200ms',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}>
              <Chip color="cobalt" size="s">{s.industry}</Chip>
              <div style={{ ...Stype.headlineMed, fontSize: 18, color: S.bone, lineHeight: 1.25 }}>
                {s.title}
              </div>
              <div style={{ ...Stype.body, fontSize: 12, color: S.soft, marginTop: 'auto' }}>
                {s.freq}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

window.ScreenLibrary = ScreenLibrary;
window.StudyCard = StudyCard;
