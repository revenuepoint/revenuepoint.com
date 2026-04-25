const tiles = [
  {
    title: 'Workflow Rules retire December 2025',
    body: 'Salesforce is ending Workflow Rules and Process Builder. Most mid-market orgs still have dozens live — unmigrated automations become forced rush work at a premium.',
  },
  {
    title: 'Agentforce and Copilot need clean data',
    body: 'Every AI layer shipping in 2026 reads your schema, field descriptions, and automations. Dirty data becomes AI that invents things in front of customers.',
  },
  {
    title: 'CRM consolidation is accelerating',
    body: 'Every vendor is promising "the AI-ready platform." Buyers who consolidate without fixing the underlying data carry the mess forward.',
  },
  {
    title: 'Integration sprawl compounds',
    body: 'Every added point-to-point integration is another owner, another credential, another silent failure path. The longer you wait, the more there is to undo.',
  },
];

export function WhyNowStrip() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-3xl mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Why now
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            The cost of waiting is compounding.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiles.map((t) => (
            <div key={t.title} className="border border-border rounded-lg bg-offWhite p-5">
              <div className="text-sm font-bold text-navy leading-snug">{t.title}</div>
              <div className="mt-2 text-xs text-bodyText leading-relaxed">{t.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
