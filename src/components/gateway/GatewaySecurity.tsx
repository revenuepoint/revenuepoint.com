'use client';

import { gatewaySecurityPillars, gatewaySecurityStats } from '@/data/gatewaySecurity';
import type { GatewaySecurityPillar } from '@/types/gateway';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function IsolationIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
function AuthIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
function SessionIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 14h8M8 17h5" />
    </svg>
  );
}
function AuditIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M9 13l2 2 4-4" />
    </svg>
  );
}
function ComplianceIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M12 2l9 4v6c0 5-4 9-9 11-5-2-9-6-9-11V6l9-4z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
function ResidencyIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

const ICON_BY_ID: Record<GatewaySecurityPillar['iconId'], (p: { className?: string }) => JSX.Element> = {
  isolation: IsolationIcon,
  auth: AuthIcon,
  session: SessionIcon,
  audit: AuditIcon,
  compliance: ComplianceIcon,
  residency: ResidencyIcon,
};

export function GatewaySecurity() {
  return (
    <section className="relative bg-navy text-white py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 10, 57, 0.22) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Security &amp; Compliance
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Tenant isolation at every layer. Audit log on every action.
          </h2>
          <p className="mt-5 text-base lg:text-lg leading-relaxed text-gray-300">
            Gateway is built for companies that have to answer hard security questions about
            who sees what. Tenant scoping is enforced at the edge, magic-link tokens have
            short lifetimes, sessions live server-side, and every action — issuance, login,
            read, write — lands in the audit log.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {gatewaySecurityPillars.map((pillar) => {
            const Icon = ICON_BY_ID[pillar.iconId];
            return (
              <div
                key={pillar.title}
                className="rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-5 lg:p-6 hover:border-crimson/40 hover:bg-white/[0.05] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-lg bg-crimson/15 text-crimson">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{pillar.title}</h3>
                </div>
                <ul className="flex flex-col gap-2">
                  {pillar.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-[12.5px] leading-relaxed text-gray-300">
                      <span className="text-crimson mt-1.5 h-1 w-1 rounded-full bg-crimson shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-y border-white/10 py-8 lg:py-10">
          {gatewaySecurityStats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="text-3xl lg:text-4xl font-bold font-mono text-white">{s.value}</p>
              <p className="text-[11px] text-gray-400 mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-[11px] text-gray-500 text-center leading-relaxed max-w-3xl mx-auto">
          Audit specifics, certification status, and SLAs are confirmed at contract.
          For tenant-specific security questions, contact{' '}
          <span className="text-crimson">security@revenuepoint.com</span>.
        </p>
      </div>
    </section>
  );
}
