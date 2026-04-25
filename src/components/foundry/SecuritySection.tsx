'use client';

/* -------- Inline SVG icons -------- */

function ShieldCheckBadge({ className = 'h-14 w-14' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2A3F58" />
          <stop offset="100%" stopColor="#0F1A2B" />
        </linearGradient>
      </defs>
      <path
        d="M32 4l22 8v14c0 13-9.5 24-22 30-12.5-6-22-17-22-30V12l22-8z"
        fill="url(#shieldGrad)"
        stroke="#8B0A39"
        strokeWidth="1"
      />
      <path
        d="M22 32l7 7 14-14"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Cert({ label, sublabel }: { label: string; sublabel: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group">
      <div className="relative">
        <ShieldCheckBadge className="h-16 w-16 transition-transform duration-300 group-hover:scale-105" />
        <div className="absolute inset-0 rounded-full bg-crimson/0 group-hover:bg-crimson/10 blur-xl transition-colors" />
      </div>
      <div className="text-center">
        <p className="text-xs font-bold text-white tracking-wide">{label}</p>
        <p className="text-[10px] text-gray-400 mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

/* -------- Pillar icons (outline style, white) -------- */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

function LockIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
function KeyIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <circle cx="8" cy="15" r="4" />
      <path d="M10.8 13L20 4l-3 3 1.5 1.5L16 11l1.5 1.5L14 15" />
    </svg>
  );
}
function ServerIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <rect x="3" y="4" width="18" height="7" rx="1.5" />
      <rect x="3" y="13" width="18" height="7" rx="1.5" />
      <path d="M7 7h.01M7 16h.01" />
    </svg>
  );
}
function DbIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <ellipse cx="12" cy="5" rx="8" ry="2.5" />
      <path d="M4 5v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5" />
      <path d="M4 11v6c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-6" />
    </svg>
  );
}
function ActivityIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M22 12h-4l-3 9-6-18-3 9H2" />
    </svg>
  );
}
function UsersIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} {...iconProps}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

/* -------- Pillar card -------- */

type Pillar = {
  icon: (props: { className?: string }) => JSX.Element;
  title: string;
  items: string[];
};

const PILLARS: Pillar[] = [
  {
    icon: LockIcon,
    title: 'Encryption',
    items: [
      'AES-256 encryption at rest — customer data, backups, snapshots',
      'TLS 1.3 in transit — public endpoints and service-to-service',
      'Customer-managed keys (KMS) available for enterprise tenants',
      'Automatic key rotation every 90 days, on-demand rotations supported',
    ],
  },
  {
    icon: UsersIcon,
    title: 'Identity & Access',
    items: [
      'SSO via SAML 2.0 and OIDC — Okta, Azure AD, Google Workspace',
      'SCIM 2.0 for automated user provisioning and deprovisioning',
      'Role-based access control with fine-grained permissions',
      'MFA enforced for all admin actions; IP allowlisting on request',
    ],
  },
  {
    icon: DbIcon,
    title: 'Data Governance',
    items: [
      'Per-tenant logical isolation with dedicated encryption keys',
      'Configurable retention and deletion policies by object type',
      'Right to erasure (GDPR Art. 17, CCPA) — honored within 30 days',
      'Data residency options: US, EU, Canada. Full export on demand.',
    ],
  },
  {
    icon: ServerIcon,
    title: 'Infrastructure',
    items: [
      'AWS primary, multi-region with cross-region failover',
      'VPC isolation, private subnets, zero public database endpoints',
      'Daily automated backups with 30-day PITR (point-in-time recovery)',
      '99.99% uptime SLA, measurable at status.revenuepoint.com',
    ],
  },
  {
    icon: ActivityIcon,
    title: 'Monitoring & Response',
    items: [
      '24/7 security monitoring — SIEM, anomaly detection, alerting',
      'Quarterly third-party penetration testing (report available under NDA)',
      'Continuous SOC 2 Type II audit — annual attestation cycle',
      'Documented incident response plan; <1 hour P1 response commitment',
    ],
  },
  {
    icon: KeyIcon,
    title: 'Vendor & Subprocessor',
    items: [
      'Public subprocessor list with 30-day change notification',
      'All vendors DPA-signed; SOC 2 or equivalent attestation required',
      'Annual vendor risk review and tiered access review',
      'Signed DPAs, security addenda, and BAAs available on request',
    ],
  },
];

