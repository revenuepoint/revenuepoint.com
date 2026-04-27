import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'Salesforce Managed Services Pricing',
  description:
    'Salesforce administration from your single point of contact and a project manager. From $2,400/month. No long-term contracts.',
  path: '/salesforce/managed-services/pricing/',
});

const salesCloudFeatures = [
  'Your single point of contact at RevenuePoint + a project manager',
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

export default function SalesforceManagedServicesPricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-snow py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Salesforce · Managed services pricing"
            heading={
              <>
                Flexible pricing for teams of <em>any size</em>.
              </>
            }
            body="Salesforce administration from your single point of contact and a project manager — the team that knows your org. Two-week sprints, backlog you prioritize, work delivered transparently. No shared queues. From $2,400/month."
            align="left"
          />

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Sales Cloud Administration"
              price="$2,400"
              period="month (quarterly)"
              description="$2,880/month on monthly billing. 25 hours per month. Covers Salesforce Sales Cloud, single instance."
              features={salesCloudFeatures}
              cta={{ label: 'Get a managed services proposal', href: '/contact/?interest=Salesforce' }}
            />
            <PricingCard
              name="Full Stack Administration"
              price="$4,000"
              period="month (quarterly)"
              description="$4,800/month on monthly billing. 25 hours per month. Everything in Sales Cloud Administration, plus the full product suite."
              features={fullStackFeatures}
              highlight
              cta={{ label: 'Get a managed services proposal', href: '/contact/?interest=Salesforce' }}
            />
            <PricingCard
              name="Custom Plan"
              price="Custom"
              description="For organizations with unique needs. Get in touch and we'll scope a plan specific to your instance."
              features={[
                'Tailored to your Salesforce instance',
                'Custom hours and scope',
                'Team scaled to your requirements — your single point of contact stays constant',
              ]}
              cta={{ label: 'Schedule a custom-plan scoping call', href: '/contact/?interest=Salesforce' }}
            />
          </div>

          <p className="text-center font-mono text-[11px] uppercase tracking-[0.14em] text-mute mt-8">
            No long-term contract · cancel anytime.
          </p>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-cream border-t border-ruleSoft py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeader heading="Additional services." eyebrow="A la carte" />
          <div className="border-t-2 border-ink">
            <div className="grid grid-cols-[1fr_auto] py-3 border-b border-rule">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Service</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute text-right">Starting price</span>
            </div>
            {additionalServices.map((row) => (
              <div key={row.service} className="grid grid-cols-[1fr_auto] py-4 border-b border-ruleSoft">
                <span className="text-ink">{row.service}</span>
                <span className="font-mono text-ink font-semibold tabular-nums text-right">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-snow py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader heading="Ready to get started?" eyebrow="Get in touch" />
          <LeadForm interest="Salesforce" />
        </div>
      </section>
    </>
  );
}
