# Gateway — `/gateway/`

> Source: `src/app/gateway/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

Gateway is the strongest-voice product page on the site — *The portal layer for companies that outgrew Salesforce Sites* (line 341), *Magic-link login. Code-defined access rules. Server-side sessions* (line 308), *No passwords to leak, no admin UI to misconfigure* (line 309), and the comparison table all land. Three concentrated wobbles: (1) the byline (*RevenuePoint Gateway* redundant), (2) the *named administrator* in the implementation Step 4, (3) the final CTA banner heading reads as a question. The voice docs explicitly call out *Six portals. One framework.* (Gateway use-cases tagline, `brand-positioning.md` §Gateway) — the page hub doesn't use it but the use-cases page does. 6 change blocks — 2 P0, 3 P1, 1 P2.

---

## Changes

### Change 1 — Hero byline

**Location:** `src/app/gateway/page.tsx:96` — `byline="..."`

**Current:**

> RevenuePoint Gateway

**Proposed:**

> Gateway · Multi-tenant portals

**Rationale:** Same pattern as `pages/foundry.md` Change 4 — the URL is `/gateway/` and the brand owns the page by definition. *RevenuePoint Gateway* is product-and-brand stacked redundantly. *Gateway · Multi-tenant portals* uses the locked Gateway category claim per `brand-positioning.md` §Gateway, compressed for byline length.

**Priority:** P1

---

### Change 2 — Implementation Step 4 (Evolve)

**Location:** `src/app/gateway/page.tsx:395–399`

**Current:**

> Step 4 — Evolve — New tenants, new views, new connectors — your named administrator handles change requests. Monthly reviews; quarterly roadmap conversations.

**Proposed:**

> Step 4 — Evolve — New tenants, new views, new connectors — your single point of contact handles change requests. Monthly reviews; quarterly roadmap conversations.

**Rationale:** Single retirement. *Your named administrator* → *Your single point of contact* per `lexicon.md` §service vocabulary. From `examples-library.md` §12 (the seed-list rewrite for this exact line). The rest of the line — *change requests · monthly reviews · quarterly roadmap conversations* — is on-voice and survives intact.

**Priority:** P0

---

### Change 3 — Final CTA banner

**Location:** `src/app/gateway/page.tsx:407–409`

**Current:**

> *(heading)* Ready to see Gateway running?
> *(body)* Thirty minutes with a RevenuePoint architect. We walk through a working tenant, scope your tenant model, and quote a path to live.
> *(CTA)* Schedule a walkthrough →

**Proposed:**

> *(heading)* See Gateway running with *your* connectors.
> *(body)* Thirty minutes with a RevenuePoint architect. We walk through a working tenant — connected to your CRM and ERP — scope your tenant model, and quote a path to live.
> *(CTA)* Schedule a Gateway demo

**Rationale:** Three swaps. (1) *Ready to see Gateway running?* — questions read uncertain in marketing headers (`messaging-framework.md` §headlines to avoid). Substitute the declarative *See Gateway running with your connectors* with italicized *your* per the page's own emphasis mechanic (`editorial-style.md` §three-beat headline mechanics — italics for the load-bearing word). (2) Body adds *connected to your CRM and ERP* — the operational specificity that distinguishes this demo from a generic walkthrough (`voice-and-tone.md` §1). (3) CTA *Schedule a walkthrough →* → *Schedule a Gateway demo* — the locked Gateway CTA per `messaging-framework.md` §standard CTAs (the locked phrasing across the site converges; the arrow is the icon, not part of the label per `editorial-style.md` §CTA mechanical rules).

**Priority:** P0

---

### Change 4 — Comparison-table body

**Location:** `src/app/gateway/page.tsx:340–343`

**Current:**

> *(heading)* The portal layer for companies that outgrew Salesforce Sites.
> *(body)* Most portal options are tied to one CRM, share data underneath, or take six months to build. Gateway is the only one fully managed, multi-tenant by design, and not locked to a single source system.

**Proposed:**

> *(heading)* The portal layer for companies that outgrew Salesforce Sites.
> *(body)* Most portal options are tied to one CRM, share data underneath, or take six months to build. Gateway is fully managed by RevenuePoint, multi-tenant by design, connects to every CRM and ERP you run on, and ships under flat per-tenant pricing.

**Rationale:** Two swaps. (1) *The only one* — superlative-self-praise filler (`lexicon.md` §hype-and-inflation — adjacent to the banned *world-class* / *best-in-class* / *industry-leading* class). The substitute names four specific differentiators, each grounded: *fully managed by RevenuePoint* (locked phrasing), *multi-tenant by design* (the page's own mechanic claim), *connects to every CRM and ERP you run on* (the locked Gateway anchor claim per `brand-positioning.md` §Gateway), *flat per-tenant pricing* (the receipt — `$3,500 per tenant / month` per `receipts.md`). (2) *Not locked to a single source system* → *connects to every CRM and ERP you run on* — positive substitute for the negation; same claim, framed as what we do (`voice-and-tone.md` §writing principles).

**Priority:** P1

---

### Change 5 — Implementation section heading

**Location:** `src/app/gateway/page.tsx:373` — `<SectionHeader heading="...">`

**Current:**

> Live in 4 weeks. Here's how.

**Proposed:**

> *Four-week* go-live. Here's how.

**Rationale:** Light reframing. *Live in 4 weeks* — the brand-level *Live in N weeks* pattern was retired (`receipts.md`); *4 weeks* survives on the Gateway page because it's the actual product timeline (per `receipts.md`). The substitute italicizes *Four-week* (per the page's mechanic) and reframes from a *we go live* commitment to a *go-live cadence* descriptor — same fact, less commitment risk if a specific engagement runs long.

**Priority:** P2

---

### Change 6 — `Tenants` section heading

**Location:** `src/app/gateway/page.tsx:226–227`

**Current:**

> *(eyebrow)* TENANTS
> *(heading)* Each tenant, isolated by design. Each tenant, branded their way.

**Proposed:**

> *(eyebrow)* TENANTS
> *(heading)* Six portals. *One framework*.

**Rationale:** The locked Gateway tagline per `brand-positioning.md` §Gateway and `messaging-framework.md` §headline patterns is *Six portals. One framework.* — three-beat with italicized noun, brand-asset-shaped. The page's `/gateway/use-cases/` route uses this exact phrasing already (per the existing copy on that page); the hub page's tenants section is the right surface to anchor the same claim. *Each tenant, isolated by design. Each tenant, branded their way.* survives as a body sub-claim under the hero of the section, not the section's heading.

**Priority:** P1

---

## Out of scope, flagged

- **Magic-link / Auth section heading and body** (lines 308–309). On-voice. *No passwords to leak, no admin UI to misconfigure* is exactly the brand's *name the alternative we're rejecting* mechanic per `voice-and-tone.md` §writing principles. Protect.
- **Configuration section** (lines 322–326). *No admin console. No click-ops. The tenant config is TypeScript — typed, reviewable in pull requests, deployable like any application.* On-voice; protect.
- **Connector strip closing line** (line 293–294). *Need a connector we don't list? Tell us →* is direct, no padding, on-voice. Protect.
- **Comparison-table rows.** Lines 354–365 are factual tabular comparisons; the row labels (*Multi-tenant by design · Connects to non-Salesforce systems · Magic-link auth (no passwords) · Code-defined access rules · ...*) are operationally specific per `voice-and-tone.md` §1. Protect.
