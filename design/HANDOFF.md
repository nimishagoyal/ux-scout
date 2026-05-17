# UX Scout — Engineering Handoff

**An AI-powered UX intelligence platform.** Users ask a UX/product question in plain language → UX Scout reads competitor flows, identifies recurring patterns, benchmarks the landscape, writes ranked recommendations, and produces a copyable prompt for vibe-coding tools (Lovable / Bolt / v0).

This bundle contains a complete, navigable React prototype across three entry points: a cinematic landing page, the production app, and a scroll-driven hero walkthrough. Everything is built with React 18 + Babel-in-browser. The prototype is implementation-ready: components are named, state is centralized, content is real (no lorem), and all interactions work end-to-end.

---

## Entry points

| File | Purpose | Primary user |
|---|---|---|
| **`Landing.html`** | Marketing surface. Single-screen cinematic universe with an interactive prompt + three semantic constellations of category chips. Submitting hands off the question to the app via `localStorage`. | First-time visitor |
| **`UX Scout.html`** | The production app. Six screens with state-based routing: Library, New Research, Processing, Study Viewer (six report sections), Guided Interview, Prototype Prompt handoff. | Logged-in researcher |
| **`Hero Sequence.html`** | A 90-second scroll-driven walkthrough of the full product narrative — eight cinematic scenes. Linked from the landing as "How it works ↗". | Marketing demo |
| **`index.html`** | Design canvas with launch tiles for all three plus origin design explorations (kept as reference material). | Design review |

The landing → app handoff uses `localStorage.uxscout:pendingResearch` (`{question, chips, ts}`). The app reads this on mount and jumps the user straight into the Processing screen.

---

## Product workflow (end-to-end)

1. **Landing** — User types a UX question (or clicks chips to assemble one progressively). Single-select per category (industry/touchpoint/goal). Chips are accelerators, not filters — free typing always wins.
2. **Processing** — Four-step generation timeline with spinner/progress (~2 min target).
3. **Study Viewer** — The report. Sticky section nav scroll-spies through six sections:
   - **§01 Executive Summary** — high-level synthesis + study meta + apps analyzed
   - **§02 UX Pattern Analysis** — clustered recurring patterns with frequencies
   - **§03 Competitor Feature Matrix** — 5×7 benchmark table
   - **§04 User Journey Mapping** — horizontal step-by-step competitor flows
   - **§05 Comparative Insights** — big stat cards
   - **§06 Product-Specific Recommendations** — primary (featured) + secondary (2-up) + tentative
   - **End-of-report CTA** — prominent "Start building" panel that opens the Guided Interview
4. **Guided Interview** — Four structured questions (references, patterns, context, design system). Blueprint assembles live on the right as answers land.
5. **Prototype Prompt** — Generated prompt block with Copy / Lovable / Bolt / v0 CTAs + three follow-up action cards (Share / Iterate / Back to study).

---

## File structure

```
Landing.html                  ← marketing landing
  landing-galaxy.jsx          ←   the cinematic universe component (~600 lines)
  landing-main.jsx            ←   ReactDOM render
UX Scout.html                 ← production app
  app-main.jsx                ←   routing + state (entry point)
  app-shell.jsx               ←   Sidebar + TopBar + AppShell
  app-components.jsx          ←   component library (Button, Card, Chip, etc.)
  app-data.jsx                ←   mock studies + content for the canonical study
  app-screen-library.jsx      ←   Library screen
  app-screen-new.jsx          ←   New Research + Processing screens
  app-screen-study.jsx        ←   Study Viewer (all 6 sections + Build CTA)
  app-screen-flow.jsx         ←   Guided Interview + Prototype Prompt screens
Hero Sequence.html            ← cinematic walkthrough
  sequence-helpers.jsx        ←   shared tokens, primitives, math
  sequence-scenes.jsx         ←   scenes 1-3 (galaxy / reading / patterns)
  sequence-scenes-late.jsx    ←   scenes 4-8 (matrix / insights / recs / interview / prototype)
  sequence-stage.jsx          ←   scroll-driven sticky stage + scrubber
shared.jsx                    ← shared helpers (RefScreenshot placeholder)
index.html                    ← design canvas with launch tiles for all three
  app.jsx                     ←   canvas composition
  design-canvas.jsx           ←   pan/zoom canvas component (starter)
  hero-launch.jsx, app-launch.jsx, landing-launch.jsx ← tile components
```

