import type { IntegrationSystem } from '@/types/industry';

export function IntegrationsStrip({
  description,
  systems,
}: {
  description: string;
  systems: IntegrationSystem[];
}) {
  return (
    <section className="bg-cream border-y border-ruleSoft">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        <div className="max-w-3xl mb-12">
          <p className="eyebrow mb-4">Integrations</p>
          <h2 className="text-d1 font-serif font-medium text-ink">
            Every system connected. <em>Salesforce</em> is where you work.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">{description}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {systems.map((s) => (
            <div key={s.name} className="border border-ruleSoft bg-paper p-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-navy text-paper font-mono text-[10px] font-semibold flex items-center justify-center tracking-wider">
                  {s.name.slice(0, 2).toUpperCase()}
                </span>
                <p className="serif-italic text-[0.9375rem] text-ink truncate">{s.name}</p>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                {s.category}
              </p>
              <p className="mt-1 text-xs text-inkSoft leading-snug">{s.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
