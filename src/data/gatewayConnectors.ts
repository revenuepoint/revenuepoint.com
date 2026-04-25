import type { GatewayConnector } from '@/types/gateway';

export const gatewayConnectors: GatewayConnector[] = [
  {
    id: 'salesforce',
    name: 'Salesforce',
    category: 'CRM',
    shipped: true,
    capabilities: { read: true, create: true, update: true },
    objects: ['Account', 'Contact', 'Case', 'Opportunity', 'Order', 'Custom Objects'],
    authMethod: 'OAuth 2.0 / Connected App or Service User',
    notes: 'Built on JSforce. Sales Cloud, Service Cloud, Health Cloud, and custom objects all supported. Picklists, lookups, and field-level security enforced at the connector layer.',
  },
  {
    id: 'sap',
    name: 'SAP',
    category: 'ERP',
    shipped: true,
    capabilities: { read: true, create: true, update: true },
    objects: ['Sales Order', 'Purchase Order', 'Material', 'Customer', 'Vendor', 'Plant'],
    authMethod: 'SAP Cloud Connector / OAuth',
    notes: 'S/4HANA via OData; Business One via Service Layer. Read paths support delta queries; write paths are gated by per-tenant capability flags so partners only see what you intend.',
  },
  {
    id: 'custom-rest',
    name: 'Custom REST / GraphQL',
    category: 'Custom',
    shipped: true,
    capabilities: { read: true, create: true, update: true },
    objects: ['Whatever you map'],
    authMethod: 'API key, OAuth, signed JWT, mTLS',
    notes: 'Generic adapter. Define request/response schemas in TypeScript; Gateway handles auth, retry, and per-tenant secret resolution. The way to plug in a proprietary system or a vertical SaaS we don\'t ship a named connector for.',
  },
  {
    id: 'netsuite',
    name: 'NetSuite',
    category: 'ERP',
    shipped: false,
    capabilities: { read: true, create: false, update: false },
    objects: ['Customer', 'Sales Order', 'Invoice', 'Item'],
    authMethod: 'Token-Based Authentication (TBA)',
    notes: 'Read-only beta. Roadmapped: full read/write parity with the Salesforce and SAP connectors.',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online',
    category: 'Accounting',
    shipped: false,
    capabilities: { read: true, create: false, update: false },
    objects: ['Customer', 'Invoice', 'Payment', 'Estimate'],
    authMethod: 'OAuth 2.0',
    notes: 'Read-only beta. Targeted for use as a secondary connector — e.g., a customer portal that shows invoices alongside Salesforce cases.',
  },
  {
    id: 'dynamics',
    name: 'Microsoft Dynamics 365',
    category: 'CRM',
    shipped: false,
    capabilities: { read: false, create: false, update: false },
    objects: ['Account', 'Contact', 'Case', 'Opportunity'],
    authMethod: 'OAuth 2.0 / Azure AD',
    notes: 'Roadmap. Prioritized based on customer demand — let us know if you need it.',
  },
];

export function shippedConnectors() {
  return gatewayConnectors.filter((c) => c.shipped);
}

export function roadmapConnectors() {
  return gatewayConnectors.filter((c) => !c.shipped);
}
