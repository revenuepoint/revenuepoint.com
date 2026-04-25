import { Button } from '@/components/ui/Button';

const included = [
  'Full audit of current configuration, data model, and active automations',
  'Data quality assessment — duplicates, completeness, staleness, match rates',
  'Third-party app and integration architecture review',
  'Security and permissions model review',
  'Twelve scored dimensions, one scorecard page each',
  'Prioritized Now / Next / Later recommendations with effort + dependencies',
  'Risk register as a companion Excel file',
  'Business case with current cost, remediation investment, and projected value',
  '60-minute debrief call to walk through findings',
];

export function HealthCheckPricingCard() {
  return (
    <section className="bg-white">
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-navySoft mb-4">
            Flat fee. Two weeks. One report.
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            A CRM Health Check costs $1,500.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">
            One price, regardless of CRM. One named auditor. The deliverable is yours — you can
            execute it with us, with another partner, or internally.
          </p>
        </div>
        <div className="border border-rule rounded-lg bg-cream p-8">
          <div className="flex items-baseline justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-navy">CRM Health Check</h3>
              <div className="text-xs text-mute mt-1">Two-week engagement</div>
            </div>
            <div className="text-3xl font-bold text-navy">$1,500</div>
          </div>
          <ul className="space-y-3">
            {included.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-ink">
                <svg
                  className="w-4 h-4 text-navy shrink-0 mt-0.5"
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
          <p className="mt-6 text-xs text-mute leading-relaxed italic">
            We decline engagements where we don&apos;t see a clear path to value. We&apos;ll
            confirm fit on a 30-minute scoping call before accepting payment. If the Health Check
            is not the right format for your situation, we&apos;ll say so.
          </p>
          <div className="mt-6">
            <Button variant="primary" href="#request" className="w-full">
              Request a Health Check
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
