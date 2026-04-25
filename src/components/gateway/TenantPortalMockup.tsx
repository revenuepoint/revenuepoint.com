'use client';

import { motion } from 'framer-motion';
import { useTenant } from '@/context/TenantContext';
import { getTenant } from '@/data/gatewayTenants';
import type { GatewayTenantRecord } from '@/types/gateway';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function HomeI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4V14H9v8H5a2 2 0 0 1-2-2z" />
    </svg>
  );
}
function ListI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}
function FormI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </svg>
  );
}
function ChartI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M3 3v18h18" />
      <rect x="7" y="13" width="3" height="6" />
      <rect x="12" y="9" width="3" height="10" />
      <rect x="17" y="5" width="3" height="14" />
    </svg>
  );
}
function DocI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}
function BellI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

const STATUS_TONE_CLASSES: Record<GatewayTenantRecord['statusTone'], string> = {
  good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  bad: 'bg-red-50 text-red-700 border-red-200',
  warn: 'bg-amber-50 text-amber-700 border-amber-200',
  neutral: 'bg-slate-50 text-slate-700 border-slate-200',
};

function BrowserChrome({ subdomain, color }: { subdomain: string; color: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#E5E7EB] border-b border-[#D1D5DB]">
      <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
      <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
      <span className="h-2 w-2 rounded-full bg-[#28C840]" />
      <div className="ml-2 flex-1 flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-white border border-[#D1D5DB]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <span className="text-[9px] font-mono text-mutedText truncate">{subdomain}</span>
      </div>
    </div>
  );
}

type PortalSize = 'compact' | 'large';

export function TenantPortalMockup({ size = 'compact' }: { size?: PortalSize }) {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  const isLarge = size === 'large';

  return (
    <motion.div
      key={tenant.id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="rounded-lg overflow-hidden border border-border shadow-2xl bg-white"
      style={{ aspectRatio: isLarge ? '4 / 3' : '5 / 4' }}
    >
      <BrowserChrome subdomain={tenant.subdomain} color={tenant.primaryColor} />

      {/* Tenant header bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 border-b border-border"
        style={{ background: tenant.primaryColorTint }}
      >
        <span
          className="inline-flex items-center justify-center h-6 w-6 rounded text-white text-[10px] font-black"
          style={{ background: tenant.primaryColor }}
        >
          {tenant.logoMonogram}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold text-navy">{tenant.name}</span>
          <span className="text-[8px] text-mutedText">Portal · {tenant.connectionLabel}</span>
        </div>
        <div className="flex-1" />
        <BellI className="h-3 w-3 text-mutedText" />
        <span
          className="h-5 w-5 rounded-full text-white text-[8px] font-bold flex items-center justify-center"
          style={{ background: tenant.primaryColor }}
        >
          {tenant.logoMonogram[0]}
        </span>
      </div>

      <div className="flex" style={{ height: 'calc(100% - 60px)' }}>
        {/* Sidebar */}
        <div className="flex flex-col w-10 shrink-0 border-r border-border bg-offWhite/60 py-1.5">
          {[
            { Icon: HomeI, active: true },
            { Icon: ListI, active: false },
            { Icon: FormI, active: false },
            { Icon: ChartI, active: false },
            { Icon: DocI, active: false },
          ].map((item, i) => (
            <div
              key={i}
              className="relative flex items-center justify-center py-1.5 transition-colors"
              style={
                item.active
                  ? { background: tenant.primaryColorTint, color: tenant.primaryColor }
                  : { color: '#6B8299' }
              }
            >
              {item.active && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ background: tenant.primaryColor }}
                />
              )}
              <item.Icon className={isLarge ? 'h-4 w-4' : 'h-3 w-3'} />
            </div>
          ))}
        </div>

        {/* Main canvas */}
        <div className="flex-1 min-w-0 flex flex-col bg-white">
          {/* Section header */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/60">
            <div className="flex flex-col leading-tight">
              <span
                className="text-[8px] font-bold uppercase tracking-widest"
                style={{ color: tenant.primaryColor }}
              >
                {tenant.recordIdLabel}
              </span>
              <span className="text-[10px] font-semibold text-navy">
                {tenant.recordObjectLabel}
              </span>
            </div>
            <span
              className="text-[8px] px-1.5 py-0.5 rounded-sm font-semibold text-white"
              style={{ background: tenant.primaryColor }}
            >
              + New
            </span>
          </div>

          {/* Records list */}
          <div className="flex-1 overflow-hidden px-2 py-1.5">
            <div className="flex flex-col gap-1">
              {tenant.records.slice(0, isLarge ? 5 : 3).map((r) => (
                <div
                  key={r.id}
                  className="flex items-center gap-2 px-2 py-1.5 border border-border rounded-sm bg-white hover:bg-offWhite transition-colors"
                >
                  <span className="text-[9px] font-mono text-mutedText shrink-0 w-16 truncate">
                    {r.id}
                  </span>
                  <span className="text-[9.5px] text-navy flex-1 truncate">{r.title}</span>
                  <span
                    className={`text-[8px] px-1.5 py-0.5 rounded-sm border font-semibold shrink-0 ${
                      STATUS_TONE_CLASSES[r.statusTone]
                    }`}
                  >
                    {r.status}
                  </span>
                  {isLarge && (
                    <span className="text-[9px] font-mono text-mutedText shrink-0 w-16 text-right">
                      {r.amount}
                    </span>
                  )}
                  <span className="text-[8px] text-mutedText shrink-0 w-16 text-right truncate hidden lg:block">
                    {r.updated}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer strip */}
          <div className="flex items-center justify-between px-3 py-1 border-t border-border/60 bg-offWhite/40">
            <span className="text-[8px] text-mutedText">
              Showing {Math.min(tenant.records.length, isLarge ? 5 : 3)} of {tenant.records.length}
            </span>
            <span className="text-[8px] text-mutedText font-mono">
              {tenant.accessRuleSummary}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
