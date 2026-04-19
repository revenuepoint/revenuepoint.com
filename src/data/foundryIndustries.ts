import type { IndustryId } from '@/context/IndustryContext';

export type RoiStat = { value: string; label: string };

export type Industry = {
  id: IndustryId;
  name: string;
  shortName: string; // for compact sticky tabs
  lead: string;
  personas: string[];
  systems: string[];
  outcomes: string[];
  roi: RoiStat[];
  caseStory: string;
};

export const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    shortName: 'Manufacturing',
    lead: 'Foundry turns OEE, scrap, and downtime signals into automated work.',
    personas: ['COO', 'VP Operations', 'Plant Manager', 'Supply Chain Director'],
    systems: ['SAP', 'SAP Business One', 'QuickBooks', 'Salesforce', 'MES'],
    outcomes: [
      'OEE dashboards by line and shift, updated continuously',
      'Inventory shortage watchers with automatic procurement alerts',
      'Inbound PO → ERP sales order automation, no manual re-keying',
      'Scrap rate anomaly detection correlated to operator shifts',
      'On-time delivery + supplier performance scorecards',
    ],
    roi: [
      { value: '$847K', label: 'recovered margin, annualized' },
      { value: '42h', label: 'saved on weekly reporting' },
      { value: '94%', label: 'action auto-approval rate' },
    ],
    caseStory:
      'A mid-market fasteners manufacturer (2 plants, $48M revenue) recovered $214K in Q1 alone from OEE-driven line changeovers surfaced by Foundry agents.',
  },
  {
    id: 'pharmacy',
    name: 'Specialty Pharmacy & Compounding',
    shortName: 'Pharmacy',
    lead: 'Foundry watches every script, batch, and controlled substance — so your pharmacists can focus on patients.',
    personas: ['Pharmacist-in-Charge', 'Compliance Officer', 'Regional Director', 'CFO'],
    systems: ['PioneerRx', 'SendGrid', 'QuickBooks', 'Salesforce', 'DEA CSOS'],
    outcomes: [
      'Daily location summaries with role-tailored views (PIC, director, leadership)',
      'Controlled substance variance detection against the DEA 24h window',
      'Prescription intake validation + drug-interaction flagging',
      'Ingredient expiry + batch QC failure alerts',
      'Prescriber relationship tracking and outreach triggers',
    ],
    roi: [
      { value: '12h', label: 'saved per location, per week' },
      { value: '100%', label: 'DEA 24h window coverage' },
      { value: '3.8 days', label: 'earlier on replacement POs for expiring ingredients' },
    ],
    caseStory:
      "Harborline Pharmacy (5 locations) consolidated 11 legacy reports into one Prism daily briefing and eliminated 60+ manual hours/week across their compounding operations.",
  },
  {
    id: 'distribution',
    name: 'Distribution & 3PL',
    shortName: 'Distribution',
    lead: 'Foundry turns orders, inventory, and AR signals into sales moves — before your reps need to ask.',
    personas: ['VP Sales', 'Operations Director', 'AR Lead', 'Warehouse Manager'],
    systems: ['SAP Business One', 'NetSuite', 'Shopify', 'Salesforce', 'EDI'],
    outcomes: [
      'At-risk account watchers with drop-off pattern detection',
      'Backorder + reorder-point automation with vendor POs',
      'Inbound EDI PO processing and exception handling',
      'Customer credit hold agent with accounting system cross-check',
      'Sales territory maps with 3D customer location view',
    ],
    roi: [
      { value: '$1.2M', label: 'recovered AR, annualized' },
      { value: '3×', label: 'faster PO processing' },
      { value: '22%', label: 'reduction in stock-outs' },
    ],
    caseStory:
      'A Pacific-Northwest industrial distributor (47 reps, $120M revenue) recovered $380K of AR in 90 days by cross-referencing CRM activity with accounting aging.',
  },
  {
    id: 'nonprofit',
    name: 'Nonprofit & Social Services',
    shortName: 'Nonprofit',
    lead: 'Foundry turns donor history, campaign momentum, and board reporting into a one-click morning briefing.',
    personas: ['Executive Director', 'Development Director', 'CFO', 'Board Chair'],
    systems: ["Raiser's Edge", 'Salesforce NPSP', 'QuickBooks', 'Mailchimp'],
    outcomes: [
      'Donor retention + lapsed-donor AI analysis',
      'Campaign pace-to-goal tracking with hourly updates during giving events',
      'Grant deadline watchers (60/30/7-day alert sequences)',
      'Major gifts pipeline with stalled-deal detection',
      'Board-ready annual report generation',
    ],
    roi: [
      { value: '$340K', label: 'recovered gifts, annualized' },
      { value: '96%', label: 'grant-deadline hit rate' },
      { value: '3 days', label: 'saved on quarterly board packets' },
    ],
    caseStory:
      "A $12M regional nonprofit reduced quarterly board-packet prep from 3 days to 4 hours using Prism-generated narratives sourced from Raiser's Edge and QuickBooks.",
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Ambulatory Care',
    shortName: 'Healthcare',
    lead: 'Foundry connects clinical, billing, and operational data — so care leaders can act on what\'s happening across every location.',
    personas: ['Chief Operations Officer', 'Revenue Cycle Director', 'Practice Administrator', 'CFO'],
    systems: ['Epic', 'Athenahealth', 'Kareo', 'QuickBooks', 'Salesforce'],
    outcomes: [
      'Revenue cycle dashboards: charges, collections, and AR aging by location',
      'Denial rate monitoring with payer-level trend analysis',
      'Patient volume forecasting against staffing capacity',
      'No-show and cancellation pattern alerts by provider',
      'Operational cost-per-visit tracking across facilities',
    ],
    roi: [
      { value: '18%', label: 'reduction in claim denial rate' },
      { value: '$210K', label: 'additional annual collections identified' },
      { value: '11h', label: 'saved on weekly revenue cycle reporting' },
    ],
    caseStory:
      'A multi-site ambulatory care group (8 locations) reduced billing denial rates by 18% in the first quarter after Foundry surfaced payer-specific denial patterns that had been invisible across fragmented billing systems.',
  },
  {
    id: 'propertyManagement',
    name: 'Property Management & Real Estate',
    shortName: 'Property Mgmt',
    lead: 'Foundry turns lease data, maintenance signals, and rent roll trends into action — before vacancies compound.',
    personas: ['Asset Manager', 'VP of Operations', 'Property Controller', 'CFO'],
    systems: ['Yardi', 'AppFolio', 'RealPage', 'QuickBooks', 'Salesforce'],
    outcomes: [
      'Portfolio occupancy and rent roll dashboards by property and region',
      'Lease expiration watchers with renewal-outreach triggers',
      'Maintenance cost anomaly detection by unit and property',
      'Delinquency aging with automated resident communication workflows',
      'NOI performance tracking against underwriting assumptions',
    ],
    roi: [
      { value: '34%', label: 'reduction in lease renewal lapse rate' },
      { value: '$180K', label: 'delinquency recovered, annualized' },
      { value: '2 days', label: 'saved on monthly ownership reporting' },
    ],
    caseStory:
      'A regional property management firm (1,200 units, 14 properties) reduced lease renewal lapse rate by 34% after Foundry agents began surfacing expiration alerts 90, 60, and 30 days out with automated outreach triggers.',
  },
  {
    id: 'professionalServices',
    name: 'Professional Services',
    shortName: 'Pro Services',
    lead: 'Foundry connects project, billing, and utilization data — so firm leaders see profitability clearly and act before margin erodes.',
    personas: ['Managing Partner', 'COO', 'Finance Director', 'Operations Manager'],
    systems: ['Salesforce', 'NetSuite', 'QuickBooks', 'Mavenlink', 'Harvest'],
    outcomes: [
      'Project profitability dashboards with margin by client and engagement',
      'Utilization rate tracking by team, practice, and region',
      'At-risk project detection with budget-burn anomaly alerts',
      'Accounts receivable aging with overdue invoice follow-up automation',
      'Pipeline-to-capacity forecasting for resource planning',
    ],
    roi: [
      { value: '22%', label: 'improvement in billable utilization' },
      { value: '$290K', label: 'write-off reduction, annualized' },
      { value: '4h', label: 'saved on weekly partner reporting' },
    ],
    caseStory:
      "A 120-person management consulting firm reduced project write-offs by $290K annually after Foundry's at-risk detection flagged budget overruns an average of 3 weeks earlier than manual review.",
  },
  {
    id: 'financialServices',
    name: 'Financial Services',
    shortName: 'Financial Svcs',
    lead: 'Foundry connects client, portfolio, and operational data — so advisors spend time with clients, not building reports.',
    personas: ['Managing Director', 'Chief Compliance Officer', 'Operations Director', 'CFO'],
    systems: ['Salesforce', 'Redtail', 'Orion', 'QuickBooks', 'Custodian Feeds'],
    outcomes: [
      'AUM and revenue dashboards by advisor, team, and office',
      'Client review trigger agents (anniversary dates, portfolio thresholds, life events)',
      'Fee reconciliation automation with custodian data cross-check',
      'Compliance audit trail for client communication and suitability reviews',
      'At-risk client detection based on engagement and portfolio signals',
    ],
    roi: [
      { value: '31%', label: 'more client review meetings completed on time' },
      { value: '14h', label: 'saved per advisor per month on reporting' },
      { value: '100%', label: 'compliance documentation audit coverage' },
    ],
    caseStory:
      'A 45-advisor RIA ($2.1B AUM) increased on-time annual review completion by 31% after Foundry agents began surfacing client review triggers 45 days in advance with pre-populated context for each meeting.',
  },
  {
    id: 'foodBeverage',
    name: 'Food & Beverage',
    shortName: 'Food & Bev',
    lead: 'Foundry connects production, inventory, and sales data — so operators catch spoilage, stockouts, and margin erosion before they hit the P&L.',
    personas: ['VP Operations', 'Production Manager', 'COO', 'Controller'],
    systems: ['SAP Business One', 'NetSuite', 'QuickBooks', 'Shopify', 'Salesforce'],
    outcomes: [
      'Batch yield and waste tracking by production line and SKU',
      'Expiry and shelf-life watchers with automated disposal and reorder triggers',
      'Distributor sales velocity dashboards with out-of-stock alerts',
      'Ingredient cost variance analysis against recipe standards',
      'Gross margin by product line with promotional performance tracking',
    ],
    roi: [
      { value: '19%', label: 'reduction in spoilage write-offs' },
      { value: '$160K', label: 'ingredient cost savings identified, annualized' },
      { value: '2.5 days', label: 'earlier on low-stock reorder signals' },
    ],
    caseStory:
      "A specialty food manufacturer (3 facilities, $35M revenue) reduced spoilage write-offs by 19% after Foundry's shelf-life agents began triggering disposal and redistribution actions 72 hours earlier than manual review.",
  },
  {
    id: 'construction',
    name: 'Construction & Contracting',
    shortName: 'Construction',
    lead: 'Foundry connects job cost, scheduling, and subcontractor data — so project leaders see margin risk early and act before the job goes over.',
    personas: ['CFO', 'VP of Operations', 'Project Controller', 'Estimating Director'],
    systems: ['Procore', 'Sage 300', 'QuickBooks', 'Salesforce', 'Autodesk Construction Cloud'],
    outcomes: [
      'Job cost dashboards with earned-value and budget-to-complete by project',
      'Change order backlog tracking with approval status and revenue impact',
      'Subcontractor performance scorecards and lien waiver status monitoring',
      'Equipment utilization and idle-cost detection across the fleet',
      'Bid pipeline tracking with win-rate and margin trend analysis',
    ],
    roi: [
      { value: '23%', label: 'reduction in cost overrun frequency' },
      { value: '$340K', label: 'in recovered change order revenue, annualized' },
      { value: '6h', label: 'saved on weekly project cost reporting' },
    ],
    caseStory:
      'A regional general contractor ($80M revenue, 40 active projects) reduced cost overrun frequency by 23% after Foundry surfaced budget-burn anomalies an average of 11 days earlier than the previous monthly job cost review.',
  },
];

export function getIndustry(id: IndustryId): Industry {
  return industries.find((i) => i.id === id) ?? industries[0];
}
