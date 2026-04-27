# Salesforce training — `/salesforce/training/`

> Source: `src/app/salesforce/training/page.tsx` + `src/components/training/PlaybookWalkthrough.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The training page is the cleanest sub-page on the site — the hero (*Salesforce training that leaves a Playbook embedded in your org*), the *Generic Salesforce training fades the week after the workshop because it teaches the platform, not your configuration. Ours doesn't* differentiation framing, the four-step engagement, and all five FAQ answers all read on-voice. The CTA *Schedule a training scoping call* matches the locked CTA from `messaging-framework.md` §standard CTAs; the *Get a training playbook* alternate from the locked CTA table is the deliverable-focused phrasing for downstream surfaces. 2 change blocks — 1 P1, 1 P2.

---

## Changes

### Change 1 — Hero CTA — light alignment

**Location:** `src/app/salesforce/training/page.tsx:85–87`

**Current:**

> *(primary)* Schedule a training scoping call

**Proposed:**

> *(primary)* Schedule a training scoping call *(unchanged — on-voice)*

**Rationale:** No change required. The CTA is on the locked table per `messaging-framework.md` §standard CTAs. Listed here as a *protected* change block to prevent accidental drift in Phase 2 implementation.

**Priority:** *(no change — protected)*

---

### Change 2 — Hero body — light tightening

**Location:** `src/app/salesforce/training/page.tsx:83`

**Current:**

> Generic Salesforce training fades the week after the workshop because it teaches the platform, not your configuration. Ours doesn't — every engagement produces a custom Playbook authored to your fields, processes, and reports, then embedded inside Salesforce where the work happens. Live training delivers it. The Playbook keeps it.

**Proposed:**

> *(unchanged — on-voice)*

**Rationale:** Listed for protection. The body delivers the brand's *negative-space* mechanic per `voice-and-tone.md` §writing principles (*Ours doesn't* names the alternative being rejected) and closes with the locked three-beat *Live training delivers it. The Playbook keeps it.* — exactly the cadence-and-receipt structure the voice system prescribes. Do not rewrite.

**Priority:** *(no change — protected)*

---

### Change 3 — Lead-form section heading + body

**Location:** `src/app/salesforce/training/page.tsx:131–134`

**Current:**

> *(heading)* Tell us about your Salesforce training and Playbook needs
> *(body)* We will confirm fit, scope the engagement, and send a statement of work.

**Proposed:**

> *(heading)* Tell us about your Salesforce training and Playbook needs
> *(body)* We confirm fit, scope the engagement, and send a statement of work — typically within two business days.

**Rationale:** Two light swaps. (1) *We will confirm fit* → *We confirm fit* — present-tense default per `editorial-style.md` §voice and grammar. (2) Add *typically within two business days* — the operationally specific receipt that distinguishes our scoping cadence (`voice-and-tone.md` §earn every adjective with a proof point — *send a statement of work* is the action; *within two business days* is the receipt that earns the buyer's trust in the timeline).

**Priority:** P2

---

### Change 4 — `PlaybookWalkthrough` component

**Location:** `src/components/training/PlaybookWalkthrough.tsx`

**Status:** *To inspect during Phase 2 implementation.* Component-level strings not currently surfaced in the audit's regex pass; if any retired phrases (`named [role]`, `dedicated [role]`, `mid-market`, `overnight`, `Get started`) appear, add them as additional change blocks under this section.

**Priority:** TBD (likely P2 if any found)

---

## Out of scope, flagged

- **Hero, sidenote, four-step engagement, FAQ block.** All on-voice. The *Generic Salesforce training fades the week after the workshop* sentence is the page's load-bearing differentiation; protect. *Live training delivers it. The Playbook keeps it.* is a perfect three-beat-style closer.
- **Cross-link to Health Check** (line 119–125). On-voice — names the next-best-step intelligently. Protect.
