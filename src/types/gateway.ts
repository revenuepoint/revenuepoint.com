export type GatewayTenantId = 'acme' | 'globex' | 'initech';

export type GatewayViewId = 'table' | 'detail' | 'form' | 'dashboard' | 'tabs';

export type GatewayConnectionLabel =
  | 'Salesforce'
  | 'SAP'
  | 'NetSuite'
  | 'QuickBooks'
  | 'Microsoft Dynamics'
  | 'Custom REST';

export type GatewayTenant = {
  id: GatewayTenantId;
  name: string;
  subdomain: string;
  primaryColor: string;
  primaryColorTint: string;
  logoMonogram: string;
  industry: string;
  connectionLabel: GatewayConnectionLabel;
  accessRuleSummary: string;
  accessRuleCode: string;
  recordObjectLabel: string;
  recordIdLabel: string;
  records: GatewayTenantRecord[];
  detailFields: { label: string; value: string }[];
  dashboardKpis: { label: string; value: string; change: string; tone: 'good' | 'bad' | 'neutral' }[];
  formFields: { label: string; type: 'text' | 'select' | 'date' | 'textarea'; placeholder?: string; options?: string[] }[];
  views: GatewayViewId[];
};

export type GatewayTenantRecord = {
  id: string;
  title: string;
  status: string;
  statusTone: 'good' | 'bad' | 'neutral' | 'warn';
  amount: string;
  updated: string;
};

export type GatewayConnector = {
  id: string;
  name: string;
  category: 'CRM' | 'ERP' | 'Accounting' | 'Custom';
  shipped: boolean;
  capabilities: { read: boolean; create: boolean; update: boolean };
  objects: string[];
  authMethod: string;
  notes: string;
};

export type GatewayViewType = {
  id: GatewayViewId;
  label: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  sampleConfig: string;
};

export type GatewayUseCase = {
  id: string;
  archetype: string;
  oneLine: string;
  whoUses: string;
  primaryConnection: 'Salesforce' | 'SAP' | 'Mixed';
  mockedViews: string[];
  industries: string[];
  accessRule: string;
};

export type GatewayProblemCard = {
  title: string;
  body: string;
  iconId: 'lockIn' | 'buildCost' | 'isolationGap';
};

export type GatewaySecurityPillar = {
  iconId: 'isolation' | 'audit' | 'auth' | 'session' | 'compliance' | 'residency';
  title: string;
  items: string[];
};

export type GatewayInclusion = {
  title: string;
  body: string;
};

export type GatewayFaqItem = {
  question: string;
  answer: string;
};
