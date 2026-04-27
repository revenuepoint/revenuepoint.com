# Open questions — Phase 0 batch

> Founder-answer questions that block Phase 1. Each is numbered for reference. Where I have a sensible default, I've drafted it after **Default:** — confirm or override. Edit this file in place; survivors carry forward to [`audit.md`](./audit.md).

**Owner:** Thomas Jones (founder).
**Filed:** 2026-04-26.
**Status:** ✅ **all answers approved with defaults / live-site values per founder confirmation 2026-04-26.** Receipts locked in [`receipts.md`](./receipts.md). Survivors (only Q4 product-scope and Q42 in-portal Otto cadence) carry forward to [`audit.md`](./audit.md) for Phase 1 confirmation.

---

## A. Receipts (numbers and proof points)

The brand-level receipts that appear on the homepage hero and recur across the site. Every per-page rewrite cites the locked values from [`receipts.md`](./receipts.md).

1. **Revenue managed per year.** Current site: *"$950M+ revenue managed per year"* (`src/app/page.tsx:60`). **Default:** keep $950M+, no change.
   *Answer:*

2. **Total engagements.** Current site: *"300+ engagements"* (`src/app/page.tsx:61`). **Default:** keep 300+, no change.
   *Answer:*

3. **Salesforce certifications.** Current site: *"60+ Salesforce certifications across Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Experience Cloud, and NPSP"* (`src/app/salesforce/page.tsx:47`, `52`). **Default:** keep 60+, keep the cloud list.
   *Answer:*

4. **Platform uptime SLA.** Current site: *"99.9% Platform Uptime SLA"* (`src/app/page.tsx:62`). Which products is this attached to — Foundry only, Gateway only, both, or every platform we run? Need scope to avoid an over-broad claim.
   *Answer:*

5. **The "$214K recovered in Q1" client story.** Used in the voice system's worked examples and case study mock-up. Is this a real client metric? Approved for marketing use as anonymized "$40M manufacturer"? Or fictional / illustrative only?
   *Answer:*

6. **Other named-client metrics.** Anything else we can name — *X% lift in conversion, Y days saved per close, Z recovered in cash flow* — with founder approval to use anonymized?
   *Answer:*

---

## B. Pricing (per-product starting prices and ranges)

Every per-product page surfaces pricing somewhere. Locking the numbers prevents the rewrites from drifting.

7. **Foundry starting price.** Current: *"$2,500/month"* (multiple places). **Default:** keep.
   *Answer:*

8. **Foundry pricing tiers.** Currently three tiers on `foundry/pricing/`: Core $2,500–$3,500 · Intelligence $5,000–$7,500 · Enterprise $10,000–$15,000. Show ranges as-is, or unify to "Starting at $2,500/month" only?
   *Answer:*

9. **Foundry implementation fee.** Current: *"$8,000–$60,000"*. Confirm range.
   *Answer:*

10. **Salesforce managed services starting price.** Current: *"From $2,400/month"*. **Default:** keep.
    *Answer:*

11. **Salesforce managed services tiers.** Current: $2,400 (sales cloud admin) / $4,000 (full stack admin) / Custom. Keep the split or unify?
    *Answer:*

12. **Salesforce implementations.** Current: $15,000 standard / $30,000 growth / Custom. Confirm.
    *Answer:*

13. **SAP managed services pricing.** Currently shown as "Contact us for a custom quote." Keep as-is, or anchor a starting price?
    *Answer:*

14. **Gateway per-tenant pricing.** Lives in a data file (`GATEWAY_PRICE` constant). What's the canonical number per active tenant per month?
    *Answer:*

15. **Intelligence Reports starting price.** Current: *"Starting at $6,800"* (meta description). **Default:** keep.
    *Answer:*

16. **npsp-middleware managed pricing.** Current: *"$6,000 per newsroom per year"*. **Default:** keep.
    *Answer:*

17. **Pricing display rule overall.** For each product, do we (a) show the price, (b) show ranges, or (c) hide behind "contact us"? **Default:** show prices for Foundry, SF managed services, IR, npsp-middleware; hide SAP and Gateway behind "contact us" until tier conventions stabilize.
    *Answer:*

---

## C. Implementation timelines

Used in marketing copy as commitments. Misaligned timelines are buyer-trust risks.

18. **Foundry implementation timeline.** Current site mixes *"4–8 weeks"* and *"6 weeks"* and *"Live in 6 weeks"*. The voice system retired *"live in 6 weeks"* as a brand-level guarantee. Keep specific timelines on `foundry/pricing/` only; default brand-level claim becomes *"two-week sprints, milestone-paced."* Confirm.
    *Answer:*

19. **Salesforce implementation timelines.** Current: standard 6–8 weeks / growth 10–12 weeks. Confirm.
    *Answer:*

20. **Gateway go-live timeline.** Current: *"4 weeks"* / *"deploys in four weeks"*. Confirm.
    *Answer:*

21. **Custom connector build.** Current: *"2–4 weeks"*. Confirm.
    *Answer:*

22. **Salesforce health check engagement.** Current: *"2 weeks"*. Confirm.
    *Answer:*

23. **Lead-response time.** Current: *"within one business day"* (homepage, contact, thank-you). Confirm.
    *Answer:*

---

## D. Named entities (logos, contacts, address)

24. **Homepage client logo strip.** What logos are currently shown? Each one approved? Any to add or remove? Specifically: is **inewsource** still an active client / approved logo?
    *Answer:*

25. **Founder direct phone.** Voice docs use a placeholder *305-555-0142*. What's the public-facing number?
    *Answer:*

26. **Founder direct email.** Default: `thomas@revenuepoint.com`. Confirm; or use a different inbox for marketing CTAs?
    *Answer:*

