import Link from 'next/link';
import type { IndustryId } from '@/context/IndustryContext';
import { foundryAgentsByIndustry, type AgentType } from '@/data/foundryAgents';
import { getIndustry } from '@/data/foundryIndustries';

const AGENT_TYPE_LABEL: Record<AgentType, string> = {
  watcher: 'Watcher',
  processor: 'Processor',
  scheduler: 'Scheduler',
  responder: 'Responder',
};

const AGENT_TYPE_TONE: Record<AgentType, string> = {
  watcher: 'text-amber',
  processor: 'text-navy',
  scheduler: 'text-navy',
  responder: 'text-crimson',
};

type Pillar = { eyebrow: string; headline: string; body: string };

function buildPillars(industryId: IndustryId): Pillar[] {
  const industry = getIndustry(industryId);
  const systems = industry.systems.slice(0, 3).join(', ');
  const firstOutcome = industry.outcomes[0] ?? '';
  const secondOutcome = industry.outcomes[1] ?? industry.outcomes[0] ?? '';
  return [
    {
      eyebrow: 'I · Connect',
      headline: 'Every system you run, on one warehouse.',
      body: `We wire ${systems} into a managed pipeline so ${industry.shortName} data matches on every side.`,
    },
    {
      eyebrow: 'II · Illuminate',
      headline: 'Live dashboards. Overnight AI analysis.',
      body: firstOutcome,
    },
    {
      eyebrow: 'III · Act',
      headline: 'Agents watch, decide, and execute.',
      body: secondOutcome,
    },
  ];
}

export function FoundryModule({
  industryId,
  navLabel,
}: {
  industryId: IndustryId;
  navLabel: string;
}) {
  const agents = foundryAgentsByIndustry[industryId];
  const agent = agents?.[0];
  const pillars = buildPillars(industryId);

  return (
    <section className="bg-ink text-paper">
      <div className="max-w-editorial mx-auto px-6 lg:px-8 py-section">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/70 inline-flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-crimson" />
            Foundry · Orchestrated intelligence
          </p>
          <h2 className="text-d1 font-serif font-medium text-paper leading-tight">
            Foundry sits on top of a <em className="text-crimson">clean</em> Salesforce.
          </h2>
          <p className="mt-4 text-lede leading-[1.65] text-paper/80 max-w-prose">
            Once your record page is clean, Foundry connects the rest of your stack — ERP, accounting, telephony, marketing — and delivers live dashboards, AI reports, and agents that take action. Fully managed by RevenuePoint.
          </p>
        </div>

        {/* 3-pillar strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.eyebrow} className="border-t border-paper/20 pt-5 relative">
              <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
                {p.eyebrow}
              </p>
              <h3 className="mt-3 font-serif text-[1.25rem] text-paper font-medium leading-tight">
                {p.headline}
              </h3>
              <p className="mt-3 text-sm text-paper/75 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Agent preview + CTAs */}
        {agent && (
          <div className="mt-12 border border-paper/15 bg-paper/[0.04] p-6 lg:p-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-crimson">
                  A {navLabel} agent, running today
                </span>
                <span
                  className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] ${AGENT_TYPE_TONE[agent.type]}`}
                >
                  <span className="live-dot" />
                  {AGENT_TYPE_LABEL[agent.type]}
                </span>
              </div>
              <p className="mt-3 font-serif text-[1.5rem] text-paper leading-tight">{agent.name}</p>
              <p className="mt-3 text-sm text-paper/80 leading-relaxed max-w-2xl">
                {agent.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-paper/60">
                <span>
                  <span className="text-paper/40 mr-2">Runs</span>
                  <span className="text-paper/85">{agent.schedule}</span>
                </span>
                <span>
                  <span className="text-paper/40 mr-2">Success</span>
                  <span className="text-paper/85 tabular-nums">{agent.successRate}%</span>
                </span>
                <span>
                  <span className="text-paper/40 mr-2">Avg</span>
                  <span className="text-paper/85">{agent.avgDuration}</span>
                </span>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 flex flex-col gap-3 lg:items-end">
              <Link
                href="/foundry/"
                className="inline-flex items-center gap-2 border border-paper text-paper font-serif italic text-[15px] px-5 py-2 hover:bg-paper hover:text-ink transition-colors whitespace-nowrap"
              >
                See Foundry in full <span aria-hidden="true">→</span>
              </Link>
              <Link
                href={`/contact/?interest=Foundry+${encodeURIComponent(navLabel)}`}
                className="font-serif italic text-sm text-paper/80 hover:text-paper underline underline-offset-4 whitespace-nowrap"
              >
                Request a Foundry demo →
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
