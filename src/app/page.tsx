import { HeroSection } from '@/components/ui/HeroSection';
import { LogoStrip } from '@/components/ui/LogoStrip';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { LeadForm } from '@/components/ui/LeadForm';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        eyebrow="Salesforce · SAP · Foundry"
        heading="The technology partner mid-market businesses trust."
        body="We implement, manage, and optimize Salesforce and SAP for growing companies — and put your data to work with Foundry, our managed AI and intelligence platform. One partner for your entire technology stack."
        ctas={[
          { label: 'Schedule a Call →', href: '/contact/', variant: 'primary' },
          { label: 'Explore Foundry →', href: '/foundry/', variant: 'ghost' },
        ]}
        rightSlot={
          <ScreenshotPlaceholder label="Home Feed or Lens dashboard screenshot" />
        }
      />

      {/* Trust Bar */}
      <LogoStrip
        heading="Trusted by growing businesses across North America"
        logos={[
          { name: 'Kinetik Technologies' },
          { name: 'Luster' },
          { name: 'Omya Inc.' },
          { name: 'Melio Payments' },
          { name: 'Partner' },
          { name: 'Partner' },
        ]}
      />

      {/* Three Service Pillars */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Three ways we help your business grow" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Salesforce"
              body="We implement and manage Sales Cloud, Service Cloud, CPQ, Marketing Cloud, Pardot, and Communities. From initial configuration to ongoing administration, your Salesforce instance runs the way your business needs it to."
              cta={{ label: 'Learn More', href: '/salesforce/' }}
            />
            <ServiceCard
              title="SAP"
              body="SAP Business One for growing companies and SAP S/4HANA for enterprise — implemented to your processes and managed by a dedicated team. No shared queues, no offshore handoffs."
              cta={{ label: 'Learn More', href: '/sap/' }}
            />
            <ServiceCard
              title="Foundry"
              body="Connect every system into a unified data warehouse. Get live dashboards, AI-generated analysis, automated agents, and Otto — your AI agent — fully managed by RevenuePoint."
              cta={{ label: 'Explore Foundry', href: '/foundry/' }}
              badge="NEW"
              elevated
            />
          </div>
        </div>
      </section>

      {/* What Makes RevenuePoint Different */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <SectionHeader
                heading="White-glove service. Real accountability."
                body="Most consulting firms implement software and disappear. We vet every client before signing them on — not to be exclusive, but because we only take engagements where we're confident we can deliver measurable ROI. Every client gets a named administrator and project manager. You call them directly."
                align="left"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 lg:mt-0">
              {[
                {
                  title: 'Named Administrator',
                  desc: 'One dedicated admin for your instance. You know who to call.',
                },
                {
                  title: 'No Long-Term Contracts',
                  desc: 'Monthly and quarterly plans. We keep clients by delivering results, not lock-ins.',
                },
                {
                  title: 'Vetted Engagements',
                  desc: 'We decline clients where we don\'t see a clear path to ROI. This keeps quality high for everyone.',
                },
                {
                  title: 'Full Stack Coverage',
                  desc: 'Salesforce, SAP, and Foundry — one partner who understands how it all fits together.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white border border-border rounded-sm shadow-sm p-5"
                >
                  <h3 className="text-base font-semibold text-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-bodyText leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundry Feature Callout */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="NEW FROM REVENUEPOINT"
            heading="Meet Foundry — your managed data and AI platform"
            body="Your business runs on Salesforce, SAP, QuickBooks, and a dozen spreadsheets. None of them talk to each other. Foundry connects all of it into a single clean data warehouse, then delivers dashboards, AI analysis, automated agents, and real-time alerts — managed entirely by RevenuePoint. No data engineers. No six-figure BI contracts."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              {
                title: 'Unified Warehouse',
                desc: 'Every source system synced, cleaned, and ready. Salesforce, SAP, QuickBooks, Shopify, and more.',
              },
              {
                title: 'Dashboards & Intelligence',
                desc: 'Live dashboards, metric trees, AI-generated analysis, and event-driven alerts built from your data.',
              },
              {
                title: 'Otto, Your AI Agent',
                desc: 'Ask questions, surface anomalies, and execute actions across your connected systems from a single chat interface.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-navyMid border-t-[6px] border-t-crimson rounded-sm p-6"
              >
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button variant="ghost" href="/foundry/">
              Explore Foundry →
            </Button>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="From signed contract to live platform in weeks" />
          <StepList
            steps={[
              {
                number: 1,
                title: 'Discovery',
                description:
                  'We learn your business, systems, and goals before quoting. No surprise scope changes.',
              },
              {
                number: 2,
                title: 'Implementation',
                description:
                  'Certified admins configure and deploy to industry best practices, built around your actual processes.',
              },
              {
                number: 3,
                title: 'Handover & Training',
                description:
                  'We train your team on the configured system. You get documentation, not just credentials.',
              },
              {
                number: 4,
                title: 'Ongoing Management',
                description:
                  'A named admin and PM manage your platform month-to-month. Regular audits, proactive recommendations, direct access.',
              },
            ]}
          />
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            heading="Ready to find out if we're a good fit?"
            body="We review every submission personally and respond within one business day. Tell us about your business and what you're trying to solve."
          />
          <LeadForm interest="General" />
        </div>
      </section>
    </>
  );
}
