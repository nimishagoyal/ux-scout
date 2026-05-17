// ─────────────────────────────────────────────────────────────
// UX SCOUT — Mock data for the production app.
// Studies, sections, patterns, recommendations.
// ─────────────────────────────────────────────────────────────

const APP_USER = { name: 'Jamie', initial: 'J', workspace: 'Stripe · Growth' };

// All studies in the library
const APP_STUDIES = [
  {
    id: 'rideshare-onboarding',
    title: 'Improve onboarding for our rideshare app',
    short: 'Rideshare onboarding',
    status: 'fresh',
    date: 'today · 09:42',
    flows: 142,
    competitors: 5,
    apps: ['Lyft', 'Uber', 'Bolt', 'Didi', 'Grab'],
    industry: 'rideshare',
    touchpoint: 'onboarding',
    goal: 'improve activation',
    summary: 'Top mobility apps converge on map-first onboarding and deferred signup. Both gestures shave seconds off the first action and lift activation. Your current flow front-loads the credentials decision; the market is moving the other way.',
    tagline: 'Map-first wins. Defer the signup gate.',
    confidence: 'high',
    recsCount: 3,
    keyShots: ['form','detail','cards','list'],
  },
  {
    id: 'fintech-checkout',
    title: 'Reduce friction in fintech checkout',
    short: 'Fintech checkout',
    status: 'reviewed',
    date: '3 days ago',
    flows: 89,
    competitors: 6,
    apps: ['Revolut','Wise','Cash App','Monzo','N26','Chime'],
    industry: 'fintech',
    touchpoint: 'checkout',
    goal: 'reduce friction',
    summary: 'Single-screen checkout with biometric confirm is becoming default across challenger banks. KYC moves to the back, never the front.',
    tagline: 'One screen. Biometric. KYC deferred.',
    confidence: 'high',
    recsCount: 4,
    keyShots: ['cards','form','detail'],
  },
  {
    id: 'paywall-health',
    title: 'Rethink paywall psychology in subscription health apps',
    short: 'Health paywalls',
    status: 'reviewed',
    date: '1 week ago',
    flows: 76,
    competitors: 7,
    apps: ['Headspace','Calm','Strava','Whoop','Oura','Fitbit','MyFitnessPal'],
    industry: 'health',
    touchpoint: 'paywall',
    goal: 'increase trust',
    summary: 'Top health apps anchor on a 7-day free trial with no credit card. Social proof from real users carries the moment; framed gains beat framed losses.',
    tagline: 'Trial-first. Social proof over loss aversion.',
    confidence: 'medium',
    recsCount: 3,
    keyShots: ['detail','cards'],
  },
  {
    id: 'kyc-crypto',
    title: 'Benchmark KYC flows across crypto apps',
    short: 'Crypto KYC',
    status: 'archived',
    date: '2 weeks ago',
    flows: 54,
    competitors: 5,
    apps: ['Coinbase','Kraken','Binance','Robinhood','Gemini'],
    industry: 'fintech',
    touchpoint: 'KYC',
    goal: 'benchmark competitors',
    summary: 'Two-stage KYC: name + email gives basic spending; ID + selfie unlocks higher tiers. Tier transparency is the trust gesture.',
    tagline: 'Two stages. Tier transparency.',
    confidence: 'high',
    recsCount: 5,
    keyShots: ['form','list','detail'],
  },
  {
    id: 'ai-empty-state',
    title: 'Redesign empty-state activation for AI productivity',
    short: 'AI empty states',
    status: 'draft',
    date: '3 weeks ago',
    flows: 41,
    competitors: 4,
    apps: ['Notion','Linear','Granola','Cursor'],
    industry: 'AI productivity',
    touchpoint: 'empty states',
    goal: 'improve activation',
    summary: 'Conversational onboarding with a single example task. The empty state itself becomes the tutorial.',
    tagline: 'Conversational onboarding. One example task.',
    confidence: 'medium',
    recsCount: 3,
    keyShots: ['list','form'],
  },
];

const ACTIVE_STUDY = APP_STUDIES[0];

// ─── Study content for the active study (rideshare-onboarding) ──
const STUDY_SECTIONS = [
  { id: 'summary',         label: 'Executive Summary',     n: '01' },
  { id: 'patterns',        label: 'UX Pattern Analysis',   n: '02' },
  { id: 'matrix',          label: 'Competitor Matrix',     n: '03' },
  { id: 'journeys',        label: 'User Journey Mapping',  n: '04' },
  { id: 'insights',        label: 'Comparative Insights',  n: '05' },
  { id: 'recommendations', label: 'Recommendations',       n: '06' },
];