Origin design explorations (kept on canvas as reference, safe to drop for production):
`direction-1.jsx`, `direction-2.jsx`, `direction-3.jsx`, `lumen-*.jsx`, `unified-*.jsx`

---

## Design system

### Palette — `sequence-helpers.jsx` → `S`

| Token | Hex | Role |
|---|---|---|
| `deep` / `graphite` / `warmGraphite` | `#0D0F12` / `#14171C` / `#191915` | Page backgrounds |
| `raised` / `raisedWarm` / `surface` | `#1F2228` / `#231F18` / `#1B1E23` | Cards, plates |
| `bone` / `ink` / `soft` / `faint` / `dim` | `#E8E3D2` / `#CFC9B5` / `#8A8472` / `#5A564B` / `#3A372F` | Text scale |
| `amber` / `amberGlow` / `warmLight` | `#D9963E` / `#F4CC7D` / `#F4E0B4` | Primary accent — focus, CTAs, headlines |
| `cobalt` / `cobaltGlow` | `#4F73AE` / `#88A6D8` | Secondary accent — citations, secondary recs |
| `rule` / `hairline` / `threadFaint` / `threadStrong` | rgba | Borders, dividers, SVG threads |
| `check` / `cross` | `#A9B98E` / `#7C5040` | Matrix yes/no semantic colors |

**Rule:** Warm graphite ground. Two accents only (amber, cobalt). No pure black/white. No italics anywhere.

### Typography — `Stype` + `sf()`

- **Display / UI / body** — `Bricolage Grotesque` (Söhne-adjacent neo-grotesk on Google Fonts). Variable axes: `opsz` (12–96), `wdth` (75–100), `wght` (300–700).
- **Reading prose** — `Newsreader` 300/400. For long-form synthesis paragraphs only.
- **Rare cinematic moment** — `Instrument Serif` italic, but **only** in the Hero Sequence closing line. Production app uses zero italics.

Use `sf(opsz, wght, wdth)` helper to set variable axes inline:
```js
{ ...sf(48, 400, 95), letterSpacing: '-.02em', lineHeight: 1.05 }
```

Named styles: `display`, `title`, `headline`, `headlineMed`, `reading`, `readingMed`, `body`, `bodyMed`, `eyebrow`, `micro`, `tabular`.

### Motion — keyframes in HTML `<style>` blocks

- `pulse` 3-6s — soft attention marks
- `breath` 6-18s — slow opacity drift on focused elements
- `fieldBreath` 14-20s — ambient field halos
- `orbitA–F` 24-56s — gravitational drift paths (six unique elliptical paths)
- `fadeUp` / `fadeIn` — entrance only

All motion is ambient, semantic, never decorative. No flashes, no flips, no bouncing.

---

## Component library — `app-components.jsx`

Named, reusable, prop-driven. Ready to translate to Tailwind/css-in-js or a component library of your choosing.

| Component | Props | Notes |
|---|---|---|
| `Button` | `variant` (primary, secondary, ghost, link, danger), `size` (s, m, l), `icon`, `trailing`, `disabled`, `onClick` | Primary uses amber background with glow |
| `Card` | `lit` (boolean), `padding`, children | Lit cards have amber border + glow halo |
| `Chip` | `active`, `color` (amber/cobalt/soft/bone), `size` | Pill with hairline border |
| `PriorityTag` | `level` (HIGH/MEDIUM/LOW) | For recommendations |
| `StatusPill` | `status` (fresh/reviewed/archived/draft) | For studies in library |
| `AppIcon` | `name`, `size` | First-letter glyph (no fake logos) |
| `AppShot` | `kind`, `accent`, `w`, `h` | Reference screenshot mini |
| `SectionHeader` | `eyebrow`, `title`, `right` | Used across all section starts |
| `KeyValue` | `label`, `value`, `color` | Small metadata pair |
| `AppMatrixCell` | `v` (y/n/-), `lit` | Renders ✓ / ✗ / "partial" |
| `DotLoader`, `Spinner` | size, color | Loading states |

---

## State model — `app-main.jsx`

Simple `useState` routing. No external state library needed for the MVP.

```js
const [screen, setScreen]                  // library | new | processing | study | interview | prototype
const [activeStudyId, setActiveStudyId]    // string | null
const [pendingQuestion, setPendingQuestion]
const [interviewAnswers, setInterviewAnswers]
```

