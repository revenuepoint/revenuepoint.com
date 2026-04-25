const items = [
  {
    name: 'Opportunity_Stage_Notifier',
    type: 'Flow',
    plain: 'When stage moves to Negotiation, ping the deal channel and the AM.',
  },
  {
    name: 'Required_Close_Reason',
    type: 'Validation Rule',
    plain: 'Closed Lost requires a reason picklist. Blocks save until set.',
  },
  {
    name: 'Auto_Assign_New_Lead',
    type: 'Trigger',
    plain: 'New web leads route to the rep on call for that territory.',
  },
];

const typeTone: Record<string, string> = {
  Flow: 'bg-navy text-white',
  'Validation Rule': 'bg-amber text-white',
  Trigger: 'bg-crimson text-white',
};

export function AutomationRefMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Automation · in plain English
      </div>
      <div className="mt-3 space-y-3">
        {items.map((i) => (
          <div key={i.name} className="border border-rule rounded-sm p-3">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded-sm ${typeTone[i.type]}`}>
                {i.type}
              </span>
              <code className="text-[11px] text-navy font-semibold truncate">{i.name}</code>
            </div>
            <div className="mt-2 text-[11px] text-ink leading-relaxed">{i.plain}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
