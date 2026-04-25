import type { IntegrationSystem } from '@/types/industry';

export function IntegrationsStrip({
  description,
  systems,
}: {
  description: string;
  systems: IntegrationSystem[];
}) {
  return (
    <section className="bg-offWhite border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Integrations
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Every system connected. Salesforce is the place you work.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {systems.map((s) => (
            <div
              key={s.name}
              className="border border-border rounded-md bg-white p-4"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded bg-navy text-white text-[10px] font-bold flex items-center justify-center">
                  {s.name.slice(0, 2).toUpperCase()}
                </span>
                <div className="text-sm font-bold text-navy truncate">{s.name}</div>
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-widest text-mutedText">
                {s.category}
              </div>
              <div className="mt-1 text-xs text-bodyText leading-snug">{s.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
