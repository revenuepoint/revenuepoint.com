import { buildMetadata } from '@/lib/metadata';
import { Wordmark } from '@/components/brand/Wordmark';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { HairlineRule } from '@/components/ui/HairlineRule';
import { Button } from '@/components/ui/Button';

export const metadata = buildMetadata({
  title: 'Brand guide — RevenuePoint',
  description:
    'How to use the RevenuePoint mark, palette, and type. For partners, agencies, press, and anyone shipping co-branded work.',
  path: '/brand/',
});

const PALETTE = [
  { role: 'Page surface', token: 'paper', hex: '#F4EFE6', rgb: '244 · 239 · 230', use: 'Default page background.' },
  { role: 'Card surface', token: 'cream', hex: '#FAF6EC', rgb: '250 · 246 · 236', use: 'Lifted cards, footers, secondary surfaces.' },
  { role: 'Mid neutral', token: 'bone', hex: '#E8E2D5', rgb: '232 · 226 · 213', use: 'Section breaks where cream is too close to paper.' },
  { role: 'Hairline rule', token: 'rule', hex: '#C4BCA8', rgb: '196 · 188 · 168', use: 'Section dividers, table borders, card edges.' },
  { role: 'Soft hairline', token: 'ruleSoft', hex: '#DCD4C0', rgb: '220 · 212 · 192', use: 'Lighter rules between adjacent components.' },
  { role: 'Mute label', token: 'mute', hex: '#7A6F5C', rgb: '122 · 111 · 92', use: 'Eyebrow and mono labels, secondary text.' },
  { role: 'Soft mute', token: 'muteSoft', hex: '#A09683', rgb: '160 · 150 · 131', use: 'Disabled state, subdued attribution.' },
  { role: 'Primary text', token: 'ink', hex: '#1A1612', rgb: '26 · 22 · 18', use: 'Body copy, headings, navigation.' },
  { role: 'Soft ink', token: 'inkSoft', hex: '#2D261E', rgb: '45 · 38 · 30', use: 'Long-form body where pure ink reads heavy.' },
];

const ACCENTS = [
  { role: 'Brand · locked', token: 'crimson', hex: '#8B0A39', rgb: '139 · 10 · 57', use: 'Italic accents, primary CTAs, signature mark.' },
  { role: 'Crimson hover', token: 'crimsonDeep', hex: '#6B0829', rgb: '107 · 8 · 41', use: 'Hover state for crimson surfaces only.' },
  { role: 'Crimson wash', token: 'crimsonTint', hex: '#F2E0E5', rgb: '242 · 224 · 229', use: 'Backgrounds for accent rows or feature columns.' },
  { role: 'Supporting · locked', token: 'navy', hex: '#0F1A2B', rgb: '15 · 26 · 43', use: 'Sole secondary brand colour. Verified / on-track signal.' },
  { role: 'Navy mid', token: 'navySoft', hex: '#2A3F58', rgb: '42 · 63 · 88', use: 'Chart fills, on-track delta indicators.' },
  { role: 'Navy wash', token: 'navyTint', hex: '#DDE3EA', rgb: '221 · 227 · 234', use: 'Light wash for badges and quiet panels.' },
];

const SIGNALS = [
  { role: 'At-risk signal', token: 'amber', hex: '#A86A1F', rgb: '168 · 106 · 31', use: 'Soft warnings, KPI deltas at risk.' },
  { role: 'Off-track signal', token: 'rust', hex: '#A4391E', rgb: '164 · 57 · 30', use: 'Errors, KPI deltas off-track.' },
  { role: 'Decorative', token: 'gold', hex: '#C39A4A', rgb: '195 · 154 · 74', use: 'Editorial flourish only — drop-cap variant, masthead rule.' },
];

const TYPE_RAMP = [
  { token: 'd0', size: '48–88px', weight: '600', use: 'Hero h1', sample: 'The technology partner mid-market businesses trust.' },
  { token: 'd1', size: '36–56px', weight: '500', use: 'Section h2', sample: 'Connect. Illuminate. Act.' },
  { token: 'd2', size: '24–32px', weight: '500', use: 'Block h3', sample: 'Live in 6 weeks. Here’s how.' },
  { token: 'd3', size: '20px', weight: '500', use: 'Sub-block h4', sample: 'Named administrator' },
  { token: 'lede', size: '17px', weight: '400', use: 'Lede / dek', sample: 'A four-step engagement model. The same path every time.' },
  { token: 'body', size: '16px', weight: '400', use: 'Body — max 64ch', sample: 'Most consulting firms implement software and disappear.' },
  { token: 'sm', size: '14px', weight: '400', use: 'Small body, captions', sample: 'Foundry connects every system into a single warehouse.' },
  { token: 'mu', size: '11px · 0.16em', weight: '500', use: 'Eyebrow + mono micro labels', sample: 'BRAND GUIDE · 2026' },
];

