import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/ui/CTABanner';
import { shippedConnectors, roadmapConnectors } from '@/data/gatewayConnectors';
import type { GatewayConnector } from '@/types/gateway';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Gateway Connectors — Salesforce, SAP, and Anything Else',
  description:
    'Pluggable connectors for Salesforce, SAP, and a custom REST/GraphQL adapter for anything else. Field-level permissions, code-defined data ops, audit log on every read and write.',
  path: '/gateway/connectors/',
});

function CapabilityRow({ connector }: { connector: GatewayConnector }) {
  const ops: { label: string; on: boolean }[] = [
    { label: 'read', on: connector.capabilities.read },
    { label: 'create', on: connector.capabilities.create },
    { label: 'update', on: connector.capabilities.update },
  ];
  return (
    <div className="flex flex-wrap gap-1.5">
      {ops.map((op) => (
        <span
          key={op.label}
          className={`font-mono text-[11px] uppercase tracking-[0.14em] px-2 py-0.5 border ${
            op.on
              ? 'border-crimson bg-crimsonTint text-crimson'
              : 'border-rule bg-cream text-mute line-through'
          }`}
        >
          {op.label}
        </span>
      ))}
    </div>
  );
}

function ShippedCard({ connector }: { connector: GatewayConnector }) {
  return (
    <article className="relative border border-ruleSoft bg-paper p-6 flex flex-col">
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
      <div className="flex items-start justify-between gap-3 mt-3 mb-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            {connector.category}
          </p>
          <h3 className="font-serif text-[1.25rem] font-medium text-ink leading-tight">
            {connector.name}
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 bg-navy text-paper">
          Shipped
        </span>
      </div>
      <p className="text-sm text-inkSoft leading-relaxed mb-4">{connector.notes}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-1.5">
        Operations
      </p>
      <CapabilityRow connector={connector} />
      <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-1.5">
        Auth
      </p>
      <p className="text-xs text-inkSoft leading-relaxed mb-4">{connector.authMethod}</p>
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mb-1.5">
        Objects
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {connector.objects.map((obj) => (
          <span
            key={obj}
            className="font-mono text-[11px] px-2 py-0.5 border border-rule bg-cream text-ink"
          >
            {obj}
          </span>
        ))}
      </div>
    </article>
  );
}

function RoadmapCard({ connector }: { connector: GatewayConnector }) {
  return (
    <article className="border border-ruleSoft bg-cream/70 p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
            {connector.category}
          </p>
          <h3 className="font-serif italic text-[1rem] text-ink leading-tight">{connector.name}</h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 border border-amber bg-paper text-amber">
          Roadmap
        </span>
      </div>
      <p className="text-xs text-inkSoft leading-relaxed mb-3">{connector.notes}</p>
      <CapabilityRow connector={connector} />
    </article>
  );
}

export default function GatewayConnectorsPage() {
  const shipped = shippedConnectors();
  const roadmap = roadmapConnectors();

  return (
    <>
      <HeroSection
        byline="Gateway · Connectors"
        heading={
          <>
            Every system, <em>one</em> connector model.
          </>
        }
        body="Salesforce and SAP ship today. NetSuite, Microsoft Dynamics, and QuickBooks are on the roadmap. The Custom REST/GraphQL adapter covers everything else with an API. Each connector is a typed adapter; auth, retries, and per-tenant secrets are handled in one place."
        ctas={[
          { label: 'Schedule a walkthrough', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'Back to Gateway', href: '/gateway/', variant: 'secondary' },
        ]}
      />

      {/* Shipped connectors */}
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Shipped"
            heading={
              <>
                In <em>production</em> today.
              </>
            }
            body="Used in live tenants. Read, create, and update with field-level permissions enforced by the connector layer."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shipped.map((c) => (
              <ShippedCard key={c.id} connector={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Roadmap"
            heading={
              <>
                In progress, <em>prioritized by demand</em>.
              </>
            }
            body="Read-only betas are available now for select tenants. Full read/write parity is targeted for the next two quarters. Customer demand drives the order — let us know if one of these is blocking you."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmap.map((c) => (
              <RoadmapCard key={c.id} connector={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Build your own */}
      <section className="bg-paper py-section">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <p className="eyebrow mb-4">Build your own</p>
          <h2 className="text-d2 font-serif font-medium text-ink leading-tight">
            Custom connectors are a <em>2–4 week</em> build.
          </h2>
          <p className="mt-5 text-base leading-[1.65] text-inkSoft max-w-prose">
            Every connector implements the same interface. RevenuePoint engineers build the named connector; once shipped, it becomes part of the Gateway product so other customers can use it (without touching your tenants or your data).
          </p>
          <pre className="mt-6 border border-rule bg-ink text-paper p-5 text-[12.5px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
{`export interface GatewayConnector<T = unknown> {
  name: string;
  authenticate(secrets: SecretBag): Promise<Session>;
  query(req: QueryRequest, ctx: TenantContext): Promise<T[]>;
  create(req: CreateRequest, ctx: TenantContext): Promise<T>;
  update(req: UpdateRequest, ctx: TenantContext): Promise<T>;
}`}
          </pre>
          <p className="mt-6 text-base leading-[1.65] text-inkSoft max-w-prose">
            All RevenuePoint engineers commit through the same review process; no shortcuts, no &ldquo;just for one customer&rdquo; hacks. The connector you fund is the connector everyone gets.
          </p>
        </div>
      </section>

      <CTABanner
        heading="Need a connector we don't list?"
        body="Tell us the system. We'll scope a 2–4 week build, or fit your case onto the Custom REST/GraphQL adapter if it's covered there."
        cta={{ label: 'Talk to us →', href: '/contact/?interest=Gateway' }}
      />
    </>
  );
}
