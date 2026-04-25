import { SOURCE_CATEGORIES, SOURCES_FOOTNOTE } from '@/data/research/intelligenceReports';

export function EnrichmentSourcesGrid() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SOURCE_CATEGORIES.map((category) => (
          <div
            key={category.heading}
            className="bg-white border border-border rounded-sm shadow-sm p-6 flex flex-col"
          >
            <p className="text-[10px] uppercase tracking-[0.15em] text-crimson font-bold mb-2">
              {category.heading}
            </p>
            <p className="text-sm text-bodyText leading-relaxed mb-4">{category.description}</p>
            <ul className="space-y-1.5">
              {category.sources.map((source) => (
                <li key={source} className="flex items-start gap-2 text-sm text-navy">
                  <span className="text-crimson mt-1.5 leading-none">·</span>
                  <span>{source}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 text-xs text-mutedText leading-relaxed italic max-w-3xl mx-auto text-center">
        {SOURCES_FOOTNOTE}
      </p>
    </div>
  );
}
