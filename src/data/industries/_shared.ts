import type { PackagingTier } from '@/types/industry';

export function standardPackaging(industryLabel: string): PackagingTier[] {
  return [
    {
      name: 'Foundation',
      duration: '4 weeks',
      headline: `A clean ${industryLabel} record page with the signature components live.`,
      includes: [
        'Discovery and current-state review',
        'Clean record page build with the custom components',
        'Core object + field cleanup',
        'Two primary integrations wired',
        'Named administrator for the life of the engagement',
      ],
    },
    {
      name: 'Rebuild',
      duration: '8–12 weeks',
      headline: `A full ${industryLabel} rebuild — objects, components, automations, integrations.`,
      includes: [
        'Everything in Foundation',
        'Custom object + permission model',
        'Four to six integrations (ERP, payments, comms, marketing)',
        'Flow and agent automation for the core workflows',
        'Foundry hook-up for live intelligence across systems',
        'User training and adoption workshops',
      ],
    },
    {
      name: 'Run',
      duration: 'Ongoing monthly',
      headline: 'Fully managed — we keep the instance clean as your business changes.',
      includes: [
        'Named administrator with monthly review cadence',
        'Integration maintenance when source systems change',
        'New components and reports on request',
        'Release and security updates handled by RevenuePoint',
        'Flat monthly fee — no hourly billing',
      ],
    },
  ];
}