const ACCESSIBILITY = [
  { fg: 'ink', fgHex: '#1A1612', bg: 'paper', bgHex: '#F4EFE6', ratio: '14.6:1', pass: 'AAA' },
  { fg: 'ink', fgHex: '#1A1612', bg: 'cream', bgHex: '#FAF6EC', ratio: '15.2:1', pass: 'AAA' },
  { fg: 'inkSoft', fgHex: '#2D261E', bg: 'paper', bgHex: '#F4EFE6', ratio: '11.8:1', pass: 'AAA' },
  { fg: 'mute', fgHex: '#7A6F5C', bg: 'paper', bgHex: '#F4EFE6', ratio: '4.6:1', pass: 'AA body' },
  { fg: 'crimson', fgHex: '#8B0A39', bg: 'paper', bgHex: '#F4EFE6', ratio: '7.7:1', pass: 'AAA' },
  { fg: 'crimson', fgHex: '#8B0A39', bg: '#FFFFFF', bgHex: '#FFFFFF', ratio: '8.7:1', pass: 'AAA' },
  { fg: 'navy', fgHex: '#0F1A2B', bg: 'paper', bgHex: '#F4EFE6', ratio: '16.7:1', pass: 'AAA' },
  { fg: 'paper', fgHex: '#F4EFE6', bg: 'navy', bgHex: '#0F1A2B', ratio: '16.7:1', pass: 'AAA (inverse)' },
  { fg: 'rust', fgHex: '#A4391E', bg: 'paper', bgHex: '#F4EFE6', ratio: '5.4:1', pass: 'AA body' },
  { fg: 'amber', fgHex: '#A86A1F', bg: 'paper', bgHex: '#F4EFE6', ratio: '4.6:1', pass: 'AA body' },
];

const DO_DONT = [
  {
    surface: 'The wordmark',
    do: 'Use the wordmark as supplied — Fraunces 600, tight tracking, crimson on light, paper on dark.',
    dont: 'Recolour, italicise, add an icon, swap fonts, set in all-caps, condense, or apply effects.',
  },
  {
    surface: 'Colour pairings',
    do: 'Pair crimson and navy on warm ivory or cream. Use navy for verified / on-track signals.',
    dont: 'Add green anywhere in the system, or swap navy for any other secondary accent.',
  },
  {
    surface: 'Type',
    do: 'Set headings in Fraunces, body in Geist, quantitative content in JetBrains Mono.',
    dont: 'Substitute Inter or system fonts on co-branded surfaces.',
  },
  {
    surface: 'Imagery',
    do: 'Use real photography of operational settings or commissioned diagrammatic SVGs.',
    dont: 'Use stock "diverse-team-around-a-laptop" photography, AI-generated hero art, or purple-gradient abstractions.',
  },
  {
    surface: 'Co-branded work',
    do: 'Place the RevenuePoint wordmark on its own line, separated by clear space equal to the cap-height of the mark.',
    dont: 'Lock the wordmark into a partner logo, fuse it with another mark, or add "by RevenuePoint" trailing text without approval.',
  },
];

