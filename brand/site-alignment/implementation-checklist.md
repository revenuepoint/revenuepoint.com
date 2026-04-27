# Implementation checklist

> Flat sortable table — every change ID across [`pages/`](./pages/) and [`microcopy.md`](./microcopy.md). The implementer works through this in priority order. Update `Status` as each ID lands.

**Generated:** 2026-04-26 from Phase 1 deliverables.
**Total change blocks:** ~117 across 24 page files and microcopy. ~52 P0 · ~55 P1 · ~10 P2 · 1 Skipped (HOME-06 founder-locked).
**Founder revisions 2026-04-26:** HOME-02 + HOME-03 text revised · HOME-06 skipped · NPSP-02 + NPSP-04 add donor-facing-checkout swap · NPSP-05 + NPSP-06 + SOL-NPSP-01 added.

## Sort order

1. **Priority** (P0 → P1 → P2)
2. **Page order** from [`audit.md`](./audit.md): homepage → flagship products (foundry, salesforce, sap, gateway, intelligence-reports, npsp-middleware) → product sub-pages and pricing → solutions → edges (contact, brand, security, thank-you, insights, 404)
3. Within page, top-of-page → bottom-of-page

## Effort scale

- **S** — text-only swap (under 5 minutes)
- **M** — multi-line section (5–30 minutes)
- **L** — structural (requires component change or design input)
- **XL** — blocked on a founder decision before implementation

## Status values

`Open · In Progress · Merged · Skipped (with rationale)`

---

## P0 — ship in PR 1

