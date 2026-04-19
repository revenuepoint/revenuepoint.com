'use client';

import { AnimatePresence, motion } from 'framer-motion';

type Props = { index: number | null };

type PreviewKind = 'kpi' | 'chart' | 'dashboard';

type ReportConfig = {
  title: string;
  chip: string;
  chipClass: string;
  accent: string;
  accentTint: string;
  previewKind: PreviewKind;
  summary: string[];
  findings: string[];
  actions: string[];
  methodology: string;
  kpis: Array<{ label: string; value: string; delta: string; tone: 'up' | 'down' | 'flat' }>;
  segments: Array<{ label: string; value: string; delta: string; tone: 'up' | 'down' }>;
  appendixTitle: string;
  appendixRows: Array<{ label: string; value: string }>;
};

const REPORTS: Record<number, ReportConfig> = {
  0: {
    title: 'Revenue by Segment · Last 30d',
    chip: 'Finance',
    chipClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accent: '#059669',
    accentTint: '#05966915',
    previewKind: 'kpi',
    summary: [
      'Total revenue closed the month at $362.0K — up 8.4% MoM and 12.1% YoY. Enterprise continues to lead, contributing 50% of total revenue against a strong +12.8% growth rate.',
      'The big shift this month: Channel partners delivered $34.8K, the first time they have exceeded $30K in three quarters. SMB dipped 2.1% MoM, primarily seasonal. Mid-Market held steady with a modest +4.3% MoM tick.',
    ],
    findings: [
      'Enterprise revenue concentration ticked up to 50% (vs 44% last quarter) — worth tracking.',
      'Channel acceleration is the headline. Partner-sourced deals grew from 8 to 14 in 30 days.',
      'SMB softness is seasonal; cohort analysis shows Q1 SMB always dips ~3%.',
      'Net new logos +14 this month vs the 10-logo target, driven by enterprise and channel.',
    ],
    actions: [
      'Double down on the two channel partners delivering the majority of new volume.',
      'Run a Q2 retention program for SMB to offset the seasonal softness.',
      'Flag enterprise concentration risk for the next board deck.',
    ],
    methodology:
      'Revenue pulled from QuickBooks closed-won opportunities and invoiced amounts through Apr 30, reconciled against Salesforce opportunity records. Segment definitions follow the internal CSM tiering. Retention measured on a rolling 12-month cohort.',
    kpis: [
      { label: 'Total revenue', value: '$362.0K', delta: '+8.4% MoM', tone: 'up' },
      { label: 'New logos', value: '14', delta: '+40%', tone: 'up' },
      { label: 'Avg deal size', value: '$25.8K', delta: '+12%', tone: 'up' },
      { label: 'Gross churn', value: '1.8%', delta: '-0.4pp', tone: 'up' },
    ],
    segments: [
      { label: 'Enterprise', value: '$182.4K', delta: '+12.8%', tone: 'up' },
      { label: 'Mid-Market', value: '$96.1K', delta: '+4.3%', tone: 'up' },
      { label: 'SMB', value: '$48.7K', delta: '−2.1%', tone: 'down' },
      { label: 'Channel', value: '$34.8K', delta: '+7.6%', tone: 'up' },
    ],
    appendixTitle: 'Appendix A · Top accounts by revenue',
    appendixRows: [
      { label: 'Pacific NW Construction', value: '$42.1K' },
      { label: 'Sierra Mining Co.', value: '$38.6K' },
      { label: 'Coastal Fabrication', value: '$29.4K' },
      { label: 'Blue Ridge Distributors', value: '$24.8K' },
      { label: 'Valley Steel Works', value: '$21.2K' },
      { label: 'Summit Industrial', value: '$19.1K' },
      { label: 'Tribeca Logistics', value: '$16.4K' },
      { label: 'Harbor Industrial', value: '$14.9K' },
      { label: 'East Bay Welding', value: '$12.7K' },
    ],
  },
  4: {
    title: 'Pipeline Forecast · Q2',
    chip: 'Sales & CRM',
    chipClass: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    accent: '#0891b2',
    accentTint: '#0891b215',
    previewKind: 'chart',
    summary: [
      'Q2 pipeline stands at $1.84M across 8 opportunities, with a weighted forecast of $1.12M — tracking 12% ahead of the $1.0M Q2 target. Pacific NW Construction ($340K) and Coastal Fabrication ($165K) are the two most likely to close in April.',
      'Pipeline velocity is up 18% vs Q4, and the win rate held at 31% (target 28%). The concentration risk to watch: 42% of pipeline now sits in a single stage (Negotiation).',
    ],
    findings: [
      'Negotiation stage holds the strongest near-term conversion bucket — $770K across four opportunities.',
      'Proposal dwell time extended to 21 days vs 14-day target. Three of four slow proposals belong to the same rep.',
      'Discovery funnel shrank 12% QoQ. Lead-gen campaigns need to refill the top of the funnel by mid-May.',
      'Win rate is steady at 31%, but the weighted value per open opportunity has grown 22% QoQ.',
    ],
    actions: [
      'Prioritize Pacific NW + Coastal for April close (combined $505K).',
      'Templated proposal framework for the rep running slow — coach and re-run in two weeks.',
      'Launch a Q2 lead-gen campaign to rebuild Discovery before June.',
    ],
    methodology:
      'Opportunity snapshot taken from Salesforce at 10:30 on Apr 1. Stage-conversion rates computed on the trailing 12 months of closed opportunities (n=118). Velocity measured as median days-per-stage. Weighted forecast uses stage-specific probabilities calibrated against Q4 2025 actuals.',
    kpis: [
      { label: 'Pipeline', value: '$1.84M', delta: '+18% QoQ', tone: 'up' },
      { label: 'Weighted', value: '$1.12M', delta: '+22%', tone: 'up' },
      { label: 'Avg deal', value: '$230K', delta: '+6%', tone: 'up' },
      { label: 'Win rate', value: '31%', delta: '+3pp', tone: 'up' },
    ],
    segments: [
      { label: 'Qualification', value: '$380K', delta: '+6%', tone: 'up' },
      { label: 'Proposal', value: '$540K', delta: '+14%', tone: 'up' },
      { label: 'Negotiation', value: '$770K', delta: '+24%', tone: 'up' },
      { label: 'Closed Won', value: '$150K', delta: '+8%', tone: 'up' },
    ],
    appendixTitle: 'Appendix B · Open opportunities (top 10)',
    appendixRows: [
      { label: 'Pacific NW · Negotiation', value: '$340K · Apr 22' },
      { label: 'Coastal Fab. · Negotiation', value: '$165K · Apr 28' },
      { label: 'Sierra Mining · Proposal', value: '$220K · May 12' },
      { label: 'Blue Ridge · Proposal', value: '$185K · May 06' },
      { label: 'Valley Steel · Qualification', value: '$142K · Jun 03' },
      { label: 'Summit Ind. · Proposal', value: '$128K · May 19' },
      { label: 'Harbor Ind. · Qualification', value: '$96K · Jun 10' },
      { label: 'East Bay · Negotiation', value: '$88K · May 02' },
      { label: 'Tribeca · Qualification', value: '$72K · Jun 24' },
    ],
  },
  8: {
    title: 'OEE by Line · Monthly',
    chip: 'Production',
    chipClass: 'bg-amber-50 text-amber-700 border-amber-200',
    accent: '#d97706',
    accentTint: '#d9770615',
    previewKind: 'dashboard',
    summary: [
      'OEE averaged 74.3% this month — 4.1pp below target and down 3.2pp MoM. Line 3 is the persistent drag, with 68% OEE driven by elevated downtime (14.2 hrs/wk) and a scrap spike on Mar 3 (8.2% vs 1.9% baseline).',
      'Lines 1 and 2 remain healthy (78.4% and 79.1% OEE respectively). Overall throughput is up 2.8% QoQ — the Line 1 and 2 surplus is masking the Line 3 drag from the headline throughput number.',
    ],
    findings: [
      'Line 3 hydraulic pressure dropped to 78% of nominal in the hour before the Mar 3 scrap event — direct causal link.',
      'Upstream temp sensor T-204 drifted 4°C for six hours before the scrap event. Preventive maintenance would have caught it.',
      'Operator scrap correlation: one operator\'s scrap rate runs 3.2× peers when cross-shifted from Line 2 to Line 3.',
      'Inventory turns stable at 8.4× despite OEE drag — demand is absorbing the variability for now.',
    ],
    actions: [
      'Preventive maintenance on Line 3 hydraulic system this week.',
      'Replace T-204 sensor and add drift monitoring on the upstream line.',
      'Refresher training on Line 3 for cross-shift operators (three people).',
    ],
    methodology:
      'MES telemetry sampled at 1-second resolution across all three lines, rolled up to 1-hour OEE windows. OEE = Availability × Performance × Quality per the SEMI E10 convention. Scrap flagged at >2× 30-day rolling baseline. Raw telemetry retained for 90 days.',
    kpis: [
      { label: 'OEE average', value: '74.3%', delta: '-4.1pp', tone: 'down' },
      { label: 'Downtime', value: '14.2 hrs/wk', delta: '+22%', tone: 'down' },
      { label: 'Scrap rate', value: '2.4%', delta: '+0.5pp', tone: 'down' },
      { label: 'Throughput', value: '847 u/d', delta: '+2.8%', tone: 'up' },
    ],
    segments: [
      { label: 'Line 1', value: '78.4%', delta: '+0.2pp', tone: 'up' },
      { label: 'Line 2', value: '79.1%', delta: '−0.3pp', tone: 'down' },
      { label: 'Line 3', value: '68.0%', delta: '−6.4pp', tone: 'down' },
      { label: 'Plant avg', value: '74.3%', delta: '−4.1pp', tone: 'down' },
    ],
    appendixTitle: 'Appendix C · Line 3 hourly log (Mar 3, partial)',
    appendixRows: [
      { label: '06:00 · Line 3', value: '72% · nominal' },
      { label: '07:00 · Line 3', value: '68% · T-204 drift +2°C' },
      { label: '08:00 · Line 3', value: '62% · T-204 drift +3°C' },
      { label: '09:00 · Line 3', value: '54% · hydraulic 88%' },
      { label: '10:00 · Line 3', value: '47% · hydraulic 82%' },
      { label: '11:00 · Line 3', value: '38% · scrap spike 8.2%' },
      { label: '12:00 · Line 3', value: '61% · maintenance 42m' },
      { label: '13:00 · Line 3', value: '74% · back to nominal' },
      { label: '14:00 · Line 3', value: '77% · nominal' },
    ],
  },
};

