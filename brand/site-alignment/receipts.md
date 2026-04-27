# Receipts — locked

> Canonical numerical and named claims for revenuepoint.com. Every per-page rewrite cites this table. Values come from [`open-questions.md`](./open-questions.md) defaults + live-site values, founder-confirmed 2026-04-26. Anything tagged `[VERIFY]` is a Phase 1 / Phase 2 survivor.

**Locked:** 2026-04-26 (founder approval blanket: "all answers in open-questions approved with your default").

---

## Brand-level receipts

| Claim | Value | Use | Source |
|---|---|---|---|
| Revenue managed per year | **$950M+** | Homepage hero proof block; boilerplate | `src/app/page.tsx:60` |
| Engagements (lifetime) | **300+** | Homepage hero proof block; boilerplate | `src/app/page.tsx:61` |
| Salesforce certifications | **60+** | Homepage hero proof block; SF hub; boilerplate | `src/app/salesforce/page.tsx:47, 52` |
| Salesforce cloud breadth | Sales Cloud · Service Cloud · Marketing Cloud · CPQ · Experience Cloud · NPSP | SF hub; boilerplate | `src/app/salesforce/page.tsx` |
| Platform uptime SLA | **99.9% Platform Uptime SLA** — applies to **Foundry** specifically | Homepage proof block; Foundry security section | `src/app/page.tsx:62` · `[VERIFY: confirm scope is Foundry-only or expand to Gateway]` |
| Track record line | "Built on a decade of implementing and managing enterprise systems end-to-end." | Homepage subhead; About openers; boilerplate | `voice-and-tone.md` lexicon §experience |

---

## Pricing — per product

| Product | Starting price | Tier ladder | Notes | Source |
|---|---|---|---|---|
| **Foundry** | **$2,500/month** | Core $2,500–$3,500 · Intelligence $5,000–$7,500 · Enterprise $10,000–$15,000 | Show all three tiers on `foundry/pricing/`; brand-level pages anchor to "Starting at $2,500/month" only | `src/app/foundry/pricing/page.tsx` |
| Foundry implementation | $8,000–$60,000 | Scoped per engagement | Show range on `foundry/pricing/` only | `src/app/foundry/pricing/page.tsx:128` |
| **Salesforce managed services** | **From $2,400/month** | Sales Cloud admin $2,400 · Full-stack $4,000 · Custom | Show split on managed-services pricing page | `src/app/salesforce/managed-services/pricing/page.tsx:63, 71` |
| **Salesforce implementations** | **From $15,000** | Standard $15,000 · Growth $30,000 · Custom | Show split on implementations page | `src/app/salesforce/implementations/page.tsx:234, 242` |
| **SAP managed services** | "Contact us for a custom quote" | Scoped per engagement | Pricing-on-request rule; no public starting price | `src/app/sap/pricing/page.tsx` |
| **Gateway** | **$3,500 per tenant / month** | Volume pricing past 5 active tenants | One price; `GATEWAY_PRICE` constant | `src/data/gatewayPricing.ts:3` |
| **Intelligence Reports** | **Starting at $6,800** | Per-report pricing; bespoke scope | Hide higher-tier price points behind "Commission a report" CTA | `src/app/research/intelligence-reports/page.tsx` |
| **npsp-middleware (managed)** | **$6,000 per newsroom / year** | Flat-fee, billed annually | One price; same on every newsroom | `src/app/npsp-middleware/page.tsx:218` |
| npsp-middleware (open source) | Free under AGPL-3.0 | Self-hosted | "View on GitHub" CTA | — |

**Pricing display rule:** show prices for Foundry, Salesforce managed services, Salesforce implementations, Gateway, Intelligence Reports, npsp-middleware. SAP stays "contact us" for now.

---

## Implementation timelines

| Engagement | Cadence | Brand-level claim | Where shown |
|---|---|---|---|
| Foundry implementation | **4–8 weeks**, scoped per engagement | Brand-level: "two-week sprints, milestone-paced." | `foundry/pricing/` only — not in hero or generic copy |
| Foundry — managed cadence | Two-week sprints, milestone-paced | Standard service cadence | All Foundry pages |
| Salesforce implementation (standard) | 6–8 weeks | Implementations page | `src/app/salesforce/implementations/page.tsx:15` |
| Salesforce implementation (growth) | 10–12 weeks | Implementations page | `src/app/salesforce/implementations/page.tsx:243` |
| Salesforce health check | 2 weeks | Health check page | `src/app/salesforce/health-check/page.tsx` |
| Gateway go-live | 4 weeks | Gateway hero / pricing | `src/app/gateway/` |
| Gateway custom connector | 2–4 weeks | Connectors page | `src/app/gateway/connectors/page.tsx:171` |
| Lead-response time | Within one business day | Contact / homepage / thank-you | `src/app/contact/page.tsx`, `thank-you/page.tsx` |
| Security triage | Initial response within 5 business days | Security page | `src/app/security/page.tsx` |
| Security disclosure window | 90 days standard | Security page | `src/app/security/page.tsx` |

