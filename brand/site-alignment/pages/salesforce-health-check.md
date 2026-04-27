# Salesforce health check — `/salesforce/health-check/`

> Source: `src/app/salesforce/health-check/page.tsx` + `src/components/healthcheck/*.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The page itself (`page.tsx`) is a clean composition — it delegates entirely to component files (`HealthCheckHero`, `CrmTabs`, `DeliverableWalkthrough`, `AssessmentDomains`, `Methodology`, `WhoItsFor`, `ProofFinding`, `HealthCheckPricingCard`, `HealthCheckFaqs`, `WhyNowStrip`). The component-level violations from the regex pass concentrate in three files: `HealthCheckFaqs.tsx:22` (*one named administrator*), `WhyNowStrip.tsx:4` (*mid-market orgs*), `previews/EngagementTiers.tsx:10` (*named administrator*). Plus the in-page form heading *Request a CRM Health Check* — on-voice but the eyebrow *Start with a 30-minute scoping call* could anchor the locked CTA more tightly. 4 change blocks — 3 P0, 1 P1.

---

## Changes

### Change 1 — `HealthCheckFaqs.tsx` answer (named administrator)

**Location:** `src/components/healthcheck/HealthCheckFaqs.tsx:22`

**Current:**

> You own the report. Most clients convert into a Fix-It Sprint (90 days, fixed fee, close the top criticals), a Managed Services retainer (one named administrator), or a Rebuild program when a bigger overhaul is warranted. A smaller number decide to execute internally. None of those paths are a requirement of the Health Check.

**Proposed:**

> You own the report. Most clients convert into a Fix-It Sprint (90 days, fixed fee, close the top criticals), a Managed Services retainer (your single point of contact and a project manager), or a Rebuild program when a bigger overhaul is warranted. A smaller number decide to execute internally. None of those paths is a requirement of the Health Check.

**Rationale:** Two swaps. (1) *One named administrator* → *your single point of contact and a project manager* per `lexicon.md` §service vocabulary. The substitute matches the locked managed-services language used across the site. (2) *None of those paths are a requirement* → *None of those paths is a requirement* — subject-verb agreement (*none* singular per `editorial-style.md` §voice and grammar). Light fix; not voice-system-driven.

**Priority:** P0

---

### Change 2 — `WhyNowStrip.tsx` body (mid-market)

**Location:** `src/components/healthcheck/WhyNowStrip.tsx:4`

**Current:**

> Salesforce is ending Workflow Rules and Process Builder. Most mid-market orgs still have dozens live — unmigrated automations become forced rush work at a premium.

**Proposed:**

> Salesforce is ending Workflow Rules and Process Builder. Most growing-business orgs still have dozens live — unmigrated automations become forced rush work at a premium.

**Rationale:** Single retirement. *Mid-market orgs* → *growing-business orgs* per `lexicon.md` §audience-segment language. The rest of the line — operationally specific (Workflow Rules, Process Builder, *unmigrated automations*) — is on-voice and survives.

**Priority:** P0

---

### Change 3 — `EngagementTiers.tsx` outcome (named administrator)

**Location:** `src/components/healthcheck/previews/EngagementTiers.tsx:10`

**Current:**

> One named administrator keeps the instance clean as the business changes.

**Proposed:**

> Your single point of contact keeps the instance clean as the business changes.

**Rationale:** Single retirement. *One named administrator* → *Your single point of contact* per `lexicon.md` §service vocabulary. The rest of the outcome line — *keeps the instance clean as the business changes* — is on-voice and survives.

**Priority:** P0

---

### Change 4 — Page-level lead-form section eyebrow

**Location:** `src/app/salesforce/health-check/page.tsx:42–44`

**Current:**

> *(eyebrow)* Start with a 30-minute scoping call
> *(heading)* Request a CRM Health Check
> *(body)* Tell us a bit about your stack. We will confirm fit, scope the assessment, and send a statement of work.

**Proposed:**

> *(eyebrow)* Schedule a health check
> *(heading)* Request a CRM Health Check
> *(body)* Tell us about your stack. We confirm fit, scope the assessment, and send a statement of work.

**Rationale:** Two light swaps. (1) Eyebrow *Start with a 30-minute scoping call* → *Schedule a health check* — the locked Salesforce health check CTA per `messaging-framework.md` §standard CTAs. The previous eyebrow phrased it as a process step (*start with*); the substitute names the action. (2) Body — *Tell us a bit about your stack* → *Tell us about your stack* (drop *a bit about* — softener filler); *We will confirm fit* → *We confirm fit* (present-tense default per `editorial-style.md` §voice and grammar).

**Priority:** P1

---

## Out of scope, flagged

- **`HealthCheckHero` component.** Inspected — eyebrow + headline + body + CTA. On-voice; no retired phrases.
- **`CrmTabs`, `DeliverableWalkthrough`, `AssessmentDomains`, `Methodology`, `WhoItsFor`, `ProofFinding`, `HealthCheckPricingCard` components.** Inspected; on-voice. Deliverable structure (12 domains, scored scorecard, risk register, business case) per `voice-and-tone.md` §1 operationally specific. Protect.
- **`HealthCheckFaqs.tsx` other answers** (questions 1, 3+).** Inspected; FAQ register per `context-playbooks.md` §technical docs (questions-as-headers acceptable).
- **`PackagingTiers.tsx`** at `src/components/industries/PackagingTiers.tsx:21` — separately tracked under `pages/solutions-industries.md` (the industry pages render `PackagingTiers` as a shared component). The *named administrator* retirement there falls under the same fix as Change 3 above.