Navigation handlers: `navigate(target)`, `openStudy(id)`, `startResearch({question})`, `onProcessingComplete()`, `onGeneratePrototype()`, `onInterviewComplete(answers)`.

Per-screen breadcrumb + actions are built from the `screen` value at the top of `App`.

---

## Data model — `app-data.jsx`

| Constant | Shape | Used by |
|---|---|---|
| `APP_USER` | `{name, initial, workspace}` | Sidebar profile, library hero |
| `APP_STUDIES` | `[{id, title, short, status, date, flows, competitors, apps, industry, touchpoint, goal, summary, tagline, confidence, recsCount, keyShots}]` | Sidebar list + Library grid |
| `STUDY_SECTIONS` | `[{id, label, n}]` | Study viewer section nav |
| `STUDY_PATTERNS` | `[{id, name, note, longNote, freq, strong, tentative, accent, shots, seenIn}]` | UX Pattern Analysis section |
| `STUDY_MATRIX` | `{competitors, features, values}` | Competitor Feature Matrix |
| `STUDY_JOURNEYS` | `[{app, flowLength, note, steps, accent}]` | User Journey Mapping |
| `STUDY_INSIGHTS` | `[{stat, suffix, body, accent}]` | Comparative Insights |
| `STUDY_RECS` | `[{id, priority, headline, rationale, impact, effort, cites, patterns, tentative, accent}]` | Recommendations + Build CTA |
| `INSPIRATION_PROMPTS` | `string[]` | Landing placeholder rotation |
| `APP_CHIPS` | `[{label, chips}]` | New Research screen chip groups |

For production: replace these constants with API responses. The shapes are stable enough to model server-side directly.

---

## Notes for implementation

1. **Babel-in-browser is for prototype only.** Production should compile JSX ahead of time (Vite / Next / similar).
2. **Replace `localStorage` handoff** between landing → app with proper routing/SSR query params in production.
3. **Component library is unstyled-friendly.** All styles are inline objects right now — easy to translate to Tailwind classes or a CSS-in-JS solution. The token names (`S.amberGlow`, `Stype.title`) map cleanly to design-system class names.
4. **Animation keyframes** are in each HTML's `<style>` block. Move to a shared CSS file in production.
5. **Bricolage Grotesque is loaded from Google Fonts.** If you have a licensed Söhne, swap in via `@font-face`. Bricolage is a deliberate Söhne-adjacent stand-in for the prototype.
6. **No router library.** State-based routing in `app-main.jsx` is enough for the MVP. Swap for `react-router` or similar when adding deep-linking.
7. **The Hero Sequence scroll choreography** uses `position: sticky` + `useScrollProgress` — works in modern browsers but requires `body { overflow-x: auto }` (NOT `hidden`) for sticky to pin to document.
8. **Zero italics across the app.** Hierarchy is carried by scale, weight (300/400/500), and amber/cobalt color shifts. Match this constraint in any net-new design.

---

## Running locally

Open any of the four HTML entry points directly in a modern browser (file:// works). For the landing → app handoff to work cleanly, serve via a static server so `localStorage` carries over consistently:

```sh
python3 -m http.server 8080
# then open http://localhost:8080/Landing.html
```

---

## What's NOT included (intentional)

- **Auth / login** — the landing explicitly skips it. The app pretends a user is logged in (`APP_USER.name = 'Jamie'`).
- **Real API** — all data is in `app-data.jsx`. Processing screen auto-advances on a timer.
- **Real screenshots** — `RefScreenshot` in `shared.jsx` renders simple geometric placeholders. Replace with actual competitor screenshots when wiring up Mobbin or similar.
- **Real prompt generation** — the prompt in Scene 8 / Prototype screen is template-assembled from interview answers, not LLM-generated. Wire to an LLM call when integrating.
- **Mobile** — desktop-first prototype. Layouts assume ≥1280px viewport.

---

## Provenance

Built iteratively across multiple design directions:
- 3 foundational explorations (Editorial / Data-Dense / Warm)
- 1 unified editorial direction ("Margin")
- 1 cinematic spatial direction ("Lumen")
- Final synthesis as **UX Scout** with the cinematic-universe landing, scroll-driven walkthrough, and production app.

Origin material remains on the design canvas (`index.html`) for reference but is not loaded by the production app or landing.
