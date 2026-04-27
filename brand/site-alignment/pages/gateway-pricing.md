# Gateway pricing — `/gateway/pricing/`

> Source: `src/app/gateway/pricing/page.tsx` + `src/data/gatewayPricing.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The pricing page leads with the locked Gateway price ($3,500 per tenant / month), runs a clean *what's included* grid, and surfaces the *past five active tenants* volume threshold. Three concentrated retirements: meta description, hero body (*named RevenuePoint administrator*), and the in-card description (*and a named RevenuePoint administrator* in the pricing-card body). The final CTA banner heading is a question (the same off-voice pattern as Foundry's). 4 change blocks — 3 P0, 1 P1.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/gateway/pricing/page.tsx:16–21`

**Current:**

> Gateway is priced per active tenant per month. Hosting, magic-link auth, connector, theming, audit log, and a named administrator are all included. Fully managed by RevenuePoint.

**Proposed:**

> Gateway is priced per active tenant per month — $3,500 per tenant / month, fully managed by RevenuePoint. Hosting, magic-link auth, the connector, theming, audit log, and your single point of contact are all included.

**Rationale:** Two swaps plus a price-receipt addition. (1) *A named administrator* → *your single point of contact* per `lexicon.md` §service vocabulary. (2) Add the price ($3,500 per tenant / month) directly in the meta description — pricing-page metas should surface the price for SEO (`receipts.md` Gateway row); locked per founder approval. (3) Light reordering: lead with the price-and-managed claim, follow with the inclusions list — pyramid the most important fact first.

**Priority:** P0

---

### Change 2 — Hero body

**Location:** `src/app/gateway/pricing/page.tsx:33`

**Current:**

> Per-tenant, per-month pricing. Hosting, magic-link auth, the connector to your CRM or ERP, per-tenant theming, audit log, and a named RevenuePoint administrator are all included. No surprise consumption bills. No per-seat add-ons.

**Proposed:**

> Per-tenant, per-month pricing. Hosting, magic-link auth, the connector to your CRM or ERP, per-tenant theming, audit log, and your single point of contact at RevenuePoint are all included. No surprise consumption bills. No per-seat add-ons.

**Rationale:** Single retirement. *A named RevenuePoint administrator* → *your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. The closing two-beat (*No surprise consumption bills. No per-seat add-ons.*) survives — these are product-specific positive claims for Gateway (per `lexicon.md` §service-model clichés — the universal *no consumption / no per-seat* claim is retired but Gateway's specific case earns the phrasing because the pricing model is genuinely flat-per-tenant, no consumption).

**Priority:** P0

---

### Change 3 — Pricing-card body

**Location:** `src/app/gateway/pricing/page.tsx:56–58`

**Current:**

> Hosting, magic-link auth via SendGrid, the connector to your CRM or ERP, tenant configuration in code, per-tenant theming, audit log, observability, upgrades, and a named RevenuePoint administrator. Billed monthly. Volume pricing kicks in past five active tenants.

**Proposed:**

> Hosting, magic-link auth via SendGrid, the connector to your CRM or ERP, tenant configuration in code, per-tenant theming, audit log, observability, upgrades, and your single point of contact at RevenuePoint. Billed monthly. Volume pricing kicks in past five active tenants.

**Rationale:** Same retirement as Change 2. *A named RevenuePoint administrator* → *your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary. The rest of the inclusion list — operationally specific named tooling (SendGrid, the typed connector, audit log, observability, upgrades) — is on-voice per `voice-and-tone.md` §1. Protect.

**Priority:** P0

---

### Change 4 — Final CTA banner

**Location:** `src/app/gateway/pricing/page.tsx:134–138`

**Current:**

> *(heading)* Want to see Gateway with your data?
> *(body)* Bring an example tenant: a customer segment, a partner network, a dealer footprint. We mock it in front of you and quote a path to live.
> *(CTA)* Schedule a walkthrough →

**Proposed:**

> *(heading)* See Gateway with *your* data.
> *(body)* Bring an example tenant — a customer segment, a partner network, a dealer footprint. We mock it in front of you and quote a path to live.
> *(CTA)* Schedule a Gateway demo

**Rationale:** Three swaps. (1) *Want to see Gateway with your data?* — question-as-header, banned (`messaging-framework.md` §headlines to avoid). Substitute the declarative *See Gateway with your data* with italics on *your* per the page's mechanic (`editorial-style.md` §three-beat headline mechanics — italics for the load-bearing word). (2) Body colon → em-dash with spaces per `editorial-style.md` §punctuation (em-dash with spaces locked; colon overweighted here). (3) CTA *Schedule a walkthrough →* → *Schedule a Gateway demo* — locked CTA convergence per `messaging-framework.md` §standard CTAs.

**Priority:** P0

---

## Out of scope, flagged

- **Hero heading.** *One price. Every tenant. Fully managed.* On-voice — three-beat with the brand's locked closing phrase. Protect.
- **`What's included` grid.** Renders from `GATEWAY_INCLUSIONS` data. Inspected; on-voice. The body line *No hidden tier of features unlocked at higher pricing. Every active tenant gets the same managed stack.* (line 89) is the brand's *name the alternative we're rejecting* mechanic — protect.
- **`Many tenants? Talk to us.` micro-section.** Lines 105–124. *Talk to us* in this italicized-noun headline lands as a direct invitation for a specific conversation, not a generic CTA — on-voice in this micro-context. The body adds the operational specifics (volume threshold, connector mix, data residency, tenant cadence). The CTA *Get a multi-tenant quote* names the deliverable. Protect.
- **`GATEWAY_FAQ` block.** Renders from data file. Inspected; on-voice.
