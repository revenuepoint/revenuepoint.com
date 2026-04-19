'use client';

function SalesforceCloudIcon({ className = 'h-5 w-6' }: { className?: string }) {
  // Stylized "cloud" similar to Salesforce mark — not the actual logo.
  return (
    <svg className={className} viewBox="0 0 64 40" fill="none" aria-hidden="true">
      <path
        d="M18 34c-7.18 0-13-5.82-13-13 0-6.19 4.32-11.36 10.1-12.69C17.56 4.1 22.4 1 28 1c5.6 0 10.44 3.1 12.9 7.31C41.53 8.11 42.26 8 43 8c5.52 0 10 4.48 10 10 0 .93-.13 1.83-.37 2.69C57.06 22.25 60 26.27 60 31c0 5.52-4.48 10-10 10H18z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

function StackIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
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

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

export function SalesforceMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-border shadow-2xl bg-white">
      {/* Top header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#00A1E0]">
        <SalesforceCloudIcon className="h-5 w-7" />
        <div className="flex-1 h-7 rounded-md bg-white/90 flex items-center px-2.5 text-[10px] text-[#54698d]">
          Search Salesforce
        </div>
        <StackIcon className="h-4 w-4 text-white/80" />
        <span className="h-6 w-6 rounded-full bg-white/20 border border-white/40" />
      </div>

      {/* Sub-navigation */}
      <div className="flex items-center gap-4 px-3 py-1.5 border-b border-[#e5e8eb] bg-[#f3f3f3] text-[10px] text-[#16325c]">
        <span className="font-semibold">Sales</span>
        <span className="text-[#54698d]">Accounts ∨</span>
        <span className="text-[#54698d]">Contacts ∨</span>
        <span className="text-[#54698d]">Opportunities ∨</span>
        <span className="text-[#54698d]">Reports ∨</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Left rail */}
        <div className="hidden sm:flex w-10 bg-[#f3f3f3] border-r border-[#e5e8eb] flex-col items-center gap-3 py-3 shrink-0">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="h-5 w-5 rounded-sm bg-[#d8dde6]" />
          ))}
        </div>

        {/* Main canvas */}
        <div className="flex-1 min-w-0 bg-white">
          {/* Record header */}
          <div className="px-3 py-2.5 border-b border-[#e5e8eb] flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-[#16325c] text-white text-[11px] font-bold">
              M
            </span>
            <div className="min-w-0">
              <p className="text-[10px] text-[#54698d] uppercase tracking-wider">Account</p>
              <p className="text-sm font-semibold text-[#16325c] truncate">Meridian Packaging</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="text-[9px] px-2 py-1 rounded border border-[#00A1E0] text-[#00A1E0] bg-white">Edit</span>
              <span className="text-[9px] px-2 py-1 rounded border border-[#e5e8eb] text-[#54698d] bg-white">New Case</span>
            </div>
          </div>

          {/* Highlight stats */}
          <div className="grid grid-cols-3 border-b border-[#e5e8eb] text-[10px]">
            {[
              { label: 'Type', value: 'Customer' },
              { label: 'Industry', value: 'Construction' },
              { label: 'Annual Rev', value: '$218K' },
            ].map((s) => (
              <div key={s.label} className="px-3 py-2 border-r last:border-r-0 border-[#e5e8eb]">
                <p className="text-[#54698d]">{s.label}</p>
                <p className="text-[#16325c] font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          {/* Tab bar */}
          <div className="flex items-center gap-4 px-3 pt-2 text-[10px]">
            {['Details', 'Related', 'Activity', 'News', 'Foundry'].map((t, i) => (
              <span
                key={t}
                className={
                  i === 0
                    ? 'pb-1.5 border-b-2 border-[#00A1E0] text-[#00A1E0] font-semibold'
                    : 'pb-1.5 text-[#54698d]'
                }
              >
                {t}
              </span>
            ))}
          </div>

          {/* Two-col body: Details + Foundry widget */}
          <div className="grid grid-cols-5 gap-3 px-3 py-3">
            {/* Details */}
            <div className="col-span-3 flex flex-col gap-2">
              {[
                ['Account Owner', 'Marcus Torres'],
                ['Phone', '(503) 555-0182'],
                ['Billing Address', '1204 Industrial Way, OR'],
                ['Rating', 'Warm'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-[#e5e8eb] pb-1.5">
                  <p className="text-[9px] text-[#54698d] uppercase tracking-wider">{k}</p>
                  <p className="text-[11px] text-[#16325c]">{v}</p>
                </div>
              ))}
            </div>

            {/* Foundry widget */}
            <div className="col-span-2 relative">
              <div className="rounded-md border border-border bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-crimsonLight border-b border-crimson/20">
                  <BoltIcon className="h-3 w-3 text-crimson" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">Foundry</span>
                </div>
                <div className="px-2.5 py-2 flex flex-col gap-2">
                  <div>
                    <p className="text-[9px] text-mutedText uppercase tracking-wider mb-1">AR aging · $47.2K</p>
                    <div className="flex h-2 rounded-sm overflow-hidden">
                      <div className="bg-emerald-500" style={{ width: '34%' }} />
                      <div className="bg-amber-500" style={{ width: '18%' }} />
                      <div className="bg-orange-500" style={{ width: '20%' }} />
                      <div className="bg-red-500" style={{ width: '28%' }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-bodyText">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                    <span className="truncate">
                      <span className="text-navy font-medium">Out-of-Stock Responder</span> · 2m ago
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded px-2 py-1.5">
                    <span className="inline-flex items-center justify-center h-4 w-4 rounded-full bg-blue-500 text-white shrink-0">
                      <BotIcon className="h-2.5 w-2.5" />
                    </span>
                    <span className="text-[10px] text-navy truncate">Ask Otto about this account…</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
