# Brand — `/brand/`

> Source: `src/app/brand/page.tsx`. Voice spec: [`tmp/voice-and-tone-system/`](../../../tmp/voice-and-tone-system/). Receipts: [`../receipts.md`](../receipts.md).

## Summary

The brand page is a system-of-record artifact — palette, type ramp, accessibility table, do/don't grid, wordmark mechanics. The page itself is on-voice in nearly every section. **Two surfaces fail the audit and they're both in the same place: the type-ramp samples** at `src/app/brand/page.tsx:43–52`. The `TYPE_RAMP` array uses sample-text strings that double as voice samples — and four of the eight samples carry retired phrases (*The technology partner mid-market businesses trust* · *Live in 6 weeks. Here's how.* · *Named administrator* · *Most consulting firms implement software and disappear.*). These samples render visibly on the brand page as the type-style demonstration; they should match the locked voice. 1 change block — P0.

---

## Changes

### Change 1 — Type-ramp sample text (4 retired phrases)

**Location:** `src/app/brand/page.tsx:43–52` — `TYPE_RAMP` array

**Current:**

```javascript
{ token: 'd0', size: '48–88px', weight: '600', use: 'Hero h1', sample: 'The technology partner mid-market businesses trust.' },
{ token: 'd1', size: '36–56px', weight: '500', use: 'Section h2', sample: 'Connect. Illuminate. Act.' },
{ token: 'd2', size: '24–32px', weight: '500', use: 'Block h3', sample: 'Live in 6 weeks. Here\'s how.' },
{ token: 'd3', size: '20px', weight: '500', use: 'Sub-block h4', sample: 'Named administrator' },
{ token: 'lede', size: '17px', weight: '400', use: 'Lede / dek', sample: 'A four-step engagement model. The same path every time.' },
{ token: 'body', size: '16px', weight: '400', use: 'Body — max 64ch', sample: 'Most consulting firms implement software and disappear.' },
{ token: 'sm', size: '14px', weight: '400', use: 'Small body, captions', sample: 'Foundry connects every system into a single warehouse.' },
{ token: 'mu', size: '11px · 0.16em', weight: '500', use: 'Eyebrow + mono micro labels', sample: 'BRAND GUIDE · 2026' },
```

**Proposed:**

```javascript
{ token: 'd0', size: '48–88px', weight: '600', use: 'Hero h1', sample: 'The technology partner growing businesses run on.' },
{ token: 'd1', size: '36–56px', weight: '500', use: 'Section h2', sample: 'Connect. Illuminate. Act.' },
{ token: 'd2', size: '24–32px', weight: '500', use: 'Block h3', sample: 'Two-week sprints, milestone-paced.' },
{ token: 'd3', size: '20px', weight: '500', use: 'Sub-block h4', sample: 'Single point of contact' },
{ token: 'lede', size: '17px', weight: '400', use: 'Lede / dek', sample: 'A four-step engagement model. The same path every time.' },
{ token: 'body', size: '16px', weight: '400', use: 'Body — max 64ch', sample: 'Five platforms, one partner, end-to-end.' },
{ token: 'sm', size: '14px', weight: '400', use: 'Small body, captions', sample: 'Foundry connects every system into a single warehouse.' },
{ token: 'mu', size: '11px · 0.16em', weight: '500', use: 'Eyebrow + mono micro labels', sample: 'BRAND GUIDE · 2026' },
```

**Rationale:** Four samples retired and replaced with locked voice phrases. (1) `d0` *The technology partner mid-market businesses trust.* → *The technology partner growing businesses run on.* — *mid-market* retired (`lexicon.md` §audience-segment language); *trust* claimed in a header is filler-self-praise (the brand doesn't claim *trust*; it earns it through the receipts). The substitute uses the locked *growing businesses* per `lexicon.md` §audience vocabulary and the brand's *systems growing businesses run on* phrasing. (2) `d2` *Live in 6 weeks. Here's how.* — retired brand-level guarantee (`lexicon.md` §service-model clichés). Substitute the locked cadence claim *Two-week sprints, milestone-paced* (`lexicon.md` §outcome vocabulary). (3) `d3` *Named administrator* — retired (`lexicon.md` §service-model clichés). Substitute *Single point of contact* per `lexicon.md` §service vocabulary. (4) `body` *Most consulting firms implement software and disappear.* — retired competitor swipe (`lexicon.md` §service-model clichés). Substitute *Five platforms, one partner, end-to-end.* — the locked compressed brand claim used elsewhere on the homepage at `src/app/page.tsx:113` (the substitute that *replaced* the disappear-line in `examples-library.md` §10). All four retirements covered in the locked-phrase pattern of `examples-library.md`. The other four samples (`d1`, `lede`, `sm`, `mu`) are on-voice and survive untouched.

**Priority:** P0

---

## Out of scope, flagged

- **Hero, palette, accessibility table, do/don't grid, wordmark mechanics, get-in-touch sections.** All on-voice. The wordmark rules (one-word brand, two caps, no italics, no icon, no tagline lockup) are the brand's locked mechanics per `editorial-style.md` §product naming. Protect.
- **PGP-key block, security inbox, asset-request inbox.** Lines 122–128, 442–479. Operationally specific receipts (`team@revenuepoint.com`, *We respond within one business day*, *Last updated 2026-04-25 · this guide is the public source of truth*). Protect.
- **Crimson/navy locked-color statement** (line 209–214). *Crimson is locked. Do not tint, shade, gradient, screen, or animate it. It earns its weight by showing up sparingly.* On-voice — direct claim with the brand's *no-padding* mechanic per `voice-and-tone.md` §writing principles. Protect.
