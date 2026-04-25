import { Button } from '@/components/ui/Button';
import type { IndustryPageContent } from '@/types/industry';

export function IndustryHero({ content }: { content: IndustryPageContent }) {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            {content.hero.eyebrow}
          </p>
          <div className="w-10 h-[3px] mb-6 bg-crimson" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            {content.hero.headline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed max-w-2xl text-gray-300">
            {content.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" href={`/contact/?interest=${encodeURIComponent(content.navLabel)}`}>
              Book a working session
            </Button>
            <Button variant="ghost" href="#record-page">
              See the record page
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
