import type { CrmId } from '@/context/CrmContext';
import type { HealthCheckCrmContent } from '@/types/healthCheck';

// The canonical 12 domains — order matches the displayed grid.
// Every CRM must provide a blurb for each name in this order.
export const domainNames = [
  'Governance & Release Management',
  'Data Model & Schema Hygiene',
  'Automation Debt',
  'Security & Sharing',
  'Data Quality',
  'User Adoption & Experience',
  'License Utilization & Cost',
  'Integration Architecture',
  'Reporting & Analytics',
  'Technical Debt & Code Quality',
  'AI & Agentic Readiness',
  'Backup, DR & Compliance',
] as const;

const salesforce: HealthCheckCrmContent = {
  crmId: 'salesforce',
  execSummary: {
    grade: 'C+',
    narrative:
      'Strong adoption; automation debt and security posture create execution risk. Top 5 fixes unlock meaningful value at manageable cost.',
    counts: { high: 14, med: 27, low: 41 },
  },
  rubricNote:
    '1–5 CMMI-style maturity per domain; red / yellow / green severity per finding. Methodology and evidence attached to every rating.',
  dimensionBars: [
    { label: 'Governance', current: 2, target: 4, tone: 'red' },
    { label: 'Data model', current: 3, target: 4, tone: 'yellow' },
    { label: 'Automation', current: 2, target: 4, tone: 'red' },
    { label: 'Security', current: 3, target: 5, tone: 'yellow' },
    { label: 'Data quality', current: 2, target: 4, tone: 'red' },
    { label: 'Adoption', current: 4, target: 4, tone: 'green' },
  ],
  risks: [
    { id: 'A-01', title: 'Process Builder + Flow both modify Opportunity.Stage', category: 'Automation', severity: 'red' },
    { id: 'S-03', title: '17 users hold Modify All Data', category: 'Security', severity: 'red' },
    { id: 'I-02', title: '7 point-to-point integrations with hardcoded credentials', category: 'Integration', severity: 'yellow' },
    { id: 'D-05', title: '23% of Accounts have null Industry', category: 'Data quality', severity: 'yellow' },
  ],
  horizons: {
    now: [
      { title: 'Resolve Opportunity.Stage recursion', detail: 'Consolidate PB + Flow into one record-triggered Flow with named order.', effort: 'M' },
      { title: 'Revoke Modify All Data grants', detail: '17 users → permission set groups; Shield audit + review cadence.', effort: 'S' },
    ],
    next: [
      { title: 'Workflow Rule migration', detail: '37 rules retired before Salesforce sunset; regression test coverage added.', effort: 'L' },
      { title: 'Integration modernization', detail: 'Named Credentials, retry + DLQ; Foundry as the orchestration layer.', effort: 'L' },
    ],
    later: [
      { title: 'Agentforce readiness', detail: 'Field descriptions, prompt governance, action metadata.', effort: 'L' },
      { title: 'CRM Analytics consolidation', detail: 'Report folder cleanup; single definition for revenue.', effort: 'M' },
    ],
  },
  roadmap: [
    { name: 'Automation consolidation', tone: 'crimson', spans: [0, 55] },
    { name: 'Security remediation', tone: 'navy', spans: [5, 35] },
    { name: 'Data quality program', tone: 'amber', spans: [20, 80] },
    { name: 'Integration modernization', tone: 'green', spans: [40, 100] },
  ],
  roi: [
    { label: 'Reclaim 23 unused Sales Cloud licenses', current: '$45K/yr lost', invest: '$0', value: '$45K/yr' },
    { label: 'Eliminate admin firefighting (8 hrs/wk)', current: '$62K/yr lost', invest: '$18K', value: '$62K/yr' },
    { label: 'Recover 12% Lead duplicate rate', current: '$180K pipeline leak', invest: '$24K', value: '$180K/yr' },
  ],
  engagementNote:
    'Most Salesforce health checks convert into a Fix-It Sprint (90 days, fixed fee) or a Managed Services retainer. Rebuild programs only for multi-cloud orgs.',
  domainBlurbs: [
    { name: 'Governance & Release Management', blurb: 'Change boards, release cadence, sandbox strategy, CI/CD (Copado / Gearset), source control presence.' },
    { name: 'Data Model & Schema Hygiene', blurb: 'Custom object sprawl, field population, picklist hygiene, standard-vs-custom misuse.' },
    { name: 'Automation Debt', blurb: 'Workflow Rules, Process Builder, Flow, and Apex Triggers mapped to execution order with collision detection.' },
    { name: 'Security & Sharing', blurb: 'Profiles vs Permission Set Groups, Modify All Data grants, sharing rule depth, guest user exposure.' },
    { name: 'Data Quality', blurb: 'Matching + Duplicate Rules, field completeness, Lead-to-Account match rate, staleness by object.' },
    { name: 'User Adoption & Experience', blurb: 'Login history, EventLogFile analysis, Lightning coverage, clicks-to-save on core records.' },
    { name: 'License Utilization & Cost', blurb: 'Assigned-vs-active Sales / Service / Platform seats, feature license waste, API + storage burn.' },
    { name: 'Integration Architecture', blurb: 'Named Credentials coverage, middleware vs point-to-point, Platform Events, CDC, retry + DLQ.' },
    { name: 'Reporting & Analytics', blurb: 'Folder sprawl, unused dashboards, conflicting revenue definitions, CRM Analytics adoption.' },
    { name: 'Technical Debt & Code Quality', blurb: 'Apex API version, test coverage by class, SOQL-in-loops, hardcoded IDs, bulk patterns.' },
    { name: 'AI & Agentic Readiness', blurb: 'Field descriptions, Data Cloud readiness, prompt + action metadata, Agentforce guardrails.' },
    { name: 'Backup, DR & Compliance', blurb: 'OwnBackup / Gearset backup scope, RTO / RPO, audit trail retention, Shield coverage.' },
  ],
  proofFinding: {
    id: 'A-01',
    severity: 'red',
    title: 'Process Builder and Flow both modify Opportunity.Stage',
    evidence:
      'Recursion observed in 3 debug logs in the last 30 days. Affects ~180 records/month. Silent downstream: Einstein Forecast values drift, handoff notifications double-fire.',
    blocks: [
      {
        kind: 'diagram',
        rows: [
          { from: 'User · edit Opp', via: 'PB "Opportunity_Stage_Update"', to: 'Stage = Negotiation', tone: 'red' },
          { from: 'Stage change', via: 'Flow "Opp_Stage_Notifier"', to: 'Stage = Proposal', tone: 'red' },
          { from: 'Stage change', via: 'Apex Trigger', to: 'Stage = Negotiation', tone: 'yellow' },
        ],
      },
      {
        kind: 'code',
        language: 'SOQL',
        lines: [
          'SELECT Id, StageName, LastModifiedBy.Name, LastModifiedDate',
          'FROM Opportunity',
          "WHERE LastModifiedDate = LAST_N_DAYS:30",
          'AND Id IN (SELECT EntityId FROM OpportunityFieldHistory',
          "  WHERE Field = 'StageName' GROUP BY EntityId HAVING COUNT(Id) > 3)",
        ],
      },
    ],
    recommendation:
      'Consolidate to a single record-triggered Flow with explicit execution order. Archive the Process Builder. Add fault path. Regression test all downstream notifications and Einstein Forecast categories.',
  },
};