| ID | Page / file | Section | Effort | Type | Status |
|---|---|---|---|---|---|
| HOME-01 | `pages/homepage.md` | Hero byline | S | Mechanic | Open |
| HOME-02 | `pages/homepage.md` | Hero h1 (founder-revised: *actions → action*) | S | Headline | Open |
| HOME-03 | `pages/homepage.md` | Hero body (founder-revised: drop *consolidated into one*, *one* → *your*) | S | Body | Open |
| HOME-04 | `pages/homepage.md` | Hero CTAs | S | CTA | Open |
| HOME-07 | `pages/homepage.md` | Foundry service card body | M | Body | Open |
| HOME-09 | `pages/homepage.md` | SAP service card | S | Body | Open |
| HOME-10 | `pages/homepage.md` | Pillar section header | S | Headline | Open |
| HOME-11 | `pages/homepage.md` | Trust paragraph | M | Body | Open |
| HOME-12 | `pages/homepage.md` | Pillar i (Named admin) | S | Lexicon | Open |
| HOME-15 | `pages/homepage.md` | Foundry callout body | M | Body | Open |
| HOME-16 | `pages/homepage.md` | Connect/Illuminate/Act steps | M | Body | Open |
| HOME-19 | `pages/homepage.md` | Step 4 (Ongoing management) body | S | Lexicon | Open |
| FNDY-01 | `pages/foundry.md` | Meta description | S | Meta | Open |
| FNDY-02 | `pages/foundry.md` | Hero sidenote | S | Body | Open |
| FNDY-03 | `pages/foundry.md` | Hero body | M | Body | Open |
| FNDY-05 | `pages/foundry.md` | Layer II (Illuminate) bullet | S | Lexicon | Open |
| FNDY-06 | `pages/foundry.md` | Prism section heading + body + caption | M | Headline+Body | Open |
| FNDY-07 | `pages/foundry.md` | Engagement section header | S | Headline | Open |
| FNDY-08 | `pages/foundry.md` | Step 4 (Evolve) | S | Lexicon | Open |
| SF-01 | `pages/salesforce.md` | Hero primary CTA | S | CTA | Open |
| SF-02 | `pages/salesforce.md` | Activities grid fallback CTA | S | CTA | Open |
| SF-03 | `pages/salesforce.md` | Foundry pillar 2 (Illuminate) | S | Lexicon | Open |
| SF-06 | `pages/salesforce.md` | salesforceConsulting.ts L26 (managed admin) | S | Lexicon | Open |
| SAP-01 | `pages/sap.md` | Meta description | S | Meta | Open |
| SAP-02 | `pages/sap.md` | Hero body | S | Body | Open |
| SAP-03 | `pages/sap.md` | Hero sidenote | S | Lexicon | Open |
| SAP-04 | `pages/sap.md` | Hero primary CTA | S | CTA | Open |
| SAP-05 | `pages/sap.md` | What's included body | S | Lexicon | Open |
| SAP-07 | `pages/sap.md` | Step 1 (named team → SPOC) | S | Lexicon | Open |
| GTWY-02 | `pages/gateway.md` | Implementation Step 4 (Evolve) | S | Lexicon | Open |
| GTWY-03 | `pages/gateway.md` | Final CTA banner | M | Headline+CTA | Open |
| IR-01 | `pages/intelligence-reports.md` | Meta description | S | Meta | Open |
| IR-02 | `pages/intelligence-reports.md` | End-to-end pipeline body | S | Lexicon | Open |
| IR-03 | `pages/intelligence-reports.md` | QA & accuracy body | S | Lexicon | Open |
| NPSP-01 | `pages/npsp-middleware.md` | Pricing card body (named admin → SPOC) | S | Lexicon | Open |
| NPSP-02 | `pages/npsp-middleware.md` | Why open source body (named admin + donor-facing checkout) | S | Lexicon | Open |
| NPSP-03 | `pages/npsp-middleware.md` | npspMiddleware.ts L200 (named admin → SPOC) | S | Lexicon | Open |
| NPSP-05 | `pages/npsp-middleware.md` | Managed-tier AI capabilities (NEW — 3 matrix rows + callout) | M | Body | Open |
| NPSP-06 | `pages/npsp-middleware.md` | *donate form* → *donor-facing checkout* cascade (13 locations across page.tsx + npspMiddleware.ts + NpspMiddlewareSection.tsx) | M | Lexicon | Open |
| SOL-NPSP-01 | `pages/solutions-industries.md` | NpspMiddlewareSection.tsx donor-facing checkout (3 lines) | S | Lexicon | Open |
| FNDY-PR-01 | `pages/foundry-pricing.md` | FAQ Q5 (BI replacement) | S | Lexicon | Open |
| FNDY-PR-02 | `pages/foundry-pricing.md` | All three pricing-card CTAs | S | CTA | Open |
| FNDY-PR-03 | `pages/foundry-pricing.md` | Final CTA banner | M | Headline+CTA | Open |
| SF-MS-01 | `pages/salesforce-managed-services.md` | Meta description | S | Meta | Open |
| SF-MS-02 | `pages/salesforce-managed-services.md` | Hero body | S | Lexicon | Open |
| SF-MS-03 | `pages/salesforce-managed-services.md` | Hero sidenote | S | Lexicon | Open |
| SF-MS-04 | `pages/salesforce-managed-services.md` | Hero primary CTA | S | CTA | Open |
| SF-MS-05 | `pages/salesforce-managed-services.md` | What's included body + How it works heading | S | Lexicon | Open |
| SF-MS-08 | `pages/salesforce-managed-services.md` | salesforceManagedServices.ts L18, L53 | S | Lexicon | Open |
| SF-MSP-01 | `pages/salesforce-managed-services-pricing.md` | Meta description | S | Meta | Open |
| SF-MSP-02 | `pages/salesforce-managed-services-pricing.md` | Hero body (white-glove + offshore stack) | M | Body | Open |
| SF-MSP-03 | `pages/salesforce-managed-services-pricing.md` | Pricing-card CTAs (Sales/Full Stack) | S | CTA | Open |
| SF-MSP-04 | `pages/salesforce-managed-services-pricing.md` | Custom Plan CTA | S | CTA | Open |
| SF-MSP-05 | `pages/salesforce-managed-services-pricing.md` | salesCloudFeatures L13 | S | Lexicon | Open |
| SF-IMPL-01 | `pages/salesforce-implementations.md` | Managed Administration card | S | Lexicon | Open |
| SF-IMPL-04 | `pages/salesforce-implementations.md` | Hero primary CTA | S | CTA | Open |
| SF-HC-01 | `pages/salesforce-health-check.md` | HealthCheckFaqs.tsx L22 | S | Lexicon | Open |
| SF-HC-02 | `pages/salesforce-health-check.md` | WhyNowStrip.tsx L4 | S | Lexicon | Open |
| SF-HC-03 | `pages/salesforce-health-check.md` | EngagementTiers.tsx L10 | S | Lexicon | Open |
| GTWY-PR-01 | `pages/gateway-pricing.md` | Meta description | S | Meta | Open |
| GTWY-PR-02 | `pages/gateway-pricing.md` | Hero body | S | Lexicon | Open |
| GTWY-PR-03 | `pages/gateway-pricing.md` | Pricing-card body | S | Lexicon | Open |
| GTWY-PR-04 | `pages/gateway-pricing.md` | Final CTA banner | M | Headline+CTA | Open |
| SOL-01 | `pages/solutions-industries.md` | Solutions hub meta description | S | Meta | Open |
| SOL-02 | `pages/solutions-industries.md` | Solutions hub hero body | S | Lexicon | Open |
| SOL-03 | `pages/solutions-industries.md` | PackagingTiers.tsx L21 (named admin) | S | Lexicon | Open |
| SOL-MFG-01 | `pages/solutions-industries.md` | manufacturing.ts L14, L19, L319 (mid-market) | S | Lexicon | Open |
| SOL-DIST-01 | `pages/solutions-industries.md` | distribution.ts L10, L29, L293, L302 (mid-market) | S | Lexicon | Open |
| SOL-PS-01 | `pages/solutions-industries.md` | professionalServices.ts L29 (mid-market) | S | Lexicon | Open |
| SOL-CON-01 | `pages/solutions-industries.md` | construction.ts L19, L292 (mid-market) | S | Lexicon | Open |
| SOL-FB-01 | `pages/solutions-industries.md` | foodBeverage.ts L19, L292 (mid-market) | S | Lexicon | Open |
| SOL-FS-01 | `pages/solutions-industries.md` | financialServices.ts L29 (mid-market) | S | Lexicon | Open |
| SOL-PM-01 | `pages/solutions-industries.md` | propertyManagement.ts L24, L186, L292 | S | Lexicon | Open |
| SOL-HC-01 | `pages/solutions-industries.md` | healthcare.ts L24 (mid-market) | S | Lexicon | Open |
| SOL-MFG-02 | `pages/solutions-industries.md` | manufacturing.ts L340–344 (Foundry FAQ) | S | Lexicon | Open |
| CONTACT-01 | `pages/contact.md` | Hero heading + body | M | Headline+Body | Open |
| CONTACT-02 | `pages/contact.md` | Meta description | S | Meta | Open |
| BRAND-01 | `pages/brand.md` | Type-ramp samples (4 retired phrases) | S | Body | Open |
| INS-01 | `pages/insights-index.md` | Meta description | S | Meta | Open |
| INS-02 | `pages/insights-index.md` | Hero body | S | Lexicon | Open |
| MICRO-CTA-01 | `microcopy.md` | Banned-CTA sweep (9 locations) | M | CTA | Open |
| MICRO-CTA-03 | `microcopy.md` | Hero CTAs on `/sap/` and `/salesforce/managed-services/` | S | CTA | Open |
| MICRO-FOOTER-01 | `microcopy.md` | Footer subtitle | S | Body | Open |

