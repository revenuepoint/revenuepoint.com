import { Button } from '@/components/ui/Button';
import { HERO_EYEBROW, HERO_HEADING, HERO_BODY } from '@/data/research/intelligenceReports';

export function IntelligenceReportsHero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
              {HERO_EYEBROW}
            </p>
            <div className="w-10 h-[3px] mb-6 bg-crimson" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-navy">
              {HERO_HEADING}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-bodyText max-w-xl">{HERO_BODY}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="primary" href="#lead-form">
                Schedule a scoping call
              </Button>
              <Button
                variant="secondary"
                href="/contact/?interest=Intelligence%20Reports%20Sample"
              >
                See a sample report
              </Button>
            </div>
          </div>

          {/* Right slot — mock report cover styled after the RevenuePoint Case Explorer PDFs */}
          <div className="mt-10 lg:mt-0">
            <ReportCoverMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function ReportCoverMock() {
  return (
    <div className="bg-white border border-border shadow-sm rounded-sm p-8 lg:p-10 max-w-md mx-auto">
      {/* Wordmark + title row, mirroring the PDF header */}
      <div className="flex items-baseline gap-4 mb-3">
        <span className="text-2xl lg:text-3xl font-bold text-crimson tracking-tight leading-none">
          RevenuePoint
        </span>
        <span className="text-base lg:text-lg text-navyMid font-normal leading-none">
          Intelligence Report
        </span>
      </div>
      <p className="text-xs text-mutedText mb-3">
        Property snapshot · Ownership, valuation, and risk
      </p>
      <div className="border-t-2 border-navy mb-6" />

      {/* Generated meta strip */}
      <div className="bg-offWhite border border-border rounded-sm p-4 mb-6 grid grid-cols-3 gap-3 text-[10px]">
        <div>
          <p className="uppercase tracking-wider text-mutedText mb-1">Generated</p>
          <p className="text-navy font-medium">Apr 25, 2026</p>
        </div>
        <div>
          <p className="uppercase tracking-wider text-mutedText mb-1">Analyst</p>
          <p className="text-navy font-medium">Named at scoping</p>
        </div>
        <div>
          <p className="uppercase tracking-wider text-mutedText mb-1">Scope</p>
          <p className="text-navy font-medium">12 entities</p>
        </div>
      </div>

      {/* Stat tiles — inspired by the by-status grid in the case explorer PDF */}
      <p className="text-[10px] uppercase tracking-wider text-mutedText mb-3">By severity</p>
      <div className="grid grid-cols-4 gap-2 mb-6">
        <StatTile n={2} label="Critical" tone="red" />
        <StatTile n={5} label="High" tone="amber" />
        <StatTile n={8} label="Medium" tone="navy" />
        <StatTile n={11} label="Low" tone="green" />
      </div>

      {/* Findings preview rows */}
      <p className="text-[10px] uppercase tracking-wider text-mutedText mb-2">
        Findings preview
      </p>
      <div className="space-y-1.5">
        <FindingRow severity="High" text="Code violation outstanding · 2024" />
        <FindingRow severity="Medium" text="Tax delinquency cleared · Q4 2025" />
        <FindingRow severity="Low" text="Comparable sales within 5% of valuation" />
      </div>

      <p className="mt-6 text-[10px] text-mutedText italic">
        Confidential — sample mock. Final reports are branded, citation-backed, and
        delivered as PDF + structured data.
      </p>
    </div>
  );
}

function StatTile({ n, label, tone }: { n: number; label: string; tone: 'red' | 'amber' | 'navy' | 'green' }) {
  const tones = {
    red: 'bg-red/10 text-red',
    amber: 'bg-amber/10 text-amber',
    navy: 'bg-navy/5 text-navy',
    green: 'bg-green/10 text-green',
  };
  return (
    <div className={`${tones[tone]} rounded-sm px-2 py-3 text-center`}>
      <p className="text-2xl font-bold leading-none">{n}</p>
      <p className="text-[9px] uppercase tracking-wider mt-1.5 opacity-80">{label}</p>
    </div>
  );
}

function FindingRow({ severity, text }: { severity: 'High' | 'Medium' | 'Low'; text: string }) {
  const tone = {
    High: 'bg-amber/10 text-amber',
    Medium: 'bg-navy/5 text-navy',
    Low: 'bg-green/10 text-green',
  }[severity];
  return (
    <div className="flex items-center gap-2 text-[11px] text-bodyText">
      <span className={`${tone} px-1.5 py-0.5 rounded-sm uppercase tracking-wider text-[9px] font-semibold`}>
        {severity}
      </span>
      <span className="truncate">{text}</span>
    </div>
  );
}
