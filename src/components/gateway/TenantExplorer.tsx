'use client';

import { useTenant } from '@/context/TenantContext';
import { gatewayTenants } from '@/data/gatewayTenants';
import { getTenant } from '@/data/gatewayTenants';
import { TenantPortalMockup } from './TenantPortalMockup';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function GlobeIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}
function PlugIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8z" />
      <path d="M12 18v4" />
    </svg>
  );
}
function KeyIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 13L20 4l-3 3 1.5 1.5L16 11l1.5 1.5L14 15" />
    </svg>
  );
}
function PaletteIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <circle cx="13.5" cy="6.5" r="1" />
      <circle cx="17.5" cy="10.5" r="1" />
      <circle cx="8.5" cy="7.5" r="1" />
      <circle cx="6.5" cy="12.5" r="1" />
      <path d="M12 2a10 10 0 0 0 0 20 1.5 1.5 0 0 0 1.06-2.56 1.5 1.5 0 0 1 1.06-2.56H16a6 6 0 0 0 6-6c0-4.97-4.48-9-10-9z" />
    </svg>
  );
}

function TenantPills() {
  const { tenantId, setTenantId } = useTenant();
  return (
    <div className="flex flex-wrap items-center gap-2">
      {gatewayTenants.map((tenant) => {
        const active = tenant.id === tenantId;
        return (
          <button
            key={tenant.id}
            type="button"
            onClick={() => setTenantId(tenant.id)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm border text-sm font-semibold transition-colors ${
              active
                ? 'bg-white text-navy border-white shadow-sm'
                : 'bg-white/[0.06] text-white/85 border-white/15 hover:bg-white/[0.12] hover:border-white/30'
            }`}
            aria-pressed={active}
          >
            <span
              className="inline-flex items-center justify-center h-5 w-5 rounded text-white text-[10px] font-black"
              style={{ background: tenant.primaryColor }}
            >
              {tenant.logoMonogram}
            </span>
            <span>{tenant.name}</span>
            <span className="text-[10px] font-normal text-mutedText hidden lg:inline">
              · {tenant.industry}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function TenantSummary() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);

  const rows: { Icon: (p: { className?: string }) => JSX.Element; label: string; value: string; mono?: boolean }[] = [
    { Icon: GlobeIcon, label: 'Subdomain', value: tenant.subdomain, mono: true },
    { Icon: PlugIcon, label: 'Connection', value: tenant.connectionLabel },
    { Icon: KeyIcon, label: 'Access rule', value: tenant.accessRuleSummary },
    { Icon: PaletteIcon, label: 'Brand color', value: tenant.primaryColor, mono: true },
  ];

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <p className="text-[10px] font-bold uppercase tracking-widest text-crimson mb-3">
        Tenant configuration
      </p>
      <ul className="flex flex-col gap-3">
        {rows.map(({ Icon, label, value, mono }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="inline-flex items-center justify-center h-7 w-7 rounded-md bg-crimson/15 text-crimson shrink-0">
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-gray-400">{label}</p>
              <p
                className={`text-sm text-white leading-snug break-words ${
                  mono ? 'font-mono text-[12px]' : ''
                }`}
              >
                {value}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-4 border-t border-white/10">
        <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Access rule (TypeScript)</p>
        <pre className="text-[11px] font-mono text-white/90 leading-relaxed overflow-x-auto whitespace-pre">
{tenant.accessRuleCode}
        </pre>
      </div>
    </div>
  );
}

export function TenantExplorer() {
  return (
    <div className="flex flex-col gap-8">
      <TenantPills />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 lg:gap-8 items-start">
        <TenantSummary />
        <TenantPortalMockup size="large" />
      </div>
    </div>
  );
}
