import { Suspense } from 'react';
import { buildMetadata } from '@/lib/metadata';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ContactFormSection } from './ContactFormSection';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'Contact RevenuePoint | Salesforce, SAP & Foundry Partner',
  description:
    'Get in touch. We respond within one business day and only take engagements where we can deliver measurable ROI.',
  path: '/contact/',
});

export default function ContactPage() {
  return (
    <section className="bg-paper py-section">
      <div className="max-w-editorial mx-auto px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* Left — contact details */}
          <div className="mb-12 lg:mb-0 lg:col-span-5">
            <SectionHeader
              eyebrow="Get in touch"
              heading={
                <>
                  Let&rsquo;s find out if we&rsquo;re a <em>good fit</em>.
                </>
              }
              body="We respond to every submission within one business day. We're selective about the engagements we take on — not to be difficult, but because we only work with clients where we're confident we can deliver results."
              align="left"
            />
            <div className="space-y-4 text-sm text-inkSoft border-t border-rule pt-6 mt-2">
              <p className="eyebrow mb-3">Direct lines</p>
              <p>
                <a href="mailto:team@revenuepoint.com" className="serif-italic text-ink hover:text-crimson transition-colors">
                  team@revenuepoint.com
                </a>
              </p>
              <p>
                <a href="tel:+13329001150" className="font-mono text-ink hover:text-crimson transition-colors">
                  +1 (332) 900-1150
                </a>
              </p>
              <address className="not-italic font-mono text-xs text-mute leading-relaxed pt-3">
                Three World Financial Center<br />
                200 Vesey Street, 24th Floor<br />
                New York, NY 10281
              </address>
              <p className="pt-4 border-t border-ruleSoft mt-4">
                <span className="text-mute">Prefer to schedule directly? </span>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="serif-italic text-crimson hover:text-crimsonDeep transition-colors"
                >
                  Book an intro call →
                </a>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            <div className="border border-rule bg-cream p-6 lg:p-8">
              <Suspense fallback={<LeadForm interest="General" />}>
                <ContactFormSection />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
