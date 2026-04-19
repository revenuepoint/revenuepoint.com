'use client';

import { MotionConfig, motion } from 'framer-motion';
import { SalesforceMock } from '@/components/foundry/embedded/SalesforceMock';
import { DynamicsMock } from '@/components/foundry/embedded/DynamicsMock';
import { TeamsMock } from '@/components/foundry/embedded/TeamsMock';
import { SlackMock } from '@/components/foundry/embedded/SlackMock';
import { EightByEightMock } from '@/components/foundry/embedded/EightByEightMock';
import { SapMock } from '@/components/foundry/embedded/SapMock';

const ITEMS = [
  {
    key: 'salesforce',
    render: <SalesforceMock />,
    caption: 'Salesforce · Home Feed widget + Otto docked to every Account page.',
  },
  {
    key: 'dynamics',
    render: <DynamicsMock />,
    caption: 'Dynamics 365 · Prism forecasts + metric trees on every Lead.',
  },
  {
    key: 'teams',
    render: <TeamsMock />,
    caption: 'Microsoft Teams · Otto @mentions, chart replies, action chips — no app-switching.',
  },
  {
    key: 'slack',
    render: <SlackMock />,
    caption: 'Slack · /otto slash commands, rich blocks, shareable reports.',
  },
  {
    key: '8x8',
    render: <EightByEightMock />,
    caption: '8x8 Contact Center · AI-generated cold-call briefs for every dial.',
  },
  {
    key: 'sap',
    render: <SapMock />,
    caption: 'SAP Fiori · cross-system alerts + agent-recommended actions on every order.',
  },
];

export function EmbeddedInTools() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            className="flex flex-col gap-2"
          >
            <div className="h-[420px] overflow-hidden">
              {item.render}
            </div>
            <p className="text-[11px] text-mutedText px-1">{item.caption}</p>
          </motion.div>
        ))}
      </div>
    </MotionConfig>
  );
}
