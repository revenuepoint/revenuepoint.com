import type { RecordPageMockSpec, StatusTone } from '@/types/industry';
import { ComponentBody } from './ComponentBody';

function toneText(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'text-navy';
    case 'at-risk':
      return 'text-amber';
    case 'off-track':
      return 'text-rust';
    default:
      return 'text-navy';
  }
}

export function RecordPageMock({ spec }: { spec: RecordPageMockSpec }) {
  return (
    <section id="record-page" className="bg-cream border-y border-rule">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            A clean Salesforce record page
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            {spec.objectLabel} · {spec.accountName}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">
            This is the Lightning record page RevenuePoint builds for {spec.tabLabel.toLowerCase()}{' '}
            teams. Every component below is live Salesforce — reading from the systems noted on
            each tile. Numbered callouts map to the components we install on day one.
          </p>
        </div>

        {/* Lightning shell */}
        <div className="border border-rule rounded-lg bg-white shadow-sm overflow-hidden">
          {/* app chrome */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0B2A4A] text-white text-xs">
            <span className="w-2 h-2 rounded-full bg-white/30" />
            <span className="font-semibold tracking-wide">RevenuePoint CRM</span>
            <span className="text-white/60">›</span>
            <span className="text-white/80">{spec.tabLabel}</span>
            <span className="text-white/60">›</span>
            <span className="text-white/80">{spec.accountName}</span>
            <div className="ml-auto flex gap-3 text-white/70">
              <span>Follow</span>
              <span>Edit</span>
              <span>New Case</span>
            </div>
          </div>

          {/* highlights bar */}
          <div className="px-5 py-4 border-b border-rule flex flex-wrap items-center gap-6 bg-white">
            <div className="shrink-0">
              <div className="text-[10px] uppercase tracking-widest text-mute">
                {spec.objectLabel}
              </div>
              <div className="text-lg font-bold text-navy">{spec.accountName}</div>
              <div className="text-xs text-mute">{spec.accountSub}</div>
            </div>
            <div className="h-10 w-px bg-rule hidden md:block" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 flex-1">
              {spec.highlights.map((h) => (
                <div key={h.label}>
                  <div className="text-[10px] uppercase tracking-widest text-mute">
                    {h.label}
                  </div>
                  <div className={`text-sm font-semibold ${toneText(h.tone)}`}>{h.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* three column body */}
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] gap-0">
            {/* left rail */}
            <div className="border-r border-rule bg-cream px-4 py-5 space-y-5">
              {spec.relatedLists.map((list) => (
                <div key={list.title}>
                  <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                    {list.title}
                  </div>
                  <ul className="mt-2 space-y-1.5">
                    {list.items.map((item) => (
                      <li
                        key={item.label}
                        className="flex items-center justify-between text-xs text-ink"
                      >
                        <span className="truncate">{item.label}</span>
                        <span className="text-mute font-semibold ml-2">{item.count}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* center canvas */}
            <div className="px-5 py-5 space-y-4 bg-white">
              {spec.components.map((c) => (
                <div
                  key={c.id}
                  className="relative border border-rule rounded-md bg-white p-4"
                >
                  {/* callout badge */}
                  <span className="absolute -left-3 -top-3 w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center shadow-sm">
                    {c.callout.number}
                  </span>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="text-sm font-bold text-navy">{c.title}</div>
                      {c.subtitle && (
                        <div className="text-xs text-mute mt-0.5">{c.subtitle}</div>
                      )}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-mute shrink-0 whitespace-nowrap">
                      Pulls from: <span className="text-crimson font-semibold">{c.source}</span>
                    </div>
                  </div>
                  <ComponentBody body={c.body} />
                </div>
              ))}
            </div>

            {/* right rail */}
            <div className="border-l border-rule bg-cream px-4 py-5 space-y-5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                  Activity
                </div>
                <ul className="mt-2 space-y-3">
                  {spec.activity.map((a) => (
                    <li key={a.label} className="text-xs">
                      <div className="font-semibold text-navy">{a.label}</div>
                      <div className="text-ink leading-snug">{a.detail}</div>
                      <div className="text-mute mt-0.5">{a.sub}</div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-rule rounded-md bg-white p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                    {spec.rightRailTile.title}
                  </div>
                  <div className="text-[10px] text-crimson font-semibold">
                    {spec.rightRailTile.source}
                  </div>
                </div>
                <dl className="space-y-1.5">
                  {spec.rightRailTile.lines.map((l) => (
                    <div key={l.label} className="flex justify-between text-xs">
                      <dt className="text-mute">{l.label}</dt>
                      <dd className={`font-semibold ${toneText(l.tone)}`}>{l.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* callout legend */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spec.components.map((c) => (
            <div
              key={c.id}
              className="flex gap-3 border border-rule bg-white rounded-md p-4"
            >
              <span className="w-7 h-7 rounded-full bg-crimson text-white text-xs font-bold flex items-center justify-center shrink-0">
                {c.callout.number}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-bold text-navy">{c.title}</div>
                <div className="text-xs text-ink leading-snug mt-1">
                  {c.callout.description}
                </div>
                <div className="text-[10px] uppercase tracking-widest text-mute mt-2">
                  Source: <span className="text-crimson font-semibold">{c.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
