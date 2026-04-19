import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'Salesforce Pricing — Managed Administration Plans',
  description:
    'White-glove Salesforce administration from $2,400/month. Dedicated administrator and project manager. No long-term contracts.',
  path: '/salesforce/pricing/',
});

const salesCloudFeatures = [
  '1 dedicated Salesforce administrator + 1 dedicated project manager',
  'Quarterly Salesforce audit',
  'Access to training and workshops',
  'Custom objects, business process automation, and workflow configuration',
  'Advanced features: Einstein, Lightning Voice, Bots',
  'Bulk data import and export',
  'Third-party integration support',
  'Custom Apex triggers and code',
  'Regular data hygiene assessments',
  'End-user training and support',
  'Business KPI analysis and review',
];

const fullStackFeatures = [
  'Everything in Sales Cloud Administration',
  'Covers Salesforce Service Cloud',
  'Covers CPQ + Billing',
  'Covers Marketing Cloud + Pardot',
  'Covers Community + Partner Clouds (Experience Cloud)',
  'Salesforce Communities management',
];

const additionalServices = [
  { service: 'Hosted Integrations', price: '$99/month' },
  { service: 'Advanced Development (Apex, LWC, Heroku, API)', price: '$250/hour' },
  { service: 'Supplemental Services (consulting, training, vendor comms)', price: '$125/hour' },
];

export default function SalesforcePricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            heading="Flexible pricing for teams of any size"
            body="White-glove Salesforce administration from dedicated administrators and project managers — your single point of contact for everything Salesforce. No shared queues, no offshore routing."
          />

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Sales Cloud Administration"
              price="$2,400"
              period="month (quarterly)"
              description="$2,880/month on monthly billing. 25 hours per month. Covers Salesforce Sales Cloud, single instance."
              features={salesCloudFeatures}
              cta={{ label: 'Get Started', href: '/contact/?interest=Salesforce' }}
            />
            <PricingCard
              name="Full Stack Administration"
              price="$4,000"
              period="month (quarterly)"
              description="$4,800/month on monthly billing. 25 hours per month. Everything in Sales Cloud Administration, plus the full product suite."
              features={fullStackFeatures}
              highlight
              cta={{ label: 'Get Started', href: '/contact/?interest=Salesforce' }}
            />
            <PricingCard
              name="Custom Plan"
              price="Custom"
              description="For organizations with unique needs. Get in touch and we'll scope a plan specific to your instance."
              features={[
                'Tailored to your specific Salesforce instance',
                'Custom hours and scope',
                'Dedicated team configuration',
              ]}
              cta={{ label: 'Contact Us', href: '/contact/?interest=Salesforce' }}
            />
          </div>

          <p className="text-center text-sm text-mutedText mt-6">
            No long-term contract or commitment. Cancel anytime.
          </p>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader heading="Additional Services" />
          <div className="bg-white border border-border rounded-sm shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="text-left py-3 px-6 font-semibold">Service</th>
                  <th className="text-right py-3 px-6 font-semibold">Starting Price</th>
                </tr>
              </thead>
              <tbody>
                {additionalServices.map((row, i) => (
                  <tr key={row.service} className={i % 2 === 0 ? 'bg-white' : 'bg-lightGray'}>
                    <td className="py-3 px-6 text-bodyText">{row.service}</td>
                    <td className="py-3 px-6 text-right font-semibold text-navy">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Ready to get started?" />
          <LeadForm interest="Salesforce" />
        </div>
      </section>
    </>
  );
}
