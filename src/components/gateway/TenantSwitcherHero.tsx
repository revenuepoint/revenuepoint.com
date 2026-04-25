'use client';

import { useTenant } from '@/context/TenantContext';
import { gatewayTenants } from '@/data/gatewayTenants';
import { TenantPortalMockup } from './TenantPortalMockup';

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
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border text-xs font-semibold transition-colors ${
              active
                ? 'bg-white text-navy border-white shadow-sm'
                : 'bg-white/[0.06] text-white/85 border-white/15 hover:bg-white/[0.12] hover:border-white/30'
            }`}
            aria-pressed={active}
          >
            <span
              className="inline-flex items-center justify-center h-5 w-5 rounded text-white text-[9px] font-black"
              style={{ background: tenant.primaryColor }}
            >
              {tenant.logoMonogram}
            </span>
            <span>{tenant.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TenantSwitcherHero() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1.5">
          Pick a tenant — see the portal swap.
        </p>
        <TenantPills />
      </div>
      <TenantPortalMockup size="compact" />
    </div>
  );
}
