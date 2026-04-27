# Foundry pricing — `/foundry/pricing/`

> Source: `src/app/foundry/pricing/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The page does pricing well — three tiers with ranges, a la carte add-ons in a clean tabular format, the implementation-fee scope sentence. The wobbles concentrate at three surfaces: (1) FAQ Q5 uses *mid-market clients*, (2) two of three pricing-card CTAs are *Get Started* (banned), the third is *Contact Us* (also banned per `messaging-framework.md`), (3) the final CTA banner — *Ready to see Foundry in action?* — is the same off-voice question as the foundry hub's banner. 5 change blocks — 3 P0, 2 P1.

---

## Changes

### Change 1 — FAQ Q5 (BI replacement)

**Location:** `src/app/foundry/pricing/page.tsx:45–48`

**Current:**

> *(question)* Does Foundry replace our existing BI tool?
> *(answer)* For most mid-market clients, yes. Foundry replaces the need for Power BI, Tableau, or Domo — plus eliminates the internal engineering those tools require. If you have existing dashboards you want to preserve, we discuss that during discovery.

**Proposed:**

> *(question)* Does Foundry replace our existing BI tool?
> *(answer)* For most growing-business clients, yes. Foundry replaces Power BI, Tableau, or Domo — and the internal engineering those tools require to run. If you have existing dashboards worth preserving, we discuss that during discovery.

**Rationale:** Three swaps. (1) *Mid-market clients* → *growing-business clients* per `lexicon.md` §audience-segment language. (2) *Replaces the need for* → *replaces* — *the need for* is filler-padding. (3) *Plus eliminates the internal engineering those tools require* → *and the internal engineering those tools require to run* — keeps the same beat but reads tighter, replaces *plus* (which over-stacks) with *and* and ends on the *to run* phrase that names the actual cost. *Worth preserving* → *worth preserving* — already on-voice and survives.

**Priority:** P0

---

### Change 2 — Pricing-card CTAs (all three)

**Location:** `src/app/foundry/pricing/page.tsx:88, 105, 120`

**Current:**

> Core: `cta={{ label: 'Get Started', href: '/contact/?interest=Foundry+Core' }}`
> Intelligence: `cta={{ label: 'Get Started', href: '/contact/?interest=Foundry+Intelligence' }}`
> Enterprise: `cta={{ label: 'Contact Us', href: '/contact/?interest=Foundry+Enterprise' }}`

**Proposed:**

> Core: `cta={{ label: 'Schedule a Foundry scoping call', href: '/contact/?interest=Foundry+Core' }}`
> Intelligence: `cta={{ label: 'Schedule a Foundry scoping call', href: '/contact/?interest=Foundry+Intelligence' }}`
> Enterprise: `cta={{ label: 'Schedule a Foundry scoping call', href: '/contact/?interest=Foundry+Enterprise' }}`

**Rationale:** *Get Started* is banned (`messaging-framework.md` §banned CTAs — "In what?"). *Contact Us* is banned (same — "Passive. Say what happens after they contact."). The locked Foundry CTA per `messaging-framework.md` §standard CTAs is *Schedule a 30-minute demo*. On a pricing page where the buyer is past the demo question and at the scoping decision, *Schedule a Foundry scoping call* is the more accurate CTA — names the actual next step (a scoping conversation that confirms tier fit and quotes the implementation fee). Same destination for all three CTAs (the `?interest=` parameter routes the form), so the labels can converge.

**Priority:** P0

---

### Change 3 — Final CTA banner

**Location:** `src/app/foundry/pricing/page.tsx:163–168`

**Current:**

> *(heading)* Ready to see Foundry in action?
> *(body)* Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours.
> *(CTA)* Schedule a Demo →

**Proposed:**

> *(heading)* See Foundry connected to *systems like yours*.
> *(body)* Schedule a 30-minute demo. We'll show you Foundry connected to systems like the ones your business runs on, with sample data the buyer at your role would actually look at.
> *(CTA)* Schedule a 30-minute demo

**Rationale:** Same swap pattern as the foundry-hub final banner (`pages/foundry.md` Change 12). (1) Question header → declarative. (2) *Schedule a personalized demo* → *Schedule a 30-minute demo* (the locked CTA). (3) Body adds *with sample data the buyer at your role would actually look at* — operationally specific receipt. (4) CTA *Schedule a Demo →* → *Schedule a 30-minute demo* — sentence case (not Title Case) per `editorial-style.md` §CTAs; arrow is the icon, not the label.

**Priority:** P0

---

### Change 4 — Hero subhead — light tightening

**Location:** `src/app/foundry/pricing/page.tsx:65–69`

**Current:**

> *(heading)* Simple, predictable pricing. *No surprises*.
> *(body)* Flat monthly managed service pricing. No usage fees, no per-seat charges, no consumption bills. You always know what Foundry costs.

**Proposed:**

> *(heading)* Simple, predictable pricing. *No surprises*.
> *(body)* Flat monthly managed-service pricing. No usage fees, no per-seat charges. You always know what Foundry costs next month.

**Rationale:** Two swaps. (1) *No usage fees, no per-seat charges, no consumption bills* — three negations stack and *no consumption bills* is the universal-claim version that `lexicon.md` §service-model clichés retired (the universal *no usage fees / no per-seat / no consumption* is too broad as a brand-level claim; product-specific positive claims survive — for Foundry, the substitute is *flat monthly managed-service pricing*, which is itself a positive claim, plus the two surviving negations). Drop *no consumption bills*; the first two earn the *no surprises* heading. (2) *You always know what Foundry costs* → *You always know what Foundry costs next month* — adds the operational specificity that distinguishes flat-monthly from per-engagement billing (`voice-and-tone.md` §1).

**Priority:** P1

---

### Change 5 — Implementation-fee scope sentence

**Location:** `src/app/foundry/pricing/page.tsx:125–131`

**Current:**

> One-time implementation fee of $8,000–$60,000 depending on source system count and data complexity. Scoped during a paid discovery engagement before you commit to a monthly plan.

**Proposed:**

> One-time implementation fee of $8,000–$60,000 — scoped to your source-system count and data complexity during a paid discovery engagement, before you commit to a monthly plan.

**Rationale:** Single tightening. *Depending on source system count and data complexity. Scoped during a paid discovery...* — two sentences that say overlapping things. The substitute folds them into one sentence using the em-dash with spaces (`editorial-style.md` §punctuation — em-dash with spaces locked). Same facts, tighter cadence, names *paid discovery* as the locking mechanism for the price.

**Priority:** P1

---

## Out of scope, flagged

- **Pricing-card features lists.** Lines 80–87, 95–102, 112–119. All three feature lists are operationally specific per `voice-and-tone.md` §1 (named tooling: *Lens Dashboards, Courier Scheduled reports, Blueprint Business object map, Otto AI chat interface, Agents, Actions*). Protect.
- **Pricing-card descriptions.** *For companies starting their data journey* (line 79) → drift; *journey* is on the lexicon's banned list (`lexicon.md` §B2B clichés — *Journey (as in "customer journey")*). Substitute *For companies building their data foundation* or *For companies on their first data engagement*. Add as Change block in Phase 2 polish (low-impact P2).
- **Add-ons table.** Lines 15–21. Operationally specific noun + price tabular pattern; on-voice. Protect.
- **FAQ Q1–Q4 + Q6.** Lines 23–53 (excluding Q5 already covered above). Inspected; on-voice. *Same policy as our Salesforce and SAP managed services* (Q4) is the right cross-product receipt. *Your data lives in a dedicated Postgres instance provisioned exclusively for your organization* (Q6) — *dedicated* survives here as a technical term (specific Postgres instance) rather than the retired marketing modifier; per `lexicon.md` *dedicated* is retired in marketing prose, not in technical descriptions where it names an actual isolation boundary. Protect.
