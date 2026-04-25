'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gatewayConnectors } from '@/data/gatewayConnectors';
import type { GatewayConnector } from '@/types/gateway';

type Trace = {
  requestId: string;
  tenant: string;
  resolverMs: string;
  rulesMs: string;
  rulesPassed: number;
  rulesTotal: number;
  connectorMs: string;
  portalMs: string;
  totalMs: string;
};

type AuditEntry = {
  time: string;
  op: string;
  target: string;
  hash: string;
};

function deterministicHash(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) - h + seed.charCodeAt(i)) | 0;
  return '0x' + (h >>> 0).toString(16).padStart(8, '0').slice(0, 4);
}

function buildTrace(c: GatewayConnector): Trace {
  // Stable, deterministic timing per connector
  const seedSum = c.id.split('').reduce((a, ch) => a + ch.charCodeAt(0), 0);
  const resolverMs = (2.4 + (seedSum % 7) / 10).toFixed(1);
  const rulesMs = (0.8 + (seedSum % 5) / 10).toFixed(1);
  const connectorMs = c.shipped ? (8.5 + (seedSum % 9)).toFixed(1) : '—';
  const portalMs = (3.6 + (seedSum % 4) / 10).toFixed(1);
  const total = (
    parseFloat(resolverMs) +
    parseFloat(rulesMs) +
    (c.shipped ? parseFloat(connectorMs) : 0) +
    parseFloat(portalMs)
  ).toFixed(1);

  return {
    requestId: c.id.slice(0, 6).toUpperCase(),
    tenant: 'acme',
    resolverMs,
    rulesMs,
    rulesPassed: 2,
    rulesTotal: 2,
    connectorMs,
    portalMs,
    totalMs: total,
  };
}

function buildAudit(c: GatewayConnector): AuditEntry[] {
  const objects = c.objects.length ? c.objects : ['Object'];
  const ops: { op: string; target: string }[] = [
    { op: 'session.resolve', target: `tenant=acme · role=manager` },
    { op: 'rules.eval', target: `2/2 allow · ${c.name}:read` },
    { op: `${c.name.toLowerCase().replace(/\s+/g, '_')}.read`, target: objects[0] ?? 'Object' },
    { op: 'view.render', target: 'metrics · 1 chart · 14 rows' },
    { op: 'response.send', target: '200 OK · 1.2 KB' },
  ];

  // Construct ascending timestamps from a fixed base
  const base = { hh: 21, mm: 4, ss: 18, ms: 123 };
  return ops.map((o, i) => {
    const offset = i * 4 + (i === 2 ? 12 : 0); // connector step takes longer
    const totalMs = base.ms + offset * 4;
    const ms = totalMs % 1000;
    const ssCarry = Math.floor(totalMs / 1000);
    const ss = base.ss + ssCarry;
    const time = `${String(base.hh).padStart(2, '0')}:${String(base.mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}.${String(ms).padStart(3, '0')}`;
    return {
      time,
      op: o.op,
      target: o.target,
      hash: deterministicHash(`${c.id}:${o.op}:${i}`),
    };
  });
}

export function ConnectorFlow() {
  const [selectedId, setSelectedId] = useState<string>(gatewayConnectors[0].id);
  const selected = gatewayConnectors.find((c) => c.id === selectedId) ?? gatewayConnectors[0];
  const trace = useMemo(() => buildTrace(selected), [selected]);
  const audit = useMemo(() => buildAudit(selected), [selected]);

  return (
    <figure className="relative border-l-2 border-navy pl-5 lg:pl-6">
      <figcaption className="serif-italic text-[1.05rem] text-ink mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute not-italic">
          Fig.
        </span>
        Gateway request lifecycle — pick a source to trace.
      </figcaption>

      <div className="border-t border-rule pt-5">
        <div className="product-surface space-y-7">
          {/* Connector picker */}
          <div className="flex items-center gap-x-3 gap-y-2 flex-wrap border-y border-rule py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute mr-1">
              Source
            </p>
            {gatewayConnectors.map((c) => {
              const active = c.id === selectedId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedId(c.id)}
                  className={`group inline-flex items-center gap-2 px-3 py-1.5 border text-[13px] transition-all ${
                    active
                      ? 'bg-ink text-paper border-ink shadow-hairline'
                      : 'bg-paper text-ink border-rule hover:border-crimson'
                  }`}
                  aria-pressed={active}
                >
                  <span>{c.name}</span>
                  {!c.shipped && (
                    <span
                      className={`font-mono text-[9px] uppercase tracking-[0.16em] ${
                        active ? 'text-paper/70' : 'text-amber'
                      }`}
                    >
                      roadmap
                    </span>
                  )}
                </button>
              );
            })}
            <span className="ml-auto inline-flex items-center font-mono text-[11px] uppercase tracking-[0.14em] text-navy">
              <span className="live-dot" /> Live trace
            </span>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="space-y-8"
            >
              <TraceTimeline selected={selected} trace={trace} />
              <CoreInspectors selected={selected} trace={trace} audit={audit} />
              <Manifest selected={selected} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </figure>
  );
}

