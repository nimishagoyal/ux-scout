// ─────────────────────────────────────────────────────────────
// UX SCOUT — App root.
// State-based routing across all screens.
// ─────────────────────────────────────────────────────────────

const App = () => {
  const [screen, setScreen] = React.useState('library');  // library | new | processing | study | interview | prototype
  const [activeStudyId, setActiveStudyId] = React.useState(null);
  const [pendingQuestion, setPendingQuestion] = React.useState('');
  const [interviewAnswers, setInterviewAnswers] = React.useState(null);

  // Pick up an inbound research request from the landing page (localStorage handoff).
  // Jump straight to the processing screen.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem('uxscout:pendingResearch');
      if (!raw) return;
      const { question } = JSON.parse(raw);
      if (question && question.length > 4) {
        setPendingQuestion(question);
        setScreen('processing');
      }
      localStorage.removeItem('uxscout:pendingResearch');
    } catch (e) { /* ignore */ }
  }, []);

  const activeStudy = APP_STUDIES.find(s => s.id === activeStudyId) || APP_STUDIES[0];

  // Navigate to a top-level screen, clearing study context if appropriate
  const navigate = (target) => {
    setScreen(target);
    if (target === 'library' || target === 'new') {
      setActiveStudyId(null);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const openStudy = (id) => {
    setActiveStudyId(id);
    setScreen('study');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const startResearch = ({ question }) => {
    setPendingQuestion(question);
    setScreen('processing');
  };

  const onProcessingComplete = () => {
    // Open the canonical "fresh" study to show the result
    setActiveStudyId('rideshare-onboarding');
    setScreen('study');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const onGeneratePrototype = () => {
    setScreen('interview');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const onInterviewComplete = (answers) => {
    setInterviewAnswers(answers);
    setScreen('prototype');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // ─── Build breadcrumb + actions per screen ─────────────────
  let breadcrumb = [{ label: 'Library', onClick: () => navigate('library') }];
  let actions = null;

  if (screen === 'library') {
    breadcrumb = [{ label: 'Library' }];
    actions = (
      <React.Fragment>
        <Button variant="ghost" size="s" icon="?">Help</Button>
        <Button variant="primary" size="s" trailing="+" onClick={() => navigate('new')}>New research</Button>
      </React.Fragment>
    );
  } else if (screen === 'new') {
    breadcrumb = [
      { label: 'Library', onClick: () => navigate('library') },
      { label: 'New research' },
    ];
    actions = (
      <Button variant="ghost" size="s" onClick={() => navigate('library')}>Cancel</Button>
    );
  } else if (screen === 'processing') {
    breadcrumb = [
      { label: 'Library', onClick: () => navigate('library') },
      { label: 'Generating report' },
    ];
    actions = <DotLoader />;
  } else if (screen === 'study') {
    breadcrumb = [
      { label: 'Library', onClick: () => navigate('library') },
      { label: activeStudy.short },
    ];
    actions = (
      <React.Fragment>
        <Button variant="ghost" size="s" icon="↗">Share</Button>
        <Button variant="ghost" size="s" icon="↓">Export</Button>
        <Button variant="secondary" size="s" trailing="→" onClick={onGeneratePrototype}>Start building</Button>
      </React.Fragment>
    );
  } else if (screen === 'interview') {
    breadcrumb = [
      { label: 'Library', onClick: () => navigate('library') },
      { label: activeStudy.short, onClick: () => setScreen('study') },
      { label: 'Start building' },
    ];
    actions = (
      <Button variant="ghost" size="s" onClick={() => setScreen('study')}>Back to study</Button>
    );
  } else if (screen === 'prototype') {
    breadcrumb = [
      { label: 'Library', onClick: () => navigate('library') },
      { label: activeStudy.short, onClick: () => setScreen('study') },
      { label: 'Prototype prompt' },
    ];
    actions = (
      <Button variant="ghost" size="s" icon="↗">Share</Button>
    );
  }

  // ─── Render current screen ─────────────────────────────────
  let body = null;
  if (screen === 'library') {
    body = <ScreenLibrary onNavigate={navigate} onOpenStudy={openStudy} />;
  } else if (screen === 'new') {
    body = <ScreenNewResearch onStartResearch={startResearch} initialQuestion={pendingQuestion} />;
  } else if (screen === 'processing') {
    body = <ScreenProcessing question={pendingQuestion || 'Improve onboarding for our rideshare app.'} onComplete={onProcessingComplete} />;
  } else if (screen === 'study') {
    body = <ScreenStudy study={activeStudy} onGeneratePrototype={onGeneratePrototype} />;
  } else if (screen === 'interview') {
    body = <ScreenInterview study={activeStudy} onComplete={onInterviewComplete} onCancel={() => setScreen('study')} />;
  } else if (screen === 'prototype') {
    body = <ScreenPrototype study={activeStudy} answers={interviewAnswers || []} onBack={() => setScreen('study')} onReopen={() => setScreen('interview')} />;
  }

  return (
    <AppShell
      screen={screen}
      activeStudyId={activeStudyId}
      onNavigate={navigate}
      onOpenStudy={openStudy}
      breadcrumb={breadcrumb}
      actions={actions}
    >
      {body}
    </AppShell>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
