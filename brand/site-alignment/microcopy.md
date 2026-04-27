# Microcopy — site-wide

> Repeated elements that appear across many pages. One-place definition; per-page files reference back to here rather than redefining. All change blocks follow the same format as the per-page files: **Location · Current · Proposed · Rationale · Priority** P0/P1/P2.

**Status:** Phase 1 final. Locked from `tmp/voice-and-tone-system/` voice docs and `receipts.md` per founder approval 2026-04-26.

## Surfaces covered

- Primary CTAs across the site (canonical phrasing per product line)
- Banned CTAs to remove (component-level fallbacks)
- Form labels and submit (`src/components/ui/LeadForm.tsx`)
- Top-nav labels and submenu structure (`src/lib/navigation.ts`)
- Footer subtitle, section labels, address (`src/components/layout/Footer.tsx`)
- Default `Button` component arrow mechanic (`src/components/ui/Button.tsx`)
- Page metadata titles and descriptions — locked per page file

---

## A. CTAs — site-wide

### Change MICRO-CTA-01 — Banned-CTA sweep

**Locations** (every TSX in `src/app/` and `src/components/`):

- `src/app/salesforce/page.tsx:69` — `cta={activity.cta ?? { label: 'Get started', href: '#lead-form' }}`
- `src/app/foundry/pricing/page.tsx:88, 105` — Core / Intelligence pricing-card CTAs `'Get Started'`
- `src/app/foundry/pricing/page.tsx:120` — Enterprise pricing-card CTA `'Contact Us'`
- `src/app/salesforce/managed-services/pricing/page.tsx:67, 76` — Sales Cloud / Full Stack `'Get Started'`
- `src/app/salesforce/managed-services/pricing/page.tsx:87` — Custom Plan `'Contact Us'`
- `src/components/salesforce/SalesforceProductPicker.tsx:103` — `Get started`
- `src/components/gateway/ViewExplorer.tsx:184` — `Submit`
- `src/app/salesforce/implementations/page.tsx:254` — Enterprise pricing-card `'Talk to us'`
- `src/app/gateway/connectors/page.tsx:194` — Final CTA banner `'Talk to us →'`

**Substitute (per surface):** lock to the relevant CTA from `messaging-framework.md` §standard CTAs.

| Surface | Banned CTA | Locked substitute |
|---|---|---|
| Salesforce activities (default fallback) | Get started | Schedule a Salesforce scoping call |
| Foundry pricing tiers (Core, Intelligence) | Get Started | Schedule a Foundry scoping call |
| Foundry pricing Enterprise | Contact Us | Schedule a Foundry scoping call |
| SF managed-services pricing tiers | Get Started | Get a managed services proposal |
| SF managed-services pricing Custom | Contact Us | Schedule a custom-plan scoping call |
| Salesforce product picker | Get started | Schedule a Salesforce scoping call |
| Gateway view explorer (form button) | Submit | Send to RevenuePoint *(or context-specific verb)* |
| SF implementations Enterprise | Talk to us | Schedule an Enterprise scoping call |
| Gateway connectors final | Talk to us → | Schedule a Gateway scoping call |

**Rationale:** *Get started* / *Get Started* / *Contact Us* / *Talk to us* / *Submit* — banned CTAs per `messaging-framework.md` §banned CTAs. Each fails the "verb-first, name what happens next, 3–6 words" rule. Locked substitutes from `messaging-framework.md` §standard CTAs name the actual conversation or deliverable.

**Priority:** P0

---

### Change MICRO-CTA-02 — *Schedule a walkthrough* convergence

**Locations:**

- `src/app/gateway/page.tsx:105` (hero), `:409` (final CTA banner)
- `src/app/gateway/pricing/page.tsx:36, 137` (hero + final banner + inline link)
- `src/app/gateway/use-cases/page.tsx:33, 119` (hero + final banner)
- `src/app/gateway/connectors/page.tsx:119` (hero)
- `src/app/npsp-middleware/page.tsx:225, 276` (CTA banner + pricing card link)

**Current:** `Schedule a walkthrough`

**Proposed:** `Schedule a Gateway demo` (Gateway pages) · `Schedule a newsroom consultation` (npsp-middleware managed)

