# Salesforce implementations — `/salesforce/implementations/`

> Source: `src/app/salesforce/implementations/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The page reads tightly — *A working CRM your team uses on day one* (hero), *fixed-fee, time-boxed, delivered against a documented scope*, the six-phase implementation breakdown, and the *Six phases. Documented scope. No surprises at go-live.* heading all land. Three concentrated wobbles: (1) the *Managed Administration* card body uses *dedicated* twice (lines 359, 362), (2) the Foundry teaser body says *overnight AI reports*, (3) the Foundry-pillar block has the same *overnight* pattern. The hero CTA *Scope an implementation* drifts from the locked CTA (`Schedule a Salesforce scoping call`) but reads more action-specific for an implementations-page surface — recommend keeping with light tweak. 5 change blocks — 3 P0, 2 P1.

---

## Changes

### Change 1 — Managed Administration card title + body

**Location:** `src/app/salesforce/implementations/page.tsx:354–365`

**Current:**

> *(eyebrow)* Managed Administration
> *(heading)* Ongoing admin, dedicated team, no long-term contract.
> *(body)* A dedicated Salesforce administrator and project manager running your org — audits, automations, data hygiene, training, and third-party integration support. Sales Cloud Administration from $2,400/month; Full Stack from $4,000/month.

**Proposed:**

> *(eyebrow)* Managed Administration
> *(heading)* Ongoing admin, your single point of contact, no long-term contract.
> *(body)* Your single point of contact at RevenuePoint and a project manager running your org — audits, automations, data hygiene, training, and third-party integration support. Sales Cloud Administration from $2,400/month; Full Stack from $4,000/month.

**Rationale:** Two retirements stack. (1) Heading *dedicated team* → *your single point of contact* per `lexicon.md` §service-model clichés. (2) Body *A dedicated Salesforce administrator and project manager* → *Your single point of contact at RevenuePoint and a project manager* per `lexicon.md` §service vocabulary. From `examples-library.md` §11 (the seed-list rewrite for line 359). Pricing receipts (*$2,400/month* / *$4,000/month*) survive intact — locked per `receipts.md`.

**Priority:** P0

---

### Change 2 — Foundry teaser body

**Location:** `src/app/salesforce/implementations/page.tsx:387–392`

**Current:**

> A good implementation gives you a clean foundation. Foundry is what comes next — connecting the rest of your stack (ERP, accounting, telephony, marketing), delivering live dashboards and overnight AI reports, and running agents that take action across every system. Fully managed by RevenuePoint.

**Proposed:**

> A good implementation gives you a clean foundation. Foundry is what comes next — connecting the rest of your stack (ERP, accounting, telephony, marketing) into your single source of truth, fully managed by RevenuePoint, and delivering live dashboards, AI analysis on demand, and agents that propose, get approved, and execute across your systems.

**Rationale:** Three swaps. (1) *Connecting the rest of your stack ... and delivering live dashboards and overnight AI reports* → *connecting the rest of your stack ... into your single source of truth, fully managed by RevenuePoint, and delivering live dashboards, AI analysis on demand* — adds the locked SSOT pairing (`lexicon.md` §product vocabulary), drops *overnight* (`lexicon.md` §AI clichés). (2) *And running agents that take action across every system* → *and agents that propose, get approved, and execute across your systems* — names the actual plan-and-action workflow per `lexicon.md` §audit-and-accountability vocabulary. (3) Tighter sentence cadence — same length, less filler.

**Priority:** P1

---

### Change 3 — Foundry-pillar block (Illuminate + Act)

**Location:** `src/app/salesforce/implementations/page.tsx:144–152` — `foundryPillars[1]` and `foundryPillars[2]`

**Current:**

> *(02 · Illuminate)* Live dashboards. Overnight AI analysis. — Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.
> *(03 · Act)* Agents watch, decide, and execute. — Agents and Otto take action across Salesforce and the rest of your stack — fully auditable, fully managed.

**Proposed:**

> *(02 · Illuminate)* Live dashboards. AI analysis on demand. — Lens dashboards for every role and Prism reports on demand — leadership gets the answers when they ask, not on a schedule the warehouse decides.
> *(03 · Act)* Agents propose. Reviewers approve. Foundry executes. — Agents and Otto propose plans across Salesforce and the rest of your stack — every action logged, attributed, reversible, and only on reviewer approval. Fully managed by RevenuePoint.

**Rationale:** Same as `pages/salesforce.md` Changes 3–4, `pages/sap.md` Change 9, `pages/salesforce-managed-services.md` Change 6. The Foundry-pillar block appears identically across product pages; the rewrite is the same on each surface. Voice consistency wins.

**Priority:** P1

---

### Change 4 — Hero primary CTA — light alignment

**Location:** `src/app/salesforce/implementations/page.tsx:167–170`

**Current:**

> *(primary)* Scope an implementation · *(secondary)* See typical pricing

**Proposed:**

> *(primary)* Schedule a Salesforce scoping call · *(secondary)* See typical pricing

**Rationale:** *Scope an implementation* is a more specific action than the locked Salesforce-consulting CTA but breaks the across-site CTA convergence — a buyer reading the SF hub, the implementations page, and the managed-services page sees three different "Schedule a..." labels for what is effectively the same first conversation. The locked CTA per `messaging-framework.md` §standard CTAs is *Schedule a Salesforce scoping call* — verb-first, names the actual next step. *Scope an implementation* could survive on the pricing tier CTAs (Standard, Growth, Enterprise) where the buyer is past the discovery question and ready to scope a specific build.

**Priority:** P0

---

### Change 5 — Pricing-tier CTAs (already locked-style)

**Location:** `src/app/salesforce/implementations/page.tsx:238, 247, 254`

**Current:**

> Standard: `cta={{ label: 'Scope a Standard build', href: '#lead-form' }}`
> Growth: `cta={{ label: 'Scope a Growth build', href: '#lead-form' }}`
> Enterprise: `cta={{ label: 'Talk to us', href: '#lead-form' }}`

**Proposed:**

> Standard: `cta={{ label: 'Scope a Standard build', href: '#lead-form' }}` *(unchanged — on-voice)*
> Growth: `cta={{ label: 'Scope a Growth build', href: '#lead-form' }}` *(unchanged — on-voice)*
> Enterprise: `cta={{ label: 'Schedule an Enterprise scoping call', href: '#lead-form' }}`

**Rationale:** Single retirement on the third CTA. *Talk to us* — banned generic CTA per `messaging-framework.md` §banned CTAs (synonymous to *Contact us*). The first two CTAs (*Scope a Standard build* / *Scope a Growth build*) are on-voice — verb-first, name the specific tier the buyer is signing up to. The Enterprise tier deserves the same pattern: *Schedule an Enterprise scoping call* — names the specific next conversation, not a generic *Talk*. Note: this is the one place on the site where *Scope a [tier]* survives — it's tier-specific and post-discovery; the implementations-page hero CTA in Change 4 above moves to *Schedule a Salesforce scoping call* because the hero buyer hasn't yet picked a tier.

**Priority:** P1

---

## Out of scope, flagged

- **Hero body, sidenote, engagement types, six-phase steps.** Lines 158–179, 19–32, 34–71. All on-voice — fixed-fee/time-boxed/documented-scope claims, the six-phase breakdown is operationally specific, the engagement-type cards each name a specific buyer situation. Protect.
- **FAQ block.** Lines 104–135. Six FAQ answers; on-voice; no retired phrases. Protect.
- **Industries grid.** Lines 264–306. Renders the same `industryPageList` data as the SF hub; per-industry copy is in scope under `solutions-industries.md`, not here.
- **Pricing-tier features.** Lines 73–102 (`standardFeatures`, `growthFeatures`, `enterpriseFeatures`). Each list is operationally specific (Sales Cloud objects, integrations, FUAT cycles, hypercare, etc.). Protect.
