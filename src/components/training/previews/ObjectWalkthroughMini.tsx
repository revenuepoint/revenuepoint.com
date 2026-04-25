const stages = [
  { name: 'Lead', tone: 'navy', note: 'Source · Owner · Status' },
  { name: 'Opportunity', tone: 'crimson', note: 'Stage · Amount · Close date' },
  { name: 'Order', tone: 'green', note: 'Pricebook · Terms · Renewal date' },
];

const toneBg: Record<string, string> = {
  navy: 'bg-navy text-white',
  crimson: 'bg-navySoft text-white',
  green: 'bg-navy text-white',
};

export function ObjectWalkthroughMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Lifecycle · Lead → Opportunity → Order
      </div>
      <div className="mt-3 space-y-3">
        {stages.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-stretch">
              <div className={`w-20 shrink-0 rounded-sm ${toneBg[s.tone]} text-xs font-bold px-2 py-1.5 flex items-center justify-center text-center leading-tight`}>
                {s.name}
              </div>
              <div className="flex-1 ml-3 text-[11px] text-ink leading-relaxed">
                <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                  Key fields
                </div>
                <div>{s.note}</div>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center mt-2 ml-7 text-mute text-xs">
                <span aria-hidden="true">↓</span>
                <span className="ml-2 text-[10px] uppercase tracking-widest font-semibold">
                  Stage transition rules
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
