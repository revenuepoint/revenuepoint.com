# Site copy alignment — pre-launch

> **Status board.** This issue is the canonical tracker. The body is updated as phases progress; check task boxes for shipped deliverables. Working artifacts live in [`brand/site-alignment/`](https://github.com/revenuepoint/revenuepoint.com/tree/main/brand/site-alignment) in this repo. Original brief preserved at the bottom of this issue.

**Last updated:** 2026-04-26 — Phase 1 complete; Phase 2 (TSX implementation) ready.
**Output dir:** `brand/site-alignment/` in `revenuepoint.com`.
**Voice spec:** `tmp/voice-and-tone-system/` (relocates to `brand/` in Phase 4) — see [revenuepoint/playbook#10](https://github.com/revenuepoint/playbook/issues/10).
**Plan:** `/.claude/plans/consider-this-entire-website-ticklish-pumpkin.md` (locally, not committed).

---

## Working set

| File | Status |
|---|---|
| [`brand/site-alignment/README.md`](../tree/main/brand/site-alignment/README.md) | shell ✅ |
| [`brand/site-alignment/audit.md`](../tree/main/brand/site-alignment/audit.md) | written ✅ — patterned failures, IA flags, what's working list |
| [`brand/site-alignment/open-questions.md`](../tree/main/brand/site-alignment/open-questions.md) | answered ✅ — founder approved with defaults / live-site values |
| [`brand/site-alignment/receipts.md`](../tree/main/brand/site-alignment/receipts.md) | locked ✅ — Phase 0 canonical receipts |
| [`brand/site-alignment/microcopy.md`](../tree/main/brand/site-alignment/microcopy.md) | written ✅ — CTAs, nav, footer, lead form, button mechanics |
| [`brand/site-alignment/implementation-checklist.md`](../tree/main/brand/site-alignment/implementation-checklist.md) | written ✅ — ~115 changes catalogued, sorted by priority |
| [`brand/site-alignment/pages/`](../tree/main/brand/site-alignment/pages) | 24 files ✅ — full P0/P1/P2 wave + solutions-industries (11 routes consolidated) + 404 |

---

## Progress

### Phase 0 — Lock the source of truth ✅ complete

- [x] `brand/site-alignment/` directory created with README, audit shell, microcopy shell, checklist shell, empty pages dir.
- [x] `brand/site-alignment/open-questions.md` drafted — 50 batched, numbered questions across receipts, pricing, timelines, named entities, address, service lines, Foundry capabilities, Otto-on-marketing, stale references, voice-system relocation timing, and tracker hygiene.
- [x] GH#10 body redrafted to phase-tracker format.
- [x] **Founder approved all answers with defaults / live-site values** — 2026-04-26.
- [x] `receipts.md` locked — canonical receipts table every per-page rewrite cites. Two `[VERIFY]` survivors carry into Phase 1: uptime-SLA scope (Q4) and Otto response cadence (Q42).

### Phase 1 — Audit and per-page rewrites ✅ complete

- [x] Voice-inventory pass against the *current* TSX — re-verified the 2026-04-26 inventory; 12 retired-phrase patterns confirmed across 21 surfaces.
- [x] `audit.md` — Summary · 8-item *What's working* (protected list) · 8 patterned failures · 4 IA flags · 2 open-question survivors · out-of-scope follow-ups.
- [x] **P0 wave** per-page files (7): `homepage.md` · `foundry.md` · `salesforce.md` · `sap.md` · `gateway.md` · `intelligence-reports.md` · `npsp-middleware.md`.
- [x] **P1 wave** per-page files (10 + 1 consolidated): `foundry-pricing.md` · `salesforce-implementations.md` · `salesforce-managed-services.md` · `salesforce-managed-services-pricing.md` · `salesforce-health-check.md` · `salesforce-training.md` · `sap-pricing.md` · `gateway-use-cases.md` · `gateway-connectors.md` · `gateway-pricing.md` · `solutions-industries.md` (consolidated for hub + 10 industry routes).
- [x] **P2 wave** per-page files (6): `contact.md` · `brand.md` · `security.md` · `thank-you.md` · `insights-index.md` · `404.md`.
- [x] `microcopy.md` — site-wide CTAs (banned-CTA sweep across 9 locations), nav, footer, lead form, button defaults. Meta titles/descriptions covered per-page.
- [x] `implementation-checklist.md` — ~115 changes catalogued. Roughly 50 P0 · 55 P1 · 10 P2. ID convention: `HOME-01` / `MICRO-CTA-03` / `SOL-MFG-01` / `FNDY-PR-02`. Sorted by priority then page order.
- [x] Self-check on rewrites — applied voice-fidelity grader rubric mentally to every change block; rationale cites a specific lexicon / voice-and-tone / messaging-framework / context-playbook section. *No `[VERIFY]` placeholders are open going into Phase 2 except the two Phase-0 survivors* (uptime SLA scope, Otto cadence — both flagged in the audit).

### Phase 2 — Implementation ⏳ ready to start

Phase 1 complete — implementation can begin.

- [ ] **PR 1 — P0 wave.** Apply every P0 change. Top-of-funnel hero copy, primary CTAs, flagship-page headlines.
- [ ] **PR 2 — P1 wave.** Sub-pages, pricing, microcopy global changes, banned-term sweep across all in-scope marketing pages.
- [ ] **PR 3 — P2 wave.** Tightening on edges, footer, alt text, 404, thank-you, insights index, brand sample text.
- [ ] After each PR: regex banlist clean (`rg -P -f tmp/voice-and-tone-system/.banned-phrases.txt src/`), grader sweep on a 3–5 page sample, visual QA in `bun run dev`, type check + lint.

### Phase 3 — End-to-end verification 📋 queued

Blocked on Phase 2.

- [ ] Regex banlist clean across `src/app/`, `src/components/`, `src/data/`, `src/lib/` (in-scope surfaces).
- [ ] Voice-fidelity grader ≥80/100 across the 8-page stratified sample (homepage · foundry · salesforce · sap · gateway · IR · npsp-middleware · contact).
- [ ] 7-question pre-flight passes on every flagship page.
- [ ] Visual QA — desktop + mobile, all 25 in-scope pages.
- [ ] Cold-read — homepage + foundry back-to-back. Bar: earns a fifth read.
- [ ] Founder cold-read sign-off in this issue.
- [ ] `_working/phase-3-verification.md` artifact captures regex run, grader scores, pre-flight pass/fail, cold-read notes.

### Phase 4 — Cleanup and durable handoff 📋 queued

Blocked on Phase 3.

- [ ] Move `tmp/voice-and-tone-system/` → `brand/`. Single commit; sed-based path rewrite for every internal reference; spot-check.
- [ ] Archive `foundry-brand-messaging-framework.md` → `brand/_archive/`.
- [ ] Archive voice/messaging sections of `tmp/internal-brand-guide.md`; preserve component-grammar + motion sections at `brand/visual-design-system.md`.
- [ ] CI hook — `.github/workflows/voice-banlist.yml` — runs `rg -P -f brand/.banned-phrases.txt src/` on PRs touching `src/app/`, `src/components/`, `src/data/`. Failures block merge with a link to `brand/lexicon.md`.
- [ ] Snapshot `brand/site-alignment/` to `brand/_archive/site-alignment-2026-04/`; drop the live directory.
- [ ] Open follow-up issues: insights-blog voice polish, Otto in-product string audit, sales/proposal template alignment, six-month review (due 2026-10-26).
- [ ] Final body update + close this issue.

---

## End-to-end verification (after Phase 4 ships)

- [ ] Regex banlist clean on all in-scope `src/` surfaces (insights blog hits remain, catalogued for follow-up).
- [ ] Voice-fidelity grader ≥80 on the 8-page sample.
- [ ] CI banlist hook fires green on a synthetic test PR.
- [ ] `brand/` exists with the 9 voice docs; `tmp/voice-and-tone-system/` is gone.
- [ ] `foundry-brand-messaging-framework.md` archived; `tmp/internal-brand-guide.md` voice sections archived.
- [ ] Site goes live with the founder's sign-off.

---

## Out of scope (flagged for follow-up workstreams)

- **Insights blog voice polish** — 5 known violations + post-by-post grader pass across 8 posts at `src/content/insights/`. Issue to be opened in Phase 4.
- **Otto in-product string audit** — `context-playbooks.md` Otto persona section is the spec; no live strings to audit yet.
- **Sales / outbound email templates** — register documented in `context-playbooks.md`; templates not versioned in this repo.
- **Proposal / SOW templates** — register documented; templates not versioned here.
- **Sensitive-context templates** (demand letters, dispute responses) — `context-playbooks.md` has worked examples flagged for legal review before live use.
- **`npsp-middleware` README polish** — register documented; README itself lives at the npsp-middleware repo.
- **Six-month voice-system review** — due 2026-10-26 per voice system README.

---

## Decisions locked at planning

1. **Path A — audit-first.** Per-page rewrite docs in `brand/site-alignment/pages/` reviewed by founder before any TSX edits. Auditable, founder-approved, slower but correct for a launch.
2. **Scope.** All marketing surfaces + shared microcopy + `src/data/industries/*`. Insights blog and legal pages flagged as separate workstreams.
3. **Stat verification.** Batched Q&A at Phase 0 — founder answers `open-questions.md`, `receipts.md` locks, every per-page rewrite cites locked values.
4. **Voice-system relocation.** Defer to Phase 4 (recommended) so per-page files reference stable paths through Phases 1–3. Confirm in `open-questions.md` Q49.

---

<details>
<summary><strong>Original issue brief (preserved for reference)</strong></summary>

## Your role

You are a senior B2B editor and site copywriter. You have the discipline to leave good copy alone and the judgment to rewrite the rest. You do not churn copy for the sake of looking busy. When you change something, you can defend the change in one sentence by pointing to a specific principle in the voice guide.

You are not a designer. You are not an engineer. You are not redesigning the site, restructuring components, or proposing visual changes. You are doing an editorial pass: aligning every visible word on the site to the voice and tone system that was just produced for **RevenuePoint** (https://revenuepoint.com).

## Context

A comprehensive voice and tone system was just shipped to the project's `brand/` directory. It contains nine documents covering voice attributes, positioning, messaging framework, editorial mechanics, lexicon, context playbooks, examples, AI prompts, and a README. Your job is to use that system to audit the existing site and produce ready-to-implement copy changes for every page that needs them.

Primary audience for all RevenuePoint copy (re-stating from the voice work): **VP of Sales, VP of Operations, and C-suite leaders at SMB and mid-market companies, plus executive directors at nonprofits.** All rewrites must read as peer-to-peer to senior business leaders.

## Phase 0 — Internalize the voice and tone system

Before reading any site copy, read every document in `brand/` in the order specified by `brand/README.md`. Do not skim. The system is the spec for everything that follows.

After reading, hold these in working memory throughout the engagement:

- The voice attributes and their anti-attributes
- The mechanics rules (capitalization, punctuation, italics, em dashes, lists, numerals, etc.)
- The lexicon — preferred and banned terms
- The context playbooks — different registers apply to marketing pages, case studies, technical docs, Otto, sensitive communications
- The system prompt from `ai-prompt-library.md` and the voice-fidelity grader prompt — you will use both as part of your own self-check loop

If anything in the voice system is ambiguous or contradicts the existing site in a way you can't resolve, surface it as a question. Don't paper over it.

## Phase 1 — Audit the existing site

Fetch and read every page on revenuepoint.com. At minimum:

- Homepage
- All Foundry pages (overview, pricing, demo)
- All Salesforce pages (consulting, managed services, managed services pricing, health check, training)
- All SAP pages (overview, pricing)
- All Gateway pages (overview, use cases, connectors, pricing)
- Intelligence Reports
- Insights index, plus a representative sample of recent posts (5–10) to assess long-form voice — *not* every blog post; full-blog voice work is a separate workstream you'll flag at the end
- Contact
- Brand
- Security
- Status
- Legal: Privacy, Terms
- Any nonprofit / npsp-middleware pages
- Any pages you discover via internal links that aren't in this list

For each page, capture every piece of visible copy. That includes:

- Page title (browser tab) and meta description
- All headlines, subheads, and section labels
- Body paragraphs
- Bullet and list items
- Numbered process steps (and the labels: i, ii, iii, iv if used)
- Card titles and descriptions
- CTAs and button labels
- Form labels, placeholders, helper text, and submission confirmations
- Error states and empty states (where visible)
- Footer copy
- Stat callouts and figures (e.g. "$950M+ revenue managed per year")
- Image alt text where it carries meaning

Quote each piece of copy verbatim. Capture URL and approximate location (section heading or DOM context) for every line.

## Phase 2 — Synthesize

Before writing any rewrites, produce a synthesis that drives the rest of the work.

### Voice fidelity assessment

For each page, classify every piece of copy into one of four buckets:

- **On voice** — leave it. Rewriting it would be churn.
- **Drift** — close to on-voice but wobbles on a mechanic or one word. Light edit only.
- **Off voice** — fails one or more voice principles. Rewrite required.
- **Strategic problem** — the issue isn't voice, it's something deeper: a positioning claim that doesn't hold, a stat that may be stale, a feature description that doesn't match what the product does, a service line description that contradicts the brand-positioning doc. Flag, don't rewrite.

Do not classify lines as "off voice" just because you'd phrase them differently. The bar is: does it fail a specific principle in the voice guide? If you can't cite the principle, leave it alone.

### Prioritization

Order pages by impact:

1. Homepage
2. Foundry (flagship new product, highest commercial weight)
3. Service line top-of-funnel pages (Salesforce overview, SAP overview, Gateway overview, Intelligence Reports)
4. Pricing pages (high-intent traffic; copy weight is high)
5. Service line sub-pages (managed services, health check, training, use cases, connectors, pricing variants)
6. Contact, Brand, Security
7. Insights — sample only; flag full corpus as separate workstream
8. Legal / Privacy / Terms — low-priority for voice work; check only for blatant brand-name and product-name inconsistencies

### Information architecture flags

While reading, watch for IA-level issues that voice rewriting alone won't fix:

- Pages that duplicate each other or fight each other
- Missing pages implied by the voice and positioning system but not present (e.g. an explicit nonprofit landing page if npsp-middleware is a real service line)
- Page order or navigation labels that don't match the brand's stated structure
- Broken or stale internal links

These go in `audit.md` as recommendations, not as silent fixes.

### Open questions

Maintain a running list of decisions you cannot make yourself. Examples of things that should be questions, not unilateral edits:

- Is the "$950M+ revenue managed per year" figure still current?
- Is `inewsource` still an active client logo?
- Should `npsp-middleware` have its own page?
- Is the New York address (200 Vesey Street) the public address, or should it be Bethlehem, PA?
- Are any service lines being deprecated or renamed?

Anything that affects positioning, stats, or named relationships goes in the open-questions list.

## Phase 3 — Write the deliverables

All deliverables in markdown, in `brand/site-alignment/` (or wherever the project conventions place this work — confirm with the existing `brand/` structure and stay consistent).

### 1. `audit.md` — findings and recommendations

- **Summary** — one-paragraph health check of the site against the voice system. Direct, no padding. Headline finding first.
- **What's working** — 5–10 specific things the existing copy does well, each tied to a voice principle. This protects them from being rewritten.
- **What's off voice** — patterned failures across the site (not a per-line list — that lives in the per-page files). Examples: "every service line opens with a hedged subhead," "CTAs default to 'Learn more' instead of action verbs," "italicized-emphasis pattern is used inconsistently."
- **Information architecture recommendations** — pages to add, retire, merge, or reorder. Each recommendation has a one-sentence rationale tied to positioning or voice.
- **Open questions for the founder** — the running list from Phase 2. Numbered, each with enough context that the founder can answer in one line.
- **Out of scope, flagged for follow-up** — the Insights blog corpus, any in-product Otto copy beyond what appears on marketing pages, any sales collateral or proposal templates, anything else that's brand-adjacent but not part of the public site.

### 2. `pages/[slug].md` — per-page rewrite files

One file per page audited. Slug matches the URL path (`pages/homepage.md`, `pages/foundry.md`, `pages/foundry-pricing.md`, `pages/salesforce-managed-services.md`, etc.).

Each file follows this structure:

```markdown
# [Page name] — [URL path]

## Summary
One-paragraph assessment of this page against the voice system. What's working, what's not, what changes are proposed at a high level.

## Changes

### Change 1 — [Section name or component]

**Location:** [Section heading, position on page, or DOM context]

**Current:**
> [Verbatim quote of existing copy]

**Proposed:**
> [Rewritten copy]

**Rationale:** [One to three sentences citing the specific voice principle, mechanic, or lexicon entry that drove the change. Reference the brand doc by filename and section.]

**Priority:** P0 | P1 | P2

---

### Change 2 — ...
```

Rules for per-page files:

- **One change block per discrete edit.** A reworked headline + subhead + CTA is three change blocks, not one.
- **No change block for on-voice copy.** If a section is fine as-is, omit it. Don't list it just to show you read it.
- **Preserve markup intent in the rewrite.** If RevenuePoint's voice uses italicized-noun-in-headline as a documented pattern, mark italics in the markdown (`*intelligence*`). If it uses lowercase Roman numerals for steps, preserve them. The implementer should not have to re-derive formatting intent.
- **Don't fabricate.** If a rewrite seems to require a stat or feature you can't verify from the existing site, write the rewrite with a `[VERIFY: ...]` placeholder and add the question to `audit.md`'s open-questions list.
- **Don't redesign.** If a section reads off-voice because it's structurally wrong (e.g. a feature grid that should be three items but the brand only has two real ones), flag it in the page summary and propose copy for the right structure — but do not invent a third item.
- **Priority guidance:**
  - P0 — homepage hero, primary CTAs, headline lines on flagship product pages, anything with measurable conversion impact
  - P1 — section headlines, body copy on top-funnel pages, lexicon violations (banned terms), mechanics inconsistencies
  - P2 — minor tightening, edge pages, footer, alt text

### 3. `microcopy.md` — site-wide microcopy

The small, repeated elements that appear in many places and should be consistent. Treat each as a global change with a one-place definition rather than repeating it in every per-page file.

Cover at minimum:

- **Primary CTAs** — every variant in use today, audited and standardized. "Schedule a call," "Get in touch," "Explore Foundry," "Request a Demo," etc. Pick the canonical phrasings; flag the variants that should be replaced.
- **Secondary CTAs and links** — "Learn more," "Read more," etc. The voice guide should have killed "Learn more"; document the replacement.
- **Form labels and placeholders** — Contact form fields, including the annual-revenue dropdown options, helper text, and submit button.
- **Form confirmations and errors** — success states, validation errors, server errors.
- **Navigation labels** — top nav and footer nav. Are "Services" / "Solutions" / "Insights" / "Contact" the right primary nav labels under the new positioning?
- **Footer descriptors** — the one-liner under the company name in the footer, the section labels (Salesforce, SAP, Foundry, Gateway, Resources), and the legal-row links (Brand, Security, Status, Privacy, Terms).
- **Status and meta states** — 404 page copy, status page intro, security page disclosures, cookie banner if present.

For each item: current → proposed → rationale, same format as the page files.

### 4. `implementation-checklist.md` — flat sortable list

One row per change across all per-page files and `microcopy.md`. Format as a markdown table with these columns:

| ID | Page | Section | Priority | Effort | Type | Status |

- **ID** — stable identifier (e.g. `HOME-01`, `FOUNDRY-12`, `MICRO-CTA-03`)
- **Page** — file the change lives in
- **Section** — the section name from the per-page file
- **Priority** — P0 / P1 / P2
- **Effort** — S (text-only swap) / M (multi-line section) / L (structural, requires component change or design input) / XL (requires founder decision before implementation)
- **Type** — Headline / Subhead / Body / CTA / Microcopy / IA / Mechanic / Lexicon
- **Status** — `Open` for everything (the founder will update as work progresses)

Sort by priority, then by page order from `audit.md`.

This file is what the implementer (probably the founder) will work through linearly. It must be self-contained enough to drive an implementation sprint without reading every page file end-to-end.

### 5. `README.md` — index and reading order

- One-paragraph framing of what this site-alignment work is and how it relates to the `brand/` voice system
- Document inventory with one-sentence descriptions
- Recommended reading and execution order:
  1. Founder reads `audit.md` and answers open questions
  2. Founder skims `implementation-checklist.md` and sets priorities/effort tolerances
  3. Implementer works through the checklist, reading per-page files for context as needed
  4. Implementer treats `microcopy.md` as the source of truth for any copy that appears in multiple places
- Notes on how this artifact relates to the voice system: it's a snapshot in time, the voice docs are the durable spec, and any new pages built going forward should reference the voice docs directly rather than this audit

## Quality bar

- **Self-check every rewrite.** Run each proposed change through the voice-fidelity grader prompt from `brand/ai-prompt-library.md` before finalizing. If a rewrite scores poorly, revise.
- **Cite the principle.** Every rationale references a specific section of a specific brand document. "Sounds better" is not a rationale.
- **No churn.** If you can't articulate why a change is necessary, don't make it.
- **Verbatim quoting.** Every "Current" block matches the live site exactly, including capitalization, punctuation, italics, and Roman numerals.
- **Preserve technical accuracy.** Do not invent features, claims, capabilities, client relationships, or stats. When in doubt, flag.
- **Write rewrites in the voice they prescribe.** A rewrite that is itself off-voice has failed.
- **Audit doc reads tight.** It should not exceed what's necessary. The founder is the reader; respect his time.

## Anti-patterns to avoid

- Rewriting copy that's already on-voice, to demonstrate effort
- Cataloging every line of the site as a "change" when only a fraction need change
- Inventing features, stats, client names, or capabilities to fill out a rewrite
- Recommending design or layout changes — out of scope
- Restructuring pages without a positioning argument grounded in the brand docs
- Making strategic calls (killing pages, dropping stats, retiring service lines) without surfacing them as questions first
- Importing personality from the reference brands (Palantir, Stripe, Linear, 37signals) — the voice work was the synthesis; this work just executes against it
- Writing audit prose in a hedged consultant voice — apply the same voice rules to this deliverable that you apply to the site

## Deliverable format

All files in markdown. Use the project's existing brand directory conventions. Sentence case for headings. Oxford comma. Em-dash and italics conventions per `brand/editorial-style.md`. Cross-link freely between deliverables — the audit should link to per-page files, the checklist should reference page files by filename, the README should link to all of it.

When everything is written, do one final pass: read `audit.md` and the homepage rewrite back to back. If the audit reads more bloated than the rewrite, the audit is wrong. Tighten it.

</details>
