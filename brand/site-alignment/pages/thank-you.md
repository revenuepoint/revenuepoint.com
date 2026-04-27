# Thank you — `/thank-you/`

> Source: `src/app/thank-you/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The thank-you page is on-voice. The hero (*Thanks — we'll be in touch within one business day.*), the body (*We review every submission personally. If your engagement looks like a good fit, we'll reach out to schedule an intro call.*), and the CTA (*Schedule a 30-minute intro*) all read tightly. The italicized *one business day* mechanic carries the receipt; the *good fit* phrasing here lands as a confirmation rather than a question (the contact-page question used the same words but in an off-voice header). 0 change blocks.

---

## Changes

*None required. Page passes the audit.*

---

## Out of scope, flagged for protection

- **Status pill** — *Received · in queue* — on-voice; signals receipt without padding.
- **Hero h1** — *Thanks — we'll be in touch within one business day.* — italicized noun (*one business day*) is the locked receipt; the hyphen-em-dash mechanic per `editorial-style.md` §punctuation. Protect.
- **Body** — *We review every submission personally. If your engagement looks like a good fit, we'll reach out to schedule an intro call.* — direct, named action, locked phrasing. The *if your engagement looks like a good fit* construction here lands as confirmation logic (the buyer just submitted; we're naming what happens next), not as a hedged question. Protect.
- **CTA** — *Schedule a 30-minute intro* — verb-first, locked CTA pattern per `messaging-framework.md` §standard CTAs. Protect.

If post-launch we want to surface specific next steps (e.g. *Pre-fill your scoping call calendar* / *Read the foundry-pricing breakdown*), the page would benefit from one secondary CTA — but that's an enhancement, not a voice fix.
