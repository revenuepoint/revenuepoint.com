import { Button } from '@/components/ui/Button';
import type { IndustryPageContent } from '@/types/industry';

export function IndustryHero({ content }: { content: IndustryPageContent }) {
  return (
    <section className="relative bg-paper overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-0.05em] top-[-0.15em] font-serif italic font-light text-ink leading-[0.86] whitespace-nowrap"
        style={{ fontSize: 'clamp(14rem, 32vw, 32rem)', opacity: 0.05 }}
      >
        {content.navLabel.charAt(0)}
      </span>
      <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-16 lg:pt-28 pb-16 lg:pb-24">
        <div className="max-w-4xl">
          <p className="byline mb-5">{content.hero.eyebrow}</p>
          <h1 className="text-d0 font-serif font-semibold text-ink">{content.hero.headline}</h1>
          <p className="mt-6 text-lede leading-[1.65] max-w-lede text-inkSoft">
            {content.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="primary"
              href={`/contact/?interest=${encodeURIComponent(content.navLabel)}`}
            >
              Book a working session
            </Button>
            <Button variant="secondary" href="#record-page">
              See the record page
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
