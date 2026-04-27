# Site copy audit — pre-launch

> Health check of revenuepoint.com against the voice and tone system at `tmp/voice-and-tone-system/`. Front matter to the per-page rewrites in [`pages/`](./pages/), [`microcopy.md`](./microcopy.md), and [`implementation-checklist.md`](./implementation-checklist.md).

**Updated:** 2026-04-26 — Phase 1.

---

## Summary

The site has a strong voice in scattered places (the `Implementation. Management. Intelligence.` three-beat, the "$950M+ · 300+ · 99.9%" receipt block, the "we don't just stand software up" framing, the named-pillar i/ii/iii/iv numerals). But the bulk of the marketing copy — homepage hero through service cards through SAP through Salesforce managed services — still leads with the previous brand vocabulary: *named administrator · dedicated · white-glove · mid-market · no offshore · live in 6 weeks · no data engineers required · vet every client · most firms implement and disappear · Get started.* These are not stylistic preferences; they are the **specific phrases the voice system retired and replaced** with locked substitutes. Removing them and replacing with the locked substitutes is the work of the next two PRs.

One structural finding: the homepage hero **byline reads "CRM + ERP + Agentic Orchestration"** but the locked company tagline is **"CRM + ERP + AI Orchestration"** (`brand-positioning.md` §company tagline). This is a P0 fix on its own — the brand's category claim is wrong on the front door.

---

## What's working — protect from rewrites

Eight things the existing copy does that are on-voice. Don't churn these.

1. **Three-beat with italicized third — `Implementation. Management. *Intelligence*.`** (`src/app/page.tsx:108`). Canonical pattern from `voice-and-tone.md` §writing principles. Same pattern repeats correctly at `Implementation, operations, intelligence — across *five lines*.` (line 126) and `From execution to production in *weeks, not months*.` (line 317).

2. **The receipt block — `$950M+ · 300+ · 99.9%`** (`src/app/page.tsx:60–62`). Three numerical receipts in the hero side panel, paired with the "decade of implementing and managing enterprise systems end-to-end" anchor sentence. Exactly the pattern `voice-and-tone.md` §confident-with-receipts prescribes.

3. **The "we don't just stand software up" paragraph** (`src/app/page.tsx:111–114`). Positive framing of what we DO — *implement to your processes, manage the system as it evolves, put your data to work across the business — five platforms, one partner, end-to-end* — exactly the substitute pattern for the retired "stand-and-disappear" swipe.

4. **i/ii/iii/iv lowercase Roman numerals** for the four pillars (`src/app/page.tsx:225–243`). Distinctive mechanic worth preserving. The pillar bodies inside need rewrites; the numeral structure stays.

5. **The "Foundry connects every system you run — CRM, ERP, accounting, fulfillment, support, telephony" enumeration** (`src/app/page.tsx:138`). On-voice operationally specific noun-listing per `voice-and-tone.md` §1.

6. **`No long-term contracts` pillar** (`src/app/page.tsx:231–233`). One of the four locked promise pillars in `brand-positioning.md`. Body copy survives unchanged: *"Monthly and quarterly plans. We keep clients by delivering results, not lock-ins."*

7. **The contact-page response-time line — `We respond to every submission within one business day`** (`src/app/contact/page.tsx`). Specific, factual, no padding.

8. **The Insights index lede — `Essays on mid-market operations, the systems gap, and how we're closing it at RevenuePoint — from the people doing the work`** (`src/app/insights/page.tsx:33`). Voice survives intact except for the *mid-market* swap — the rest is the right register for a long-form editorial surface.

---

## What's off voice — patterned failures

Eight patterns recur across most marketing surfaces. These are the substitution targets for the per-page rewrites.

### 1. *Named [role]* everywhere

The most common violation. *named administrator · named admin · named consultant · named PM · named analyst · named approver · named RevenuePoint administrator · named integrations · named agents.* The voice system retired the "named" modifier — the differentiator is direct access and team continuity, not the act of naming a role.

**Locations:** `src/app/page.tsx` (lines 159, 219, 226, 268, 292, 347), `src/app/foundry/page.tsx:643`, `src/app/sap/page.tsx` (lines 28, 146), `src/app/salesforce/managed-services/page.tsx:51`, `src/app/salesforce/managed-services/pricing/page.tsx:55`, `src/app/gateway/page.tsx:398`, `src/app/gateway/pricing/page.tsx` (lines 19, 33, 57), `src/app/research/intelligence-reports/page.tsx:136`, `src/app/npsp-middleware/page.tsx` (lines 218, 256), `src/app/solutions/page.tsx` (lines 9, 20), `src/components/healthcheck/HealthCheckFaqs.tsx:22`, `src/components/healthcheck/previews/EngagementTiers.tsx:10`, `src/components/industries/PackagingTiers.tsx:21`, `src/data/salesforceConsulting.ts` (lines 26, 119), `src/data/npspMiddleware.ts:200`, `src/data/salesforceManagedServices.ts:18`.