**Retired guarantees** (do not use as brand-level claims): "Live in 6 weeks" · "First dashboard in 2 weeks" · any specific timeline used as a universal commitment outside the engagement-specific page that documents it.

---

## Direct lines (named entities)

| Channel | Value | Where used |
|---|---|---|
| Team email | **team@revenuepoint.com** | Contact page direct line; lead-form fallback | `src/app/contact/page.tsx:35` |
| Phone | **+1 (332) 900-1150** | Contact page direct line | `src/app/contact/page.tsx:40` |
| Address | **Three World Financial Center · 200 Vesey Street, 24th Floor · New York, NY 10281** | Contact page footer | `src/app/contact/page.tsx:44–48` |
| Security disclosure | **security@revenuepoint.com** (PGP-encrypted preferred) | Security page; security@ links | `src/app/security/page.tsx:67, 101` |
| Founder PGP / fallback | **thomas@revenuepoint.com** | Security page only — not a marketing CTA destination | `src/app/security/page.tsx:131` |

---

## Active client logos (homepage logo strip)

All approved as of 2026-04-26:

WeWork · Kinetik · Luster · Omya · Melio · Chemistry Rx · Prive Therapeutics · Studio Green · Green Line Ingredients · inewsource · VTDigger · The Current · Mississippi Today

Source: `src/app/page.tsx:80–100`. Heading currently "Trusted by leading organizations and nonprofits" — Phase 1 reviews this string against `lexicon.md` (the word "leading" is filler-self-praise candidate; rewrite likely).

---

## Foundry capabilities — shipping today

Marketing claims align with shipping product. Default (per founder approval): all named capabilities in the voice system are marketing-ready as named capabilities.

| Capability | Status | One-line claim |
|---|---|---|
| **Blueprint** | Shipping | Semantic data layer mapping business objects across systems |
| **Lens** | Shipping | Operational dashboards for every role |
| **Courier** | Shipping | Scheduled reports and event-driven alerts |
| **Prism** | Shipping | AI-generated written analysis |
| **Otto** | Shipping | AI analyst — answers questions, executes actions across connected systems |
| **Agents** | Shipping | Watcher · Scheduler · Processor · Responder |
| **Actions** | Shipping | Audited execution across connected systems |
| Integrations breadth | **30+** | Salesforce, SAP, NetSuite, HubSpot, QuickBooks, Stripe, Shopify, Outreach, etc. |

**Otto cadence:** "on demand" with "in seconds" as the receipt for typical Otto responses. `[VERIFY: confirm "in seconds" matches typical Otto response time vs. "in under a minute" before locking marketing copy]` — Phase 1 / Phase 2 survivor.

---

## Anonymized client outcomes — approved for marketing

| Outcome | Anonymization | Use |
|---|---|---|
| **$214K recovered in Q1** | "$40M discrete manufacturer" | Approved for marketing use anonymized. Use as the lead receipt in case-study mock-ups, Foundry value prop, and Insights-blog ledes. |

---

## Routes — locked structure

Per founder approval, every existing route stays. No additions, no folds in this round.

- `/` (homepage)
- `/foundry/` · `/foundry/pricing/`
- `/salesforce/` · `/salesforce/implementations/` · `/salesforce/managed-services/` · `/salesforce/managed-services/pricing/` · `/salesforce/health-check/` · `/salesforce/training/`
- `/sap/` · `/sap/pricing/`
- `/gateway/` · `/gateway/use-cases/` · `/gateway/connectors/` · `/gateway/pricing/`
- `/research/intelligence-reports/`
- `/insights/` · `/insights/[slug]/`
- `/contact/` · `/brand/` · `/security/`
- `/npsp-middleware/` (public)
- `/solutions/` + 10 industry pages (manufacturing · pharmacy · distribution · nonprofit · healthcare · property-management · professional-services · financial-services · food-beverage · construction)
- `/legal/privacy/` · `/legal/terms/` (out of scope for voice work; brand-name pass only)
- `/thank-you/`

**Industry weight:** all 10 industries get equal-weight pages. Per-industry concrete claim sourced from `brand-positioning.md` §industry framings — Phase 1 confirms each against the live page copy.

**Homepage primary CTA target:** existing — points to the lead-form anchor. No `/why-revenuepoint/` page is created in this round.

---

## Stale-reference retirements (locked)

Confirmed for full removal across the site:

