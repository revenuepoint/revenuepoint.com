import type { GatewayViewType } from '@/types/gateway';

export const gatewayViewTypes: GatewayViewType[] = [
  {
    id: 'table',
    label: 'Data Table',
    eyebrow: 'TABLE',
    description: 'Sortable, filterable, paginated views over any connected object — cases, orders, claims, invoices, anything.',
    capabilities: ['Sortable columns', 'Server-side filtering', 'Pagination + cursor', 'Status badges', 'Bulk actions (gated)'],
    sampleConfig: `casesTable({
  label: 'Open Cases',
  filter: { Status__c: 'Open' },
  columns: ['CaseNumber', 'Subject', 'Priority', 'LastModifiedDate'],
  actions: ['view', 'comment'],
})`,
  },
  {
    id: 'detail',
    label: 'Detail View',
    eyebrow: 'DETAIL',
    description: 'Field-level layout for a single record. Lookups resolve, picklists render with their labels, formulas evaluate.',
    capabilities: ['Two-column field layout', 'Lookup resolution', 'Picklist labels', 'Related-list tabs', 'Inline edit (gated)'],
    sampleConfig: `recordDetail({
  sobject: 'Case',
  layout: 'portal-default',
  relatedLists: ['Comments', 'Attachments', 'Order'],
  editable: ['Comments'],
})`,
  },
  {
    id: 'form',
    label: 'Record Form',
    eyebrow: 'FORM',
    description: 'Create or update records with validation, lookups, and per-field permissions. Submissions write through the connector.',
    capabilities: ['Required-field validation', 'Conditional fields', 'Lookup pickers', 'File upload', 'Pre-fill from URL params'],
    sampleConfig: `recordForm({
  label: 'New Case',
  sobject: 'Case',
  fields: ['Subject', 'Priority', 'Description'],
  defaults: (ctx) => ({ AccountId: ctx.accountId }),
})`,
  },
  {
    id: 'dashboard',
    label: 'Dashboard Cards',
    eyebrow: 'DASHBOARD',
    description: 'Summary metrics, counts, and small charts on a single page — backed by tenant-scoped queries against the connector.',
    capabilities: ['KPI tiles', 'Sparklines', 'Threshold colors', 'Refresh on focus', 'Time-window selector'],
    sampleConfig: `dashboardGrid({
  label: 'Account Overview',
  cards: [
    kpi({ source: openCasesCount, label: 'Open Cases' }),
    kpi({ source: avgResolveDays, label: 'Avg. Resolve' }),
    chart({ source: ticketsLast30, kind: 'sparkline' }),
  ],
})`,
  },
  {
    id: 'tabs',
    label: 'Tab Layouts',
    eyebrow: 'TABS',
    description: 'Compose any of the above into tab navigation. Each tab is its own view; the URL stays clean.',
    capabilities: ['Per-tab access rules', 'Lazy data loading', 'URL-synced state', 'Mobile-aware layout', 'Conditional tabs'],
    sampleConfig: `tabLayout({
  tabs: [
    { label: 'Cases', view: casesTable({ /* … */ }) },
    { label: 'Orders', view: ordersTable({ /* … */ }) },
    { label: 'Documents', view: documentList({ /* … */ }) },
  ],
})`,
  },
];
