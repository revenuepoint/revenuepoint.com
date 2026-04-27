# Salesforce managed services — `/salesforce/managed-services/`

> Source: `src/app/salesforce/managed-services/page.tsx` + `src/data/salesforceManagedServices.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The page mirrors the SAP managed-services structure (same engagement-step pattern, same audience-segments grid, same Foundry-pillars block). Same retirements stack: meta description, hero body, sidenote, hero primary CTA, *What's included* body, *How it works* heading, plus a data-file activity (managed services activities at `salesforceManagedServices.ts:18, 53`). The Foundry-pillar block has the same overnight retirement as the foundry-hub teaser. 8 change blocks — 5 P0, 3 P1.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/salesforce/managed-services/page.tsx:16–21`

**Current:**

> A named Salesforce administrator and project manager. 25 hours per month on two-week sprints. Configurations, bug fixes, reports, end-user support — everything an in-house admin would do, fully managed by RevenuePoint.

**Proposed:**

> Your single point of contact at RevenuePoint and a project manager. 25 hours per month on two-week sprints. Configurations, bug fixes, reports, end-user support — everything an in-house Salesforce admin would do, fully managed by RevenuePoint.

**Rationale:** Single retirement. *A named Salesforce administrator and project manager* → *Your single point of contact at RevenuePoint and a project manager* per `lexicon.md` §service vocabulary. *In-house admin* → *in-house Salesforce admin* — adds the platform specifier the meta description was missing (improves SEO precision and matches the voice guide's preference for operationally-specific nouns).

**Priority:** P0

---

### Change 2 — Hero body

**Location:** `src/app/salesforce/managed-services/page.tsx:51`

**Current:**

> A named administrator and project manager. A block of hours every month. Two-week sprints to ship the work. Configurations, automations, integrations, end-user support, data pulls — everything an in-house Salesforce admin would do, without the hire.

**Proposed:**

> Your single point of contact and a project manager. A block of hours every month. Two-week sprints to ship the work. Configurations, automations, integrations, end-user support, data pulls — everything an in-house Salesforce admin would do, without the hire.

**Rationale:** Locked rewrite from `examples-library.md` §3 (the seed-list example for this exact line). Single retirement. *A named administrator and project manager* → *Your single point of contact and a project manager* per `lexicon.md` §service vocabulary. The activity enumeration is on-voice (operationally specific) and survives intact.

**Priority:** P0

---

### Change 3 — Hero sidenote

**Location:** `src/app/salesforce/managed-services/page.tsx:56`

**Current:**

> Named admin + PM · 25 hours/month · Two-week sprints · Month-to-month.

**Proposed:**

> Single point of contact + PM · 25 hours/month · Two-week sprints · Month-to-month.

**Rationale:** Single retirement. *Named admin + PM* → *Single point of contact + PM* per `lexicon.md` §service vocabulary. Same swap as the SAP page sidenote (`pages/sap.md` Change 3); plus-syntax separator and the four-beat survive intact.

**Priority:** P0

---

### Change 4 — Hero primary CTA

**Location:** `src/app/salesforce/managed-services/page.tsx:52–55`

**Current:**

> *(primary)* Start a managed services engagement · *(secondary)* See pricing

**Proposed:**

> *(primary)* Get a managed services proposal · *(secondary)* See pricing

**Rationale:** Same retirement as `pages/sap.md` Change 4. *Start a managed services engagement* — the buyer can't initiate an engagement from a button click, so the CTA over-promises the immediate next step. The locked Salesforce-managed-services CTA per `messaging-framework.md` §standard CTAs is *Get a managed services proposal* — verb-first, names the actual deliverable the form produces.

**Priority:** P0

---

### Change 5 — `What's included` body + `How it works` heading

**Location:** `src/app/salesforce/managed-services/page.tsx:65, 85`

**Current:**

> Line 65 (body): Managed services is not a rotating help-desk queue. It is a named team running an agreed block of hours each month against the backlog of work your Salesforce instance actually needs.
> Line 85 (heading): Named team. Hours per month. Two-week sprints. Month-to-month.

**Proposed:**

> Line 65 (body): Managed services is not a rotating help-desk queue. It is one team — your single point of contact and a project manager — running an agreed block of hours each month against the backlog of work your Salesforce instance actually needs.
> Line 85 (heading): Single point of contact. Hours per month. Two-week sprints. Month-to-month.

**Rationale:** Same two retirements as `pages/sap.md` Changes 5 and 6. (1) *A named team* → *one team — your single point of contact and a project manager* per `lexicon.md` §service vocabulary. (2) *Named team* in the heading → *Single point of contact*. Both substitutions match the locked phrasing across the SAP and Salesforce managed-services pages — voice consistency across the two surfaces.

**Priority:** P0

---

### Change 6 — Foundry-pillar block (Illuminate + Act)

**Location:** `src/app/salesforce/managed-services/page.tsx:30–38` — `foundryPillars[1]` and `foundryPillars[2]`

**Current:**

> *(02 · Illuminate)* Live dashboards. Overnight AI analysis. — Lens dashboards for every role and Prism reports written overnight so leadership has answers by 8 AM.
> *(03 · Act)* Agents watch, decide, and execute. — Agents and Otto take action across Salesforce and the rest of your stack — fully auditable, fully managed.

**Proposed:**

> *(02 · Illuminate)* Live dashboards. AI analysis on demand. — Lens dashboards for every role and Prism reports on demand — leadership gets the answers when they ask, not on a schedule the warehouse decides.
> *(03 · Act)* Agents propose. Reviewers approve. Foundry executes. — Agents and Otto propose plans across Salesforce and the rest of your stack — every action logged, attributed, reversible, and only on reviewer approval. Fully managed by RevenuePoint.

**Rationale:** Same as `pages/salesforce.md` Changes 3–4 and `pages/sap.md` Change 9. The Foundry-pillar block appears identically across three product pages (foundry-hub teaser, salesforce hub, SAP hub, salesforce managed services); the rewrite is the same on each surface for voice consistency.

**Priority:** P1

---

### Change 7 — Foundry teaser body (managed-services-flavored)

**Location:** `src/app/salesforce/managed-services/page.tsx:209–211`

**Current:**

> Once your Salesforce stays clean — month after month — Foundry connects the rest of your stack and delivers live dashboards, AI reports, and agents that take action. Fully managed by RevenuePoint.

**Proposed:**

> Once your Salesforce stays clean — month after month — Foundry connects the rest of your stack and delivers live dashboards, AI analysis on demand, and agents that propose, get approved, and execute across your systems. Fully managed by RevenuePoint.

**Rationale:** Two swaps mirroring the salesforce-hub Foundry teaser (`pages/salesforce.md` Change 5). (1) *AI reports* → *AI analysis on demand* (`lexicon.md` §AI clichés). (2) *Agents that take action* → *Agents that propose, get approved, and execute across your systems* (`lexicon.md` §audit-and-accountability vocabulary). The opening *Once your Salesforce stays clean — month after month* is on-voice and survives — names the unique value-add of the managed-services-to-Foundry pivot.

**Priority:** P1

---

### Change 8 — `salesforceManagedServices.ts` data file

**Location:** `src/data/salesforceManagedServices.ts:18, 53`

**Current:**

> Line 18: Your users open tickets with us directly. Login and permission issues, "how do I do X in Salesforce", one-off training questions — handled by a named admin who already knows your org.
> Line 53: One dedicated Salesforce administrator and one dedicated project manager — your single point of contact. No shared queues, no offshore routing, no rotating faces.

**Proposed:**

> Line 18: Your users open tickets with us directly. Login and permission issues, *"how do I do X in Salesforce,"* one-off training questions — handled by the senior admin who runs your engagement and already knows your org.
> Line 53: Your Salesforce administrator and a project manager — your single point of contact, with a team that knows your org. No shared queues.

**Proposed (cont.):** *(no further blocks)*

**Rationale:** Two retirements. (1) Line 18 — same pattern as `pages/sap.md` Change 8 (the SAP end-user-support body is structurally identical): *a named admin* → *the senior admin who runs your engagement* per `lexicon.md` §service vocabulary; punctuation tightens with ASCII straight quotes and italics on the inline question. (2) Line 53 — three retirements stack: *One dedicated Salesforce administrator and one dedicated project manager* → *Your Salesforce administrator and a project manager* (drop *dedicated* per `lexicon.md` §service-model clichés); add *with a team that knows your org* (the brand's locked continuity claim per `lexicon.md` §service vocabulary); drop *No shared queues, no offshore routing, no rotating faces* → *No shared queues* (geography ban per `lexicon.md` §service-model clichés; *no rotating faces* is also retired — the brand's continuity claim is now the *team that knows your business* phrasing, not the staffing-stability claim *the same faces*).

**Priority:** P0

---

## Out of scope, flagged

- **`engagementSteps`, `audienceSegments`, `managedServicesFaqs` data.** All three structures inherited from the SAP page pattern. Per-step copy is operationally specific per `voice-and-tone.md` §1; FAQ register per `context-playbooks.md` §technical docs. Protect.
- **`Pricing summary` section.** Lines 125–177 — the three-tier preview pattern with named pricing ($2,400 / $4,000 / Custom). On-voice; the *No long-term contract — cancel anytime.* closing line is the locked phrasing. Protect.
- **CRM Health Check link** (line 188–193). On-voice — *the fastest way to see what your instance actually needs before you commit*. Protect.
