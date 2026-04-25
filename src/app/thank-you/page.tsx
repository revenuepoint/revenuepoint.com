import { buildMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/Button';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Thank You — RevenuePoint',
  description: 'Thanks for reaching out. We will be in touch within one business day.',
  path: '/thank-you/',
});

export default function ThankYouPage() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute justify-center inline-flex items-center gap-2">
          <span className="h-px w-8 bg-crimson" /> Received · in queue
        </p>
        <h1 className="mt-6 text-d1 font-serif font-semibold text-ink">
          Thanks — we&rsquo;ll be in touch within <em>one business day</em>.
        </h1>
        <p className="mt-6 text-lede text-inkSoft leading-[1.65] max-w-prose mx-auto">
          We review every submission personally. If your engagement looks like a good fit, we&rsquo;ll reach out to schedule an intro call.
        </p>
        <div className="mt-10 flex justify-center">
          <Button variant="primary" href={SCHEDULE_URL}>
            Schedule a 30-minute intro
          </Button>
        </div>
      </div>
    </section>
  );
}
