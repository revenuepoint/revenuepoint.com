import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { PricingCard } from '@/components/ui/PricingCard';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { CTABanner } from '@/components/ui/CTABanner';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Foundry Pricing — Flat Monthly Plans',
  description:
    'Foundry managed data platform pricing from $2,500/month. No usage fees, no per-seat charges. Core, Intelligence, and Enterprise plans.',
  path: '/foundry/pricing/',
});

const addOns = [
  { addon: 'Additional source system connection', price: '+$300–$500/month' },
  { addon: 'Additional Prism report runs (per 10)', price: '+$200/month' },
  { addon: 'Additional active agents (per 5)', price: '+$500/month' },
  { addon: 'Otto in Salesforce (LWC + Apex integration)', price: '+$500/month' },
  { addon: 'Custom dbt model or dashboard development', price: '$150/hour' },
];

const faqItems = [
  {
    question: 'What does "fully managed" actually mean?',
    answer:
      "RevenuePoint handles the entire data stack — Airbyte sync configuration, Airflow orchestration, dbt model development and maintenance, Postgres database administration, dashboard building, agent configuration, Otto's runbook, and portal support. Your team uses the Foundry Portal. We run everything that powers it.",
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Typical implementation is 4–8 weeks depending on the number of source systems and the complexity of your data model. We scope this precisely during discovery before you commit to a monthly plan.',
  },
  {
    question: 'What systems can Foundry connect to?',
    answer:
      'Any system with a REST API, webhook, or database connection. Pre-built connectors for Salesforce, SAP Business One, SAP S/4HANA, QuickBooks, Shopify, Stripe, Mailchimp, and Eventbrite. If you use it, we can likely connect it.',
  },
  {
    question: 'Can I upgrade plans?',
    answer:
      'Yes. Month-to-month, no long-term commitment. Same policy as our Salesforce and SAP managed services.',
  },
  {
    question: 'Does Foundry replace our existing BI tool?',
    answer:
      "For most mid-market clients, yes. Foundry replaces the need for Power BI, Tableau, or Domo — plus eliminates the internal engineering those tools require. If you have existing dashboards you want to preserve, we discuss that during discovery.",
  },
  {
    question: 'Is our data secure?',
    answer:
      'Your data lives in a dedicated Postgres instance provisioned exclusively for your organization. We do not commingle client data. Access is controlled by role-based permissions within the Foundry Portal.',
  },
];

export default function FoundryPricingPage() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-paper py-section overflow-hidden">
        <div className="relative max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Foundry · Pricing"
            heading={
              <>
                Simple, predictable pricing. <em>No surprises</em>.
              </>
            }
            body="Flat monthly managed service pricing. No usage fees, no per-seat charges, no consumption bills. You always know what Foundry costs."
            align="left"
          />

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <PricingCard
              name="Core"
              price="$2,500–$3,500"
              period="month"
              description="For companies starting their data journey"
              features={[
                'Unified data warehouse (up to 3 source systems)',
                'Foundry Portal — unlimited users',
                'Lens: Dashboards (up to 5) + Scorecards (up to 5)',
                'Courier: Scheduled reports (up to 10 subscriptions)',
                'Blueprint: Business object map (up to 8 objects)',
                'Monthly data health review call + email support',
              ]}
              cta={{ label: 'Get Started', href: '/contact/?interest=Foundry+Core' }}
            />
            <PricingCard
              name="Intelligence"
              price="$5,000–$7,500"
              period="month"
              description="For operations-driven businesses that need real intelligence"
              features={[
                'Everything in Core',
                'Lens: Metric Tree + Geographic Maps + unlimited scorecards',
                'Courier: Event-driven alerts (unlimited)',
                'Prism: AI analysis reports (up to 10/month)',
                'Otto: AI chat interface',
                'Up to 5 source systems',
                'Bi-weekly review call + priority support',
              ]}
              highlight
              cta={{ label: 'Get Started', href: '/contact/?interest=Foundry+Intelligence' }}
            />
            <PricingCard
              name="Enterprise"
              price="$10,000–$15,000"
              period="month"
              description="For complex operations with full automation"
              features={[
                'Everything in Intelligence',
                'Agents: Up to 10 active automated agents',
                'Actions: Structured action catalog (20 actions)',
                'Otto in full agent and automation mode',
                'Up to 8 source systems',
                'Dedicated Slack + weekly strategy calls + 4-hour SLA',
              ]}
              cta={{ label: 'Contact Us', href: '/contact/?interest=Foundry+Enterprise' }}
            />
          </div>

          {/* Implementation fee */}
          <div className="max-w-3xl mx-auto mt-10 text-center">
            <p className="text-sm text-ink leading-relaxed">
              One-time implementation fee of{' '}
              <span className="font-semibold text-navy">$8,000–$60,000</span> depending on source
              system count and data complexity. Scoped during a paid discovery engagement before you
              commit to a monthly plan.
            </p>
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="A la carte" heading="Add-ons." align="left" />
          <div className="border-t-2 border-ink">
            <div className="grid grid-cols-[1fr_auto] py-3 border-b border-rule">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Add-on</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute text-right">Price</span>
            </div>
            {addOns.map((row) => (
              <div key={row.addon} className="grid grid-cols-[1fr_auto] py-4 border-b border-ruleSoft">
                <span className="text-ink">{row.addon}</span>
                <span className="font-mono text-ink font-semibold tabular-nums text-right">{row.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-paper py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader eyebrow="Frequently asked" heading="Before you sign." align="left" />
          <FAQAccordion items={faqItems} />
        </div>
      </section>

      {/* Demo CTA */}
      <CTABanner
        heading="Ready to see Foundry in action?"
        body="Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours."
        cta={{ label: 'Schedule a Demo →', href: SCHEDULE_URL }}
      />
    </>
  );
}
