import { Button } from '@/components/ui/Button';
import { PRICING } from '@/data/research/intelligenceReports';

export function IntelligenceReportsPricingCard() {
  return (
    <section className="bg-paper py-section">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="mb-10">
          <p className="eyebrow mb-4">Hourly setup. Token costs at cost.</p>
          <h2 className="text-d2 font-serif font-medium text-ink leading-tight">
            {PRICING.setupHeadline}.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">
            {PRICING.setupSubtitle}
          </p>
        </div>

        <div className="relative border border-ruleSoft bg-cream p-8 lg:p-10">
          <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
          <span aria-hidden="true" className="absolute left-0 top-0 h-px w-12 bg-crimson" />
          <div className="flex items-baseline justify-between gap-6 mt-3">
            <div>
              <h3 className="font-serif italic text-[1.5rem] text-ink">
                Intelligence Reports — pipeline setup
              </h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mt-2">
                Billed hourly · scoped before invoicing
              </p>
            </div>
            <p className="font-mono text-[2rem] font-semibold text-ink whitespace-nowrap tabular-nums">
              From $6,800
            </p>
          </div>

          <div className="border-t border-rule my-6" />

          <div className="mb-6">
            <p className="serif-italic text-base text-ink">{PRICING.tokenLine}</p>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mt-2">
              Itemized monthly · you see exactly where AI spend lands.
            </p>
          </div>

          <ul className="space-y-3">
            {PRICING.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink leading-relaxed">
                <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-mute leading-relaxed">
            {PRICING.disclaimer}
          </p>

          <div className="mt-6">
            <Button variant="primary" href="#lead-form" className="w-full justify-center">
              Schedule a scoping call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
