import { buildMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/Button';

export const metadata = buildMetadata({
  title: 'Page not found',
  description: 'The page you were looking for does not exist on revenuepoint.com.',
  path: '/404/',
});

export default function NotFound() {
  return (
    <section className="bg-paper py-24 lg:py-32">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute justify-center inline-flex items-center gap-2">
          <span className="h-px w-8 bg-rust" /> 404 · page not found
        </p>
        <h1 className="mt-6 text-d1 font-serif font-semibold text-ink">
          That page <em>does not exist</em>.
        </h1>
        <p className="mt-6 text-lede text-inkSoft leading-[1.65] max-w-prose mx-auto">
          The link is wrong, the page moved, or it never existed. Try one of these instead.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button variant="primary" href="/">Go to homepage</Button>
          <Button variant="secondary" href="/foundry/">Explore Foundry</Button>
          <Button variant="secondary" href="/contact/">Get in touch</Button>
        </div>
      </div>
    </section>
  );
}
