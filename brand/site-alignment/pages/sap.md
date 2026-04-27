# SAP — `/sap/`

> Source: `src/app/sap/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The SAP page does the *operationally specific* voice attribute well — the activity grid (cycle counts, MRP tuning, AP/AR configuration, posting period control, B1 patch reviews, HANA support pack migrations) is exactly the operational-noun-listing pattern `voice-and-tone.md` §1 prescribes. The wobbles concentrate at the people-claim language: every reference to the team uses retired *named* / *dedicated* phrasing — meta description, hero body, sidenote, hero CTA, *What's included* body, *How it works* heading and Step 1 description, plus the same Foundry-pillar overnight pattern as Salesforce. 9 change blocks — 5 P0, 4 P1.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/sap/page.tsx:10–15` — `buildMetadata({...})`

**Current:**

> A named SAP consultant and project manager. Two-week sprints. Inventory, financial close, end-user support, workflow tuning — fully managed by RevenuePoint, across SAP Business One and S/4HANA.

**Proposed:**

> Your single point of contact at RevenuePoint and a project manager — two-week sprints across SAP Business One and S/4HANA. Inventory, financial close, end-user support, workflow tuning, fully managed by RevenuePoint.

**Rationale:** Single retirement plus light reordering. *A named SAP consultant and project manager* → *Your single point of contact at RevenuePoint and a project manager* per `lexicon.md` §service vocabulary. Reorder so *Two-week sprints across SAP Business One and S/4HANA* leads — names the cadence and the platform scope in one beat (the meta description's load-bearing claim for SAP's operational SEO surface).

**Priority:** P0

---

### Change 2 — Hero body

**Location:** `src/app/sap/page.tsx:146`

**Current:**

> A named consultant and project manager. A block of hours each month. Two-week sprints to ship the work. Inventory, financial close, end-user support, workflow tuning — everything an in-house SAP admin would do, sized to a smaller team that doesn't need a full-time hire.

**Proposed:**

> Your single point of contact and a project manager. A block of hours each month. Two-week sprints to ship the work. Inventory, financial close, end-user support, workflow tuning — everything an in-house SAP admin would do, sized to the team that doesn't need a full-time hire yet.

**Rationale:** Two swaps. (1) *A named consultant and project manager* → *Your single point of contact and a project manager* per `lexicon.md` §service vocabulary. (2) *Sized to a smaller team that doesn't need a full-time hire* → *sized to the team that doesn't need a full-time hire yet* — *smaller* is borderline-segment language adjacent to the banned *mid-market* / *SMB-priced* framing (`lexicon.md` §audience-segment language); *yet* names the growth trajectory the buyer is on.

**Priority:** P0

---

### Change 3 — Hero sidenote

**Location:** `src/app/sap/page.tsx:151`

**Current:**

> Business One + S/4HANA · Two-week sprints · Month-to-month · Named consultant + PM.

**Proposed:**

> Business One + S/4HANA · Two-week sprints · Month-to-month · Single point of contact + PM.

