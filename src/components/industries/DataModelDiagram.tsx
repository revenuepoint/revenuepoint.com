import type { DataModelObject } from '@/types/industry';

export function DataModelDiagram({
  description,
  objects,
}: {
  description: string;
  objects: DataModelObject[];
}) {
  const standard = objects.filter((o) => o.kind === 'standard');
  const custom = objects.filter((o) => o.kind === 'custom');

  return (
    <section className="bg-snow">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">Data model</p>
          <h2 className="text-d1 font-serif font-medium text-ink">
            The objects we <em>build on</em>. The objects we add.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-ruleSoft bg-cream p-6 lg:p-7 relative">
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navy" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute mt-3">
              Standard Salesforce
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {standard.map((o) => (
                <span
                  key={o.name}
                  className="font-mono px-2.5 py-1 text-[11px] bg-paper border border-rule text-ink"
                >
                  {o.name}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-crimson bg-crimsonTint p-6 lg:p-7 relative">
            <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-crimson" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-crimson mt-3">
              Custom — built by RevenuePoint
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {custom.map((o) => (
                <span
                  key={o.name}
                  className="font-mono px-2.5 py-1 text-[11px] bg-paper border border-crimson text-crimson"
                >
                  {o.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