const hubspot: HealthCheckCrmContent = {
  crmId: 'hubspot',
  execSummary: {
    grade: 'B−',
    narrative:
      'Marketing adoption is strong; RevOps maturity, lifecycle model, and integration governance are under-built. Most value is recoverable without migration.',
    counts: { high: 9, med: 22, low: 34 },
  },
  rubricNote:
    'Same 1–5 maturity model. HubSpot-specific inputs: Workflows inventory, Lists and Lifecycle stages, association labels, custom objects.',
  dimensionBars: [
    { label: 'Governance', current: 2, target: 4, tone: 'red' },
    { label: 'Data model', current: 3, target: 4, tone: 'yellow' },
    { label: 'Workflows', current: 2, target: 4, tone: 'red' },
    { label: 'Security', current: 4, target: 4, tone: 'green' },
    { label: 'Data quality', current: 3, target: 4, tone: 'yellow' },
    { label: 'Adoption', current: 4, target: 4, tone: 'green' },
  ],
  risks: [
    { id: 'A-01', title: 'Two workflows on Deal Stage create enrollment loops', category: 'Workflows', severity: 'red' },
    { id: 'L-02', title: 'Lifecycle Stage set from 4 different places', category: 'Data model', severity: 'red' },
    { id: 'I-01', title: 'Salesforce sync has unresolved conflict rules', category: 'Integration', severity: 'yellow' },
    { id: 'D-03', title: '18% of Contacts missing Company association', category: 'Data quality', severity: 'yellow' },
  ],
  horizons: {
    now: [
      { title: 'Break the Deal Stage loop', detail: 'One owner for Stage; re-enrollment off; enrollment triggers audited.', effort: 'M' },
      { title: 'Own Lifecycle Stage in one place', detail: 'Remove competing workflows; document the source of truth.', effort: 'S' },
    ],
    next: [
      { title: 'Salesforce sync cleanup', detail: 'Conflict rules, selective sync, association labels mapped cleanly.', effort: 'M' },
      { title: 'List to CRM Portal migration', detail: 'Active Lists → segmentation primitives; kill orphan lists.', effort: 'L' },
    ],
    later: [
      { title: 'Breeze AI readiness', detail: 'Property descriptions, custom object context, prompt governance.', effort: 'M' },
      { title: 'Revenue attribution model', detail: 'One definition of pipeline, one reporting source.', effort: 'M' },
    ],
  },
  roadmap: [
    { name: 'Workflow consolidation', tone: 'crimson', spans: [0, 45] },
    { name: 'Lifecycle + data model', tone: 'navy', spans: [10, 60] },
    { name: 'Integration hardening', tone: 'amber', spans: [30, 80] },
    { name: 'AI + reporting', tone: 'green', spans: [50, 100] },
  ],
  roi: [
    { label: 'Eliminate duplicate Marketing Contacts', current: '$38K/yr overage', invest: '$0', value: '$38K/yr' },
    { label: 'Recover Lifecycle attribution', current: '$140K pipeline unattributed', invest: '$18K', value: '$140K/yr' },
    { label: 'Cut workflow firefighting', current: '6 hrs/wk RevOps', invest: '$12K', value: '$45K/yr' },
  ],
  engagementNote:
    'Most HubSpot health checks convert into a Fix-It Sprint or a Managed Services retainer. Migration to Salesforce is recommended only when the business case is clear.',
  domainBlurbs: [
    { name: 'Governance & Release Management', blurb: 'Portal ownership, sandbox usage, change management, staging discipline for workflows.' },
    { name: 'Data Model & Schema Hygiene', blurb: 'Object, property, and association sprawl; Lifecycle Stage ownership; custom object fit.' },
    { name: 'Automation Debt', blurb: 'Workflows, sequences, bots, and custom-coded actions mapped to trigger paths with collision detection.' },
    { name: 'Security & Sharing', blurb: 'Roles, teams, partitioning, SSO, API key hygiene, app authentication scopes.' },
    { name: 'Data Quality', blurb: 'Duplicate rules, property completeness, Company association rate, staleness by object.' },
    { name: 'User Adoption & Experience', blurb: 'Login history, feature usage, layout efficiency, mobile adoption, CMS + CRM overlap.' },
    { name: 'License Utilization & Cost', blurb: 'Paid seat utilization, Marketing Contacts overage, Sales Hub feature waste, API call burn.' },
    { name: 'Integration Architecture', blurb: 'Salesforce sync, iPaaS, native apps, webhook reliability, private app scope hygiene.' },
    { name: 'Reporting & Analytics', blurb: 'Dashboard sprawl, conflicting revenue definitions, attribution model integrity.' },
    { name: 'Technical Debt & Code Quality', blurb: 'Custom-coded actions, serverless functions, Operations Hub scripts, error handling.' },
    { name: 'AI & Agentic Readiness', blurb: 'Property descriptions, Breeze readiness, prompt + action guardrails.' },
    { name: 'Backup, DR & Compliance', blurb: 'Backup tool coverage, retention, GDPR readiness, audit log retention.' },
  ],
  proofFinding: {
    id: 'A-01',
    severity: 'red',
    title: 'Two workflows on Deal Stage create enrollment loops',
    evidence:
      'Workflow "Deal_Stage_Advance" and workflow "Deal_Routing" both set Deal Stage on update. Re-enrollment is on for both. Observed 41 deals cycling stages in the last 14 days.',
    blocks: [
      {
        kind: 'diagram',
        rows: [
          { from: 'Deal update', via: 'Workflow "Deal_Stage_Advance"', to: 'Stage = Contract Sent', tone: 'red' },
          { from: 'Stage change', via: 'Workflow "Deal_Routing"', to: 'Stage = Presentation', tone: 'red' },
          { from: 'Stage change', via: 'Sequence enrollment', to: 'Outreach fires twice', tone: 'yellow' },
        ],
      },
      {
        kind: 'code',
        language: 'HubSpot filter',
        lines: [
          'Object: Deals',
          'Filter: "HubSpot score" not empty',
          'AND "Deal stage" updated in last 14 days',
          'AND "Number of times in stage" > 2',
          'Output: 41 deals cycling',
        ],
      },
    ],
    recommendation:
      'Name one workflow as Stage owner; turn re-enrollment off for the others; move advance logic into a single automation with explicit branches. Audit downstream sequence enrollments.',
  },
};

