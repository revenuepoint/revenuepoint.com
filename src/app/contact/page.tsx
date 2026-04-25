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
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left — contact details */}
          <div className="mb-12 lg:mb-0">
            <SectionHeader
              heading="Let's find out if we're a good fit."
              body="We respond to every submission within one business day. We're selective about the engagements we take on — not to be difficult, but because we only work with clients where we're confident we can deliver results. Tell us about your business."
              align="left"
            />
            <div className="space-y-4 text-sm text-bodyText">
              <div className="space-y-1">
                <p>
                  <a href="mailto:team@revenuepoint.com" className="hover:text-crimson transition-colors">
                    team@revenuepoint.com
                  </a>
                </p>
                <p>
                  <a href="tel:+13329001150" className="hover:text-crimson transition-colors">
                    +1 (332) 900-1150
                  </a>
                </p>
              </div>
              <p className="text-mutedText leading-relaxed">
                Three World Financial Center<br />
                200 Vesey Street, 24th Floor<br />
                New York, NY 10281
              </p>
              <p className="pt-2">
                <span className="text-mutedText">Prefer to schedule directly? </span>
                <a
                  href={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-crimson font-semibold hover:text-crimsonDark transition-colors"
                >
                  Book an Intro Call →
                </a>
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <Suspense fallback={<LeadForm interest="General" />}>
              <ContactFormSection />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
