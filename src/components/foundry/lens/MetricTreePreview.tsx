'use client';

import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
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
import { useIndustry } from '@/context/IndustryContext';
import { lensContentByIndustry } from '@/data/foundryLensContent';

type Level = 'L1' | 'L2' | 'L3' | 'L4';
type Status = 'on-track' | 'at-risk' | 'off-track';

type MetricNodeData = {
  name: string;
  value: string;
  goal: string;
  trend: { direction: 'up' | 'down'; value: string; isGood: boolean };
  status: Status;
  level: Level;
  spark: number[];
};

// Uniform rectangular cards matching Blueprint (200×96). Tier signaled by top-border color only.
const CARD_W = 200;
const CARD_H = 96;
const LEVEL_STYLE: Record<Level, { top: string; width: number; height: number; fontSize: string }> = {
  L1: { top: '#0F1A2B', width: CARD_W, height: CARD_H, fontSize: '12px' },
  L2: { top: '#2563EB', width: CARD_W, height: CARD_H, fontSize: '12px' },
  L3: { top: '#06B6D4', width: CARD_W, height: CARD_H, fontSize: '12px' },
  L4: { top: '#94A3B8', width: CARD_W, height: CARD_H, fontSize: '12px' },
};

const STATUS_DOT: Record<Status, string> = {
  'on-track': '#10B981',
  'at-risk': '#F59E0B',
  'off-track': '#EF4444',
};

function SparklinePath({ values, status, width, height }: { values: number[]; status: Status; width: number; height: number }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = width / (values.length - 1);
  const points = values.map((v, i) => `${(i * step).toFixed(1)},${(height - ((v - min) / range) * height).toFixed(1)}`).join(' ');
  const color = STATUS_DOT[status];
  const area = `0,${height} ${points} ${width},${height}`;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" style={{ width: '100%', height }} aria-hidden="true">
      <polygon points={area} fill={color} opacity={0.14} />
      <polyline points={points} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MetricNode({ data, selected }: NodeProps<Node<MetricNodeData>>) {
  const style = LEVEL_STYLE[data.level];
  const dot = STATUS_DOT[data.status];
  const isGood = data.trend.isGood;
  return (
    <div
      style={{
        width: style.width,
        height: style.height,
        borderTopWidth: 2,
        borderTopColor: style.top,
      }}
      className={`rounded-lg bg-white overflow-hidden shadow-sm transition-all flex flex-col cursor-pointer ${
        selected
          ? 'border border-crimson ring-2 ring-crimson/30 shadow-md'
          : 'border border-rule'
      }`}
    >
      {/* BT layout: source (outgoing edge) leaves the top; target (incoming) arrives at the bottom. */}
      <Handle type="source" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />
      <div className="px-3 pt-2 pb-1.5 flex flex-col gap-1 flex-1 min-h-0">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: dot }} />
          <p className="text-xs font-semibold text-navy leading-tight truncate">
            {data.name}
          </p>
        </div>
        <div className="h-5 my-0.5">
          <SparklinePath values={data.spark} status={data.status} width={style.width - 24} height={20} />
        </div>
        <div className="flex items-baseline justify-between gap-1.5">
          <span className="text-sm font-bold font-mono text-navy">{data.value}</span>
          <span className={`text-[10px] font-mono font-semibold ${isGood ? 'text-emerald-600' : 'text-red-600'}`}>
            {data.trend.direction === 'up' ? '▲' : '▼'} {data.trend.value}
          </span>
        </div>
        <p className="text-[9px] text-mute">
          Goal: <span className="font-mono text-ink">{data.goal}</span>
        </p>
      </div>
      <Handle type="target" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />
    </div>
  );
}

const nodeTypes = { metric: MetricNode };

type RawMetric = { id: string } & MetricNodeData;

