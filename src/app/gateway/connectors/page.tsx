import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTABanner } from '@/components/ui/CTABanner';
import { shippedConnectors, roadmapConnectors } from '@/data/gatewayConnectors';
import type { GatewayConnector } from '@/types/gateway';

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
          className={`text-[11px] px-2 py-0.5 rounded-sm border font-mono font-semibold ${
            op.on
              ? 'border-crimson/40 bg-crimsonLight text-crimson'
              : 'border-border bg-white text-mutedText line-through'
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
    <div className="border border-border rounded-md bg-white p-6 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-crimson">
            {connector.category}
          </p>
          <h3 className="text-lg font-semibold text-navy">{connector.name}</h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
          SHIPPED
        </span>
      </div>
      <p className="text-sm text-bodyText leading-relaxed mb-4">{connector.notes}</p>
      <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
        Operations
      </p>
      <CapabilityRow connector={connector} />
      <p className="mt-4 text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
        Auth
      </p>
      <p className="text-xs text-bodyText leading-relaxed mb-4">{connector.authMethod}</p>
      <p className="text-[10px] uppercase tracking-widest text-mutedText font-semibold mb-1.5">
        Objects
      </p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {connector.objects.map((obj) => (
          <span
            key={obj}
            className="text-[11px] px-2 py-0.5 rounded-sm border border-border bg-offWhite text-bodyText font-mono"
          >
            {obj}
          </span>
        ))}
      </div>
    </div>
  );
}

function RoadmapCard({ connector }: { connector: GatewayConnector }) {
  return (
    <div className="border border-border rounded-md bg-white/60 p-5 flex flex-col opacity-90">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-mutedText">
            {connector.category}
          </p>
          <h3 className="text-base font-semibold text-navy">{connector.name}</h3>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded-sm bg-amber-50 text-amber-700 border border-amber-200 font-bold">
          ROADMAP
        </span>
      </div>
      <p className="text-xs text-bodyText leading-relaxed mb-3">{connector.notes}</p>
      <CapabilityRow connector={connector} />
    </div>
  );
}

export default function GatewayConnectorsPage() {
  const shipped = shippedConnectors();
  const roadmap = roadmapConnectors();

  return (
    <>
      <HeroSection
        eyebrow="GATEWAY · CONNECTORS"
        heading="Every system, one connector model."
        body="Salesforce and SAP ship today. NetSuite, Microsoft Dynamics, and QuickBooks are on the roadmap. The Custom REST/GraphQL adapter covers everything else with an API. Each connector is a typed adapter; auth, retries, and per-tenant secrets are handled in one place."
        ctas={[
          { label: 'Schedule a Walkthrough →', href: '/contact/?interest=Gateway', variant: 'primary' },
          { label: 'Back to Gateway →', href: '/gateway/', variant: 'ghost' },
        ]}
      />

      {/* Shipped connectors */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Shipped"
            heading="In production today."
            body="Used in live tenants. Read, create, and update with field-level permissions enforced by the connector layer."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {shipped.map((c) => (
              <ShippedCard key={c.id} connector={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="bg-offWhite border-y border-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="Roadmap"
            heading="In progress, prioritized by demand."
            body="Read-only betas are available now for select tenants. Full read/write parity is targeted for the next two quarters. Customer demand drives the order — let us know if one of these is blocking you."
            align="left"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {roadmap.map((c) => (
              <RoadmapCard key={c.id} connector={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Build your own */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Build your own
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            Custom connectors are a 2–4 week build.
          </h2>
          <p className="mt-6 text-base text-bodyText leading-relaxed">
            Every connector implements the same interface. RevenuePoint engineers build
            the named connector; once shipped, it becomes part of the Gateway product so
            other customers can use it (without touching your tenants or your data).
          </p>
          <pre className="mt-6 rounded-md bg-navy text-white p-5 text-[12.5px] font-mono leading-relaxed overflow-x-auto whitespace-pre">
{`export interface GatewayConnector<T = unknown> {
  name: string;
  authenticate(secrets: SecretBag): Promise<Session>;
  query(req: QueryRequest, ctx: TenantContext): Promise<T[]>;
  create(req: CreateRequest, ctx: TenantContext): Promise<T>;
  update(req: UpdateRequest, ctx: TenantContext): Promise<T>;
}`}
          </pre>
          <p className="mt-6 text-base text-bodyText leading-relaxed">
            All RevenuePoint engineers commit through the same review process; no shortcuts,
            no &quot;just for one customer&quot; hacks. The connector you fund is the
            connector everyone gets.
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
