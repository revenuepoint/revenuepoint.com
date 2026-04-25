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
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Data model
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            The objects we build on. The objects we add.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border rounded-lg bg-offWhite p-6">
            <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold">
              Standard Salesforce
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {standard.map((o) => (
                <span
                  key={o.name}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-border rounded text-navy"
                >
                  {o.name}
                </span>
              ))}
            </div>
          </div>
          <div className="border border-crimson rounded-lg bg-crimsonLight p-6">
            <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
              Custom — built by RevenuePoint
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {custom.map((o) => (
                <span
                  key={o.name}
                  className="px-2.5 py-1 text-xs font-semibold bg-white border border-crimson/30 rounded text-crimson"
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