const RAW_NODES: RawMetric[] = [
  // ── L1 · Top-level business outcomes (4) ────────────────────────────
  {
    id: 'monthly_revenue', name: 'Monthly Revenue', level: 'L1', status: 'at-risk',
    value: '$1.42M', goal: '$1.50M', trend: { direction: 'up', value: '+4.2%', isGood: true },
    spark: [1.18, 1.22, 1.21, 1.28, 1.33, 1.31, 1.38, 1.42],
  },
  {
    id: 'arr', name: 'ARR', level: 'L1', status: 'at-risk',
    value: '$16.8M', goal: '$18.0M', trend: { direction: 'up', value: '+8%', isGood: true },
    spark: [14.2, 14.8, 15.1, 15.4, 15.9, 16.2, 16.5, 16.8],
  },
  {
    id: 'gross_margin', name: 'Gross Margin', level: 'L1', status: 'on-track',
    value: '58%', goal: '≥55%', trend: { direction: 'up', value: '+1.2pp', isGood: true },
    spark: [55, 55.5, 56, 56.5, 57, 57.2, 57.8, 58],
  },
  {
    id: 'cash', name: 'Cash Position', level: 'L1', status: 'on-track',
    value: '$4.2M', goal: '$4.0M', trend: { direction: 'up', value: '+3%', isGood: true },
    spark: [3.8, 3.9, 3.85, 4.0, 4.05, 4.1, 4.15, 4.2],
  },

  // ── L2 · Business drivers (9) ───────────────────────────────────────
  {
    id: 'pipeline', name: 'Pipeline Value', level: 'L2', status: 'on-track',
    value: '$8.6M', goal: '$8.0M', trend: { direction: 'up', value: '+12%', isGood: true },
    spark: [7.2, 7.4, 7.6, 7.8, 8.0, 8.1, 8.4, 8.6],
  },
  {
    id: 'win_rate', name: 'Win Rate', level: 'L2', status: 'on-track',
    value: '31%', goal: '≥28%', trend: { direction: 'up', value: '+3pp', isGood: true },
    spark: [26, 27, 27, 28, 29, 30, 30, 31],
  },
  {
    id: 'avg_deal', name: 'Avg Deal Size', level: 'L2', status: 'at-risk',
    value: '$48K', goal: '$52K', trend: { direction: 'up', value: '+2%', isGood: true },
    spark: [46, 46.5, 47, 47, 47.5, 47.8, 48, 48],
  },
  {
    id: 'nrr', name: 'NRR', level: 'L2', status: 'on-track',
    value: '108%', goal: '≥105%', trend: { direction: 'up', value: '+2pp', isGood: true },
    spark: [104, 105, 105, 106, 106, 107, 107.5, 108],
  },
  {
    id: 'ltv', name: 'Customer LTV', level: 'L2', status: 'on-track',
    value: '$142K', goal: '≥$130K', trend: { direction: 'up', value: '+6%', isGood: true },
    spark: [128, 131, 133, 135, 137, 139, 140, 142],
  },
  {
    id: 'churn', name: 'Churn Rate', level: 'L2', status: 'at-risk',
    value: '2.4%', goal: '≤2.0%', trend: { direction: 'up', value: '+0.4pp', isGood: false },
    spark: [2.0, 2.0, 2.1, 2.1, 2.2, 2.3, 2.3, 2.4],
  },
  {
    id: 'cogs', name: 'COGS', level: 'L2', status: 'at-risk',
    value: '$620K', goal: '≤$600K', trend: { direction: 'up', value: '+2.1%', isGood: false },
    spark: [598, 602, 605, 608, 612, 615, 618, 620],
  },
  {
    id: 'dso', name: 'DSO', level: 'L2', status: 'off-track',
    value: '38d', goal: '≤30d', trend: { direction: 'up', value: '+3d', isGood: false },
    spark: [34, 33, 35, 34, 36, 37, 38, 38],
  },
  {
    id: 'ar_balance', name: 'AR Balance', level: 'L2', status: 'at-risk',
    value: '$312K', goal: '≤$280K', trend: { direction: 'up', value: '+14%', isGood: false },
    spark: [270, 280, 285, 290, 295, 302, 308, 312],
  },

  // ── L3 · Operational drivers (14) ───────────────────────────────────
  {
    id: 'leads', name: 'Leads Generated', level: 'L3', status: 'on-track',
    value: '847/wk', goal: '≥700', trend: { direction: 'up', value: '+18%', isGood: true },
    spark: [680, 710, 720, 760, 780, 810, 830, 847],
  },
  {
    id: 'lead_conv', name: 'Lead-to-Opp', level: 'L3', status: 'at-risk',
    value: '24%', goal: '≥28%', trend: { direction: 'down', value: '-2pp', isGood: false },
    spark: [28, 27, 27, 26, 26, 25, 25, 24],
  },
  {
    id: 'sales_cycle', name: 'Sales Cycle', level: 'L3', status: 'at-risk',
    value: '48d', goal: '≤42d', trend: { direction: 'up', value: '+3d', isGood: false },
    spark: [42, 43, 44, 44, 45, 46, 47, 48],
  },
  {
    id: 'active_opps', name: 'Active Opportunities', level: 'L3', status: 'on-track',
    value: '438', goal: '≥400', trend: { direction: 'up', value: '+12%', isGood: true },
    spark: [385, 392, 402, 410, 418, 425, 432, 438],
  },
  {
    id: 'health', name: 'Customer Health', level: 'L3', status: 'at-risk',
    value: '72', goal: '≥75', trend: { direction: 'down', value: '-2', isGood: false },
    spark: [76, 77, 75, 74, 74, 73, 73, 72],
  },
  {
    id: 'nps', name: 'NPS', level: 'L3', status: 'at-risk',
    value: '42', goal: '≥50', trend: { direction: 'down', value: '-1', isGood: false },
    spark: [48, 47, 46, 45, 44, 43, 43, 42],
  },
  {
    id: 'renewal', name: 'Renewal Rate', level: 'L3', status: 'on-track',
    value: '92%', goal: '≥90%', trend: { direction: 'up', value: '+1pp', isGood: true },
    spark: [89, 90, 90, 91, 91, 91.5, 92, 92],
  },
  {
    id: 'cac', name: 'CAC', level: 'L3', status: 'at-risk',
    value: '$1,220', goal: '≤$1,000', trend: { direction: 'up', value: '+8%', isGood: false },
    spark: [1080, 1120, 1150, 1170, 1190, 1200, 1210, 1220],
  },
  {
    id: 'collections', name: 'Collections Activity', level: 'L3', status: 'on-track',
    value: '38/wk', goal: '≥30', trend: { direction: 'up', value: '+10%', isGood: true },
    spark: [30, 32, 33, 34, 35, 36, 37, 38],
  },
  {
    id: 'payment_velocity', name: 'Payment Velocity', level: 'L3', status: 'at-risk',
    value: '32d', goal: '≤28d', trend: { direction: 'up', value: '+1d', isGood: false },
    spark: [29, 30, 30, 31, 31, 31.5, 32, 32],
  },
  {
    id: 'inventory_turns', name: 'Inventory Turns', level: 'L3', status: 'on-track',
    value: '8.4x', goal: '≥8.0x', trend: { direction: 'up', value: '+0.6x', isGood: true },
    spark: [7.2, 7.4, 7.6, 7.8, 7.9, 8.1, 8.3, 8.4],
  },
  {
    id: 'order_fulfill', name: 'Order Fulfillment', level: 'L3', status: 'on-track',
    value: '97%', goal: '≥95%', trend: { direction: 'up', value: '+0.5pp', isGood: true },
    spark: [95, 95.5, 96, 96, 96.5, 96.8, 97, 97],
  },
  {
    id: 'throughput', name: 'Throughput', level: 'L3', status: 'at-risk',
    value: '847 u/d', goal: '≥900', trend: { direction: 'up', value: '+2.8%', isGood: true },
    spark: [790, 810, 800, 820, 815, 830, 824, 847],
  },
  {
    id: 'oee', name: 'OEE', level: 'L3', status: 'off-track',
    value: '74.3%', goal: '≥80%', trend: { direction: 'down', value: '-4.1pp', isGood: false },
    spark: [82.1, 81.5, 80.2, 79.8, 78.4, 77.9, 75.8, 74.3],
  },

  // ── L4 · Raw inputs (8) ─────────────────────────────────────────────
  {
    id: 'call_volume', name: 'Call Volume', level: 'L4', status: 'on-track',
    value: '412/wk', goal: '≥350', trend: { direction: 'up', value: '+8%', isGood: true },
    spark: [360, 370, 380, 385, 395, 400, 408, 412],
  },
  {
    id: 'email_open', name: 'Email Open Rate', level: 'L4', status: 'at-risk',
    value: '28%', goal: '≥30%', trend: { direction: 'down', value: '-1pp', isGood: false },
    spark: [30, 29.5, 29, 29, 28.5, 28.5, 28, 28],
  },
  {
    id: 'web_sessions', name: 'Web Sessions', level: 'L4', status: 'on-track',
    value: '12.4K', goal: '≥10K', trend: { direction: 'up', value: '+15%', isGood: true },
    spark: [10.1, 10.5, 10.8, 11.2, 11.5, 11.9, 12.1, 12.4],
  },
  {
    id: 'rep_outbound', name: 'Rep Outbound', level: 'L4', status: 'on-track',
    value: '184/rep', goal: '≥150', trend: { direction: 'up', value: '+2%', isGood: true },
    spark: [168, 172, 174, 178, 180, 181, 182, 184],
  },
  {
    id: 'fcr', name: 'FCR', level: 'L4', status: 'at-risk',
    value: '76%', goal: '≥80%', trend: { direction: 'down', value: '-2pp', isGood: false },
    spark: [80, 79, 79, 78, 78, 77, 77, 76],
  },
  {
    id: 'stockouts', name: 'Stock-outs', level: 'L4', status: 'at-risk',
    value: '3/wk', goal: '0', trend: { direction: 'up', value: '+1', isGood: false },
    spark: [1, 1, 2, 2, 2, 3, 3, 3],
  },
  {
    id: 'support_tickets', name: 'Support Tickets', level: 'L4', status: 'on-track',
    value: '124/wk', goal: '≤140', trend: { direction: 'down', value: '-8%', isGood: true },
    spark: [135, 134, 132, 130, 128, 127, 125, 124],
  },
  {
    id: 'downtime', name: 'Downtime', level: 'L4', status: 'off-track',
    value: '14.2 h/wk', goal: '≤8', trend: { direction: 'up', value: '+22%', isGood: false },
    spark: [11.5, 12.0, 12.4, 12.8, 13.2, 13.5, 13.9, 14.2],
  },
];

