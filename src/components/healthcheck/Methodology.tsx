const steps = [
  {
    num: 1,
    title: 'Day 1 · Discovery call',
    body: 'We align on goals, scope, and stakeholders, and request read-only access to the CRM, observability, and any integration platform.',
  },
  {
    num: 2,
    title: 'Days 2–7 · Metadata + interviews',
    body: 'Metadata extraction (Salesforce CLI, HubSpot Design Manager, Power Platform CoE Kit, or equivalent), Optimizer + Security Health Check runs, plus 6–10 stakeholder interviews.',
  },
  {
    num: 3,
    title: 'Days 8–12 · Analysis + scoring',
    body: 'We score all twelve domains, build the risk register, and draft the prioritized recommendations — with effort, dependencies, and business case.',
  },
  {
    num: 4,
    title: 'Days 13–14 · Delivery + debrief',
    body: 'Full report, companion Excel risk register, and a 60-minute debrief with your team. You own the deliverable. You decide what happens next.',
  },
];

export function Methodology() {
  return (
    <section className="bg-offWhite border-y border-border">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            How we do it
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Two weeks. A named auditor. Nothing mysterious.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-bodyText">
            Every Health Check runs the same four-stage cadence. Metadata pulls are read-only; no
            changes are made to your system. We publish methodology transparently because we want
            you to trust the result — and repeat it if you need to.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div key={s.num} className="border border-border rounded-lg bg-white p-5">
              <div className="w-8 h-8 rounded-full bg-crimson text-white font-bold flex items-center justify-center text-sm">
                {s.num}
              </div>
              <div className="mt-3 text-sm font-bold text-navy">{s.title}</div>
              <div className="mt-2 text-xs text-bodyText leading-relaxed">{s.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
