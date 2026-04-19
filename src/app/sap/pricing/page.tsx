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

export default function SAPPricingPage() {
  return (
    <>
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <SectionHeader
            heading="SAP pricing built around your business"
            body="Every SAP implementation is different. We scope pricing based on your business size, module requirements, user count, and integration complexity. No off-the-shelf packages — just a plan that fits your operations."
          />
          <div className="bg-offWhite border border-border rounded-sm p-8 mt-8">
            <h3 className="text-lg font-semibold text-navy mb-3">What we need to build your quote</h3>
            <ul className="text-sm text-bodyText leading-relaxed space-y-2 text-left max-w-md mx-auto">
              <li className="flex gap-2">
                <span className="text-crimson font-bold">1.</span>
                Current ERP system (or none) and number of users
              </li>
              <li className="flex gap-2">
                <span className="text-crimson font-bold">2.</span>
                Modules needed: finance, inventory, manufacturing, sales, HR
              </li>
              <li className="flex gap-2">
                <span className="text-crimson font-bold">3.</span>
                Third-party integrations (Salesforce, Shopify, etc.)
              </li>
              <li className="flex gap-2">
                <span className="text-crimson font-bold">4.</span>
                Timeline and go-live requirements
              </li>
            </ul>
            <div className="mt-6">
              <Button href="/contact/?interest=SAP">Get a Custom Quote →</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Tell us about your SAP requirements" />
          <LeadForm interest="SAP" />
        </div>
      </section>
    </>
  );
}
