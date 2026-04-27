# SAP pricing — `/sap/pricing/`

> Source: `src/app/sap/pricing/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The SAP pricing page is the cleanest sub-page on the site — short, focused, on-voice. The locked SAP pricing-display rule per `receipts.md` is *Contact us for a custom quote* (no public starting price), and the page implements that rule cleanly. The intake list (i, ii, iii, iv) is operationally specific. Two light improvements: the CTA *Get a custom quote* could align tighter with the locked SAP CTA, and the lead-form section heading *Tell us about your SAP requirements.* could lead with action verb. 2 change blocks — both P1.

---

## Changes

### Change 1 — CTA alignment

**Location:** `src/app/sap/pricing/page.tsx:46`

**Current:**

> *(Button)* Get a custom quote

**Proposed:**

> *(Button)* Schedule an SAP scoping call

**Rationale:** *Get a custom quote* names the deliverable but the form is a lead form, not a quote-builder; the buyer's actual next step is a scoping conversation that produces the quote. The locked SAP CTA per `messaging-framework.md` §standard CTAs is *Schedule an SAP scoping call* — verb-first, names the conversation. *Get a custom quote* could survive as a label on the *form submit* button after the buyer commits to the conversation.

**Priority:** P1

---

### Change 2 — Lead-form section heading

**Location:** `src/app/sap/pricing/page.tsx:54`

**Current:**

> Tell us about your SAP requirements.

**Proposed:**

> Tell us about your SAP environment — modules, users, integrations.

**Rationale:** Light operational specificity per `voice-and-tone.md` §1. *Requirements* is a generic noun; the substitute names the three things the form actually asks about (matching the intake list i, ii, iii, iv just above). Same length, more useful framing for the buyer.

**Priority:** P1

---

## Out of scope, flagged

- **Hero, body, intake list, button placement.** All on-voice. *Every SAP implementation is different. We scope pricing based on your business size, module requirements, user count, and integration complexity. No off-the-shelf packages — just a plan that fits your operations.* is the locked SAP pricing-on-request rule per `receipts.md`. Protect.
- **`SAP pricing built around your business.` heading.** On-voice, italics on *your* matches the page's mechanic. Protect.
