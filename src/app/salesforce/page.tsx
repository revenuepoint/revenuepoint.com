import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';

export const metadata = buildMetadata({
  title: 'Salesforce Managed Services & Consulting',
  description:
    '60+ certified Salesforce consultants. Sales Cloud, Service Cloud, CPQ, Pardot, and NPSP — implemented and managed for growing businesses.',
  path: '/salesforce/',
});

const products = [
  {
    title: 'Sales Cloud — Pipeline, Forecasting & Revenue Operations',
    body: 'Most Sales Cloud implementations are configured for Salesforce\'s demo, not your actual sales process. We map your pipeline stages, custom fields, and opportunity flows to the way your team sells — then maintain it as your business evolves. Includes lead and opportunity management, forecast reporting, Einstein activity capture, and third-party integrations.',
  },
  {
    title: 'Service Cloud — Case Management & Customer Support',
    body: 'We implement Service Cloud around your actual support workflows — email, phone, chat, and social — with SLAs, escalation rules, and reporting configured to your team\'s structure. Your agents work the queue; we keep the platform running.',
  },
  {
    title: 'Marketing Cloud & Pardot — Demand Generation & Nurture',
    body: 'Pardot for companies that need aligned marketing and sales pipelines — lead scoring, nurture sequences, Salesforce CRM sync, and campaign attribution reporting. We implement and manage it so your marketers can market.',
  },
  {
    title: 'CPQ & Billing — Quote Automation & Revenue Operations',
    body: 'Manual quoting is a revenue leak. CPQ replaces the spreadsheet and the approval bottleneck with a configured quoting engine that enforces pricing rules and generates contracts. We implement and maintain it.',
  },
  {
    title: 'Experience Cloud — Partner & Customer Portals',
    body: 'Branded portals for partners and customers to submit cases, log deals, and access resources — without internal Salesforce licenses. We build and manage Experience Cloud communities around your use case.',
  },
  {
    title: 'Nonprofit Success Pack — CRM for Nonprofits',
    body: 'NPSP turns Salesforce into the world\'s leading nonprofit CRM. We implement it for fundraising teams and program managers — configured to your campaigns, donor segments, and reporting requirements.',
  },
  {
    title: 'Salesforce Administration — Ongoing Managed Services',
    body: 'Most organizations implement Salesforce correctly and then let it drift. A dedicated RevenuePoint administrator prevents that. We audit, optimize, and evolve your instance month-to-month.',
  },
];

export default function SalesforcePage() {
  return (
    <>
      <HeroSection
        eyebrow="SALESFORCE MANAGED SERVICES & CONSULTING"
        heading="The world's #1 CRM, implemented and managed the right way."
        body="RevenuePoint holds over 60 Salesforce certifications across the full product suite. We've implemented Salesforce for teams of 10 and global rollouts of hundreds of users — and we manage them ongoing so your team can focus on the business, not the platform."
        variant="navy"
      />

      {/* Products */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center ${
                i % 2 === 1 ? 'lg:direction-rtl' : ''
              }`}
            >
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <h3 className="text-xl font-semibold text-navy mb-4">{product.title}</h3>
                <p className="text-base text-bodyText leading-relaxed">{product.body}</p>
              </div>
              <div className={i % 2 === 1 ? 'lg:order-1 mt-6 lg:mt-0' : 'mt-6 lg:mt-0'}>
                <ScreenshotPlaceholder label={product.title.split(' — ')[0]} height={320} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Consulting Credentials */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <SectionHeader
            heading="60+ certifications across the full Salesforce suite"
            body="Our consultants are certified across Sales Cloud, Service Cloud, Marketing Cloud, CPQ, Experience Cloud, and NPSP. We've implemented Salesforce for startups and global enterprises — and we bring those lessons to every engagement."
          />
          <ScreenshotPlaceholder
            label="Salesforce certification badge strip"
            width={1200}
            height={120}
            className="max-w-4xl mx-auto"
          />
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Ready to get started with Salesforce?" />
          <LeadForm interest="Salesforce" />
        </div>
      </section>
    </>
  );
}
