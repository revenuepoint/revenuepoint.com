import { Button } from '@/components/ui/Button';
import { PRICING } from '@/data/research/intelligenceReports';

export function IntelligenceReportsPricingCard() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Hourly setup. Token costs at cost.
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            {PRICING.setupHeadline}.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">{PRICING.setupSubtitle}</p>
        </div>

        <div className="border border-border rounded-lg bg-offWhite p-8">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-navy">Intelligence Reports — pipeline setup</h3>
              <div className="text-xs text-mutedText mt-1">Billed hourly · Scoped before invoicing</div>
            </div>
            <div className="text-3xl font-bold text-navy whitespace-nowrap">From $6,800</div>
          </div>

          <div className="border-t border-border my-6" />

          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-navy">{PRICING.tokenLine}</p>
              <p className="text-xs text-mutedText mt-1">
                Itemized monthly. You see exactly where AI spend lands.
              </p>
            </div>
          </div>

          <ul className="space-y-3">
            {PRICING.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-bodyText">
                <svg
                  className="w-4 h-4 text-green shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-xs text-mutedText leading-relaxed italic">
            {PRICING.disclaimer}
          </p>

          <div className="mt-6">
            <Button variant="primary" href="#lead-form" className="w-full">
              Schedule a scoping call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