type RawEdge = { from: string; to: string; label: string };

const RAW_EDGES: RawEdge[] = [
  // ── L2 → L1 (10) ─────────────────────────────────────────────────────
  { from: 'monthly_revenue', to: 'arr', label: 'annualizes to' },
  { from: 'pipeline', to: 'arr', label: 'forecasts' },
  { from: 'win_rate', to: 'monthly_revenue', label: 'drives' },
  { from: 'avg_deal', to: 'monthly_revenue', label: 'drives' },
  { from: 'nrr', to: 'arr', label: 'drives' },
  { from: 'ltv', to: 'arr', label: 'supports' },
  { from: 'churn', to: 'arr', label: 'erodes' },
  { from: 'cogs', to: 'gross_margin', label: 'determines' },
  { from: 'dso', to: 'cash', label: 'constrains' },
  { from: 'ar_balance', to: 'cash', label: 'impacts' },

  // ── L3 → L2 (14) ─────────────────────────────────────────────────────
  { from: 'leads', to: 'pipeline', label: 'feeds' },
  { from: 'lead_conv', to: 'pipeline', label: 'converts' },
  { from: 'active_opps', to: 'pipeline', label: 'contributes to' },
  { from: 'sales_cycle', to: 'win_rate', label: 'affects' },
  { from: 'health', to: 'churn', label: 'predicts' },
  { from: 'nps', to: 'churn', label: 'predicts' },
  { from: 'renewal', to: 'nrr', label: 'drives' },
  { from: 'renewal', to: 'churn', label: 'inverse of' },
  { from: 'cac', to: 'ltv', label: 'payback affects' },
  { from: 'collections', to: 'dso', label: 'reduces' },
  { from: 'payment_velocity', to: 'dso', label: 'determines' },
  { from: 'payment_velocity', to: 'ar_balance', label: 'determines' },
  { from: 'inventory_turns', to: 'cogs', label: 'controls' },
  { from: 'throughput', to: 'cogs', label: 'amortizes' },
  { from: 'order_fulfill', to: 'churn', label: 'affects' },

  // ── L4 → L3 (12) ─────────────────────────────────────────────────────
  { from: 'call_volume', to: 'leads', label: 'generates' },
  { from: 'email_open', to: 'leads', label: 'generates' },
  { from: 'web_sessions', to: 'leads', label: 'generates' },
  { from: 'rep_outbound', to: 'active_opps', label: 'creates' },
  { from: 'rep_outbound', to: 'leads', label: 'creates' },
  { from: 'fcr', to: 'health', label: 'drives' },
  { from: 'support_tickets', to: 'health', label: 'inverse of' },
  { from: 'support_tickets', to: 'nps', label: 'affects' },
  { from: 'stockouts', to: 'order_fulfill', label: 'reduces' },
  { from: 'oee', to: 'throughput', label: 'drives' },
  { from: 'downtime', to: 'oee', label: 'reduces' },
  { from: 'downtime', to: 'throughput', label: 'blocks' },
];

