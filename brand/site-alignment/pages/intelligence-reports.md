# Intelligence Reports — `/research/intelligence-reports/`

> Source: `src/app/research/intelligence-reports/page.tsx` + `src/data/research/intelligenceReports.ts` + `src/components/research/*.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The Intelligence Reports page does the *citation-backed, source-verification* guardrail vocabulary almost perfectly — *Aggregate. Enrich. Verify. Generate.* (line 72 — the locked Intelligence Reports tagline per `brand-positioning.md` §Intelligence Reports), *Every source named. Every claim cited.* (line 115), *We negotiate licensing per engagement and disclose every source on the report* (line 118). Two retirements: (1) the meta description's *named-analyst reviewed*, (2) the QA & accuracy section's *reviewed by a named analyst before delivery*. Plus one wobble in the Foundry-Prism comparison block — *written overnight* survives in the Prism description (carried over from the SF/SAP overnight pattern). 5 change blocks — 3 P0, 2 P1.

---

## Changes

### Change 1 — Meta description

**Location:** `src/app/research/intelligence-reports/page.tsx:19–24` — `buildMetadata({...})`

**Current:**

> Bespoke intelligence reports built from public records, enrichment APIs, and your own systems. Citation-backed, named-analyst reviewed, fully managed by RevenuePoint. Starting at $6,800.

**Proposed:**

> Bespoke intelligence reports built from public records, enrichment APIs, and your own systems. Citation-backed, reviewed by a senior analyst, fully managed by RevenuePoint. Starting at $6,800.

**Rationale:** Single retirement. *Named-analyst reviewed* → *reviewed by a senior analyst* per `lexicon.md` §service-model clichés. The rest of the description — *citation-backed · fully managed by RevenuePoint · starting at $6,800* — is on-voice and survives. *Citation-backed* is the locked guardrails-vocabulary phrase per `lexicon.md` §guardrails vocabulary.

**Priority:** P0

---

### Change 2 — `End-to-end pipeline` section body

**Location:** `src/app/research/intelligence-reports/page.tsx:74–76`

**Current:**

> A named research analyst orchestrates the pipeline through the RevenuePoint AI Research Platform. You see findings, not raw data.

**Proposed:**

> A senior research analyst orchestrates the pipeline through the RevenuePoint AI Research Platform. You see findings, not raw data.

**Rationale:** Single retirement. *A named research analyst* → *A senior research analyst* per `lexicon.md` §service-model clichés. The locked Intelligence Reports anchor sentence per `brand-positioning.md` §Intelligence Reports uses *senior analyst* — align with that. *You see findings, not raw data* survives — it's the brand's compressed buyer-experience claim, on-voice.

**Priority:** P0

---

### Change 3 — `QA & accuracy` section body

**Location:** `src/app/research/intelligence-reports/page.tsx:135–137`

**Current:**

> Six commitments that hold across every engagement. The pipeline is auditable end-to-end and reviewed by a named analyst before delivery.

**Proposed:**

> Six commitments that hold across every engagement. The pipeline is auditable end-to-end and source-verified by a senior analyst before delivery.

**Rationale:** Two swaps. (1) *Reviewed by a named analyst* → *source-verified by a senior analyst* per `lexicon.md` §service-model clichés (drop *named*) and `lexicon.md` §guardrails vocabulary (*source verification* is the locked guardrail-vocabulary term — the human-discipline complement to *citation-backed* — and lands stronger than the generic *reviewed*). (2) *Reviewed by a named analyst before delivery* → *source-verified by a senior analyst before delivery* — the substitute uses the locked phrase that distinguishes our discipline from a generic review. Per `lexicon.md` §guardrails vocabulary — *Source verification* is "the QC step before an Intelligence Report ships."

**Priority:** P0

---

### Change 4 — Foundry Prism comparison block

**Location:** `src/app/research/intelligence-reports/page.tsx:170–172`

**Current:**

> Templated, scheduled, internal-data reports written overnight from your warehouse. Best for operational reporting at a regular cadence.

**Proposed:**

> Templated, internal-data reports generated on demand from your warehouse. Best for operational reporting on the cadence you set.

**Rationale:** Two swaps. (1) *Scheduled… written overnight* → *generated on demand* — *overnight* retired (`lexicon.md` §AI clichés); Prism's actual cadence is *on demand* (the locked phrase). (2) *At a regular cadence* → *on the cadence you set* — names the buyer's control over the cadence rather than asserting one. The block survives structurally as the *inside vs outside* contrast (Prism / Intelligence Reports), which is the right framing per `brand-positioning.md` §Intelligence Reports.

**Priority:** P1

---

### Change 5 — Lead-form section heading

**Location:** `src/app/research/intelligence-reports/page.tsx:208–214`

**Current:**

> *(eyebrow)* Get in touch
> *(heading)* Tell us what you need to know — *about whom*.
> *(body)* A scoping call confirms fit, sources, cadence, and timeline. We will price the engagement before any work begins.

**Proposed:**

> *(eyebrow)* Commission a report
> *(heading)* Tell us what you need to know — *about whom*.
> *(body)* A scoping call confirms fit, sources, cadence, and timeline. We price the engagement before any work begins — fixed fee per report, starting at $6,800.

**Rationale:** Two swaps. (1) Eyebrow *Get in touch* → *Commission a report* — the locked Intelligence Reports CTA per `messaging-framework.md` §standard CTAs is *Commission a report*; the eyebrow on a section that hands the buyer to the form should match the verb that names the action. *Get in touch* is the generic banned CTA frame (`messaging-framework.md` §banned CTAs — *Contact us · Get in touch* — too passive). (2) Body — adds *fixed fee per report, starting at $6,800* as the locked receipt (`receipts.md` Intelligence Reports row). *We will price* → *We price* — present-tense the brand's own preference (`editorial-style.md` §voice and grammar — present tense default).

**Priority:** P1

---

## Out of scope, flagged

- **`What you receive` block headlines (REPORT_BLOCKS).** Lives in `src/data/research/intelligenceReports.ts`. Inspected; on-voice. Each block names a specific deliverable shape (the *ten-minute read* anchor on the heading earns its receipt). Protect.
- **`USE_CASES` block.** Lives in the same data file. Six use-case cards, each operationally specific per `voice-and-tone.md` §1. Protect.
- **`QA_COMMITMENTS` block.** Lives in the same data file. Six guardrail commitments — *citation-backed, source-verified, audit trail, ...* per `lexicon.md` §guardrails vocabulary. Protect.
- **`PIPELINE_STEPS` block.** Lives in the same data file. The four-beat *Aggregate · Enrich · Verify · Generate* matches the locked tagline. Protect.
- **`FAQS` block.** Lives in the same data file. Inspected; FAQ register per `context-playbooks.md` §technical docs (questions-as-headers exception is allowed for FAQ surfaces).
- **`IntelligenceReportsHero` and `IntelligenceReportsPricingCard` components.** Should be inspected during P1 implementation for any inline strings that match the retired-phrase patterns. Add change blocks if found; otherwise leave intact.