**Rationale:** Single retirement. *Named consultant + PM* → *Single point of contact + PM* per `lexicon.md` §service vocabulary. The plus-syntax separator and the rest of the sidenote survive (the plus-syntax is the brand's distinctive mechanic per `editorial-style.md` §plus-syntax mechanics).

**Priority:** P0

---

### Change 4 — Hero primary CTA

**Location:** `src/app/sap/page.tsx:147–150`

**Current:**

> *(primary)* Start a managed services engagement · *(secondary)* See pricing

**Proposed:**

> *(primary)* Schedule an SAP scoping call · *(secondary)* See pricing

**Rationale:** *Start a managed services engagement* drifts from the locked SAP CTA. Per `messaging-framework.md` §standard CTAs, the canonical SAP CTA is *Schedule an SAP scoping call* — verb-first, names the actual next step (a scoping conversation, not an engagement start that the buyer can't initiate from a button click).

**Priority:** P0

---

### Change 5 — `What's included` section body

**Location:** `src/app/sap/page.tsx:157–161`

**Current:**

> *(eyebrow)* What's included
> *(heading)* Everything an in-house SAP admin would do
> *(body)* Managed services is not a rotating help-desk queue. It is a named team running an agreed block of hours each month against the backlog of work your SAP instance actually needs.

**Proposed:**

> *(eyebrow)* What's included
> *(heading)* Everything an in-house SAP admin would do
> *(body)* Managed services is not a rotating help-desk queue. It is one team — your single point of contact and a project manager — running an agreed block of hours each month against the backlog of work your SAP instance actually needs.

**Rationale:** Single retirement. *A named team* → *one team — your single point of contact and a project manager* per `lexicon.md` §service vocabulary. Names the actual model (singular point of contact + PM) instead of the *named* abstraction. From `brand-positioning.md` §competitive contrast — generic MSPs section uses this exact substitution as the receipt.

**Priority:** P0

---

### Change 6 — `How it works` heading

**Location:** `src/app/sap/page.tsx:175`

**Current:**

> Named team. Hours each month. Two-week sprints. Month-to-month.

**Proposed:**

> Single point of contact. Hours each month. Two-week sprints. Month-to-month.

**Rationale:** Single retirement. *Named team* → *Single point of contact* per `lexicon.md` §service vocabulary. The four-beat structure (period-separated short claims) survives — this is the brand's compressed declarative pattern (`voice-and-tone.md` §writing principles three-beat / multi-beat declaratives).

**Priority:** P1

---

### Change 7 — Step 1 (`A named team`)

**Location:** `src/app/sap/page.tsx:45–50`

**Current:**

> *(title)* A named team
> *(description)* One dedicated SAP consultant and one dedicated project manager — your single point of contact. The same people every sprint.

**Proposed:**

> *(title)* Your single point of contact
> *(description)* Your SAP consultant and a project manager — your single point of contact, with a team that knows your operation. The same engagement runs every sprint.

**Rationale:** Locked rewrite from `examples-library.md` §5 (the seed-list example for this exact structure). Three retirements stack: title *A named team* → *Your single point of contact*; description *One dedicated SAP consultant and one dedicated project manager* → *Your SAP consultant and a project manager* (drop the *dedicated* modifier per `lexicon.md` §service-model clichés); *The same people every sprint* → *The same engagement runs every sprint* — the brand's continuity claim is now *a team that knows your operation*, not the staffing-stability claim *the same two people*.

**Priority:** P0

---

### Change 8 — End-user support activity body

**Location:** `src/app/sap/page.tsx:27–29`

**Current:**

> Login and authorization issues, "how do I do X in SAP", training questions, document recovery. Your users open tickets directly with a named consultant who already knows your config.

**Proposed:**

> Login and authorization issues, *"how do I do X in SAP,"* training questions, document recovery. Your users open tickets directly with the senior consultant who runs your engagement and already knows your config.

**Rationale:** Locked rewrite from `examples-library.md` §14 (the seed-list example for this exact line). Two swaps. (1) *A named consultant* → *the senior consultant who runs your engagement* — the locked phrasing per `lexicon.md` §service vocabulary; more specific role + the brand's *runs your engagement* convention. (2) Punctuation tightening: ASCII straight-quote pairs with comma inside per `editorial-style.md` §punctuation; italics on the inline question for the operationally-specific receipt mechanic.

**Priority:** P1

---

### Change 9 — Foundry-pillar block (Illuminate + Act)

**Location:** `src/app/sap/page.tsx:124–133` — `foundryPillars[1]` and `foundryPillars[2]`

**Current:**

> *(02 · Illuminate)* Live dashboards. Overnight AI analysis. — Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.
> *(03 · Act)* Agents watch, decide, and execute. — Agents and Otto take action across SAP and the rest of your stack — fully auditable, fully managed.

**Proposed:**

> *(02 · Illuminate)* Live dashboards. AI analysis on demand. — Lens dashboards for every role and Prism reports on demand — leadership gets the answers when they ask, not on a schedule the warehouse decides.
> *(03 · Act)* Agents propose. Reviewers approve. Foundry executes. — Agents and Otto propose plans across SAP and the rest of your stack — every action logged, attributed, reversible, and only on reviewer approval. Fully managed by RevenuePoint.

**Rationale:** Same swaps as the Salesforce hub Foundry-pillar block (`pages/salesforce.md` Changes 3–4). Three retirements: (1) *Overnight AI analysis* → *AI analysis on demand*. (2) *Have answers by 8 AM* → *get the answers when they ask*. (3) *Watch, decide, and execute* → *propose, get approved, and execute* with the audit-and-reversibility tag. Per `lexicon.md` §AI clichés + §audit-and-accountability vocabulary; `voice-and-tone.md` §pair automation claims with audit.

**Priority:** P1

---

## Out of scope, flagged

- **Activity bodies (Inventory, Financials, Workflow Iteration, Reports & Queries, Patches).** Lines 17–42. All five are on-voice — operationally specific noun-listing per `voice-and-tone.md` §1. *We work alongside your controller, not around them* (line 24) and *Reports built inside SAP, not in a side spreadsheet that drifts* (line 36) are particularly strong; protect from rewrite.
- **FAQs.** Lines 90–116. All five FAQ answers are on-voice — direct, factual, names the actual versions/cycles. No rewrites.
- **`Who it's for` segments (i–iv).** Lines 71–88. All four are on-voice — name a specific buyer situation (*Just went live · Lost an internal SAP champion · Underused modules · Active workflow iteration*) and the actual brand response. No rewrites.
- **Pricing summary section.** Lines 215–235. *No off-the-shelf tiers; there is a quote that fits your operations* is the locked pricing-on-request rule for SAP per `receipts.md`. No rewrite.
