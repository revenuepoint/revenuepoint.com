import type { RecordPageMockSpec, StatusTone } from '@/types/industry';
import type { IndustryId } from '@/context/IndustryContext';
import { ComponentBody } from './ComponentBody';

/* ----- Per-industry mappings -------------------------------------------- */

const CLOUD_NAME: Record<IndustryId, string> = {
  manufacturing: 'Manufacturing Cloud',
  pharmacy: 'Health Cloud',
  healthcare: 'Health Cloud',
  nonprofit: 'Nonprofit Cloud (NPSP)',
  financialServices: 'Financial Services Cloud',
  distribution: 'Manufacturing Cloud',
  construction: 'Industries Cloud',
  foodBeverage: 'Consumer Goods Cloud',
  professionalServices: 'Sales Cloud',
  propertyManagement: 'Real Estate Cloud',
};

function objectIconColor(objectLabel: string): string {
  const key = objectLabel.toLowerCase();
  if (key.includes('account')) return '#FCB400';
  if (key.includes('patient')) return '#E2492C';
  if (key.includes('household')) return '#16335B';
  if (key.includes('donor')) return '#9C7BB6';
  if (key.includes('property') || key.includes('unit')) return '#5B7B3D';
  if (key.includes('project') || key.includes('engagement')) return '#21B5B5';
  if (key.includes('order')) return '#F39653';
  return '#1B96FF';
}

function toneText(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'text-[#2E844A]';
    case 'at-risk':
      return 'text-[#FE9339]';
    case 'off-track':
      return 'text-[#C23934]';
    default:
      return 'text-[#181818]';
  }
}

/* ----- Salesforce SVG glyphs -------------------------------------------- */

function SalesforceCloud({ className = 'h-4 w-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 22" fill="currentColor" aria-hidden="true">
      <path d="M13.6 2.4a6 6 0 0 1 9.6 1.4 5.2 5.2 0 0 1 2.2-.5 5.4 5.4 0 0 1 5.4 5.4 5.5 5.5 0 0 1-.4 2 4.7 4.7 0 0 1-2.6 8.6c-.5 0-1-.1-1.4-.2a5 5 0 0 1-9 1.5 4.5 4.5 0 0 1-1.9.4 4.6 4.6 0 0 1-4.5-3.7 4 4 0 0 1-1.6.3 4.4 4.4 0 0 1-2.1-8.3 5 5 0 0 1 4.9-6.2 5 5 0 0 1 1.4.2 6 6 0 0 1 0-.9z" />
    </svg>
  );
}

function WaffleIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      {[0, 5.5, 11].flatMap((y) =>
        [0, 5.5, 11].map((x, i) => <rect key={`${x}-${y}-${i}`} x={x} y={y} width="3" height="3" rx="0.5" />),
      )}
    </svg>
  );
}

function SearchIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5l3 3" strokeLinecap="round" />
    </svg>
  );
}

function GearIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0 4.5A1.5 1.5 0 1 1 8 6.5a1.5 1.5 0 0 1 0 3z" />
      <path d="M14 8a6 6 0 0 0-.1-1.1l1.2-1-1.4-2.4-1.5.4a6 6 0 0 0-2-1.1L9.7 1H6.3l-.5 1.6a6 6 0 0 0-2 1.2l-1.4-.5L1 5.7l1.2 1A6 6 0 0 0 2 8a6 6 0 0 0 .1 1.1l-1.2 1L2.3 12.5l1.5-.4a6 6 0 0 0 2 1.1l.5 1.6h3.4l.5-1.6a6 6 0 0 0 2-1.1l1.5.4 1.4-2.4-1.2-1A6 6 0 0 0 14 8z" opacity="0.4" />
    </svg>
  );
}

function BellIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 2a4 4 0 0 0-4 4v3l-1 2h10l-1-2V6a4 4 0 0 0-4-4zm0 12a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
    </svg>
  );
}

/* ----- Lightning shell --------------------------------------------------- */

