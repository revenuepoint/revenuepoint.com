# Solutions hub + 10 industries — `/solutions/` and `/solutions/[industry]/`

> **Consolidated file** covering the hub and all 10 industry pages. The 10 industry routes delegate to the shared `<IndustryPage>` component which renders data from `src/data/industries/[industry].ts`. The vast majority of per-industry voice work is a systematic *mid-market* → *growing-business* sweep across the data files (16+ instances). Plus the hub copy, the `PackagingTiers` shared component, and four industry-specific data-file rewrites.
>
> Source: `src/app/solutions/page.tsx` · `src/app/solutions/[industry]/page.tsx` (10 routes) · `src/data/industries/*.ts` (10 industry data files + `_shared.ts` + `index.ts`) · `src/components/industries/{IndustryPage,PackagingTiers}.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The industry pages are the most data-driven set on the site — every route is `<IndustryPage content={industry-data}>`, so all per-industry copy lives in `src/data/industries/[industry].ts`. The audit produced two structural findings: (1) the solutions hub uses *named integrations* (banned in the same way as *named [role]*); (2) the *mid-market* term recurs 16+ times across 8 of 10 industry data files (in painKpis labels, hero subs, proofCard problems, and one FAQ answer). These are systematic — one substitute, one regex sweep. Plus the `PackagingTiers` shared component (rendered on every industry page) uses *one named administrator* in its body — the locked rewrite is *Your single point of contact*. 13 change blocks total — most of them straight substitutions.

---

## A. Solutions hub — `/solutions/`

### Change 1 — Meta description

**Location:** `src/app/solutions/page.tsx:8–11`

**Current:**

> Clean Salesforce environments for ten industries. A clean Lightning record page, named integrations, and fully managed by RevenuePoint.

**Proposed:**

> Clean Salesforce environments for ten industries — a clean Lightning record page, the integrations to the systems you already run on, and fully managed by RevenuePoint.

**Rationale:** Single retirement. *Named integrations* → *the integrations to the systems you already run on* — *named* as a modifier on *integrations* maps onto the same retired pattern as *named [role]* (`lexicon.md` §service-model clichés). The substitute is operationally specific (`voice-and-tone.md` §1) — names what the integrations do (connect to existing systems) instead of asserting they have names.

**Priority:** P0

---

### Change 2 — Hero body

**Location:** `src/app/solutions/page.tsx:16–21`

**Current:**

> *(heading)* Clean Salesforce. Ten industries. One record.
> *(body)* We build Lightning record pages that work the way each industry actually runs — with the right custom components, named integrations to the systems you already use, and fully managed by RevenuePoint.

**Proposed:**

> *(heading)* Clean Salesforce. Ten industries. One record.
> *(body)* We build Lightning record pages that work the way each industry actually runs — with the right custom components, the integrations to the systems you already run on, and fully managed by RevenuePoint.

**Rationale:** Same retirement as Change 1. *Named integrations* → *the integrations* per `lexicon.md` §service-model clichés. *Already use* → *already run on* — light tightening; *run on* matches the brand's verb-of-art for the buyer-system relationship (`lexicon.md` §service vocabulary — *the systems growing businesses run on* is the locked phrasing). Heading survives unchanged (already on-voice).

**Priority:** P0

---

## B. `PackagingTiers` shared component — used by every industry page

### Change 3 — Tier-summary body

**Location:** `src/components/industries/PackagingTiers.tsx:20–22`

**Current:**

> Flat monthly pricing. One named administrator. We keep the instance clean as your business changes.

**Proposed:**

> Flat monthly pricing. Your single point of contact at RevenuePoint. We keep the instance clean as your business changes.

**Rationale:** Single retirement. *One named administrator* → *Your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. This component renders on every industry page (10 surfaces) — the single fix here cascades across the whole solutions section.

**Priority:** P0

---

### Change 4 — Tier card CTA

**Location:** `src/components/industries/PackagingTiers.tsx:60–63`

**Current:**

> Book a working session →

**Proposed:**

> Schedule a Salesforce scoping call

**Rationale:** *Book a working session* is acceptable but breaks across-site CTA convergence. The locked Salesforce-consulting CTA per `messaging-framework.md` §standard CTAs is *Schedule a Salesforce scoping call*. Same destination (the contact form with industry interest pre-filled), so the labels can converge across the solutions surfaces.

**Priority:** P1

---

## C. Systematic *mid-market* sweep across industry data files

### Change 5 — `manufacturing.ts` (3 instances)

**Location:** `src/data/industries/manufacturing.ts:14, 19, 319`

**Current:**

- Line 14 (hero sub): *RevenuePoint builds a clean Salesforce instance for **mid-market** discrete and process manufacturers...*
- Line 19 (painKpi label): *of **mid-market** manufacturers reconcile ERP shipments against CRM forecasts in spreadsheets every month.*
- Line 319 (proofCard problem): *Three in four **mid-market** manufacturers still reconcile ERP shipments against CRM forecasts in spreadsheets every month...*

**Proposed:**

Replace *mid-market* → *growing-business* in all three locations. Final lines:

- Line 14: *RevenuePoint builds a clean Salesforce instance for growing-business discrete and process manufacturers...*
- Line 19: *of growing-business manufacturers reconcile ERP shipments against CRM forecasts in spreadsheets every month.*
- Line 319: *Three in four growing-business manufacturers still reconcile ERP shipments against CRM forecasts in spreadsheets every month...*

**Rationale:** Single systematic retirement per `lexicon.md` §audience-segment language. Substitute is the locked alternate phrasing.

**Priority:** P0

---

### Change 6 — `distribution.ts` (4 instances)

**Location:** `src/data/industries/distribution.ts:10, 29, 293, 302`

**Current:**

- Line 10 (meta): *Clean Salesforce for **mid-market** distributors and 3PLs...*
- Line 29 (painKpi label): *average DSO at **mid-market** distributors — two weeks beyond terms.*
- Line 293 (proofCard problem): *Three to five percent of annual revenue at **mid-market** distributors leaks through backorder...*
- Line 302 (FAQ answer): *Yes. SAP B1 is one of the paths we run most often in **mid-market** distribution...*

**Proposed:**

Replace *mid-market* → *growing-business* in all four locations.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 7 — `professionalServices.ts` (1 instance)

**Location:** `src/data/industries/professionalServices.ts:29`

**Current:**

> Line 29 (painKpi label): *average days-to-bill at **mid-market** firms — a month of WIP on the books.*

**Proposed:**

> Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 8 — `construction.ts` (2 instances)

**Location:** `src/data/industries/construction.ts:19, 292`

**Current:**

- Line 19 (painKpi label): *of project revenue sits in unbilled change orders on **mid-market** builds.*
- Line 292 (proofCard problem): *Three to seven percent of project revenue at **mid-market** builders sits in unbilled change orders...*

**Proposed:**

Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 9 — `foodBeverage.ts` (2 instances)

**Location:** `src/data/industries/foodBeverage.ts:19, 292`

**Current:**

- Line 19 (painKpi label): *of **mid-market** CPG brands cannot attribute trade lift to a specific promotion.*
- Line 292 (proofCard problem): *Two-thirds of **mid-market** CPG brands cannot attribute trade lift to a specific promotion. Trade spend — the second-biggest line on the P&L — gets approved on feel, not measured on outcome.*

**Proposed:**

Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 10 — `financialServices.ts` (1 instance)

**Location:** `src/data/industries/financialServices.ts:29`

**Current:**

> Line 29 (painKpi label): *of policies lapse preventably at **mid-market** P&C agencies.*

**Proposed:**

> Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 11 — `propertyManagement.ts` (3 instances)

**Location:** `src/data/industries/propertyManagement.ts:24, 186, 292`

**Current:**

- Line 24 (painKpi label): *typical renewal visibility at **mid-market** PMs — too late to save the lease.*
- Line 186 (integration role): *AppFolio · PM platform · Ledger + work-order feeds for **mid-market** PMs.*
- Line 292 (proofCard problem): *About 22% of resident turnover at **mid-market** PMs could be prevented with earlier renewal visibility...*

**Proposed:**

Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

### Change 12 — `healthcare.ts` (1 instance)

**Location:** `src/data/industries/healthcare.ts:24`

**Current:**

> Line 24 (painKpi label): *average first-pass claim denial rate at **mid-market** groups.*

**Proposed:**

> Replace *mid-market* → *growing-business*.

**Rationale:** Same retirement.

**Priority:** P0

---

## D. Industry-specific data-file polish

### Change 13 — `manufacturing.ts` Foundry FAQ — *named team*

**Location:** `src/data/industries/manufacturing.ts:340–344`

**Current:**

> *(question)* Can Foundry sit on top of this?
> *(answer)* Yes. Foundry reads the same SAP and Salesforce data that powers the record page, then delivers live dashboards, AI analysis, and agents that execute back into both systems. Foundry is fully managed by RevenuePoint — the same named team that runs your Salesforce.

**Proposed:**

> *(question)* Can Foundry sit on top of this?
> *(answer)* Yes. Foundry reads the same SAP and Salesforce data that powers the record page, then delivers live dashboards, AI analysis on demand, and agents that propose, get approved, and execute across both systems. Foundry is fully managed by RevenuePoint — the same RevenuePoint team that runs your Salesforce.

**Rationale:** Three swaps. (1) *AI analysis* → *AI analysis on demand* — overnight cadence retirement consistent with all other surfaces (`lexicon.md` §AI clichés). (2) *Agents that execute back into both systems* → *agents that propose, get approved, and execute across both systems* — locked plan-and-action vocabulary per `lexicon.md` §audit-and-accountability vocabulary. (3) *The same named team* → *the same RevenuePoint team* — *named team* is the retired construction (`lexicon.md` §service-model clichés); the substitute names the firm without leaning on the *named* modifier.

**Priority:** P0

---

### Change 14 — `NpspMiddlewareSection.tsx` — *donate form* → *donor-facing checkout*

**Location:** `src/components/industries/NpspMiddlewareSection.tsx:34, 89, 124`

**Current** (3 lines):

- Line 34: *donate form, member portal, and events platform — syncing directly into Salesforce*
- Line 89: *donate form, member portal, events, and Salesforce sync. No license fees. No*
- Line 124: *open-source version does not ship. Built for newsrooms who need their donate form*

**Proposed:**

- Line 34: *donor-facing checkout, member portal, and events platform — syncing directly into Salesforce*
- Line 89: *donor-facing checkout, member portal, events, and Salesforce sync. No license fees. No*
- Line 124: *open-source version does not ship. Built for newsrooms who need their donor-facing checkout*

**Rationale:** Cascades the founder-locked *donate form* → *donor-facing checkout* terminology shift (2026-04-26) into the shared component used by `IndustryPage` for the nonprofit industry surface. Hyphenated compound modifier per `editorial-style.md` §punctuation. Same swap as `pages/npsp-middleware.md` Change 6 — applied here for the industry-page rendering of the same component.

**Priority:** P0

---

## Out of scope, flagged

- **`pharmacy.ts` and `nonprofit.ts`.** Not flagged in the regex pass; inspected at a high level — no *mid-market* / *named [role]* / *dedicated [role]* / *white-glove* hits. Each industry data file should still get a P2 spot-check during Phase 2 implementation; if any retired phrases surface, add change blocks for them under the appropriate industry section.
- **PainKpi numerical sources.** Each industry's painKpis cite sources (e.g. *Mfg Cloud benchmark*, *Service Cloud audit data*, *Client time studies*, *RevenuePoint client discovery, 2024–26*). On-voice — operationally specific receipts per `voice-and-tone.md` §confident-with-receipts. Protect.
- **Use-case structure.** The three-part *pain → flow → outcome* structure across each industry's `useCases` array is a well-shaped pattern. On-voice — names a real problem, lists the actual workflow, gives the outcome. Protect.
- **Data-model `objects` arrays.** Standard / custom object lists per industry. Operationally specific (`voice-and-tone.md` §1) — names the actual Salesforce objects. Protect.
- **Integration `systems` arrays.** Each industry's integrations array names specific systems (SAP S/4HANA, NetSuite, MES, 8x8, DocuSign, Stripe, Pardot, AppFolio, etc.) with their roles. On-voice. Protect.
- **`recordPage.components`.** Per-industry Lightning component definitions with mocked data. Operationally specific. Protect.
- **`IndustryPage` component itself.** Renders all the data; no inline copy beyond what's in the data files. Inspected; no rewrites needed.
