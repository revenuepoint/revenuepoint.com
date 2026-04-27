# Foundry — `/foundry/`

> Source: `src/app/foundry/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The Foundry page does the most voice work right of any product page — the *Connect · Illuminate · Act* three-beat, the *Every system generates data. Nothing orchestrates it.* italicized hook, the receipts strip (*2 days/wk · 2+ weeks · 0*), and the integration list. The wobbles concentrate at the surfaces that pre-date the voice system: the meta description (*for mid-market*), the hero sidenote (the three-retirement stack: *Live in 6 weeks · Named admin and PM · No data engineers required*), the *Overnight* cadence claims for Prism and AI analysis (3 instances), one *named administrator* in the engagement step, and the engagement section header (*Live in 6 weeks*). 12 change blocks below — 7 P0, 4 P1, 1 P2.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/foundry/page.tsx:25–30` — `buildMetadata({...})`

**Current:**

> The only fully managed data and AI platform for mid-market. Dashboards, AI agents, automated workflows — starting at $2,500/month.

**Proposed:**

> The fully managed data orchestration and AI platform for growing businesses. Dashboards, agents, automated workflows — fully managed by RevenuePoint, starting at $2,500/month.

**Rationale:** Three swaps. (1) *For mid-market* — banned site-wide (`lexicon.md` §audience-segment language); substitute *for growing businesses*. (2) *AI agents* — saturated AI-as-modifier; drop the *AI* — *agents* alone is more specific in our voice (`lexicon.md` §AI clichés). (3) *The only fully managed data and AI platform* → *the fully managed data orchestration and AI platform* — Foundry's category claim is *AI orchestration*, not just *AI* (`brand-positioning.md` §Foundry); pair with the brand-required *fully managed by RevenuePoint* attribution (`lexicon.md` §service vocabulary).

**Priority:** P0

---

### Change 2 — Hero sidenote

**Location:** `src/app/foundry/page.tsx:224` — `sidenote="..."`

**Current:**

> Live in 6 weeks · Named admin and PM · No data engineers required.

**Proposed:**

> Two-week sprints, milestone-paced · Your single point of contact at RevenuePoint · Foundry comes with the data team.

**Rationale:** Verbatim the locked rewrite from `examples-library.md` §6 (the seed-list example for this exact line). Three retirements stack: *Live in 6 weeks* → *Two-week sprints, milestone-paced* (brand-level cadence, `lexicon.md` §outcome vocabulary); *Named admin and PM* → *Your single point of contact at RevenuePoint* (`lexicon.md` §service vocabulary); *No data engineers required* → *Foundry comes with the data team* (presence framing, `lexicon.md` §service-model clichés).

**Priority:** P0

---

### Change 3 — Hero body

**Location:** `src/app/foundry/page.tsx:219` — `<HeroSection body="...">`

**Current:**

> Foundry connects your CRM, ERP, accounting — and every other system your business already runs on — into one orchestrated platform. Live dashboards for every role. AI reports written overnight. Agents that watch, decide, and act across your systems. Otto, your AI analyst, answers in plain English. Fully managed by RevenuePoint.

**Proposed:**

> Foundry connects your CRM, ERP, accounting — and every other system your business already runs on — into your single source of truth, fully managed by RevenuePoint. Live dashboards for every role. AI analysis on demand. Agents that propose, get approved, and execute across your systems — every action logged, attributed, reversible. Otto, your AI analyst, answers in plain English. Fully managed by RevenuePoint.

**Rationale:** Three swaps. (1) *One orchestrated platform* → *your single source of truth, fully managed by RevenuePoint* — the locked SSOT pairing (`lexicon.md` §product vocabulary). (2) *AI reports written overnight* → *AI analysis on demand* (`lexicon.md` §AI clichés — *overnight* retired). (3) *Agents that watch, decide, and act across your systems* → *Agents that propose, get approved, and execute... every action logged, attributed, reversible* — names the actual plan-and-action workflow per `voice-and-tone.md` §pair automation claims with audit, and uses the locked agent-workflow vocabulary (`lexicon.md` §audit-and-accountability vocabulary).

**Priority:** P0

---

### Change 4 — Hero byline

**Location:** `src/app/foundry/page.tsx:213` — `byline="..."`

**Current:**

> RevenuePoint Foundry

**Proposed:**

> Foundry · Fully managed data orchestration

**Rationale:** *RevenuePoint Foundry* is product-and-brand stacked redundantly — the URL is `/foundry/` and the page is owned by the brand by definition. The substitute uses the locked Foundry category claim from `brand-positioning.md` §Foundry — *fully managed data orchestration and AI platform* — compressed for byline length.

**Priority:** P1

---

### Change 5 — Layer II ("Illuminate") bullet

**Location:** `src/app/foundry/page.tsx:328–332`

**Current:**

