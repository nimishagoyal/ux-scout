// Compose Lumen (current direction) + Margin (prior unified) + the three origins.

const { DesignCanvas, DCSection, DCArtboard } = window;

function App() {
  return (
    <DesignCanvas
      title="UX Scout — AI-powered UX intelligence"
      subtitle="Cinematic interactive walkthrough · with prior visual explorations kept below as origin material"
    >
      {/* ─── LANDING PAGE — public marketing surface ────────────── */}
      <DCSection
        id="landing"
        title="UX Scout — landing page"
        description="A single-screen cinematic universe. The interactive prompt is the centerpiece, with orbital inspirational prompts drifting in the periphery and clickable category chips below. No signup, no login — type a UX question and Begin hands off straight to the production app's processing screen."
      >
        <DCArtboard id="landing-launch" label="▶ Landing page · launch"
          width={1920} height={1080}>
          <LandingLaunchTile />
        </DCArtboard>
      </DCSection>

      {/* ─── HERO SEQUENCE — interactive cinematic flow ──────────── */}
      <DCSection
        id="hero"
        title="UX Scout — interactive cinematic walkthrough"
        description="A scroll-driven sequence that narrates the full UX Scout product workflow: the entry galaxy with category chips, reading the competitive landscape, UX pattern analysis, the competitor feature matrix, comparative insights, ranked product-specific recommendations, a guided interview, and an AI-assisted prototype prompt ready to paste into Lovable, Bolt or v0. Eight scenes, ~90 seconds, opens fullscreen in a new tab."
      >
        <DCArtboard id="hero-launch" label="▶ Hero walkthrough · launch"
          width={1920} height={1080}>
          <HeroLaunchTile />
        </DCArtboard>
      </DCSection>

      {/* ─── UX SCOUT PRODUCTION APP — navigable prototype ───────── */}
      <DCSection
        id="app"
        title="UX Scout — production app (handoff-ready)"
        description="The navigable React prototype for engineering handoff. Six screens wired with state-based routing: Library, New Research, Processing, Study Viewer (with all six report sections), Guided Interview, and Prototype Prompt. Component library is named and reusable. Same warm graphite + amber palette and Bricolage Grotesque typography as the cinematic walkthrough — but operational, not atmospheric."
      >
        <DCArtboard id="app-launch" label="▶ UX Scout app · launch"
          width={1920} height={1080}>
          <AppLaunchTile />
        </DCArtboard>
      </DCSection>

      {/* ─── Origin: Lumen cinematic exploration ────────────────── */}
      <DCSection
        id="lumen"
        title="Origin — Lumen · spatial cinematic exploration"
        description="Reference material. The visual exploration that pushed the direction toward cinematic spatial composition before the product walkthrough refined it. Warm graphite ground, tungsten amber, muted cobalt."
      >
        <DCArtboard id="l-a" label="I.A — Atmosphere · type · light · motion"
          width={1640} height={1100}>
          <Lumen_Atmosphere />
        </DCArtboard>
        <DCArtboard id="l-b" label="I.B — The canvas, at rest · before the question lands"
          width={1920} height={1100}>
          <Lumen_CanvasAtRest />
        </DCArtboard>
        <DCArtboard id="l-c" label="I.C — Mid-synthesis · clusters lifting · first insight crystallizing"
          width={1920} height={1180}>
          <Lumen_MidSynthesis />
        </DCArtboard>
        <DCArtboard id="l-d" label="I.D — Recommendation hierarchy · confidence ↔ scale + luminosity"
          width={1920} height={1180}>
          <Lumen_Hierarchy />
        </DCArtboard>
        <DCArtboard id="l-e" label="I.E — Adaptive focus · the world rearranges around an insight"
          width={1920} height={1100}>
          <Lumen_AdaptiveFocus />
        </DCArtboard>
      </DCSection>

      {/* ─── MARGIN — prior unified direction (editorial) ───────── */}
      <DCSection
        id="unified"
        title="Origin — Margin · editorial studio exploration"
        description="Reference material. The merged editorial direction before the cinematic shift. Warm cream paper, Instrument Serif + Newsreader + Geist, curated reference plates."
      >
        <DCArtboard id="u-f" label="I.A — Foundations" width={1640} height={1080}><U_Foundations /></DCArtboard>
        <DCArtboard id="u-c" label="I.B — Component language" width={1480} height={920}><U_Components /></DCArtboard>
        <DCArtboard id="u-w" label="I.C — Workspace · the spread" width={1760} height={1080}><U_Workspace /></DCArtboard>
        <DCArtboard id="u-s" label="I.D — Synthesis as editorial" width={1640} height={1080}><U_Synthesis /></DCArtboard>
        <DCArtboard id="u-r" label="I.E — Reference plates" width={1640} height={1100}><U_References /></DCArtboard>
      </DCSection>

      {/* ─── Original three exploratory directions ──────────────── */}
      <DCSection id="d1"
        title="Origin — D1 · Editorial Intelligence"
        description="Reference material. Linear · Perplexity · Stripe Docs. Typography-first, monochrome restraint.">
        <DCArtboard id="d1-f" label="01.A — Foundations" width={1480} height={920}><D1_Foundations /></DCArtboard>
        <DCArtboard id="d1-c" label="01.B — Components" width={1280} height={920}><D1_Components /></DCArtboard>
        <DCArtboard id="d1-w" label="01.C — Workspace" width={1640} height={1020}><D1_Workspace /></DCArtboard>
        <DCArtboard id="d1-s" label="01.D — Synthesis" width={1480} height={920}><D1_Synthesis /></DCArtboard>
      </DCSection>

      <DCSection id="d2"
        title="Origin — D2 · Data-Dense Research OS"
        description="Reference material. Bloomberg · ClickHouse. Light terminal, operational density.">
        <DCArtboard id="d2-f" label="02.A — Foundations" width={1480} height={920}><D2_Foundations /></DCArtboard>
        <DCArtboard id="d2-c" label="02.B — Components" width={1280} height={920}><D2_Components /></DCArtboard>
        <DCArtboard id="d2-w" label="02.C — Workspace" width={1640} height={1020}><D2_Workspace /></DCArtboard>
        <DCArtboard id="d2-s" label="02.D — Synthesis" width={1480} height={920}><D2_Synthesis /></DCArtboard>
      </DCSection>

      <DCSection id="d3"
        title="Origin — D3 · Warm Research Companion"
        description="Reference material. Granola · Claude · Readwise. Cream paper, serif reading, AI as a letter.">
        <DCArtboard id="d3-f" label="03.A — Foundations" width={1480} height={920}><D3_Foundations /></DCArtboard>
        <DCArtboard id="d3-c" label="03.B — Components" width={1280} height={920}><D3_Components /></DCArtboard>
        <DCArtboard id="d3-w" label="03.C — Workspace" width={1640} height={1020}><D3_Workspace /></DCArtboard>
        <DCArtboard id="d3-s" label="03.D — Synthesis" width={1480} height={920}><D3_Synthesis /></DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