function PrismI({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  );
}

/* ---------- Mini chart primitives ---------- */

function MiniSparkline({
  accent,
  points,
  className = 'w-full h-7',
}: {
  accent: string;
  points: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 100 32" preserveAspectRatio="none" className={className} aria-hidden="true">
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        points={points}
        fill="none"
        stroke={accent}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BigBarChart({ accent }: { accent: string }) {
  const bars = [
    { label: 'Qual.', h: 38 },
    { label: 'Prop.', h: 54 },
    { label: 'Neg.', h: 78 },
    { label: 'Won', h: 18 },
  ];
  return (
    <div className="flex items-end gap-2 h-20">
      {bars.map((b, i) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${b.h}%` }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
            className="w-full rounded-t-sm"
            style={{ backgroundColor: accent, opacity: 0.85 + i * 0.04 }}
          />
          <p className="text-[8px] text-mutedText">{b.label}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Preview variants (right-side hero component) ---------- */

function KpiPreview({ report }: { report: ReportConfig }) {
  const spark =
    '0,24 12,20 24,22 36,16 48,18 60,12 72,10 84,8 100,4';
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-2 gap-1.5">
        {report.kpis.map((k) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="rounded border border-border bg-white px-2 py-1.5"
          >
            <p className="text-[8px] uppercase tracking-wider text-mutedText">
              {k.label}
            </p>
            <p className="text-xs font-mono font-bold text-navy mt-0.5">{k.value}</p>
            <p
              className={`text-[9px] font-mono mt-0.5 ${
                k.tone === 'up' ? 'text-emerald-600' : k.tone === 'down' ? 'text-red-600' : 'text-mutedText'
              }`}
            >
              {k.delta}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="rounded border border-border bg-white px-2.5 py-2">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[9px] font-semibold text-navy">Revenue trend</p>
          <p className="text-[8px] text-mutedText">30d</p>
        </div>
        <MiniSparkline accent={report.accent} points={spark} className="w-full h-8" />
      </div>
    </div>
  );
}

function ChartPreview({ report }: { report: ReportConfig }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded border border-border bg-white px-2.5 py-2">
        <div className="flex items-center justify-between mb-1.5">
          <p className="text-[9px] font-semibold text-navy">Pipeline by stage</p>
          <p className="text-[8px] text-mutedText">Q2 · $1.84M total</p>
        </div>
        <BigBarChart accent={report.accent} />
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {report.kpis.slice(0, 2).map((k) => (
          <div key={k.label} className="rounded border border-border bg-white px-2 py-1.5">
            <p className="text-[8px] uppercase tracking-wider text-mutedText">{k.label}</p>
            <p className="text-xs font-mono font-bold text-navy">{k.value}</p>
            <p
              className={`text-[9px] font-mono ${
                k.tone === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}
            >
              {k.delta}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardPreview({ report }: { report: ReportConfig }) {
  const tileSparks = [
    '0,20 14,18 28,22 42,16 56,20 70,24 84,26 100,28',
    '0,10 14,12 28,15 42,18 56,20 70,24 84,26 100,28',
    '0,14 14,16 28,14 42,18 56,16 70,20 84,18 100,22',
    '0,26 14,22 28,24 42,18 56,20 70,16 84,12 100,10',
  ];
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {report.kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
          className="rounded border border-border bg-white px-2 py-1.5 flex flex-col gap-1"
        >
          <div className="flex items-center justify-between">
            <p className="text-[8px] uppercase tracking-wider text-mutedText">{k.label}</p>
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                k.tone === 'up' ? 'bg-emerald-500' : k.tone === 'down' ? 'bg-red-500' : 'bg-mutedText/50'
              }`}
            />
          </div>
          <p className="text-xs font-mono font-bold text-navy">{k.value}</p>
          <p
            className={`text-[9px] font-mono ${
              k.tone === 'up' ? 'text-emerald-600' : k.tone === 'down' ? 'text-red-600' : 'text-mutedText'
            }`}
          >
            {k.delta}
          </p>
          <MiniSparkline
            accent={k.tone === 'up' ? '#10b981' : k.tone === 'down' ? '#ef4444' : report.accent}
            points={tileSparks[i % tileSparks.length]}
            className="w-full h-6 mt-0.5"
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- Modal ---------- */

const BODY_FADE_STYLE: React.CSSProperties = {
  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
  maskImage: 'linear-gradient(to bottom, black 0%, black 78%, transparent 100%)',
};

export function PrismReportModal({ index }: Props) {
  const report = index != null ? REPORTS[index] : null;
  const open = report != null;

  return (
    <AnimatePresence mode="wait">
      {open && report && (
        <motion.div
          key={`prism-modal-${index}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="absolute inset-0 z-40"
          aria-hidden="true"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/30" />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.26, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute left-4 right-4 top-4 bottom-4 rounded-lg bg-white shadow-2xl border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div
              className="flex items-center gap-2 px-3 py-2 border-b border-border shrink-0"
              style={{ backgroundColor: report.accentTint }}
            >
              <span
                className="inline-flex items-center justify-center h-5 w-5 rounded-sm text-white shrink-0"
                style={{ backgroundColor: report.accent }}
              >
                <PrismI className="h-3 w-3" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-bold uppercase tracking-widest text-crimson">
                  Foundry · Prism
                </p>
                <p className="text-[11px] font-semibold text-navy leading-tight truncate">
                  {report.title}
                </p>
              </div>
              <span
                className={`text-[8px] px-1.5 py-0.5 rounded border font-semibold uppercase tracking-wider shrink-0 ${report.chipClass}`}
              >
                {report.chip}
              </span>
            </div>

            {/* Body — narrative left, preview right; fades into white at the bottom */}
            <div
              className="flex-1 flex gap-3 p-3 min-h-0 overflow-hidden"
              style={BODY_FADE_STYLE}
            >
              {/* Left — narrative */}
              <div className="w-[42%] shrink-0 flex flex-col gap-2 overflow-hidden">
                <section>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-mutedText mb-1">
                    Summary
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {report.summary.map((p, i) => (
                      <p key={i} className="text-[10px] leading-snug text-bodyText">
                        {p}
                      </p>
                    ))}
                  </div>
                </section>
                <section>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-mutedText mb-1">
                    Key findings
                  </p>
                  <ul className="flex flex-col gap-1">
                    {report.findings.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[10px] leading-snug text-bodyText">
                        <span
                          className="h-1.5 w-1.5 rounded-full mt-[5px] shrink-0"
                          style={{ backgroundColor: report.accent }}
                        />
                        <span className="flex-1 min-w-0">{f}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-mutedText mb-1">
                    Recommended actions
                  </p>
                  <ol className="flex flex-col gap-1 list-decimal list-inside marker:text-crimson">
                    {report.actions.map((a, i) => (
                      <li key={i} className="text-[10px] leading-snug text-bodyText">
                        {a}
                      </li>
                    ))}
                  </ol>
                </section>
                <section>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-mutedText mb-1">
                    Methodology
                  </p>
                  <p className="text-[10px] leading-snug text-bodyText">{report.methodology}</p>
                </section>
              </div>

              {/* Right — preview, then extended content so fade has something to chew on */}
              <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
                {report.previewKind === 'kpi' && <KpiPreview report={report} />}
                {report.previewKind === 'chart' && <ChartPreview report={report} />}
                {report.previewKind === 'dashboard' && <DashboardPreview report={report} />}

                {/* Segment / breakdown table */}
                <div className="rounded border border-border bg-white overflow-hidden">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-3 px-2 py-1 bg-offWhite border-b border-border text-[8px] font-bold uppercase tracking-wider text-mutedText">
                    <span>Breakdown</span>
                    <span className="text-right">Value</span>
                    <span className="text-right">Δ</span>
                  </div>
                  {report.segments.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 2 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.05, duration: 0.25 }}
                      className="grid grid-cols-[1fr_auto_auto] gap-3 items-center px-2 py-1 border-b last:border-0 border-border text-[10px]"
                    >
                      <span className="text-navy truncate">{s.label}</span>
                      <span className="text-right font-mono font-semibold text-navy">{s.value}</span>
                      <span
                        className={`text-right font-mono ${
                          s.tone === 'up' ? 'text-emerald-600' : 'text-red-600'
                        }`}
                      >
                        {s.delta}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Appendix — runs past the fade */}
                <div className="rounded border border-border bg-white overflow-hidden">
                  <div className="px-2 py-1 bg-offWhite border-b border-border">
                    <p className="text-[8px] font-bold uppercase tracking-wider text-mutedText">
                      {report.appendixTitle}
                    </p>
                  </div>
                  {report.appendixRows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-[1fr_auto] gap-3 items-center px-2 py-1 border-b last:border-0 border-border text-[10px]"
                    >
                      <span className="text-bodyText truncate">{row.label}</span>
                      <span className="text-right font-mono text-navy whitespace-nowrap">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Continuation stub — totally faded by the mask */}
                <p className="text-[10px] text-bodyText leading-snug">
                  Additional detail follows in the full report, including per-account timelines,
                  variance decomposition, cohort retention curves, and the data-lineage trail for
                  every figure surfaced above.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