const dynamics: HealthCheckCrmContent = {
  crmId: 'dynamics',
  execSummary: {
    grade: 'C',
    narrative:
      'Power Platform footprint is deep; business unit model is over-indexed and security roles are overly permissive. Automation split across Power Automate and JavaScript adds risk.',
    counts: { high: 11, med: 24, low: 38 },
  },
  rubricNote:
    '1–5 maturity per domain. Dynamics inputs: Power Platform CoE Kit, solution layering, security role audit, plugin + Power Automate inventory.',
  dimensionBars: [
    { label: 'Governance', current: 2, target: 4, tone: 'red' },
    { label: 'Data model', current: 3, target: 4, tone: 'yellow' },
    { label: 'Automation', current: 2, target: 4, tone: 'red' },
    { label: 'Security', current: 2, target: 5, tone: 'red' },
    { label: 'Data quality', current: 3, target: 4, tone: 'yellow' },
    { label: 'Adoption', current: 3, target: 4, tone: 'yellow' },
  ],
  risks: [
    { id: 'A-01', title: 'Two Power Automate flows trigger on Opportunity update', category: 'Automation', severity: 'red' },
    { id: 'S-02', title: 'System Customizer role assigned to 12 users', category: 'Security', severity: 'red' },
    { id: 'G-03', title: '47 unmanaged customizations outside solutions', category: 'Governance', severity: 'yellow' },
    { id: 'I-02', title: 'Dual-write table conflicts to F&O', category: 'Integration', severity: 'yellow' },
  ],
  horizons: {
    now: [
      { title: 'Consolidate competing Power Automate flows', detail: 'One flow, explicit run order, Dataverse trigger filters; log all exceptions.', effort: 'M' },
      { title: 'Revoke System Customizer', detail: '12 users → scoped security roles; CoE Kit alerting enabled.', effort: 'S' },
    ],
    next: [
      { title: 'Solution layering cleanup', detail: 'Unmanaged customizations moved to managed solutions with ALM pipeline.', effort: 'L' },
      { title: 'Dual-write hardening', detail: 'Conflict handlers, DLQ, retry; reconciliation dashboard.', effort: 'L' },
    ],
    later: [
      { title: 'Copilot for Dynamics readiness', detail: 'Column descriptions, prompt governance, connector + action review.', effort: 'L' },
      { title: 'Reporting consolidation', detail: 'Power BI semantic model; one revenue definition.', effort: 'M' },
    ],
  },
  roadmap: [
    { name: 'Automation consolidation', tone: 'crimson', spans: [0, 50] },
    { name: 'Security remediation', tone: 'navy', spans: [0, 30] },
    { name: 'ALM + solution layering', tone: 'amber', spans: [25, 80] },
    { name: 'Integration + reporting', tone: 'green', spans: [45, 100] },
  ],
  roi: [
    { label: 'Reclaim unused Dynamics Sales seats', current: '$58K/yr lost', invest: '$0', value: '$58K/yr' },
    { label: 'Stop dual-write silent failures', current: '$120K reconciliations', invest: '$24K', value: '$120K/yr' },
    { label: 'Cut automation firefighting', current: '10 hrs/wk admin', invest: '$18K', value: '$72K/yr' },
  ],
  engagementNote:
    'Most Dynamics health checks convert into a Fix-It Sprint. Migration to Salesforce is recommended only when ERP tie-in and licensing pressure favor it.',
  domainBlurbs: [
    { name: 'Governance & Release Management', blurb: 'Solution strategy, ALM pipeline, CoE Kit adoption, environment layering.' },
    { name: 'Data Model & Schema Hygiene', blurb: 'Table + column sprawl, option set hygiene, business unit design, relationship depth.' },
    { name: 'Automation Debt', blurb: 'Power Automate flows, classic workflows, plugins, JavaScript web resources mapped to trigger paths.' },
    { name: 'Security & Sharing', blurb: 'Business units, security roles, team ownership, column-level security, connector DLP.' },
    { name: 'Data Quality', blurb: 'Duplicate detection, completeness, Account-Contact hierarchy integrity, staleness.' },
    { name: 'User Adoption & Experience', blurb: 'UCI usage, app module fit, form efficiency, mobile adoption, Outlook integration.' },
    { name: 'License Utilization & Cost', blurb: 'Sales / Customer Service / Team Member seat fit, Power Platform capacity.' },
    { name: 'Integration Architecture', blurb: 'Dual-write, virtual tables, Azure Service Bus, connector hygiene, private endpoint posture.' },
    { name: 'Reporting & Analytics', blurb: 'Power BI semantic model, unused dashboards, conflicting revenue definitions.' },
    { name: 'Technical Debt & Code Quality', blurb: 'Plugin registration hygiene, JS web resource sprawl, TypeScript + testing coverage.' },
    { name: 'AI & Agentic Readiness', blurb: 'Column descriptions, Copilot readiness, prompt + connector governance.' },
    { name: 'Backup, DR & Compliance', blurb: 'Dataverse backup + restore, retention, purview coverage, audit log depth.' },
  ],
  proofFinding: {
    id: 'A-01',
    severity: 'red',
    title: 'Two Power Automate flows compete on Opportunity update',
    evidence:
      'Flow "Opportunity_Stage_Update" and flow "Opp_Routing" both fire on Dataverse update. Dataverse trigger filters overlap. Observed 62 opportunities re-looping in 30 days.',
    blocks: [
      {
        kind: 'diagram',
        rows: [
          { from: 'Dataverse update', via: 'Flow "Opportunity_Stage_Update"', to: 'Stage = Propose', tone: 'red' },
          { from: 'Stage change', via: 'Flow "Opp_Routing"', to: 'Owner reassign', tone: 'red' },
          { from: 'Owner change', via: 'Plugin (sync)', to: 'Stage = Qualify', tone: 'yellow' },
        ],
      },
      {
        kind: 'code',
        language: 'FetchXML',
        lines: [
          '<fetch>',
          '  <entity name="opportunity">',
          '    <attribute name="name" />',
          '    <attribute name="statecode" />',
          '    <attribute name="modifiedon" />',
          '    <filter>',
          "      <condition attribute='modifiedon' operator='last-x-days' value='30' />",
          '    </filter>',
          '  </entity>',
          '</fetch>',
        ],
      },
    ],
    recommendation:
      'Merge both flows into one with branching logic and explicit trigger filters. Move routing into a named sub-flow with a DLQ. Log exceptions to Application Insights. Regression test the plugin path.',
  },
};

