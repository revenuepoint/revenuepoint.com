const flows = [
  { from: 'Salesforce', to: 'NetSuite', dir: '→', label: 'Closed-Won → Sales Order' },
  { from: 'NetSuite', to: 'Salesforce', dir: '→', label: 'Invoice status, paid date' },
  { from: 'Salesforce', to: 'Marketing', dir: '↔', label: 'Lead sync + campaign attribution' },
  { from: 'Salesforce', to: 'Billing', dir: '→', label: 'Subscription start, MRR' },
];

export function IntegrationMapMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Integration map · what flows where
      </div>
      <div className="mt-3 space-y-2">
        {flows.map((f) => (
          <div key={`${f.from}-${f.to}-${f.label}`} className="grid grid-cols-[80px_18px_80px_1fr] items-center gap-2 text-[11px]">
            <span className="font-semibold text-navy text-right truncate">{f.from}</span>
            <span className="text-center text-crimson font-bold">{f.dir}</span>
            <span className="font-semibold text-navy truncate">{f.to}</span>
            <span className="text-ink leading-snug">{f.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-rule text-[10px] uppercase tracking-widest text-mute font-semibold">
        Each line links to its connector + owner
      </div>
    </div>
  );
}