export function RecordPageMock({
  spec,
  industryId,
}: {
  spec: RecordPageMockSpec;
  industryId: IndustryId;
}) {
  const cloudName = CLOUD_NAME[industryId] ?? 'Sales Cloud';
  const iconColor = objectIconColor(spec.objectLabel);

  const tabs = ['Home', spec.tabLabel, 'Reports', 'Dashboards', 'More ▾'];

  return (
    <section id="record-page" className="bg-cream border-y border-rule">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        {/* Editorial chrome — outside the mock */}
        <div className="max-w-3xl mb-10">
          <p className="eyebrow mb-4">A clean Salesforce record page</p>
          <h2 className="text-d1 font-serif font-medium text-ink leading-tight">
            {spec.objectLabel} · <em>{spec.accountName.split(' · ')[0]}</em>
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-inkSoft max-w-prose">
            This is the Lightning record page RevenuePoint builds for{' '}
            {spec.tabLabel.toLowerCase()} teams. Every component below is live Salesforce — reading
            from the systems noted on each tile. Numbered callouts map to the components we install
            on day one.
          </p>
        </div>

        {/* Lightning shell — Salesforce visual language only inside */}
        <div className="border border-[#C9C9C9] rounded-md bg-[#F3F3F3] shadow-md overflow-hidden product-surface font-sans">
          {/* Top app bar */}
          <div className="flex items-center gap-3 px-4 h-11 bg-[#032D60] text-white text-[12px]">
            <SalesforceCloud className="h-4 w-6 text-white shrink-0" />
            <span className="font-semibold tracking-wide">Salesforce</span>
            <span className="text-white/40">|</span>
            <span className="text-white/90 font-medium">{cloudName}</span>

            {/* Center search */}
            <div className="ml-auto items-center gap-1.5 bg-white/15 rounded px-2.5 py-1 max-w-[280px] w-full hidden md:flex">
              <SearchIcon className="h-3.5 w-3.5 text-white/70 shrink-0" />
              <span className="text-white/70 text-[11px] truncate">Search Salesforce…</span>
            </div>

            {/* Right utilities */}
            <div className="flex items-center gap-3 text-white/85 ml-auto md:ml-3 shrink-0">
              <WaffleIcon className="h-3.5 w-3.5" />
              <GearIcon className="h-4 w-4" />
              <BellIcon className="h-4 w-4" />
              <span className="h-6 w-6 rounded-full bg-white/25 flex items-center justify-center text-[10px] font-semibold">
                JT
              </span>
            </div>
          </div>

          {/* App tabs strip */}
          <div className="flex items-center gap-1 px-4 h-9 bg-[#FAFAF9] border-b border-[#DDDBDA] text-[12px] overflow-x-auto">
            {tabs.map((t) => {
              const active = t === spec.tabLabel;
              return (
                <span
                  key={t}
                  className={`relative px-3 py-2 whitespace-nowrap ${
                    active
                      ? 'text-[#181818] font-semibold'
                      : 'text-[#514F4D] hover:text-[#181818]'
                  }`}
                >
                  {t}
                  {active && (
                    <span className="absolute left-2 right-2 -bottom-px h-[3px] bg-[#0070D2] rounded-t" />
                  )}
                </span>
              );
            })}
          </div>

          {/* Page header */}
          <div className="bg-white border-b border-[#DDDBDA] px-5 py-4 flex flex-wrap items-start gap-4">
            <span
              className="h-10 w-10 rounded shrink-0 flex items-center justify-center text-white font-semibold text-[15px]"
              style={{ background: iconColor }}
            >
              {spec.objectLabel.charAt(0)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-wider text-[#514F4D] flex items-center gap-1.5">
                <span>{spec.objectLabel}</span>
                <span className="text-[#C9C9C9]">›</span>
                <span className="truncate">{spec.accountName}</span>
              </p>
              <h3 className="text-[18px] font-semibold text-[#181818] leading-snug mt-0.5">
                {spec.accountName}
              </h3>
              <p className="text-[12px] text-[#514F4D] mt-0.5">{spec.accountSub}</p>
            </div>
            <div className="flex flex-wrap gap-1.5 shrink-0">
              {['Edit', 'Delete', 'Clone', 'Follow'].map((b) => (
                <button
                  key={b}
                  type="button"
                  className="border border-[#DDDBDA] bg-white text-[12px] text-[#0070D2] font-medium px-3 py-1 rounded hover:bg-[#F3F3F3]"
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Highlights bar */}
          <div className="bg-[#F3F3F3] border-b border-[#DDDBDA] px-5 py-3 flex flex-wrap items-center gap-x-7 gap-y-3">
            {spec.highlights.map((h, i) => (
              <div
                key={h.label}
                className={`relative ${i > 0 ? 'pl-7 before:absolute before:left-0 before:top-1 before:bottom-1 before:w-px before:bg-[#DDDBDA]' : ''}`}
              >
                <p className="text-[10px] uppercase tracking-wider text-[#514F4D] font-semibold">
                  {h.label}
                </p>
                <p className={`text-[13px] font-semibold mt-0.5 ${toneText(h.tone)}`}>{h.value}</p>
              </div>
            ))}
          </div>

          {/* Three-column body */}
          <div className="grid grid-cols-1 lg:grid-cols-[230px_1fr_270px] gap-0 bg-[#F3F3F3]">
            {/* Left rail — related lists */}
            <aside className="bg-white border-r border-[#DDDBDA] px-3 py-4 space-y-5">
              {spec.relatedLists.map((list) => (
                <div key={list.title}>
                  <div className="flex items-center justify-between px-1">
                    <p className="text-[11px] font-semibold text-[#181818] flex items-center gap-1.5">
                      <span className="text-[#514F4D]">▾</span>
                      {list.title}
                      <span className="text-[#514F4D] font-normal">
                        ({list.items.reduce((sum, i) => sum + i.count, 0)})
                      </span>
                    </p>
                    <button
                      type="button"
                      className="text-[11px] text-[#0070D2] hover:underline font-medium"
                    >
                      View All
                    </button>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {list.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between text-[12px] text-[#181818] px-2 py-1 rounded hover:bg-[#FAFAF9]"
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="text-[#514F4D] font-medium ml-2">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </aside>

            {/* Center — sub-tabs + components */}
            <div className="bg-[#F3F3F3] px-4 py-4">
              {/* Lightning sub-tabs */}
              <div className="flex items-center gap-4 border-b border-[#DDDBDA] mb-4 text-[12px]">
                {['Related', 'Details', 'News', 'Activity'].map((t, i) => {
                  const active = i === 0;
                  return (
                    <span
                      key={t}
                      className={`relative pb-2 ${active ? 'text-[#181818] font-semibold' : 'text-[#514F4D]'}`}
                    >
                      {t}
                      {active && <span className="absolute left-0 right-0 -bottom-px h-[3px] bg-[#0070D2]" />}
                    </span>
                  );
                })}
              </div>

              <div className="space-y-3">
                {spec.components.map((c) => (
                  <article
                    key={c.id}
                    className="relative bg-white border border-[#DDDBDA] rounded shadow-[0_1px_2px_rgba(0,0,0,0.06)] overflow-hidden"
                  >
                    {/* Salesforce blue top accent */}
                    <span aria-hidden="true" className="absolute left-0 top-0 right-0 h-[3px] bg-[#1B96FF]" />
                    {/* Crimson callout — RevenuePoint customization marker */}
                    <span className="absolute -left-3 top-3 w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center shadow-sm z-10">
                      {c.callout.number}
                    </span>
                    <div className="px-4 pt-4 pb-2 flex items-start justify-between gap-3">
                      <div className="pl-3">
                        <p className="text-[13px] font-semibold text-[#181818]">{c.title}</p>
                        {c.subtitle && (
                          <p className="text-[11px] text-[#514F4D] mt-0.5">{c.subtitle}</p>
                        )}
                      </div>
                      <span className="text-[10px] uppercase tracking-wider text-[#514F4D] shrink-0 whitespace-nowrap">
                        Pulls from:{' '}
                        <span className="text-[#0070D2] font-semibold normal-case">{c.source}</span>
                      </span>
                    </div>
                    <div className="px-4 pb-4 pt-1">
                      <ComponentBody body={c.body} variant="salesforce" />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Right rail — activity + tile */}
            <aside className="bg-white border-l border-[#DDDBDA] px-4 py-4 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[11px] font-semibold text-[#181818]">Activity</p>
                  <div className="flex items-center gap-2 text-[10px] text-[#514F4D]">
                    <span>Tasks</span>
                    <span>Events</span>
                    <span>Logged</span>
                  </div>
                </div>
                <ol className="relative space-y-3 pl-4 border-l border-[#DDDBDA]">
                  {spec.activity.map((a) => (
                    <li key={a.label} className="relative text-[12px]">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[1.05rem] top-[5px] w-2 h-2 rounded-full bg-[#0070D2] ring-2 ring-white"
                      />
                      <p className="font-semibold text-[#181818] leading-snug">{a.label}</p>
                      <p className="text-[#181818] leading-snug">{a.detail}</p>
                      <p className="text-[#514F4D] mt-0.5">{a.sub}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="border border-[#DDDBDA] rounded bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#DDDBDA]">
                  <p className="text-[11px] font-semibold text-[#181818]">
                    {spec.rightRailTile.title}
                  </p>
                  <span className="text-[10px] text-[#0070D2] font-semibold">
                    {spec.rightRailTile.source}
                  </span>
                </div>
                <dl className="space-y-1.5">
                  {spec.rightRailTile.lines.map((l) => (
                    <div key={l.label} className="flex justify-between text-[12px]">
                      <dt className="text-[#514F4D]">{l.label}</dt>
                      <dd className={`font-semibold ${toneText(l.tone)}`}>{l.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>
          </div>
        </div>

        {/* Editorial callout legend — outside the mock */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spec.components.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 border border-ruleSoft bg-paper rounded-md p-4"
            >
              <span className="w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center shrink-0">
                {c.callout.number}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink font-serif">{c.title}</p>
                <p className="text-xs text-inkSoft leading-snug mt-1">{c.callout.description}</p>
                <p className="text-[10px] uppercase tracking-widest text-mute mt-2">
                  Source: <span className="text-navySoft font-semibold">{c.source}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