const STUDY_PATTERNS = [
  {
    id: 'map-first', name: 'Map-first onboarding',
    note: 'The map is up before the signup gate. Pin the destination, then sign in.',
    longNote: 'A live, interactive map appears on launch — sometimes with nearby drivers, sometimes empty. The user is invited to tap a destination before any credentials are requested. Signup becomes the second decision, not the first.',
    freq: '9 / 12', strong: true, accent: 'amber',
    shots: ['form', 'detail', 'cards'],
    seenIn: ['Lyft','Uber','Bolt','Didi','Grab'],
  },
  {
    id: 'delayed-account', name: 'Delayed account creation',
    note: 'Signup is requested after the first action, not before.',
    longNote: 'Value first, friction later. Users complete a destination tap, sometimes even ETA preview, before the system asks for their phone. Three of the five fastest flows defer signup entirely until ride request.',
    freq: '7 / 12', strong: true, accent: 'amber',
    shots: ['form', 'list'],
    seenIn: ['Lyft','Bolt','Cabify','Kapten'],
  },
  {
    id: 'phone-auth', name: 'Phone-only auth',
    note: 'No password, no email. SMS code only.',
    longNote: 'Removes the credential decision. Eleven of twelve apps use SMS-only as the primary path. Email is optional for receipts.',
    freq: '11 / 12', accent: 'cobalt',
    shots: ['form', 'cards'],
    seenIn: ['All except Gett'],
  },
  {
    id: 'eta-preview', name: 'Driver ETA before signup',
    note: 'A nearby car and an estimate before the account form.',
    longNote: 'A trust gesture that converts. Six apps surface ETA before any credentials.',
    freq: '6 / 12', accent: 'cobalt',
    shots: ['detail', 'list'],
    seenIn: ['Lyft','Kapten','Cabify','Free Now'],
  },
  {
    id: 'trust', name: 'Trust gestures at pickup',
    note: 'License plate, photo, name. Confirmed inside the car.',
    longNote: 'Three apps surface verification only at pickup, not signup. Lower friction, equal trust.',
    freq: '3 / 12', tentative: true, accent: 'soft',
    shots: ['detail'],
    seenIn: ['Didi','Uber Comfort'],
  },
];

const STUDY_MATRIX = {
  competitors: ['Lyft', 'Uber', 'Bolt', 'Didi', 'Grab'],
  features: [
    { key: 'mapFirst',    label: 'Map first' },
    { key: 'phoneOnly',   label: 'Phone-only auth' },
    { key: 'deferSignup', label: 'Defer signup' },
    { key: 'payAfter',    label: 'Pay after first' },
    { key: 'idVerify',    label: 'ID verify at signup' },
    { key: 'tutorial',    label: 'Tutorial' },
    { key: 'promo',       label: 'Promo / referral' },
  ],
  values: {
    Lyft: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'y', payAfter: 'y', idVerify: 'n', tutorial: 'n', promo: 'y' },
    Uber: { mapFirst: 'y', phoneOnly: 'y', deferSignup: '-', payAfter: 'n', idVerify: 'n', tutorial: 'y', promo: 'y' },
    Bolt: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'y', payAfter: 'y', idVerify: 'n', tutorial: 'n', promo: 'y' },
    Didi: { mapFirst: '-', phoneOnly: 'y', deferSignup: 'n', payAfter: 'n', idVerify: 'y', tutorial: 'y', promo: 'y' },
    Grab: { mapFirst: 'y', phoneOnly: 'y', deferSignup: 'n', payAfter: 'y', idVerify: 'n', tutorial: 'y', promo: 'y' },
  },
};

const STUDY_JOURNEYS = [
  {
    app: 'Lyft',
    flowLength: '4 screens',
    note: 'Map first · destination tap · phone auth · request',
    steps: [
      { k: 'detail', name: 'Map (no signup)',     hint: 'Live drivers visible' },
      { k: 'form',   name: 'Destination',         hint: 'Address input' },
      { k: 'cards',  name: 'Confirm + ETA',       hint: 'Pickup point' },
      { k: 'form',   name: 'Phone auth',          hint: 'SMS code' },
    ],
    accent: 'amber',
  },
  {
    app: 'Uber',
    flowLength: '5 screens',
    note: 'Map first · tutorial · destination tap · phone · payment',
    steps: [
      { k: 'detail', name: 'Map + intro',         hint: 'One-screen tutorial' },
      { k: 'list',   name: 'Tutorial · skip',     hint: 'Optional walkthrough' },
      { k: 'form',   name: 'Destination',         hint: 'Map markers' },
      { k: 'form',   name: 'Phone auth',          hint: 'SMS code' },
      { k: 'cards',  name: 'Payment',             hint: 'Card or wallet' },
    ],
    accent: 'amber',
  },
  {
    app: 'Bolt',
    flowLength: '3 screens',
    note: 'Map first · destination · phone auth (pay after first ride)',
    steps: [
      { k: 'detail', name: 'Map',                 hint: 'Nearby cars + ETA' },
      { k: 'form',   name: 'Destination',         hint: 'Address + pickup' },
      { k: 'form',   name: 'Phone auth',          hint: 'SMS · payment later' },
    ],
    accent: 'amber',
  },
];

