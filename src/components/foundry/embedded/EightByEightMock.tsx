'use client';

function BoltIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function PhoneIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.8 12.8 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.8 12.8 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

const CALLS = [
  { name: 'Pacific NW Construction', contact: 'Chris Nelson', time: '10:00', active: true },
  { name: 'Sierra Mining Co.', contact: 'Mark Davies', time: '10:30' },
  { name: 'Blue Ridge Distributors', contact: 'Dave Nguyen', time: '11:00' },
  { name: 'Valley Steel Works', contact: 'Teresa Liu', time: '11:30' },
  { name: 'Summit Industrial', contact: 'Alan Ross', time: '1:30' },
];

export function EightByEightMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-rule shadow-2xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#27292F] text-white">
        <div className="flex items-center gap-1.5">
          <span className="h-5 w-5 rounded-sm bg-[#FF3366] flex items-center justify-center text-[10px] font-black">
            8
          </span>
          <span className="text-[11px] font-semibold">8x8 Work · Contact Center</span>
        </div>
        <div className="flex-1 h-7 mx-3 rounded bg-white/10 flex items-center px-2.5 text-[10px] text-white/50">
          Search contacts · calls · recordings
        </div>
        <span className="h-6 w-6 rounded-full bg-white/20 border border-white/30" />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Sidebar: dial queue */}
        <div className="hidden sm:flex w-40 bg-[#f5f5f5] border-r border-[#e1dfdd] flex-col shrink-0">
          <div className="px-3 py-2 border-b border-[#e1dfdd] text-[11px] font-semibold text-[#27292F]">
            Today&apos;s Queue · 5
          </div>
          <div className="flex flex-col text-[11px]">
            {CALLS.map((c) => (
              <div
                key={c.name}
                className={`px-3 py-1.5 border-b border-[#e1dfdd] ${
                  c.active ? 'bg-[#FFE7ED] border-l-2 border-l-[#FF3366]' : ''
                }`}
              >
                <p className="text-[10px] font-semibold text-[#27292F] truncate">{c.contact}</p>
                <p className="text-[9px] text-[#605e5c] truncate">{c.name}</p>
                <p className="text-[9px] text-[#605e5c] mt-0.5 font-mono">{c.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main pane */}
        <div className="flex-1 min-w-0 bg-white flex flex-col">
          {/* Contact header */}
          <div className="px-3 py-2.5 border-b border-[#e1dfdd] flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-[#27292F] text-white text-[11px] font-bold">
              CN
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] font-semibold text-[#27292F] truncate">Chris Nelson</p>
              <p className="text-[10px] text-[#605e5c] truncate">VP Procurement · Pacific NW Construction</p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-500 text-white text-[11px] font-semibold shadow-sm select-none"
              aria-hidden="true"
            >
              <PhoneIcon className="h-3 w-3" />
              Call (503) 555-0182
            </button>
          </div>

          {/* Talking points panel — Foundry */}
          <div className="flex-1 p-3">
            <div className="rounded-md border border-rule bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
              <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-crimsonTint border-b border-crimson/20">
                <div className="flex items-center gap-1.5">
                  <BoltIcon className="h-3 w-3 text-crimson" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">
                    Foundry · Cold-call brief
                  </span>
                </div>
                <span className="text-[9px] text-mute">auto-generated 4m ago</span>
              </div>

              <div className="p-3 flex flex-col gap-2.5">
                {/* Snapshot */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-cream border border-rule rounded px-2 py-1.5">
                    <p className="text-[9px] text-mute uppercase tracking-wider">Account value</p>
                    <p className="text-[12px] font-mono font-bold text-navy">$2.4M / yr</p>
                  </div>
                  <div className="bg-cream border border-rule rounded px-2 py-1.5">
                    <p className="text-[9px] text-mute uppercase tracking-wider">Last order</p>
                    <p className="text-[12px] font-mono font-bold text-navy">Apr 1 · $48K</p>
                  </div>
                  <div className="bg-cream border border-rule rounded px-2 py-1.5">
                    <p className="text-[9px] text-mute uppercase tracking-wider">Open opp</p>
                    <p className="text-[12px] font-mono font-bold text-emerald-600">$340K</p>
                  </div>
                </div>

                {/* Talking points */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-mute mb-1.5">
                    Talking points
                  </p>
                  <ul className="flex flex-col gap-1.5 text-[11.5px] leading-snug text-ink">
                    <li className="flex gap-2">
                      <span className="inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/15 text-emerald-700 text-[9px] font-bold">1</span>
                      <span>
                        <span className="font-semibold text-navy">Q2 reorder is 14 days overdue</span> vs their
                        usual 60-day cadence. Anchor the call around timing.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/15 text-emerald-700 text-[9px] font-bold">2</span>
                      <span>
                        Opened <span className="font-semibold text-navy">2 support cases on M10 hex bolts</span>
                         · offer new anti-vibration SKU as a trade-up.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-emerald-500/15 text-emerald-700 text-[9px] font-bold">3</span>
                      <span>
                        LinkedIn signal: Chris posted about <span className="font-semibold text-navy">warehouse expansion</span>
                         — great hook for larger bulk-order discussion.
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="inline-flex items-center justify-center h-4 w-4 shrink-0 rounded-full bg-red-500/15 text-red-700 text-[9px] font-bold">!</span>
                      <span>
                        <span className="font-semibold text-red-700">Do not mention</span> the March invoice dispute — still
                        being resolved by AP.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
