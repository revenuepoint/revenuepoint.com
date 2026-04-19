'use client';

function BoltIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

function AlertIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <path d="M12 9v4m0 4h.01" />
    </svg>
  );
}

export function SapMock() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-border shadow-2xl bg-white">
      {/* Header — Fiori shell */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#354A5F] text-white">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center justify-center h-5 px-1.5 rounded-sm bg-[#008FD3] text-white text-[10px] font-black tracking-wider">
            SAP
          </span>
          <span className="text-[11px] font-semibold">Fiori · S/4HANA</span>
        </div>
        <div className="flex-1 h-7 mx-3 rounded-sm bg-white/10 flex items-center px-2.5 text-[10px] text-white/60">
          Search
        </div>
        <span className="text-[11px] text-white/70 hidden md:inline">Sales Order Processing</span>
        <span className="h-6 w-6 rounded-full bg-white/20 border border-white/30" />
      </div>

      {/* Object page header — Fiori style dark strip */}
      <div className="bg-[#E5E5E5] border-b border-[#d1d1d1]">
        <div className="px-3 py-2">
          <p className="text-[10px] text-[#515559] uppercase tracking-wider">Sales Order</p>
          <div className="flex items-baseline gap-2 flex-wrap">
            <p className="text-sm font-semibold text-[#354A5F] font-mono">SO-14821</p>
            <span className="text-[10px] text-[#515559]">·</span>
            <p className="text-[12px] text-[#354A5F] truncate">Pacific NW Construction · 5,000 M10 Steel Hex Bolts</p>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap mt-1.5">
            <span className="text-[9px] px-1.5 py-0.5 rounded border bg-amber-50 text-amber-700 border-amber-200 font-semibold uppercase tracking-wider">
              In Process
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded border bg-blue-50 text-blue-700 border-blue-200 font-semibold uppercase tracking-wider">
              Net 30
            </span>
            <span className="text-[9px] text-[#515559] font-mono ml-1">Ship · 2026-04-10</span>
          </div>
        </div>
      </div>

      {/* Body: left form, right Foundry */}
      <div className="grid grid-cols-5 gap-3 p-3 flex-1 min-h-0">
        {/* Form / line items */}
        <div className="col-span-3 flex flex-col gap-3">
          {/* Facet tabs (Fiori-style) */}
          <div className="flex items-center gap-3 border-b border-[#d1d1d1] text-[10px]">
            {['General', 'Items', 'Partners', 'Billing'].map((t, i) => (
              <span
                key={t}
                className={
                  i === 1
                    ? 'pb-1.5 border-b-2 border-[#008FD3] text-[#008FD3] font-semibold'
                    : 'pb-1.5 text-[#515559]'
                }
              >
                {t}
              </span>
            ))}
          </div>

          {/* Line item table */}
          <div className="border border-[#d1d1d1] rounded-sm overflow-hidden">
            <table className="w-full text-[10px]">
              <thead>
                <tr className="bg-[#f7f7f7] text-[#515559]">
                  <th className="text-left px-2 py-1 font-semibold uppercase tracking-wider text-[9px]">Item</th>
                  <th className="text-left px-2 py-1 font-semibold uppercase tracking-wider text-[9px]">Material</th>
                  <th className="text-right px-2 py-1 font-semibold uppercase tracking-wider text-[9px]">Qty</th>
                  <th className="text-right px-2 py-1 font-semibold uppercase tracking-wider text-[9px]">Price</th>
                  <th className="text-right px-2 py-1 font-semibold uppercase tracking-wider text-[9px]">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-[#d1d1d1]">
                  <td className="px-2 py-1 font-mono text-[#354A5F]">10</td>
                  <td className="px-2 py-1 text-[#354A5F]">SKU-2847 · M10 Hex</td>
                  <td className="px-2 py-1 font-mono text-right text-[#354A5F]">5,000</td>
                  <td className="px-2 py-1 font-mono text-right text-[#354A5F]">$0.42</td>
                  <td className="px-2 py-1 font-mono text-right font-semibold text-[#354A5F]">$2,100</td>
                </tr>
                <tr className="border-t border-[#d1d1d1] bg-[#fafafa]">
                  <td className="px-2 py-1 font-mono text-[#354A5F]">20</td>
                  <td className="px-2 py-1 text-[#354A5F]">SKU-3021 · Washer Kit</td>
                  <td className="px-2 py-1 font-mono text-right text-[#354A5F]">5,000</td>
                  <td className="px-2 py-1 font-mono text-right text-[#354A5F]">$0.08</td>
                  <td className="px-2 py-1 font-mono text-right font-semibold text-[#354A5F]">$400</td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-[#f7f7f7] border-t border-[#d1d1d1]">
                  <td colSpan={4} className="px-2 py-1 text-right text-[9px] font-semibold uppercase tracking-wider text-[#515559]">
                    Total
                  </td>
                  <td className="px-2 py-1 font-mono text-right font-bold text-[#354A5F]">$2,500</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Foundry widget */}
        <div className="col-span-2 flex flex-col gap-2">
          {/* Cross-system alert */}
          <div className="rounded-md border border-border bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-crimsonLight border-b border-crimson/20">
              <BoltIcon className="h-3 w-3 text-crimson" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">
                Foundry · cross-system
              </span>
            </div>
            <div className="px-2.5 py-2 flex flex-col gap-2">
              <div className="flex items-start gap-1.5 rounded-md border border-red-200 bg-red-50 p-2">
                <AlertIcon className="h-3 w-3 text-red-600 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-red-700 leading-tight">
                    Customer has $34.2K overdue in QuickBooks
                  </p>
                  <p className="text-[10px] text-bodyText leading-tight mt-0.5">
                    INV-4821 · 78 days late · Net 30
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-[10px]">
                <div className="flex items-center justify-between gap-2 text-bodyText">
                  <span className="text-mutedText">YTD Revenue</span>
                  <span className="font-mono font-semibold text-navy">$186K</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-bodyText">
                  <span className="text-mutedText">Credit remaining</span>
                  <span className="font-mono font-semibold text-amber-700">$13.8K</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-bodyText">
                  <span className="text-mutedText">Salesforce owner</span>
                  <span className="font-mono text-navy">Marcus Torres</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agent recommendation */}
          <div className="rounded-md border border-border bg-white shadow-sm ring-1 ring-crimson/20 overflow-hidden">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-crimsonLight border-b border-crimson/20">
              <BoltIcon className="h-3 w-3 text-crimson" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-crimson">
                Recommended action
              </span>
            </div>
            <div className="px-2.5 py-2 flex flex-col gap-1.5">
              <p className="text-[11px] text-bodyText leading-snug">
                Place a <span className="font-semibold text-navy">credit hold</span> on this SO until
                Meridian&apos;s overdue AR clears.
              </p>
              <span className="text-[10px] text-center px-2 py-1 rounded border border-crimson bg-crimson text-white font-semibold">
                Flag for Human Review
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
