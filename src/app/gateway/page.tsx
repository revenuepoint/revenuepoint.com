import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { StepList } from '@/components/ui/StepList';
import { CTABanner } from '@/components/ui/CTABanner';
import { TenantProvider } from '@/context/TenantContext';
import { TenantSwitcherHero } from '@/components/gateway/TenantSwitcherHero';
import { TenantExplorer } from '@/components/gateway/TenantExplorer';
import { ViewExplorer } from '@/components/gateway/ViewExplorer';
import { ConnectorFlow } from '@/components/gateway/ConnectorFlow';
import { MagicLinkFlow } from '@/components/gateway/MagicLinkFlow';
import { ConfigViewer } from '@/components/gateway/ConfigViewer';
import { GatewaySecurity } from '@/components/gateway/GatewaySecurity';
import { gatewayProblemCards, gatewayProblemStats } from '@/data/gatewayProblem';

export const metadata = buildMetadata({
  title: 'Gateway — Multi-tenant portals, fully managed',
  description:
    'Gateway is a multi-tenant portal framework on Next.js. Branded portals for every customer, partner, dealer, or location — wired into your CRM and ERP, with magic-link auth, tenant isolation, and code-defined access rules. Fully managed by RevenuePoint.',
  path: '/gateway/',
});

/* ----- Inline SVG icons for the Problem section ----- */

function LockInIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-20 mb-4" aria-hidden="true">
      {/* Cloud-shaped vendor box with a chain through it */}
      <path
        d="M14 24a8 8 0 0 1 14-6 10 10 0 0 1 19 4 7 7 0 0 1-1 14H16a8 8 0 0 1-2-12z"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.5"
      />
      {/* Chain link */}
      <g stroke="#8B0A39" strokeWidth="2" fill="none" strokeLinecap="round">
        <ellipse cx="22" cy="36" rx="5" ry="3" transform="rotate(-25 22 36)" />
        <ellipse cx="32" cy="42" rx="5" ry="3" transform="rotate(-25 32 42)" />
      </g>
      {/* Padlock */}
      <rect x="40" y="34" width="12" height="9" rx="1.4" fill="#8B0A39" />
      <path d="M43 34v-3a3 3 0 0 1 6 0v3" stroke="#8B0A39" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function BuildCostIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-20 mb-4" aria-hidden="true">
      {/* Calendar with stacked months crossed out */}
      <rect x="6" y="8" width="22" height="22" rx="2" fill="#ffffff" stroke="#0F1A2B" strokeWidth="1.4" />
      <rect x="6" y="8" width="22" height="5" rx="2" fill="#0F1A2B" />
      <rect x="14" y="14" width="22" height="22" rx="2" fill="#ffffff" stroke="#0F1A2B" strokeWidth="1.4" />
      <rect x="14" y="14" width="22" height="5" rx="2" fill="#0F1A2B" />
      <rect x="22" y="20" width="22" height="22" rx="2" fill="#ffffff" stroke="#0F1A2B" strokeWidth="1.4" />
      <rect x="22" y="20" width="22" height="5" rx="2" fill="#0F1A2B" />
      {/* Big strikethrough across all */}
      <line x1="4" y1="42" x2="48" y2="6" stroke="#8B0A39" strokeWidth="2.2" strokeLinecap="round" />
      {/* Dollar sign */}
      <text x="56" y="32" fontSize="16" fontWeight="800" fill="#8B0A39" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        $
      </text>
    </svg>
  );
}

function IsolationGapIcon() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-20 mb-4" aria-hidden="true">
      {/* Two tenant boxes that overlap — bleed-through visualized */}
      <rect x="6" y="10" width="28" height="28" rx="3" fill="#ffffff" stroke="#0F1A2B" strokeWidth="1.4" />
      <text x="20" y="28" fontSize="9" fontWeight="700" fill="#0F1A2B" textAnchor="middle">A</text>
      <rect x="30" y="10" width="28" height="28" rx="3" fill="#ffffff" stroke="#0F1A2B" strokeWidth="1.4" opacity="0.92" />
      <text x="44" y="28" fontSize="9" fontWeight="700" fill="#0F1A2B" textAnchor="middle">B</text>
      {/* Overlap region rendered in crimson hatch */}
      <rect x="30" y="10" width="4" height="28" fill="#8B0A39" opacity="0.45" />
      {/* Warning bolt */}
      <path d="M32 4l-3 8h3l-2 6 5-8h-3l2-6z" fill="#8B0A39" />
    </svg>
  );
}

const ICON_BY_ID = {
  lockIn: LockInIcon,
  buildCost: BuildCostIcon,
  isolationGap: IsolationGapIcon,
};