/* -------- Stats strip -------- */

const STATS = [
  { value: '99.99%', label: 'Measured uptime · trailing 12 months' },
  { value: '<1h', label: 'P1 incident response commitment' },
  { value: '0', label: 'Customer data breaches since founding' },
  { value: '47', label: 'Security controls continuously monitored' },
];

/* -------- Main section -------- */

export function SecuritySection() {
  return (
    <section className="relative bg-navy text-white py-20 lg:py-28 overflow-hidden">
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
        aria-hidden="true"
      />
      {/* Ambient gradient wash */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(139, 10, 57, 0.22) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Security &amp; Compliance
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Enterprise-grade security, built in from day one.
          </h2>
          <p className="mt-5 text-base lg:text-lg leading-relaxed text-gray-300">
            Foundry was built for mid-market companies that handle sensitive customer,
            financial, and regulated data. Every tenant is isolated, every byte is
            encrypted, every control is audited. We operate to the standard your
            largest customers require — without asking you to write a single line of
            security plumbing.
          </p>
        </div>

        {/* Certifications strip */}
        <div className="mb-14 lg:mb-20">
          <p className="text-center text-[10px] uppercase tracking-widest text-gray-400 mb-6">
            Certifications &amp; attestations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            <Cert label="SOC 2" sublabel="Type II · continuous" />
            <Cert label="ISO 27001" sublabel="Information Security" />
            <Cert label="HIPAA" sublabel="BAA on request" />
            <Cert label="GDPR" sublabel="EU &amp; UK ready" />
            <Cert label="CCPA" sublabel="California compliance" />
            <Cert label="PCI DSS" sublabel="SAQ-D Level 2" />
          </div>
          <p className="text-center text-[11px] text-gray-500 mt-5">
            Placeholder: finalize certification list + badges with compliance partner
            before launch.
          </p>
        </div>

        {/* Pillar grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
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
                    <li
                      key={i}
                      className="flex gap-2 text-[12.5px] leading-relaxed text-gray-300"
                    >
                      <span className="text-crimson mt-1.5 h-1 w-1 rounded-full bg-crimson shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Stats strip */}
        <div className="mt-14 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 border-y border-white/10 py-8 lg:py-10">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <p className="text-3xl lg:text-4xl font-bold font-mono text-white">
                {s.value}
              </p>
              <p className="text-[11px] text-gray-400 mt-2 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Trust center CTA */}
        <div className="mt-12 lg:mt-16 flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6 justify-between rounded-xl border border-crimson/30 bg-crimson/10 px-5 lg:px-7 py-5 lg:py-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-crimson mb-1.5">
              Trust Center
            </p>
            <p className="text-sm lg:text-base text-white leading-relaxed">
              Review our SOC 2 report, ISO 27001 certificate, subprocessor list,
              DPA, HIPAA BAA template, and answered security questionnaires —
              all in one place.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-white text-navy text-sm font-semibold shadow-sm whitespace-nowrap select-none">
            Visit trust.revenuepoint.com
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M17 7H8M17 7v9" />
            </svg>
          </span>
        </div>

        {/* Legal footer line */}
        <p className="mt-8 text-[11px] text-gray-500 text-center leading-relaxed max-w-3xl mx-auto">
          Every control on this page is a placeholder for final marketing review.
          Exact certification status, SLAs, vendor list, and data-residency regions
          will be confirmed by our compliance partner before public launch.
          For customer-specific security questions, contact{' '}
          <span className="text-crimson">security@revenuepoint.com</span>.
        </p>
      </div>
    </section>
  );
}
