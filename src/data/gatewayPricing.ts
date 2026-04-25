import type { GatewayInclusion, GatewayFaqItem } from '@/types/gateway';

export const GATEWAY_PRICE = '$3,500';
export const GATEWAY_PRICE_PERIOD = 'per tenant / month';
export const GATEWAY_CONTACT_HREF = '/contact/?interest=Gateway';

export const GATEWAY_INCLUSIONS: GatewayInclusion[] = [
  {
    title: 'Hosting on dedicated infrastructure',
    body: 'Each Gateway deployment runs on its own provisioned environment. No commingling between customer estates.',
  },
  {
    title: 'Magic-link authentication via SendGrid',
    body: 'Email-based, password-less login for every tenant. Server-side session management. Audit trail on every grant.',
  },
  {
    title: 'Connector to your CRM or ERP',
    body: 'Salesforce or SAP connector configured against your org, with field-level permissions enforced at the Gateway layer.',
  },
  {
    title: 'Tenant configuration in code',
    body: 'A RevenuePoint engineer writes the TypeScript tenant config — domain, connection, access rules, views, theme — and ships it.',
  },
  {
    title: 'Per-tenant theming',
    body: 'Logo, primary color, header brand, and email-template look configured per tenant. Production-grade — not a CSS hack.',
  },
  {
    title: 'Audit log + access reports',
    body: 'Every magic-link issuance, every login, every record write is logged. Per-tenant exports available on request.',
  },
  {
    title: 'Named administrator',
    body: 'A RevenuePoint engineer who knows your tenants, your connectors, and your access rules. Office hours, change requests, monthly review.',
  },
  {
    title: 'Upgrades, patching, observability',
    body: 'Framework upgrades, security patching, and 24/7 monitoring (Datadog) are absorbed by RevenuePoint. You don\'t maintain Gateway.',
  },
];

export const GATEWAY_FAQ: GatewayFaqItem[] = [
  {
    question: 'How is pricing calculated when I have many tenants?',
    answer:
      'Pricing is per active tenant per month. Volume discounts apply once you cross five tenants — get in touch and we\'ll quote your specific footprint. Inactive tenants (paused or deprecated) don\'t count toward the active total.',
  },
  {
    question: 'Can my own developers write the tenant config?',
    answer:
      'In the managed tier, RevenuePoint engineers own the tenant config so we can guarantee the SLA and the audit story. We can co-author with your team — your engineers can review the configs in pull requests, request changes, and propose new views — but final commits go through RevenuePoint.',
  },
  {
    question: 'What\'s the data residency story?',
    answer:
      'US (default), EU, and Canada regions are available. Each region is a separate deployment with no cross-region traffic for tenant data. We can host on AWS or Vercel, depending on your compliance requirements.',
  },
  {
    question: 'Can I bring my own domain?',
    answer:
      'Yes. Each tenant maps to a subdomain you control — e.g., partners.yourcompany.com — with TLS provisioned and renewed automatically. Apex domains and root-level mappings are supported on request.',
  },
  {
    question: 'What if I need a connector you don\'t list?',
    answer:
      'The Custom REST/GraphQL connector covers most systems with an API. For something deeper, we build a named connector in 2–4 weeks; once shipped, the connector becomes part of the Gateway product and is available to other customers (without revealing your tenants or your data).',
  },
  {
    question: 'How long until our first tenant is live?',
    answer:
      'Two to four weeks for the first tenant. Discovery + tenant model definition takes the first week; the next 1–3 weeks are connector setup, view configuration, theming, and a staging walkthrough. Subsequent tenants on the same Gateway deployment go live in days.',
  },
  {
    question: 'Is the source code available?',
    answer:
      'Gateway is currently a managed-only product. We don\'t ship the framework as open source today — though we may in the future. If you need source access for compliance reasons, we can work that into the agreement under NDA.',
  },
];
