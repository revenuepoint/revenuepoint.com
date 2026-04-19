'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  DonutSpec,
  KpiMetric,
  LineChartSpec,
  OttoBlock,
  OttoConversation,
  RecordCardSpec,
  TableSpec,
  ActionSuggestionSpec,
} from '@/data/foundryOttoChats';

/* ---------- Inline SVG icons ---------- */

function BotIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <path d="M12 4v4M8 14h.01M16 14h.01M9 18h6" />
    </svg>
  );
}

function SendIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function ReplayIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 2v6h6" />
      <path d="M3 8a9 9 0 1 1 2 6" />
    </svg>
  );
}

function DatabaseIcon({ className = 'h-3.5 w-3.5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
    </svg>
  );
}

/* ---------- Rich content block sub-renderers ---------- */

const SYSTEM_STYLE: Record<RecordCardSpec['system'], string> = {
  Salesforce: 'bg-blue-50 text-blue-700 border-blue-200',
  SAP: 'bg-amber-50 text-amber-700 border-amber-200',
  QuickBooks: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  PioneerRx: 'bg-violet-50 text-violet-700 border-violet-200',
};

function KpiBlock({ metrics }: { metrics: KpiMetric[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2">
      {metrics.map((m) => (
        <div key={m.label} className="bg-offWhite border border-border rounded-md px-2.5 py-2">
          <p className="text-[9px] uppercase tracking-wider text-mutedText">{m.label}</p>
          <p className="text-sm font-bold font-mono text-navy mt-0.5">{m.value}</p>
          {m.change && (
            <p
              className={`text-[10px] font-mono mt-0.5 ${
                m.changeTone === 'good' ? 'text-emerald-600' : m.changeTone === 'bad' ? 'text-red-600' : 'text-mutedText'
              }`}
            >
              {m.change}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function LineChartBlock({ spec }: { spec: LineChartSpec }) {
  const W = 520;
  const H = 140;
  const padL = 28;
  const padR = 12;
  const padT = 10;
  const padB = 20;
  const all = spec.series.flatMap((s) => s.values);
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const len = spec.series[0].values.length;
  const step = (W - padL - padR) / (len - 1);

  const yFor = (v: number) => padT + (H - padT - padB) * (1 - (v - min) / range);

  return (
    <div className="my-2 border border-border rounded-md overflow-hidden bg-white">
      <div className="px-3 py-1.5 border-b border-border bg-offWhite">
        <p className="text-[11px] font-semibold text-navy">{spec.title}</p>
      </div>
      <div className="px-2 pb-2 pt-1">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-36" aria-hidden="true">
          {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
            const y = padT + (H - padT - padB) * t;
            return <line key={i} x1={padL} x2={W - padR} y1={y} y2={y} stroke="#e5e7eb" strokeWidth={0.5} />;
          })}
          {spec.goalValue != null && (
            <g>
              <line x1={padL} x2={W - padR} y1={yFor(spec.goalValue)} y2={yFor(spec.goalValue)} stroke="#8B0A39" strokeDasharray="3 3" strokeWidth={1} opacity={0.6} />
              <text x={W - padR - 4} y={yFor(spec.goalValue) - 3} fontSize={8} fill="#8B0A39" textAnchor="end">goal</text>
            </g>
          )}
          {spec.series.map((s) => {
            const points = s.values.map((v, i) => `${padL + i * step},${yFor(v)}`).join(' ');
            return (
              <polyline
                key={s.name}
                points={points}
                fill="none"
                stroke={s.color}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
          {spec.highlightIndex != null && spec.series[0] && (
            <g>
              <circle
                cx={padL + spec.highlightIndex * step}
                cy={yFor(spec.series[0].values[spec.highlightIndex])}
                r={5}
                fill={spec.series[0].color}
                opacity={0.2}
              />
              <circle
                cx={padL + spec.highlightIndex * step}
                cy={yFor(spec.series[0].values[spec.highlightIndex])}
                r={2.5}
                fill={spec.series[0].color}
              />
              {spec.highlightLabel && (
                <text
                  x={padL + spec.highlightIndex * step + 6}
                  y={yFor(spec.series[0].values[spec.highlightIndex]) - 6}
                  fontSize={8}
                  fill={spec.series[0].color}
                  fontWeight={600}
                >
                  {spec.highlightLabel}
                </text>
              )}
            </g>
          )}
          {spec.xLabels.map((lbl, i, arr) => {
            const t = i / (arr.length - 1);
            const x = padL + t * (W - padL - padR);
            return (
              <text
                key={lbl}
                x={x}
                y={H - 4}
                fontSize={8}
                fill="#6B8299"
                textAnchor={i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle'}
              >
                {lbl}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function DonutBlock({ spec }: { spec: DonutSpec }) {
  const cx = 70, cy = 70, rOuter = 60, rInner = 38;
  let startAngle = -Math.PI / 2;
  const total = spec.slices.reduce((s, x) => s + x.value, 0);
  return (
    <div className="my-2 border border-border rounded-md overflow-hidden bg-white">
      <div className="px-3 py-1.5 border-b border-border bg-offWhite">
        <p className="text-[11px] font-semibold text-navy">{spec.title}</p>
      </div>
      <div className="p-3 flex items-center gap-4">
        <svg viewBox="0 0 140 140" className="h-36 w-36 shrink-0" aria-hidden="true">
          {spec.slices.map((s, i) => {
            const angle = (s.value / total) * Math.PI * 2;
            const endAngle = startAngle + angle;
            const x1 = cx + rOuter * Math.cos(startAngle);
            const y1 = cy + rOuter * Math.sin(startAngle);
            const x2 = cx + rOuter * Math.cos(endAngle);
            const y2 = cy + rOuter * Math.sin(endAngle);
            const ix1 = cx + rInner * Math.cos(endAngle);
            const iy1 = cy + rInner * Math.sin(endAngle);
            const ix2 = cx + rInner * Math.cos(startAngle);
            const iy2 = cy + rInner * Math.sin(startAngle);
            const largeArc = angle > Math.PI ? 1 : 0;
            const d = `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${rInner} ${rInner} 0 ${largeArc} 0 ${ix2} ${iy2} Z`;
            startAngle = endAngle;
            return <path key={i} d={d} fill={s.color} opacity={0.9} />;
          })}
        </svg>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {spec.slices.map((s) => (
            <div key={s.label} className="flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-bodyText flex-1 truncate">{s.label}</span>
              <span className="font-mono text-mutedText">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TableBlock({ spec }: { spec: TableSpec }) {
  return (
    <div className="my-2 border border-border rounded-md overflow-hidden bg-white">
      {spec.title && (
        <div className="px-3 py-1.5 border-b border-border bg-offWhite">
          <p className="text-[11px] font-semibold text-navy">{spec.title}</p>
        </div>
      )}
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-offWhite">
            {spec.headers.map((h) => (
              <th
                key={h}
                className="text-left px-3 py-2 font-semibold text-mutedText uppercase tracking-wider text-[9px]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {spec.rows.map((row, i) => (
            <tr key={i} className="border-t border-border">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 font-mono text-bodyText">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RecordBlock({ spec }: { spec: RecordCardSpec }) {
  return (
    <div className="my-2 border border-border rounded-md overflow-hidden bg-white">
      <div className="flex items-center gap-2 px-3 py-2 bg-offWhite border-b border-border">
        <DatabaseIcon className="h-3.5 w-3.5 text-mutedText" />
        <span className="text-xs font-semibold text-navy flex-1 truncate">{spec.title}</span>
        {spec.status && (
          <span className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">
            {spec.status}
          </span>
        )}
        <span className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded border ${SYSTEM_STYLE[spec.system]}`}>
          {spec.system}
        </span>
      </div>
      <div className="px-3 py-3 grid grid-cols-2 gap-x-4 gap-y-2">
        {spec.fields.map((f) => (
          <div key={f.label} className="min-w-0">
            <p className="text-[9px] uppercase tracking-wider text-mutedText">{f.label}</p>
            <p className="text-[11px] font-mono text-bodyText leading-snug">{f.value}</p>
          </div>
        ))}
      </div>
      <div className="px-3 pb-2 text-[10px] text-mutedText font-mono">
        {spec.recordType} · {spec.recordId}
      </div>
    </div>
  );
}

function BulletsBlock({ title, items }: { title?: string; items: string[] }) {
  return (
    <div className="my-2">
      {title && (
        <p className="text-[10px] font-semibold uppercase tracking-wider text-mutedText mb-1.5">
          {title}
        </p>
      )}
      <ul className="flex flex-col gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-bodyText">
            <span className="text-blue-500 font-bold mt-0.5 shrink-0">·</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TextBlock({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="my-2 flex flex-col gap-2">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-[12.5px] leading-relaxed text-bodyText">{p}</p>
      ))}
    </div>
  );
}

function ActionBlock({ spec }: { spec: ActionSuggestionSpec }) {
  return (
    <div className="my-2 border border-border rounded-md bg-offWhite p-3">
      <p className="text-[11px] font-semibold text-navy mb-2">{spec.title}</p>
      <div className="flex gap-2 flex-wrap">
        {spec.buttons.map((b, i) => (
          <span
            key={i}
            className={`inline-flex items-center px-3 py-1.5 rounded border text-[11px] font-semibold select-none ${
              b.primary
                ? 'bg-blue-500 text-white border-blue-500 shadow-sm'
                : 'bg-white text-bodyText border-border'
            }`}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: OttoBlock }) {
  if (block.kind === 'kpis') return <KpiBlock metrics={block.metrics} />;
  if (block.kind === 'line-chart') return <LineChartBlock spec={block.spec} />;
  if (block.kind === 'donut') return <DonutBlock spec={block.spec} />;
  if (block.kind === 'table') return <TableBlock spec={block.spec} />;
  if (block.kind === 'record') return <RecordBlock spec={block.spec} />;
  if (block.kind === 'bullets') return <BulletsBlock title={block.title} items={block.items} />;
  if (block.kind === 'text') return <TextBlock paragraphs={block.paragraphs} />;
  return <ActionBlock spec={block.spec} />;
}

/* ---------- Animator state machine ---------- */

type Stage = 'idle' | 'user-in' | 'typing' | 'streaming-text' | 'blocks-in' | 'complete';

function useOttoAnimator(conv: OttoConversation, replayToken: number) {
  const [stage, setStage] = useState<Stage>('idle');
  const [streamedWords, setStreamedWords] = useState(0);
  const [visibleBlocks, setVisibleBlocks] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    for (const id of timersRef.current) window.clearTimeout(id);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    clearTimers();
    setStage('idle');
    setStreamedWords(0);
    setVisibleBlocks(0);

    const words = conv.assistantText.split(/\s+/).filter(Boolean);
    const wordMs = 35;

    const schedule = (delay: number, fn: () => void) => {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    // Stage 1: user bubble in
    schedule(150, () => setStage('user-in'));
    // Stage 2: typing dots
    schedule(600, () => setStage('typing'));
    // Stage 3: Otto bubble appears + streaming begins
    schedule(1500, () => {
      setStage('streaming-text');
      // stream words
      words.forEach((_, i) => {
        schedule(i * wordMs, () => setStreamedWords(i + 1));
      });
    });

    const streamEnd = 1500 + words.length * wordMs + 200;
    // Stage 4: blocks fade in one by one
    schedule(streamEnd, () => setStage('blocks-in'));
    conv.assistantBlocks.forEach((_, i) => {
      schedule(streamEnd + i * 360, () => setVisibleBlocks(i + 1));
    });
    const allDone = streamEnd + conv.assistantBlocks.length * 360 + 200;
    schedule(allDone, () => setStage('complete'));

    return clearTimers;
  }, [conv, replayToken, clearTimers]);

  return { stage, streamedWords, visibleBlocks };
}

/* ---------- Main panel ---------- */

export function OttoChatPanel({ conversation }: { conversation: OttoConversation }) {
  const [replayToken, setReplayToken] = useState(0);
  const { stage, streamedWords, visibleBlocks } = useOttoAnimator(conversation, replayToken);

  const words = conversation.assistantText.split(/\s+/).filter(Boolean);
  const streamedText = words.slice(0, streamedWords).join(' ');
  const streaming = stage === 'streaming-text' && streamedWords < words.length;
  const textStarted = stage === 'streaming-text' || stage === 'blocks-in' || stage === 'complete';
  const showUser = stage !== 'idle';
  const showTyping = stage === 'typing';

  return (
    <div className="flex flex-col h-full min-h-[620px]">
      {/* Header */}
      <div className="flex items-center gap-2 pb-3 border-b border-border">
        <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-blue-50 text-blue-600">
          <BotIcon className="h-3.5 w-3.5" />
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-navy leading-tight">Otto</p>
          <p className="text-[10px] text-mutedText">· {conversation.persona}</p>
        </div>
        <button
          type="button"
          onClick={() => setReplayToken((t) => t + 1)}
          className="inline-flex items-center gap-1.5 text-[11px] text-mutedText hover:text-navy border border-border rounded px-2 py-1 bg-white"
          aria-label="Replay conversation"
        >
          <ReplayIcon className="h-3 w-3" />
          Replay
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {/* User message */}
        {showUser && (
          <div className="flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm bg-crimson text-white">
              {conversation.userMessage}
            </div>
          </div>
        )}

        {/* Typing indicator */}
        {showTyping && (
          <div className="flex justify-start animate-in fade-in duration-200">
            <div className="flex items-end gap-2 max-w-[95%]">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 text-blue-600 shrink-0 mb-1">
                <BotIcon className="h-3 w-3" />
              </span>
              <div className="rounded-lg px-3 py-2.5 bg-white border border-border">
                <div className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms', animationDuration: '1.2s' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '180ms', animationDuration: '1.2s' }} />
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '360ms', animationDuration: '1.2s' }} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Otto response bubble (starts once streaming begins) */}
        {textStarted && (
          <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-start gap-2 max-w-[95%] w-full">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-50 text-blue-600 shrink-0 mt-1">
                <BotIcon className="h-3 w-3" />
              </span>
              <div className="rounded-lg px-3 py-2.5 bg-white border border-border flex-1 min-w-0">
                <p className="text-sm leading-relaxed text-bodyText">
                  {streamedText}
                  {streaming && (
                    <span className="inline-block w-[2px] h-[13px] bg-blue-500 ml-0.5 align-middle animate-pulse" />
                  )}
                </p>

                {/* Rich content blocks appear after text streaming completes */}
                {(stage === 'blocks-in' || stage === 'complete') && (
                  <div className="mt-1">
                    {conversation.assistantBlocks.slice(0, visibleBlocks).map((block, i) => (
                      <div
                        key={i}
                        className="animate-in fade-in slide-in-from-bottom-2 duration-300"
                      >
                        <BlockRenderer block={block} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Composer (disabled) */}
      <div className="pt-3 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="flex-1 px-3 py-2 text-sm text-mutedText bg-offWhite border border-border rounded-md select-none">
            Ask Otto anything…
          </div>
          <div className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-blue-500 text-white shrink-0">
            <SendIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
