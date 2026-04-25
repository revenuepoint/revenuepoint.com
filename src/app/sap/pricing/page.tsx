import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';
import { Button } from '@/components/ui/Button';

export const metadata = buildMetadata({
  title: 'SAP Pricing — Managed Services',
  description:
    'SAP Business One and S/4HANA managed services pricing. Contact us for a custom quote based on your specific requirements.',
  path: '/sap/pricing/',
});

const intakeItems = [
  { num: 'i', label: 'Current ERP system (or none) and number of users' },
  { num: 'ii', label: 'Modules needed: finance, inventory, manufacturing, sales, HR' },
  { num: 'iii', label: 'Third-party integrations (Salesforce, Shopify, etc.)' },
  { num: 'iv', label: 'Timeline and go-live requirements' },
];

export default function SAPPricingPage() {
  return (
    <>
      <section className="bg-paper py-section">
        <div className="max-w-narrow mx-auto px-6 lg:px-8 text-center">
          <SectionHeader
            eyebrow="SAP · Pricing"
            heading={
              <>
                SAP pricing built around <em>your</em> business.
              </>
            }
            body="Every SAP implementation is different. We scope pricing based on your business size, module requirements, user count, and integration complexity. No off-the-shelf packages — just a plan that fits your operations."
            align="center"
          />
          <div className="mt-8 border border-rule bg-cream p-8 lg:p-10 text-left">
            <p className="eyebrow mb-5">What we need to build your quote</p>
            <ol className="space-y-3 list-none">
              {intakeItems.map((item) => (
                <li key={item.num} className="grid grid-cols-[2.5rem_1fr] gap-3 items-baseline">
                  <span className="font-serif italic text-[1.25rem] text-crimson">{item.num}</span>
                  <span className="text-sm text-ink leading-relaxed">{item.label}</span>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <Button href="/contact/?interest=SAP">Get a custom quote</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream border-t border-ruleSoft py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader heading="Tell us about your SAP requirements." />
          <LeadForm interest="SAP" />
        </div>
      </section>
    </>
  );
}
