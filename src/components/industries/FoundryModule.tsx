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

const AGENT_TYPE_DOT: Record<AgentType, string> = {
  watcher: 'bg-amber-400',
  processor: 'bg-cyan-400',
  scheduler: 'bg-emerald-400',
  responder: 'bg-fuchsia-400',
};

type Pillar = { eyebrow: string; headline: string; body: string };

function buildPillars(industryId: IndustryId): Pillar[] {
  const industry = getIndustry(industryId);
  const systems = industry.systems.slice(0, 3).join(', ');
  const firstOutcome = industry.outcomes[0] ?? '';
  const secondOutcome = industry.outcomes[1] ?? industry.outcomes[0] ?? '';
  return [
    {
      eyebrow: '01 · Connect',
      headline: 'Every system you run, on one warehouse.',
      body: `We wire ${systems} into a managed pipeline so ${industry.shortName} data matches on every side.`,
    },
    {
      eyebrow: '02 · Illuminate',
      headline: 'Live dashboards. Overnight AI analysis.',
      body: firstOutcome,
    },
    {
      eyebrow: '03 · Act',
      headline: 'Agents watch, decide, and execute.',
      body: secondOutcome,
    },
  ];
}

export function FoundryModule({ industryId, navLabel }: { industryId: IndustryId; navLabel: string }) {
  const agents = foundryAgentsByIndustry[industryId];
  const agent = agents?.[0];
  const pillars = buildPillars(industryId);

  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Foundry · Orchestrated intelligence
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Foundry sits on top of a clean Salesforce.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-300">
            Once your record page is clean, Foundry connects the rest of your stack — ERP,
            accounting, telephony, marketing — and delivers live dashboards, AI reports, and
            agents that take action. Fully managed by RevenuePoint.
          </p>
        </div>

        {/* 3-pillar strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((p) => (
            <div
              key={p.eyebrow}
              className="border border-white/10 rounded-lg bg-white/[0.03] p-5"
            >
              <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                {p.eyebrow}
              </div>
              <div className="mt-2 text-base font-bold text-white">{p.headline}</div>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Agent preview + CTAs */}
        {agent && (
          <div className="mt-10 border border-white/10 rounded-lg bg-white/[0.04] p-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-center gap-8">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  A {navLabel} agent, running today
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-gray-300 font-semibold">
                  <span className={`h-2 w-2 rounded-full ${AGENT_TYPE_DOT[agent.type]}`} />
                  {AGENT_TYPE_LABEL[agent.type]}
                </span>
              </div>
              <div className="mt-3 text-lg font-bold text-white">{agent.name}</div>
              <p className="mt-2 text-sm text-gray-300 leading-relaxed max-w-2xl">
                {agent.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-400">
                <span>
                  <span className="text-gray-500 uppercase tracking-widest mr-2">Runs</span>
                  {agent.schedule}
                </span>
                <span>
                  <span className="text-gray-500 uppercase tracking-widest mr-2">Success</span>
                  {agent.successRate}%
                </span>
                <span>
                  <span className="text-gray-500 uppercase tracking-widest mr-2">Avg</span>
                  {agent.avgDuration}
                </span>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex flex-col gap-2 lg:items-end">
              <Link
                href="/foundry/"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDark transition-colors whitespace-nowrap"
              >
                See Foundry in full →
              </Link>
              <Link
                href={`/contact/?interest=Foundry+${encodeURIComponent(navLabel)}`}
                className="text-sm text-gray-300 hover:text-white underline underline-offset-4 whitespace-nowrap"
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
