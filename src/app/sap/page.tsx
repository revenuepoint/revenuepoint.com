import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'SAP Business One & S/4HANA Managed Services',
  description:
    'SAP Business One for SMBs and S/4HANA for enterprise — implemented to your processes, managed by a dedicated team.',
  path: '/sap/',
});

const products = [
  {
    title: 'SAP Business One — SMB ERP',
    body: 'Built for companies between $5M and $100M in revenue that have outgrown QuickBooks. We implement Business One around your actual operations — finance, inventory, purchasing, sales, and manufacturing — and manage it ongoing so your team never has to figure it out alone.',
    features: [
      'Financial management',
      'Inventory and warehouse',
      'Purchasing and procurement',
      'Sales and CRM',
      'MRP and light manufacturing',
      'Reporting and analytics',
      'Ongoing administration',
    ],
  },
  {
    title: 'SAP S/4HANA — Enterprise ERP',
    body: "S/4HANA is SAP's flagship enterprise platform — built on the HANA in-memory database with embedded analytics, AI-driven automation, and a modern Fiori interface. We implement and manage S/4HANA for organizations that require enterprise-scale ERP with the operational rigor to match.",
    features: [
      'Full financial suite',
      'Supply chain and procurement',
      'Manufacturing and MRP',
      'Sales and distribution',
      'HR and payroll integration',
      'SAP Fiori UX',
      'Ongoing managed services',
    ],
  },
  {
    title: 'SAP Administration Services',
    body: "A SAP instance that isn't actively managed drifts. Customizations break on updates. Reports become stale. Integrations fail silently. Our SAP administration services keep your instance current, clean, and aligned with your business as it evolves.",
    features: [],
  },
];

export default function SAPPage() {
  return (
    <>
      <HeroSection
        eyebrow="SAP MANAGED SERVICES"
        heading="ERP that runs your business — not the other way around."
        body="SAP Business One for growing companies and SAP S/4HANA for enterprise — implemented to your actual processes and managed by a dedicated team. We've seen what bad ERP implementations look like. We build ours to last."
        variant="navy"
      />

      {/* Products */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-16">
          {products.map((product) => (
            <div key={product.title} className="border-l-4 border-crimson pl-8">
              <h3 className="text-xl font-semibold text-navy mb-4">{product.title}</h3>
              <p className="text-base text-bodyText leading-relaxed mb-6">{product.body}</p>
              {product.features.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {product.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm text-bodyText">
                      <svg
                        className="w-4 h-4 text-green shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Ready to discuss SAP?" />
          <LeadForm interest="SAP" />
        </div>
      </section>
    </>
  );
}