const custom: HealthCheckCrmContent = {
  crmId: 'custom',
  execSummary: {
    grade: 'D+',
    narrative:
      'Custom / legacy CRMs concentrate risk: un-owned automations, no test coverage, silent integration drops. Rebuild or migration is usually the right answer — and we can tell you which.',
    counts: { high: 18, med: 29, low: 34 },
  },
  rubricNote:
    'Same maturity model, adapted inputs: source code review, database schema audit, cron + trigger inventory, interview-heavy governance assessment.',
  dimensionBars: [
    { label: 'Governance', current: 1, target: 4, tone: 'red' },
    { label: 'Data model', current: 2, target: 4, tone: 'red' },
    { label: 'Automation', current: 2, target: 4, tone: 'red' },
    { label: 'Security', current: 2, target: 5, tone: 'red' },
    { label: 'Data quality', current: 2, target: 4, tone: 'red' },
    { label: 'Adoption', current: 3, target: 4, tone: 'yellow' },
  ],
  risks: [
    { id: 'A-01', title: 'Competing triggers on sales_order update', category: 'Automation', severity: 'red' },
    { id: 'S-01', title: 'Shared DB user with admin role used by 3 apps', category: 'Security', severity: 'red' },
    { id: 'G-01', title: 'Last engineer who knew the billing trigger left in 2022', category: 'Governance', severity: 'red' },
    { id: 'I-03', title: 'Nightly ETL silently drops 2% of orders', category: 'Integration', severity: 'yellow' },
  ],
  horizons: {
    now: [
      { title: 'Triage the billing trigger', detail: 'Document, isolate, add a smoke test; stop the silent failures before rebuild.', effort: 'M' },
      { title: 'Rotate the shared DB user', detail: 'Per-app service accounts; scoped permissions; audit + logging.', effort: 'S' },
    ],
    next: [
      { title: 'Migration decision', detail: 'Rebuild on Salesforce (recommended) vs harden in place; business case attached.', effort: 'L' },
      { title: 'Replace the nightly ETL', detail: 'Managed integration with retries + DLQ, or Foundry orchestration.', effort: 'L' },
    ],
    later: [
      { title: 'Salesforce migration Phase 1', detail: 'Data model + pilot function; stop writing to the legacy for that scope.', effort: 'XL' },
      { title: 'Sunset plan', detail: 'Six-quarter read-only decommission plan.', effort: 'L' },
    ],
  },
  roadmap: [
    { name: 'Stabilize the legacy', tone: 'crimson', spans: [0, 40] },
    { name: 'Migration discovery', tone: 'navy', spans: [15, 45] },
    { name: 'Salesforce build', tone: 'amber', spans: [35, 90] },
    { name: 'Sunset + DR', tone: 'green', spans: [60, 100] },
  ],
  roi: [
    { label: 'Stop nightly ETL order drops', current: '$240K/yr revenue leak', invest: '$36K', value: '$240K/yr' },
    { label: 'Replace shared DB user', current: 'Audit + breach risk', invest: '$8K', value: 'Risk retired' },
    { label: 'Migration business case', current: '$0 realized', invest: 'Scoped at fee', value: 'Multi-year' },
  ],
  engagementNote:
    'Custom / legacy CRMs almost always convert into either a Fix-It Sprint (if the business case for migration is not yet clear) or a Salesforce migration program scoped from the report.',
  domainBlurbs: [
    { name: 'Governance & Release Management', blurb: 'Source control, release process, knowledge holders, bus-factor audit.' },
    { name: 'Data Model & Schema Hygiene', blurb: 'Table sprawl, referential integrity, normalization, lookup consistency.' },
    { name: 'Automation Debt', blurb: 'Triggers, cron jobs, service-layer code, queues mapped to event paths.' },
    { name: 'Security & Sharing', blurb: 'Auth model, role scope, DB user hygiene, PII exposure, log access.' },
    { name: 'Data Quality', blurb: 'Duplicates, null rates, referential breakage, staleness, canonical entity merging.' },
    { name: 'User Adoption & Experience', blurb: 'Login patterns, feature usage, clicks-to-save, UI coverage, support tickets.' },
    { name: 'License Utilization & Cost', blurb: 'Hosting, DB, third-party service costs; infrastructure right-sizing.' },
    { name: 'Integration Architecture', blurb: 'Point-to-point integrations, ETL reliability, idempotency, retry + DLQ coverage.' },
    { name: 'Reporting & Analytics', blurb: 'SQL sprawl, conflicting revenue definitions, BI tool coverage, report latency.' },
    { name: 'Technical Debt & Code Quality', blurb: 'Test coverage, dependency versions, cyclomatic complexity hotspots, dead code.' },
    { name: 'AI & Agentic Readiness', blurb: 'Data accessibility, schema documentation, feasible feeds for model context.' },
    { name: 'Backup, DR & Compliance', blurb: 'Backup frequency, restore tested, retention, regulatory scope.' },
  ],
  proofFinding: {
    id: 'A-01',
    severity: 'red',
    title: 'Competing triggers on sales_order update',
    evidence:
      'Two DB triggers on sales_order write to the same row in the same transaction. In production we observed 3.1% of orders with mismatched state vs billing_status. One of the triggers has no owner.',
    blocks: [
      {
        kind: 'diagram',
        rows: [
          { from: 'sales_order update', via: 'trg_order_route', to: 'status = picking', tone: 'red' },
          { from: 'sales_order update', via: 'trg_billing_sync', to: 'billing_status = invoiced', tone: 'red' },
          { from: 'billing_status change', via: 'cron sync_to_erp', to: 'ERP posts invoice', tone: 'yellow' },
        ],
      },
      {
        kind: 'code',
        language: 'SQL',
        lines: [
          'SELECT id, status, billing_status, updated_at',
          'FROM sales_order',
          "WHERE updated_at > now() - interval '30 days'",
          '  AND (',
          "    (status = 'cancelled' AND billing_status = 'invoiced')",
          "    OR (status = 'shipped' AND billing_status IS NULL)",
          '  );',
          '-- 3.1% of orders return a row',
        ],
      },
    ],
    recommendation:
      'Consolidate trigger logic behind a named application service; introduce idempotency keys; log every state transition to an append-only table. If the decision is to migrate, lock this logic first so the migration has a defensible source of truth.',
  },
};

export const healthCheckContent: Record<CrmId, HealthCheckCrmContent> = {
  salesforce,
  hubspot,
  dynamics,
  custom,
};
