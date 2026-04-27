# npsp-middleware — `/npsp-middleware/`

> Source: `src/app/npsp-middleware/page.tsx` + `src/data/npspMiddleware.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The npsp-middleware page is the strongest specialty surface on the site — *Newsroom margins are thin. The code should not be the tax.* (line 247) is exactly the brand's *no-throat-clearing direct claim* mechanic per `voice-and-tone.md` §writing principles. The two-tier table, the locked CTAs (`View on GitHub` and `Schedule a walkthrough`), and the *Why we open-sourced it* block all land. Three concentrated retirements plus one terminology shift plus one new feature block: (1) *named RevenuePoint administrator* in the pricing card (line 218), (2) *named administrator who owns the donate-form experience end-to-end* in the *Why* block (line 256), one additional named-administrator retirement in the data file (`npspMiddleware.ts:200`), (3) **site-wide terminology shift: *donate form* → *donor-facing checkout*** (founder-locked 2026-04-26; 13 occurrences across `page.tsx`, `data/npspMiddleware.ts`, and `components/industries/NpspMiddlewareSection.tsx`), and (4) a new managed-tier AI capabilities block surfacing three light AI features the open-source tier doesn't ship. 7 change blocks — 5 P0, 1 P1, 1 new (AI capabilities).

---

## Changes

### Change 1 — Pricing card body

**Location:** `src/app/npsp-middleware/page.tsx:215–219`

**Current:**

> Includes hosting, 99.9% uptime SLA, Datadog observability, session replay, Stripe Smart Retries, the full premium integration stack, upgrades, security patching, and a named RevenuePoint administrator. Billed annually.

**Proposed:**

> Includes hosting, 99.9% uptime SLA, Datadog observability, session replay, Stripe Smart Retries, the full premium integration stack, upgrades, security patching, and your single point of contact at RevenuePoint. Billed annually.

**Rationale:** Single retirement. *A named RevenuePoint administrator* → *your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. The rest of the list is on-voice — operationally specific (`voice-and-tone.md` §1 — *Datadog observability · Stripe Smart Retries · session replay* are concrete tooling names that earn the technical-credibility receipt for a newsroom-engineer reader). *99.9% uptime SLA* survives — it's named here as the npsp-middleware managed-tier SLA, distinct from the brand-level *Foundry* uptime claim per `receipts.md` Q4 resolution.

**Priority:** P0

---

### Change 2 — `Why open source` body (named administrator + donor-facing checkout)

**Location:** `src/app/npsp-middleware/page.tsx:254–258`

**Current:**

> RevenuePoint charges for the operational lift: hosting, monitoring, premium integrations, dunning, and a named administrator who owns the donate-form experience end-to-end. You decide which side of that line you want to be on.

**Proposed:**

> RevenuePoint charges for the operational lift: hosting, monitoring, premium integrations, dunning, and your single point of contact who owns the donor-facing checkout end-to-end. You decide which side of that line you want to be on.

**Rationale:** Two retirements stack. (1) *A named administrator* → *your single point of contact* per `lexicon.md` §service vocabulary. (2) *Donate-form experience* → *donor-facing checkout* per the founder-locked terminology shift 2026-04-26 (added to `lexicon.md` §product vocabulary as a preferred term — *donor-facing checkout* names the actual surface, frames it like the e-commerce UX paradigm donors expect, and distinguishes it from the *member portal* and *events platform* sibling components). Hyphenated as a compound modifier per `editorial-style.md` §punctuation.

**Priority:** P0

---

### Change 3 — `npspMiddleware.ts` data file (managed-tier description)

**Location:** `src/data/npspMiddleware.ts:200`

**Current:**

> One tenant per newsroom. $6,000 covers hosting, operations, the full premium stack, upgrades, and a named RevenuePoint administrator. Multiple newsrooms under one parent organization are quoted as additional tenants.

**Proposed:**

> One tenant per newsroom. $6,000 covers hosting, operations, the full premium stack, upgrades, and your single point of contact at RevenuePoint. Multiple newsrooms under one parent organization are quoted as additional tenants.

**Rationale:** Same retirement as Change 1. *A named RevenuePoint administrator* → *your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. From the data file rendered into the *Two tiers. Same core. Different lift.* table on the rendered page. The pricing fact (*$6,000* — locked per `receipts.md`) and the multi-newsroom note (*quoted as additional tenants*) survive.

**Priority:** P0

---

### Change 4 — Hero subhead — light tightening + donor-facing checkout

**Location:** `src/app/npsp-middleware/page.tsx:67`

**Current:**

> A modern donate form, member portal, and events platform — syncing into NPSP. Host it yourself under AGPL-3.0. Or let RevenuePoint run it end-to-end with observability, dunning, and a managed premium stack.

**Proposed:**

> A donor-facing checkout, member portal, and events platform that syncs into Salesforce NPSP. Open source under AGPL-3.0 — host it yourself. Or fully managed by RevenuePoint, end-to-end, with observability, dunning, AI-suggested ask amounts, and the premium integration stack.

**Rationale:** Four swaps. (1) *A modern donate form* → *A donor-facing checkout* — drops the filler *modern* per `lexicon.md` §B2B clichés; cascades the founder-locked terminology shift (*donate form* → *donor-facing checkout*). (2) *Syncing into NPSP* → *that syncs into Salesforce NPSP* — *Salesforce NPSP* is more accurate for SEO and first-mention define-on-first-use protocol per `editorial-style.md` §acronyms protocol; *that syncs* present-tense matches the brand's preferred voice. (3) *Or let RevenuePoint run it end-to-end* → *Or fully managed by RevenuePoint, end-to-end* — leads with the locked phrase per `lexicon.md` §service vocabulary; drops the *let X run it* split-of-labor framing. (4) Adds *AI-suggested ask amounts* to the inclusion list — surfaces one of the three managed-tier AI capabilities (full block in Change 5 below) directly in the hero so the buyer sees the differentiator at the top.

**Priority:** P1

---

### Change 5 — Managed-tier AI capabilities (NEW — adds 3 points to comparison)

**Location:** `src/app/npsp-middleware/page.tsx` — extend `npspMatrix` data file (`src/data/npspMiddleware.ts`) with three new rows; appears in the existing two-tier comparison table at lines 150–173.

**Current:**

The `npspMatrix` data file currently lists features that compare across the open-source and managed tiers (hosting, uptime SLA, observability, premium integrations, etc.). It does not currently mention any AI capabilities.

**Proposed:**

Add three new rows to the matrix (managed-tier only — open-source column = `—` / dash; managed column = `✓` / check):

| Capability | Open source | Managed |
|---|---|---|
| AI-suggested ask amounts | — | ✓ |
| Recurring-donor retention (AI-timed retries + lapse prediction) | — | ✓ |
| Donor-segment outreach prompts | — | ✓ |

Plus a one-sentence callout in the *Managed tier · Premium stack* section (`page.tsx:181–200`):

> The managed tier ships an AI layer the open-source build does not — suggested ask amounts on the checkout, retry logic for failed recurring charges, and at-risk-donor flags surfaced to the newsroom. Every AI suggestion is logged, attributed, reversible, and only on reviewer approval.

**Rationale:** Founder-locked 2026-04-26. The biggest added benefit of the managed tier over open-source is the AI layer, and it is currently invisible on the comparison surface. Three light points distinguish managed from open-source: (1) **AI-suggested ask amounts** — donor-history-driven default amounts on the checkout, raises average gift size; (2) **Recurring-donor retention** — AI-timed retry logic on failed recurring charges + lapse prediction surfaced to the engagement reviewer (the *churn reduction* the founder named); (3) **Donor-segment outreach prompts** — AI-flagged donors at risk of lapse / ready to upgrade, surfaced to the newsroom on a managed cadence. Each pairs with the locked guardrails framing per `lexicon.md` §guardrails vocabulary — every AI suggestion is logged, attributed, reversible, and only on reviewer approval. Phrasing kept light per the founder's *nothing too heavy yet* note. The third point (*outreach prompts*) is the most newsroom-specific; if Phase 2 implementation finds the feature isn't yet shipping, swap to a generic *AI lapse-prediction reports* and re-flag.

**Priority:** P0 (founder-flagged as the biggest managed-tier differentiator)

---

### Change 6 — Site-wide terminology cascade — *donate form* → *donor-facing checkout*

**Location:** Multiple files — every occurrence of *donate form* / *donate-form* / *donate form experience* across:

- `src/app/npsp-middleware/page.tsx` lines 25 (meta), 67 (hero — covered in Change 4), 147, 188, 251, 256 (covered in Change 2), 275
- `src/data/npspMiddleware.ts` lines 45, 90, 94, 145, 195
- `src/components/industries/NpspMiddlewareSection.tsx` lines 34, 89, 124

**Current pattern:**

> *donate form* / *3-step donate form* / *donate-form session* / *donate-form element* / *donate-form experience* / *donate form itself*

**Proposed pattern:**

> *donor-facing checkout* (compound modifier hyphenated; bare noun *checkout* once the term is defined on a page) / *3-step donor-facing checkout* / *checkout session* / *checkout element* / *donor-facing checkout end-to-end* / *donor-facing checkout itself*

**Rationale:** Founder-locked terminology shift 2026-04-26. *Donor-facing checkout* names the actual surface — the donor-side e-commerce paradigm the buyer expects rather than the legacy *donate form* nonprofit-tech terminology. Hyphenated as a compound modifier per `editorial-style.md` §punctuation; bare *checkout* acceptable once the term is defined on a page (per `editorial-style.md` §acronyms protocol — *first-reference-define, subsequent-reference-bare*). Add to `tmp/voice-and-tone-system/lexicon.md` §product vocabulary as a preferred term in Phase 2 alongside the TSX cascade. Cascades to:

- Meta description (line 25): *A donate form, member portal, and events platform...* → *A donor-facing checkout, member portal, and events platform...*
- *Choose managed when donate-form uptime and premium integrations matter more than running infrastructure.* (line 147) → *Choose managed when donor-facing-checkout uptime and premium integrations matter more than running infrastructure.*
- *The middleware runs itself — but the operational lift of keeping a donate form up* (line 188) → *...the operational lift of keeping a donor-facing checkout up*
- *They should not also pay a license fee for the donate form itself.* (line 251) → *They should not also pay a license fee for the checkout itself.*
- *We walk the donate form, the member portal, the Salesforce sync* (line 275) → *We walk the donor-facing checkout, the member portal, the Salesforce sync*
- Data file: `3-step donate form` (lines 45, 145) → `3-step donor-facing checkout`; `donate-form session` / `donate-form element` (lines 90, 94) → `checkout session` / `checkout element` (bare *checkout* after first-reference-define on the page); `your donate form` (line 195) → `your donor-facing checkout`
- `NpspMiddlewareSection.tsx` body strings (lines 34, 89, 124) — same pattern: *donate form* → *donor-facing checkout*

**Priority:** P0 (founder-locked; ships with PR 1)

---

## Out of scope, flagged

- **`Newsroom margins are thin. The code should not be the tax.`** (line 247). On-voice. The brand's compressed direct-claim mechanic per `voice-and-tone.md` §writing principles. Protect.
- **Components showcase, baked-in features, integrations cards.** Lines 75–139 render data from `npspComponents`, `npspFeatures`, `npspIntegrations`. Inspected; copy is operationally specific per `voice-and-tone.md` §1 (no retired phrases beyond *donate form* covered in Change 6). Protect after the donor-facing-checkout cascade.
- **`npspFaq` block.** Inspected; FAQ register per `context-playbooks.md` §technical docs. The *donate form* mention in line 195 covered in Change 6.
- **CTA banner.** *Schedule a walkthrough →* — locked across the site for product walkthrough surfaces; no rewrite. Per `messaging-framework.md` §standard CTAs the locked nonprofit-managed CTA is *Schedule a newsroom consultation*; the *walkthrough* phrasing is acceptable as a synonym in the technical-product context but consider replacing in P1 polish if voice consistency wins out. Flag.
- **Two-tier matrix table** (lines 150–173). Renders from `npspMatrix` data; row labels are factual. Three new rows added in Change 5; everything else protect.
- **`What $6,000 per newsroom / year gets you` heading** (line 184). On-voice — names the receipt and the deliverable in one sentence. Protect.
