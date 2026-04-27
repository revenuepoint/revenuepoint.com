export type ConsultingActivity = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export const consultingActivities: ConsultingActivity[] = [
  {
    title: 'Implementations',
    body: 'New Salesforce rollouts configured to the way your team actually works — not to the demo. Pipeline stages, record pages, automations, and reporting built around your process.',
  },
  {
    title: 'Migrations & Replatforming',
    body: 'Move off Classic, consolidate multiple orgs, or migrate from another CRM. Data, custom code, integrations, and users brought across without losing history.',
  },
  {
    title: 'Integrations',
    body: 'ERP, accounting, marketing, telephony, and AppExchange apps connected to Salesforce and maintained. Named integrations, mapped fields, monitored pipelines.',
  },
  {
    title: 'Custom Development',
    body: 'Apex, Lightning Web Components, Flows, and record-page customizations where standard configuration falls short. Code we write is code we support.',
  },
  {
    title: 'Managed Administration',
    body: 'Your single point of contact at RevenuePoint keeps your instance clean, evolving, and audited month to month. Fully managed by RevenuePoint.',
  },
  {
    title: 'Training & Adoption',
    body: 'End-user, admin, and onboarding programs that land the platform with your team so the investment actually sticks.',
    cta: { label: 'See training programs', href: '/salesforce/training/' },
  },
];

export type ConsultingProduct = {
  id: string;
  name: string;
  overview: string;
  whatWeDo: string[];
};

export const consultingProducts: ConsultingProduct[] = [
  {
    id: 'sales-cloud',
    name: 'Sales Cloud',
    overview:
      'Most Sales Cloud implementations are configured for Salesforce\'s demo, not your actual sales process. We map your pipeline stages, custom fields, and opportunity flows to the way your team sells — then maintain it as your business evolves.',
    whatWeDo: [
      'Pipeline, stage, and forecast configuration against your real sales motion',
      'Lead and opportunity routing, assignment rules, and queue management',
      'Einstein activity capture and sales engagement tooling',
      'Reporting and dashboards for leadership, managers, and reps',
    ],
  },
  {
    id: 'service-cloud',
    name: 'Service Cloud',
    overview:
      'We implement Service Cloud around your actual support workflows — email, phone, chat, and social — with SLAs, escalation rules, and reporting configured to your team\'s structure. Your agents work the queue; we keep the platform running.',
    whatWeDo: [
      'Case management, omni-channel routing, and escalation rules',
      'SLA configuration and milestone tracking',
      'Knowledge base, macros, and agent productivity tooling',
      'Service console layouts built around your support workflows',
    ],
  },
  {
    id: 'experience-cloud',
    name: 'Experience Cloud',
    overview:
      'Branded portals for partners and customers to submit cases, log deals, and access resources — without internal Salesforce licenses. We build and manage Experience Cloud communities around your use case.',
    whatWeDo: [
      'Partner portals for deal registration and channel enablement',
      'Customer portals for case submission and self-service',
      'Branded theming, navigation, and access controls',
      'Integration with CMS, SSO, and third-party content',
    ],
  },
  {
    id: 'marketing-pardot',
    name: 'Marketing Cloud & Pardot',
    overview:
      'Pardot for companies that need aligned marketing and sales pipelines, Marketing Cloud for cross-channel journeys at scale. We implement and manage it so your marketers can market.',
    whatWeDo: [
      'Lead scoring, grading, and nurture sequences',
      'Bi-directional CRM sync between Pardot and Sales Cloud',
      'Campaign attribution reporting back to revenue',
      'Journey Builder, Email Studio, and audience orchestration',
    ],
  },
  {
    id: 'cpq-billing',
    name: 'CPQ & Billing',
    overview:
      'Manual quoting is a revenue leak. CPQ replaces the spreadsheet and the approval bottleneck with a configured quoting engine that enforces pricing rules and generates contracts. We implement and maintain it.',
    whatWeDo: [
      'Product catalogs, pricing rules, and discount governance',
      'Approval workflows and contract generation',
      'Subscription billing, renewals, and revenue recognition',
      'Quote-to-cash integration with ERP and accounting',
    ],
  },
  {
    id: 'npsp',
    name: 'Nonprofit Success Pack',
    overview:
      'NPSP turns Salesforce into the world\'s leading nonprofit CRM. We implement it for fundraising teams and program managers — configured to your campaigns, donor segments, and reporting requirements.',
    whatWeDo: [
      'Household and donor record model configuration',
      'Campaign, appeal, and gift entry workflows',
      'Grant pipeline and program outcomes tracking',
      'Integration with payment processors and marketing tools',
    ],
  },
  {
    id: 'administration',
    name: 'Salesforce Administration',
    overview:
      'Most organizations implement Salesforce correctly and then let it drift. Fully managed by RevenuePoint prevents that — your single point of contact and a project manager audit, optimize, and evolve your instance month to month, with a team that knows your org behind them.',
    whatWeDo: [
      'User provisioning, permissions, and license management',
      'Release readiness and three-times-yearly platform upgrades',
      'Backlog intake, change management, and documentation',
      'Quarterly instance health reviews with executive reporting',
    ],
  },
  {
    id: 'integrations',
    name: 'Integrations & AppExchange',
    overview:
      'We connect Salesforce to your existing stack — ERP, accounting, marketing, telephony, and custom applications — and maintain the pipelines that keep every record in sync.',
    whatWeDo: [
      'ERP and accounting integrations (NetSuite, SAP, QuickBooks, and more)',
      'Telephony, email, and calendar integrations',
      'AppExchange package selection, install, and configuration',
      'Custom API integrations with monitored pipelines',
    ],
  },
];
