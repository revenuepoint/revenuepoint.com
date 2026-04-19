'use client';

import { useIndustry } from '@/context/IndustryContext';
import { foundryAgentsByIndustry, foundryFeedItemsByIndustry } from '@/data/foundryAgents';
import { FoundryAgentCard } from '@/components/foundry/FoundryAgentCard';
import { HomeFeedStream } from '@/components/foundry/HomeFeedStream';

export function AgentsSection() {
  const { industryId } = useIndustry();
  const agents = foundryAgentsByIndustry[industryId];
  const feedItems = foundryFeedItemsByIndustry[industryId];

  return (
    <>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <FoundryAgentCard key={agent.id} agent={agent} />
        ))}
      </div>

      <div className="mt-12">
        <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
          Home Feed — what those agents produced this morning
        </p>
        <HomeFeedStream items={feedItems} />
      </div>
    </>
  );
}
