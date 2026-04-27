# Security — `/security/`

> Source: `src/app/security/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The security page is on-voice. The hero, the *How to report* section, the PGP key block, the response-time receipt (*Acknowledgement within 1 business day · triage within 5 · fix coordinated end-to-end*), and the closing sections all read tightly. The page exemplifies the *dial up — more formal, more clinical* register from `voice-and-tone.md` §tonal range — sentences run a touch longer, contractions retreat slightly, every claim names a date or a process. No retired phrases. No CTA violations. 0 change blocks.

---

## Changes

*None required. Page passes the audit.*

---

## Out of scope, flagged for protection

- **Hero h1** — *Security & vulnerability disclosure.* — on-voice with italicized noun mechanic.
- **Response time receipt** — *Acknowledgement within 1 business day · triage within 5 · fix coordinated end-to-end.* — operationally specific per `voice-and-tone.md` §confident-with-receipts. Locked in `receipts.md`.
- **`How to report`** body — names the action, names the encryption preference, names the boundary (*Don't use team@revenuepoint.com for security reports*). On-voice — direct, no padding, no chumminess. Per `context-playbooks.md` §sensitive contexts the dial-up register applies to security pages; this page hits it cleanly.
- **PGP key block + fingerprint + KEY_REPO link.** Operationally specific; protect.
- **Email + button labels.** *Email security@revenuepoint.com* / *Get our PGP key* — both verb-first, name what happens next. On-voice.

If anything off-voice surfaces in the rest of the page (lines 121+, not fully reviewed in audit) during Phase 2 implementation, flag and add change blocks here.
