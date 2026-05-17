// ─────────────────────────────────────────────────────────────
// UX SCOUT — App Shell.
// Sidebar (260px) + TopBar + scrollable Content.
// ─────────────────────────────────────────────────────────────

const SIDEBAR_W = 264;

// ─── Sidebar ────────────────────────────────────────────────
const Sidebar = ({ screen, activeStudyId, onNavigate, onOpenStudy }) => {
  const navItems = [
    { id: 'library', icon: '◇', label: 'Library' },
    { id: 'new',     icon: '+', label: 'New research' },
    { id: 'activity',icon: '↻', label: 'Activity' },
  ];

  return (
    <aside style={{
      position: 'fixed', top: 0, left: 0, bottom: 0, width: SIDEBAR_W,
      background: '#101317',
      borderRight: `1px solid ${S.rule}`,
      display: 'flex', flexDirection: 'column',
      zIndex: 10,
      overflow: 'hidden',
    }}>
      {/* Brand */}
      <div style={{ padding: '26px 22px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%', background: S.amberGlow,
          boxShadow: `0 0 22px ${S.amberGlow}`, animation: 'pulse 3s ease-in-out infinite',
        }} />
        <div>
          <div style={{ ...sf(18, 500, 96), fontSize: 17, color: S.bone, letterSpacing: '-.005em' }}>UX Scout</div>
          <div style={{ ...Stype.micro, fontSize: 9, color: S.faint, marginTop: 2 }}>research studio</div>
        </div>
      </div>

      {/* Nav links */}
      <nav style={{ padding: '14px 12px 0' }}>
        {navItems.map((n) => {
          const active = screen === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onNavigate(n.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 6, marginBottom: 2,
                background: active ? 'rgba(217,150,62,0.10)' : 'transparent',
                color: active ? S.bone : S.soft,
                transition: 'all 200ms ease',
                cursor: 'pointer',
              }}
            >
              <span style={{ width: 18, textAlign: 'center', fontSize: 14, color: active ? S.amberGlow : S.faint }}>{n.icon}</span>
              <span style={{ ...Stype.body, fontSize: 13.5 }}>{n.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Studies list */}
      <div style={{ padding: '24px 22px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ ...Stype.micro, fontSize: 9, color: S.faint }}>Studies</div>
        <span style={{ ...Stype.tabular, fontSize: 10, color: S.faint }}>{APP_STUDIES.length}</span>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 12px 12px' }}>
        {APP_STUDIES.map((st) => {
          const active = activeStudyId === st.id && screen === 'study';
          return (
            <button
              key={st.id}
              onClick={() => onOpenStudy(st.id)}
              style={{
                width: '100%', textAlign: 'left', padding: '10px 12px',
                borderRadius: 6, marginBottom: 2,
                background: active ? 'rgba(244,204,125,0.08)' : 'transparent',
                borderLeft: active ? `2px solid ${S.amberGlow}` : `2px solid transparent`,
                cursor: 'pointer',
                transition: 'all 200ms ease',
              }}
            >
              <div style={{
                ...Stype.body, fontSize: 13, color: active ? S.bone : S.ink,
                lineHeight: 1.3, marginBottom: 4,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{st.short}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ ...Stype.micro, fontSize: 8.5, color: S.faint }}>{st.date}</span>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: S.faint }} />
                <span style={{ ...Stype.micro, fontSize: 8.5, color: S.faint }}>{st.flows} flows</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Profile */}
      <div style={{
        padding: '14px 22px', borderTop: `1px solid ${S.rule}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: S.raisedWarm, color: S.amberGlow,
          ...sf(13, 500, 96),
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 0 1px ${S.rule}`,
        }}>{APP_USER.initial}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ ...Stype.body, fontSize: 13, color: S.bone }}>{APP_USER.name}</div>
          <div style={{ ...Stype.body, fontSize: 11, color: S.faint, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {APP_USER.workspace}
          </div>
        </div>
        <button style={{ color: S.faint, fontSize: 14 }} aria-label="Settings">⚙</button>
      </div>
    </aside>
  );
};

// ─── TopBar ─────────────────────────────────────────────────
const TopBar = ({ breadcrumb, actions, sticky = true }) => (
  <header style={{
    position: sticky ? 'sticky' : 'relative',
    top: 0, zIndex: 5,
    height: 64,
    background: 'rgba(20,23,28,0.85)',
    backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
    borderBottom: `1px solid ${S.rule}`,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 32px',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      {breadcrumb.map((b, i) => (
        <React.Fragment key={i}>
          {b.onClick ? (
            <button
              onClick={b.onClick}
              style={{ ...Stype.body, fontSize: 13.5, color: S.soft, cursor: 'pointer' }}
            >{b.label}</button>
          ) : (
            <span style={{ ...Stype.body, fontSize: 13.5, color: i === breadcrumb.length - 1 ? S.bone : S.soft }}>
              {b.label}
            </span>
          )}
          {i < breadcrumb.length - 1 && (
            <span style={{ color: S.faint, fontSize: 12 }}>›</span>
          )}
        </React.Fragment>
      ))}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {actions}
    </div>
  </header>
);

// ─── AppShell ───────────────────────────────────────────────
const AppShell = ({ screen, activeStudyId, onNavigate, onOpenStudy, breadcrumb, actions, children }) => (
  <div style={{ minHeight: '100vh', position: 'relative' }}>
    <AppAtmosphere intensity={0.8} />
    <Sidebar
      screen={screen} activeStudyId={activeStudyId}
      onNavigate={onNavigate} onOpenStudy={onOpenStudy}
    />
    <main style={{
      marginLeft: SIDEBAR_W,
      position: 'relative', zIndex: 1,
    }}>
      <TopBar breadcrumb={breadcrumb} actions={actions} />
      <div style={{ padding: 0 }}>{children}</div>
    </main>
  </div>
);

Object.assign(window, { Sidebar, TopBar, AppShell, SIDEBAR_W });
