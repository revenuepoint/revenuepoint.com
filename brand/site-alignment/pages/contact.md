# Contact — `/contact/`

> Source: `src/app/contact/page.tsx` + `src/app/contact/ContactFormSection.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

Two changes in concentrated order. (1) The hero header is a question that lands closer to chummy than confident — *Let's find out if we're a good fit?* — and the body uses the retired *we vet / we only work with clients where we're confident we can deliver* phrasing. (2) The meta description carries the same phrasing. The contact details (email · phone · address) are locked in `receipts.md` and on-voice. 2 change blocks — both P0.

---

## Changes

### Change 1 — Hero heading + body

**Location:** `src/app/contact/page.tsx:22–30`

**Current:**

> *(eyebrow)* Get in touch
> *(heading)* Let's find out if we're a *good fit*.
> *(body)* We respond to every submission within one business day. We're selective about the engagements we take on — not to be difficult, but because we only work with clients where we're confident we can deliver results.

**Proposed:**

> *(eyebrow)* Get in touch
> *(heading)* Schedule a 30-minute scoping call.
> *(body)* We respond to every submission within one business day. We scope every engagement around real value — discovery happens before the contract, and the engagements we take on get the team's full attention because the scope is right and the path is clear.

**Rationale:** Two retirements. (1) *Let's find out if we're a good fit?* — questions read uncertain in marketing headers (`messaging-framework.md` §headlines to avoid). The substitute leads with the locked Salesforce-consulting CTA verb (*Schedule a 30-minute scoping call*) used as the heading itself — this is the one surface where the heading and the CTA can converge because the entire page is a contact form. (2) *We're selective about the engagements we take on... we only work with clients where we're confident we can deliver results* — retired transactional posture (`lexicon.md` §service-model clichés — *we decline engagements where we don't see a clear path to ROI*). Substitute *We scope every engagement around real value* — same selectivity, framed as commitment to outcomes per `lexicon.md` §audit-and-accountability vocabulary. The closing sentence (*the engagements we take on get the team's full attention...*) is the locked phrasing from `examples-library.md` §1.

**Priority:** P0

---

### Change 2 — Meta description

**Location:** `src/app/contact/page.tsx:8–13`

**Current:**

> Get in touch. We respond within one business day and only take engagements where we can deliver measurable ROI.

**Proposed:**

> Get in touch. We respond within one business day and scope every engagement around real value — discovery happens before the contract.

**Rationale:** Same retirement as Change 1. *Only take engagements where we can deliver measurable ROI* → *scope every engagement around real value — discovery happens before the contract* per `lexicon.md` §audit-and-accountability vocabulary. The brand's selectivity-as-commitment framing instead of the transactional ROI-screen.

**Priority:** P0

---

## Out of scope, flagged

- **Direct lines block.** Lines 32–48. Email (`team@revenuepoint.com`), phone (`+1 (332) 900-1150`), address (`Three World Financial Center, 200 Vesey Street, 24th Floor, New York, NY 10281`) — all locked in `receipts.md` per founder approval. Protect.
- **`Book an intro call →` direct link.** Lines 50–58. On-voice; the direct calendar link survives. (Note: *Book* is acceptable here as a calendar verb; the locked CTA conventions apply to form-button labels and section CTAs, not to in-text inline calendar invitations.)
- **`ContactFormSection` component.** Inspected in scope of `src/components/ui/LeadForm.tsx` — fields and labels covered in [`microcopy.md`](../microcopy.md). Form-level changes land there.
