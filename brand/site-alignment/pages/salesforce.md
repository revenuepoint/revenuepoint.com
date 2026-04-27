# Salesforce — `/salesforce/`

> Source: `src/app/salesforce/page.tsx` + `src/data/salesforceConsulting.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The Salesforce hub is closer to on-voice than most pages — the *Certified Salesforce consulting. Across every cloud, across every industry.* hero, the *60+ certifications · Sales · Service · CPQ · Marketing · Experience · NPSP* sidenote, and the *Tell us about your Salesforce project* form-section heading all land. Three concentrated wobbles: (1) the locked CTA mismatch (*Schedule a call* should be *Schedule a Salesforce scoping call*), (2) the Foundry-pillar block (*Live dashboards. Overnight AI analysis.* — *overnight* retired), (3) the ServiceCard fallback CTA in the activities grid (*Get started*). Plus three retirements in the sourced data file (`salesforceConsulting.ts` — *named RevenuePoint administrator* x2). 8 change blocks — 4 P0, 4 P1.

---

## Changes

### Change 1 — Hero primary CTA

**Location:** `src/app/salesforce/page.tsx:48–51` — `ctas` array

**Current:**

> *(primary)* Schedule a call · *(secondary)* See pricing

**Proposed:**

> *(primary)* Schedule a Salesforce scoping call · *(secondary)* See managed-services pricing

**Rationale:** *Schedule a call* drifts from the locked CTA per `messaging-framework.md` §standard CTAs — the canonical Salesforce-consulting CTA is *Schedule a Salesforce scoping call*. *See pricing* on a hub page that has both implementations and managed-services pricing reads ambiguous; *See managed-services pricing* names the exact destination.

**Priority:** P0

---

### Change 2 — Activities grid fallback CTA

**Location:** `src/app/salesforce/page.tsx:69` — `<ServiceCard cta={activity.cta ?? {…}}>`

**Current:**

> `cta={activity.cta ?? { label: 'Get started', href: '#lead-form' }}`

**Proposed:**

> `cta={activity.cta ?? { label: 'Schedule a Salesforce scoping call', href: '#lead-form' }}`

**Rationale:** *Get started* is on the banned-CTA list per `messaging-framework.md` §banned CTAs ("In what?"). Substitute the locked Salesforce CTA so any data-file activity that doesn't define its own CTA falls back to the brand-canonical phrasing.

**Priority:** P0

---

### Change 3 — Foundry pillar 2 (Illuminate)

**Location:** `src/app/salesforce/page.tsx:25–29` — `foundryPillars[1]`

**Current:**

> *(eyebrow)* 02 · Illuminate
> *(headline)* Live dashboards. Overnight AI analysis.
> *(body)* Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.

**Proposed:**

> *(eyebrow)* 02 · Illuminate
> *(headline)* Live dashboards. AI analysis on demand.
> *(body)* Lens dashboards for every role and Prism reports on demand — leadership gets the answers when they ask, not on a schedule the warehouse decides.

**Rationale:** Two swaps. (1) *Overnight AI analysis* / *reports written overnight* → *AI analysis on demand* / *Prism reports on demand* — *overnight* retired (`lexicon.md` §AI clichés). (2) *So leadership has answers by 8 AM* → *leadership gets the answers when they ask, not on a schedule the warehouse decides* — the *8 AM* implication created a fixed-delivery promise; the substitute names the actual on-demand behavior.

**Priority:** P0

---

### Change 4 — Foundry pillar 3 (Act)

**Location:** `src/app/salesforce/page.tsx:30–34` — `foundryPillars[2]`

**Current:**

> *(eyebrow)* 03 · Act
> *(headline)* Agents watch, decide, and execute.
> *(body)* Agents and Otto take action across Salesforce and the rest of your stack — fully auditable, fully managed.

**Proposed:**

> *(eyebrow)* 03 · Act
> *(headline)* Agents propose. Reviewers approve. Foundry executes.
> *(body)* Agents and Otto propose plans across Salesforce and the rest of your stack — every action logged, attributed, reversible, and only on reviewer approval. Fully managed by RevenuePoint.

**Rationale:** The locked plan-and-action vocabulary from `lexicon.md` §audit-and-accountability vocabulary. *Agents watch, decide, and execute* compresses three steps the brand actually splits — propose / review / execute — and skips the audit framing that makes the claim land for risk-aware buyers (`voice-and-tone.md` §pair automation claims with audit). The headline becomes a three-beat with the action-loop named explicitly.

**Priority:** P1

---

### Change 5 — Foundry teaser body

**Location:** `src/app/salesforce/page.tsx:144–146`

**Current:**

> Once your Salesforce is clean, Foundry connects the rest of your stack — ERP, accounting, telephony, marketing — and delivers live dashboards, AI reports, and agents that take action. Fully managed by RevenuePoint.

**Proposed:**

> Once your Salesforce is clean, Foundry connects the rest of your stack — ERP, accounting, telephony, marketing — into your single source of truth, fully managed by RevenuePoint. Live dashboards. AI analysis on demand. Agents that propose, get approved, and execute across your systems.

**Rationale:** Three swaps. (1) Adds *single source of truth* with the locked *fully managed by RevenuePoint* pairing (`lexicon.md` §product vocabulary). (2) *AI reports* → *AI analysis on demand* (`lexicon.md` §AI clichés). (3) *Agents that take action* → *Agents that propose, get approved, and execute* — the locked plan-and-action workflow (`voice-and-tone.md` §pair automation claims with audit; `lexicon.md` §audit-and-accountability vocabulary). The opening conditional (*Once your Salesforce is clean*) survives — it's the page-internal logic that earns the Foundry pivot.

**Priority:** P1

---

### Change 6 — `salesforceConsulting.ts` activity body (managed admin)

**Location:** `src/data/salesforceConsulting.ts:26`

**Current:**

> A named RevenuePoint administrator keeps your instance clean, evolving, and audited month to month. Fully managed by RevenuePoint.

**Proposed:**

> Your single point of contact at RevenuePoint keeps your instance clean, evolving, and audited month to month. Fully managed by RevenuePoint.

**Rationale:** Single retirement. *A named RevenuePoint administrator* → *Your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. The rest is on-voice — *clean, evolving, audited* is the locked three-beat for ongoing managed admin (matches `messaging-framework.md` §value-prop architecture).

**Priority:** P0

---

### Change 7 — `salesforceConsulting.ts` longer activity description (drift)

**Location:** `src/data/salesforceConsulting.ts:119`

**Current:**

> Most organizations implement Salesforce correctly and then let it drift. A named RevenuePoint administrator prevents that. We audit, optimize, and evolve your instance month to month. Fully managed by RevenuePoint.

**Proposed:**

> Most organizations implement Salesforce correctly and then let it drift. Fully managed by RevenuePoint prevents that — your single point of contact and a project manager audit, optimize, and evolve your instance month to month, with a team that knows your org behind them.

**Rationale:** Same retirement plus structural rewrite. *A named RevenuePoint administrator prevents that* → *Fully managed by RevenuePoint prevents that — your single point of contact and a project manager audit, optimize, and evolve...* — moves the brand-promise pillar (`Fully managed by RevenuePoint`) into the prevention claim, then names the operating model (`single point of contact + PM + team that knows your org`) as the proof. Three retirements lands in one rewrite (`named` modifier dropped, brand-promise surfaced explicitly, team-continuity claim added).

**Priority:** P1

---

### Change 8 — Industries section heading

**Location:** `src/app/salesforce/page.tsx:91–94`

**Current:**

> *(eyebrow)* Industries we know
> *(heading)* Ten industries. Ten clean record pages.
> *(body)* Salesforce looks different in a specialty pharmacy than it does in a distributor or a nonprofit. We build Lightning record pages that work the way your industry actually runs.

**Proposed:**

> *(eyebrow)* Industries we configure to
> *(heading)* Ten industries. *Ten Lightning record pages*.
> *(body)* Salesforce looks different in a specialty pharmacy than it does in a distributor or a nonprofit. We build Lightning record pages — the right custom components, named integrations to the systems you already use, and the layout the user actually needs — for the way your industry runs.

**Rationale:** Three swaps. (1) Eyebrow *Industries we know* → *Industries we configure to* — the verb *know* is filler-self-praise; *configure to* names the actual work and matches `voice-and-tone.md` §1 operationally specific. (2) Heading adds italicized noun (*Ten Lightning record pages* with italics) — the page already uses italicized-noun mechanics; this section misses it. (3) Body adds the operational specificity (*the right custom components, named integrations, the layout the user actually needs*) per `voice-and-tone.md` §1 operationally specific.

**Priority:** P1

---

## Out of scope, flagged

- **`SalesforceProductPicker` interactive picker.** The picker pulls from `consultingProducts` (data file). Component-level CTA is *Get started* (`src/components/salesforce/SalesforceProductPicker.tsx:103`) — included as a microcopy-level fix in [`microcopy.md`](../microcopy.md) and the `MICRO-CTA-*` IDs in the implementation checklist; not a per-page change here.
- **Industries grid card body.** Lines 111–119 render `industry.hero.sub` from data files (`src/data/industries/*.ts`); per-industry copy is in scope under the P1 wave's `solutions-[industry].md` files, not here.
