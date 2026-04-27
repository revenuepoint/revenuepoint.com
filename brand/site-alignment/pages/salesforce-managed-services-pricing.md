# Salesforce managed services pricing — `/salesforce/managed-services/pricing/`

> Source: `src/app/salesforce/managed-services/pricing/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

This page is the regex banlist's densest hit per line — the meta description and the section header pile on *white-glove · dedicated administrator · dedicated administrators · no offshore routing*, the pricing-card features lists use *dedicated* twice, two of three CTAs are *Get Started*, the third is *Contact Us*. The pricing tiers themselves and the additional-services table are on-voice. 6 change blocks — 5 P0, 1 P1.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:6–11`

**Current:**

> White-glove Salesforce administration from $2,400/month. Dedicated administrator and project manager. No long-term contracts.

**Proposed:**

> Salesforce administration from your single point of contact and a project manager. From $2,400/month. No long-term contracts.

**Rationale:** Three retirements. (1) *White-glove* — banned (`lexicon.md` §service-model clichés). (2) *Dedicated administrator and project manager* → *your single point of contact and a project manager* per `lexicon.md` §service vocabulary. (3) Reorder so *From $2,400/month* lands as the price receipt mid-sentence, *No long-term contracts* closes — better hierarchy for an SEO surface. *Salesforce administration from* leads with the noun the buyer searches for.

**Priority:** P0

---

### Change 2 — Hero body (white-glove + offshore + dedicated stack)

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:55`

**Current:**

> White-glove Salesforce administration from dedicated administrators and project managers — your single point of contact for everything Salesforce. No shared queues, no offshore routing.

**Proposed:**

> Salesforce administration from your single point of contact and a project manager — the team that knows your org. Two-week sprints, backlog you prioritize, work delivered transparently. No shared queues. From $2,400/month.

**Rationale:** Locked rewrite from `examples-library.md` §P2 (the seed-list full-paragraph rewrite for this exact section). Four retirements drop in one rewrite: *white-glove* (banned hospitality language), *dedicated administrators and project managers* (drop the modifier per `lexicon.md` §service-model clichés), *no offshore routing* (geography ban per same), *for everything Salesforce* (filler that the *Salesforce administration* lead already covers). Adds the cadence-and-ownership claims (*two-week sprints, backlog you prioritize, work delivered transparently*) that `lexicon.md` §outcome vocabulary names as the locked operating-model receipts. The pricing receipt (*From $2,400/month*) — added here from `receipts.md` so the hero body anchors the price the page is selling.

**Priority:** P0

---

### Change 3 — Pricing-card CTAs (Sales Cloud + Full Stack)

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:67, 76`

**Current:**

> Sales Cloud Administration: `cta={{ label: 'Get Started', href: '/contact/?interest=Salesforce' }}`
> Full Stack Administration: `cta={{ label: 'Get Started', href: '/contact/?interest=Salesforce' }}`

**Proposed:**

> Sales Cloud Administration: `cta={{ label: 'Get a managed services proposal', href: '/contact/?interest=Salesforce' }}`
> Full Stack Administration: `cta={{ label: 'Get a managed services proposal', href: '/contact/?interest=Salesforce' }}`

**Rationale:** Same retirement as `pages/foundry-pricing.md` Change 2. *Get Started* is banned (`messaging-framework.md` §banned CTAs). The locked Salesforce-managed-services CTA per `messaging-framework.md` §standard CTAs is *Get a managed services proposal* — verb-first, names the actual deliverable.

**Priority:** P0

---

### Change 4 — Custom Plan CTA

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:87`

**Current:**

> Custom Plan: `cta={{ label: 'Contact Us', href: '/contact/?interest=Salesforce' }}`

**Proposed:**

> Custom Plan: `cta={{ label: 'Schedule a custom-plan scoping call', href: '/contact/?interest=Salesforce' }}`

**Rationale:** *Contact Us* is banned (`messaging-framework.md` §banned CTAs — "Passive. Say what happens after they contact."). Custom Plan is the bespoke tier — the actual next step is a scoping conversation, not a generic contact. Substitute names the call's purpose.

**Priority:** P0

---

### Change 5 — Sales Cloud features list (`dedicated administrator + dedicated project manager`)

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:13–25` — `salesCloudFeatures` first item

**Current:**

> 1 dedicated Salesforce administrator + 1 dedicated project manager

**Proposed:**

> Your single point of contact at RevenuePoint + a project manager

**Rationale:** Two retirements in one feature line. *1 dedicated Salesforce administrator* → *Your single point of contact at RevenuePoint* per `lexicon.md` §service vocabulary; *+ 1 dedicated project manager* → *+ a project manager* (drop the *dedicated* modifier per `lexicon.md` §service-model clichés). The plus-syntax separator survives — distinguishes this feature line from the others (which use bullets/lists) per `editorial-style.md` §plus-syntax mechanics.

**Priority:** P0

---

### Change 6 — Custom Plan description (`Dedicated team configuration`)

**Location:** `src/app/salesforce/managed-services/pricing/page.tsx:82–86`

**Current:**

> Custom Plan features list:
> - Tailored to your specific Salesforce instance
> - Custom hours and scope
> - Dedicated team configuration

**Proposed:**

> Custom Plan features list:
> - Tailored to your Salesforce instance
> - Custom hours and scope
> - Team scaled to your requirements — your single point of contact stays constant

**Rationale:** Two swaps. (1) *Tailored to your specific Salesforce instance* → *Tailored to your Salesforce instance* — *specific* is filler. (2) *Dedicated team configuration* → *Team scaled to your requirements — your single point of contact stays constant* — drops *dedicated* per `lexicon.md` §service-model clichés; substitutes a fact-bearing claim (*team scaled · single point of contact constant*) instead of an empty descriptor. Names what *Custom Plan* actually buys the buyer at the staffing layer.

**Priority:** P1

---

## Out of scope, flagged

- **`salesCloudFeatures` lines 2–11.** Quarterly audit, training access, custom objects, business process automation, advanced features (Einstein, Lightning Voice, Bots), bulk data, third-party integration, custom Apex, data hygiene, end-user training, KPI analysis. All on-voice; specific tooling and capabilities. Protect.
- **`fullStackFeatures` (all 6 lines).** Each line names a specific Salesforce cloud the tier covers. On-voice; protect.
- **Pricing-card price + period rendering.** *$2,400 month (quarterly)* / *$4,000 month (quarterly)* with the *$2,880/month on monthly billing* / *$4,800/month on monthly billing* descriptions. On-voice — names the actual billing structure, distinguishes monthly from quarterly. Protect.
- **`additionalServices` table.** Three line items at $99/month, $250/hour, $125/hour — operationally specific per `voice-and-tone.md` §1. Protect.
- **Final lead-form heading** (line 119) — *Ready to get started?* — the same question-as-header pattern that lands on most pages. Likely candidate for `MICRO-FORM-*` consistency rewrite in [`microcopy.md`](../microcopy.md) since the same heading pattern repeats across pricing pages; addressed there for site-wide consistency.
