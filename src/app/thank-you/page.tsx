import { buildMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/Button';

export const metadata = buildMetadata({
  title: 'Thank You — RevenuePoint',
  description: 'Thanks for reaching out. We will be in touch within one business day.',
  path: '/thank-you/',
});

export default function ThankYouPage() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-crimsonLight text-crimson flex items-center justify-center mx-auto mb-8">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-navy">
          Thanks — we&apos;ll be in touch within one business day.
        </h1>
        <p className="mt-6 text-lg text-bodyText leading-relaxed">
          We review every submission personally. If your engagement looks like a good fit,
          we&apos;ll reach out to schedule an intro call.
        </p>
        <div className="mt-10">
          <Button
            variant="primary"
            href={process.env.NEXT_PUBLIC_CALENDLY_URL || '#'}
          >
            Schedule a 30-Minute Intro →
          </Button>
        </div>
      </div>
    </section>
  );
}
