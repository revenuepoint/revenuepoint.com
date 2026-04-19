import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { LeadForm } from '@/components/ui/LeadForm';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata = buildMetadata({
  title: 'Certified Salesforce Consulting',
  description:
    'Over 60 Salesforce certifications. Sales Cloud, Service Cloud, CPQ, Pardot, Experience Cloud, and NPSP consulting.',
  path: '/salesforce/consulting/',
});

const services = [
  {
    title: 'Sales Cloud',
    body: 'Pipeline management, forecasting, opportunity tracking, and revenue operations — configured to your actual sales process.',
  },
  {
    title: 'Service Cloud',
    body: 'Case management, SLAs, escalation rules, and omni-channel support — built around your support workflows.',
  },
  {
    title: 'Experience Cloud (Communities)',
    body: 'Branded partner and customer portals for case submission, deal registration, and self-service resources.',
  },
  {
    title: 'Marketing Cloud',
    body: 'Enterprise-scale marketing automation, journey builder, and cross-channel campaign management.',
  },
  {
    title: 'Pardot',
    body: 'Lead scoring, nurture sequences, CRM sync, and campaign attribution — aligned with your sales pipeline.',
  },
  {
    title: 'CPQ & Billing',
    body: 'Automated quoting, pricing rules, contract generation, and revenue recognition — replacing spreadsheets and bottlenecks.',
  },
  {
    title: 'Nonprofit Success Pack (NPSP)',
    body: 'Fundraising, donor management, campaign tracking, and grant reporting for nonprofit organizations.',
  },
  {
    title: 'Third-Party AppExchange Integrations',
    body: 'We connect Salesforce to your existing tools — ERP, marketing, finance, and custom applications.',
  },
];

export default function SalesforceConsultingPage() {
  return (
    <>
      <HeroSection
        eyebrow="SALESFORCE CONSULTING"
        heading="Certified Salesforce consulting across the full product suite"
        body="Our consultants hold over 60 Salesforce certifications and have implemented Salesforce for teams of 10 to global rollouts of hundreds of users. We specialize in implementations that stick — configured to your process, trained to your team, supported beyond go-live."
        variant="light"
      />

      {/* Services Grid */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                body={service.body}
                cta={{ label: 'Get Started', href: '#lead-form' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Tell us about your Salesforce project" />
          <LeadForm interest="Salesforce Consulting" id="lead-form" />
        </div>
      </section>
    </>
  );
}