export default function BrandPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper overflow-hidden border-b border-rule">
        <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-20">
          <Eyebrow>Brand guide · 2026</Eyebrow>
          <h1 className="mt-5 text-d0 font-serif font-semibold text-ink">
            <Wordmark size="lg" tone="ink" asLink={false} />
          </h1>
          <p className="mt-6 text-lede leading-[1.65] text-inkSoft max-w-prose">
            How to use the RevenuePoint mark, palette, and type — when you partner with us, write about us,
            or ship co-branded work. Crimson{' '}
            <span className="font-mono text-crimson">#8B0A39</span> and navy{' '}
            <span className="font-mono text-navy">#0F1A2B</span> are locked. Everything else on this page
            tells you how to deploy them.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" href="/contact/?interest=Brand+assets">
              Request brand assets
            </Button>
            <Button variant="secondary" href="#wordmark">
              Start with the wordmark
            </Button>
          </div>
          <p className="mt-6 pt-4 border-t border-ruleSoft font-mono text-[11px] uppercase tracking-[0.14em] text-mute max-w-prose">
            Last updated 2026-04-25 · contact{' '}
            <a href="mailto:team@revenuepoint.com" className="text-ink hover:text-crimson transition-colors">
              team@revenuepoint.com
            </a>{' '}
            with questions.
          </p>
        </div>
      </section>

      {/* §01 Wordmark */}
      <Section index="01" title="The wordmark" eyebrow="Section 01 · Logo" anchor="wordmark">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="text-base leading-[1.65] text-inkSoft max-w-prose">
              RevenuePoint is a text-only wordmark. It is set in Fraunces 600 with tight tracking; there is no
              icon and no italic accent. Use it crimson on light surfaces and paper on dark surfaces. Maintain
              clear space of at least one half cap-height around the mark.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-inkSoft">
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                <span>Always use the supplied wordmark file — never re-typeset it.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                <span>Three sizes: <span className="font-mono text-ink">sm</span> 18px, <span className="font-mono text-ink">md</span> 28px, <span className="font-mono text-ink">lg</span> 40px. Do not scale below 14px.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                <span>On crimson backgrounds, switch the mark to paper. Never set crimson on crimson.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                <span>Need an SVG, PDF, or PNG? Email <a href="mailto:team@revenuepoint.com" className="text-crimson hover:text-crimsonDeep underline underline-offset-2">team@revenuepoint.com</a>.</span>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-ruleSoft bg-paper p-8 flex items-center justify-between gap-6">
              <Wordmark size="lg" tone="crimson" asLink={false} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                lg · 40px · crimson on paper
              </span>
            </div>
            <div className="border border-ruleSoft bg-paper p-8 flex items-center justify-between gap-6">
              <Wordmark size="md" tone="ink" asLink={false} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                md · 28px · ink on paper
              </span>
            </div>
            <div className="border border-ruleSoft bg-ink p-8 flex items-center justify-between gap-6">
              <Wordmark size="md" tone="paper" asLink={false} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-paper/70">
                md · 28px · paper on ink
              </span>
            </div>
            <div className="border border-ruleSoft bg-cream p-8 flex items-center justify-between gap-6">
              <Wordmark size="sm" tone="crimson" asLink={false} />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
                sm · 18px · crimson on cream
              </span>
            </div>
          </div>
        </div>
      </Section>

      {/* §02 Colour */}
      <Section index="02" title="Colour" eyebrow="Section 02 · Palette" alt>
        <p className="text-base leading-[1.65] text-inkSoft max-w-prose mb-12">
          Crimson and navy are the only locked brand colours. Everything else in the palette is a neutral or a
          signal — they earn their place by serving the work, not by competing for attention. There is no green
          in this system; verified or on-track states use navy.
        </p>
        <div className="space-y-12">
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-6">Brand &amp; supporting</p>
            <PaletteGrid swatches={ACCENTS} />
          </div>
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-6">Paper &amp; ink</p>
            <PaletteGrid swatches={PALETTE} />
          </div>
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-6">Signal</p>
            <PaletteGrid swatches={SIGNALS} />
          </div>
          <div className="border-l-2 border-crimson pl-5 max-w-prose">
            <p className="serif-italic text-[1.125rem] text-ink leading-snug">
              Crimson is locked. Do not tint, shade, gradient, screen, or animate it. It earns its weight by
              showing up sparingly.
            </p>
          </div>
        </div>
      </Section>

      {/* §03 Typography */}
      <Section index="03" title="Type" eyebrow="Section 03 · Typography">
        <p className="text-base leading-[1.65] text-inkSoft max-w-prose mb-12">
          Three faces, one job each. Fraunces is the voice — display headings, italic accents, drop caps.
          Geist carries body and UI. JetBrains Mono carries quantitative content: KPIs, timestamps, attribution
          lines, micro-labels. All three are free, all three are on Google Fonts.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 mb-16">
          {[
            {
              label: 'Display + accents',
              name: 'Fraunces',
              meta: 'Variable · italic',
              uses: 'Headings, italic eyebrows, drop caps, decorative numerals.',
              cls: 'font-serif italic',
              src: 'https://fonts.google.com/specimen/Fraunces',
            },
            {
              label: 'Body + UI',
              name: 'Geist',
              meta: 'Variable',
              uses: 'Paragraph copy, navigation, CTA labels, form fields.',
              cls: 'font-sans',
              src: 'https://vercel.com/font',
            },
            {
              label: 'Mono',
              name: 'JetBrains Mono',
              meta: 'Variable',
              uses: 'KPI numerals, timestamps, micro-labels, attribution.',
              cls: 'font-mono',
              src: 'https://fonts.google.com/specimen/JetBrains+Mono',
            },
          ].map((face) => (
            <div key={face.name}>
              <Eyebrow>{face.label}</Eyebrow>
              <p className={`mt-3 text-[3rem] leading-none text-ink ${face.cls}`}>Aa</p>
              <p className="mt-3 font-serif text-[1.5rem] font-medium text-ink">{face.name}</p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mt-1">{face.meta}</p>
              <p className="mt-3 text-sm text-inkSoft leading-relaxed">{face.uses}</p>
              <a
                href={face.src}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-serif italic text-sm text-crimson hover:text-crimsonDeep transition-colors"
              >
                Source
                <span aria-hidden="true">→</span>
              </a>
            </div>
          ))}
        </div>

        <HairlineRule variant="strong" />

        <div className="mt-12">
          <Eyebrow>Type ramp</Eyebrow>
          <p className="mt-3 text-sm text-inkSoft max-w-prose">
            Sizes use fluid <span className="font-mono text-ink">clamp()</span> values so they scale between
            mobile and desktop without hard jumps. Body is capped at 64ch; lede at 56ch; pull-quote at 36ch.
          </p>
          <div className="mt-6 divide-y divide-rule border-t-2 border-ink">
            {TYPE_RAMP.map((row) => (
              <div
                key={row.token}
                className="grid grid-cols-1 lg:grid-cols-[120px_1fr_220px] gap-4 lg:gap-8 py-6 items-baseline"
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">{row.token}</div>
                <div>
                  <span
                    className={
                      ['d0', 'd1', 'd2', 'd3'].includes(row.token)
                        ? 'font-serif font-medium text-ink leading-tight'
                        : row.token === 'mu'
                        ? 'font-mono text-mute uppercase tracking-[0.16em]'
                        : 'text-ink'
                    }
                    style={{
                      fontSize:
                        row.token === 'd0'
                          ? 'clamp(2rem, 4vw, 3rem)'
                          : row.token === 'd1'
                          ? 'clamp(1.75rem, 3vw, 2.25rem)'
                          : row.token === 'd2'
                          ? '1.5rem'
                          : row.token === 'd3'
                          ? '1.25rem'
                          : row.token === 'lede'
                          ? '1.0625rem'
                          : row.token === 'body'
                          ? '1rem'
                          : row.token === 'sm'
                          ? '0.875rem'
                          : '0.6875rem',
                    }}
                  >
                    {row.sample}
                  </span>
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-mute">
                  {row.size} · {row.weight} · {row.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* §04 Imagery */}
      <Section index="04" title="Imagery" eyebrow="Section 04 · Photography &amp; illustration" alt>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-3">Use</p>
            <p className="text-base leading-[1.65] text-inkSoft">
              Real, commissioned photography of operational settings — plant floors, distribution centers,
              pharmacy back-of-house, finance teams at work. Or commissioned diagrammatic illustration in SVG.
              Until commissioned imagery is available, the system runs on abstract diagrammatic graphics only —
              flow diagrams, integration maps, KPI patterns.
            </p>
            <p className="text-base leading-[1.65] text-inkSoft mt-3">
              For co-branded work, request approval for any photography you intend to use alongside the
              RevenuePoint wordmark.
            </p>
          </div>
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-3">Don&rsquo;t use</p>
            <ul className="space-y-2.5 text-sm text-inkSoft">
              {[
                '"Diverse-team-around-a-laptop" stock photography.',
                'AI-generated hero images that look AI-generated.',
                'Purple-gradient abstractions, glassy 3D renders, particle clouds.',
                'Dashboard mockups of fictional brands or anything that looks like Salesforce / Tableau marketing material.',
                'Imagery showing screens or features that the product does not actually render.',
              ].map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="text-rust font-mono shrink-0" aria-hidden="true">×</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* §05 Accessibility */}
      <Section index="05" title="Accessibility" eyebrow="Section 05 · WCAG 2.2 AA">
        <p className="text-base leading-[1.65] text-inkSoft max-w-prose mb-8">
          Every text/background pair we publish meets WCAG 2.2 AA at minimum, AAA where it lands without
          compromising the system. The pairings below are pre-verified against the production palette — use
          them with confidence.
        </p>
        <div className="border-t-2 border-ink overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-rule">
                <th className="text-left py-3 px-4 font-serif italic font-medium">Foreground</th>
                <th className="text-left py-3 px-4 font-serif italic font-medium">Background</th>
                <th className="text-right py-3 px-4 font-serif italic font-medium">Ratio</th>
                <th className="text-right py-3 px-4 font-serif italic font-medium">Conformance</th>
              </tr>
            </thead>
            <tbody>
              {ACCESSIBILITY.map((row, i) => (
                <tr key={i} className="border-b border-ruleSoft">
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs text-ink">{row.fg}</span>
                    <span className="ml-2 font-mono text-xs text-mute">{row.fgHex}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-xs text-ink">{row.bg}</span>
                    <span className="ml-2 font-mono text-xs text-mute">{row.bgHex}</span>
                  </td>
                  <td className="py-3 px-4 text-right font-mono tabular-nums text-ink">{row.ratio}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-navy">{row.pass}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="mt-10 space-y-2.5 text-sm text-inkSoft max-w-prose">
          <li className="flex gap-3">
            <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
            <span>Always include a visible focus indicator. Default ring is 2px crimson with 2px offset.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
            <span>Keep heading hierarchy semantic (h1 → h2 → h3) — do not pick a heading level for visual weight.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
            <span>Make every interactive element keyboard-reachable; tab order must follow reading order.</span>
          </li>
          <li className="flex gap-3">
            <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
            <span>Honour <span className="font-mono text-ink">prefers-reduced-motion</span>. All cascades collapse to instant; live indicators stop pulsing.</span>
          </li>
        </ul>
      </Section>

      {/* §06 Do / don't */}
      <Section index="06" title="Do and don’t" eyebrow="Section 06 · Discipline" alt>
        <div className="border-t-2 border-ink">
          {DO_DONT.map((row) => (
            <div
              key={row.surface}
              className="grid grid-cols-1 lg:grid-cols-[180px_1fr_1fr] gap-6 py-6 border-b border-rule"
            >
              <div className="serif-italic text-[1.125rem] text-ink">{row.surface}</div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy mb-2">Do</p>
                <p className="text-sm text-inkSoft leading-relaxed">{row.do}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust mb-2">Don&rsquo;t</p>
                <p className="text-sm text-inkSoft leading-relaxed">{row.dont}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* §07 Get in touch */}
      <Section index="07" title="Brand assets &amp; questions" eyebrow="Section 07 · Get in touch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl">
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-3">Need an asset?</p>
            <p className="text-base leading-[1.65] text-inkSoft">
              Wordmark SVG, PDF, or PNG — plus the palette as Figma styles or a CSS file — are available on
              request. Email{' '}
              <a
                href="mailto:team@revenuepoint.com?subject=Brand%20assets"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                team@revenuepoint.com
              </a>{' '}
              and tell us what you&rsquo;re building. We respond within one business day.
            </p>
          </div>
          <div>
            <p className="serif-italic text-[1.25rem] text-ink mb-3">Spotted something off?</p>
            <p className="text-base leading-[1.65] text-inkSoft">
              If you see the wordmark misused, the palette stretched, or the system applied in a way that
              breaks these rules, let us know. Same address —{' '}
              <a
                href="mailto:team@revenuepoint.com?subject=Brand%20misuse"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                team@revenuepoint.com
              </a>
              .
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-rule">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
            Last updated 2026-04-25 · this guide is the public source of truth · changes require sign-off from the
            RevenuePoint marketing team.
          </p>
        </div>
      </Section>
    </>
  );
}

function Section({
  index,
  title,
  eyebrow,
  children,
  alt = false,
  anchor,
}: {
  index: string;
  title: React.ReactNode;
  eyebrow: string;
  children: React.ReactNode;
  alt?: boolean;
  anchor?: string;
}) {
  return (
    <section
      id={anchor}
      className={`${alt ? 'bg-cream border-y border-ruleSoft' : 'bg-paper'} py-section scroll-mt-24`}
    >
      <div className="max-w-editorial mx-auto px-6 lg:px-8">
        <div className="mb-12 lg:mb-16">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-d1 font-serif font-medium text-ink">
            <span className="font-mono text-mute mr-3 text-[0.6em] align-baseline">§{index}</span>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function PaletteGrid({
  swatches,
}: {
  swatches: { role: string; token: string; hex: string; rgb?: string; use?: string }[];
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {swatches.map((s) => (
        <div key={s.token} className="border border-ruleSoft bg-paper">
          <div
            className="h-20 w-full border-b border-ruleSoft"
            style={{ background: s.hex }}
            aria-hidden="true"
          />
          <div className="p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">{s.role}</p>
            <p className="serif-italic text-[1.0625rem] text-ink mt-1">{s.token}</p>
            <p className="font-mono text-xs text-ink mt-1">{s.hex}</p>
            {s.rgb && (
              <p className="font-mono text-[10px] text-mute mt-0.5">RGB {s.rgb}</p>
            )}
            {s.use && <p className="text-xs text-inkSoft mt-2 leading-snug">{s.use}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
