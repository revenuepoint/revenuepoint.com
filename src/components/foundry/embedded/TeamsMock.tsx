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

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
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

export function TeamsMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-border shadow-2xl bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#4B53BC] text-white">
        <MSSquares className="h-4 w-4" />
        <span className="text-[11px] font-semibold">Microsoft Teams</span>
        <div className="flex-1 h-7 mx-3 rounded-md bg-white/15 flex items-center px-2.5 text-[10px] text-white/70">
          Search
        </div>
        <span className="h-6 w-6 rounded-full bg-white/20 border border-white/40" />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* App rail */}
        <div className="hidden sm:flex w-12 bg-[#f5f5f5] flex-col items-center py-3 gap-3 border-r border-[#e1dfdd] shrink-0">
          {['Activity', 'Chat', 'Teams', 'Calendar', 'Calls'].map((l, i) => (
            <div key={l} className="flex flex-col items-center gap-0.5 text-[#605e5c] text-[8px]">
              <span className={`h-5 w-5 rounded-sm ${i === 2 ? 'bg-[#4B53BC] text-white flex items-center justify-center' : 'bg-[#d2d0ce]'}`}>
                {i === 2 && <span className="text-[9px] font-bold">T</span>}
              </span>
              <span>{l}</span>
            </div>
          ))}
        </div>

        {/* Channel list */}
        <div className="hidden md:flex w-40 bg-[#f5f5f5] border-r border-[#e1dfdd] flex-col shrink-0">
          <div className="px-3 py-2 border-b border-[#e1dfdd] text-[11px] font-semibold text-[#323130]">
            RevenueOps
          </div>
          <div className="flex flex-col text-[11px]">
            {[
              { name: 'General' },
              { name: 'otto-analyst', active: true },
              { name: 'pipeline' },
              { name: 'ar-watch' },
            ].map((c) => (
              <div
                key={c.name}
                className={`px-3 py-1.5 ${c.active ? 'bg-[#e1dfdd] text-[#323130] font-semibold border-l-2 border-[#4B53BC]' : 'text-[#605e5c]'}`}
              >
                #{c.name}
              </div>
            ))}
          </div>
        </div>

        {/* Main chat */}
        <div className="flex-1 min-w-0 flex flex-col bg-white">
          {/* Channel header */}
          <div className="px-3 py-2 border-b border-[#e1dfdd] text-[11px] font-semibold text-[#323130]">
            # otto-analyst
            <span className="ml-2 text-[10px] text-[#605e5c] font-normal">· Posts</span>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-3 flex flex-col gap-3 overflow-hidden">
            {/* User message */}
            <div className="flex gap-2">
              <span className="h-7 w-7 rounded-full bg-[#4B53BC] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                SK
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#605e5c]">
                  <span className="font-semibold text-[#323130]">Sarah Kim</span> · 9:14 AM
                </p>
                <p className="text-[11.5px] text-[#323130] mt-0.5">@otto what&apos;s our AR aging this week?</p>
              </div>
            </div>

            {/* Otto bot reply */}
            <div className="flex gap-2">
              <span className="h-7 w-7 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0">
                <BotIcon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-[#605e5c]">
                  <span className="font-semibold text-[#323130]">Otto</span>{' '}
                  <span className="text-[9px] px-1 py-0.5 rounded bg-[#e1dfdd] text-[#605e5c]">Bot</span>{' '}
                  · 9:14 AM
                </p>
                <div className="mt-1 rounded border border-[#e1dfdd] bg-[#faf9f8] p-2.5 ring-1 ring-crimson/20">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <BoltIcon className="h-3 w-3 text-crimson" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">Foundry · Prism</span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#323130]">AR aging this week · $312K</p>
                  <div className="flex h-2 rounded-sm overflow-hidden mt-1.5">
                    <div className="bg-emerald-500" style={{ width: '68%' }} />
                    <div className="bg-amber-500" style={{ width: '17%' }} />
                    <div className="bg-orange-500" style={{ width: '10%' }} />
                    <div className="bg-red-500" style={{ width: '5%' }} />
                  </div>
                  <div className="flex justify-between mt-1 text-[9px] text-[#605e5c]">
                    <span>0–30d $212K</span>
                    <span className="text-red-600">60+d $78K</span>
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] px-2 py-1 rounded border border-[#4B53BC] text-[#4B53BC] font-semibold">
                      Download PDF
                    </span>
                    <span className="text-[9px] px-2 py-1 rounded border border-[#e1dfdd] text-[#323130]">
                      Open in Foundry
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typing hint */}
            <div className="flex gap-2 opacity-70">
              <span className="h-7 w-7 rounded-full bg-[#8f52c4] text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                TJ
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-[#323130]">@otto generate Q1 P&amp;L summary</p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
