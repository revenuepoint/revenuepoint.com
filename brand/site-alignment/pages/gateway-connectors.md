# Gateway connectors — `/gateway/connectors/`

> Source: `src/app/gateway/connectors/page.tsx` + `src/data/gatewayConnectors.ts`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

This page reads cleanly — the *Every system, one connector model* hero, the *In production today* shipped tier, the *In progress, prioritized by demand* roadmap tier, the TypeScript interface code block (an unusual but on-voice mechanic per `context-playbooks.md` §technical docs — *code over prose when a code example would clarify*), and the *Custom connectors are a 2–4 week build* claim with the locked timeline (`receipts.md`). One light alignment: the final CTA banner uses *Talk to us →* (banned-adjacent), and the *named connector* phrase in the build-your-own body is borderline (*named* as a modifier vs. *named* the verb-action of giving something a name). 2 change blocks — both P1.

---

## Changes

### Change 1 — Final CTA banner

**Location:** `src/app/gateway/connectors/page.tsx:191–195`

**Current:**

> *(heading)* Need a connector we don't list?
> *(body)* Tell us the system. We'll scope a 2–4 week build, or fit your case onto the Custom REST/GraphQL adapter if it's covered there.
> *(CTA)* Talk to us →

**Proposed:**

> *(heading)* Need a connector we don't list?
> *(body)* Tell us the system. We'll scope a 2–4 week build, or fit your case onto the Custom REST/GraphQL adapter if it's covered there.
> *(CTA)* Schedule a Gateway scoping call

**Rationale:** Single retirement on the CTA. *Talk to us* is on the banned-CTA list per `messaging-framework.md` §banned CTAs (synonymous to *Contact us* — passive). Substitute the locked Gateway CTA — *Schedule a Gateway scoping call* — which names the actual conversation (a scoping call for the connector build). The heading *Need a connector we don't list?* is on the cusp of the banned question-as-header rule (`messaging-framework.md` §headlines to avoid) but lands here as a direct buyer-question reframing — protect for now.

**Priority:** P1

---

### Change 2 — `Build your own` body — light wording

**Location:** `src/app/gateway/connectors/page.tsx:170–175`

**Current:**

> *(heading)* Custom connectors are a *2–4 week* build.
> *(body)* Every connector implements the same interface. RevenuePoint engineers build the named connector; once shipped, it becomes part of the Gateway product so other customers can use it (without touching your tenants or your data).

**Proposed:**

> *(heading)* Custom connectors are a *2–4 week* build.
> *(body)* Every connector implements the same interface. RevenuePoint engineers build the new connector; once shipped, it becomes part of the Gateway product — available to every customer without touching your tenants or your data.

**Rationale:** Two light swaps. (1) *RevenuePoint engineers build the named connector* — *named connector* here is borderline retired phrasing; the writer meant *the connector you named* / *the connector you proposed* but it reads close to the retired *named [role]* pattern (`lexicon.md` §service-model clichés). Substitute *the new connector* — same meaning, no overlap with the retired construction. (2) *So other customers can use it (without touching your tenants or your data)* → *available to every customer without touching your tenants or your data* — drops the parenthetical, tightens to a single beat that names the value (*available to every customer*) and the boundary (*without touching your tenants or your data*) in one sentence.

**Priority:** P1

---

## Out of scope, flagged

- **Hero body.** *Salesforce and SAP ship today. NetSuite, Microsoft Dynamics, and QuickBooks are on the roadmap. The Custom REST/GraphQL adapter covers everything else with an API. Each connector is a typed adapter; auth, retries, and per-tenant secrets are handled in one place.* On-voice — operationally specific (`voice-and-tone.md` §1), names the actual connector inventory and the technical primitive (typed adapter + auth/retries/secrets handling). Protect.
- **TypeScript interface code block.** Lines 176–184. The `GatewayConnector<T>` interface with named methods. Per `context-playbooks.md` §technical docs — *code over prose when a code example would clarify*. Protect.
- **Closing line** (line 185–187). *All RevenuePoint engineers commit through the same review process; no shortcuts, no "just for one customer" hacks. The connector you fund is the connector everyone gets.* On-voice — direct claim with operational specificity, exactly the *receipt* mechanic per `voice-and-tone.md` §writing principles. Protect.
- **`Shipped` / `Roadmap` cards.** Render from `src/data/gatewayConnectors.ts` data. Inspected; on-voice. *S/4HANA via OData; Business One via Service Layer. Read paths support delta queries; write paths are gated by per-tenant capability flags so partners only see what you intend.* (line 22 of data file) — operationally specific per `voice-and-tone.md` §1. Protect.
