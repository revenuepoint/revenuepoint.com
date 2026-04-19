'use client';

import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
  useReactFlow,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeProps,
} from '@xyflow/react';
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

type Category = 'connection' | 'data' | 'agent' | 'lens' | 'metric';
type Source =
  | 'Salesforce'
  | 'SAP'
  | 'QuickBooks'
  | 'Shopify'
  | 'Stripe'
  | '8x8'
  | 'Mailchimp'
  | 'Slack';
type MetricStatus = 'on-track' | 'at-risk' | 'off-track';

type BlueprintNodeData = {
  name: string;
  category: Category;
  source?: Source;
  recordCount?: number;
  description?: string;
  connectionLabel?: string;
  metricValue?: string;
  metricGoal?: string;
  metricStatus?: MetricStatus;
  metricTrend?: { direction: 'up' | 'down'; value: string; isGood: boolean };
  metricSparkline?: number[];
};

const SOURCE_STYLES: Record<Source, { top: string; badge: string; label: string }> = {
  Salesforce: { top: '#2563EB', badge: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Salesforce' },
  SAP: { top: '#D97706', badge: 'bg-amber-50 text-amber-700 border-amber-200', label: 'SAP' },
  QuickBooks: { top: '#059669', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', label: 'QuickBooks' },
  Shopify: { top: '#10B981', badge: 'bg-green-50 text-green-700 border-green-200', label: 'Shopify' },
  Stripe: { top: '#7C3AED', badge: 'bg-violet-50 text-violet-700 border-violet-200', label: 'Stripe' },
  '8x8': { top: '#DC2626', badge: 'bg-red-50 text-red-700 border-red-200', label: '8x8' },
  Mailchimp: { top: '#EAB308', badge: 'bg-yellow-50 text-yellow-700 border-yellow-200', label: 'Mailchimp' },
  Slack: { top: '#4A154B', badge: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200', label: 'Slack' },
};

const CATEGORY_STYLES: Record<
  Exclude<Category, 'data' | 'connection'>,
  { top: string; badge: string; label: string }
> = {
  agent: { top: '#0D9488', badge: 'bg-teal-50 text-teal-700 border-teal-200', label: 'Agent' },
  lens: { top: '#2563EB', badge: 'bg-sky-50 text-sky-700 border-sky-200', label: 'Dashboard' },
  metric: { top: '#8B0A39', badge: 'bg-crimsonLight text-crimson border-crimson/20', label: 'Metric' },
};

const METRIC_STATUS_COLOR: Record<MetricStatus, string> = {
  'on-track': '#1A7A4A',
  'at-risk': '#B45309',
  'off-track': '#C0392B',
};

function Sparkline({ values, color }: { values: number[]; color: string }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 160;
  const h = 22;
  const pts = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="block">
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ObjectNode({ data, selected }: NodeProps<Node<BlueprintNodeData>>) {
  const {
    name,
    category,
    source,
    recordCount,
    description,
    connectionLabel,
    metricValue,
    metricGoal,
    metricStatus,
    metricTrend,
    metricSparkline,
  } = data;

  const isConnection = category === 'connection';
  const isData = category === 'data';
  const isMetric = category === 'metric';

  // Top-border color: sources use their brand; categories use their own.
  const topColor =
    source
      ? SOURCE_STYLES[source].top
      : CATEGORY_STYLES[category as Exclude<Category, 'data' | 'connection'>].top;

  // Category badge text + tone.
  const badge =
    isConnection
      ? { label: 'Connection', cls: source ? SOURCE_STYLES[source].badge : 'bg-mutedText/10 text-mutedText border-border' }
      : isData && source
        ? { label: SOURCE_STYLES[source].label, cls: SOURCE_STYLES[source].badge }
        : {
            label: CATEGORY_STYLES[category as Exclude<Category, 'data' | 'connection'>].label,
            cls: CATEGORY_STYLES[category as Exclude<Category, 'data' | 'connection'>].badge,
          };

  const statusColor = metricStatus ? METRIC_STATUS_COLOR[metricStatus] : '#6B8299';

  return (
    <>
      {!isConnection && (
        <Handle type="target" position={Position.Top} className="!bg-border !w-1.5 !h-1.5 !border-0" />
      )}
      <div
        className={`bg-white rounded-lg overflow-hidden shadow-sm transition-all ${
          selected
            ? 'border border-crimson ring-2 ring-crimson/30 shadow-md'
            : 'border border-border'
        }`}
        style={{
          borderTopWidth: 2,
          borderTopColor: selected ? '#8B0A39' : topColor,
          width: 200,
          height: 96,
        }}
      >
        {isMetric ? (
          <div className="px-3 pt-2 pb-1.5">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: statusColor }}
              />
              <h3 className="text-xs font-semibold text-bodyText truncate">{name}</h3>
            </div>
            {metricSparkline && (
              <div className="h-5 my-0.5">
                <Sparkline values={metricSparkline} color={statusColor} />
              </div>
            )}
            <div className="flex items-baseline justify-between mt-0.5">
              <span className="text-sm font-bold font-mono text-bodyText">{metricValue}</span>
              {metricTrend && (
                <span
                  className="text-[10px] font-mono font-semibold"
                  style={{ color: metricTrend.isGood ? '#1A7A4A' : '#C0392B' }}
                >
                  {metricTrend.direction === 'up' ? '▲' : '▼'} {metricTrend.value}
                </span>
              )}
            </div>
            {metricGoal && (
              <p className="text-[9px] text-mutedText mt-0.5">Goal: {metricGoal}</p>
            )}
          </div>
        ) : isConnection ? (
          <div className="px-3 py-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="inline-flex items-center justify-center h-6 w-6 rounded shrink-0 text-white text-[11px] font-black"
                style={{ backgroundColor: topColor }}
              >
                {name.charAt(0).toUpperCase()}
              </span>
              <h3 className="text-sm font-semibold text-bodyText truncate">{name}</h3>
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded border ${badge.cls}`}>
                {badge.label}
              </span>
              {connectionLabel && (
                <span className="text-[9px] text-mutedText italic">· {connectionLabel}</span>
              )}
            </div>
          </div>
        ) : (
          <div className="px-3 py-2.5">
            <h3 className={`font-semibold text-bodyText truncate ${isData ? 'text-sm' : 'text-xs'} mb-1`}>
              {name}
            </h3>
            <div className="flex items-center gap-1 flex-wrap">
              <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded border ${badge.cls}`}>
                {badge.label}
              </span>
            </div>
            {isData && recordCount != null && (
              <div className="mt-1.5 text-[10px] text-mutedText font-mono">
                {recordCount.toLocaleString()} records
              </div>
            )}
            {!isData && description && (
              <p className="mt-1.5 text-[10px] text-mutedText leading-snug line-clamp-2">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-border !w-1.5 !h-1.5 !border-0" />
    </>
  );
}

const nodeTypes = { object: ObjectNode };

type RawNode = BlueprintNodeData & { id: string };
type RawEdge = { from: string; to: string; label: string };

const RAW_NODES: RawNode[] = [
  // ── Tier 1 · Connections (8) ────────────────────────────────────────
  { id: 'c_salesforce', name: 'Salesforce', category: 'connection', source: 'Salesforce', connectionLabel: 'CRM' },
  { id: 'c_sap', name: 'SAP', category: 'connection', source: 'SAP', connectionLabel: 'ERP' },
  { id: 'c_quickbooks', name: 'QuickBooks', category: 'connection', source: 'QuickBooks', connectionLabel: 'Accounting' },
  { id: 'c_shopify', name: 'Shopify', category: 'connection', source: 'Shopify', connectionLabel: 'E-commerce' },
  { id: 'c_stripe', name: 'Stripe', category: 'connection', source: 'Stripe', connectionLabel: 'Payments' },
  { id: 'c_8x8', name: '8x8', category: 'connection', source: '8x8', connectionLabel: 'Telephony' },
  { id: 'c_mailchimp', name: 'Mailchimp', category: 'connection', source: 'Mailchimp', connectionLabel: 'Email marketing' },
  { id: 'c_slack', name: 'Slack', category: 'connection', source: 'Slack', connectionLabel: 'Messaging' },

  // ── Tier 2 · Data objects (12) ──────────────────────────────────────
  { id: 'lead', name: 'Lead', category: 'data', source: 'Salesforce', recordCount: 4218 },
  { id: 'account', name: 'Account', category: 'data', source: 'Salesforce', recordCount: 2847 },
  { id: 'contact', name: 'Contact', category: 'data', source: 'Salesforce', recordCount: 12483 },
  { id: 'opportunity', name: 'Opportunity', category: 'data', source: 'Salesforce', recordCount: 438 },
  { id: 'product', name: 'Product', category: 'data', source: 'SAP', recordCount: 3241 },
  { id: 'inventory', name: 'Inventory', category: 'data', source: 'SAP', recordCount: 15602 },
  { id: 'order', name: 'Order', category: 'data', source: 'Shopify', recordCount: 48213 },
  { id: 'shipment', name: 'Shipment', category: 'data', source: 'SAP', recordCount: 44128 },
  { id: 'invoice', name: 'Invoice', category: 'data', source: 'QuickBooks', recordCount: 47108 },
  { id: 'payment', name: 'Payment', category: 'data', source: 'QuickBooks', recordCount: 44862 },
  { id: 'call_log', name: 'Call Log', category: 'data', source: '8x8', recordCount: 28914 },
  { id: 'email_campaign', name: 'Email Campaign', category: 'data', source: 'Mailchimp', recordCount: 186 },
  { id: 'slack_message', name: 'Slack Message', category: 'data', source: 'Slack', recordCount: 91204 },

  // ── Tier 2.5 · Agents (4) ───────────────────────────────────────────
  {
    id: 'agent_revenue',
    name: 'Revenue Analyst',
    category: 'agent',
    description: 'Monitors bookings, billings, and collections across all systems.',
  },
  {
    id: 'agent_churn',
    name: 'Churn Watcher',
    category: 'agent',
    description: 'Reads engagement signals to flag at-risk accounts 90 days early.',
  },
  {
    id: 'agent_order',
    name: 'Order Processor',
    category: 'agent',
    description: 'Converts Shopify and EDI orders into invoices and payment schedules.',
  },
  {
    id: 'agent_dunning',
    name: 'Invoice Reminder',
    category: 'agent',
    description: 'Sends escalation-tiered reminders on overdue invoices via Slack and email.',
  },

  // ── Tier 3 · Metrics (6) ────────────────────────────────────────────
  {
    id: 'm_revenue',
    name: 'Monthly Revenue',
    category: 'metric',
    metricValue: '$1.42M',
    metricGoal: '$1.50M',
    metricStatus: 'at-risk',
    metricTrend: { direction: 'up', value: '+4.2%', isGood: true },
    metricSparkline: [1.18, 1.22, 1.21, 1.28, 1.33, 1.31, 1.38, 1.42],
  },
  {
    id: 'm_arr',
    name: 'ARR',
    category: 'metric',
    metricValue: '$16.8M',
    metricGoal: '$18.0M',
    metricStatus: 'at-risk',
    metricTrend: { direction: 'up', value: '+8%', isGood: true },
    metricSparkline: [14.2, 14.8, 15.1, 15.4, 15.9, 16.2, 16.5, 16.8],
  },
  {
    id: 'm_pipeline',
    name: 'Pipeline Value',
    category: 'metric',
    metricValue: '$8.6M',
    metricGoal: '$8.0M',
    metricStatus: 'on-track',
    metricTrend: { direction: 'up', value: '+12%', isGood: true },
    metricSparkline: [7.2, 7.4, 7.6, 7.8, 8.0, 8.1, 8.4, 8.6],
  },
  {
    id: 'm_winrate',
    name: 'Win Rate',
    category: 'metric',
    metricValue: '31%',
    metricGoal: '28%',
    metricStatus: 'on-track',
    metricTrend: { direction: 'up', value: '+3pp', isGood: true },
    metricSparkline: [26, 27, 27, 28, 29, 30, 30, 31],
  },
  {
    id: 'm_dso',
    name: 'DSO',
    category: 'metric',
    metricValue: '38d',
    metricGoal: '30d',
    metricStatus: 'off-track',
    metricTrend: { direction: 'up', value: '+3d', isGood: false },
    metricSparkline: [34, 33, 35, 34, 36, 37, 38, 38],
  },
  {
    id: 'm_health',
    name: 'Customer Health',
    category: 'metric',
    metricValue: '72',
    metricGoal: '≥75',
    metricStatus: 'at-risk',
    metricTrend: { direction: 'down', value: '-2', isGood: false },
    metricSparkline: [76, 77, 75, 74, 74, 73, 73, 72],
  },

  // ── Tier 4 · Dashboards / Reports (5) ───────────────────────────────
  {
    id: 'r_exec',
    name: 'Executive Dashboard',
    category: 'lens',
    description: 'Revenue, pipeline, DSO, and cash — one view for leadership.',
  },
  {
    id: 'r_sales',
    name: 'Sales Performance',
    category: 'lens',
    description: 'Opportunity velocity, win rate, and quota attainment by rep.',
  },
  {
    id: 'r_ar',
    name: 'AR Aging Report',
    category: 'lens',
    description: 'Overdue invoices by customer, age bucket, and risk score.',
  },
  {
    id: 'r_engagement',
    name: 'Customer Engagement',
    category: 'lens',
    description: 'Touchpoint heatmap and health score by account.',
  },
  {
    id: 'r_cashflow',
    name: 'Cash Flow Forecast',
    category: 'lens',
    description: 'Rolling 90-day inflow and outflow projection from invoices + payments.',
  },
];

const RAW_EDGES: RawEdge[] = [
  // Connection → Data
  { from: 'c_salesforce', to: 'lead', label: 'syncs' },
  { from: 'c_salesforce', to: 'account', label: 'syncs' },
  { from: 'c_salesforce', to: 'contact', label: 'syncs' },
  { from: 'c_salesforce', to: 'opportunity', label: 'syncs' },
  { from: 'c_sap', to: 'product', label: 'syncs' },
  { from: 'c_sap', to: 'inventory', label: 'syncs' },
  { from: 'c_sap', to: 'shipment', label: 'syncs' },
  { from: 'c_shopify', to: 'order', label: 'syncs' },
  { from: 'c_quickbooks', to: 'invoice', label: 'syncs' },
  { from: 'c_quickbooks', to: 'payment', label: 'syncs' },
  { from: 'c_stripe', to: 'payment', label: 'syncs' },
  { from: 'c_8x8', to: 'call_log', label: 'syncs' },
  { from: 'c_mailchimp', to: 'email_campaign', label: 'syncs' },
  { from: 'c_slack', to: 'slack_message', label: 'syncs' },

  // Data → Data
  { from: 'lead', to: 'account', label: 'converts to' },
  { from: 'account', to: 'opportunity', label: 'has' },
  { from: 'opportunity', to: 'order', label: 'closes to' },
  { from: 'order', to: 'shipment', label: 'ships' },
  { from: 'order', to: 'invoice', label: 'generates' },
  { from: 'invoice', to: 'payment', label: 'paid by' },
  { from: 'product', to: 'order', label: 'line item' },
  { from: 'product', to: 'inventory', label: 'tracked in' },

  // Data → Agent
  { from: 'invoice', to: 'agent_revenue', label: 'reasoned by' },
  { from: 'payment', to: 'agent_revenue', label: 'reasoned by' },
  { from: 'call_log', to: 'agent_churn', label: 'reasoned by' },
  { from: 'email_campaign', to: 'agent_churn', label: 'reasoned by' },
  { from: 'account', to: 'agent_churn', label: 'reasoned by' },
  { from: 'order', to: 'agent_order', label: 'reasoned by' },
  { from: 'invoice', to: 'agent_dunning', label: 'reasoned by' },

  // Slack Message → engagement + churn signal
  { from: 'slack_message', to: 'agent_churn', label: 'reasoned by' },
  { from: 'slack_message', to: 'r_engagement', label: 'displayed on' },

  // Data → Metric
  { from: 'invoice', to: 'm_revenue', label: 'rolls up to' },
  { from: 'payment', to: 'm_revenue', label: 'rolls up to' },
  { from: 'opportunity', to: 'm_arr', label: 'rolls up to' },
  { from: 'invoice', to: 'm_arr', label: 'rolls up to' },
  { from: 'opportunity', to: 'm_pipeline', label: 'rolls up to' },
  { from: 'opportunity', to: 'm_winrate', label: 'rolls up to' },
  { from: 'invoice', to: 'm_dso', label: 'rolls up to' },
  { from: 'payment', to: 'm_dso', label: 'rolls up to' },
  { from: 'account', to: 'm_health', label: 'rolls up to' },
  { from: 'call_log', to: 'm_health', label: 'rolls up to' },
  { from: 'email_campaign', to: 'm_health', label: 'rolls up to' },

  // Metric → Report
  { from: 'm_revenue', to: 'r_exec', label: 'displayed on' },
  { from: 'm_arr', to: 'r_exec', label: 'displayed on' },
  { from: 'm_pipeline', to: 'r_exec', label: 'displayed on' },
  { from: 'm_pipeline', to: 'r_sales', label: 'displayed on' },
  { from: 'm_winrate', to: 'r_sales', label: 'displayed on' },
  { from: 'm_dso', to: 'r_exec', label: 'displayed on' },
  { from: 'm_dso', to: 'r_ar', label: 'displayed on' },
  { from: 'm_health', to: 'r_exec', label: 'displayed on' },
  { from: 'm_health', to: 'r_engagement', label: 'displayed on' },

  // Data → Report direct
  { from: 'invoice', to: 'r_ar', label: 'displayed on' },
  { from: 'payment', to: 'r_cashflow', label: 'displayed on' },
  { from: 'invoice', to: 'r_cashflow', label: 'displayed on' },
  { from: 'account', to: 'r_sales', label: 'displayed on' },
  { from: 'opportunity', to: 'r_sales', label: 'displayed on' },
  { from: 'call_log', to: 'r_engagement', label: 'displayed on' },
  { from: 'email_campaign', to: 'r_engagement', label: 'displayed on' },
];

// Uniform card dimensions for every category — dagre uses these to lay out.
const CARD_W = 200;
const CARD_H = 96;
const NODE_W: Record<Category, number> = {
  connection: CARD_W,
  data: CARD_W,
  agent: CARD_W,
  lens: CARD_W,
  metric: CARD_W,
};
const NODE_H: Record<Category, number> = {
  connection: CARD_H,
  data: CARD_H,
  agent: CARD_H,
  lens: CARD_H,
  metric: CARD_H,
};

function layout(): { nodes: Node<BlueprintNodeData>[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'TB', nodesep: 24, ranksep: 70, marginx: 24, marginy: 28 });

  RAW_NODES.forEach((n) => {
    g.setNode(n.id, { width: NODE_W[n.category], height: NODE_H[n.category] });
  });
  RAW_EDGES.forEach((e) => g.setEdge(e.from, e.to));

  dagre.layout(g);

  const nodes: Node<BlueprintNodeData>[] = RAW_NODES.map((n) => {
    const pos = g.node(n.id);
    return {
      id: n.id,
      type: 'object',
      position: { x: pos.x - NODE_W[n.category] / 2, y: pos.y - NODE_H[n.category] / 2 },
      data: {
        name: n.name,
        category: n.category,
        source: n.source,
        recordCount: n.recordCount,
        description: n.description,
        connectionLabel: n.connectionLabel,
        metricValue: n.metricValue,
        metricGoal: n.metricGoal,
        metricStatus: n.metricStatus,
        metricTrend: n.metricTrend,
        metricSparkline: n.metricSparkline,
      },
      draggable: false,
    };
  });

  const edges: Edge[] = RAW_EDGES.map((e, i) => ({
    id: `e${i}`,
    source: e.from,
    target: e.to,
    type: 'smoothstep',
    animated: true,
    label: e.label,
    labelBgPadding: [3, 1.5],
    labelStyle: { fontSize: 9, fill: '#6B8299', fontWeight: 500 },
    labelBgStyle: { fill: '#FFFFFF', fillOpacity: 0.92 },
    style: { stroke: '#94A3B8', strokeWidth: 1.4 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 13,
      height: 13,
      color: '#94A3B8',
    },
  }));

  return { nodes, edges };
}

const DEFAULT_SELECTED_ID = 'invoice';

function BlueprintFlow() {
  const initial = useMemo(() => {
    const result = layout();
    return {
      edges: result.edges,
      nodes: result.nodes.map((n) =>
        n.id === DEFAULT_SELECTED_ID ? { ...n, selected: true } : n
      ),
    };
  }, []);
  const [nodes, , onNodesChange] = useNodesState<Node<BlueprintNodeData>>(initial.nodes);
  const [edges, , onEdgesChange] = useEdgesState(initial.edges);
  const { setCenter } = useReactFlow();

  const onInit = useCallback(() => {
    const node = initial.nodes.find((n) => n.id === DEFAULT_SELECTED_ID);
    if (!node) return;
    // Desktop: tight framing at 1.8x. Mobile: zoom out one step (1.8 / 1.2 = 1.5)
    // so the neighbors are visible given the narrower viewport.
    const isMobile =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(max-width: 767px)').matches;
    const zoom = isMobile ? 1.5 : 1.8;
    setCenter(
      node.position.x + CARD_W / 2,
      node.position.y + CARD_H / 2,
      { zoom, duration: 0 }
    );
  }, [initial.nodes, setCenter]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      onInit={onInit}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      panOnDrag={false}
      panOnScroll={false}
      zoomOnScroll={false}
      zoomOnPinch={false}
      zoomOnDoubleClick={false}
      preventScrolling={false}
      proOptions={{ hideAttribution: true }}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#D4DDE8" />
    </ReactFlow>
  );
}

export function BlueprintDemo() {
  return (
    <div
      className="blueprint-demo rounded-lg border border-border bg-offWhite shadow-xl overflow-hidden"
      style={{ height: 560 }}
    >
      <style jsx global>{`
        .blueprint-demo .react-flow__node {
          border: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
        .blueprint-demo .react-flow__node.selected,
        .blueprint-demo .react-flow__node:focus,
        .blueprint-demo .react-flow__node:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <ReactFlowProvider>
        <BlueprintFlow />
      </ReactFlowProvider>
    </div>
  );
}
