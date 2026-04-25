'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTenant } from '@/context/TenantContext';
import { getTenant } from '@/data/gatewayTenants';
import { gatewayViewTypes } from '@/data/gatewayViews';
import type { GatewayViewId, GatewayTenantRecord } from '@/types/gateway';

const STATUS_TONE: Record<GatewayTenantRecord['statusTone'], string> = {
  good: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  bad: 'bg-red-50 text-red-700 border-red-200',
  warn: 'bg-amber-50 text-amber-700 border-amber-200',
  neutral: 'bg-slate-50 text-slate-700 border-slate-200',
};

const KPI_TONE: Record<'good' | 'bad' | 'neutral', string> = {
  good: 'text-emerald-600',
  bad: 'text-red-600',
  neutral: 'text-mute',
};

function TableView() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  return (
    <div className="border border-rule rounded-md overflow-hidden bg-white">
      <div
        className="px-4 py-3 border-b border-rule flex items-center justify-between"
        style={{ background: tenant.primaryColorTint }}
      >
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: tenant.primaryColor }}
          >
            {tenant.recordIdLabel}
          </p>
          <h4 className="text-base font-semibold text-navy">{tenant.recordObjectLabel}</h4>
        </div>
        <span
          className="text-xs px-3 py-1.5 rounded-sm font-semibold text-white"
          style={{ background: tenant.primaryColor }}
        >
          + New
        </span>
      </div>
      <table className="w-full text-sm">
        <thead className="bg-cream border-b border-rule">
          <tr>
            <th className="text-left py-2 px-4 text-[11px] uppercase tracking-widest font-semibold text-mute">{tenant.recordIdLabel} #</th>
            <th className="text-left py-2 px-4 text-[11px] uppercase tracking-widest font-semibold text-mute">Subject</th>
            <th className="text-left py-2 px-4 text-[11px] uppercase tracking-widest font-semibold text-mute">Status</th>
            <th className="text-right py-2 px-4 text-[11px] uppercase tracking-widest font-semibold text-mute">Amount</th>
            <th className="text-right py-2 px-4 text-[11px] uppercase tracking-widest font-semibold text-mute">Updated</th>
          </tr>
        </thead>
        <tbody>
          {tenant.records.map((r, i) => (
            <tr key={r.id} className={i % 2 === 0 ? 'bg-white' : 'bg-bone'}>
              <td className="py-2.5 px-4 font-mono text-xs text-navy">{r.id}</td>
              <td className="py-2.5 px-4 text-ink">{r.title}</td>
              <td className="py-2.5 px-4">
                <span className={`text-[11px] px-2 py-0.5 rounded-sm border font-semibold ${STATUS_TONE[r.statusTone]}`}>
                  {r.status}
                </span>
              </td>
              <td className="py-2.5 px-4 text-right font-mono text-xs text-navy">{r.amount}</td>
              <td className="py-2.5 px-4 text-right text-xs text-mute">{r.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DetailView() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  const top = tenant.records[0];
  return (
    <div className="border border-rule rounded-md overflow-hidden bg-white">
      <div
        className="px-4 py-3 border-b border-rule flex items-start justify-between gap-4"
        style={{ background: tenant.primaryColorTint }}
      >
        <div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: tenant.primaryColor }}
          >
            {tenant.recordIdLabel} · {top.id}
          </p>
          <h4 className="text-base font-semibold text-navy mt-0.5">{top.title}</h4>
        </div>
        <span className={`text-[11px] px-2 py-0.5 rounded-sm border font-semibold ${STATUS_TONE[top.statusTone]}`}>
          {top.status}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 p-5">
        {tenant.detailFields.map((f) => (
          <div key={f.label} className="flex flex-col gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-mute">{f.label}</span>
            <span className="text-sm text-navy break-words">{f.value}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-rule px-5 py-3 flex items-center gap-4">
        {['Comments', 'Attachments', 'Activity'].map((tab, i) => (
          <span
            key={tab}
            className={`text-xs ${i === 0 ? 'font-semibold text-navy border-b-2 pb-1.5' : 'text-mute pb-1.5'}`}
            style={i === 0 ? { borderColor: tenant.primaryColor } : undefined}
          >
            {tab}
          </span>
        ))}
      </div>
    </div>
  );
}

function FormView() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  return (
    <div className="border border-rule rounded-md overflow-hidden bg-white">
      <div
        className="px-4 py-3 border-b border-rule"
        style={{ background: tenant.primaryColorTint }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: tenant.primaryColor }}
        >
          New {tenant.recordIdLabel}
        </p>
        <h4 className="text-base font-semibold text-navy">Create a record</h4>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tenant.formFields.map((f) => (
          <div key={f.label} className={`flex flex-col gap-1 ${f.type === 'textarea' ? 'md:col-span-2' : ''}`}>
            <label className="text-[11px] uppercase tracking-widest text-mute font-semibold">{f.label}</label>
            {f.type === 'select' ? (
              <select
                className="border border-rule rounded-sm px-3 py-2 text-sm text-navy bg-white focus:outline-none"
                disabled
                defaultValue=""
              >
                <option value="" disabled>
                  Select…
                </option>
                {f.options?.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                className="border border-rule rounded-sm px-3 py-2 text-sm text-navy bg-white focus:outline-none resize-none"
                rows={3}
                placeholder={f.placeholder}
                disabled
              />
            ) : (
              <input
                type={f.type === 'date' ? 'date' : 'text'}
                className="border border-rule rounded-sm px-3 py-2 text-sm text-navy bg-white focus:outline-none"
                placeholder={f.placeholder}
                disabled
              />
            )}
          </div>
        ))}
      </div>
      <div className="border-t border-rule px-5 py-3 flex items-center justify-end gap-2 bg-cream/40">
        <span className="text-xs px-3 py-1.5 rounded-sm border border-rule bg-white text-mute font-semibold">
          Cancel
        </span>
        <span
          className="text-xs px-3 py-1.5 rounded-sm font-semibold text-white"
          style={{ background: tenant.primaryColor }}
        >
          Submit
        </span>
      </div>
    </div>
  );
}

function DashboardView() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  return (
    <div className="border border-rule rounded-md overflow-hidden bg-white">
      <div
        className="px-4 py-3 border-b border-rule"
        style={{ background: tenant.primaryColorTint }}
      >
        <p
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: tenant.primaryColor }}
        >
          Overview
        </p>
        <h4 className="text-base font-semibold text-navy">Account dashboard</h4>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-5">
        {tenant.dashboardKpis.map((k) => (
          <div key={k.label} className="border border-rule rounded-md p-3 bg-white">
            <p className="text-[10px] uppercase tracking-widest text-mute font-semibold">{k.label}</p>
            <p className="text-xl font-bold font-mono text-navy mt-1">{k.value}</p>
            <p className={`text-[11px] font-mono mt-0.5 ${KPI_TONE[k.tone]}`}>
              {k.tone === 'good' ? '▲' : k.tone === 'bad' ? '▼' : '•'} {k.change}
            </p>
            <svg viewBox="0 0 80 24" preserveAspectRatio="none" className="w-full h-6 mt-2">
              <polyline
                points="0,18 14,16 28,12 42,14 56,8 70,10 80,6"
                fill="none"
                stroke={tenant.primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        ))}
      </div>
      <div className="px-5 pb-5">
        <p className="text-[10px] uppercase tracking-widest text-mute font-semibold mb-2">
          Recent {tenant.recordObjectLabel.toLowerCase()}
        </p>
        <div className="flex flex-col gap-1.5">
          {tenant.records.slice(0, 3).map((r) => (
            <div key={r.id} className="flex items-center gap-3 border border-rule rounded-sm px-3 py-2 bg-white">
              <span className="text-[11px] font-mono text-mute shrink-0 w-20 truncate">{r.id}</span>
              <span className="text-sm text-navy flex-1 truncate">{r.title}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-sm border font-semibold shrink-0 ${STATUS_TONE[r.statusTone]}`}>
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TabsView() {
  const { tenantId } = useTenant();
  const tenant = getTenant(tenantId);
  const tabs = [
    { label: tenant.recordObjectLabel, body: <TableView /> },
    { label: 'Detail', body: <DetailView /> },
    { label: `New ${tenant.recordIdLabel}`, body: <FormView /> },
  ];
  return (
    <div className="border border-rule rounded-md overflow-hidden bg-white">
      <div
        className="px-4 pt-3 border-b border-rule flex items-end gap-1"
        style={{ background: tenant.primaryColorTint }}
      >
        {tabs.map((t, i) => (
          <span
            key={t.label}
            className={`text-xs px-3 py-2 ${
              i === 0 ? 'bg-white text-navy font-semibold border border-rule border-b-0 rounded-t-sm' : 'text-mute'
            }`}
          >
            {t.label}
          </span>
        ))}
        <div className="flex-1" />
      </div>
      <div className="p-4">
        {tabs[0].body}
      </div>
    </div>
  );
}

function PreviewForView({ id }: { id: GatewayViewId }) {
  if (id === 'table') return <TableView />;
  if (id === 'detail') return <DetailView />;
  if (id === 'form') return <FormView />;
  if (id === 'dashboard') return <DashboardView />;
  return <TabsView />;
}

export function ViewExplorer() {
  const [selected, setSelected] = useState<GatewayViewId>('table');
  const view = gatewayViewTypes.find((v) => v.id === selected) ?? gatewayViewTypes[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Tab strip */}
      <div className="flex flex-wrap items-center gap-2">
        {gatewayViewTypes.map((v) => {
          const active = v.id === selected;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setSelected(v.id)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-sm border text-sm font-semibold transition-colors ${
                active
                  ? 'bg-crimson text-white border-crimson'
                  : 'bg-white text-navy border-rule hover:border-crimson/40'
              }`}
              aria-pressed={active}
            >
              <span className="text-[10px] font-mono opacity-80">{v.eyebrow}</span>
              <span>{v.label}</span>
            </button>
          );
        })}
      </div>

      {/* Header strip with description + capabilities */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 lg:gap-6">
        <div className="border border-rule rounded-md bg-white p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-2">{view.eyebrow}</p>
          <h4 className="text-lg font-semibold text-navy mb-2">{view.label}</h4>
          <p className="text-sm text-ink leading-relaxed mb-4">{view.description}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
            {view.capabilities.map((c) => (
              <li key={c} className="flex items-start gap-2 text-xs text-ink">
                <span className="text-crimson font-semibold shrink-0 mt-0.5">→</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="border border-rule rounded-md bg-navy text-white p-5">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Sample config</p>
          <pre className="text-[12px] font-mono leading-relaxed text-white/90 overflow-x-auto whitespace-pre">
{view.sampleConfig}
          </pre>
        </div>
      </div>

      {/* Live preview */}
      <div className="rounded-lg border border-rule bg-cream p-4 lg:p-6 min-h-[420px]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
          >
            <PreviewForView id={selected} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
