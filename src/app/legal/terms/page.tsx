import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Terms of Use',
  description: 'RevenuePoint Inc. master services agreement and terms of use.',
  path: '/legal/terms/',
});

export default function TermsPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-navy mb-8">
          Master Services Agreement for Consulting Services
        </h1>
        <div className="prose prose-sm max-w-none text-bodyText space-y-6 leading-relaxed">
          <p className="text-sm text-mutedText">
            RevenuePoint Inc., a Delaware corporation<br />
            200 Vesey Street, 24th Floor, New York, NY 10281
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Services & Compensation</h2>
          <p>
            Provider delivers consulting services per Statement of Work. Customer pays fees as
            specified, plus reimbursable expenses. Interest accrues at 1.5% per month (18% per
            annum) on unpaid balances after 30 days.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Retainer</h2>
          <p>
            Customer deposits retainer amount before services commence.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Term & Termination</h2>
          <p>
            Agreement continues until service completion. Either party may terminate with 30 days&apos;
            written notice.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Customer Cooperation</h2>
          <p>
            Customer must provide timely documents, data, and personnel access. Non-compliance
            extends completion timelines and shifts costs to Customer.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Work Product Ownership</h2>
          <p>
            Customer owns all deliverables upon payment, except non-specific materials retained by
            Provider under perpetual license.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Confidentiality</h2>
          <p>
            Both parties protect confidential information for two years post-termination.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Liability Limitations</h2>
          <p>
            Neither party&apos;s liability exceeds fees paid under applicable Statement of Work. No
            recovery for indirect or consequential damages.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Non-Solicitation</h2>
          <p>
            Parties cannot recruit each other&apos;s employees for one year post-termination.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Governing Law</h2>
          <p>
            New Jersey law applies; exclusive jurisdiction in New Jersey courts.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Cancellation Fees</h2>
          <p>
            Cancellations within 10 days incur three-day charges plus non-refundable travel
            expenses.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Contact</h2>
          <p>
            For questions about these terms, contact us at{' '}
            <a href="mailto:hello@revenuepoint.com" className="text-crimson hover:text-crimsonDark transition-colors">
              hello@revenuepoint.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
