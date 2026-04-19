'use client';

function BoltIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
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

export function SlackMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-border shadow-2xl bg-[#1A1D21]">
      {/* Header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#19171D] text-white/90 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
        </div>
        <span className="text-[11px] font-semibold text-white/90">Slack</span>
        <div className="flex-1 h-6 mx-3 rounded-md bg-white/10 flex items-center justify-center text-[10px] text-white/60">
          RevenuePoint · Search
        </div>
        <span className="h-5 w-5 rounded-full bg-amber-500/80" />
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Workspace + channels */}
        <div className="hidden sm:flex w-44 bg-[#19171D] text-white/80 flex-col shrink-0 border-r border-white/5">
          <div className="px-3 py-2 border-b border-white/10 text-[11px] font-semibold text-white">
            RevenuePoint
          </div>
          <div className="flex flex-col text-[11px]">
            <p className="px-3 pt-2 pb-1 text-[9px] uppercase tracking-wider text-white/40">Channels</p>
            {[
              { name: 'pipeline' },
              { name: 'finance', active: true },
              { name: 'ops' },
              { name: 'otto' },
              { name: 'general' },
            ].map((c) => (
              <div
                key={c.name}
                className={`px-3 py-1 ${c.active ? 'bg-[#1164A3] text-white font-semibold' : 'text-white/70 hover:text-white'}`}
              >
                <span className="text-white/50 mr-0.5">#</span>
                {c.name}
              </div>
            ))}
            <p className="px-3 pt-3 pb-1 text-[9px] uppercase tracking-wider text-white/40">Apps</p>
            <div className="px-3 py-1 text-white/70 flex items-center gap-1.5">
              <span className="inline-flex h-3.5 w-3.5 rounded-sm bg-crimson text-white items-center justify-center">
                <BoltIcon className="h-2 w-2" />
              </span>
              <span>Foundry · Otto</span>
            </div>
          </div>
        </div>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Channel header */}
          <div className="px-3 py-2 border-b border-white/10 text-[12px] font-semibold text-white">
            <span className="text-white/50 mr-0.5">#</span> finance
            <span className="ml-2 text-[10px] text-white/40 font-normal">12 members</span>
          </div>

          {/* Messages */}
          <div className="flex-1 px-3 py-3 flex flex-col gap-4 overflow-hidden">
            {/* User /otto command */}
            <div className="flex gap-2">
              <span className="h-7 w-7 rounded bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                SK
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white/90">
                  <span className="font-semibold">Sarah Kim</span>
                  <span className="text-white/40 ml-1.5">9:14 AM</span>
                </p>
                <p className="text-[11.5px] mt-0.5">
                  <span className="text-[#6FB8E8] font-mono">/otto pipeline review</span>
                </p>
              </div>
            </div>

            {/* Otto bot reply as a Slack block */}
            <div className="flex gap-2">
              <span className="h-7 w-7 rounded bg-crimson text-white flex items-center justify-center shrink-0">
                <BotIcon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white/90">
                  <span className="font-semibold">Otto</span>{' '}
                  <span className="text-[9px] px-1 py-0.5 rounded bg-white/10 text-white/70">APP</span>
                  <span className="text-white/40 ml-1.5">9:14 AM</span>
                </p>
                <div className="mt-1 rounded-md border-l-4 border-crimson bg-[#222529] p-2.5 ring-1 ring-crimson/20">
                  <div className="flex items-center gap-1.5 mb-1">
                    <BoltIcon className="h-3 w-3 text-crimson" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">Foundry · Lens</span>
                  </div>
                  <p className="text-[12px] font-semibold text-white">Q1 Pipeline · $1.84M</p>
                  <div className="mt-1.5 grid grid-cols-3 gap-2 text-[10px]">
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-wider">Weighted</p>
                      <p className="text-white font-mono font-bold">$1.12M</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-wider">Avg deal</p>
                      <p className="text-white font-mono font-bold">$230K</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[9px] uppercase tracking-wider">Win rate</p>
                      <p className="text-emerald-400 font-mono font-bold">31% ▲</p>
                    </div>
                  </div>
                  <div className="mt-2 flex h-1.5 rounded overflow-hidden bg-white/5">
                    <div className="bg-[#60a5fa]" style={{ width: '21%' }} />
                    <div className="bg-[#3b82f6]" style={{ width: '29%' }} />
                    <div className="bg-[#1d4ed8]" style={{ width: '42%' }} />
                    <div className="bg-emerald-600" style={{ width: '8%' }} />
                  </div>
                  <div className="flex gap-1.5 mt-2">
                    <span className="text-[9px] px-2 py-1 rounded border border-emerald-500 text-emerald-400">
                      View in Lens
                    </span>
                    <span className="text-[9px] px-2 py-1 rounded border border-white/20 text-white/80">
                      Share
                    </span>
                  </div>
                </div>
                <p className="text-[10px] text-white/50 mt-1.5">
                  Saved to <span className="text-[#6FB8E8]">#finance</span> · exported to PDF
                </p>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="px-3 py-2 border-t border-white/10">
            <div className="rounded border border-white/10 bg-[#222529] px-2.5 py-1.5 text-[11px] text-white/40">
              Message #finance
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
