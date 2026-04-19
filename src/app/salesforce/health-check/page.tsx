import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'Salesforce Health Check — $1,500 Audit',
  description:
    'A structured Salesforce audit and prioritized action plan in two weeks. Configuration, data quality, security, and automation review.',
  path: '/salesforce/health-check/',
});

const deliverables = [
  'Full audit of current configuration, data model, and active automations',
  'Data quality assessment — duplicates, missing fields, import hygiene',
  'Third-party app and AppExchange integration review',
  'Security and permissions model review',
  'Prioritized action plan with specific recommended fixes in order of business impact',
  '60-minute debrief call to walk through findings',
];

export default function SalesforceHealthCheckPage() {
  return (
    <>
      <HeroSection
        eyebrow="SALESFORCE HEALTH CHECK"
        heading="Is your Salesforce instance working for your business — or against it?"
        body="A misconfigured Salesforce instance doesn't just slow your team down — it creates bad data, broken automations, and reports you can't trust. Our Health Check delivers a structured audit and prioritized action plan in two weeks."
        variant="light"
      />

      {/* What's Included */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="What's Included" />
          <div className="bg-white border border-border rounded-sm shadow-sm p-8">
            <div className="flex items-baseline justify-between mb-6">
              <h3 className="text-xl font-semibold text-navy">Salesforce Health Check</h3>
              <span className="text-2xl font-bold text-navy">$1,500</span>
            </div>
            <ul className="space-y-3">
              {deliverables.map((item) => (
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
              Because all businesses differ in complexity, the Health Check may not be appropriate
              for all organizations. We&apos;ll confirm fit before accepting payment.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Request a Health Check" />
          <LeadForm interest="Salesforce Health Check" />
        </div>
      </section>
    </>
  );
}
