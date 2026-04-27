# New page: Interface System for Salesforce — `/salesforce/interface-system/`

> **Status board.** Single-page build. Tracks one new marketing surface only — no other site changes. Body is updated as phases progress; check task boxes for shipped deliverables.

**Last updated:** 2026-04-27 — issue filed, build pending.
**URL target:** `/salesforce/interface-system/` (under the Salesforce hub).
**Source product spec:** [revenuepoint/sfdx-base#1](https://github.com/revenuepoint/sfdx-base/issues/1) (Interface System MVP — Sales Cloud standard objects).
**Voice spec:** `tmp/voice-and-tone-system/` and `brand/site-alignment/receipts.md` (see [revenuepoint/revenuepoint.com#10](https://github.com/revenuepoint/revenuepoint.com/issues/10)).

---

## What we're building

One marketing page at `/salesforce/interface-system/` plus the minimal nav update to surface it. **No other site changes in this round.**

Interface System is RevenuePoint's opinionated UI redesign of Salesforce LEX in the spirit of Basecamp / 37signals / Linear. MVP ships Sales Cloud standard objects (Account, Opportunity, Contact, Lead) deployed from `sfdx-base` into per-client orgs. This page is the front door to that product line — and an entry point to RevenuePoint's broader Salesforce work.

The pitch when a buyer lands here: *"this is what your Salesforce can look like, and you can deploy it today."*

### Scope

- [ ] **New page**: `src/app/salesforce/interface-system/page.tsx`
- [ ] **New data file**: `src/data/interfaceSystem.ts` (problem cards, modules, industries subset, pricing, comparison rows, FAQs)
- [ ] **New component**: `src/components/interface-system/DeployCommandBlock.tsx` (the hero code block)
- [ ] **Nav update**: add `Interface System` link to `Services → CRM` group in `src/lib/navigation.ts` (after `Salesforce Training`, before `CRM Health Check`)
- [ ] **Per-page rewrite spec**: `brand/site-alignment/pages/salesforce-interface-system.md` (so the page lives in the alignment system and can be voice-graded)
- [ ] **Implementation checklist**: extend `brand/site-alignment/implementation-checklist.md` with `IFACE-*` rows

### Out of scope

- No edits to other existing pages.
- No `IndustryContext` refactor — reuse with a filtered list at page level.
- No license-API build (tracked in `sfdx-base` follow-up issues).
- No CLI wrapper / `npx revenuepoint …` command — the hero block uses the marketing-friendly `sf deploy interface-system` form; real SFDX syntax stays in docs.
- Brand naming exercise (single-word codename) — page uses *Interface System for Salesforce* as decided.
- Other Interface System cloud variants (NPSP, Service Cloud) — Sales Cloud only per MVP scope.

---

## Founder-locked decisions (2026-04-27)

1. **URL**: `/salesforce/interface-system/` — under the Salesforce hub.
2. **License model copy**: describe the full vision — license API at `api.revenuepoint.com` validates the org ID, first connect auto-registers and grants a 30-day free trial, ongoing validation gates production use. Page does **not** commit to a date for the validation API (it's post-MVP per `sfdx-base#1`); copy is forward-looking but not date-bound.
3. **Hero treatment**: a single big code-block component. One line, copy button, success line beneath:
   ```
   $ sf deploy interface-system

   ✓ Deployed in 4m 12s
   ```
   Marketing-friendly tightening of the real SFDX syntax. The actual command (`sf project deploy start --package-name interface-system …`) lives in docs, not the hero.
4. **Industries**: subset of 6 — manufacturing · distribution · professional services · financial services · food & beverage · construction. Reuse `IndustryProvider` / `IndustrySwitcher` (`src/context/IndustryContext.tsx`) with a filtered list rather than a new context.
5. **Pricing**: $6,000 per org / year. Single-card treatment mirroring the `npsp-middleware` $6,000/newsroom/year pattern.

---

## Page section structure

Top → bottom. Component reuse from `src/components/ui/*` and `src/components/foundry/*` unless noted.

### 1. Hero (`HeroSection`)

- **Byline**: `Interface System · Salesforce reimagined`
- **Heading** (italicized-noun three-beat draft — finalize during build):
  > Salesforce, reimagined. Deployed in *one command*.
- **Body**: 1–2 sentences naming what it is (a redesigned LEX layer for Sales Cloud standard objects, in the spirit of Basecamp / 37signals / Linear), who it's for (companies that already run Salesforce and want it to feel like a product they actually like), and the operating-model claim (deploy from `sfdx-base`, fully managed by RevenuePoint).
- **CTAs**: `Schedule a demo` (primary, `SCHEDULE_URL`) · `View pricing` (secondary, anchors `#pricing`).
- **Sidenote**: `Per-org per-year · 30-day trial on first deploy · Sales Cloud today, more clouds coming.`
- **rightSlot**: `<DeployCommandBlock />` — the one-line code-block component (see §New component below).

### 2. The problem (`SectionHeader` + 3-card grid + proof strip)

Match the Foundry / Gateway problem-section pattern. Three pains:

- *Standard LEX feels dated alongside the products your team uses elsewhere.*
- *Save buttons everywhere; activity feels like paperwork.*
- *Mobile is an afterthought.*

Proof strip — three operational receipts (placeholder values; confirm before launch):
- `4m 12s` median deploy
- `0 save buttons` on the activity feed
- `~30% fewer clicks` per record interaction

### 3. How it works (`SectionHeader` + 3-step cards)

Match Gateway's *Connect · Configure · Launch* pattern.

- **Deploy.** One command from `sfdx-base` into your org.
- **Configure.** Page layouts, quick actions, and visible fields stay yours — same Salesforce Setup surface, just a vastly better UI.
- **Use it.** Inline edits save automatically. Activity is a feed, not a form. Mobile is a first-class layout, not a leftover.

### 4. What's redesigned — modules

Match Foundry's `PlatformModulesShowcase` or a simple grid. MVP scope per `sfdx-base#1`:

- Account · Opportunity · Contact · Lead
- List views · Home tiles
- Mobile layouts (per-object)

One-line note beneath: *Service Cloud and NPSP are the next two clouds in line; specific dates ship in the engagement.*

### 5. Industries — filtered switcher

`<IndustryProvider>` wrapping a 6-industry subset. Each industry shows a per-industry preview of the redesigned Account record.

**Implementation note**: prefer page-level filtering over an `IndustryContext` refactor. Either:
- pass a `restrict={['manufacturing', 'distribution', 'professionalServices', 'financialServices', 'foodBeverage', 'construction']}` prop to `IndustrySwitcher`, OR
- filter the `industryPageList` import at page level before passing to the switcher.

Build PR confirms which mechanism reads cleanest given the existing `IndustryContext` shape.

### 6. Pricing (anchored `#pricing`)

- **$6,000 per org / year.** Single-card treatment mirroring the `npsp-middleware` $6,000/newsroom/year layout (large centered card, crimson border).
- Inclusions list:
  - Sales Cloud standard objects (Account, Opportunity, Contact, Lead)
  - Mobile layouts
  - List views & home tiles
  - Upgrades managed by RevenuePoint
  - 30-day free trial on first deploy
  - Email support
- Note beneath the card: *30-day trial auto-registers the org ID with `api.revenuepoint.com` on first connect; production use requires a paid license after the trial window.*
- CTAs: `Schedule a demo` (primary) · `Read the docs` (secondary, links to `sfdx-base` README on GitHub).

### 7. How it deploys — license / trial explainer

Three short paragraphs:

1. **Deploy.** Run `sf deploy interface-system` against your org. Layouts and components install in minutes.
2. **Trial.** On first connect, the components register your org ID with `api.revenuepoint.com` and start a 30-day free trial. No upfront contract.
3. **License.** When the trial ends, the same components keep running on a paid per-org license. Pause or cancel by canceling the license; no contract minimum.

### 8. Comparison (`ComparisonTable`)

Compares Interface System against: standard Salesforce LEX · custom LEX dev (in-house) · AppExchange UI overlays · doing nothing.

Rows:
- Redesigned Sales Cloud standard objects
- Mobile-first layouts
- Inline-save activity feed
- Per-org pricing
- Deploy in minutes
- Upgrades managed by RevenuePoint

Highlight column: Interface System.

### 9. Implementation timeline (`StepList`)

Four steps mirroring Foundry / Gateway:

1. **Discover** — one call.
2. **Deploy** — one command.
3. **Configure** — your layouts, your fields.
4. **Evolve** — your single point of contact at RevenuePoint pushes upgrades.

### 10. FAQ (`FAQAccordion`)

- *Does Interface System replace Salesforce?* — No, it sits on top of standard LEX.
- *Will my customizations break?* — Page layouts and quick actions are honored; the redesign is the chrome, not the data model.
- *What about Service Cloud / NPSP?* — On the roadmap; Sales Cloud ships first per `sfdx-base#1`.
- *Mobile?* — First-class. Mobile layouts ship with the MVP.
- *Trial?* — 30-day free on first deploy; org ID auto-registers via `api.revenuepoint.com`.
- *What if I cancel?* — Components disable; standard LEX returns. No data is touched.
- *Can I extend it?* — Yes — `sfdx-base` is the foundation we extend in custom client work; you can build on it.

### 11. CTA banner (`CTABanner`)

- **Heading**: *See Interface System in your sandbox.*
- **Body**: *Thirty minutes with a RevenuePoint architect. We deploy to your sandbox in front of you.*
- **CTA**: `Schedule a demo` (primary, `SCHEDULE_URL`).

### 12. Lead form

`<LeadForm interest="Interface System" />`

---

## New component

### `DeployCommandBlock`

**Path**: `src/components/interface-system/DeployCommandBlock.tsx`

**Behavior**:
- Renders a single-line monospace code block: `$ sf deploy interface-system`
- Copy-to-clipboard icon button (top-right of block, hover state, accessible label)
- Success line below the command (rendered statically, not animated): `✓ Deployed in 4m 12s`
- Tailwind-styled to match brand terminal-block treatment: `bg-ink` (dark) · `text-paper` · mono font · `border border-rule` · soft chrome

**Reuse**: this component is page-specific for now. If a future product page wants the same treatment, generalize then.

---

## Voice compliance

Must hold across all copy on the page.

- **Banlist**: no *named admin*, *dedicated*, *white-glove*, *mid-market*, *leverage*, *seamless*, *transform*, *world-class*, *Get started*, *Talk to us*, *Schedule a walkthrough*. Run `rg -P -f tmp/voice-and-tone-system/.banned-phrases.txt src/app/salesforce/interface-system/ src/data/interfaceSystem.ts src/components/interface-system/` before merge — expect 0 hits.
- **Locked CTAs**: `Schedule a demo` (primary across the page); `View pricing` / `Read the docs` (secondary). No `Get started`, `Try for free`, `Contact us`, `Talk to us`, `Submit`.
- **Pricing display**: `$6,000 per org / year` shown publicly per `brand/site-alignment/receipts.md` rule.
- **Italics**: load-bearing word in three-beat headlines per `editorial-style.md` mechanics.
- **Single source of truth pairing**: not relevant on this page (Interface System isn't an SSOT product).
- **Audience**: *growing businesses* / *companies that run Salesforce* — never *mid-market*.

---

## Acceptance criteria

- [ ] `src/app/salesforce/interface-system/page.tsx` exists and renders.
- [ ] `src/data/interfaceSystem.ts` exists with problem cards, modules, industries subset, pricing, comparison rows, FAQs.
- [ ] `src/components/interface-system/DeployCommandBlock.tsx` exists; copy button works; success line renders.
- [ ] `src/lib/navigation.ts` adds `Interface System` to `Services → CRM` group (after `Salesforce Training`, before `CRM Health Check`).
- [ ] `IndustryProvider` / `IndustrySwitcher` reused with a 6-industry subset (no new context).
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run build` passes.
- [ ] Banlist regex returns 0 hits across new files.
- [ ] `brand/site-alignment/pages/salesforce-interface-system.md` written with at least the page summary + locked copy snippets.
- [ ] `brand/site-alignment/implementation-checklist.md` extended with `IFACE-*` rows.
- [ ] Visual QA on desktop + mobile.
- [ ] Founder cold-read sign-off in this issue.

---

## Reference files (read-only inputs to the build)

- [`revenuepoint/sfdx-base#1`](https://github.com/revenuepoint/sfdx-base/issues/1) — product MVP spec.
- `tmp/voice-and-tone-system/` — voice docs (`lexicon.md`, `messaging-framework.md`, `editorial-style.md`, `.banned-phrases.txt`).
- `brand/site-alignment/receipts.md` — locked receipts (pricing display rule, `$6,000 per newsroom / year` analog).
- `brand/site-alignment/implementation-checklist.md` — extension target.
- `src/app/foundry/page.tsx` — hero + section pattern, `ComparisonTable`, `StepList`, `IndustrySwitcher` reuse.
- `src/app/gateway/page.tsx` — alternate section pattern; comparison table.
- `src/app/npsp-middleware/page.tsx` — single-tier pricing card pattern (mirror for Interface System pricing).
- `src/app/salesforce/page.tsx` + `src/lib/navigation.ts` — Salesforce hub structure and the `Services → CRM` nav group where the new entry lands.
- `src/context/IndustryContext.tsx` + `src/components/foundry/IndustrySwitcher.tsx` — reuse for the 6-industry subset.
- `src/components/ui/HeroSection.tsx`, `SectionHeader.tsx`, `ComparisonTable.tsx`, `PricingCard.tsx`, `StepList.tsx`, `FAQAccordion.tsx`, `CTABanner.tsx`, `LeadForm.tsx`, `Button.tsx` — components to reuse.
- `src/lib/links.ts` — `SCHEDULE_URL` constant for primary CTAs.

---

## Follow-up workstreams (separate issues)

- **License-validation API** (`api.revenuepoint.com` org-ID register + validate + 30-day trial logic) — owned by `sfdx-base` follow-up.
- **Service Cloud Interface System** + **NPSP Interface System** — separate cloud-specific page builds when those `sfdx-base` modules ship.
- **CLI wrapper / branded installer** — if/when we want `npx revenuepoint deploy interface-system` as the actual install path.
- **Single-word brand mark** for the Interface System product line — if/when we promote it from descriptor to a Foundry/Gateway-class brand.
