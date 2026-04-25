'use client';

function MSSquares({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true">
      <rect x="1" y="1" width="8" height="8" fill="#F35325" />
      <rect x="11" y="1" width="8" height="8" fill="#81BC06" />
      <rect x="1" y="11" width="8" height="8" fill="#05A6F0" />
      <rect x="11" y="11" width="8" height="8" fill="#FFBA08" />
    </svg>
  );
}

function BoltIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

export function DynamicsMock() {
  const steps = ['Qualify', 'Develop', 'Propose', 'Close'];
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-rule shadow-2xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#002050] text-white">
        <MSSquares className="h-4 w-4" />
        <span className="text-[11px] font-semibold">Dynamics 365</span>
        <span className="text-[10px] text-white/70">· Sales Hub</span>
        <div className="flex-1 h-7 mx-3 rounded-sm bg-white/10 flex items-center px-2.5 text-[10px] text-white/60">
          Search
        </div>
        <span className="h-6 w-6 rounded-full bg-white/15 border border-white/25" />
      </div>

      {/* Sub header */}
      <div className="flex items-center gap-4 px-3 py-1.5 border-b border-[#e1dfdd] bg-[#faf9f8] text-[10px] text-[#323130]">
        <span className="font-semibold">+ New</span>
        <span>Save</span>
        <span>Qualify</span>
        <span>Assign</span>
        <span>Email a Link</span>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left nav */}
        <div className="hidden sm:flex w-32 bg-[#faf9f8] border-r border-[#e1dfdd] flex-col py-2 shrink-0">
          {[
            ['●', 'Dashboards'],
            ['◷', 'Activities'],
            ['☎', 'Accounts'],
            ['◎', 'Contacts'],
            ['⚡', 'Leads', true],
            ['◈', 'Opportunities'],
            ['▣', 'Reports'],
          ].map(([icon, label, active]) => (
            <div
              key={label as string}
              className={`flex items-center gap-2 px-3 py-1.5 text-[10px] ${
                active ? 'bg-[#edebe9] text-[#323130] font-semibold border-l-2 border-[#0078d4]' : 'text-[#605e5c]'
              }`}
            >
              <span className="w-3 text-center">{icon}</span>
              <span className="truncate">{label}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0">
          {/* Record title + process bar */}
          <div className="px-3 py-2 border-b border-[#e1dfdd]">
            <p className="text-[10px] text-[#605e5c] uppercase tracking-wider">Lead · Open</p>
            <p className="text-sm font-semibold text-[#323130] truncate">Pacific NW Construction — Q2 Renewal</p>
          </div>

          <div className="flex items-center gap-0 px-3 py-2 border-b border-[#e1dfdd] bg-[#faf9f8]">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`flex items-center gap-1.5 px-2 py-1 rounded-l-full rounded-r-full text-[9px] ${
                    i === 1 ? 'bg-[#0078d4] text-white font-semibold' : 'bg-white border border-[#e1dfdd] text-[#605e5c]'
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${i < 1 ? 'bg-emerald-500' : i === 1 ? 'bg-white' : 'bg-[#c8c6c4]'}`} />
                  {s}
                </div>
                {i < steps.length - 1 && <span className="w-2 border-t border-dashed border-[#c8c6c4]" />}
              </div>
            ))}
          </div>

          {/* Body: form + Foundry */}
          <div className="grid grid-cols-5 gap-3 px-3 py-3">
            {/* Form */}
            <div className="col-span-3 flex flex-col gap-2">
              {[
                ['Name', 'Chris Nelson'],
                ['Company', 'Pacific NW Construction'],
                ['Owner', 'Thomas Jones'],
                ['Est. Revenue', '$340,000'],
                ['Close Date', '2026-04-22'],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center gap-2 border-b border-[#e1dfdd] pb-1.5">
                  <p className="text-[10px] text-[#605e5c] w-24 shrink-0">{k}</p>
                  <p className="text-[11px] text-[#323130] truncate">{v}</p>
                </div>
              ))}
            </div>

            {/* Foundry widget */}
            <div className="col-span-2 flex flex-col gap-2">
              {/* Prism CLV */}
              <div className="rounded-md border border-rule bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-crimsonTint border-b border-crimson/20">
                  <BoltIcon className="h-3 w-3 text-crimson" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">Foundry · Prism</span>
                </div>
                <div className="px-2.5 py-2 flex flex-col gap-1.5">
                  <p className="text-[9px] text-mute uppercase tracking-wider">Predicted 24-mo CLV</p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-lg font-bold font-mono text-navy">$620K</p>
                    <p className="text-[10px] text-emerald-600 font-mono">2.3× avg</p>
                  </div>
                  <svg viewBox="0 0 120 24" className="w-full h-5" aria-hidden="true">
                    <polyline
                      points="0,20 15,18 30,16 45,13 60,11 75,9 90,7 105,5 120,3"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="text-[9px] text-center mt-0.5 px-2 py-1 rounded border border-crimson bg-crimson text-white font-semibold">
                    Generate full CLV report
                  </span>
                </div>
              </div>

              {/* Mini metric tree */}
              <div className="rounded-md border border-rule bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-crimsonTint border-b border-crimson/20">
                  <BoltIcon className="h-3 w-3 text-crimson" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">
                    Metric tree
                  </span>
                </div>
                <div className="px-2.5 py-2">
                  <svg viewBox="0 0 160 60" className="w-full h-14" aria-hidden="true">
                    <rect x="55" y="2" width="50" height="16" rx="3" fill="#0F1A2B" />
                    <text x="80" y="13" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="600">Revenue</text>
                    <rect x="5" y="40" width="44" height="16" rx="3" fill="#2563eb" />
                    <text x="27" y="51" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">Orders</text>
                    <rect x="58" y="40" width="44" height="16" rx="3" fill="#2563eb" />
                    <text x="80" y="51" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">AOV</text>
                    <rect x="111" y="40" width="44" height="16" rx="3" fill="#2563eb" />
                    <text x="133" y="51" textAnchor="middle" fontSize="7" fill="#fff" fontWeight="600">Retention</text>
                    <line x1="27" y1="40" x2="75" y2="18" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="80" y1="40" x2="80" y2="18" stroke="#94A3B8" strokeWidth="1" />
                    <line x1="133" y1="40" x2="85" y2="18" stroke="#94A3B8" strokeWidth="1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