---

## P1 — ship in PR 2

| ID | Page / file | Section | Effort | Type | Status |
|---|---|---|---|---|---|
| HOME-05 | `pages/homepage.md` | Track-record body | S | Body | Open |
| ~~HOME-06~~ | ~~`pages/homepage.md`~~ | ~~Logo strip heading~~ — **Skipped: founder-locked 2026-04-26, keep current** | — | — | Skipped |
| HOME-08 | `pages/homepage.md` | IR service card | S | Lexicon | Open |
| HOME-13 | `pages/homepage.md` | Pillar iii (Vetted) | S | Body | Open |
| HOME-14 | `pages/homepage.md` | Pillar iv (Full-stack) | S | Body | Open |
| HOME-17 | `pages/homepage.md` | How-we-work header body | S | Body | Open |
| HOME-18 | `pages/homepage.md` | Step 2 (Implementation) body | S | Body | Open |
| HOME-20 | `pages/homepage.md` | Lead-form heading + body | M | Headline+Body | Open |
| FNDY-04 | `pages/foundry.md` | Hero byline | S | Mechanic | Open |
| FNDY-09 | `pages/foundry.md` | Otto chat section body | S | Body | Open |
| FNDY-10 | `pages/foundry.md` | Agents (home feed) body | S | Body | Open |
| FNDY-12 | `pages/foundry.md` | Demo CTA banner | M | Headline+CTA | Open |
| SF-04 | `pages/salesforce.md` | Foundry pillar 3 (Act) | S | Lexicon | Open |
| SF-05 | `pages/salesforce.md` | Foundry teaser body | S | Body | Open |
| SF-07 | `pages/salesforce.md` | salesforceConsulting.ts L119 | S | Lexicon | Open |
| SF-08 | `pages/salesforce.md` | Industries section heading | S | Body | Open |
| SAP-06 | `pages/sap.md` | How it works heading | S | Lexicon | Open |
| SAP-08 | `pages/sap.md` | End-user support activity body | S | Lexicon | Open |
| SAP-09 | `pages/sap.md` | Foundry-pillar block | S | Lexicon | Open |
| GTWY-01 | `pages/gateway.md` | Hero byline | S | Mechanic | Open |
| GTWY-04 | `pages/gateway.md` | Comparison-table body | S | Body | Open |
| GTWY-06 | `pages/gateway.md` | Tenants section heading | S | Headline | Open |
| IR-04 | `pages/intelligence-reports.md` | Foundry Prism comparison block | S | Lexicon | Open |
| IR-05 | `pages/intelligence-reports.md` | Lead-form heading + body | M | Headline+Body | Open |
| NPSP-04 | `pages/npsp-middleware.md` | Hero subhead | S | Body | Open |
| FNDY-PR-04 | `pages/foundry-pricing.md` | Hero subhead | S | Body | Open |
| FNDY-PR-05 | `pages/foundry-pricing.md` | Implementation-fee scope sentence | S | Body | Open |
| SF-MS-06 | `pages/salesforce-managed-services.md` | Foundry-pillar block | S | Lexicon | Open |
| SF-MS-07 | `pages/salesforce-managed-services.md` | Foundry teaser body | S | Body | Open |
| SF-MSP-06 | `pages/salesforce-managed-services-pricing.md` | Custom Plan description | S | Body | Open |
| SF-IMPL-02 | `pages/salesforce-implementations.md` | Foundry teaser body | S | Body | Open |
| SF-IMPL-03 | `pages/salesforce-implementations.md` | Foundry-pillar block | S | Lexicon | Open |
| SF-IMPL-05 | `pages/salesforce-implementations.md` | Pricing-tier CTA (Enterprise) | S | CTA | Open |
| SF-HC-04 | `pages/salesforce-health-check.md` | Lead-form section eyebrow | S | Headline | Open |
| SF-TR-03 | `pages/salesforce-training.md` | Lead-form section heading + body | S | Body | Open |
| SAP-PR-01 | `pages/sap-pricing.md` | CTA alignment | S | CTA | Open |
| SAP-PR-02 | `pages/sap-pricing.md` | Lead-form section heading | S | Headline | Open |
| GTWY-UC-01 | `pages/gateway-use-cases.md` | Primary CTA (hero) | S | CTA | Open |
| GTWY-UC-02 | `pages/gateway-use-cases.md` | Final CTA banner | M | Headline+CTA | Open |
| GTWY-CON-01 | `pages/gateway-connectors.md` | Final CTA banner | S | CTA | Open |
| GTWY-CON-02 | `pages/gateway-connectors.md` | Build your own body | S | Body | Open |
| SOL-PT-04 | `pages/solutions-industries.md` | PackagingTiers.tsx L60–63 (Book a working session) | S | CTA | Open |
| 404-01 | `pages/404.md` | New `not-found.tsx` file | M | IA | Open |
| MICRO-CTA-02 | `microcopy.md` | Schedule a walkthrough convergence (10+ locations) | M | CTA | Open |
| MICRO-FORM-01 | `microcopy.md` | Submit button label | S | CTA | Open |
| MICRO-NAV-01 | `microcopy.md` | Submenu group heading: CRM | S | Mechanic | Open |
| MICRO-NAV-03 | `microcopy.md` | Request a Demo in Foundry/Gateway dropdowns | S | CTA | Open |

