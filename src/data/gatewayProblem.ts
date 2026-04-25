import type { GatewayProblemCard } from '@/types/gateway';

export const gatewayProblemCards: GatewayProblemCard[] = [
  {
    title: 'Experience Cloud locks you in.',
    body: 'Every portal you build there is a Salesforce-only object, a Salesforce-only license, and a Salesforce-only roadmap. The day your business needs SAP, NetSuite, or a custom system in the same view, you\'re looking at a rebuild.',
    iconId: 'lockIn',
  },
  {
    title: 'Custom-built portals take months.',
    body: 'A bespoke Next.js portal plus auth plus connector plus permission rules plus theming is a four-to-six-month engineering project. The team that built it isn\'t the team that maintains it. Twelve months later, the upgrades stop.',
    iconId: 'buildCost',
  },
  {
    title: 'Most "multi-tenant" portals share data.',
    body: 'Off-the-shelf portal SaaS markets multi-tenancy at the UI layer while sharing one database underneath. One bug, one misconfigured permission rule, and tenant A sees tenant B\'s records. The headlines write themselves.',
    iconId: 'isolationGap',
  },
];

export const gatewayProblemStats: { value: string; label: string }[] = [
  { value: '4–6 months', label: 'typical custom portal build before launch' },
  { value: '$60K+/yr', label: 'minimum Experience Cloud license cost at scale' },
  { value: '0', label: 'portals where shared-DB SaaS keeps tenant A from seeing tenant B' },
];