/* ============================================================================
 * Detail sidebar — opens on node click, lives inside the graph's bounding box
 * ==========================================================================*/

function XIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
  'on-track': { label: 'On Track', className: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  'at-risk': { label: 'At Risk', className: 'bg-amber-50 text-amber-700 border-amber-200' },
  'off-track': { label: 'Off Track', className: 'bg-red-50 text-red-700 border-red-200' },
};

type SidebarProps = {
  metric: MetricNodeData;
  upstreamStatuses: Status[];
  downstreamStatuses: Status[];
  onClose: () => void;
};

function MetricDetailSidebar({ metric, upstreamStatuses, downstreamStatuses, onClose }: SidebarProps) {
  const badge = STATUS_BADGE[metric.status];
  const dot = STATUS_DOT[metric.status];
  const isGood = metric.trend.isGood;

  return (
    <motion.div
      initial={{ x: 340, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 340, opacity: 0 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="absolute right-3 top-3 bottom-3 w-[320px] z-30 flex flex-col bg-white/95 backdrop-blur-sm border border-rule rounded-lg shadow-lg overflow-hidden"
    >
      {/* Header */}
      <div className="px-3.5 py-3 border-b border-rule flex items-start justify-between shrink-0">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: dot }} />
            <p className="text-sm font-semibold text-navy truncate">{metric.name}</p>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${badge.className}`}>
              {badge.label}
            </span>
            <span className="h-2 rounded-sm bg-mute/30 w-14" />
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="h-6 w-6 flex items-center justify-center rounded hover:bg-cream text-mute shrink-0"
          aria-label="Close"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-3.5 py-3 flex flex-col gap-4">
        {/* Larger sparkline */}
        <div className="bg-cream/60 rounded-md p-2.5" style={{ height: 80 }}>
          <SparklinePath values={metric.spark} status={metric.status} width={260} height={60} />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="bg-cream border border-rule rounded px-2 py-1.5">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-mute">Current</p>
            <p className="text-[11px] font-mono font-bold text-navy mt-0.5 truncate">{metric.value}</p>
          </div>
          <div className="bg-cream border border-rule rounded px-2 py-1.5">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-mute">Goal</p>
            <p className="text-[11px] font-mono text-ink mt-0.5 truncate">{metric.goal}</p>
          </div>
          <div className="bg-cream border border-rule rounded px-2 py-1.5">
            <p className="text-[8px] font-semibold uppercase tracking-wider text-mute">Trend</p>
            <p className={`text-[11px] font-mono font-semibold mt-0.5 ${isGood ? 'text-emerald-600' : 'text-red-600'}`}>
              {metric.trend.direction === 'up' ? '▲' : '▼'} {metric.trend.value}
            </p>
          </div>
        </div>

        {/* What Drives This */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-mute mb-1.5">
            What drives this
          </p>
          {upstreamStatuses.length === 0 ? (
            <p className="text-[10px] italic text-mute">Raw input · no upstream drivers</p>
          ) : (
            <div className="flex flex-col gap-1">
              {upstreamStatuses.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-cream/50">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_DOT[s] }} />
                  <span className="h-2 rounded-sm bg-navy/65 flex-1" />
                  <span className="h-2 rounded-sm bg-mute/30 w-8" />
                  <ArrowRightIcon className="h-2.5 w-2.5 text-mute" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* What This Drives */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-mute mb-1.5">
            What this drives
          </p>
          {downstreamStatuses.length === 0 ? (
            <p className="text-[10px] italic text-mute">Terminal outcome · no downstream</p>
          ) : (
            <div className="flex flex-col gap-1">
              {downstreamStatuses.slice(0, 3).map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 px-1.5 py-1 rounded hover:bg-cream/50">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_DOT[s] }} />
                  <span className="h-2 rounded-sm bg-navy/65 flex-1" />
                  <span className="h-2 rounded-sm bg-mute/30 w-8" />
                  <ArrowRightIcon className="h-2.5 w-2.5 text-mute" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Otto's Analysis — skeleton paragraph */}
        <div>
          <p className="text-[9px] font-bold uppercase tracking-widest text-mute mb-1.5">
            Otto&apos;s analysis
          </p>
          <div className="flex flex-col gap-1.5">
            <div className="h-2 rounded-sm bg-navy/60 w-full" />
            <div className="h-2 rounded-sm bg-navy/55 w-11/12" />
            <div className="h-2 rounded-sm bg-navy/50 w-10/12" />
            <div className="h-2 rounded-sm bg-navy/45 w-8/12" />
          </div>
        </div>
      </div>

      {/* Ask Otto footer */}
      <div className="px-3.5 py-3 border-t border-rule shrink-0">
        <div
          className="flex items-center justify-center gap-1.5 rounded border border-blue-200 bg-blue-50 text-blue-700 text-[11px] font-semibold py-1.5 select-none"
          aria-hidden="true"
        >
          <BotIcon className="h-3 w-3" />
          Ask Otto about this metric
        </div>
      </div>
    </motion.div>
  );
}

function layout(): { nodes: Node<MetricNodeData>[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: 'BT', nodesep: 22, ranksep: 70, marginx: 24, marginy: 28 });
  RAW_NODES.forEach((n) => {
    const s = LEVEL_STYLE[n.level];
    g.setNode(n.id, { width: s.width, height: s.height });
  });
  RAW_EDGES.forEach((e) => g.setEdge(e.from, e.to));
  dagre.layout(g);

  const nodes: Node<MetricNodeData>[] = RAW_NODES.map((n) => {
    const pos = g.node(n.id);
    const s = LEVEL_STYLE[n.level];
    return {
      id: n.id,
      type: 'metric',
      position: { x: pos.x - s.width / 2, y: pos.y - s.height / 2 },
      data: {
        name: n.name,
        value: n.value,
        goal: n.goal,
        trend: n.trend,
        status: n.status,
        level: n.level,
        spark: n.spark,
      },
      draggable: false,
    };
  });

  // Edges match the Blueprint demo exactly: uniform gray, all animated, smoothstep.
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

const DEFAULT_SELECTED_ID = 'active_opps';

function MetricTreeFlow() {
  const initial = useMemo(() => {
    const result = layout();
    return {
      edges: result.edges,
      nodes: result.nodes.map((n) =>
        n.id === DEFAULT_SELECTED_ID ? { ...n, selected: true } : n
      ),
    };
  }, []);
  const [nodes, , onNodesChange] = useNodesState<Node<MetricNodeData>>(initial.nodes);
  const [edges, , onEdgesChange] = useEdgesState(initial.edges);
  const [selectedId, setSelectedId] = useState<string | null>(DEFAULT_SELECTED_ID);
  const { fitView, setCenter } = useReactFlow();

  const resetView = useCallback(() => {
    fitView({ padding: 0.15, duration: 500, minZoom: 0.35 });
  }, [fitView]);

  const focusNode = useCallback(
    (nodeId: string, duration: number) => {
      const node = initial.nodes.find((n) => n.id === nodeId);
      if (!node) return;
      // The sidebar takes ~332px on the right (320px width + 12px inset).
      // Shift the viewport center to the right of the node by half the sidebar's
      // screen width so the node renders horizontally centered within the VISIBLE
      // (un-covered) portion of the graph.
      const zoom = 1.6;
      const SIDEBAR_SCREEN_PX = 332;
      const offsetFlowX = SIDEBAR_SCREEN_PX / 2 / zoom;
      setCenter(
        node.position.x + CARD_W / 2 + offsetFlowX,
        node.position.y + CARD_H / 2,
        { zoom, duration }
      );
    },
    [initial.nodes, setCenter]
  );

  const onInit = useCallback(() => {
    focusNode(DEFAULT_SELECTED_ID, 0);
  }, [focusNode]);

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedId(node.id);
      focusNode(node.id, 500);
    },
    [focusNode]
  );

  const onPaneClick = useCallback(() => {
    setSelectedId(null);
    resetView();
  }, [resetView]);

  const closeSidebar = useCallback(() => {
    setSelectedId(null);
    resetView();
  }, [resetView]);

  const selectedMetric = selectedId ? RAW_NODES.find((n) => n.id === selectedId) ?? null : null;
  const upstreamStatuses: Status[] = selectedId
    ? RAW_EDGES.filter((e) => e.to === selectedId)
        .map((e) => RAW_NODES.find((n) => n.id === e.from)?.status)
        .filter((s): s is Status => Boolean(s))
    : [];
  const downstreamStatuses: Status[] = selectedId
    ? RAW_EDGES.filter((e) => e.from === selectedId)
        .map((e) => RAW_NODES.find((n) => n.id === e.to)?.status)
        .filter((s): s is Status => Boolean(s))
    : [];

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onInit={onInit}
        fitViewOptions={{ padding: 0.12, minZoom: 0.35 }}
        minZoom={0.2}
        maxZoom={1.8}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        panOnDrag
        zoomOnScroll={false}
        zoomOnPinch
        zoomOnDoubleClick
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background variant={BackgroundVariant.Dots} gap={18} size={1} color="#D4DDE8" />
        <Controls
          position="bottom-right"
          showInteractive={false}
          className="!shadow-md !border !border-rule !rounded-md !overflow-hidden"
        />
      </ReactFlow>
      <AnimatePresence>
        {selectedMetric && (
          <MetricDetailSidebar
            key={selectedMetric.id}
            metric={selectedMetric}
            upstreamStatuses={upstreamStatuses}
            downstreamStatuses={downstreamStatuses}
            onClose={closeSidebar}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export function MetricTreePreview() {
  const { industryId } = useIndustry();
  const spec = lensContentByIndustry[industryId].metricTree;
  return (
    <div
      className="metric-tree-demo relative rounded-lg border border-rule bg-cream overflow-hidden"
      style={{ height: 560 }}
    >
      <div className="absolute top-3 left-3 z-10 pointer-events-none bg-white/95 backdrop-blur-sm border border-rule rounded-md px-3 py-2 shadow-sm">
        <p className="text-[10px] uppercase tracking-widest text-mute">{spec.eyebrow}</p>
        <p className="text-xs font-semibold text-navy leading-tight">{spec.title}</p>
        <p className="text-[10px] text-mute mt-0.5 max-w-[280px]">{spec.subtitle}</p>
      </div>
      <style jsx global>{`
        .metric-tree-demo .react-flow__node {
          border: none !important;
          background: transparent !important;
          padding: 0 !important;
        }
        .metric-tree-demo .react-flow__node.selected,
        .metric-tree-demo .react-flow__node:focus,
        .metric-tree-demo .react-flow__node:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      <ReactFlowProvider>
        <MetricTreeFlow />
      </ReactFlowProvider>
    </div>
  );
}
