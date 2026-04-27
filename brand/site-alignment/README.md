# Site copy alignment — pre-launch

> Snapshot artifact. The voice and tone system at [`tmp/voice-and-tone-system/`](../../tmp/voice-and-tone-system/) (later [`brand/`](../)) is the durable spec. This directory is the working set for the final pre-launch copy pass against revenuepoint.com — produced once, executed against, then archived.

Tracker: [revenuepoint/revenuepoint.com#10](https://github.com/revenuepoint/revenuepoint.com/issues/10).

## What's here

| File | Purpose |
|---|---|
| [`audit.md`](./audit.md) | Site-wide health check against the voice system. Headline finding, what's working, patterned failures, IA flags, open questions, out-of-scope follow-ups. |
| [`open-questions.md`](./open-questions.md) | Batched founder-answer questions for stale facts, receipts, named entities, capabilities, address, pricing display. **Phase 0 deliverable — blocks every later phase.** |
| [`receipts.md`](./receipts.md) | Canonical receipts table locked from founder answers. Every per-page rewrite cites this. |
| [`pages/`](./pages/) | One file per page audited (~25 files). `# [Page] — [URL]` → Summary → Changes (Current → Proposed → Rationale → Priority). |
| [`microcopy.md`](./microcopy.md) | Site-wide microcopy (nav, footer, lead form, button defaults, meta titles/descriptions, errors, confirmations). One-place definition for repeated elements. |
| [`implementation-checklist.md`](./implementation-checklist.md) | Flat sortable table — every change ID across page files and microcopy. The implementer works through this linearly. |

## Reading order

1. Founder reads [`audit.md`](./audit.md) and answers anything still open in [`open-questions.md`](./open-questions.md).
2. Founder skims [`implementation-checklist.md`](./implementation-checklist.md) and confirms priorities.
3. Implementer works through the checklist in priority order (P0 → P1 → P2), reading the per-page file for context as needed.
4. [`microcopy.md`](./microcopy.md) is the source of truth for any copy that appears in multiple places.

## Relationship to the voice system

This directory is a **snapshot in time** — the punch list for the final pre-launch pass. The voice docs (`tmp/voice-and-tone-system/` → moving to `brand/` in Phase 4) are the **durable spec**. Any new pages built after launch reference the voice docs directly, not this audit. After launch, this directory archives to `brand/_archive/site-alignment-2026-04/`.