> Layer II — Illuminate
> *promise:* Analyze and visualize across every system at once.
> *bullets:*
>   - Live dashboards and metric trees for every role
>   - **AI-written analysis delivered overnight — specific numbers, clear next steps**
>   - Cross-system trends and anomalies no single tool sees

**Proposed:**

> Layer II — Illuminate
> *promise:* Analyze and visualize across every system at once.
> *bullets:*
>   - Live dashboards and metric trees for every role
>   - **AI analysis on demand — specific numbers, clear next steps**
>   - Cross-system trends and anomalies no single tool sees

**Rationale:** Single swap. *AI-written analysis delivered overnight* → *AI analysis on demand* (`lexicon.md` §AI clichés). The rest of the bullet — *specific numbers, clear next steps* — is on-voice (operationally specific receipts) and survives.

**Priority:** P0

---

### Change 6 — Prism section header and body

**Location:** `src/app/foundry/page.tsx:556–568`

**Current:**

> *(eyebrow)* PRISM
> *(heading)* AI-generated reports. Written overnight, ready by 8 AM.
> *(body)* Pick a report template. Prism pulls the data, analyzes, writes the narrative, and renders the charts — delivered to your inbox as PDF. 30+ templates spanning Finance, Sales, Operations, Production, Supply Chain, and more.
> *(caption)* Prism — overnight AI reports, by template

**Proposed:**

> *(eyebrow)* PRISM
> *(heading)* AI-generated reports. *On demand*, ready when you ask.
> *(body)* Pick a report template. Prism pulls the data, analyzes, writes the narrative, and renders the charts — delivered to your inbox as PDF. 30+ templates across Finance, Sales, Operations, Production, and Supply Chain.
> *(caption)* Prism — on-demand AI reports, by template

