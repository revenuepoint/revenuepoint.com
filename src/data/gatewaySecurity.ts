import type { GatewaySecurityPillar } from '@/types/gateway';

export const gatewaySecurityPillars: GatewaySecurityPillar[] = [
  {
    iconId: 'isolation',
    title: 'Tenant isolation',
    items: [
      'Each tenant resolves to its own connection, its own data source, its own access rules',
      'Middleware enforces tenant scoping on every request — at the edge, before any handler runs',
      'No shared queries between tenants; isolation tested in CI on every change',
      'Per-tenant secrets stored separately and resolved by the runtime, never bundled',
    ],
  },
  {
    iconId: 'auth',
    title: 'Magic-link authentication',
    items: [
      'Email-based, password-less login via SendGrid — no password resets to reset, no breaches to disclose',
      'Single-use tokens, short TTL (15 minutes default, configurable per tenant)',
      'Issuance gated by code-defined access rules — no email gets a link unless the rule passes',
      'Rate limiting and abuse detection on the magic-link endpoint',
    ],
  },
  {
    iconId: 'session',
    title: 'Server-side sessions',
    items: [
      'Sessions live in encrypted, HTTP-only cookies; refreshed server-side on every request',
      'Idle and absolute session expiry, both configurable per tenant',
      'Session revocation is instant — kill a user from the admin and they\'re out on the next request',
      'No tokens in localStorage, no JWTs floating in the browser',
    ],
  },
  {
    iconId: 'audit',
    title: 'Audit log on every action',
    items: [
      'Magic-link issuances, logins, record reads, record writes — all logged, timestamped, attributed',
      'Configurable retention; default 12 months hot, longer cold storage on request',
      'Per-tenant export available on demand; SIEM forwarding supported (Splunk, Datadog, etc.)',
      'Reversible writes — every change captures the before-state, so rollback is one query',
    ],
  },
  {
    iconId: 'compliance',
    title: 'Compliance posture',
    items: [
      'SOC 2 Type II in progress; controls operating since 2026',
      'HIPAA-eligible deployment configuration available with BAA',
      'GDPR + CCPA workflows: right to access, right to erasure, data portability',
      'Annual third-party penetration testing on the Gateway framework + sample tenant',
    ],
  },
  {
    iconId: 'residency',
    title: 'Data residency',
    items: [
      'US (default), EU, and Canada regions; each is a separate deployment',
      'No cross-region tenant traffic; each region\'s configuration is independent',
      'Hosted on AWS (Vercel-managed) or directly on AWS for tighter compliance fits',
      'BYO-cloud (your AWS account) available for enterprise tenants on request',
    ],
  },
];

export const gatewaySecurityStats: { value: string; label: string }[] = [
  { value: '99.9%', label: 'Tenant uptime SLA · per region' },
  { value: '<15min', label: 'Magic-link TTL · configurable per tenant' },
  { value: '12mo', label: 'Default audit-log retention · longer on request' },
  { value: '0', label: 'Cross-tenant data leaks since first deployment' },
];