/* ----- Trace timeline ----------------------------------------------------- */

function TraceTimeline({ selected, trace }: { selected: GatewayConnector; trace: Trace }) {
  const stages = [
    {
      key: 'request',
      label: 'Request',
      primary: 'GET /portal/metrics',
      secondary: 'jwt · 1.2 KB',
      endpoint: true,
    },
    {
      key: 'resolver',
      label: 'Resolver',
      primary: `tenant=${trace.tenant}`,
      secondary: `${trace.resolverMs}ms · cache hit`,
    },
    {
      key: 'rules',
      label: 'Rules',
      primary: `${trace.rulesPassed}/${trace.rulesTotal} allow`,
      secondary: `${trace.rulesMs}ms · matched`,
    },
    {
      key: 'connector',
      label: selected.name,
      primary: `${selected.objects[0] ?? 'Object'}.read`,
      secondary: selected.shipped ? `${trace.connectorMs}ms` : 'roadmap',
    },
    {
      key: 'response',
      label: 'Response',
      primary: '200 OK',
      secondary: `${trace.portalMs}ms · 1 view`,
      endpoint: true,
    },
  ];

  return (
    <section>
      <header className="flex items-baseline justify-between gap-3 mb-6 flex-wrap">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">§01</span>
          <p className="serif-italic text-[1.125rem] text-ink">Request lifecycle</p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute tabular-nums">
          Total <span className="text-ink">{trace.totalMs}ms</span>
          <span className="mx-2 text-mute/60">·</span>
          req_<span className="text-ink">{trace.requestId}</span>
        </p>
      </header>

      <div className="relative">
        {/* Spine */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute top-[10px] left-2 right-2 h-px bg-rule"
        />
        <ol className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-3 gap-y-6">
          {stages.map((stage, i) => (
            <li key={stage.key} className="flex md:flex-col gap-3 md:gap-0 items-start relative">
              <span
                aria-hidden="true"
                className={`relative z-10 mt-0 h-5 w-5 rounded-full border-2 shrink-0 ${
                  stage.endpoint ? 'bg-crimson border-crimson' : 'bg-paper border-ink'
                }`}
              >
                {i === stages.length - 1 && (
                  <span className="absolute inset-0 rounded-full bg-crimson/30 animate-ping" />
                )}
              </span>
              <div className="md:mt-3 min-w-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
                  {stage.label}
                </p>
                <p className="mt-1 font-mono text-[12.5px] text-ink leading-snug truncate">
                  {stage.primary}
                </p>
                <p className="font-mono text-[10px] tracking-[0.06em] text-mute tabular-nums">
                  {stage.secondary}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----- Core inspectors ---------------------------------------------------- */

function CoreInspectors({
  selected,
  trace,
  audit,
}: {
  selected: GatewayConnector;
  trace: Trace;
  audit: AuditEntry[];
}) {
  return (
    <section>
      <header className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">§02</span>
        <p className="serif-italic text-[1.125rem] text-ink">Inside Gateway core</p>
        <span className="hidden lg:inline-flex ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-mute">
          Three layers · server-side
        </span>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ResolverPanel trace={trace} />
        <RulesPanel selected={selected} trace={trace} />
        <AuditPanel audit={audit} />
      </div>
    </section>
  );
}

function PanelFrame({
  layer,
  title,
  description,
  children,
}: {
  layer: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative border border-ruleSoft bg-paper">
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-10 bg-crimson" />
      <div className="p-5 lg:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-mute mt-3 mb-2">
          {layer}
        </p>
        <h3 className="font-serif italic text-[1.25rem] text-ink leading-tight">{title}</h3>
        <p className="mt-2 text-xs text-inkSoft leading-relaxed">{description}</p>
        {children}
      </div>
    </article>
  );
}

function CodePane({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 border border-rule bg-cream p-3 font-mono text-[11px] text-ink leading-[1.65] overflow-x-auto">
      {children}
    </div>
  );
}

function MetaRow({ label, value, tone }: { label: string; value: React.ReactNode; tone?: 'navy' }) {
  return (
    <>
      <dt className="font-mono uppercase tracking-[0.14em] text-mute">{label}</dt>
      <dd
        className={`font-mono tabular-nums text-right ${
          tone === 'navy' ? 'text-navy' : 'text-ink'
        }`}
      >
        {value}
      </dd>
    </>
  );
}

function ResolverPanel({ trace }: { trace: Trace }) {
  return (
    <PanelFrame
      layer="Layer · 01"
      title="Tenant resolver"
      description="Decodes the magic-link JWT into a tenant context. Cached for the session window."
    >
      <CodePane>
        <p className="text-mute">// signed jwt → tenant context</p>
        <p>
          <span className="text-navy">decode</span>(token)
        </p>
        <p>
          → tenant: <span className="text-crimson">&apos;{trace.tenant}&apos;</span>
        </p>
        <p>
          → role:&nbsp;&nbsp;&nbsp;<span className="text-crimson">&apos;manager&apos;</span>
        </p>
        <p>→ exp:&nbsp;&nbsp;&nbsp;&nbsp;+14d</p>
      </CodePane>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <MetaRow label="Time" value={`${trace.resolverMs}ms`} />
        <MetaRow label="Cache" value="hit" tone="navy" />
        <MetaRow label="Issuer" value="SendGrid" />
      </dl>
    </PanelFrame>
  );
}

function RulesPanel({ selected, trace }: { selected: GatewayConnector; trace: Trace }) {
  const obj = selected.objects[0] ?? 'Object';
  return (
    <PanelFrame
      layer="Layer · 02"
      title="Access rules"
      description="Code-defined per tenant. Evaluated server-side on every read and write."
    >
      <CodePane>
        <p className="text-mute">// rule.ts</p>
        <p>
          tenant === <span className="text-crimson">&apos;{trace.tenant}&apos;</span>
        </p>
        <p>
          &nbsp;&amp;&amp; obj === <span className="text-crimson">&apos;{obj}&apos;</span>
        </p>
        <p>
          &nbsp;&amp;&amp; fields.read([
          <span className="text-crimson">&apos;name&apos;</span>,{' '}
          <span className="text-crimson">&apos;amount&apos;</span>])
        </p>
      </CodePane>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <MetaRow
          label="Result"
          value={
            <span className="inline-flex items-center gap-1.5">
              <span className="live-dot" /> ALLOW
            </span>
          }
          tone="navy"
        />
        <MetaRow label="Matched" value={`${trace.rulesPassed}/${trace.rulesTotal}`} />
        <MetaRow label="Time" value={`${trace.rulesMs}ms`} />
      </dl>
    </PanelFrame>
  );
}

function AuditPanel({ audit }: { audit: AuditEntry[] }) {
  return (
    <PanelFrame
      layer="Layer · 03"
      title="Audit log"
      description="Append-only, content-addressed. Every read, every write, every change."
    >
      <ol className="mt-4 border border-rule bg-cream divide-y divide-rule">
        {audit.map((entry, i) => (
          <li
            key={`${entry.time}-${i}`}
            className="grid grid-cols-[auto_1fr_auto] gap-3 px-3 py-1.5 font-mono text-[11px] leading-snug"
          >
            <span className="text-mute tabular-nums">{entry.time}</span>
            <span className="text-ink truncate">
              <span className="text-navy">{entry.op}</span>{' '}
              <span className="text-mute">·</span> {entry.target}
            </span>
            <span className="text-mute hidden sm:inline tabular-nums">{entry.hash}</span>
          </li>
        ))}
      </ol>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
        Streaming · last 5 events · tenant scope only
      </p>
    </PanelFrame>
  );
}

/* ----- Manifest footer ---------------------------------------------------- */

function Manifest({ selected }: { selected: GatewayConnector }) {
  const ops: { label: string; on: boolean }[] = [
    { label: 'read', on: selected.capabilities.read },
    { label: 'create', on: selected.capabilities.create },
    { label: 'update', on: selected.capabilities.update },
  ];

  return (
    <section>
      <header className="flex items-baseline gap-3 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">§03</span>
        <p className="serif-italic text-[1.125rem] text-ink">Manifest</p>
      </header>

      <div className="border-t-2 border-ink">
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 py-4 border-b border-rule">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Auth</p>
          <p className="text-sm text-ink">{selected.authMethod}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 py-4 border-b border-rule">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Operations</p>
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-x-6 py-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Objects</p>
          <div className="flex flex-wrap gap-1.5">
            {selected.objects.map((obj) => (
              <span
                key={obj}
                className="font-mono text-[11px] px-2 py-0.5 border border-rule bg-cream text-ink"
              >
                {obj}
              </span>
            ))}
            {selected.objects.length === 0 && (
              <span className="font-mono text-[11px] text-mute italic">No objects mapped yet.</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
