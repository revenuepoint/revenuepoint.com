import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'agent-writes-qc-verifies',
  title:
    'Agent writes, QC verifies: the codes and checks behind a research report you can defend',
  excerpt:
    'AI can produce a confident-sounding briefing on any subject in thirty seconds. Most of them are wrong in ways that take an analyst a day to find. Here’s the QC pipeline we run — every check, every code, every gate — that makes the difference between a report that ships and a report that comes back.',
  date: '2026-04-25',
  author: {
    name: 'Thomas Jones',
    role: 'Founder, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['AI', 'Research', 'POV'],
  readingTime: '11 min read',
  cover: {
    src: '/img/insights/agent-writes-qc-verifies.svg',
    alt: 'An agent writes a report; a QC stage verifies it through severity, confidence, and status checks; a named analyst signs off',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          A model writes a one-page briefing on a company in thirty
          seconds. It cites a URL that doesn&apos;t resolve. It conflates
          two firms with similar names. It lifts a financial figure from a
          press release that was retracted three months ago. The customer
          has no way to know any of this without doing the research
          themselves — at which point what was the model for?
        </p>
        <p>
          The fix isn&apos;t a smarter model. It&apos;s a QC layer that
          treats every claim as a hypothesis to be verified before
          delivery — not a sentence to be admired. What follows is the
          pipeline we run end to end: the agent that writes, the QC stage
          that checks, the codes that travel with every claim, and the
          three gates a report has to pass before a customer sees it.
        </p>

        <h2>The two-stage shape — Agent and QC</h2>
        <p>
          Two distinct stages, each doing one job. The{' '}
          <strong>Agent</strong> ingests sources, normalizes them into a
          structured entity record, and writes the report from that
          record. <strong>QC</strong> is a separate stage — a different
          prompt, often a different model — that re-reads the agent&apos;s
          output against the same entity record, runs a battery of
          mechanical checks, and produces an annotated diff: which claims
          hold, which don&apos;t, and which need to be re-run, escalated,
          or struck.
        </p>
        <p>
          The agent never grades itself. QC never writes the report. Each
          does one job; both jobs get done. The combined output is an
          auditable record where every assertion has a verification trail
          attached.
        </p>

        <h2>QC stage one — source verification</h2>
        <p>
          QC starts before the agent has written anything. Every source
          extract clears six checks before the agent is allowed to use it
          — the layer most pipelines skip, and the one that catches schema
          drift and license issues before they propagate into reports.
        </p>
        <ul>
          <li>
            <strong>Schema check.</strong> Does the source data have the
            columns and types we expect? A renamed field is a silent
            break that quietly poisons every downstream report.
          </li>
          <li>
            <strong>Row-count band check.</strong> Did we get back roughly
            the volume we expected? A query that returns 12 rows when last
            week returned 1,800 is not a finding — it&apos;s a flag.
          </li>
          <li>
            <strong>License confirmation.</strong> Are we entitled to use
            this source for <em>this</em> engagement? Per-engagement
            licensing is normal in research; running a report on an
            unlicensed source is reputational risk that compounds.
          </li>
          <li>
            <strong>PII redaction.</strong> Sensitive fields that
            shouldn&apos;t appear in a report — and shouldn&apos;t even
            reach the model — are masked before the agent ever sees them.
          </li>
          <li>
            <strong>Freshness check.</strong> When was this data last
            updated? A claim built on a 14-month-old source is not the
            same claim as one built on a same-day source. Freshness gets
            attached to every record and travels with it.
          </li>
          <li>
            <strong>Cross-source corroboration.</strong> For each entity,
            does at least one independent source agree on the basics
            (name, location, identifier)? A source that disagrees with
            every other source on a primary identifier doesn&apos;t get
            used.
          </li>
        </ul>

        <h2>QC stage two — per-claim verification</h2>
        <p>
          Once the agent has written, QC re-reads each claim and runs five
          checks. This is the layer that catches the model-specific
          failure modes: fabricated URLs, summaries that subtly
          misrepresent the source, internal inconsistencies between the
          executive summary and the findings table.
        </p>
        <ul>
          <li>
            <strong>Citation existence.</strong> Does the URL or document
            the claim cites resolve at all? QC issues a live HTTP request
            at run time. A 200 means the citation is real; anything else
            is a flag.
          </li>
          <li>
            <strong>Citation faithfulness.</strong> Does the source
            actually say what the claim says it says? QC re-reads the
            source against the claim and checks for paraphrase drift,
            omitted qualifiers, and outright invention.
          </li>
          <li>
            <strong>Internal consistency.</strong> The number in the
            executive summary has to match the number in the findings
            table. Numbers that disagree across sections are the most
            common form of confident-but-wrong output.
          </li>
          <li>
            <strong>Recency relative to claim.</strong> A claim about a
            current state of affairs supported only by a four-year-old
            source is downgraded automatically.
          </li>
          <li>
            <strong>Out-of-scope drift.</strong> Did the report start
            drifting toward an entity or topic the brief didn&apos;t
            include? A report that quietly expands its scope is a report
            the customer didn&apos;t pay for.
          </li>
        </ul>

        <h2>The codes that travel with every claim</h2>
        <p>
          Every claim, every finding, and every source record carries
          three independent code-sets through the pipeline. Together they
          make every assertion in a report machine-auditable.
        </p>

        <h3>Severity</h3>
        <p>
          One of <code>Critical</code>, <code>High</code>, <code>Medium</code>,
          or <code>Low</code>. Visible in the deliverable; governs reader
          attention. Critical findings appear at the top of the report and
          require claim-by-claim sign-off from a named analyst before
          delivery. Low findings get spot-checked.
        </p>

        <h3>Confidence</h3>
        <p>
          A score on <code>[0.00, 1.00]</code>, computed per claim from
          four factors:
        </p>
        <ul>
          <li>
            <strong>Number of corroborating sources</strong> that
            independently support the claim.
          </li>
          <li>
            <strong>Source reliability weight</strong> — a per-source
            multiplier that reflects how authoritative the source is for
            this kind of claim. (Government filings carry more weight on
            ownership than a press release does.)
          </li>
          <li>
            <strong>Freshness</strong> — how current the source is
            relative to the claim&apos;s assertion.
          </li>
          <li>
            <strong>Live citation pass</strong> — whether QC&apos;s HTTP
            check on the citation URL returned a 200 at run time.
          </li>
        </ul>
        <p>
          The threshold for &ldquo;citable in the report&rdquo; is
          configurable per engagement — typically 0.70. Anything below the
          threshold is either re-run with elevated source weighting or
          struck with a methodology note that explains the exclusion.
        </p>

        <h3>Status</h3>
        <p>
          The lifecycle of a claim through the pipeline. Every claim ends
          in one of these states; the audit log shows when each transition
          happened and which check forced it.
        </p>
        <ul>
          <li>
            <code>pending</code> — written by the agent, not yet reviewed
            by QC.
          </li>
          <li>
            <code>supported</code> — passed all per-claim checks against
            its primary source.
          </li>
          <li>
            <code>corroborated</code> — supported, plus at least one
            independent source agrees.
          </li>
          <li>
            <code>unsupported</code> — primary source doesn&apos;t back
            the claim as written. Routed for resolution.
          </li>
          <li>
            <code>unverifiable</code> — the source exists but QC cannot
            confirm or deny the claim against it. Escalated to a human.
          </li>
          <li>
            <code>expired-source</code> — citation no longer resolves, or
            content has changed in a way that no longer supports the
            claim.
          </li>
          <li>
            <code>out-of-scope</code> — the claim is true but outside the
            engagement&apos;s brief. Removed.
          </li>
          <li>
            <code>struck-with-note</code> — the claim does not appear in
            the report; the methodology section explains why.
          </li>
        </ul>

        <h2>The anatomy of one claim</h2>
        <p>
          The codes aren&apos;t metadata loosely associated with a report.
          They&apos;re a structured record attached to every claim, and
          they&apos;re what the audit log preserves so the same report
          can be re-verified months later. One claim, fully annotated,
          looks like this:
        </p>
      </Prose>

      <CodeBlock
        language="json"
        code={`{
  "claim_id": "clm_2026_04_24_0193",
  "text":     "The association closed 2025 with a $185,528 net operating loss on $2.73M revenue.",
  "severity": "High",
  "status":   "corroborated",
  "confidence": {
    "score": 0.91,
    "factors": {
      "corroborating_sources": 2,
      "source_reliability":    0.95,
      "freshness_days":        38,
      "citation_live":         true
    }
  },
  "primary_source": {
    "id":       "src_fin_pkg_2025_12",
    "type":     "financial_package",
    "url":      "https://docs.example.org/0L-excellence-dec-2025-redacted.pdf",
    "checked":  "2026-04-24T11:18:42Z",
    "http":     200
  },
  "corroboration": [
    { "source_id": "src_akam_finance_memo", "agrees_on": "operating_deficit_174507" }
  ],
  "qc_log": [
    { "check": "citation_existence",   "result": "pass" },
    { "check": "citation_faithfulness","result": "pass", "note": "summary numbers reconcile to source page 4" },
    { "check": "internal_consistency", "result": "pass", "note": "matches exec summary figure" },
    { "check": "recency_relative",     "result": "pass" },
    { "check": "out_of_scope_drift",   "result": "pass" }
  ]
}`}
      />

      <Prose>
        <p>
          The claim is supported, corroborated by a second source, and
          carries a 0.91 confidence score with the components broken out.
          The QC log lists every check that ran and the result. If the
          citation goes dark next quarter, the same claim re-run will
          transition to <code>expired-source</code> and the audit log will
          record exactly when the source disappeared.
        </p>

        <h2>What happens when a check fails — resolution codes</h2>
        <p>
          QC doesn&apos;t just flag, it routes. A failed check produces a
          resolution code that determines what happens next:
        </p>
        <ul>
          <li>
            <code>re-run</code> — the same query against the same source
            again, often after a transient failure (HTTP 429, source
            500).
          </li>
          <li>
            <code>elevate-source-weighting</code> — re-run with a
            higher-reliability source given more weight in the confidence
            calculation.
          </li>
          <li>
            <code>escalate-to-analyst</code> — QC can&apos;t decide; a
            named human reviews.
          </li>
          <li>
            <code>strike-with-methodology-note</code> — the claim
            doesn&apos;t appear in the report; the methodology section
            explains the exclusion.
          </li>
        </ul>
        <p>
          The rule we apply across batches:{' '}
          <strong>
            if QC flags more than 30% of an entity&apos;s claims as
            unsupported, the report does not ship.
          </strong>{' '}
          The agent&apos;s prompt is iterated and the entity is re-run
          before the customer sees anything. A high failure rate on a
          single entity is information about the prompt, not about the
          entity.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        The model that writes the report should not be the model that
        grades it. Confidence is a code, not a feeling — and the report
        only ships when the codes line up.
      </PullQuote>

      <Prose>
        <h2>Two paragraphs, one pipeline</h2>
        <p>
          Easiest seen on a single passage. Same agent draft, before and
          after QC.
        </p>
      </Prose>

      <TwoColumn
        leftHeading="Agent draft"
        rightHeading="After QC"
        left={
          <>
            <p>
              &ldquo;The association closed 2025 with a sizeable
              operating loss and is currently in financial distress, with
              legal fees nearly tripling the budgeted amount. The current
              manager has been borrowing from reserve funds.&rdquo;
            </p>
            <p>
              No citations. &ldquo;Sizeable&rdquo; is qualitative.
              &ldquo;Nearly tripling&rdquo; is hand-wavy. The reserve-funds
              claim is unsourced and could be a model fabrication. None of
              this is verifiable.
            </p>
          </>
        }
        right={
          <>
            <p>
              &ldquo;The association closed 2025 with a $185,528 net
              operating loss on $2.73M revenue [1]. Legal fees reached
              $281,001 against a $100,000 budget — a $177,025 overage [1].
              The manager has borrowed $334,034 from restricted funds:
              $242,487 from the 2023 Special Assessment fund and $90,833
              from reserves [1, 2].&rdquo;
            </p>
            <p>
              Severity tagged{' '}
              <strong>High</strong>; confidence 0.91; status{' '}
              <code>corroborated</code> across two independent sources.
              Each bracketed reference resolves to a citation in the
              report&apos;s source index, with a live URL check at run
              time.
            </p>
          </>
        }
      />

      <Prose>
        <h2>Three gates before delivery</h2>
        <p>
          QC alone doesn&apos;t ship a report. The pipeline ships through
          three gates, in order:
        </p>
        <ul>
          <li>
            <strong>Gate one — sample review with the customer.</strong>{' '}
            A handful of representative reports go to the customer for
            markup before the batch ever runs. The customer&apos;s
            annotations become input to a versioned prompt revision; the
            batch runs only against an approved sample.
          </li>
          <li>
            <strong>Gate two — peer-reviewer stranger test.</strong> A
            second analyst with no authorship stake reads the sample
            cold. They catch what the lead analyst&apos;s eyes have
            already adjusted to.
          </li>
          <li>
            <strong>Gate three — named-analyst review.</strong> Before
            delivery, a named analyst reads every report cover to cover.
            Sign-off is claim-by-claim on Critical and High findings;
            spot-check on Medium and Low. The analyst&apos;s name appears
            on the cover page and in the methodology section. They are
            who the customer calls if a claim is challenged.
          </li>
        </ul>
        <p>
          Each gate is rejection-capable. A sample that doesn&apos;t pass
          gate one doesn&apos;t advance to gate two. A batch that
          surfaces a systemic issue at gate three goes back for a
          targeted re-run. The customer doesn&apos;t see a report that
          hasn&apos;t passed all three.
        </p>
      </Prose>

      <Callout variant="warning" title="Common mistakes">
        <ul>
          <li>
            <strong>One model with a &ldquo;now check your work&rdquo;
            prompt.</strong> Same blind spots in both passes. Agent and QC
            need to be different prompts at minimum, ideally different
            models.
          </li>
          <li>
            <strong>QC that flags but doesn&apos;t route.</strong> An
            objection list nobody acts on is documentation, not
            verification. Every failed check needs a resolution code.
          </li>
          <li>
            <strong>Confidence as a single number with no
            breakdown.</strong> A 0.85 made of &ldquo;one strong source,
            no corroboration&rdquo; is not the same as a 0.85 made of
            &ldquo;four mid-tier sources agreeing.&rdquo; Show the
            components.
          </li>
          <li>
            <strong>Skipping source verification.</strong> By the time a
            fabricated URL shows up in a claim, the pipeline has already
            spent expensive compute on bad ground.
          </li>
          <li>
            <strong>No named human at the end.</strong> Even with clean
            QC, framing and scope failures need a signature on the cover
            page.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If you can&apos;t, for any claim in a research report, show the
          source it came from, the checks it passed, and the analyst who
          signed it off, you don&apos;t have a research report. You have
          a confident essay. The first might lose a deal; the second will
          lose a customer.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about it at RevenuePoint</h2>
        <p>
          Agent + QC + named-analyst review is not the shortest path to a
          finished report. It is the path that produces a report you can
          hand to a board, a procurement team, or a regulator without
          flinching. The agent ingests, structures, and writes. QC
          re-reads with mechanical discipline — six checks at the source,
          five at the claim, three code-sets attached to every assertion,
          a resolution router on every failed check. Three gates govern
          delivery. A named human signs the cover page. The report ships
          when, and only when, the codes line up.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