**Substitute:** *your single point of contact* / *the senior practitioner running your engagement* / *a project manager* (drop the *named* modifier). Per `lexicon.md` §service-model clichés.

### 2. *Dedicated [role]*

Same retirement. *Dedicated administrators · dedicated team · dedicated admin · dedicated consultant · dedicated project manager.*

**Locations:** `src/app/page.tsx` (lines 183, 227), `src/app/salesforce/implementations/page.tsx:359`, `src/app/salesforce/managed-services/pricing/page.tsx:55`, `src/app/sap/page.tsx:49`, `src/data/salesforceManagedServices.ts:53`.

**Substitute:** drop the modifier. *Per `lexicon.md` §service-model clichés.*

### 3. *White-glove*

Hospitality language; banned. The differentiator is the actual service model.

**Locations:** `src/app/page.tsx:213` (homepage section header *"White-glove service. Real accountability."*), `src/app/salesforce/managed-services/pricing/page.tsx:55`.

**Substitute:** *Fully managed.* / *Direct accountability.* Per `lexicon.md` §service-model clichés.

### 4. *Mid-market* / *midmarket*

Banned site-wide. Substitute *growing businesses* / *$10M–$250M companies* / industry-specific noun.

**Locations:** `src/app/foundry/page.tsx:28` (meta description), `src/app/foundry/pricing/page.tsx:47`, `src/app/insights/page.tsx` (lines 9, 33), `src/app/brand/page.tsx:44` (font sample), `src/components/foundry/SecuritySection.tsx:224`, `src/components/healthcheck/WhyNowStrip.tsx:4`, `src/data/foundryIndustries.ts:38`, plus blog-post bodies (out of scope for this round).

### 5. Geography negation — *no offshore handoffs* / *no offshore routing*

Banned in any direction. The differentiator is direct access and team continuity, not where the team sits.

**Locations:** `src/app/page.tsx:183`, `src/app/salesforce/managed-services/pricing/page.tsx:55`, `src/data/salesforceManagedServices.ts:53` (also includes *"no rotating faces"* — a related retirement pattern).

