import { SOURCE_CATEGORIES, SOURCES_FOOTNOTE } from '@/data/research/intelligenceReports';

export function EnrichmentSourcesGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOURCE_CATEGORIES.map((category) => (
          <article
            key={category.heading}
            className="relative bg-paper border border-ruleSoft p-6 flex flex-col"
          >
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-crimson mt-3 mb-2">
              {category.heading}
            </p>
            <p className="text-sm text-inkSoft leading-relaxed mb-4">{category.description}</p>
            <ul className="space-y-1.5">
              {category.sources.map((source) => (
                <li key={source} className="flex items-start gap-2 text-sm text-ink">
                  <span className="text-crimson font-mono mt-0.5 leading-none shrink-0" aria-hidden="true">→</span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mt-10 serif-italic text-sm text-mute leading-relaxed max-w-3xl mx-auto text-center">
        {SOURCES_FOOTNOTE}
      </p>
    </div>
  );
}