const STUDY_INSIGHTS = [
  { stat: '78%',    body: 'of top mobility apps defer signup until after the first interaction.', accent: 'amber' },
  { stat: '5.4',    suffix: 'screens', body: 'average onboarding length in 2026, down from 8.2 in 2024.', accent: 'cobalt' },
  { stat: '9 / 12', body: 'use a map-first opening gesture — the new industry default.', accent: 'amber' },
  { stat: '11s',    body: 'median time-to-first-tap on map-first flows. 27s on credentials-first flows.', accent: 'amber' },
];

const STUDY_RECS = [
  {
    id: 'rec1',
    priority: 'HIGH',
    headline: 'Show the map before the signup gate.',
    rationale: 'Nine of twelve top apps put an interactive map up before any account commitment is asked. The signup moves to the moment a destination is tapped — the highest-intent moment in the entire flow.',
    impact: '+8–12% activation (est.)',
    effort: 'S · 1 sprint',
    cites: ['Lyft', 'Uber', 'Bolt'],
    patterns: ['map-first'],
    accent: 'amber',
  },
  {
    id: 'rec2',
    priority: 'MEDIUM',
    headline: 'Surface a driver ETA before the email field.',
    rationale: 'Six apps show a nearby car and an estimate before any credentials. A measurable trust gesture.',
    impact: '+3–5% activation',
    effort: 'M · 2 sprints',
    cites: ['Lyft','Kapten','Cabify'],
    patterns: ['eta-preview'],
    accent: 'cobalt',
  },
  {
    id: 'rec3',
    priority: 'MEDIUM',
    headline: 'Defer payment capture until after the first ride.',
    rationale: 'Lyft, Bolt and Grab let users complete a first trip on auth-only. Conversion lifts in every measured deployment.',
    impact: '+4–6% activation',
    effort: 'L · cross-team',
    cites: ['Lyft','Bolt','Grab'],
    patterns: ['delayed-account'],
    accent: 'cobalt',
  },
  {
    id: 'rec4',
    priority: 'LOW',
    headline: 'Confirm license & plate at pickup, not on home.',
    rationale: 'Only 3 of 12 surface this; evidence weak but worth flagging for trust experiments later.',
    impact: 'tracking only',
    effort: 'S · 1 sprint',
    cites: ['Didi','Uber Comfort'],
    patterns: ['trust'],
    tentative: true,
    accent: 'soft',
  },
];

// Inspirational rotating prompts on the New Research screen
const INSPIRATION_PROMPTS = [
  'Design onboarding for a rideshare app',
  'Analyze checkout flows for ecommerce',
  'Improve fintech stock chart UX',
  'Benchmark KYC flows across crypto apps',
  'Redesign empty-state activation for AI productivity',
  'Rethink paywall psychology in health apps',
  'Compare navigation in travel super-apps',
  'Refine notification rhythm for social apps',
];

// Category chips (shared across screens)
const APP_CHIPS = [
  { label: 'industry',   chips: ['fintech','rideshare','ecommerce','AI productivity','health','social','travel'] },
  { label: 'touchpoint', chips: ['onboarding','checkout','paywall','navigation','KYC','empty states','charts','notifications'] },
  { label: 'goal',       chips: ['improve activation','reduce friction','increase trust','improve retention','benchmark competitors','improve conversion','simplify complexity','create delight'] },
];

// Suggested research cards on the New screen
const SUGGESTED = [
  { title: 'How are top fintechs sequencing KYC?',           industry: 'fintech',   freq: '12 apps · this week' },
  { title: 'Conversational onboarding in AI productivity',   industry: 'AI productivity', freq: '8 apps · this month' },
  { title: 'Paywall placement in subscription health apps',  industry: 'health',    freq: '14 apps · this month' },
];

Object.assign(window, {
  APP_USER, APP_STUDIES, ACTIVE_STUDY,
  STUDY_SECTIONS, STUDY_PATTERNS, STUDY_MATRIX, STUDY_JOURNEYS, STUDY_INSIGHTS, STUDY_RECS,
  INSPIRATION_PROMPTS, APP_CHIPS, SUGGESTED,
});
