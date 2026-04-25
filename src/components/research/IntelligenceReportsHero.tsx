import { Button } from '@/components/ui/Button';
import { Wordmark } from '@/components/brand/Wordmark';
import { HERO_BODY, HERO_HEADING } from '@/data/research/intelligenceReports';

export function IntelligenceReportsHero() {
  return (
    <section className="relative bg-paper overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute right-[-0.05em] top-[-0.15em] font-serif italic font-light text-ink leading-[0.86] whitespace-nowrap"
        style={{ fontSize: 'clamp(14rem, 32vw, 32rem)', opacity: 0.05 }}
      >
        R
      </span>
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
          <div className="mt-12 lg:mt-0 lg:col-span-5">
            <ReportCoverMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportCoverMock() {
  return (
    <figure className="border-l-2 border-navy pl-5 lg:pl-6">
      <figcaption className="serif-italic text-base text-ink mb-3">
        Fig. 01 · Intelligence Report — sample property snapshot
      </figcaption>
      <div className="border-t border-rule pt-4">
        <div className="bg-paper border border-rule p-8 lg:p-10 product-surface">
          <div className="flex items-baseline gap-4 mb-3">
            <Wordmark size="md" tone="crimson" asLink={false} />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              Intelligence Report
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute mb-3">
            Property snapshot · ownership, valuation, risk
          </p>
          <div className="border-t-2 border-ink mb-6" />

          <div className="bg-cream border border-rule p-4 mb-6 grid grid-cols-3 gap-3 text-[10px]">
            <div>
              <p className="font-mono uppercase tracking-[0.14em] text-mute mb-1">Generated</p>
              <p className="text-ink font-medium">Apr 25, 2026</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-[0.14em] text-mute mb-1">Analyst</p>
              <p className="text-ink font-medium">Named at scoping</p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-[0.14em] text-mute mb-1">Scope</p>
              <p className="text-ink font-medium">12 entities</p>
            </div>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-3">
            By severity
          </p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            <StatTile n={2} label="Critical" tone="rust" />
            <StatTile n={5} label="High" tone="amber" />
            <StatTile n={8} label="Medium" tone="navy" />
            <StatTile n={11} label="Low" tone="navy" />
          </div>

          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mb-2">
            Findings preview
          </p>
          <div className="space-y-1.5">
            <FindingRow severity="High" text="Code violation outstanding · 2024" />
            <FindingRow severity="Medium" text="Tax delinquency cleared · Q4 2025" />
            <FindingRow severity="Low" text="Comparable sales within 5% of valuation" />
          </div>

          <p className="mt-6 font-mono text-[10px] text-mute italic">
            Confidential — sample mock. Final reports are branded, citation-backed, and delivered as PDF + structured data.
          </p>
        </div>
      </div>
    </figure>
  );
}

function StatTile({
  n,
  label,
  tone,
}: {
  n: number;
  label: string;
  tone: 'rust' | 'amber' | 'navy';
}) {
  const tones = {
    rust: 'border-rust/40 text-rust',
    amber: 'border-amber/40 text-amber',
    navy: 'border-navy/30 text-navy',
  };
  return (
    <div className={`border ${tones[tone]} bg-paper px-2 py-3 text-center`}>
      <p className="font-mono text-2xl font-semibold leading-none tabular-nums">{n}</p>
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] mt-1.5 opacity-80">{label}</p>
    </div>
  );
}

function FindingRow({
  severity,
  text,
}: {
  severity: 'High' | 'Medium' | 'Low';
  text: string;
}) {
  const tone = {
    High: 'border-amber text-amber',
    Medium: 'border-navy text-navy',
    Low: 'border-navy text-navy',
  }[severity];
  return (
    <div className="flex items-center gap-2 text-[11px] text-ink">
      <span className={`font-mono border ${tone} px-1.5 py-0.5 uppercase tracking-[0.14em] text-[9px]`}>
        {severity}
      </span>
      <span className="truncate">{text}</span>
    </div>
  );
}
