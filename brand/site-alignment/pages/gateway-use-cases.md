# Gateway use cases — `/gateway/use-cases/`

> Source: `src/app/gateway/use-cases/page.tsx` + `src/data/gatewayUseCases.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

This page is the cleanest product sub-page on the site. The hero (*Six portals. One framework.*) is the locked Gateway tagline per `brand-positioning.md` §Gateway. The use-case grid renders six archetypes from `gatewayUseCases.ts` data with operationally specific *who uses it / access rule / mocked views / common industries* — exactly the *operationally specific* voice attribute per `voice-and-tone.md` §1. The closing *Bring your tenant model. We'll configure it.* and *Talk through your tenant model with an architect.* both land. One light alignment: the secondary CTA *Back to Gateway* survives but the primary CTA *Schedule a walkthrough* could converge to the locked Gateway CTA. 2 change blocks — both P1.

---

## Changes

### Change 1 — Primary CTA (hero)

**Location:** `src/app/gateway/use-cases/page.tsx:32–35`

**Current:**

> *(primary)* Schedule a walkthrough · *(secondary)* Back to Gateway

**Proposed:**

> *(primary)* Schedule a Gateway demo · *(secondary)* Back to Gateway

**Rationale:** *Schedule a walkthrough* is acceptable as a synonym but breaks across-site CTA convergence — the locked Gateway CTA per `messaging-framework.md` §standard CTAs is *Schedule a Gateway demo*. The Gateway page (hub), pricing page, and connectors page all currently use *walkthrough* — same change recommended on those pages too (per `pages/gateway.md` Change 3). Voice consistency wins.

**Priority:** P1

---

### Change 2 — Final CTA banner

**Location:** `src/app/gateway/use-cases/page.tsx:116–120`

**Current:**

> *(heading)* Talk through your tenant model with an architect.
> *(body)* Thirty minutes. We sketch the access rule, name the connectors, list the views, and quote a path to live.
> *(CTA)* Schedule a walkthrough →

**Proposed:**

> *(heading)* Sketch your tenant model with a Gateway architect.
> *(body)* Thirty minutes. We name the access rule, list the connectors and views, and quote a path to live.
> *(CTA)* Schedule a Gateway demo

**Rationale:** Three light swaps. (1) *Talk through your tenant model* → *Sketch your tenant model* — *talk through* is filler-verb; *sketch* is operationally specific (`voice-and-tone.md` §1) and matches the body's *we sketch* claim. (2) Body — *We sketch the access rule, name the connectors, list the views* → *We name the access rule, list the connectors and views* (light tightening; *sketch* moves to the heading where it carries weight). (3) CTA *Schedule a walkthrough →* → *Schedule a Gateway demo* — locked CTA convergence (same as Change 1).

**Priority:** P1

---

## Out of scope, flagged

- **Use-case grid.** Six archetype cards rendered from `src/data/gatewayUseCases.ts`. Inspected; data file copy is operationally specific per `voice-and-tone.md` §1 (*Who uses it · Access rule · Mocked views · Common industries* — each fact-bearing, no retired phrases). Protect.
- **`Yours doesn't fit?` micro-section.** Lines 104–113. The *Bring your tenant model. We'll configure it.* italicized-noun headline + the body's *That's a configuration — not a custom build.* close land exactly the brand's *name the alternative we're rejecting* mechanic. Protect.
- **Hero body.** *Each archetype is a different audience and a different access rule — but all built on the same Gateway deployment, the same connector model, the same managed stack.* On-voice — operationally specific noun-listing per `voice-and-tone.md` §1 with the locked *managed stack* phrasing. Protect.