export default function GatewayPage() {
  return (
    <TenantProvider>
      {/* 1 — Hero */}
      <HeroSection
        byline="RevenuePoint Gateway"
        heading={
          <>
            Multi-tenant portals. Connected to your CRM and ERP. <em>Fully managed</em>.
          </>
        }
        body="Gateway gives every customer, partner, dealer, or location their own branded portal — wired into your CRM, ERP, and accounting. Magic-link login, code-defined access rules, tenant-level data isolation. Fully managed by RevenuePoint."
        sidenote="Magic-link auth · code-defined rules · tenant-level isolation."
        ctas={[
          { label: 'Schedule a walkthrough', href: '/contact/?interest=Gateway', variant: 'primary' },
          { label: 'View pricing', href: '/gateway/pricing/', variant: 'secondary' },
        ]}
        rightSlot={<TenantSwitcherHero />}
      />

      {/* 2 — Problem */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="The portal layer most companies are stuck with." />
          <p className="text-center text-mute -mt-6 mb-10 text-base">
            Three traps. One missing layer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gatewayProblemCards.map((card) => {
              const Icon = ICON_BY_ID[card.iconId];
              return (
                <div
                  key={card.title}
                  className="bg-white border border-rule rounded-sm shadow-sm p-6 flex flex-col"
                >
                  <Icon />
                  <h3 className="text-base font-semibold text-navy mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-ink leading-relaxed">{card.body}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-rule pt-6 divide-y md:divide-y-0 md:divide-x divide-rule">
            {gatewayProblemStats.map((s) => (
              <div key={s.label} className="px-6 py-4 text-center">
                <p className="text-3xl font-bold font-mono text-navy">{s.value}</p>
                <p className="text-sm text-mute mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          <p className="text-center italic text-mute mt-8 text-base">
            Gateway is the portal layer that fixes all three at once.
          </p>
        </div>
      </section>

      {/* 3 — How it works */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Connect. Configure. Launch." />
          <p className="text-center text-mute -mt-6 mb-10 text-base">
            Three layers of a multi-tenant portal.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Connect',
                promise: 'One pluggable connector model. Salesforce first, SAP next, anything after.',
                bullets: [
                  'Salesforce + SAP connectors ship today; NetSuite, Dynamics, QuickBooks on the roadmap',
                  'Custom REST/GraphQL adapter for proprietary or vertical SaaS systems',
                  'Field-level permissions, picklists, and lookups enforced at the connector layer',
                ],
              },
              {
                title: 'Configure',
                promise: 'Tenants, views, and access rules — all defined in TypeScript.',
                bullets: [
                  'One config file per tenant: domain, connection, auth, views, theme',
                  'Code-defined access rules — server-evaluated, never client-trusted',
                  'Versioned in Git; deployed like any application',
                ],
              },
              {
                title: 'Launch',
                promise: 'Each tenant on its own subdomain, with its own brand, in days.',
                bullets: [
                  'TLS provisioned automatically; magic-link login from day one',
                  'Per-tenant theme — logo, primary color, header brand, email templates',
                  'Audit log on every action; tenant isolation enforced at the edge',
                ],
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="bg-white border border-rule rounded-sm p-6 lg:p-7 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-crimson tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-rule" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm font-semibold text-navy mb-4 leading-snug">
                  {step.promise}
                </p>
                <ul className="space-y-2 mt-auto">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-ink leading-snug">
                      <span className="text-crimson shrink-0 font-semibold">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center italic text-mute mt-10 text-base">
            Below: each layer of Gateway, up close.
          </p>
        </div>
      </section>

      {/* 4 — Tenants (the differentiator) */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="TENANTS"
            heading="Each tenant, isolated by design. Each tenant, branded their way."
            body="Pick a tenant. Watch the subdomain change, the connection swap, the access rule rewrite, the brand color follow. One Gateway deployment, every tenant on its own everything."
            align="center"
            light
          />
          <div className="mt-10">
            <TenantExplorer />
          </div>
        </div>
      </section>

      {/* 5 — Views */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="VIEWS"
            heading="Tables, detail views, forms, dashboards — composable per tenant."
            body="The pages your tenants actually see. Pick a view type to preview it rendered with the active tenant's data."
            align="center"
          />
          <div className="mt-10">
            <ViewExplorer />
          </div>
        </div>
      </section>

      {/* 6 — Connections */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="CONNECTIONS"
            heading="One framework, every system."
            body="Salesforce first. SAP next. Anything after. Pick a connector to see the supported objects, capabilities, and the path data takes through Gateway."
            align="center"
          />
          <div className="mt-10">
            <ConnectorFlow />
          </div>

          {/* Integration strip */}
          <div className="mt-16 pt-10 border-t border-rule">
            <p className="text-xs uppercase tracking-widest text-mute text-center mb-6">
              Wired into the systems you already run on
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
              {[
                'Salesforce',
                'Salesforce Health Cloud',
                'SAP',
                'SAP Business One',
                'NetSuite',
                'QuickBooks',
                'Microsoft Dynamics',
                'Custom REST',
                'GraphQL',
                'Webhooks',
                'SFTP',
              ].map((name) => (
                <div
                  key={name}
                  className="h-10 px-5 flex items-center justify-center rounded-sm border border-rule bg-white"
                >
                  <span className="text-sm font-medium text-navy">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-mute text-center mt-4">
              Need a connector we don&apos;t list?{' '}
              <a href="/gateway/connectors/" className="text-crimson font-semibold hover:underline">
                Tell us →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 7 — Auth & access */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="AUTH &amp; ACCESS"
            heading="Magic-link login. Code-defined access rules. Server-side sessions."
            body="No passwords to leak, no admin UI to misconfigure. Tenants only get a link if a code-defined rule says they should — and the link only works once."
            align="center"
            light
          />
          <div className="mt-10">
            <MagicLinkFlow />
          </div>
        </div>
      </section>

      {/* 8 — Configuration */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="CONFIGURATION"
            heading="Every tenant, defined in one file. Versioned in Git."
            body="No admin console. No click-ops. The tenant config is TypeScript — typed, reviewable in pull requests, deployable like any application."
            align="center"
          />
          <div className="mt-10">
            <ConfigViewer />
          </div>
        </div>
      </section>

      {/* 9 — Security & Compliance */}
      <GatewaySecurity />

      {/* 10 — Comparison */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            heading="The portal layer for companies that outgrew Salesforce Sites."
            body="Most portal options are tied to one CRM, share data underneath, or take six months to build. Gateway is the only one fully managed, multi-tenant by design, and not locked to a single source system."
          />
          <ComparisonTable
            headers={[
              'Capability',
              'Gateway',
              'Salesforce Sites',
              'Experience Cloud',
              'Custom-built',
              'Generic SaaS',
            ]}
            highlightCol={1}
            rows={[
              { label: 'Multi-tenant by design', cells: ['check', 'cross', 'Limited', 'Varies', 'check'] },
              { label: 'Connects to non-Salesforce systems', cells: ['check', 'cross', 'cross', 'check', 'Limited'] },
              { label: 'Magic-link auth (no passwords)', cells: ['check', 'cross', 'Limited', 'Varies', 'Varies'] },
              { label: 'Code-defined access rules', cells: ['check', 'cross', 'cross', 'check', 'cross'] },
              { label: 'Tenant-level data isolation', cells: ['check', 'Limited', 'Limited', 'Varies', 'Varies'] },
              { label: 'Per-tenant theming', cells: ['check', 'Limited', 'check', 'check', 'Limited'] },
              { label: 'Versioned config in Git', cells: ['check', 'cross', 'cross', 'check', 'cross'] },
              { label: 'Fully managed service', cells: ['check', 'check', 'check', 'cross', 'check'] },
              { label: 'Predictable per-tenant pricing', cells: ['check', 'Limited', 'cross', 'cross', 'Varies'] },
              { label: 'Live in 4 weeks', cells: ['check', 'Varies', 'cross', 'cross', 'Varies'] },
            ]}
          />
        </div>
      </section>

      {/* 11 — Implementation */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Live in 4 weeks. Here's how." />
          <StepList
            steps={[
              {
                number: 1,
                title: 'Discover',
                description:
                  'We learn your tenant model, your source systems, your access rules, and the views your tenants need. No scope surprises — we quote based on what\'s actually there.',
              },
              {
                number: 2,
                title: 'Configure',
                description:
                  'A RevenuePoint engineer writes the tenant configs, wires the connectors, defines the access rules, and themes each tenant. Reviewed with you in pull requests.',
              },
              {
                number: 3,
                title: 'Launch',
                description:
                  'Subdomains live, TLS provisioned, magic-link login enabled. Walk-through with your team. From here, RevenuePoint runs the framework end-to-end.',
              },
              {
                number: 4,
                title: 'Evolve',
                description:
                  'New tenants, new views, new connectors — your named administrator handles change requests. Monthly reviews; quarterly roadmap conversations.',
              },
            ]}
          />
        </div>
      </section>

      {/* 12 — Final CTA */}
      <CTABanner
        heading="Ready to see Gateway running?"
        body="Thirty minutes with a RevenuePoint architect. We walk through a working tenant, scope your tenant model, and quote a path to live."
        cta={{ label: 'Schedule a walkthrough →', href: '/contact/?interest=Gateway' }}
      />
    </TenantProvider>
  );
}