**Rationale:** Two swaps. (1) *Written overnight, ready by 8 AM* → *On demand, ready when you ask* — the locked rewrite from `examples-library.md` §9 (*overnight* retired across the system; the *8 AM* cadence creates a fixed-delivery promise that doesn't hold for every engagement). Italics on *On demand* preserve the headline-mechanic emphasis the original page uses (`editorial-style.md` §three-beat headline mechanics). (2) Caption *overnight AI reports* → *on-demand AI reports* — same retirement, applied to the figure caption. Body second sentence — *spanning … and more* tightens to *across … and Supply Chain* — drops a filler closer per `lexicon.md` §B2B clichés (*and more* without an enumeration is filler).

**Priority:** P0

---

### Change 7 — Engagement section header

**Location:** `src/app/foundry/page.tsx:629–636`

**Current:**

> *(eyebrow)* Engagement
> *(heading)* Live in *6 weeks*. Here's how.

**Proposed:**

> *(eyebrow)* Engagement
> *(heading)* Two-week sprints. Live in *4 to 8 weeks*. Here's how.

**Rationale:** *Live in 6 weeks* — the brand-level claim was retired in favor of *two-week sprints, milestone-paced*; specific 4–8 week copy survives only on `/foundry/pricing/` (per `receipts.md`). This page (`/foundry/`) is the product page — closer to specific than brand-level — but the header still over-commits to *6 weeks* as a single number. Substitute the actual range (*4 to 8 weeks*, locked in `receipts.md`) and lead with the cadence claim (*two-week sprints*) so the buyer sees both the rhythm and the range. Italics on *4 to 8 weeks* preserve the original mechanic.

**Priority:** P0

---

### Change 8 — Engagement Step 4 (Evolve)

**Location:** `src/app/foundry/page.tsx:643`

**Current:**

> Step 4 — Evolve — A named administrator and PM handle ongoing improvements — new dashboards, new agents, monthly review calls. Foundry grows as your business does.

**Proposed:**

> Step 4 — Evolve — Your single point of contact and a project manager handle ongoing improvements — new dashboards, new agents, monthly review calls. Foundry grows as your business does.

**Rationale:** Single retirement. *A named administrator and PM* → *Your single point of contact and a project manager* per `lexicon.md` §service vocabulary. From `examples-library.md` §13 (the seed-list rewrite for this exact line).

**Priority:** P0

---

### Change 9 — Otto chat section body

**Location:** `src/app/foundry/page.tsx:540–544`

**Current:**

> *(eyebrow)* OTTO
> *(heading)* Ask Otto anything.
> *(body)* Otto is your AI analyst, plugged into every business object in Blueprint. It reasons, cites, renders — and proposes the next action. Pick a prompt to see it run.

**Proposed:**

> *(eyebrow)* OTTO
> *(heading)* Ask Otto anything.
> *(body)* Otto is your AI analyst, plugged into every business object in Blueprint. Reasons, cites, renders — and proposes the next best action, scoped and reviewer-approved before it executes. Pick a prompt to see it run.

**Rationale:** Two swaps. (1) *It reasons* → *Reasons* — drops the third-person *it* (Otto is referred to as *Otto* directly; using *it* in the same sentence feels off-voice per `context-playbooks.md` §Otto persona — third-person *Otto* is the convention). (2) *Proposes the next action* → *proposes the next best action, scoped and reviewer-approved before it executes* — uses the locked phrase *next best action* (`lexicon.md` §service vocabulary) and adds the audit-and-reversibility framing required when claims about agent execution appear in marketing (`voice-and-tone.md` §pair automation claims with audit).

**Priority:** P1

---

### Change 10 — Agents (home feed) body

**Location:** `src/app/foundry/page.tsx:469–473`

**Current:**

> *(eyebrow)* AGENTS
> *(heading)* Your morning briefing. Automatically.
> *(body)* Foundry agents watch your systems overnight, process inbound work, run scheduled reports, and respond to events in seconds. By the time your team logs in, the Home Feed already has the answers.

**Proposed:**

> *(eyebrow)* AGENTS
> *(heading)* Your morning briefing. Automatically.
> *(body)* Foundry agents watch your systems continuously, process inbound work, run scheduled reports, and respond to events in seconds. By the time your team logs in, the Home Feed already has the answers — every action logged, every change reversible.

**Rationale:** Two swaps. (1) *Watch your systems overnight* → *watch your systems continuously* — the *overnight* cadence claim is retired (`lexicon.md` §AI clichés); *continuously* is more accurate to how Watcher agents actually behave (event-driven, not schedule-driven). (2) The closing sentence — adds the audit-and-reversibility tag to the agent claim per `voice-and-tone.md` §pair automation claims with audit. *Respond to events in seconds* survives — it's the locked Otto/agent receipt under `[VERIFY]` from Q42, which the founder approval defaults left in place.

**Priority:** P1

---

### Change 11 — Comparison-table body (ThoughtSpot mention)

**Location:** `src/app/foundry/page.tsx:603–606`

**Current:**

> No other platform in this category manages pipeline, warehouse, intelligence, agents, and action execution as a single service. ThoughtSpot costs $140,000/year and still requires a data engineering team to run it. Foundry starts at $2,500/month — fully managed by RevenuePoint.

**Proposed:**

> No other platform in this category manages pipeline, warehouse, intelligence, agents, and action execution as a single service. ThoughtSpot lists at $140,000 a year and still requires a data engineering team to run it. Foundry starts at $2,500 a month — fully managed by RevenuePoint.

**Rationale:** Light tightening for tone consistency. *Costs $140,000/year* → *lists at $140,000 a year* — *lists at* is more accurate for a public-pricing competitor reference (we're citing their published price, not what every customer pays); *a year* / *a month* is more conversational than the slash construction in this paragraph (`editorial-style.md` §numbers — *$140,000/year* survives in tabular contexts but reads tighter as *$140,000 a year* in body prose). No retired terms; this is a register polish only.

**Priority:** P2

---

### Change 12 — Demo CTA banner heading

**Location:** `src/app/foundry/page.tsx:651–658`

**Current:**

> *(eyebrow)* Schedule a working session
> *(heading)* Ready to see Foundry *in action*?
> *(body)* Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours.
> *(CTA)* Schedule a demo

**Proposed:**

> *(eyebrow)* Schedule a working session
> *(heading)* See Foundry connected to *systems like yours*.
> *(body)* Schedule a 30-minute demo. We'll show you Foundry connected to systems like the ones your business runs on, with sample data the buyer at your role would actually look at.
> *(CTA)* Schedule a 30-minute demo

**Rationale:** Three swaps. (1) *Ready to see Foundry in action?* — questions read uncertain in marketing headers (`messaging-framework.md` §headlines to avoid). Substitute the declarative *See Foundry connected to systems like yours* — leads with the verb, names the buyer's specific interest. (2) *Schedule a personalized demo* → *Schedule a 30-minute demo* — the locked Foundry CTA per `messaging-framework.md` §standard CTAs (the time commitment is the receipt that earns the click). (3) Body — adds *with sample data the buyer at your role would actually look at* — the operationally specific receipt that distinguishes a demo from a slide deck (`voice-and-tone.md` §1 operationally specific). CTA label aligns with the locked CTA table.

**Priority:** P1

---

## Out of scope, flagged

- **Engagement section heading H2 (Step 1–4 wording).** Steps 1–3 are on-voice (*Discover · Build · Launch* with the *No scope surprises* / *You provide context; we do the work* / *We walk through every capability live* claims). No change blocks for those.
- **Integration strip.** Lines 437–442 list 19 named systems plus the closing *"+ REST, GraphQL, SFTP, webhooks, and custom connectors for anything else."* — on-voice operationally specific, leaves intact.
- **Otto-on-marketing `[VERIFY]`.** *Otto answers in plain English* survives in the rewrite of Change 3 (hero) and Change 9 (Otto section). Confirm this matches Otto's typical in-portal output before the P0 PR ships.
