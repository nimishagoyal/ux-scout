# ux-scout

> AI-powered competitive UX analysis — grab screenshots from Mobbin, identify design patterns, and get actionable UI recommendations for your product.

---

## In One Sentence

UX Scout is an AI-powered UX intelligence platform that analyzes competitor app screenshots from Mobbin and turns them into actionable product and design recommendations for your own app.

---

## Who Is It For?

**Primary Users**
- Product Managers
- Product Designers

**Example Use Cases**

1. **Redesigning onboarding** — A PM wants to improve activation rates and uses UX Scout to analyze how top apps structure onboarding flows.
2. **Benchmarking against competitors** — A founder wants to see how competitors design paywalls, navigation, or checkout experiences.

---

## Project Description

### Overview

UX Scout is an AI-powered competitive UX intelligence platform that autonomously analyzes digital products, identifies emerging UX patterns, and generates actionable product recommendations — eventually creating interactive prototypes inspired by the best experiences across the market.

Today, product teams spend enormous amounts of time manually researching competitor apps, collecting screenshots, organizing inspiration boards, and debating product decisions based on fragmented observations. Competitive UX research is slow, subjective, and difficult to operationalize.

**UX Scout automates this entire workflow.**

Instead of relying on static inspiration libraries alone, UX Scout uses AI agents to:
- Explore and collect screenshots and flows from apps across the internet
- Understand how those products are designed
- Identify recurring UX and interaction patterns
- Synthesize insights tailored to a user's own product goals

Over time, the platform evolves beyond analysis into generation — enabling teams not only to understand what great products are doing, but also to automatically generate prototype experiences informed by those learnings.

---

### Solution

UX Scout acts as an AI UX research and prototyping assistant for product teams.

In the MVP, the platform uses **Mobbin** as the primary source of competitive UX data. Users can input a product category, workflow, or competitor set, and UX Scout analyzes relevant screenshots and flows from Mobbin to uncover recurring UX and interaction patterns.

The platform:
- Pulls screenshots and flows from Mobbin
- Uses multimodal AI models to understand interfaces
- Detects recurring UX and interaction patterns
- Benchmarks competitors and category leaders
- Generates actionable product recommendations
- Eventually enables AI-generated prototypes inspired by the best observed patterns

**Output:** The primary output is a structured AI-generated UX intelligence report delivered as a shareable document (e.g. Google Doc or exportable report) that synthesizes competitive research, pattern analysis, and actionable product recommendations.

The goal is to help teams make faster, evidence-backed product decisions — and eventually accelerate the product design process itself. While the MVP focuses on Mobbin as the initial data source, the long-term vision is to expand into a broader autonomous AI system capable of analyzing product experiences across the web.

---

## What the Final Output Includes

### 1. Executive Summary

A high-level overview of:
- What products were analyzed
- Key UX trends identified
- Major strengths and weaknesses observed
- Top recommendations for the user's product

> *Example: "Top fintech apps increasingly reduce onboarding friction through progressive disclosure, trust-building UI, and delayed account creation. Your onboarding flow currently introduces high cognitive load early in the experience."*

---

### 2. Benchmark Overview / Competitor Feature Matrix

A structured comparison of how competitors design and structure a specific user flow or product experience. Instead of only summarizing competitors at a high level, UX Scout generates a feature matrix that breaks down the key steps, UX decisions, and interaction patterns used across products.

**Example — Onboarding Flow Analysis:**

| Competitor | Goal Selection | Account Creation | KYC Verification | Payment Setup | Personalization | Progress Bar | Social Proof | Tutorial / Walkthrough |
|------------|---------------|-----------------|-----------------|---------------|----------------|-------------|-------------|----------------------|
| Revolut    | ✓             | Delayed         | ✓               | ✓             | ✓              | ✓           | ✗           | ✗                    |
| Robinhood  | ✗             | Early           | ✓               | ✓             | ✗              | ✓           | ✗           | ✗                    |
| Cleo       | ✓             | Delayed         | ✗               | ✗             | ✓              | ✗           | ✓           | ✓                    |
| Mint       | ✓             | Early           | ✗               | ✗             | ✓              | ✓           | ✗           | ✓                    |

The report can also include:
- Flow length comparisons
- Number of onboarding screens
- Order of steps
- Optional vs mandatory flows
- Use of gamification or incentives
- Monetization placement
- Trust-building moments
- Data collection timing

This allows teams to quickly understand common industry standards, where competitors converge, which UX decisions are becoming best practices, and opportunities for differentiation.

---

### 3. UX Pattern Analysis

AI-generated clustering and analysis of recurring UX patterns across screenshots and flows.

**Example patterns:**
- Progressive onboarding
- Sticky CTAs
- Social proof before paywall
- Empty-state education
- Habit-forming loops
- Conversational onboarding
- Personalized setup flows

For each pattern, the report includes:
- Description of the pattern
- Screenshots/examples
- Frequency across competitors
- Why the pattern may work
- Tradeoffs or considerations

---

### 4. Screenshots Mapping User Journeys

The report includes curated competitor screenshots organized into end-to-end user journeys and flows. Rather than presenting isolated screenshots, UX Scout maps how different competitors structure complete user experiences step-by-step.

**Examples of journeys:**
- Onboarding flows
- Checkout flows
- Subscription/paywall journeys
- KYC verification
- Account setup
- Empty-state activation
- Search and discovery
- Habit-forming engagement loops

For each journey, the report visualizes:
- The sequence of screens
- Key interaction points
- Decision moments
- Where competitors introduce friction or motivation
- How flows differ across products

---

### 5. Comparative UX Insights

Benchmarking insights such as:
- "78% of top apps use progress indicators during onboarding"
- "Most competitors defer sign-up until after value demonstration"
- "AI productivity apps increasingly use conversational onboarding"

The goal is to move beyond inspiration into structured competitive intelligence.

---

### 6. Product-Specific Recommendations

The most important section of the report. UX Scout tailors recommendations to the user's own product context.

**Example recommendations:**
- Reduce onboarding from 7 screens to 4
- Introduce trust-building moments before KYC
- Simplify checkout hierarchy
- Add empty-state education
- Improve visual emphasis for primary actions
- Delay account creation
- Introduce personalization earlier in the flow

Each recommendation includes:
- Rationale
- Supporting competitor examples
- Expected UX impact
- Priority level
