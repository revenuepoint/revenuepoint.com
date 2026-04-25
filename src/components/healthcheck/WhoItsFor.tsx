const personas = [
  {
    role: 'RevOps / CRO',
    line: 'You inherit CRM chaos every time leadership changes.',
    body: 'You need a defensible plan that sales leaders, finance, and your board will sign off on — one that names the problems specifically and assigns them a path.',
  },
  {
    role: 'CFO / COO',
    line: "You're asked to approve budget for CRM work and don't have a way to scope it.",
    body: 'The Health Check gives you a line-item business case with current cost, remediation investment, and projected annual value — so the decision is an ROI decision, not a faith decision.',
  },
  {
    role: 'CIO / Head of IT',
    line: 'You own the system and the risk. Neither is documented.',
    body: "You leave with a risk register, an integration inventory, and a documented remediation roadmap — in the CRM's own terminology — that your team can execute from.",
  },
];

export function WhoItsFor() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Who it&apos;s for
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Three buyers. Three different asks. One deliverable.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {personas.map((p) => (
            <div key={p.role} className="border border-border rounded-lg bg-offWhite p-6">
              <div className="text-[10px] uppercase tracking-widest text-crimson font-bold">
                {p.role}
              </div>
              <div className="mt-2 text-lg font-bold text-navy leading-snug">{p.line}</div>
              <div className="mt-3 text-sm text-bodyText leading-relaxed">{p.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