---

## P2 — ship in PR 3

| ID | Page / file | Section | Effort | Type | Status |
|---|---|---|---|---|---|
| HOME-21 | `pages/homepage.md` | What we do section eyebrow body | S | Body | Open |
| FNDY-11 | `pages/foundry.md` | Comparison-table body (ThoughtSpot) | S | Body | Open |
| GTWY-05 | `pages/gateway.md` | Implementation section heading | S | Headline | Open |
| SF-TR-01 | `pages/salesforce-training.md` | (protected — Hero CTA) | — | — | Skipped (protected) |
| SF-TR-02 | `pages/salesforce-training.md` | (protected — Hero body) | — | — | Skipped (protected) |
| SF-TR-04 | `pages/salesforce-training.md` | PlaybookWalkthrough component review | S | Body | Open |
| MICRO-NAV-02 | `microcopy.md` | Top-level Services label | XL | IA | Deferred |
| MICRO-FOOTER-03 | `microcopy.md` | Address block (cosmetic) | S | Body | Open |
| BRAND-meta | (homepage) | Add explicit `export const metadata` | S | Meta | Open |

---

## Dependency notes

- **MICRO-CTA-01 sweep is the highest-leverage P0.** Nine locations across `src/app/` and `src/components/` swap *Get started · Get Started · Submit · Talk to us · Contact Us* to locked CTAs. Run as a single PR commit; verify against the regex banlist before merge.
- **The `mid-market` sweep across `src/data/industries/*.ts`** (SOL-MFG-01 through SOL-HC-01) can be shipped as a single regex commit — `mid-market` → `growing-business` across the eight data files. Single change-block in TSX commits but eight file touches. Plan a single batch.
- **Foundry-pillar-block rewrites** (SF-03, SAP-09, SF-MS-06, SF-IMPL-03) repeat the same content across four pages. A shared data structure refactor is out of scope (the blocks are intentionally per-page-customized for the SF/SAP/Foundry/Gateway flavor); apply the same swap manually to each.
- **Component-level changes** (SF-HC-01–03, SOL-03, MICRO-FORM-01, MICRO-BTN-01, MICRO-CTA-01 component locations) propagate everywhere the component is used. Test by visual QA on a representative page from each consumer.
- **Founder review gate** before PR 1 ships: pull HOME-01, HOME-02, HOME-03, HOME-04, FNDY-01, FNDY-02, FNDY-07, SF-01 into a preview PR for visual review. The audit-cold-read test (read homepage rewrite + audit.md back-to-back) confirms the audit isn't more bloated than the homepage.

---

## Tracking convention

When a change ID lands in code, update its row's `Status`:
- `Open` → `In Progress` (PR is up)
- `In Progress` → `Merged` (PR landed)
- If skipped: `Skipped` with one-line rationale (e.g. *out of scope after founder review · 2026-04-30*).

When the entire P0 wave is `Merged`, push the GH#10 body update with the Phase 2 PR-1 box checked. Same pattern for P1 (PR 2) and P2 (PR 3).