**Rationale:** *Schedule a walkthrough* is acceptable as a synonym but breaks across-site CTA convergence. Locked Gateway CTA per `messaging-framework.md` §standard CTAs is *Schedule a Gateway demo*. Locked npsp-middleware managed CTA is *Schedule a newsroom consultation* — softer register for nonprofit news organizations per `context-playbooks.md` §marketing pages and `brand-positioning.md` §npsp-middleware. Same destinations, locked phrasing.

**Priority:** P1

---

### Change MICRO-CTA-03 — Hero CTA on `/sap/` and `/salesforce/managed-services/`

**Locations:**

- `src/app/sap/page.tsx:148` — `Start a managed services engagement`
- `src/app/salesforce/managed-services/page.tsx:53` — `Start a managed services engagement`

**Proposed:**

- SAP: `Schedule an SAP scoping call`
- SF managed services: `Get a managed services proposal`

**Rationale:** Locked CTAs per `messaging-framework.md` §standard CTAs. *Start a managed services engagement* over-promises the immediate next step (the buyer can't initiate an engagement from a button click). Per-product locked CTAs name the actual next step.

**Priority:** P0

---

## B. Lead form (`src/components/ui/LeadForm.tsx`)

### Change MICRO-FORM-01 — Submit button label

**Location:** `src/components/ui/LeadForm.tsx:192–197`

**Current:**

> `<button type="submit" ...>Get in touch <span aria-hidden="true">→</span></button>`

**Proposed:**

> `<button type="submit" ...>Send to RevenuePoint <span aria-hidden="true">→</span></button>`

**Rationale:** *Get in touch* on a submit button is borderline-retired (`messaging-framework.md` §banned CTAs lists *Get in touch* as too vague at brand level). Inside a form, the buyer has already decided to make contact — the button names the action that completes the form, not the marketing-funnel CTA. Substitute *Send to RevenuePoint* — verb-first (*Send*), names the destination (*to RevenuePoint*), 3 words, no chumminess. The arrow icon survives.

**Priority:** P1

---

### Change MICRO-FORM-02 — Field placeholders — keep mostly intact

**Location:** `src/components/ui/LeadForm.tsx:122–186`

**Current placeholders (verbatim):**

- *First name \** — line 125
- *Last name \** — line 132
- *Work email \** — line 140
- *Phone* — line 148
- *Company name \** — line 154
- *Company website* — line 162
- *Annual revenue (optional)* — line 173
- *How did you hear about us?* — line 183

**Proposed:** *(no change — on-voice)*

**Rationale:** Field placeholders are operationally specific (`voice-and-tone.md` §1) — name the exact field with no padding. *Work email* (not *Email* or *Email address*) is the locked form-field label for B2B intake. *Annual revenue (optional)* uses parenthetical optionality per `editorial-style.md` §punctuation — preferred over an *(optional)* suffix or italics. The required-field asterisk convention is standard.

**Priority:** *(no change — protected)*

---

### Change MICRO-FORM-03 — Annual revenue dropdown options

**Location:** `src/components/ui/LeadForm.tsx:174–178`

**Current:**

> Under $1M · $1M–$5M · $5M–$20M · $20M+

**Proposed:** *(no change — on-voice)*

**Rationale:** The four buckets line up with the brand's audience profile per `voice-and-tone.md` §who we're talking to (*$10M–$250M companies, 50–500 employees*). The bottom bucket (*Under $1M*) catches under-fit submissions cleanly; the top bucket (*$20M+*) covers the bulk of the audience without segmenting too granularly. Each uses en-dash for ranges per `editorial-style.md` §punctuation. Protect.

**Priority:** *(no change — protected)*

---

## C. Navigation (`src/lib/navigation.ts`)

### Change MICRO-NAV-01 — Submenu group heading: *Customer Relationship Management*

**Location:** `src/lib/navigation.ts:27`

**Current:**

> `heading: 'Customer Relationship Management',`

**Proposed:**

> `heading: 'CRM',`

**Rationale:** *Customer Relationship Management* spelled out reads as define-on-first-use protocol (`editorial-style.md` §acronyms — *household for audience: CRM*). The audience knows *CRM*. Spelling it out in a submenu heading creates visual weight that competes with the actual link labels below it. *CRM* survives as a three-letter heading; protect via the *household acronyms* list in the editorial-style doc.

**Priority:** P1

---

### Change MICRO-NAV-02 — Top-level *Services* label evaluation

**Location:** `src/lib/navigation.ts:23`

**Current:**

> `label: 'Services',`

**Proposed:** *(consider — discuss before changing)*

**Rationale:** The brand-positioning doc frames RevenuePoint as a *hands-on technology partner*, not a *services* firm. *Services* is generic; alternatives — *Engagements*, *What we do*, *Practice areas* — each have tradeoffs. *Engagements* matches the locked vocabulary (`lexicon.md` §service vocabulary uses *engagement* over *project*) but reads cold as a top-nav label for a marketing site. *What we do* matches the homepage section eyebrow but feels first-person on a top-nav surface. **Recommendation:** keep *Services* for now; revisit post-launch if the homepage hero rewrite (Change 1–4 in `pages/homepage.md`) lands cleanly and the top-nav taxonomy needs a parallel update.

**Priority:** P2 (deferred)

---

### Change MICRO-NAV-03 — *Request a Demo* in Foundry/Gateway dropdowns

**Location:** `src/lib/navigation.ts:74` (Foundry) and `:86` (Gateway)

**Current:**

> Foundry submenu: `{ label: 'Request a Demo', href: '/contact/?interest=Foundry' }`
> Gateway submenu: `{ label: 'Request a Demo', href: '/contact/?interest=Gateway' }`

**Proposed:**

> Foundry submenu: `{ label: 'Schedule a 30-minute demo', href: '/contact/?interest=Foundry' }`
> Gateway submenu: `{ label: 'Schedule a Gateway demo', href: '/contact/?interest=Gateway' }`

**Rationale:** *Request a Demo* is acceptable but breaks across-site CTA convergence. Locked CTAs per `messaging-framework.md` §standard CTAs. Foundry: *Schedule a 30-minute demo* (the time commitment is the receipt that earns the click). Gateway: *Schedule a Gateway demo*. Same destinations.

**Priority:** P1

---

## D. Footer (`src/components/layout/Footer.tsx`)

### Change MICRO-FOOTER-01 — Footer subtitle

**Location:** `src/components/layout/Footer.tsx` (around line 65 — under the wordmark)

**Current:**

> Fully managed pipelines that turn data into action — across CRM, ERP, accounting, data infrastructure, and AI.

**Proposed:**

> RevenuePoint implements, operates, and adds intelligence to the CRM, ERP, and AI orchestration growing businesses run on.

**Rationale:** The current footer subtitle is the same off-voice framing as the homepage hero before its rewrite (Change 1–3 of `pages/homepage.md`). *Fully managed pipelines that turn data into action* describes Foundry's behavior, not the company's offering. Substitute the 25-word elevator pitch per `messaging-framework.md` §elevator pitches (truncated to fit footer width — drops the closing *under one hands-on partnership with direct accountability* clause). Names the scope (*CRM, ERP, AI orchestration*) and the brand verb stack (*implements, operates, and adds intelligence*).

**Priority:** P0

---

### Change MICRO-FOOTER-02 — Section labels — protect

**Location:** `src/components/layout/Footer.tsx` lines 47–52

**Current section headings:**

> Salesforce · SAP S/4HANA + B1 · Research · Foundry · Gateway · Resources

**Proposed:** *(no change — on-voice)*

**Rationale:** All on-voice. Product names use locked capitalization (`editorial-style.md` §product naming). *SAP S/4HANA + B1* uses the plus-syntax mechanic (`editorial-style.md` §plus-syntax mechanics). Protect.

**Priority:** *(no change — protected)*

---

### Change MICRO-FOOTER-03 — Address block

**Location:** `src/components/layout/Footer.tsx:74–87`

**Current:**

> 200 Vesey Street, 24th Floor
> New York, NY 10281
> +1 (332) 900-1150
> team@revenuepoint.com

**Proposed:** *(no change — locked in `receipts.md`)*

**Rationale:** Address, phone, email all locked per founder approval per `receipts.md` §direct lines. The footer omits the *Three World Financial Center* line that appears on the contact page; recommend adding it for consistency. **Optional add:**

> Three World Financial Center
> 200 Vesey Street, 24th Floor
> New York, NY 10281

**Priority:** P2 (cosmetic consistency)

---

## E. Page metadata titles + descriptions — covered per-page

Every per-page rewrite file in [`pages/`](./pages/) includes a meta-description change block where the existing meta uses retired phrases. The site-wide pattern: meta titles use product-name conventions (`editorial-style.md` §product naming); meta descriptions use the locked phrasings from `receipts.md` and the per-product positioning blocks in `brand-positioning.md`.

Page meta files updated through the per-page change blocks:

| Route | Per-page file | Meta description change |
|---|---|---|
| `/foundry/` | `pages/foundry.md` Change 1 | drops *for mid-market* |
| `/insights/` | `pages/insights-index.md` Change 1 | drops *mid-market operations* |
| `/sap/` | `pages/sap.md` Change 1 | drops *named SAP consultant* |
| `/salesforce/managed-services/` | `pages/salesforce-managed-services.md` Change 1 | drops *named Salesforce administrator* |
| `/salesforce/managed-services/pricing/` | `pages/salesforce-managed-services-pricing.md` Change 1 | drops *white-glove · dedicated* |
| `/research/intelligence-reports/` | `pages/intelligence-reports.md` Change 1 | drops *named-analyst reviewed* |
| `/gateway/pricing/` | `pages/gateway-pricing.md` Change 1 | drops *named administrator* |
| `/contact/` | `pages/contact.md` Change 2 | drops *only take engagements where we can deliver measurable ROI* |
| `/solutions/` | `pages/solutions-industries.md` Change 1 | drops *named integrations* |
| Industry meta titles + descriptions | `pages/solutions-industries.md` Changes 5–12 | mid-market sweep across 8 data files |

The `homepage.md` page does not export `metadata` directly (no `buildMetadata` call in `src/app/page.tsx`); the homepage relies on the root `layout.tsx` for default metadata. Phase 2 should add an explicit `export const metadata` to the homepage with the locked one-sentence positioning + receipts as the description — see `pages/homepage.md` *Out of scope* note.

---

## F. Default `Button` arrow mechanic (`src/components/ui/Button.tsx`)

### Change MICRO-BTN-01 — Arrow rendering

**Location:** `src/components/ui/Button.tsx:46–47`

**Current:**

```tsx
{variant !== 'plain' && <span aria-hidden="true">→</span>}
{variant === 'plain' && <span aria-hidden="true">→</span>}
```

**Proposed:** *(no change — on-voice mechanic)*

**Rationale:** The `→` arrow as a CTA-button suffix is the brand's locked CTA mechanic per `editorial-style.md` §CTAs (*verb-first label · arrow as the icon, not part of the label*). The `aria-hidden="true"` on the span is correct for screen-reader accessibility (the verb in the label carries the action; the arrow is decorative). Protect.

**Priority:** *(no change — protected)*

---

## G. Other surfaces

### EmailSignup component (`src/components/ui/EmailSignup.tsx`)

Inspected; on-voice. Per Phase 2 implementation review, if any retired phrases surface (likely not based on the scan), add change blocks here.

### Status / cookie banner

No status page banner exists today. No cookie banner today (the site does not show a banner; cookies are governed by the legal/privacy page). No change required for this round.

### Insights post bodies (`src/content/insights/*.tsx`)

**Out of scope** for this round — flagged for Phase 4 follow-up workstream per `audit.md` and `receipts.md`. Five known violations across 8 posts (*named analyst* / *named approver* / *mid-market business*).

---

## How to use this file

- Per-page rewrite docs reference back here when the same fix repeats across pages — the change ID (e.g. `MICRO-CTA-01`) lands in the [`implementation-checklist.md`](./implementation-checklist.md) once.
- The implementer sweeps the banned-CTA list (`MICRO-CTA-01`) as a single grep-and-replace across `src/app/` and `src/components/` rather than per-page.
- The form, nav, footer, and Button changes are component-level — shipped once and propagate everywhere.
