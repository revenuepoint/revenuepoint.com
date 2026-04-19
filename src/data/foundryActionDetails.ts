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
  note?: string; // e.g. "DEA investigation window: 16h 54m remaining"
};

export const foundryActionDetails: ActionDetail[] = [
  {
    id: 'ad-1',
    name: 'Rx Interaction — Pharmacist Review',
    agent: 'Prescription Intake Processor',
    risk: 'high',
    status: 'pending',
    systems: ['PioneerRx'],
    requestedAgo: '6m ago',
    summary:
      'Incoming Warfarin 5mg Rx for patient Linda T. (DOB 1965-03-14). Patient is currently on Aspirin 81mg with a documented NSAID allergy. Flag for pharmacist verification before dispense.',
    rationale:
      'Found a clinically significant interaction during intake screening. Warfarin + Aspirin increases bleeding risk; patient allergy profile also shows NSAID sensitivity noted by Dr. Ramirez on 2025-11-02. Per protocol, any anticoagulant + NSAID combination with a documented allergy must be reviewed by a pharmacist before entering the compounding queue.',
    steps: [
      { label: 'Flag Rx in PioneerRx', system: 'PioneerRx', status: 'pending' },
      { label: 'Create interaction alert record', system: 'PioneerRx', status: 'pending' },
      { label: 'Notify pharmacist-on-duty', system: 'SendGrid', status: 'pending' },
    ],
    changes: [
      {
        verb: 'update',
        entity: 'Prescription · Rx-88412',
        system: 'PioneerRx',
        fields: [
          { label: 'Status', value: 'Intake → On Hold (Interaction Review)' },
          { label: 'Flag', value: 'Drug-Drug · Warfarin + Aspirin 81mg' },
          { label: 'Allergy check', value: 'NSAID sensitivity (Dr. Ramirez, 2025-11-02)' },
        ],
      },
      {
        verb: 'create',
        entity: 'Interaction Alert',
        system: 'PioneerRx',
        fields: [
          { label: 'Severity', value: 'Major' },
          { label: 'Requires', value: 'Pharmacist-in-charge sign-off' },
        ],
      },
      {
        verb: 'send',
        entity: 'Pharmacist-on-duty notification',
        system: 'SendGrid',
        fields: [
          { label: 'Recipient', value: 'pic.westside@firstservice.rx' },
          { label: 'Subject', value: 'Rx-88412 · Interaction flag · review needed' },
        ],
      },
    ],
    timeline: [
      { kind: 'created', label: 'Created', value: 'Apr 18 · 14:02 · awaiting approval' },
    ],
    note: 'Awaiting pharmacist-in-charge approval.',
  },
  {
    id: 'ad-2',
    name: 'Out-of-Stock Response',
    agent: 'Out-of-Stock Responder',
    risk: 'high',
    status: 'running',
    systems: ['SAP', 'SendGrid'],
    requestedAgo: '1m ago',
    summary:
      'Hyaluronic Acid (USP, 100mg/mL) stock hit zero at 08:34. Four active production orders require this ingredient. Halting those orders and placing an emergency PO with NextGen Chemical for 2L at $480 with 24-hour expedited shipping.',
    rationale:
      'Inventory sync at 08:34 showed 0 units on hand against 4 active production orders totaling 1.8L. Letting those orders proceed would cause a QC failure and patient delay. NextGen Chemical is the primary approved vendor with 98% on-time delivery history over the past 12 months and can ship same-day.',
    steps: [
      { label: 'Halt production orders', system: 'SAP', status: 'completed', duration: '0.3s' },
      { label: 'Create emergency PO', system: 'SAP', status: 'completed', duration: '0.5s' },
      { label: 'Send PO to vendor', system: 'SendGrid', status: 'running' },
      { label: 'Notify procurement team', system: 'Courier', status: 'pending' },
    ],
    changes: [
      {
        verb: 'update',
        entity: 'Production Orders · PO-4821..PO-4824',
        system: 'SAP',
        fields: [
          { label: 'Status', value: 'Active → On Hold (ingredient shortage)' },
          { label: 'Affected orders', value: '4 (total 1.8L Hyaluronic Acid)' },
        ],
      },
      {
        verb: 'create',
        entity: 'Purchase Order · PO-9156',
        system: 'SAP',
        fields: [
          { label: 'Vendor', value: 'NextGen Chemical' },
          { label: 'Line item', value: '2L Hyaluronic Acid USP · $480' },
          { label: 'Ship', value: '24h expedited' },
        ],
      },
      {
        verb: 'send',
        entity: 'Vendor order confirmation',
        system: 'SendGrid',
        fields: [
          { label: 'Recipient', value: 'orders@nextgenchemical.com' },
          { label: 'Subject', value: 'PO-9156 · Expedited · ship today' },
        ],
      },
      {
        verb: 'send',
        entity: 'Procurement notification',
        system: 'Courier',
        fields: [
          { label: 'Recipients', value: 'procurement@firstservice.rx (3)' },
          { label: 'Context', value: 'Halt reason + PO link + vendor ETA' },
        ],
      },
    ],
    timeline: [
      { kind: 'created', label: 'Created', value: 'Apr 18 · 08:34' },
      { kind: 'approved', label: 'Auto-approved', value: 'rule-based · 08:34' },
      { kind: 'started', label: 'Started', value: '08:34' },
    ],
  },
  {
    id: 'ad-3',
    name: 'Inbound PO → Sales Order',
    agent: 'PO Processor',
    risk: 'medium',
    status: 'completed',
    systems: ['SAP', 'Salesforce'],
    requestedAgo: '12m ago',
    summary:
      'Purchase order PO-9104 from Pacific NW Construction: 5,000 M10 steel hex bolts at $0.42/unit (total $2,100), ship date 4/10/26. Sales order SO-14821 created in SAP, confirmation email queued to Chris Nelson, customer record updated in Salesforce.',
    rationale:
      'EDI feed delivered PO-9104 at 13:58. Customer is a known account with credit line in good standing ($48K remaining). All 5,000 units are in stock at the Tacoma DC. Standard 2-day ship, no exceptions required.',
    steps: [
      { label: 'Parse PO document', status: 'completed', duration: '0.3s' },
      { label: 'Create sales order in SAP', system: 'SAP', status: 'completed', duration: '0.6s' },
      { label: 'Send order confirmation', system: 'SendGrid', status: 'completed', duration: '0.4s' },
      { label: 'Update customer last-order date', system: 'Salesforce', status: 'completed', duration: '0.2s' },
    ],
    changes: [
      {
        verb: 'create',
        entity: 'Sales Order · SO-14821',
        system: 'SAP',
        fields: [
          { label: 'Customer', value: 'Pacific NW Construction' },
          { label: 'Line item', value: 'SKU-2847 · M10 Steel Hex Bolts' },
          { label: 'Quantity', value: '5,000 units @ $0.42' },
          { label: 'Ship date', value: '2026-04-10 · Tacoma DC' },
        ],
      },
      {
        verb: 'update',
        entity: 'Account · Pacific NW Construction',
        system: 'Salesforce',
        fields: [
          { label: 'Last PO', value: '2026-03-02 → 2026-04-18' },
          { label: 'YTD volume', value: '$184,200 → $186,300' },
        ],
      },
    ],
    timeline: [
      { kind: 'created', label: 'Created', value: 'Apr 18 · 14:02' },
      { kind: 'approved', label: 'Auto-approved', value: 'rule-based · 14:02' },
      { kind: 'started', label: 'Started', value: '14:03:01' },
      { kind: 'completed', label: 'Completed', value: '14:03:02' },
      { kind: 'duration', label: 'Duration', value: '1.5s' },
    ],
  },
  {
    id: 'ad-4',
    name: 'Controlled Substance Variance — Compliance Alert',
    agent: 'Controlled Substance Variance Watcher',
    risk: 'high',
    status: 'pending',
    systems: ['PioneerRx', 'Courier'],
    requestedAgo: '7h ago',
    summary:
      'Nightly reconciliation shows a 3-vial variance on Ketamine 10mg/mL at Westside hub. Dispensing logs indicate 48 vials administered; inventory shows 45 on hand. Flagging for compliance review within the DEA 24-hour window.',
    rationale:
      'Schedule III variance detected at 23:04 against baseline dispensing profile. Last manual audit on 4/11 reconciled to zero. No maintenance event or manual adjustment logged since. Under DEA recordkeeping rules, unexplained variance on a Schedule III substance requires investigation within 24 hours; pre-queueing the alert with full context so the pharmacist-in-charge can triage without assembling reports.',
    steps: [
      { label: 'Flag batch record', system: 'PioneerRx', status: 'pending' },
      { label: 'Compile DEA context packet', system: 'PioneerRx', status: 'pending' },
      { label: 'Notify pharmacist-in-charge', system: 'Courier', status: 'pending' },
    ],
    changes: [
      {
        verb: 'create',
        entity: 'Variance Record · VAR-0041',
        system: 'PioneerRx',
        fields: [
          { label: 'Substance', value: 'Ketamine 10mg/mL · Schedule III' },
          { label: 'Expected', value: '48 vials · Actual 45 · Δ -3' },
          { label: 'Location', value: 'Westside hub · CSV vault B' },
        ],
      },
      {
        verb: 'create',
        entity: 'DEA Context Packet',
        system: 'PioneerRx',
        fields: [
          { label: 'Contents', value: 'Dispensing log · baseline · recent events · tech shifts' },
          { label: 'Coverage window', value: '2026-04-11 audit → now' },
        ],
      },
      {
        verb: 'send',
        entity: 'Pharmacist-in-charge alert',
        system: 'Courier',
        fields: [
          { label: 'Recipient', value: 'pic.westside@firstservice.rx' },
          { label: 'Deadline', value: 'DEA 24-hour window · 16h 54m left' },
        ],
      },
    ],
    timeline: [
      { kind: 'created', label: 'Created', value: 'Apr 17 · 23:04' },
      { kind: 'deadline', label: 'DEA window', value: '16h 54m remaining' },
    ],
    note: 'Awaiting pharmacist-in-charge approval under DEA compliance window.',
  },
  {
    id: 'ad-5',
    name: 'Daily Location Summary Delivered',
    agent: 'Daily Location Summary',
    risk: 'low',
    status: 'completed',
    systems: ['Courier'],
    requestedAgo: '3h ago',
    summary:
      'Daily operations briefing compiled and delivered to 12 recipients across 5 Harborline pharmacy locations. 268 scripts filled yesterday (up 8% vs prior day). Average turnaround 52h vs target 44h — flagged. QC pass rate 97.2%. Revenue $24,200.',
    rationale:
      'Scheduled run at 06:00 per the briefing SLA. Role-tailored views delivered: location managers see their location\'s volume + turnaround + QC, regional directors see cross-location deltas, pharmacy leadership sees the rollup. Turnaround regression flagged for leadership attention.',
    steps: [
      { label: 'Query location data', status: 'completed', duration: '4s' },
      { label: 'Compile per-role summaries', status: 'completed', duration: '12s' },
      { label: 'Render & deliver via Courier', system: 'Courier', status: 'completed', duration: '32s' },
    ],
    changes: [
      {
        verb: 'send',
        entity: 'Courier deliveries · 12 recipients',
        system: 'Courier',
        fields: [
          { label: 'Location managers', value: '5 · location-scoped views' },
          { label: 'Regional directors', value: '3 · cross-location deltas' },
          { label: 'Leadership', value: '4 · full rollup with turnaround flag' },
        ],
      },
      {
        verb: 'create',
        entity: 'Location Summary records · 5',
        system: 'Courier',
        fields: [
          { label: 'Scripts', value: '268 (+8% d/d)' },
          { label: 'Avg turnaround', value: '52h · target 44h · flagged' },
          { label: 'QC pass rate', value: '97.2%' },
          { label: 'Revenue', value: '$24,200' },
        ],
      },
    ],
    timeline: [
      { kind: 'created', label: 'Created', value: 'Apr 18 · 06:00' },
      { kind: 'approved', label: 'Auto-approved', value: 'scheduled · 06:00' },
      { kind: 'started', label: 'Started', value: '06:00:00' },
      { kind: 'completed', label: 'Completed', value: '06:00:48' },
      { kind: 'duration', label: 'Duration', value: '48s' },
    ],
  },
];
