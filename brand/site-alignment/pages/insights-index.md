# Insights index — `/insights/`

> Source: `src/app/insights/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The Insights index page is the second-most-visible *mid-market* hit on the site (after the brand page font sample and the foundry meta description). Two locations: meta description (line 9) and hero body (line 33). Both use *mid-market operations* in nearly the same phrasing. The hero h1 (*Notes on orchestration.*) is on-voice. The byline (*Insights · The RevenuePoint quarterly*) is on-voice. The featured-post layout, post grid, and email signup section are all clean. 2 change blocks — both P0.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/insights/page.tsx:8–11`

**Current:**

> Notes on orchestration, mid-market operations, and the work we do inside our customers' systems.

**Proposed:**

> Notes on orchestration, growing-business operations, and the work we do inside our customers' systems.

**Rationale:** Single retirement. *Mid-market operations* → *growing-business operations* per `lexicon.md` §audience-segment language. The rest of the meta description — *Notes on orchestration / inside our customers' systems* — is on-voice and survives.

**Priority:** P0

---

### Change 2 — Hero body

**Location:** `src/app/insights/page.tsx:33`

**Current:**

> Essays on mid-market operations, the systems gap, and how we're closing it at RevenuePoint — from the people doing the work.

**Proposed:**

> Essays on growing-business operations, the systems gap, and how we're closing it at RevenuePoint — from the people doing the work.

**Rationale:** Same retirement as Change 1. *Mid-market operations* → *growing-business operations* per `lexicon.md` §audience-segment language. The phrasing *the systems gap, and how we're closing it at RevenuePoint — from the people doing the work* is the locked phrasing for the Insights index — names the editorial premise (the systems gap as the recurring theme) and the byline reality (*from the people doing the work* — first-person founder voice signal per `context-playbooks.md` §newsletter and Insights blog). Protect that survives.

**Priority:** P0

---

## Out of scope, flagged for protection

- **Hero h1 — *Notes on orchestration.*** Italicized noun (*orchestration*) is the locked Foundry category claim used as the editorial signature. On-voice. Protect.
- **Byline** — *Insights · The RevenuePoint quarterly* — on-voice; names the cadence (quarterly), names the brand. Protect.
- **Decorative `I`** — large background italicized capital `I` at the top-right of the hero. Decorative-only mechanic per `editorial-style.md` §typography. Protect.
- **Featured + post grid + EmailSignup component.** All inspected; no inline strings beyond the existing components. The post bodies themselves (`src/content/insights/*.tsx`) carry 5 known voice violations across 8 posts — flagged as a separate Phase 4 follow-up workstream per [`audit.md`](../audit.md) and [`receipts.md`](../receipts.md).

---

## Out of scope (Insights blog post bodies)

The 8 posts at `src/content/insights/*.tsx` (`agent-writes-qc-verifies`, `entity-resolution`, `how-data-gets-into-your-warehouse`, `how-anomaly-detection-actually-works`, `how-to-do-ai-reporting-right`, `the-data-warehouse-foundation`, `the-semantic-layer`, `what-orchestration-actually-means`) contain 5 known regex violations (mostly *named analyst* / *named approver* / *mid-market business*). Per the locked scope decision, these are **out of scope for this round** — they ship to a separate Phase 4 follow-up issue for post-by-post grader pass and single-phrase swaps.
