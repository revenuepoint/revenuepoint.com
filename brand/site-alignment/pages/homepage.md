# Homepage — `/`

> Source: `src/app/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The homepage works hardest in three places — the receipt block (`$950M+ · 300+ · 99.9%`), the *Implementation. Management. Intelligence.* three-beat, and the "we don't just stand software up" framing. It works least in the hero byline (wrong tagline — *Agentic Orchestration* should be *AI Orchestration*), the "White-glove service. Real accountability." section, the "Most firms implement and disappear" trust paragraph, and the four-pillar grid (every named/dedicated/vetted modifier needs to come out). Twelve discrete change blocks below — five P0, six P1, one P2.

---

## Changes

### Change 1 — Hero byline (company tagline)

**Location:** `src/app/page.tsx:15` — `<HeroSection byline="…">`

**Current:**

> CRM + ERP + Agentic Orchestration

**Proposed:**

> CRM + ERP + AI Orchestration

**Rationale:** The locked company tagline is *CRM + ERP + AI Orchestration* — the plus-syntax category claim from `brand-positioning.md` §company tagline. *Agentic Orchestration* drifts off the locked term and uses the lexicon's banned-as-noun *agentic* (`lexicon.md` §AI clichés). Capitalize *AI Orchestration* in this category-claim context per `editorial-style.md` §capitalization (capitalized as a brand-asset-shaped tagline; sentence case in running prose).

**Priority:** P0

---

### Change 2 — Hero h1

**Location:** `src/app/page.tsx:18` — `<HeroSection heading={…}>`

**Current:**

> Fully managed pipelines that turn *data into actions*.

**Proposed:**

> Fully managed pipelines that turn *data into action*.

**Rationale:** Founder-locked sentence form (preserves the existing structure and feel; the three-beat `Implementation. Management. *Intelligence*.` two beats below at line 108 carries the brand's three-beat mechanic for the page). Single swap: *actions* → *action* to align with `lexicon.md` §service vocabulary — *next best action* is the brand's locked phrasing (singular), and the singular reads tighter against the verb stack in the hero body below.

**Priority:** P0

---

### Change 3 — Hero body

**Location:** `src/app/page.tsx:21` — `<HeroSection body="…">`

**Current:**

> Report on, analyze, measure, audit, and act on data points from every system you run on — consolidated into one single source of truth.

**Proposed:**

> Report on, analyze, measure, audit, and act on data points from every system you run on — your single source of truth.

**Rationale:** Founder-locked. Two swaps: (1) *consolidated into one single source of truth* → *your single source of truth* — tightens the SSOT claim, drops *consolidated into one* (filler verb the buyer infers from the verb stack already). (2) The lexicon's required *fully managed by RevenuePoint* pairing for SSOT is satisfied **elsewhere on the page** — explicitly in the Foundry feature callout (line 268: *"Fully managed by RevenuePoint."*) and the Foundry service-card body (Change 7 below). The hero stays compressed; the pairing rule is honored at the page level rather than in every individual line per `lexicon.md` §product vocabulary intent. The five-verb stack (*Report on, analyze, measure, audit, act*) is on-voice — operationally specific per `voice-and-tone.md` §1; *every system you run on* matches the locked *systems your business runs on* phrasing.

**Priority:** P0

---

### Change 4 — Hero CTAs

**Location:** `src/app/page.tsx:22–26` — `ctas` array

**Current:**

> Explore Foundry · Explore Customer Relationship Management · Explore Enterprise Resource Management

**Proposed:**

> Schedule a 30-minute demo *(primary)* · Explore Foundry *(secondary)* · See the receipts *(secondary, anchors to the proof block)*

**Rationale:** Per `messaging-framework.md` §standard CTAs, one CTA per section is the rule; multiple CTAs dilute. *Schedule a 30-minute demo* is the locked CTA for Foundry (the flagship-newest-product) and works as the brand-level primary on the homepage hero. *Explore Customer Relationship Management* and *Explore Enterprise Resource Management* are long-form jargon labels — replace with one secondary that points to the proof or to Foundry, not three product-name expansions. CTA mechanics: verb-first, sentence case, 3–6 words, no "Explore" + jargon stack (`editorial-style.md` §CTAs).

**Priority:** P0

---

### Change 5 — Track-record body in the hero side panel

**Location:** `src/app/page.tsx:52–56`

**Current:**

> Our broad range of experience across CRM, ERP, accounting, data infrastructure, and AI allows us to connect systems to drive faster decisions and reduce manual reconciliation and busywork.

**Proposed:**

> A decade of implementing and managing the systems growing businesses run on — Salesforce, SAP, accounting platforms, data infrastructure, and the AI layer that connects them.

**Rationale:** *Broad range of experience* is filler (`lexicon.md` §B2B clichés — adjective-without-receipt). The proof block immediately below already names the receipts; the body line above it should anchor the *track record* eyebrow with operationally specific nouns (Salesforce, SAP, accounting platforms — `voice-and-tone.md` §1 operationally specific). *Drive faster decisions and reduce manual reconciliation and busywork* lands as a stack of generic outcomes — the receipts in the list make that point already.

**Priority:** P1

---

### Change 6 — Logo strip heading

**Location:** `src/app/page.tsx:81` — `<LogoStrip heading="…">`

**Current:**

> Trusted by leading organizations and nonprofits

**Proposed:**

> *(no change — founder-locked; keep as-is)*

**Rationale:** Founder review 2026-04-26 elected to keep the existing heading. The lexicon flags *leading* / *trusted* as filler-self-praise candidates, but the heading lands on this surface and the founder owns the final call. Listed here as a *protected* change block so Phase 2 implementation doesn't accidentally rewrite it.

**Priority:** *(no change — protected)*

---

### Change 7 — Foundry service card body

**Location:** `src/app/page.tsx:138–148` — first `<ServiceCard>` body

**Current:**

> Foundry connects every system you run — CRM, ERP, accounting, fulfillment, support, telephony — into one orchestrated warehouse. Live dashboards for every role. AI-written analysis delivered overnight. Otto, your AI analyst, answers in plain English. Named agents watch, decide, and execute across your stack — every action auditable, every change reversible.
>
> Fully managed by RevenuePoint. No data engineers required. No six-figure BI contract. Live in 6 weeks.

**Proposed:**

> Foundry connects every system you run — CRM, ERP, accounting, fulfillment, support, telephony — into your single source of truth, fully managed by RevenuePoint. Live dashboards for every role. AI analysis on demand. Otto, your AI analyst, answers in plain English. Agents watch, decide, and execute across your stack — every action logged, attributed, reversible, and only on reviewer approval.
>
> Fully managed by RevenuePoint. Foundry comes with the data team. Predictable monthly pricing. Two-week sprints, milestone-paced.

**Rationale:** Five swaps. (1) *Single source of truth* added with required *fully managed by RevenuePoint* pairing per `lexicon.md` §product vocabulary. (2) *Delivered overnight* → *on demand* per `lexicon.md` §AI clichés (overnight retired; on demand is the standard cadence). (3) *Named agents* → *Agents* — drop the modifier per `lexicon.md` §service-model clichés. (4) *Auditable / reversible* expanded to the full audit-trail pairing — *logged, attributed, reversible, and only on reviewer approval* — per `voice-and-tone.md` §pair automation claims with audit and reversibility. (5) The closing line drops three retirements: *No data engineers required* → *Foundry comes with the data team* (presence framing, `lexicon.md` §service-model clichés); *No six-figure BI contract* → *Predictable monthly pricing* (positive substitute for the negation); *Live in 6 weeks* → *Two-week sprints, milestone-paced* (the brand-level cadence claim per `lexicon.md` §outcome vocabulary; specific 4–8 weeks copy survives only on `/foundry/pricing/`).

**Priority:** P0

---

### Change 8 — Intelligence Reports service card

**Location:** `src/app/page.tsx:157–161`

**Current:**

> Intelligence Reports are bespoke research on any entity worth knowing about — public records, enrichment APIs, the open web — generated by AI, citation-backed, and reviewed by a named analyst. Best for due diligence, account research, and external context.

**Proposed:**

> Intelligence Reports are bespoke research on any entity worth knowing about — public records, enrichment APIs, the open web — generated by AI, citation-backed, and reviewed by a senior analyst. Best for due diligence, account research, and external context.

**Rationale:** Single retirement. *Named analyst* → *senior analyst* per `lexicon.md` §service-model clichés. The rest of the line is on-voice — *citation-backed* is in `lexicon.md` §guardrails vocabulary; the use-case enumeration is operationally specific (`voice-and-tone.md` §1).

**Priority:** P1

---

### Change 9 — SAP service card

**Location:** `src/app/page.tsx:181–184`

**Current:**

> SAP Business One for growing companies and S/4HANA for enterprise — implemented to your processes and managed by a dedicated team. No shared queues, no offshore handoffs.

**Proposed:**

> SAP Business One for growing companies and S/4HANA for enterprise — implemented to your processes and managed by your single point of contact, with a team that knows your operation. No shared queues.

**Rationale:** Two retirements. *Dedicated team* → *your single point of contact, with a team that knows your operation* — the locked phrase from `lexicon.md` §service vocabulary that replaces every *dedicated [role]* / *named [role]* construction. *No offshore handoffs* — geography banned in any direction (`lexicon.md` §service-model clichés); drop entirely. *No shared queues* survives — the only anti-establishment receipt that doesn't lean on geography.

**Priority:** P0

---

### Change 10 — Section header for the four pillars

**Location:** `src/app/page.tsx:209–217` — `<SectionHeader>` for "The model"

**Current:**

> White-glove service. *Real* accountability.

**Proposed:**

> Direct accountability. *Fully* managed.

**Rationale:** *White-glove* is hospitality language; banned (`lexicon.md` §service-model clichés). *Real accountability* implies a contrast against "fake" — but the brand's actual differentiator is **direct** accountability (the first of four locked promise pillars in `brand-positioning.md`). The substitute pairs the first pillar (*Direct accountability*) with the second (*Fully managed by RevenuePoint*) in a two-beat with italicized stress on *Fully* — same mechanic the rest of the homepage uses for headlines. The eyebrow *"The model"* survives unchanged.

**Priority:** P0

---

### Change 11 — Trust paragraph below the pillar header

**Location:** `src/app/page.tsx:218–220`

**Current:**

> Most firms implement software and disappear. We vet every client before signing — not to be exclusive, but because we only take engagements where we're confident we can deliver measurable ROI. Every client gets a named administrator and project manager. You call them directly.

**Proposed:**

> We don't just stand software up. We implement to your processes, manage the system as it evolves, and put your data to work across the business. We scope every engagement around real value — discovery happens before the contract, and the engagements we take on get the team's full attention because the scope is right and the path is clear. Every client gets a single point of contact, with a team that knows their business. You call them directly.

**Rationale:** The locked rewrite from `examples-library.md` §1 (the seed-list rewrite for this exact line). Three retirements stack: (1) *Most firms implement software and disappear* — banned competitor swipe (`lexicon.md` §service-model clichés); replace with what we DO. (2) *Vet every client* / *only take engagements where we're confident we can deliver measurable ROI* — retired transactional posture; substitute *we scope every engagement around real value* (`lexicon.md` §audit-and-accountability vocabulary; `examples-library.md` rationale). (3) *Named administrator and project manager* → *single point of contact, with a team that knows their business* (`lexicon.md` §service vocabulary). The closing *you call them directly* is the load-bearing line and survives intact.

**Priority:** P0

---

### Change 12 — Pillar i (Named administrator)

**Location:** `src/app/page.tsx:225–228`

**Current:**

> i — **Named administrator** — One dedicated admin for your instance. You know who to call.

**Proposed:**

> i — **Direct accountability** — Your single point of contact, with a team that knows your business. You call them directly.

**Rationale:** Both the title and the body retire. *Named administrator* → *Direct accountability* (the locked promise pillar from `brand-positioning.md` §promise pillars, reframes as the *what we promise* rather than the *who we name*). *One dedicated admin* → *Your single point of contact, with a team that knows your business* (`lexicon.md` §service vocabulary). *You know who to call* → *You call them directly* (the canonical phrasing from `lexicon.md`).

**Priority:** P0

---

### Change 13 — Pillar iii (Vetted engagements)

**Location:** `src/app/page.tsx:235–238`

**Current:**

> iii — **Vetted engagements** — We decline clients where we don't see a clear path to ROI. This keeps quality high for everyone.

**Proposed:**

> iii — **Scoped around real value** — Discovery happens before the contract. The engagements we take on get the team's full attention because the scope is right and the path is clear.

**Rationale:** Same retirement as Change 11. *Vetted* / *We decline clients where we don't see a clear path to ROI* — retired transactional language. Substitute *we scope every engagement around real value* per `lexicon.md` §audit-and-accountability vocabulary. The new title pillar names the brand's selectivity-as-commitment posture without the snark.

**Priority:** P1

---

### Change 14 — Pillar iv (Full-stack coverage) body

**Location:** `src/app/page.tsx:240–243`

**Current:**

> iv — **Full-stack coverage** — A vast understanding of business systems — CRM, ERP, accounting, data warehouses, and AI agents — and how every layer fits together.

**Proposed:**

> iv — **End-to-end across the stack** — One partner for CRM, ERP, accounting, data warehouses, and the AI layer that connects them. Five platforms, one partner, end-to-end.

**Rationale:** The pillar title aligns with the locked fourth promise pillar from `brand-positioning.md` (*End-to-end across the stack*). *Vast understanding of business systems* is filler-self-praise (`lexicon.md` §B2B clichés); substitute the receipts the brand actually uses — *one partner for [stack]* and *Five platforms, one partner, end-to-end* (which echoes the on-voice line at `page.tsx:113`). Note: the second sentence is a deliberate echo across the page; it earns its repeat by closing the pillar with the brand's compressed claim.

**Priority:** P1

---

### Change 15 — Foundry feature callout body

**Location:** `src/app/page.tsx:267–269` — dark exhibit panel body

**Current:**

> Your business runs on a CRM, an ERP, an accounting system, and a dozen spreadsheets. None of them talk to each other. Foundry connects all of it into a single clean warehouse, then delivers live dashboards, AI-generated analysis, and named agents that take action. Fully managed by RevenuePoint.

**Proposed:**

> Your business runs on a CRM, an ERP, an accounting system, and a dozen spreadsheets. None of them tell the same story. Foundry connects all of it into your single source of truth, fully managed by RevenuePoint, then delivers live dashboards, AI analysis on demand, and agents that propose, get approved, and execute — every action logged, attributed, and reversible.

**Rationale:** Four swaps. (1) *None of them talk to each other* → *None of them tell the same story* — the same setup, but more operationally specific (the buyer's actual pain is reconciliation, not communication). (2) *A single clean warehouse* → *your single source of truth, fully managed by RevenuePoint* (`lexicon.md` §product vocabulary — required pairing). (3) *AI-generated analysis* → *AI analysis on demand* (`lexicon.md` §AI clichés). (4) *Named agents that take action* → *agents that propose, get approved, and execute — every action logged, attributed, and reversible* (`voice-and-tone.md` §pair automation claims with audit; `lexicon.md` §audit-and-accountability vocabulary).

**Priority:** P0

---

### Change 16 — Connect/Illuminate/Act step descriptions

**Location:** `src/app/page.tsx:280–293`

**Current:**

> I — Connect — Every source system — CRM, ERP, accounting, billing, ticketing, ops tools — synced and reconciled overnight.
>
> II — Illuminate — Live dashboards, metric trees, AI-generated reports, and event-driven alerts built from your reconciled data.
>
> III — Act — Named agents that don't just observe — they execute approvals, post journal entries, alert the right people.

**Proposed:**

> I — Connect — Every source system — CRM, ERP, accounting, billing, ticketing, ops tools — synced and reconciled continuously.
>
> II — Illuminate — Live dashboards, metric trees, AI analysis on demand, and event-driven alerts built from your reconciled data.
>
> III — Act — Agents that don't just observe — they propose plans, route to a reviewer for approval, and execute scoped actions across your systems.

**Rationale:** Three swaps, one per beat. (1) *Synced and reconciled overnight* → *continuously* (specific cadence claim that matches the *Live* dashboards on the next beat; *overnight* retired per `lexicon.md` §AI clichés). (2) *AI-generated reports* → *AI analysis on demand* — same reason as elsewhere. (3) *Named agents that... execute approvals, post journal entries, alert the right people* → *Agents that... propose plans, route to a reviewer for approval, and execute scoped actions* — drops *named*, names the actual workflow (plan → reviewer → action) per `voice-and-tone.md` §pair automation claims; *scoped action* is the guardrails-vocabulary term per `lexicon.md` §guardrails vocabulary.

**Priority:** P0

---

### Change 17 — How-we-work header body

**Location:** `src/app/page.tsx:319–322` — `<SectionHeader body="…">`

**Current:**

> A repeatable four-step engagement model, our wide range of experience across enterprise platforms, and an agentic-assisted delivery process allow us to deliver results in as little as half the typical implementation timeline.

**Proposed:**

> A repeatable four-step engagement model, 60+ Salesforce certifications across every cloud you might run on, and an AI-assisted delivery process that compresses the work — not the testing — into half the typical implementation timeline.

**Rationale:** Two swaps. (1) *Wide range of experience across enterprise platforms* → *60+ Salesforce certifications across every cloud you might run on* — receipt for what was previously a naked adjective (`voice-and-tone.md` §earn every adjective with a proof point). (2) *Agentic-assisted* → *AI-assisted* — *agentic* as adjective is acceptable per `lexicon.md` only when the action is named; here the action *is* compression of timelines, so the qualifier *AI-assisted* + the clarifier *compresses the work — not the testing* makes the claim defensible.

**Priority:** P1

---

### Change 18 — Step 2 (Implementation) body

**Location:** `src/app/page.tsx:333–336`

**Current:**

> Certified admins configure and deploy to industry best practices, built around your actual processes.

**Proposed:**

> Certified admins configure and deploy to the published platform best practices for your industry — Salesforce CRM patterns, SAP MRP and posting-period rules, Foundry semantic-layer conventions — built around your actual processes.

**Rationale:** *Industry best practices* is filler unless paired with the specific practices (`lexicon.md` §other banned terms — "Best practices as a generic claim"). The substitute names three actual practice domains the team configures against, by platform — operationally specific per `voice-and-tone.md` §1.

**Priority:** P1

---

### Change 19 — Step 4 (Ongoing management) body

**Location:** `src/app/page.tsx:344–348`

**Current:**

> A named admin and PM manage your platform month-to-month. Regular audits, proactive recommendations, direct access.

**Proposed:**

> Your single point of contact and a project manager manage your platform month-to-month. Regular audits, proactive recommendations, direct access.

**Rationale:** Single retirement. *A named admin and PM* → *Your single point of contact and a project manager* per `lexicon.md` §service vocabulary. The body's claim block (*regular audits, proactive recommendations, direct access*) is on-voice and survives.

**Priority:** P0

---

### Change 20 — Lead-form section heading

**Location:** `src/app/page.tsx:359–366`

**Current:**

> Ready to find out if we're a *good fit*?
>
> *(body)* We review every submission personally and respond within one business day. Tell us about your business and what you're trying to solve.

**Proposed:**

> Schedule a 30-minute scoping call.
>
> *(body)* We review every submission personally and respond within one business day. Tell us what you're trying to solve, and we'll come back with a path forward — or tell you we're not the right partner for it.

**Rationale:** *Ready to find out if we're a good fit?* — questions read uncertain in marketing headers (`messaging-framework.md` §headlines to avoid — "Question, used carefully" — banned in marketing headers). The substitute leads with the verb-first CTA pattern (`messaging-framework.md` §standard CTAs — *Schedule a 30-minute scoping call* is the locked Salesforce-consulting CTA, and works at the brand level here since the homepage form covers all interest categories). Body second sentence — the original *Tell us about your business and what you're trying to solve* is fine; the rewrite tightens it and adds the brand's commitment-and-honesty signal (the locked posture from `lexicon.md` §audit-and-accountability vocabulary — *we scope every engagement around real value*, surfaced as a closing thought rather than a banned vet/decline claim).

**Priority:** P1

---

### Change 21 — `What we do` section eyebrow

**Location:** `src/app/page.tsx:122–131` — `<SectionHeader>` for the five-card grid

**Current:**

> *(eyebrow)* What we do
> *(heading)* Implementation, operations, intelligence — across *five lines*.
> *(body)* Implementation in weeks. Operations under a single engagement. No long-term contract. The same model on every line.

**Proposed:**

> *(eyebrow)* What we do
> *(heading)* Implementation, operations, intelligence — across *five lines*.
> *(body)* Two-week sprints to ship the work. Operations under a single engagement. No long-term contract. The same model on every line.

**Rationale:** Single swap. *Implementation in weeks* → *Two-week sprints to ship the work* — the locked cadence claim from `lexicon.md` §outcome vocabulary. *In weeks* is closer to the retired *Live in 6 weeks* universal-timeline framing; *two-week sprints* is the brand-level cadence that holds across every engagement. The rest of the section is on-voice and survives.

**Priority:** P2

---

## Out of scope, flagged

- **Hero CTA primary destination logic.** Change 4 lands *Schedule a 30-minute demo* as the primary CTA, which routes to the lead form. Confirm the Calendar / form / `/foundry/` destination is right before the P0 PR ships — if Foundry isn't ready to demo today, the secondary CTA stays *Explore Foundry* and the primary changes to *Schedule a scoping call*.
- **Stat scope footnote.** Change 5–6 surface the proof block; the *99.9% Platform Uptime SLA* line already lives there. `[VERIFY]` from Q4: confirm Foundry-only scope before the P0 PR ships.
