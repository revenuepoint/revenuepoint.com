import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';
import { AssessmentDomains } from '@/components/healthcheck/AssessmentDomains';
import { CrmTabs } from '@/components/healthcheck/CrmTabs';
import { DeliverableWalkthrough } from '@/components/healthcheck/DeliverableWalkthrough';
import { HealthCheckFaqs } from '@/components/healthcheck/HealthCheckFaqs';
import { HealthCheckHero } from '@/components/healthcheck/HealthCheckHero';
import { HealthCheckPricingCard } from '@/components/healthcheck/HealthCheckPricingCard';
import { Methodology } from '@/components/healthcheck/Methodology';
import { ProofFinding } from '@/components/healthcheck/ProofFinding';
import { WhoItsFor } from '@/components/healthcheck/WhoItsFor';
import { WhyNowStrip } from '@/components/healthcheck/WhyNowStrip';
import { CrmProvider } from '@/context/CrmContext';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'CRM Health Check',
  description:
    'A structured audit and prioritized action plan in two weeks. Twelve domains, a scored scorecard, a risk register, and a business case — for Salesforce, HubSpot, Dynamics, or custom.',
  path: '/salesforce/health-check/',
});

export default function CrmHealthCheckPage() {
  return (
    <>
      <HealthCheckHero />
      <CrmProvider>
        <WhyNowStrip />
        <CrmTabs />
        <DeliverableWalkthrough />
        <AssessmentDomains />
        <Methodology />
        <WhoItsFor />
        <ProofFinding />
        <HealthCheckPricingCard />
        <HealthCheckFaqs />
      </CrmProvider>

      <section id="request" className="bg-white border-t border-rule">
        <div className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
          <SectionHeader
            eyebrow="Schedule a health check"
            heading="Request a CRM Health Check"
            body="Tell us about your stack. We confirm fit, scope the assessment, and send a statement of work."
          />
          <LeadForm interest="CRM Health Check" />
        </div>
      </section>
    </>
  );
}