- *"Most firms implement and disappear"* (homepage line 219; brand page font sample line 49) → replace with positive framing about what we DO.
- *"We vet every client"* / *"we decline ROI-negative engagements"* → *"we scope every engagement around real value."*
- *"No offshore handoffs"* / *"no offshore routing"* → *"no shared queues"* (where the receipt earns its place) or drop entirely.
- *"No data engineers required"* → *"Foundry comes with the data team."*
- *"Live in 6 weeks"* (as brand-level guarantee) → *"two-week sprints, milestone-paced"* at brand level; specific 4–8 weeks copy survives only on `foundry/pricing/`.
- *"Named administrator / consultant / PM / analyst / RevenuePoint administrator"* → *"your single point of contact"* / *"the senior practitioner running your engagement"* / *"a project manager"* (drop the "named" modifier).
- *"Dedicated [role]"* → drop the modifier; use the role label directly or substitute *"single point of contact."*
- *"White-glove"* (homepage line 213; SF managed services pricing line 55) → *"fully managed"* / direct-accountability claim.
- *"Mid-market"* / *"midmarket"* (homepage, foundry, insights, foundry SecuritySection, etc.) → *"growing businesses"* / *"$10M–$250M companies"* / industry-specific noun.
- *"Get started"* / *"Get Started"* CTAs (SF page, foundry pricing tiers, SF managed services pricing tiers, SalesforceProductPicker) → use the locked CTA per product line from `messaging-framework.md`.
- *"Submit"* button (Gateway ViewExplorer line 184) → name what the buyer submits / what happens next.
- *"AI reports written overnight"* / *"ready by 8 AM"* → *"on demand"* / *"ready when you ask."*

---

## Voice-system relocation timing

**Locked:** defer to Phase 4. Per-page files reference `tmp/voice-and-tone-system/...` paths through Phases 1–3; single sed-based path-rewrite commit in Phase 4 lands the move.

---

## Founder-locked terminology + structure decisions (revised 2026-04-26)

After founder cold-read of the Phase 1 per-page rewrites, four decisions revised the homepage hero and the npsp-middleware vocabulary:

1. **Homepage hero h1 — sentence form preserved.** Final: *Fully managed pipelines that turn data into action.* Drops the proposed *Implement. Operate. Orchestrate.* three-beat alternative; keeps the existing structure and feel; *actions → action* aligns to `lexicon.md` §service vocabulary (*next best action* phrasing).
2. **Homepage hero body — preserve verb stack.** Final: *Report on, analyze, measure, audit, and act on data points from every system you run on — your single source of truth.* Drops *consolidated into one* (filler); the SSOT pairing rule for *fully managed by RevenuePoint* is satisfied elsewhere on the page (Foundry callout line 268, Foundry service-card body), not in every individual line.
3. **Logo strip heading kept as-is** — *Trusted by leading organizations and nonprofits* survives unchanged. The lexicon flags *leading* / *trusted* as filler-self-praise candidates, but the founder owns the call on this surface.
4. **Terminology shift: *donate form* → *donor-facing checkout*.** Site-wide. Hyphenated as a compound modifier per `editorial-style.md` §punctuation. Bare *checkout* acceptable on subsequent-reference within a page (define-on-first-use protocol). Cascades 13 occurrences across `src/app/npsp-middleware/page.tsx`, `src/data/npspMiddleware.ts`, and `src/components/industries/NpspMiddlewareSection.tsx`. Add to `tmp/voice-and-tone-system/lexicon.md` §product vocabulary as a new preferred term in Phase 2 alongside the TSX cascade.
5. **NPSP managed-tier AI block.** Three light points added to the open-source-vs-managed comparison: *AI-suggested ask amounts* · *Recurring-donor retention (AI-timed retries + lapse prediction)* · *Donor-segment outreach prompts*. Each pairs with the locked guardrails framing (*every AI suggestion is logged, attributed, reversible, and only on reviewer approval*). Phrasing kept light per the founder's *nothing too heavy yet* note.

---

## Survivors carrying into Phase 1

Two items the founder-approved-defaults pass didn't lock:

1. **Q4 — uptime SLA scope.** *99.9% Platform Uptime SLA* — currently shown as a brand-level claim; tagged `[VERIFY]` to confirm Foundry-only (default) vs. expand to Gateway. Resolution: Phase 1 audit notes the scope and we keep Foundry-only unless founder flags otherwise on review.
2. **Q42 — Otto response cadence.** *"In seconds"* as the receipt for typical Otto responses — tagged `[VERIFY]` against in-portal reality. Resolution: Phase 1 keeps *"on demand"* as the safe lead, *"in seconds"* as a secondary receipt only where founder confirms.

These do not block Phase 1. They get resolved during the per-page rewrites and lock by the time Phase 2 PRs land.

## 💰 Bounty Contribution

- **Task:** New page: Interface System for Salesforce — /salesforce/interface-system/
- **Reward:** $6000
- **Source:** GitHub-Paid
- **Date:** 2026-04-27

