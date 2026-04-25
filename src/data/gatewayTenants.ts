import type { GatewayTenant, GatewayTenantId } from '@/types/gateway';

export const gatewayTenants: GatewayTenant[] = [
  {
    id: 'acme',
    name: 'Acme Corp',
    subdomain: 'acme.portal.revenuepoint.com',
    primaryColor: '#1A56DB',
    primaryColorTint: 'rgba(26, 86, 219, 0.10)',
    logoMonogram: 'AC',
    industry: 'B2B Distribution',
    connectionLabel: 'Salesforce',
    accessRuleSummary: 'Active Contacts on Account: Acme Corp',
    accessRuleCode: `access: (email) =>
  isActiveContact(email, 'Acme Corp')`,
    recordObjectLabel: 'Open Cases',
    recordIdLabel: 'Case',
    records: [
      { id: 'CS-10481', title: 'Pallet shipment damaged on arrival', status: 'New', statusTone: 'warn', amount: '—', updated: '12 min ago' },
      { id: 'CS-10479', title: 'Wrong SKU shipped on PO 88241', status: 'In Progress', statusTone: 'neutral', amount: '$4,820', updated: '2 hours ago' },
      { id: 'CS-10472', title: 'Replacement freight quote needed', status: 'Awaiting Customer', statusTone: 'neutral', amount: '$1,140', updated: 'Yesterday' },
      { id: 'CS-10465', title: 'Tier-2 escalation: missed delivery window', status: 'Escalated', statusTone: 'bad', amount: '—', updated: '2 days ago' },
      { id: 'CS-10458', title: 'Refund processed; awaiting credit memo', status: 'Resolved', statusTone: 'good', amount: '$2,300', updated: '3 days ago' },
    ],
    detailFields: [
      { label: 'Case ID', value: 'CS-10481' },
      { label: 'Account', value: 'Acme Corp' },
      { label: 'Contact', value: 'Maria Chen' },
      { label: 'Priority', value: 'High' },
      { label: 'Subject', value: 'Pallet shipment damaged on arrival' },
      { label: 'Origin', value: 'Web Portal' },
      { label: 'Carrier', value: 'XPO Logistics' },
      { label: 'PO Number', value: 'PO-88241' },
    ],
    dashboardKpis: [
      { label: 'Open Cases', value: '14', change: '+2', tone: 'bad' },
      { label: 'Avg. Resolve', value: '2.4d', change: '-0.3d', tone: 'good' },
      { label: 'CSAT (30d)', value: '4.6', change: '+0.1', tone: 'good' },
      { label: 'Backlog $', value: '$24.8K', change: '-$3.1K', tone: 'good' },
    ],
    formFields: [
      { label: 'Subject', type: 'text', placeholder: 'Briefly describe the issue' },
      { label: 'Priority', type: 'select', options: ['Low', 'Medium', 'High', 'Critical'] },
      { label: 'PO Number', type: 'text', placeholder: 'PO-88241' },
      { label: 'Description', type: 'textarea', placeholder: 'What happened, when, and what you need from us…' },
    ],
    views: ['table', 'detail', 'form', 'dashboard', 'tabs'],
  },
  {
    id: 'globex',
    name: 'Globex Industries',
    subdomain: 'partners.globex-industries.com',
    primaryColor: '#0F766E',
    primaryColorTint: 'rgba(15, 118, 110, 0.10)',
    logoMonogram: 'GX',
    industry: 'Manufacturing',
    connectionLabel: 'SAP',
    accessRuleSummary: 'Approved partners on the Globex partner network',
    accessRuleCode: `access: (email) =>
  isPartnerContact(email, {
    network: 'globex-channel',
    status: 'Approved',
  })`,
    recordObjectLabel: 'Open Orders',
    recordIdLabel: 'Order',
    records: [
      { id: 'SO-7748210', title: 'Replenishment order — line 2', status: 'In Production', statusTone: 'neutral', amount: '$184,200', updated: '20 min ago' },
      { id: 'SO-7748196', title: 'Channel partner — Q2 forecast', status: 'Confirmed', statusTone: 'good', amount: '$612,500', updated: '1 hour ago' },
      { id: 'SO-7748182', title: 'Spare parts kit — accelerated', status: 'Awaiting Plant', statusTone: 'warn', amount: '$28,400', updated: '3 hours ago' },
      { id: 'SO-7748175', title: 'Drop-ship to Houston DC', status: 'Shipped', statusTone: 'good', amount: '$77,900', updated: 'Yesterday' },
      { id: 'SO-7748161', title: 'Cancelled — credit hold', status: 'Cancelled', statusTone: 'bad', amount: '$14,250', updated: '2 days ago' },
    ],
    detailFields: [
      { label: 'Order #', value: 'SO-7748210' },
      { label: 'Partner', value: 'Acme Distributing Co' },
      { label: 'Plant', value: '5230 — Cleveland' },
      { label: 'Currency', value: 'USD' },
      { label: 'Incoterms', value: 'FOB Origin' },
      { label: 'Requested Date', value: '2026-05-12' },
      { label: 'Confirmed Date', value: '2026-05-15' },
      { label: 'Total', value: '$184,200.00' },
    ],
    dashboardKpis: [
      { label: 'Open Orders', value: '38', change: '+5', tone: 'neutral' },
      { label: 'On-Time %', value: '94.2%', change: '+1.4pp', tone: 'good' },
      { label: 'Avg. Lead', value: '11.6d', change: '-0.8d', tone: 'good' },
      { label: 'Backlog $', value: '$1.42M', change: '+$120K', tone: 'neutral' },
    ],
    formFields: [
      { label: 'Plant', type: 'select', options: ['5230 — Cleveland', '5240 — Houston', '5260 — Reno'] },
      { label: 'Material', type: 'text', placeholder: 'SKU or material number' },
      { label: 'Quantity', type: 'text', placeholder: '0' },
      { label: 'Notes', type: 'textarea', placeholder: 'Special handling, delivery windows, etc.' },
    ],
    views: ['table', 'detail', 'form', 'dashboard', 'tabs'],
  },
  {
    id: 'initech',
    name: 'Initech Health',
    subdomain: 'members.initechhealth.org',
    primaryColor: '#7E22CE',
    primaryColorTint: 'rgba(126, 34, 206, 0.10)',
    logoMonogram: 'IH',
    industry: 'Healthcare',
    connectionLabel: 'Salesforce',
    accessRuleSummary: 'Active members on an Initech Health plan',
    accessRuleCode: `access: (email) =>
  isActiveMember(email, {
    plan: ['Bronze', 'Silver', 'Gold', 'Platinum'],
  })`,
    recordObjectLabel: 'Claims',
    recordIdLabel: 'Claim',
    records: [
      { id: 'CL-994401', title: 'Specialist visit — cardiology', status: 'Approved', statusTone: 'good', amount: '$420.00', updated: '8 min ago' },
      { id: 'CL-994388', title: 'Lab panel — follow-up', status: 'Pending Review', statusTone: 'warn', amount: '$162.40', updated: '1 hour ago' },
      { id: 'CL-994374', title: 'Imaging — referring provider', status: 'Information Needed', statusTone: 'warn', amount: '$1,240.00', updated: '4 hours ago' },
      { id: 'CL-994359', title: 'Pharmacy benefit', status: 'Paid', statusTone: 'good', amount: '$48.20', updated: 'Yesterday' },
      { id: 'CL-994341', title: 'Out-of-network — denied', status: 'Denied', statusTone: 'bad', amount: '$880.00', updated: '3 days ago' },
    ],
    detailFields: [
      { label: 'Claim #', value: 'CL-994401' },
      { label: 'Member', value: 'D. Patel' },
      { label: 'Plan', value: 'Gold PPO' },
      { label: 'Provider', value: 'Cleveland Cardiology Group' },
      { label: 'Service Date', value: '2026-04-19' },
      { label: 'Diagnosis', value: 'I10 — Essential hypertension' },
      { label: 'Allowed Amt', value: '$378.00' },
      { label: 'Member Resp.', value: '$42.00' },
    ],
    dashboardKpis: [
      { label: 'Open Claims', value: '6', change: '0', tone: 'neutral' },
      { label: 'YTD Out-of-Pocket', value: '$1,284', change: '+$162', tone: 'neutral' },
      { label: 'Deductible Met', value: '64%', change: '+8pp', tone: 'good' },
      { label: 'Active Auths', value: '2', change: '+1', tone: 'neutral' },
    ],
    formFields: [
      { label: 'Service Type', type: 'select', options: ['Office Visit', 'Procedure', 'Imaging', 'Lab', 'Pharmacy', 'Other'] },
      { label: 'Provider', type: 'text', placeholder: 'Provider or facility name' },
      { label: 'Service Date', type: 'date' },
      { label: 'Description', type: 'textarea', placeholder: 'Notes for claims review…' },
    ],
    views: ['table', 'detail', 'form', 'dashboard', 'tabs'],
  },
];

export const gatewayTenantsById: Record<GatewayTenantId, GatewayTenant> = {
  acme: gatewayTenants[0],
  globex: gatewayTenants[1],
  initech: gatewayTenants[2],
};

export function getTenant(id: GatewayTenantId): GatewayTenant {
  return gatewayTenantsById[id];
}
