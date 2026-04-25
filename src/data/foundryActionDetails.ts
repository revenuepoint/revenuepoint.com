import type { IndustryId } from '@/context/IndustryContext';
import type { RiskLevel, TargetSystem } from '@/data/foundryActions';

export type DetailStatus = 'pending' | 'running' | 'completed';
export type StepStatus = 'pending' | 'running' | 'completed';

export type ActionStep = {
  label: string;
  system?: TargetSystem;
  status: StepStatus;
  duration?: string;
};

export type ChangeVerb = 'create' | 'update' | 'send' | 'delete';

export type ActionChange = {
  verb: ChangeVerb;
  entity: string;
  system: TargetSystem;
  fields: { label: string; value: string }[];
};

export type ActionTimelineEntry = {
  label: string;
  value: string;
  kind: 'created' | 'approved' | 'started' | 'completed' | 'duration' | 'deadline';
};

export type ActionDetail = {
  id: string;
  name: string;
  agent: string;
  risk: RiskLevel;
  status: DetailStatus;
  systems: TargetSystem[];
  requestedAgo: string;
  summary: string;
  rationale: string;
  steps: ActionStep[];
  changes: ActionChange[];
  timeline: ActionTimelineEntry[];
  note?: string;
};

/* =========================================================================
 *  PER-INDUSTRY ACTION DETAILS
 * =========================================================================
 *  3 action details per industry × 10 industries = 30 total.
 *  Blend: 1 Frontline (pending, high-risk), 1 Back-office (completed/running),
 *  1 Mixed/auto-approved (completed, low/medium risk).
 */
