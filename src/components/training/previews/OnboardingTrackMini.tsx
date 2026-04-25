const tracks = [
  {
    label: 'Day 1',
    items: ['Account login + MFA', 'Lightning tour', 'Read your role section'],
  },
  {
    label: 'Week 1',
    items: ['Shadow 3 live deals', 'Log first 10 activities', 'Run pipeline report'],
  },
  {
    label: 'Month 1',
    items: ['Own a territory', 'Pass admin sign-off', 'Lead a forecast call'],
  },
];

export function OnboardingTrackMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        New-hire ramp · AE track
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {tracks.map((t) => (
          <div key={t.label} className="border border-rule rounded-sm p-2.5">
            <div className="text-[10px] uppercase tracking-widest text-crimson font-bold">
              {t.label}
            </div>
            <ul className="mt-2 space-y-1.5">
              {t.items.map((item) => (
                <li key={item} className="flex items-start gap-1.5 text-[11px] text-ink leading-snug">
                  <span className="mt-0.5 inline-block w-1 h-1 rounded-full bg-crimson shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
