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
    <section className="bg-snow">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">Why now</p>
          <h2 className="text-d2 font-serif font-medium text-ink">
            The cost of waiting is <em>compounding</em>.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiles.map((t) => (
            <article key={t.title} className="relative border border-ruleSoft bg-cream p-5">
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
              <h3 className="font-serif italic text-[1rem] text-ink leading-snug mt-3">{t.title}</h3>
              <p className="mt-2 text-xs text-inkSoft leading-relaxed">{t.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