**Substitute:** drop entirely, or replace with *no shared queues* (the surviving anti-establishment receipt that doesn't lean on geography). Per `lexicon.md` §service-model clichés.

### 6. Snarky competitor swipes

*Most firms implement software and disappear* (the homepage trust paragraph) and *Most consulting firms implement software and disappear* (the brand-page font sample).

**Locations:** `src/app/page.tsx:219`, `src/app/brand/page.tsx:49`.

**Substitute:** describe what we DO — *We don't just stand software up. We implement to your processes, manage the system as it evolves...* The line on `page.tsx:111` already does this; the retired swipes are the redundant version. Per `examples-library.md` §1, §10.

### 7. Vet / decline-engagements posture

*We vet every client before signing · We decline clients where we don't see a clear path to ROI · Vetted engagements.* Reads transactional and slightly self-congratulatory.

**Locations:** `src/app/page.tsx:219, 236–238` (the trust paragraph and the third pillar), `src/app/contact/page.tsx` (intro paragraph).

**Substitute:** *We scope every engagement around real value.* — same selectivity, framed as commitment to outcomes. Per `lexicon.md` §service-model clichés.

### 8. Retired guarantees and buyer-absence framings

- *Live in 6 weeks* (as universal brand-level commitment) — `src/app/page.tsx:145–146`, `src/app/foundry/page.tsx:224`. Substitute brand-level claim *two-week sprints, milestone-paced*; specific 4–8 weeks copy survives only on `foundry/pricing/`.
- *No data engineers required* — `src/app/page.tsx:145`. Substitute *Foundry comes with the data team.*
- *No six-figure BI contract* — `src/app/page.tsx:145`. Substitute the positive frame *predictable monthly pricing.*
- *AI-written analysis delivered overnight* / *AI reports written overnight* / *synced and reconciled overnight* — `src/app/page.tsx:140, 282`, `src/app/foundry/page.tsx` various. Substitute *on demand* (with *in seconds* as the receipt for Otto specifically — pending Q42 verification).
- *Get started* / *Get Started* CTAs — `src/app/salesforce/page.tsx:69`, `src/app/foundry/pricing/page.tsx:88, 105`, `src/app/salesforce/managed-services/pricing/page.tsx:67, 76`, `src/components/salesforce/SalesforceProductPicker.tsx:103`. Substitute the locked CTA per product line from `messaging-framework.md` §standard CTAs.
- *Submit* button — `src/components/gateway/ViewExplorer.tsx:184`. Substitute names what the buyer submits / what happens next.
- *Trusted by leading organizations and nonprofits* — `src/app/page.tsx:81`. *Leading* is filler-self-praise. Substitute *Operating today across* / *Currently working with* — name the relationship, not a ranking.
- *Agentic Orchestration* — `src/app/page.tsx:15` byline. The locked company tagline is *AI Orchestration* per `brand-positioning.md`. P0 fix.
- *Industry best practices* — `src/app/page.tsx:335`. Filler unless paired with specific practices. Substitute the actual practices we follow.
- *Wide range of experience* / *broad range of experience* / *agentic-assisted delivery* — homepage track-record body and how-we-work body. Filler. Substitute the receipts already in the proof block.

---

## Information architecture flags

Routes locked for this round (per `receipts.md`); no folds, no additions. Two structural notes that don't require route changes but should inform the per-page rewrites:

1. **Homepage hero CTA stack is too tall.** Three CTAs (`Explore Foundry · Explore Customer Relationship Management · Explore Enterprise Resource Management`) compete for the click. Per `messaging-framework.md` §standard CTAs, one CTA per section. Recommendation: lead with **Schedule a 30-minute demo** (the locked Foundry CTA, since Foundry is the flagship-newest-product) or **Schedule a scoping call** at the brand level; demote the two product-Explore links to a subsidiary nav row. P1 — flag for founder review in the per-page file.

2. **Section header on the homepage's pillars reads "White-glove service. Real accountability."** Beyond the white-glove ban, the positioning the section delivers is *direct accountability and the operating partnership* — not "real" as a contrast to "fake." Recommendation: rewrite header to lead with the locked promise pillar (*Direct accountability.*) and let the four numbered pillars carry the rest.

3. **Solutions hub overlap.** `/solutions/` advertises *"Clean Salesforce environments for ten industries"* — this is a Salesforce Lightning-record-pages product, not a generic industry hub. The 10 industry pages each speak to a broader stack (CRM + ERP + Foundry). Recommendation: clarify in the per-page rewrite that `/solutions/` is the SF-specific "industry-tuned Lightning record pages" surface, not the company's industry coverage page. The industry pages speak for the broader stack themselves.

4. **Insights blog link from homepage is missing.** No surfacing of the long-form editorial work in the homepage flow. Phase 1 flags this as a P2 IA observation; not in scope for this round to add a section.

---

## Open questions — survivors

Carried forward from `open-questions.md`. Resolution tagged `[VERIFY]` in receipts.md and in any per-page change block that touches the value.

1. **Q4 — Uptime SLA scope.** *99.9% Platform Uptime SLA* — currently a brand-level claim on the homepage proof block. `receipts.md` defaults to *"applies to Foundry specifically."* Per-page rewrites keep the brand-level wording but add a footnote-equivalent (e.g., *"Foundry platform uptime SLA"* in finer print) to scope the claim. Confirm or override before the P0 PR ships.

2. **Q42 — Otto cadence.** *In seconds* as the receipt for typical Otto responses — kept as a secondary phrase in marketing copy; *"on demand"* is the safe lead claim. Confirm before any Otto-quoting marketing line ships.

---

## Out of scope, flagged for follow-up

Same as the README. Repeated here for the founder's eye:

- **Insights blog corpus polish** — 5 known regex hits + post-by-post grader pass across 8 posts at `src/content/insights/`. New issue opens in Phase 4.
- **Otto in-product strings** — `context-playbooks.md` §Otto persona is the spec; no live strings to align yet.
- **Sales / outbound email templates** — `context-playbooks.md` §sales emails is the spec; templates not versioned in this repo.
- **Proposal / SOW templates** — `context-playbooks.md` §proposals is the spec; templates not versioned here.
- **Sensitive-context templates** (demand letters, dispute responses) — `context-playbooks.md` §sensitive contexts has worked examples flagged for legal review before live use.
- **`npsp-middleware` README polish** — `context-playbooks.md` §technical docs is the spec; README itself lives at the npsp-middleware repo.
- **Foundry framework archival** — `foundry-brand-messaging-framework.md` deprecation header has been live since 2026-04-26; archive in Phase 4.
- **`tmp/internal-brand-guide.md`** — voice/messaging sections (§§1–5) supersede; component grammar (§6), motion (§7), open questions (§8), and approval log (§9) survive. Phase 4 moves the surviving sections to `brand/visual-design-system.md`.
- **CI banlist hook** — `.github/workflows/voice-banlist.yml`. Phase 4.
- **Six-month voice-system review** — due 2026-10-26.
