function RedactBar({
  width,
  tone = 'ink',
}: {
  width: string;
  tone?: 'ink' | 'mute';
}) {
  const bg = tone === 'mute' ? 'bg-mute/20' : 'bg-ink/15';
  return (
    <span
      aria-hidden="true"
      className={`block h-[7px] ${bg}`}
      style={{ width }}
    />
  );
}

function ClockIcon() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}

const RUNS: Array<'success' | 'amber'> = [
  'success', 'success', 'success', 'success', 'success', 'success',
  'amber',   'success', 'success', 'success', 'success', 'success',
  'success', 'success', 'success', 'amber',   'success', 'success',
  'success', 'success', 'success', 'success', 'success', 'success',
];

export function HeroAgentMockup() {
  return (
    <div className="product-surface">
      <div className="rounded-lg border border-rule bg-white border-t-4 border-t-amber-500 p-5 lg:p-6 flex flex-col gap-4 shadow-editorial">
        <div>
          <h3 className="font-semibold text-[15px] text-navy leading-snug">
            OEE Anomaly Watcher
          </h3>
          <div className="flex items-center gap-1.5 mt-2">
            <span className="inline-flex items-center text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200">
              Watcher
            </span>
            <span className="inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border border-rule text-mute">
              Production · all lines
            </span>
          </div>
        </div>

        <div className="space-y-1.5" aria-label="Description">
          <RedactBar width="100%" />
          <RedactBar width="94%" />
          <RedactBar width="78%" tone="mute" />
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-mute">
          <ClockIcon />
          <span>Continuous · 5-minute windows</span>
        </div>

        <div className="border-t border-rule pt-3">
          <p className="text-[10px] text-mute uppercase tracking-widest mb-1.5">
            Recent runs
          </p>
          <div className="flex items-end gap-[2px] h-5">
            {RUNS.map((r, i) => (
              <span
                key={i}
                className={`w-1 h-full rounded-[1px] ${
                  r === 'success' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ opacity: 0.4 + (i / RUNS.length) * 0.6 }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 border-t border-rule pt-3">
          <div>
            <p className="text-[9px] text-mute uppercase tracking-wider">Success</p>
            <p className="font-mono font-bold text-sm mt-0.5 text-navy">99%</p>
          </div>
          <div>
            <p className="text-[9px] text-mute uppercase tracking-wider">Avg</p>
            <p className="font-mono font-medium text-sm mt-0.5 text-navy">1.4s</p>
          </div>
          <div>
            <p className="text-[9px] text-mute uppercase tracking-wider">Last</p>
            <p className="font-medium text-sm mt-0.5 text-navy">3m ago</p>
          </div>
          <div>
            <p className="text-[9px] text-mute uppercase tracking-wider">Next</p>
            <p className="font-medium text-sm mt-0.5 text-navy">continuous</p>
          </div>
        </div>
      </div>
    </div>
  );
}
