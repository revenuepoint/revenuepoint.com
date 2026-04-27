import { FAQAccordion } from '@/components/ui/FAQAccordion';

const faqs = [
  {
    question: 'Is this just a pitch for more consulting?',
    answer:
      'No. The report is the deliverable and it is yours. You can execute with us, with another partner, or internally. We price the Health Check at $1,500 because we want the decision to be easy and the work to stand on its own. We also decline engagements where we do not see a clear path to value.',
  },
  {
    question: "What if we're not on Salesforce?",
    answer:
      'The framework is CRM-agnostic. We run the same twelve-domain assessment for HubSpot, Dynamics 365, Zoho, and custom or legacy CRMs. The scoring model and deliverable shape stay the same; the inputs and tooling adapt to the platform. Use the tab switcher on this page to see how examples translate.',
  },
  {
    question: 'Who sees our data?',
    answer:
      'A single named auditor plus one reviewer. We request read-only access for the assessment window only. We sign an NDA and operate under mutual confidentiality. Metadata extracts are deleted at the end of the engagement and we do not retain credentials.',
  },
  {
    question: 'What happens after the 60-minute debrief?',
    answer:
      'You own the report. Most clients convert into a Fix-It Sprint (90 days, fixed fee, close the top criticals), a Managed Services retainer (your single point of contact and a project manager), or a Rebuild program when a bigger overhaul is warranted. A smaller number decide to execute internally. None of those paths is a requirement of the Health Check.',
  },
  {
    question: 'How is this different from Salesforce Optimizer or HubSpot Operations Hub reports?',
    answer:
      'Those tools are inputs — we run them. A Health Check adds governance review, business-process alignment, stakeholder interviews, a scored twelve-domain assessment, a risk register, and a named remediation plan with business case. Tools surface data; the Health Check tells you what to do about it.',
  },
  {
    question: 'Do you recommend migrating CRMs?',
    answer:
      'Only when warranted. More often we recommend fixing what exists. The recommendation is evidence-based: if your current platform can support the operating model with remediation, we say so; if the economics and risk favor migration, we scope that option with the business case attached.',
  },
];

export function HealthCheckFaqs() {
  return (
    <section className="bg-cream border-t border-rule">
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-navySoft mb-4">
            Common questions
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Before you book a scoping call.
          </h2>
        </div>
        <FAQAccordion items={faqs} />
      </div>
    </section>
  );
}
