import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/brand/Wordmark';
import { HERO_BODY, HERO_HEADING } from '@/data/research/intelligenceReports';

export function IntelligenceReportsHero() {
  return (
    <section className="relative bg-snow overflow-hidden">
      <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-16 lg:pt-28 pb-16 lg:pb-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7">
            <p className="byline mb-5">Research · Intelligence reports</p>
            <h1 className="text-d0 font-serif font-semibold text-ink leading-tight">
              {HERO_HEADING}
            </h1>
            <p className="mt-5 text-lede text-inkSoft max-w-lede leading-[1.65]">{HERO_BODY}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" href="#lead-form">
                Schedule a scoping call
              </Button>
              <Button variant="secondary" href="/contact/?interest=Intelligence%20Reports%20Sample">
                See a sample report
              </Button>
            </div>
            <p className="mt-6 pt-4 border-t border-ruleSoft font-mono text-[11px] uppercase tracking-[0.14em] text-mute max-w-prose">
              From $6,800 · Citation-backed · Named-analyst reviewed.
            </p>
          </div>
          <div className="mt-12 lg:mt-20 lg:col-span-5">
            <ReportCoverMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function RedactBar({
  width,
  className = '',
  tone = 'ink',
}: {
  width: string;
  className?: string;
  tone?: 'ink' | 'mute';
}) {
  const bg = tone === 'mute' ? 'bg-mute/20' : 'bg-ink/15';
  return (
    <span
      aria-hidden="true"
      className={`block h-[7px] ${bg} ${className}`}
      style={{ width }}
    />
  );
}

function ReportCoverMock() {
  return (
    <div className="bg-paper border border-rule shadow-editorial p-7 lg:p-9 product-surface">
      {/* Header — wordmark + report type */}
      <div className="flex items-baseline gap-3 mb-4">
        <Wordmark size="sm" tone="crimson" asLink={false} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute">
          Intelligence Report
        </span>
      </div>
      <div className="space-y-1.5 mb-5">
        <RedactBar width="62%" />
        <RedactBar width="40%" tone="mute" />
      </div>
      <div className="border-t-2 border-ink mb-6" />

      {/* Meta strip */}
      <div className="bg-cream border border-rule px-4 py-3 mb-6 grid grid-cols-3 gap-3">
        {[
          { label: 'Generated', value: 'Apr 2026' },
          { label: 'Analyst', value: null },
          { label: 'Scope', value: null },
        ].map((m) => (
          <div key={m.label}>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-mute mb-1.5">
              {m.label}
            </p>
            {m.value ? (
              <p className="text-ink text-[11px] font-medium">{m.value}</p>
            ) : (
              <RedactBar width="80%" />
            )}
          </div>
        ))}
      </div>

      {/* Executive summary */}
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mute mb-3">
        Executive summary
      </p>
      <div className="space-y-1.5 mb-7">
        <RedactBar width="100%" />
        <RedactBar width="94%" />
        <RedactBar width="88%" />
        <RedactBar width="68%" tone="mute" />
      </div>

      {/* Severity tiles */}
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mute mb-3">
        By severity
      </p>
      <div className="grid grid-cols-4 gap-2 mb-7">
        <StatTile n={2} tone="rust" />
        <StatTile n={5} tone="amber" />
        <StatTile n={8} tone="navy" />
        <StatTile n={11} tone="navy-soft" />
      </div>

      {/* Findings */}
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-mute mb-3">
        Key findings
      </p>
      <div className="space-y-2.5">
        <FindingRow severity="HI" widths={['90%', '60%']} />
        <FindingRow severity="ME" widths={['85%', '70%']} />
        <FindingRow severity="LO" widths={['75%', '50%']} />
      </div>

      <p className="mt-7 font-mono text-[9px] text-mute italic leading-snug">
        Confidential — illustrative mock. Final reports are branded, citation-backed, and delivered as PDF + structured data.
      </p>
    </div>
  );
}

function StatTile({
  n,
  tone,
}: {
  n: number;
  tone: 'rust' | 'amber' | 'navy' | 'navy-soft';
}) {
  const tones = {
    rust: 'border-rust/40 text-rust',
    amber: 'border-amber/40 text-amber',
    navy: 'border-navy/30 text-navy',
    'navy-soft': 'border-navy/20 text-navy/60',
  };
  return (
    <div className={`border ${tones[tone]} bg-paper px-2 py-3 flex flex-col items-center gap-1.5`}>
      <p className="font-mono text-[1.5rem] font-semibold leading-none tabular-nums">{n}</p>
      <RedactBar width="60%" tone="mute" />
    </div>
  );
}

function FindingRow({
  severity,
  widths,
}: {
  severity: 'HI' | 'ME' | 'LO';
  widths: [string, string];
}) {
  const tones = {
    HI: 'border-amber text-amber',
    ME: 'border-navy text-navy',
    LO: 'border-navy/50 text-navy/60',
  };
  return (
    <div className="flex items-start gap-3">
      <span
        className={`font-mono text-[9px] uppercase tracking-[0.14em] border ${tones[severity]} px-1.5 py-0.5 shrink-0 leading-none mt-1`}
      >
        {severity}
      </span>
      <div className="flex-1 space-y-1.5 pt-1">
        <RedactBar width={widths[0]} />
        <RedactBar width={widths[1]} tone="mute" />
      </div>
    </div>
  );
}