27. **Security disclosure email.** Current: `security@revenuepoint.com`. Confirm; or different?
    *Answer:*

28. **Public-facing address.** Bethlehem PA / 200 Vesey St NY / neither? Whatever's on `/contact/` today — confirm or replace.
    *Answer:*

---

## E. Service lines and routes

29. **Salesforce sub-routes.** Currently 5: `salesforce/`, `salesforce/implementations/`, `salesforce/managed-services/`, `salesforce/managed-services/pricing/`, `salesforce/health-check/`, `salesforce/training/`. Keep all six or fold any? *(`/salesforce/` is the hub; `/implementations/` is a sub-product; risk of duplication.)*
    *Answer:*

30. **Gateway sub-routes.** Currently 4: `gateway/`, `gateway/use-cases/`, `gateway/connectors/`, `gateway/pricing/`. Keep all or fold?
    *Answer:*

31. **npsp-middleware as a public route.** Public product page or partner-only? Affects whether we polish the page for SEO and conversion.
    *Answer:*

32. **Solutions hub + 10 industries.** Currently `/solutions/` plus 10 industry pages (manufacturing, pharmacy, distribution, nonprofit, healthcare, property-management, professional-services, financial-services, food-beverage, construction). Keep all 10 as full pages, or compress some? Are some priorities (manufacturing, pharmacy, nonprofit) and others lighter?
    *Answer:*

33. **Homepage primary CTA target.** Currently the hero CTA points to a form anchor. Should it point to (a) the Foundry page, (b) a `/why-revenuepoint/` page that doesn't exist yet, (c) the contact form anchor (current), or (d) the calendar?
    *Answer:*

---

## F. Foundry capabilities (must match product reality)

The voice system documents Blueprint · Lens · Courier · Prism · Otto · Agents · Actions. Marketing must match what's shipping today.

34. **Blueprint** (semantic data layer). Shipping today, in client engagements? Marketing-ready as a named capability, or "coming soon"?
    *Answer:*

35. **Lens** (operational dashboards). Shipping today?
    *Answer:*

36. **Courier** (scheduled reports / event-driven alerts). Shipping today?
    *Answer:*

37. **Prism** (AI-generated written analysis). Shipping today?
    *Answer:*

38. **Otto** (AI analyst that answers questions, executes actions). Marketing claims it "answers questions in plain English" and "executes actions on connected systems." Is this shipping today, or forward-looking?
    *Answer:*

39. **Agents** (Watcher · Scheduler · Processor · Responder). Which agent types are shipping today?
    *Answer:*

40. **Actions** (audited execution across connected systems). Shipping today?
    *Answer:*

41. **"30+ integrations" claim.** Accurate? List the specific systems we count toward this — Salesforce, SAP, NetSuite, HubSpot, QuickBooks, Stripe, Shopify, Outreach, etc.
    *Answer:*

42. **AI cadence claim.** Voice system retired *"overnight"* in favor of *"on demand"* with *"in seconds"* as the receipt for Otto specifically. Is *"in seconds"* accurate for Otto's typical response, or should it be *"in under a minute"* / a different anchor?
    *Answer:*

---

## G. Otto-on-marketing (in-product reality vs marketing claims)

43. **Marketing strings that paraphrase Otto.** Specifically `src/app/foundry/page.tsx:561` (paraphrased: *"AI-generated reports. Written overnight, ready by 8 AM"*) and similar lines. The voice system rewrote these to *"on demand, ready when you ask."* Confirm the rewrite matches Otto's real behavior.
    *Answer:*

44. **"Otto answers in plain English"** — is this how Otto behaves today? Plain-English summaries with citations? Or does Otto currently surface dashboards / structured outputs only?
    *Answer:*

---

## H. Stale references and prior copy

45. **The "Most firms implement and disappear" line** appears on homepage line 219 and brand page font sample line 49. Voice system retired both. Confirm full removal — replace with positive framing about what we DO ("We implement to your processes, manage the system as it evolves...").
    *Answer:*

46. **The "we vet every client / decline ROI-negative engagements" posture** appears on homepage line 219 and the contact page intro. Voice system substitutes *"we scope every engagement around real value."* Confirm full substitution across the site.
    *Answer:*

47. **The "no offshore handoffs / no offshore routing" lines** appear on homepage line 183 and salesforce/managed-services/pricing line 55. Voice system bans geography in any direction. Replace with *"no shared queues"* (the surviving anti-establishment receipt) or drop entirely. Confirm.
    *Answer:*

48. **The "no data engineers required" line** on homepage line 145. Voice system substitutes *"Foundry comes with the data team."* Confirm.
    *Answer:*

---

## I. Voice-system relocation timing

49. **Plan recommendation:** defer relocating `tmp/voice-and-tone-system/` → `brand/` until Phase 4. Per-page files reference stable paths through Phases 1–3, then a single sed-based path-rewrite commit lands the move. Confirm or override (move now in Phase 0).
    *Answer:*

---

## J. Issue body and tracker hygiene

50. **GH issue #10 body redraft** — modeled on `revenuepoint/playbook#10`. Push the redraft now, or wait until you've answered enough of the above to lock Phase 0 status? **Default:** push now (the body is a tracker, not a substantive deliverable; updates as phases land).
    *Answer:*

---

## How to answer

- Edit this file in place — drop your answer under each *Answer:* line.
- Answers may be one word ("yes," "keep," "drop") or longer when needed.
- For multi-part questions, just answer the parts you have a strong opinion on; I'll flag the rest as survivors in `audit.md`.
- When done, commit the file (or paste the answers in a comment on issue #10) and tag the next phase as ready.

After your pass, I lock [`receipts.md`](./receipts.md) and start Phase 1 (audit + per-page rewrites).
