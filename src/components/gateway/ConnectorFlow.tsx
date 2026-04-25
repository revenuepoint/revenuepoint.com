'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { gatewayConnectors } from '@/data/gatewayConnectors';
import type { GatewayConnector } from '@/types/gateway';

function CapabilityChip({ active, label }: { active: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm border font-semibold ${
        active
          ? 'border-crimson/40 bg-crimsonLight text-crimson'
          : 'border-border bg-white text-mutedText'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-crimson' : 'bg-mutedText/40'}`} />
      {label}
    </span>
  );
}

function ConnectorFlowSvg({ connector }: { connector: GatewayConnector }) {
  // Three boxes: connector → Gateway → Tenant portal. Active connector glows.
  return (
    <svg viewBox="0 0 600 200" className="w-full h-44 lg:h-52">
      <defs>
        <linearGradient id="gw-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0F2B4D" />
          <stop offset="100%" stopColor="#1A3F6F" />
        </linearGradient>
      </defs>

      {/* Connector box */}
      <rect x="20" y="60" width="160" height="80" rx="6" fill="white" stroke="#8B0A39" strokeWidth="1.6" />
      <rect x="20" y="60" width="160" height="6" fill="#8B0A39" />
      <text x="100" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F2B4D">
        {connector.name}
      </text>
      <text x="100" y="116" textAnchor="middle" fontSize="10" fill="#6B8299">
        {connector.category} · {connector.shipped ? 'Shipped' : 'Roadmap'}
      </text>

      {/* Gateway core box */}
      <rect x="220" y="40" width="160" height="120" rx="8" fill="url(#gw-grad)" stroke="#0F2B4D" strokeWidth="1" />
      <rect x="220" y="40" width="160" height="6" fill="#8B0A39" />
      <text x="300" y="78" textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
        Gateway core
      </text>
      <text x="300" y="98" textAnchor="middle" fontSize="10" fill="#cbd5e1">
        Tenant resolver
      </text>
      <text x="300" y="114" textAnchor="middle" fontSize="10" fill="#cbd5e1">
        Access rules
      </text>
      <text x="300" y="130" textAnchor="middle" fontSize="10" fill="#cbd5e1">
        Audit log
      </text>

      {/* Tenant portal box */}
      <rect x="420" y="60" width="160" height="80" rx="6" fill="white" stroke="#0F2B4D" strokeWidth="1.4" />
      <rect x="420" y="60" width="160" height="6" fill="#0F2B4D" />
      <text x="500" y="98" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F2B4D">
        Tenant portal
      </text>
      <text x="500" y="116" textAnchor="middle" fontSize="10" fill="#6B8299">
        Per-tenant theme + views
      </text>

      {/* Edges (connector → core, core → portal) */}
      <g fill="none" stroke="#8B0A39" strokeWidth="1.8" strokeLinecap="round">
        {/* connector → core */}
        <motion.path
          d="M 180 100 L 220 100"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6 }}
        />
        {/* core → portal */}
        <motion.path
          d="M 380 100 L 420 100"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        />
      </g>
      {/* Arrowheads */}
      <polygon points="218,100 210,96 210,104" fill="#8B0A39" />
      <polygon points="418,100 410,96 410,104" fill="#8B0A39" />

      {/* Capability labels under each edge */}
      <g fontSize="9" fill="#6B8299" textAnchor="middle">
        <text x="200" y="80">{connector.capabilities.read ? 'read' : ''}{connector.capabilities.read && (connector.capabilities.create || connector.capabilities.update) ? ' · ' : ''}{connector.capabilities.create ? 'create' : ''}{connector.capabilities.create && connector.capabilities.update ? ' · ' : ''}{connector.capabilities.update ? 'update' : ''}</text>
        <text x="400" y="80">tenant-scoped</text>
      </g>
    </svg>
  );
}

export function ConnectorFlow() {
  const [selectedId, setSelectedId] = useState<string>(gatewayConnectors[0].id);
  const selected = gatewayConnectors.find((c) => c.id === selectedId) ?? gatewayConnectors[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Pill strip */}
      <div className="flex flex-wrap items-center gap-2">
        {gatewayConnectors.map((c) => {
          const active = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedId(c.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm border text-sm font-semibold transition-colors ${
                active
                  ? 'bg-crimson text-white border-crimson'
                  : 'bg-white text-navy border-border hover:border-crimson/40'
              }`}
              aria-pressed={active}
            >
              <span>{c.name}</span>
              {!c.shipped && (
                <span className="text-[9px] px-1 py-0.5 rounded-sm border border-amber-200 bg-amber-50 text-amber-700 font-bold">
                  ROADMAP
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Flow diagram */}
      <div className="rounded-lg border border-border bg-white p-4 lg:p-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <ConnectorFlowSvg connector={selected} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 lg:gap-6">
        <div className="border border-border rounded-md bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-2">
            {selected.category} · {selected.shipped ? 'Shipped' : 'Roadmap'}
          </p>
          <h4 className="text-lg font-semibold text-navy mb-2">{selected.name}</h4>
          <p className="text-sm text-bodyText leading-relaxed">{selected.notes}</p>
          <p className="mt-3 text-[11px] uppercase tracking-widest text-mutedText font-semibold">Auth</p>
          <p className="text-sm text-bodyText">{selected.authMethod}</p>
        </div>
        <div className="border border-border rounded-md bg-white p-5">
          <p className="text-[11px] uppercase tracking-widest text-mutedText font-semibold mb-3">
            Operations supported
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            <CapabilityChip active={selected.capabilities.read} label="read" />
            <CapabilityChip active={selected.capabilities.create} label="create" />
            <CapabilityChip active={selected.capabilities.update} label="update" />
          </div>
          <p className="text-[11px] uppercase tracking-widest text-mutedText font-semibold mb-2">
            Objects
          </p>
          <div className="flex flex-wrap gap-1.5">
            {selected.objects.map((obj) => (
              <span
                key={obj}
                className="text-[11px] px-2 py-0.5 rounded-sm border border-border bg-offWhite text-bodyText font-mono"
              >
                {obj}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