export const foundryActionDetailsByIndustry: Record<IndustryId, ActionDetail[]> = {
  manufacturing: [
    {
      id: 'mfg-ad-1',
      name: 'Emergency Steel PO — Kraft Metals $47K',
      agent: 'Raw Material Shortage Watcher',
      risk: 'high',
      status: 'pending',
      systems: ['SAP Business One', 'SendGrid', 'Courier'],
      requestedAgo: '8m ago',
      summary:
        'Cold-rolled steel sheets at 36h runway against active production orders. Emergency PO to Kraft Metals for 12 sheets at $47K with expedited ship-date confirmation. Needs plant manager approval before release.',
      rationale:
        'Inventory sync at 05:42 showed 14 sheets on hand against 4 active production orders consuming 22 sheets over the next 72 hours. Kraft Metals has 98% OTIF over the past 12 months and can ship within 24 hours of PO. Alternate vendor (Global Metals) would take 72 hours and run 6% higher.',
      steps: [
        { label: 'Draft PO in SAP Business One', system: 'SAP Business One', status: 'pending' },
        { label: 'Send PO to Kraft Metals', system: 'SendGrid', status: 'pending' },
        { label: 'Notify plant manager + procurement', system: 'Courier', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Purchase Order · PO-9201',
          system: 'SAP Business One',
          fields: [
            { label: 'Vendor', value: 'Kraft Metals' },
            { label: 'Line item', value: '12× Cold-rolled steel sheet (SKU CR-4821)' },
            { label: 'Value', value: '$47,040 ($3,920/sheet)' },
            { label: 'Ship', value: '24h expedited' },
          ],
        },
        {
          verb: 'send',
          entity: 'Vendor order confirmation',
          system: 'SendGrid',
          fields: [
            { label: 'Recipient', value: 'orders@kraftmetals.com' },
            { label: 'Subject', value: 'PO-9201 · Expedited · ship today' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:42' },
        { kind: 'deadline', label: 'Action window', value: '12h to avoid line impact' },
      ],
      note: 'Awaiting plant manager sign-off. Second-choice vendor ready as fallback.',
    },
    {
      id: 'mfg-ad-2',
      name: 'SO-14821 Credit Release — Cascade Metals',
      agent: 'Credit Hold Responder',
      risk: 'medium',
      status: 'completed',
      systems: ['SAP Business One', 'QuickBooks', 'Salesforce'],
      requestedAgo: '32m ago',
      summary:
        'Cascade Metals $82K sales order released after AR clearance. Overnight $48K wire cleared; credit line headroom $138K. SAP B1 updated, Salesforce activity logged, Marcus (rep) notified.',
      rationale:
        'Cascade Metals $82K SO was held Friday pending AR. At 07:04 overnight Foundry detected the wire arrival and reconciled against QB aging — all accounts now current. Credit check ran clean against updated records; order released with ship-date 2026-04-29 (next Tacoma pick slot).',
      steps: [
        { label: 'Verify AR clearance in QuickBooks', system: 'QuickBooks', status: 'completed', duration: '0.4s' },
        { label: 'Release hold in SAP Business One', system: 'SAP Business One', status: 'completed', duration: '0.6s' },
        { label: 'Log to Salesforce activity', system: 'Salesforce', status: 'completed', duration: '0.3s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Sales Order · SO-14821',
          system: 'SAP Business One',
          fields: [
            { label: 'Status', value: 'Credit hold → Released' },
            { label: 'Ship date', value: '2026-04-29 · Tacoma DC' },
          ],
        },
        {
          verb: 'update',
          entity: 'Account · Cascade Metals',
          system: 'Salesforce',
          fields: [
            { label: 'Credit status', value: 'Under review → Active' },
            { label: 'Rep notified', value: 'Marcus Torres' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 07:04' },
        { kind: 'approved', label: 'Rule-based auto', value: '07:04' },
        { kind: 'started', label: 'Started', value: '07:04:01' },
        { kind: 'completed', label: 'Completed', value: '07:04:03' },
        { kind: 'duration', label: 'Duration', value: '2.1s' },
      ],
    },
    {
      id: 'mfg-ad-3',
      name: 'Line-2 MRO Work Order — Belt Replacement',
      agent: 'Line Down Responder',
      risk: 'high',
      status: 'completed',
      systems: ['SAP Business One', 'MES', 'Courier'],
      requestedAgo: '1h 14m ago',
      summary:
        'Line 2 halt at 14:45 — belt-tension fault on station 3A. Maintenance work order WO-4821 created in SAP B1, plant manager paged, shift-handoff briefing updated automatically.',
      rationale:
        'MES telemetry showed zero throughput on Line 2 beginning at 14:45 with fault code BT-03A (belt tension). Line Down Responder policy: any halt >5 minutes triggers auto-WO + plant manager page. Auto-approval applies because the WO is in the standard maintenance catalog and under the $5K threshold.',
      steps: [
        { label: 'Create MRO work order in SAP B1', system: 'SAP Business One', status: 'completed', duration: '0.7s' },
        { label: 'Update MES line status', system: 'MES', status: 'completed', duration: '0.3s' },
        { label: 'Page plant manager + handoff', system: 'Courier', status: 'completed', duration: '0.8s' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Work Order · WO-4821',
          system: 'SAP Business One',
          fields: [
            { label: 'Asset', value: 'Line 2 · Station 3A' },
            { label: 'Fault', value: 'BT-03A (belt tension)' },
            { label: 'Estimated cost', value: '$2,450 · catalog' },
          ],
        },
        {
          verb: 'send',
          entity: 'Plant manager page',
          system: 'Courier',
          fields: [
            { label: 'Recipient', value: 'plant-mgr@vantage.co' },
            { label: 'ETA', value: 'Maintenance arriving 15:10' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 14:45' },
        { kind: 'approved', label: 'Auto-approved', value: 'rule-based · 14:45' },
        { kind: 'started', label: 'Started', value: '14:45:01' },
        { kind: 'completed', label: 'Completed', value: '14:45:03' },
        { kind: 'duration', label: 'Duration', value: '1.8s' },
      ],
    },
  ],

  pharmacy: [
    {
      id: 'ph-ad-1',
      name: 'Void Damaged Ingredient Lot — LOT-A-2784',
      agent: 'Batch QC Watcher',
      risk: 'high',
      status: 'pending',
      systems: ['PioneerRx', 'QuickBooks', 'Courier'],
      requestedAgo: '14m ago',
      summary:
        'IV room reports 142 damaged compounded units from LOT-A-2784 following cooling-unit failure. Voiding in PioneerRx, write-off entry in QuickBooks, notification to compliance officer. Needs pharmacist-in-charge approval.',
      rationale:
        'Cooling-unit alarm at 04:12 paired with temperature excursion >8°C for 47 minutes. Compounded product from LOT-A-2784 is outside USP 797 stability window and cannot be dispensed. Material loss estimated at $4,820 — below the $5K auto-threshold but policy requires PIC sign-off on any compounded-product destruction event.',
      steps: [
        { label: 'Void lot in PioneerRx', system: 'PioneerRx', status: 'pending' },
        { label: 'Write-off entry in QuickBooks', system: 'QuickBooks', status: 'pending' },
        { label: 'Notify compliance officer', system: 'Courier', status: 'pending' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Compounding Lot · LOT-A-2784',
          system: 'PioneerRx',
          fields: [
            { label: 'Status', value: 'Active → Destroyed (USP 797)' },
            { label: 'Units voided', value: '142' },
            { label: 'Reason', value: 'Cooling-unit failure (47m >8°C)' },
          ],
        },
        {
          verb: 'create',
          entity: 'Write-off · $4,820',
          system: 'QuickBooks',
          fields: [
            { label: 'Account', value: 'Compounding losses' },
            { label: 'Memo', value: 'LOT-A-2784 destruction per USP 797' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 04:27' },
        { kind: 'deadline', label: 'USP 797 log', value: 'Must log within 24h' },
      ],
      note: 'Awaiting PIC approval for destruction event logging.',
    },
    {
      id: 'ph-ad-2',
      name: 'DEA Variance Amendment — Westside Ketamine',
      agent: 'Controlled Substance Variance Watcher',
      risk: 'high',
      status: 'completed',
      systems: ['PioneerRx', 'DEA CSOS', 'SendGrid'],
      requestedAgo: '5h ago',
      summary:
        '3-vial ketamine variance at Westside. DEA 222 amendment assembled, filed with DEA CSOS, compliance officer notified within 24-hour window.',
      rationale:
        'Nightly reconciliation (02:14) detected 3-vial variance between dispensing log (48) and inventory (45). DEA 222 rules require amendment within 24 hours. Variance root cause: manual shift-change recon missed, now automated. All supporting documentation captured from PioneerRx dispensing and intake events.',
      steps: [
        { label: 'Compile DEA 222 amendment packet', system: 'PioneerRx', status: 'completed', duration: '6s' },
        { label: 'File with DEA CSOS', system: 'DEA CSOS', status: 'completed', duration: '48s' },
        { label: 'Notify compliance officer', system: 'SendGrid', status: 'completed', duration: '0.5s' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'DEA 222 Amendment · AMD-0041',
          system: 'DEA CSOS',
          fields: [
            { label: 'Substance', value: 'Ketamine 10mg/mL · Schedule III' },
            { label: 'Variance', value: '-3 vials · Westside vault B' },
            { label: 'Filed within', value: '16h 23m of detection' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 23 · 02:14' },
        { kind: 'approved', label: 'Compliance sign-off', value: '02:38' },
        { kind: 'started', label: 'Started', value: '02:38:02' },
        { kind: 'completed', label: 'Completed', value: '02:38:58' },
        { kind: 'duration', label: 'Duration', value: '56s' },
      ],
    },
    {
      id: 'ph-ad-3',
      name: 'Daily Location Briefing Delivered',
      agent: 'Daily Location Summary',
      risk: 'low',
      status: 'completed',
      systems: ['Courier'],
      requestedAgo: '3h 18m ago',
      summary:
        'Morning briefing delivered to 12 recipients across 5 locations. 268 scripts yesterday (+4% WoW). Westside volume down 18% flagged for leadership. Compliance variance fully resolved.',
      rationale:
        'Scheduled 06:00 run per SLA. Role-tailored views: PICs see location scripts + QC + turnaround; regional directors see cross-location deltas; leadership sees rollup with exception flags. Variance + Westside callouts surfaced to leadership.',
      steps: [
        { label: 'Query PioneerRx + QuickBooks', status: 'completed', duration: '8s' },
        { label: 'Generate role-tailored summaries', status: 'completed', duration: '18s' },
        { label: 'Deliver via Courier', system: 'Courier', status: 'completed', duration: '22s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'Courier deliveries · 12 recipients',
          system: 'Courier',
          fields: [
            { label: 'PICs', value: '5 · location-scoped' },
            { label: 'Regional directors', value: '3 · cross-location deltas' },
            { label: 'Leadership', value: '4 · full rollup + flags' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 06:00' },
        { kind: 'approved', label: 'Auto-approved (scheduled)', value: '06:00' },
        { kind: 'started', label: 'Started', value: '06:00:00' },
        { kind: 'completed', label: 'Completed', value: '06:00:48' },
        { kind: 'duration', label: 'Duration', value: '48s' },
      ],
    },
  ],

  distribution: [
    {
      id: 'dist-ad-1',
      name: 'At-Risk Customer Outreach — Cascade Metals',
      agent: 'At-Risk Account Watcher',
      risk: 'medium',
      status: 'pending',
      systems: ['Salesforce', 'SendGrid'],
      requestedAgo: '22m ago',
      summary:
        'Cascade Metals monthly spend dropped 40% over 60 days. Drafting rep-review task + outreach email to account owner Marcus Torres. Needs rep acknowledgment before send.',
      rationale:
        'Cascade Metals is a top-50 account. Monthly spend trend shows clear cliff at day 20 — from $72K/month average to $28K last 30 days. No competitive-win data detected; likely contraction not switch. Playbook recommends rep-led review before outbound to avoid tripping sensitive account dynamics.',
      steps: [
        { label: 'Create Salesforce review task for rep', system: 'Salesforce', status: 'pending' },
        { label: 'Pre-draft outreach email', system: 'SendGrid', status: 'pending' },
        { label: 'Schedule 30-day follow-up', system: 'Salesforce', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Task · Account Review',
          system: 'Salesforce',
          fields: [
            { label: 'Account', value: 'Cascade Metals' },
            { label: 'Assignee', value: 'Marcus Torres' },
            { label: 'Priority', value: 'High · Spend -40%' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:48' },
      ],
      note: 'Pending rep review. Pre-draft outreach attached for reference.',
    },
    {
      id: 'dist-ad-2',
      name: 'Release $82K SO After AR Clears',
      agent: 'Credit Hold Responder',
      risk: 'medium',
      status: 'completed',
      systems: ['SAP Business One', 'QuickBooks', 'Salesforce'],
      requestedAgo: '1h 6m ago',
      summary:
        'Cascade Metals $82K SO released after overnight $48K wire clearance. Credit headroom $138K confirmed, SAP B1 updated, rep notified.',
      rationale:
        'Standing policy: release gated SOs automatically when AR aging clears AND credit-line check passes. Cascade\'s wire arrived 07:04 — Foundry reconciled against QuickBooks and cleared the hold automatically per the rule.',
      steps: [
        { label: 'Reconcile AR aging', system: 'QuickBooks', status: 'completed', duration: '0.3s' },
        { label: 'Release SO hold', system: 'SAP Business One', status: 'completed', duration: '0.5s' },
        { label: 'Log activity + notify rep', system: 'Salesforce', status: 'completed', duration: '0.4s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Sales Order · SO-14821',
          system: 'SAP Business One',
          fields: [
            { label: 'Status', value: 'Hold → Released' },
            { label: 'Value', value: '$82,400' },
            { label: 'Ship date', value: '2026-04-29' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 07:04' },
        { kind: 'approved', label: 'Auto (rule-based)', value: '07:04' },
        { kind: 'completed', label: 'Completed', value: '07:04:02' },
        { kind: 'duration', label: 'Duration', value: '1.2s' },
      ],
    },
    {
      id: 'dist-ad-3',
      name: 'Vendor PO — 12 SKUs Below Reorder Point',
      agent: 'Reorder Point Watcher',
      risk: 'low',
      status: 'completed',
      systems: ['SAP Business One', 'EDI'],
      requestedAgo: '42m ago',
      summary:
        '12 SKUs below reorder point across top-2 product families. Auto-PO to Allegheny Steel for 12 SKU/$38K via EDI 850; 997 ack expected within 4 hours.',
      rationale:
        'Nightly ROP calculation at 03:00 identified 12 SKUs trending to stock-out within 5 days. All SKUs have pre-approved vendor assignments. EDI 850 with auto-vendor routing runs inside the $50K auto-approval band; vendor confirmation expected via EDI 997/855.',
      steps: [
        { label: 'Generate PO in SAP B1', system: 'SAP Business One', status: 'completed', duration: '0.5s' },
        { label: 'Send EDI 850 to Allegheny', system: 'EDI', status: 'completed', duration: '1.2s' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Purchase Order · PO-9204',
          system: 'SAP Business One',
          fields: [
            { label: 'Vendor', value: 'Allegheny Steel' },
            { label: 'SKU count', value: '12' },
            { label: 'Value', value: '$38,240' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 04:28' },
        { kind: 'approved', label: 'Auto (ROP rule)', value: '04:28' },
        { kind: 'completed', label: 'Completed', value: '04:28:02' },
        { kind: 'duration', label: 'Duration', value: '1.8s' },
      ],
    },
  ],

  nonprofit: [
    {
      id: 'np-ad-1',
      name: 'Major-Donor Call Plan — 47 Donors',
      agent: 'Lapsed Donor Watcher',
      risk: 'low',
      status: 'pending',
      systems: ["Raiser's Edge", 'Salesforce'],
      requestedAgo: '18m ago',
      summary:
        '47 major donors ($5K+ lifetime) with no contact in 90+ days. Building call plan with giving history, program relevance, and committee affiliation per donor. Needs ED approval to route to development team.',
      rationale:
        'Lapsed-donor window triggered at the 90-day mark per development playbook. Each donor card includes last gift amount/date/designation, board/committee affiliation, most recent program outcome in their area of interest, and suggested conversation starter. ED gate preserves relationship oversight before development team outreach.',
      steps: [
        { label: 'Query donor records', system: "Raiser's Edge", status: 'pending' },
        { label: 'Compile 47 call cards', system: "Raiser's Edge", status: 'pending' },
        { label: 'Route to development team', system: 'Salesforce', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Call Plan · 47 donors',
          system: 'Salesforce',
          fields: [
            { label: 'Tier $100K+', value: '2 donors · ED personal' },
            { label: 'Tier $25K+', value: '8 donors · Board chair pairing' },
            { label: 'Tier $5K+', value: '37 donors · Development team' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:42' },
      ],
      note: 'Awaiting ED sign-off on call plan routing.',
    },
    {
      id: 'np-ad-2',
      name: 'Grant 90-Day Progress Report — Hewlett',
      agent: 'Grant Deadline Watcher',
      risk: 'medium',
      status: 'running',
      systems: ["Raiser's Edge", 'QuickBooks', 'SendGrid'],
      requestedAgo: '58m ago',
      summary:
        'Hewlett Foundation $240K general ops 90-day progress report in preparation. Program outcomes, financial actuals, and narrative draft assembling. Due 2026-05-01.',
      rationale:
        'Grant Deadline Watcher triggered 14 days ahead of submission. Required sections (program narrative, outcomes data, financials) are pre-populated from QuickBooks grant subledger and service delivery logs. Draft routing to program + finance review before DEV director final.',
      steps: [
        { label: 'Pull financial actuals', system: 'QuickBooks', status: 'completed', duration: '4s' },
        { label: 'Pull outcomes data', system: "Raiser's Edge", status: 'completed', duration: '6s' },
        { label: 'Draft narrative', status: 'running' },
        { label: 'Route for review', system: 'SendGrid', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Grant Report · Hewlett-2026-Q1',
          system: "Raiser's Edge",
          fields: [
            { label: 'Period', value: 'Q1 2026' },
            { label: 'Spend-down', value: '24% of $240K' },
            { label: 'People served', value: '1,240' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:04' },
        { kind: 'approved', label: 'Auto (scheduled)', value: '05:04' },
        { kind: 'started', label: 'Started', value: '05:04:02' },
      ],
    },
    {
      id: 'np-ad-3',
      name: 'Thank-You Letter Batch — 127 Weekend Gifts',
      agent: 'Gift Acknowledgment Responder',
      risk: 'low',
      status: 'completed',
      systems: ["Raiser's Edge", 'SendGrid'],
      requestedAgo: '2h 14m ago',
      summary:
        '127 weekend gifts totaling $84,400 acknowledged with tier-specific language. IRS-compliant receipts attached. $10K+ tier routes to ED for personal call.',
      rationale:
        'Gift Acknowledgment Responder runs every 4 hours. Tier-based thank-you templates: $10K+ gets ED personal call card, $1K+ gets personalized letter with program impact, $100+ gets email + IRS receipt, <$100 gets auto-receipt. IRS §170 documentation attached to all tiers.',
      steps: [
        { label: 'Segment gifts by tier', system: "Raiser's Edge", status: 'completed', duration: '4s' },
        { label: 'Generate personalized letters', status: 'completed', duration: '18s' },
        { label: 'Deliver via SendGrid', system: 'SendGrid', status: 'completed', duration: '12s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'Thank-you letters · 127 donors',
          system: 'SendGrid',
          fields: [
            { label: '$10K+', value: '2 · ED personal call card' },
            { label: '$1K–$10K', value: '11 · personalized letter' },
            { label: '$100–$1K', value: '46 · email + receipt' },
            { label: 'Under $100', value: '68 · automated receipt' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 04:14' },
        { kind: 'approved', label: 'Auto-approved', value: '04:14' },
        { kind: 'completed', label: 'Completed', value: '04:14:34' },
        { kind: 'duration', label: 'Duration', value: '34s' },
      ],
    },
  ],

  healthcare: [
    {
      id: 'hc-ad-1',
      name: 'Aetna Appeal Batch — 34 Claims',
      agent: 'Denial Appeal Processor',
      risk: 'medium',
      status: 'pending',
      systems: ['Athenahealth', 'Kareo', 'Epic'],
      requestedAgo: '28m ago',
      summary:
        '34 Aetna CARC 97/204 denials assembled into appeal batch. Chart notes pulled from Epic, modifier 25 corrections applied, prior-auth docs attached. Expected $218K recovery at 62% historical win rate. Awaiting RCM Director approval.',
      rationale:
        'Monthly denial batch per RCM playbook. All 34 claims qualify per payer-specific appeal rules. Pre-populated packages include chart notes (Epic), claim history (Kareo), prior-auth documentation where required, and modifier 25 corrections for CARC 97 bundling denials. 22 claims have appeal windows closing in <14 days — priority submission.',
      steps: [
        { label: 'Pull chart notes from Epic', system: 'Epic', status: 'pending' },
        { label: 'Apply modifier 25 corrections', system: 'Athenahealth', status: 'pending' },
        { label: 'Submit appeal batch', system: 'Kareo', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Appeal Batch · AET-2026-04-24',
          system: 'Kareo',
          fields: [
            { label: 'Claims', value: '34 (22 closing <14d)' },
            { label: 'Denied $', value: '$218K' },
            { label: 'Expected recovery', value: '$135K @ 62% win rate' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:28' },
        { kind: 'deadline', label: '22 claims <14d', value: 'Submit this week' },
      ],
      note: 'Awaiting RCM Director approval on batch composition.',
    },
    {
      id: 'hc-ad-2',
      name: 'Provider Reassignment — Phoenix to Scottsdale',
      agent: 'Volume-vs-Staffing Watcher',
      risk: 'medium',
      status: 'completed',
      systems: ['Epic', 'Courier'],
      requestedAgo: '1h 42m ago',
      summary:
        'Scottsdale Thursday 133% capacity overflow identified. 2 MAs reassigned from Phoenix (62% utilization) to Scottsdale for Thursday only. Schedules updated, patient transfers offered to Mesa.',
      rationale:
        'Weekly capacity forecast flagged Thursday as high-risk overflow at Scottsdale (184 booked vs 138 capacity). Cross-location elasticity model identified Phoenix (62%) as the optimal source. Standard MA reassignment within 10-mile radius runs inside the auto-approval threshold; patient-impact communications routed through patient-relations team.',
      steps: [
        { label: 'Update provider schedules in Epic', system: 'Epic', status: 'completed', duration: '2s' },
        { label: 'Notify reassigned providers', system: 'Courier', status: 'completed', duration: '0.4s' },
        { label: 'Offer Mesa transfers to 4 patients', system: 'Courier', status: 'completed', duration: '1s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Provider Schedule · Phoenix',
          system: 'Epic',
          fields: [
            { label: 'MA 1 (D. Park)', value: 'Thursday → Scottsdale' },
            { label: 'MA 2 (R. Kim)', value: 'Thursday → Scottsdale' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 03:48' },
        { kind: 'approved', label: 'Rule-based auto', value: '03:48' },
        { kind: 'completed', label: 'Completed', value: '03:48:04' },
        { kind: 'duration', label: 'Duration', value: '3.4s' },
      ],
    },
    {
      id: 'hc-ad-3',
      name: 'No-Show Follow-Up Sequence',
      agent: 'No-Show Responder',
      risk: 'low',
      status: 'completed',
      systems: ['Athenahealth', 'SendGrid'],
      requestedAgo: '2h 6m ago',
      summary:
        '41 no-shows from yesterday across 8 locations. Rescheduling outreach + copay reminder delivered via patient portal and SMS. 18 reschedules confirmed in first 2 hours.',
      rationale:
        'No-Show Responder runs at 06:00 daily. Patient-specific messaging: primary care no-shows get single reschedule prompt; specialty care adds urgency framing; pediatric adds parent-portal CC. Messaging is consent-scoped per portal preferences.',
      steps: [
        { label: 'Pull no-show list', system: 'Athenahealth', status: 'completed', duration: '2s' },
        { label: 'Send outreach sequence', system: 'SendGrid', status: 'completed', duration: '6s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'No-show follow-ups · 41 patients',
          system: 'SendGrid',
          fields: [
            { label: 'Portal message', value: '41 delivered' },
            { label: 'SMS (consented)', value: '28 delivered' },
            { label: 'Reschedules booked', value: '18 (in first 2h)' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 06:00' },
        { kind: 'approved', label: 'Scheduled auto', value: '06:00' },
        { kind: 'completed', label: 'Completed', value: '06:00:08' },
        { kind: 'duration', label: 'Duration', value: '8s' },
      ],
    },
  ],

  propertyManagement: [
    {
      id: 'pm-ad-1',
      name: 'Riverside-B Elevator Modernization — $180K',
      agent: 'Maintenance Cost Watcher',
      risk: 'high',
      status: 'pending',
      systems: ['Yardi', 'QuickBooks'],
      requestedAgo: '42m ago',
      summary:
        '2nd breakdown in 30 days at Riverside-B. Vendor quote comparison (Kone $178K vs Otis $182K vs Thyssen $189K). 3-year ROI analysis attached. Awaiting asset manager approval on capex.',
      rationale:
        'Riverside-B elevator (1988) has exceeded maintenance cost anomaly threshold twice in 30 days. Modernization cost-benefit: eliminates $72K/year maintenance spend + reduces tenant complaint rate. Capex requires asset manager approval per $100K+ threshold policy.',
      steps: [
        { label: 'Generate capex WO in Yardi', system: 'Yardi', status: 'pending' },
        { label: 'Post capex reserve entry', system: 'QuickBooks', status: 'pending' },
        { label: 'Schedule vendor selection call', system: 'Yardi', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Capex Work Order · Riverside-B-ELEV',
          system: 'Yardi',
          fields: [
            { label: 'Scope', value: 'Full modernization · 2 cars' },
            { label: 'Budget', value: '$180K (mid-quote)' },
            { label: 'ROI', value: '3 years' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:18' },
      ],
      note: 'Awaiting asset manager + ownership approval on $180K capex.',
    },
    {
      id: 'pm-ad-2',
      name: 'Trigger 90-Day Renewal Outreach — 47 Units',
      agent: 'Lease Expiration Watcher',
      risk: 'low',
      status: 'running',
      systems: ['Yardi', 'SendGrid'],
      requestedAgo: '24m ago',
      summary:
        '47 units expire in 90 days without renewal activity. Personalized outreach with market comp + renewal offer generating. 16 high-value units ($2K+ rent) get leasing manager CC.',
      rationale:
        '90-day mark policy per portfolio playbook. Resident-specific outreach blends tenure, maintenance history, and payment timeliness to personalize offer framing. Market comp pulled from RealPage confirms +4.2% uplift opportunity.',
      steps: [
        { label: 'Pull resident profiles', system: 'Yardi', status: 'completed', duration: '3s' },
        { label: 'Generate 47 personalized letters', status: 'completed', duration: '14s' },
        { label: 'Send via email + portal', system: 'SendGrid', status: 'running' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'Renewal outreach · 47 units',
          system: 'SendGrid',
          fields: [
            { label: 'High-value units (>$2K)', value: '16 · leasing mgr CC' },
            { label: 'Standard units', value: '31 · resident direct' },
            { label: 'Channel mix', value: 'Email + Portal' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 06:08' },
        { kind: 'approved', label: 'Auto (scheduled)', value: '06:08' },
        { kind: 'started', label: 'Started', value: '06:08:02' },
      ],
    },
    {
      id: 'pm-ad-3',
      name: 'Delinquency 3-Day Notice Cycle',
      agent: 'Delinquency Watcher',
      risk: 'medium',
      status: 'completed',
      systems: ['AppFolio', 'SendGrid'],
      requestedAgo: '3h 4m ago',
      summary:
        '28 residents past 10 days on rent. 3-day notices generated per state statute; certified mail routed for 4 units in jurisdictions requiring physical delivery.',
      rationale:
        'Delinquency Watcher runs daily at 02:00. State-specific templates (TX, CA, OR, WA) auto-selected per property jurisdiction. 3-day notices auto-generate when balance crosses 10-day threshold + has no active payment plan. Certified mail routing handled via AppFolio compliance module.',
      steps: [
        { label: 'Pull delinquency list', system: 'AppFolio', status: 'completed', duration: '2s' },
        { label: 'Generate state-specific notices', status: 'completed', duration: '4s' },
        { label: 'Deliver via email + certified mail', system: 'SendGrid', status: 'completed', duration: '14s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: '3-day notices · 28 residents',
          system: 'SendGrid',
          fields: [
            { label: 'Email', value: '24 delivered' },
            { label: 'Certified mail', value: '4 routed' },
            { label: 'Total balance', value: '$58,400' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 02:00' },
        { kind: 'approved', label: 'Auto (state-compliant)', value: '02:00' },
        { kind: 'completed', label: 'Completed', value: '02:00:20' },
        { kind: 'duration', label: 'Duration', value: '20s' },
      ],
    },
  ],

  professionalServices: [
    {
      id: 'ps-ad-1',
      name: 'Early-Warning — Hartford M&A Engagement',
      agent: 'Budget-Burn Watcher',
      risk: 'medium',
      status: 'pending',
      systems: ['Mavenlink', 'Harvest', 'SendGrid'],
      requestedAgo: '36m ago',
      summary:
        'Hartford M&A engagement at 87% budget consumed with 42% scope remaining. Early-warning to PM with revised ETC + client-conversation prep doc. Awaiting PM review before send.',
      rationale:
        'Budget-Burn Watcher fires when consumed% > scope% by 30+ points. Hartford crossed threshold yesterday; two additional deliverables landed Friday without scope amendment. ETC recalc projects +$96K overrun. PM review gate preserves relationship tact before client-side conversation.',
      steps: [
        { label: 'Recalculate ETC from Harvest', system: 'Harvest', status: 'pending' },
        { label: 'Generate client-conversation prep', status: 'pending' },
        { label: 'Route to PM for review', system: 'SendGrid', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Early-Warning · Hartford M&A',
          system: 'Mavenlink',
          fields: [
            { label: 'Budget consumed', value: '87% ($331K of $380K)' },
            { label: 'Scope remaining', value: '42%' },
            { label: 'Projected overrun', value: '+$96K' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:34' },
      ],
      note: 'Awaiting PM review before client communication.',
    },
    {
      id: 'ps-ad-2',
      name: 'Invoice Write-Down — $12K Disputed',
      agent: 'WIP Aging Watcher',
      risk: 'medium',
      status: 'completed',
      systems: ['NetSuite', 'QuickBooks', 'Mavenlink'],
      requestedAgo: '1h 28m ago',
      summary:
        '$12K disputed invoice on Riverside Strategic engagement written down after client negotiation. GL coding + approval routed through CFO; engagement margin updated in Mavenlink.',
      rationale:
        'Write-down > $10K requires CFO approval per policy. Dispute centered on 3 consultant days claimed by client as non-billable (deliverable timing). Managing partner agreed; write-down posted as normal course. No material impact to engagement profitability metrics given original margin cushion.',
      steps: [
        { label: 'Generate write-down entry', system: 'NetSuite', status: 'completed', duration: '0.6s' },
        { label: 'Post GL adjustment', system: 'QuickBooks', status: 'completed', duration: '0.4s' },
        { label: 'Update engagement margin', system: 'Mavenlink', status: 'completed', duration: '0.3s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Invoice · INV-3842',
          system: 'NetSuite',
          fields: [
            { label: 'Original', value: '$86,400' },
            { label: 'Write-down', value: '-$12,000' },
            { label: 'Final', value: '$74,400' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 04:42' },
        { kind: 'approved', label: 'CFO approved', value: '04:46' },
        { kind: 'completed', label: 'Completed', value: '04:46:03' },
        { kind: 'duration', label: 'Duration', value: '3s' },
      ],
    },
    {
      id: 'ps-ad-3',
      name: 'Timesheet Chase — 12 Consultants',
      agent: 'Timesheet Compliance Scheduler',
      risk: 'low',
      status: 'completed',
      systems: ['Harvest', 'SendGrid'],
      requestedAgo: '4h 18m ago',
      summary:
        '12 consultants missing timesheets from last week. Automated reminders sent with manager CC. 8 timesheets submitted within 4 hours.',
      rationale:
        'Weekly timesheet-compliance run every Monday at 02:00. Non-submission hits realization + billable WIP; 2nd-reminder adds manager CC; 3rd escalates to partner. Simple reminder cadence, no human gate.',
      steps: [
        { label: 'Pull missing timesheets', system: 'Harvest', status: 'completed', duration: '2s' },
        { label: 'Send tiered reminders', system: 'SendGrid', status: 'completed', duration: '4s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'Timesheet reminders · 12',
          system: 'SendGrid',
          fields: [
            { label: '1st reminder', value: '8 (recovered in 4h)' },
            { label: '2nd + manager CC', value: '3' },
            { label: '3rd + partner', value: '1' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 02:00' },
        { kind: 'approved', label: 'Auto (scheduled)', value: '02:00' },
        { kind: 'completed', label: 'Completed', value: '02:00:06' },
        { kind: 'duration', label: 'Duration', value: '6s' },
      ],
    },
  ],

  financialServices: [
    {
      id: 'fs-ad-1',
      name: 'Form ADV Annual Amendment',
      agent: 'Compliance Calendar Scheduler',
      risk: 'high',
      status: 'pending',
      systems: ['Redtail', 'QuickBooks', 'Salesforce'],
      requestedAgo: '52m ago',
      summary:
        'Q1 Form ADV annual amendment assembled. AUM data, advisor counts, disciplinary events, and fee schedules pre-populated. Due 2026-05-01. Needs CCO approval before IARD filing.',
      rationale:
        'SEC Form ADV annual amendment is due within 90 days of fiscal year end. Compliance Calendar Scheduler triggered 21 days out per policy. Data populated from Orion (AUM), Redtail (advisor records), Salesforce (disciplinary events), QuickBooks (regulatory fees). CCO review gate required before IARD filing.',
      steps: [
        { label: 'Pull AUM + advisor data', system: 'Redtail', status: 'pending' },
        { label: 'Assemble disclosure items', system: 'Salesforce', status: 'pending' },
        { label: 'Route to CCO for approval', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Form ADV · 2026 Amendment',
          system: 'Redtail',
          fields: [
            { label: 'AUM reported', value: '$2.12B' },
            { label: 'Advisor count', value: '45' },
            { label: 'Filing deadline', value: '2026-05-01 (7 days)' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:12' },
        { kind: 'deadline', label: 'Filing deadline', value: '7 days · May 1' },
      ],
      note: 'Awaiting CCO approval before IARD submission.',
    },
    {
      id: 'fs-ad-2',
      name: 'Schedule Review-Meeting Sequence — 47 Clients',
      agent: 'Client Review Trigger',
      risk: 'low',
      status: 'running',
      systems: ['Redtail', 'Salesforce', 'SendGrid'],
      requestedAgo: '24m ago',
      summary:
        '47 clients due for annual review in next 45 days. Advisor-specific meeting availability scraped, personalized outreach generating with pre-populated agenda packets.',
      rationale:
        'Review Trigger policy: 45 days out from annual review anniversary. Outreach is advisor-specific (uses advisor\'s calendar preference + office). Agenda packet includes portfolio summary, threshold breaches flagged, life-event alerts, market-context commentary.',
      steps: [
        { label: 'Pull advisor availability', system: 'Salesforce', status: 'completed', duration: '4s' },
        { label: 'Generate client packages', system: 'Redtail', status: 'completed', duration: '18s' },
        { label: 'Send outreach sequences', system: 'SendGrid', status: 'running' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Review Meetings · 47 clients',
          system: 'Salesforce',
          fields: [
            { label: 'Threshold breaches flagged', value: '6 (CCO priority)' },
            { label: 'Life events flagged', value: '5' },
            { label: 'Expected scheduling rate', value: '92% (historical)' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:44' },
        { kind: 'approved', label: 'Auto (review cal.)', value: '05:44' },
        { kind: 'started', label: 'Started', value: '05:44:02' },
      ],
    },
    {
      id: 'fs-ad-3',
      name: 'Suitability Review Flag — Rebalance Trade',
      agent: 'Suitability Watcher',
      risk: 'high',
      status: 'completed',
      systems: ['Orion'],
      requestedAgo: '2h 12m ago',
      summary:
        'Proposed rebalance trade for client R.M. flagged: outside target allocation band (+8% equity). Auto-routed to CCO for suitability review before execution.',
      rationale:
        'Suitability Watcher policy: any proposed trade that moves allocation outside target band by >5% is flagged. R.M.\'s advisor proposed rebalance that takes equity from 60% to 68% (target 60%, band 55-65). Flag pre-empts execution per CFP/CCO workflow.',
      steps: [
        { label: 'Flag trade in Orion', system: 'Orion', status: 'completed', duration: '0.3s' },
        { label: 'Compile suitability context', system: 'Orion', status: 'completed', duration: '2s' },
        { label: 'Route to CCO', system: 'Orion', status: 'completed', duration: '0.4s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Trade · TRD-4412',
          system: 'Orion',
          fields: [
            { label: 'Status', value: 'Proposed → Flagged (suitability)' },
            { label: 'Proposed allocation', value: '68% equity (target 60%)' },
            { label: 'CCO review', value: 'Required before execution' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 03:56' },
        { kind: 'approved', label: 'Auto (policy)', value: '03:56' },
        { kind: 'completed', label: 'Completed', value: '03:56:03' },
        { kind: 'duration', label: 'Duration', value: '2.7s' },
      ],
    },
  ],

  foodBeverage: [
    {
      id: 'fb-ad-1',
      name: 'Disposal Batch A-2784 — 480 Units',
      agent: 'Shelf-Life Watcher',
      risk: 'high',
      status: 'pending',
      systems: ['SAP Business One', 'QuickBooks', 'Courier'],
      requestedAgo: '12m ago',
      summary:
        '480 units of Cold Brew Concentrate breached shelf-life window. Inventory adjustment, QuickBooks write-off entry, and FDA compliance log entry assembling. Awaiting VP Operations approval.',
      rationale:
        'Shelf-Life Watcher runs hourly; flagged 480 units of batch A-2784 crossed 48-hour buffer ahead of expiry. Policy requires disposal initiation within 24 hours. Material value $4,240 is below auto-threshold but disposal events require VP Ops sign-off per food-safety policy.',
      steps: [
        { label: 'Inventory adjustment in SAP B1', system: 'SAP Business One', status: 'pending' },
        { label: 'Write-off entry in QuickBooks', system: 'QuickBooks', status: 'pending' },
        { label: 'FDA compliance log entry', system: 'Courier', status: 'pending' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Batch · A-2784',
          system: 'SAP Business One',
          fields: [
            { label: 'Status', value: 'Active → Disposed' },
            { label: 'Units', value: '480' },
            { label: 'Reason', value: 'Shelf-life breach (48h window)' },
          ],
        },
        {
          verb: 'create',
          entity: 'Write-off · $4,240',
          system: 'QuickBooks',
          fields: [
            { label: 'Account', value: 'Spoilage write-off' },
            { label: 'Memo', value: 'Batch A-2784 shelf-life disposal' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:48' },
      ],
      note: 'Awaiting VP Operations approval per food-safety policy.',
    },
    {
      id: 'fb-ad-2',
      name: 'Recipe BOM Update — Arabica Cost',
      agent: 'Ingredient Cost Watcher',
      risk: 'medium',
      status: 'running',
      systems: ['SAP Business One'],
      requestedAgo: '32m ago',
      summary:
        'Arabica green-bean cost up 14% from new vendor contract. Updating 8 recipe BOMs with new ingredient cost; standard cost recalculation propagating to all affected SKUs.',
      rationale:
        'New arabica contract (vendor: Pacific Growers) activates Apr 29. Cost per pound moves from $4.15 spot to $3.80 contract (down 8%) but standard cost in SAP B1 still reflects prior $3.35 — update closes the gap. 8 coffee blends affected; downstream pricing review recommended.',
      steps: [
        { label: 'Pull affected BOMs', system: 'SAP Business One', status: 'completed', duration: '3s' },
        { label: 'Update ingredient cost', system: 'SAP Business One', status: 'completed', duration: '4s' },
        { label: 'Recalc standard costs', system: 'SAP Business One', status: 'running' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Ingredient · Arabica Green Bean',
          system: 'SAP Business One',
          fields: [
            { label: 'Old cost', value: '$3.35/lb' },
            { label: 'New cost', value: '$3.80/lb (contract)' },
            { label: 'SKUs affected', value: '8 blends' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:28' },
        { kind: 'approved', label: 'Auto (contract)', value: '05:28' },
        { kind: 'started', label: 'Started', value: '05:28:02' },
      ],
    },
    {
      id: 'fb-ad-3',
      name: 'Distributor Replenishment PO — 23 SKUs',
      agent: 'Distributor Velocity Watcher',
      risk: 'low',
      status: 'completed',
      systems: ['NetSuite', 'Shopify'],
      requestedAgo: '1h 48m ago',
      summary:
        '23 SKUs below safety stock across top-5 distributors auto-replenished. PO generated in NetSuite, Shopify B2B portal lead times updated, ASN queued to distributors.',
      rationale:
        'Distributor Velocity Watcher policy: auto-replenish when any SKU at a top-5 distributor falls below computed safety stock. All 23 SKUs within auto-approval band ($50K aggregate cap; this cycle $82K across 5 distributors — within tolerance since multi-distributor split).',
      steps: [
        { label: 'Generate replenishment POs', system: 'NetSuite', status: 'completed', duration: '2s' },
        { label: 'Update Shopify B2B lead times', system: 'Shopify', status: 'completed', duration: '1.8s' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Replenishment POs · 5',
          system: 'NetSuite',
          fields: [
            { label: 'Restaurant Depot', value: '11 SKUs · $34K' },
            { label: 'US Foods Midwest', value: '5 SKUs · $18K' },
            { label: 'Gordon Northern', value: '3 SKUs · $12K' },
            { label: 'Sysco + PFG', value: '4 SKUs · $18K' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 03:58' },
        { kind: 'approved', label: 'Auto (velocity rule)', value: '03:58' },
        { kind: 'completed', label: 'Completed', value: '03:58:04' },
        { kind: 'duration', label: 'Duration', value: '3.8s' },
      ],
    },
  ],

  construction: [
    {
      id: 'c-ad-1',
      name: 'Change Order Approval — Parker Medical $142K',
      agent: 'Change Order Watcher',
      risk: 'high',
      status: 'pending',
      systems: ['Procore', 'Sage 300', 'SendGrid'],
      requestedAgo: '28m ago',
      summary:
        'Parker Medical Tower CO-2026-042: $142K steel price escalation. Full CO package assembled with cost impact analysis, 3 vendor quotes, and schedule recovery plan. Awaiting CFO + owner counsel approval.',
      rationale:
        'Steel cost escalation policy: any material-price increase >15% within a 90-day window triggers CO generation. Parker Medical Tower steel contract locked Jan 14; current market is 22% higher. CO-2026-042 fully backed by contract indexing clause. CFO approval required for amounts >$100K.',
      steps: [
        { label: 'Assemble CO package in Procore', system: 'Procore', status: 'pending' },
        { label: 'Post cost impact in Sage 300', system: 'Sage 300', status: 'pending' },
        { label: 'Route to CFO + owner counsel', system: 'SendGrid', status: 'pending' },
      ],
      changes: [
        {
          verb: 'create',
          entity: 'Change Order · CO-2026-042',
          system: 'Procore',
          fields: [
            { label: 'Project', value: 'Parker Medical Tower' },
            { label: 'Amount', value: '$142,000' },
            { label: 'Cause', value: 'Steel escalation (22%, Jan 14 → now)' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 05:32' },
      ],
      note: 'Awaiting CFO + owner counsel approval.',
    },
    {
      id: 'c-ad-2',
      name: 'Retainage Release — Parker Mechanical',
      agent: 'Retainage Scheduler',
      risk: 'medium',
      status: 'completed',
      systems: ['Sage 300', 'QuickBooks', 'Procore'],
      requestedAgo: '2h 44m ago',
      summary:
        'Substantial-completion confirmed on Parker Mechanical scope. Lien waivers clean, 30-day warranty window elapsed. $88K retainage released; final disbursement routing through AP.',
      rationale:
        'Retainage-release policy: release at substantial completion + 30 days, conditional on zero open lien waivers. Parker Mechanical met both criteria Apr 23. Release runs through Sage 300 and hits QuickBooks AP batch for Friday disbursement run. Procore updated for project close-out.',
      steps: [
        { label: 'Verify lien waivers + warranty window', system: 'Procore', status: 'completed', duration: '2s' },
        { label: 'Post release in Sage 300', system: 'Sage 300', status: 'completed', duration: '0.6s' },
        { label: 'Queue AP disbursement', system: 'QuickBooks', status: 'completed', duration: '0.4s' },
      ],
      changes: [
        {
          verb: 'update',
          entity: 'Retainage · Parker Mechanical',
          system: 'Sage 300',
          fields: [
            { label: 'Status', value: 'Held → Released' },
            { label: 'Amount', value: '$88,000' },
            { label: 'Disbursement', value: 'Friday AP batch' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 03:16' },
        { kind: 'approved', label: 'Auto (policy)', value: '03:16' },
        { kind: 'completed', label: 'Completed', value: '03:16:03' },
        { kind: 'duration', label: 'Duration', value: '3s' },
      ],
    },
    {
      id: 'c-ad-3',
      name: 'Lien Waiver Chase — Subcontractor Watch List',
      agent: 'Lien Waiver Watcher',
      risk: 'medium',
      status: 'completed',
      systems: ['Procore', 'SendGrid'],
      requestedAgo: '3h 48m ago',
      summary:
        '7 subcontractors missing conditional waivers for April draw. Reminders sent with form links; 3 waivers received within 1 hour. 4 remaining on next-day escalation schedule.',
      rationale:
        'Lien-Waiver Watcher runs daily at 03:30. Subs with pending-draw status but missing waivers get reminder sequence: T+0 standard, T+2 add PM CC, T+5 hold draw. 7 this cycle are all on T+0 (standard reminder).',
      steps: [
        { label: 'Pull subs missing waivers', system: 'Procore', status: 'completed', duration: '1s' },
        { label: 'Send reminder sequence', system: 'SendGrid', status: 'completed', duration: '3s' },
      ],
      changes: [
        {
          verb: 'send',
          entity: 'Waiver reminders · 7 subs',
          system: 'SendGrid',
          fields: [
            { label: 'Cedar Structural', value: '$88K draw pending' },
            { label: 'Ridge Insulation', value: '$42K draw pending' },
            { label: 'Valley Glass', value: '$38K draw pending' },
            { label: '4 others', value: 'Aggregate $50K' },
          ],
        },
      ],
      timeline: [
        { kind: 'created', label: 'Created', value: 'Apr 24 · 03:30' },
        { kind: 'approved', label: 'Auto (scheduled)', value: '03:30' },
        { kind: 'completed', label: 'Completed', value: '03:30:04' },
        { kind: 'duration', label: 'Duration', value: '4s' },
      ],
    },
  ],
};

/**
 * Legacy flat export — first industry's action details so un-migrated consumers still render.
 */
export const foundryActionDetails: ActionDetail[] = foundryActionDetailsByIndustry.manufacturing;
