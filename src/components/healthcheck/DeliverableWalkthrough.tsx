'use client';

import { useCrm, crmMeta } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';
import { DocSectionPreview } from '@/components/ui/DocSectionPreview';
import { DimensionRadarLite } from './previews/DimensionRadarLite';
import { EngagementTiers } from './previews/EngagementTiers';
import { EvidenceCardMini } from './previews/EvidenceCardMini';
import { GradeChip } from './previews/GradeChip';
import { HorizonColumnsMini } from './previews/HorizonColumnsMini';
import { RiskRegisterMini } from './previews/RiskRegisterMini';
import { RoadmapBars } from './previews/RoadmapBars';
import { RoiMiniTable } from './previews/RoiMiniTable';
import { RubricTable } from './previews/RubricTable';

export function DeliverableWalkthrough() {
  const { crmId } = useCrm();
  const crmLabel = crmMeta[crmId].short;
  const d = healthCheckContent[crmId];

  return (
    <div id="walkthrough">
      <section className="bg-cream border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-navySoft mb-4">
              The deliverable, section by section
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy">
              A 40–80 page report plus a companion register. Here&apos;s what&apos;s in it.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink">
              Every CRM Health Check produces the same report structure — so findings are
              comparable across engagements and every stakeholder reads the same shape of
              document. Examples below are keyed to the {crmLabel} tab above.
            </p>
          </div>
        </div>
      </section>

      <DocSectionPreview
        index={1}
        eyebrow="Exec summary"
        title="One page. A letter grade. A narrative the CFO can read."
        description="The exec summary opens with a composite score, a three-sentence narrative, and a count of findings by severity. Designed so the CEO or CFO can walk away with the right takeaway in 60 seconds, and so every other section has a frame to hang on."
        exampleLabel={`${crmLabel} — example summary line`}
        example={<span>&ldquo;{d.execSummary.narrative}&rdquo;</span>}
        preview={<GradeChip />}
      />

      <DocSectionPreview
        index={2}
        eyebrow="Scoring rubric"
        title="Every score is defined. No marketing math."
        description="We publish the 1–5 maturity rubric and the red / yellow / green severity key up front. Every dimension score and every finding points back to these definitions, with evidence attached. Transparency is the trust signal."
        exampleLabel={`${crmLabel} — methodology note`}
        example={<span>{d.rubricNote}</span>}
        preview={<RubricTable />}
        alt
      />

      <DocSectionPreview
        index={3}
        eyebrow="Dimension scorecards"
        title="Twelve domains. One page each. Scored current and target."
        description="For each of the twelve assessment domains we publish a dedicated scorecard — what&apos;s working, what isn&apos;t, evidence, and a preview of the recommended path. Visualized as a dimension bar chart so the gaps are legible at a glance."
        exampleLabel={`${crmLabel} — highest-gap dimension`}
        example={
          <span>
            <span className="font-semibold text-navy">Automation</span> scores lowest at most{' '}
            {crmLabel} orgs we assess — it&apos;s the domain where accumulated debt compounds
            the fastest and where remediation has the clearest ROI.
          </span>
        }
        preview={<DimensionRadarLite />}
      />

      <DocSectionPreview
        index={4}
        eyebrow="Risk register"
        title="Every red and yellow finding. Sortable. Quotable."
        description="The risk register is the artifact the CFO reads. A flat table with finding ID, title, category, severity, impact, owner, and effort — delivered as a companion Excel file alongside the PDF, so leadership can prioritize against their own criteria."
        exampleLabel={`${crmLabel} — top risks`}
        example={
          <span>
            Four highest-severity items this quarter:{' '}
            {d.risks
              .slice(0, 2)
              .map((r) => `${r.id} (${r.category})`)
              .join(', ')}
            , plus two more.
          </span>
        }
        preview={<RiskRegisterMini />}
        alt
      />

      <DocSectionPreview
        index={5}
        eyebrow="Prioritized recommendations"
        title="Now. Next. Later. Every item sized."
        description="Recommendations land in three horizons: Now (stop the bleeding), Next (structural remediation), Later (strategic investments). Each card names the action, the effort (S / M / L / XL), and the dependency chain. You can execute in any order that fits the business."
        exampleLabel={`${crmLabel} — current "Now" top item`}
        example={
          <span>
            <span className="font-semibold text-navy">{d.horizons.now[0]?.title}</span> —{' '}
            {d.horizons.now[0]?.detail}
          </span>
        }
        preview={<HorizonColumnsMini />}
      />

      <DocSectionPreview
        index={6}
        eyebrow="Roadmap"
        title="Four horizons. Named workstreams. Sequenced."
        description="A swim-lane roadmap across 90-day, 6-month, 12-month, and 18-month horizons, with workstreams colored by theme. This is the visual leadership uses to scope the managed services contract — or to drive their own internal plan."
        exampleLabel={`${crmLabel} — sequencing note`}
        example={
          <span>
            Most {crmLabel} roadmaps start with automation consolidation and security remediation
            in parallel, because they unblock the downstream work.
          </span>
        }
        preview={<RoadmapBars />}
        alt
      />

      <DocSectionPreview
        index={7}
        eyebrow="Business case"
        title="Current cost. Remediation investment. Projected value."
        description="A three-column line-item model: what the current state is costing (license waste, manual workarounds, error rates, risk), what remediation costs, and the projected annual value. Payback period in months. Every line traces to a named finding."
        exampleLabel={`${crmLabel} — top value lever`}
        example={
          <span>
            <span className="font-semibold text-navy">{d.roi[0]?.label}</span> —{' '}
            {d.roi[0]?.value} projected annual value.
          </span>
        }
        preview={<RoiMiniTable />}
      />

      <DocSectionPreview
        index={8}
        eyebrow="Proposed engagement"
        title="Three paths. Fixed-fee where possible. You pick."
        description="Fix-It Sprint (90 days, fixed fee, close the top criticals), Managed Services (monthly retainer, ongoing hygiene), or Rebuild (multi-quarter — rebuild, migrate, or consolidate). We do not bundle — you take the report and run it however you like."
        exampleLabel={`${crmLabel} — most common path`}
        example={<span>{d.engagementNote}</span>}
        preview={<EngagementTiers />}
        alt
      />

      <DocSectionPreview
        index={9}
        eyebrow="Appendix · evidence"
        title="Every finding has a page. Every claim has a query."
        description="The appendix is where skeptics go. Each finding gets its own detail page: screenshots, the exact query or metadata that surfaces it, reproduction steps, and our recommended fix. This is the part that makes the health check defensible to your own engineering team."
        exampleLabel={`${crmLabel} — sample evidence query`}
        example={
          <span>
            Finding {d.proofFinding.id} attaches a {d.proofFinding.blocks.find((b) => b.kind === 'code')?.kind === 'code'
              ? 'query you can re-run yourself'
              : 'reproducible trace'}{' '}
            to verify the issue.
          </span>
        }
        preview={<EvidenceCardMini />}
      />
    </div>
  );
}
