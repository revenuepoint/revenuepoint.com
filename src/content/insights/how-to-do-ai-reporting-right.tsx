import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'how-to-do-ai-reporting-right',
  title:
    'How to do AI reporting right: the multi-step pipeline behind a number you can trust',
  excerpt:
    'Plain-English questions are easy for a model to answer. The hard part is building the pipeline around the model so the answer is actually correct — and defensible. Here’s the step-by-step approach we use.',
  date: '2026-03-31',
  author: {
    name: 'Thomas Jones',
    role: 'Managing Director, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['AI', 'Reporting', 'POV'],
  readingTime: '9 min read',
  cover: {
    src: '/img/insights/how-to-do-ai-reporting-right.svg',
    alt: 'Five-stage AI reporting pipeline — question, plan, query, QC, result — with a provenance badge attached to the result',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          A user asks a question in English. A model produces a confident
          number. Nobody can tell if it&apos;s right. That isn&apos;t a
          reporting pipeline — it&apos;s a guess with a chart on top. It will
          be right often enough to feel useful, and wrong often enough to
          quietly destroy trust the first time someone takes it into a board
          meeting.
        </p>
        <p>
          The fix isn&apos;t a smarter model. The fix is a more disciplined
          pipeline around the model. This is the approach we use, end to end,
          to turn a plain-English request into a structured answer that holds
          up under scrutiny.
        </p>

        <h2>What&apos;s actually inside a &ldquo;report request&rdquo;</h2>
        <p>
          Every plain-English question contains three things, whether the
          asker realizes it or not, and the pipeline has to surface all three
          before it runs anything:
        </p>
        <ul>
          <li>
            <strong>Intent</strong> — what is actually being measured.
            &ldquo;Show me churn&rdquo; is an intent; the pipeline has to
            decide whether the user means a count, a rate, a dollar amount,
            or a comparison.
          </li>
          <li>
            <strong>Scope</strong> — the time window, the filters, the
            entities. &ldquo;Last quarter&rdquo; can mean four different
            things depending on whose calendar you&apos;re using.
          </li>
          <li>
            <strong>Implicit definition</strong> — the business meaning
            buried inside the words. &ldquo;Customer&rdquo; might mean
            account, contact, or paying logo. &ldquo;Active&rdquo; means
            something different in every company.
          </li>
        </ul>
        <p>
          A pipeline that doesn&apos;t name these three before producing a
          number is, by construction, guessing.
        </p>

        <h2>The right way, in five steps</h2>
        <p>
          The rest of this piece is the pipeline itself. Five steps, in
          order, with the work each one is doing.
        </p>

        <h2>Step 1 — Translate intent against a semantic layer, not raw tables</h2>
        <p>
          The model does not write free-form SQL against your warehouse. It
          picks from a curated set of metrics, dimensions, and filters that
          are already defined — the semantic layer. &ldquo;Revenue&rdquo;
          exists once, with one definition, joined to the right dimensions,
          available to the model as a named building block. So does
          &ldquo;active customer.&rdquo; So does every other term that would
          otherwise be redefined a dozen times.
        </p>
        <p>
          This is where the warehouse work pays for itself. A semantic layer
          is what makes the model&apos;s output deterministic in the
          dimensions that matter: ask the same question twice and you get
          the same number, because both runs are reaching for the same
          predefined metric.
        </p>

        <h2>Step 2 — Plan before you query</h2>
        <p>
          For anything beyond a trivial lookup, the AI produces a structured
          plan first. The plan names the sub-queries it intends to run, the
          inputs they take, and the QC checks that will be applied to each.
          Nothing executes until the plan is built.
        </p>
        <p>
          Two things this buys you. First, a plan is small enough for a
          human or a second agent to sanity-check before any data moves —
          you can catch a wrong filter or an off-by-one time window without
          paying the cost of running the query. Second, the plan is what
          gets stored as the audit record of <em>why</em> the number came
          out the way it did. Here&apos;s what one of these plans actually
          looks like:
        </p>
      </Prose>

      <CodeBlock
        language="json"
        code={`{
  "request": "Which of our top-50 customers look at-risk heading into Q3?",
  "extracted": {
    "intent":     "rank customers by composite at-risk score",
    "scope":      { "cohort": "top_50_by_arr", "window": "trailing_90_days" },
    "definition": { "at_risk": "weighted blend of usage_decline, support_load, ar_aging" }
  },
  "steps": [
    {
      "id": "s1_top50",
      "metric": "arr_by_account",
      "inputs": { "as_of": "today", "limit": 50, "order_by": "arr_desc" },
      "qc": ["row_count_eq_50", "arr_total_reconciles_to_finance_close"]
    },
    {
      "id": "s2_usage",
      "metric": "usage_trend_by_account",
      "inputs": { "accounts": "$s1_top50.accounts", "window": "trailing_90_days" },
      "qc": ["null_rate_lt_0.05", "spot_check_3_random_rows"]
    },
    {
      "id": "s3_support",
      "metric": "support_volume_by_account",
      "inputs": { "accounts": "$s1_top50.accounts", "window": "trailing_90_days" },
      "qc": ["row_count_lt_or_eq_50", "ticket_total_reconciles_to_helpdesk"]
    },
    {
      "id": "s4_ar",
      "metric": "ar_aging_by_account",
      "inputs": { "accounts": "$s1_top50.accounts", "as_of": "today" },
      "qc": ["ar_total_reconciles_to_gl"]
    },
    {
      "id": "s5_score",
      "compose": ["s2_usage", "s3_support", "s4_ar"],
      "weights": { "usage_decline": 0.5, "support_load": 0.2, "ar_aging": 0.3 },
      "qc": ["score_distribution_in_expected_range"]
    }
  ],
  "needs_clarification": []
}`}
      />

      <Prose>
        <p>
          Notice what&apos;s in there: every step names a predefined metric,
          every input is typed, and every step carries its own QC checks.
          There is no free-form SQL anywhere in the plan, because there
          won&apos;t be any in the execution either.
        </p>

        <h2>Step 3 — Ask, don&apos;t guess, on ambiguity</h2>
        <p>
          When the request is ambiguous, the correct move is a clarifying
          question, not a confident guess. &ldquo;Last quarter&rdquo; —
          calendar or fiscal? &ldquo;Customers&rdquo; — accounts or
          contacts? &ldquo;Top&rdquo; — by revenue, by usage, by recency?
        </p>
        <p>
          The pipeline surfaces these as a short list of choices before any
          data moves. One round of clarification, the user picks, the plan
          finalizes. Compared to silently guessing and producing a wrong
          number, the cost of asking is trivial. The cost of <em>not</em>{' '}
          asking is the user discovering, three meetings later, that the
          number meant something different than they thought.
        </p>

        <h2>Step 4 — Pull data through approved queries only</h2>
        <p>
          Every metric in the plan resolves to a parameterized,
          pre-reviewed query with typed inputs. Same allowlist principle
          that governs tools in an orchestration layer: the model can call
          things on the menu, and only things on the menu. Free-form SQL
          stays off the production path.
        </p>
        <p>
          This is also where the boring infrastructure pays off. Row-level
          permissions, column masking for sensitive fields, and full audit
          logging all live at the query layer — not in the model, not in
          the prompt. The user&apos;s identity flows down to the query, the
          query enforces what they&apos;re allowed to see, and the audit
          captures who asked for what.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        A number without provenance isn&apos;t an answer. It&apos;s a guess
        with a timestamp.
      </PullQuote>

      <Prose>
        <h2>Step 5 — QC the result before the user sees it</h2>
        <p>
          Every result runs a battery of automated checks before anything
          renders to the user. The checks are cheap, mechanical, and the
          difference between a pipeline that&apos;s usually right and one
          that&apos;s defensibly right.
        </p>
        <ul>
          <li>
            <strong>Row counts in expected ranges.</strong> A query that
            should return fifty rows and returns three is a flag, not an
            answer.
          </li>
          <li>
            <strong>Totals reconcile to a known ground truth.</strong>{' '}
            Revenue numbers cross-check against the close. AR totals
            cross-check against the GL. Pipeline totals cross-check against
            the CRM roll-up. If a number doesn&apos;t reconcile, the
            pipeline says so.
          </li>
          <li>
            <strong>Null rates, duplicate rates, referential
            integrity.</strong> All compared against the historical norms
            for that metric. A sudden jump in nulls usually means an
            upstream schema change, not a real business event.
          </li>
          <li>
            <strong>Spot-checks.</strong> A handful of randomly-sampled rows
            get re-read directly from the source system to confirm the
            warehouse copy still matches.
          </li>
        </ul>
        <p>
          When any check fails, the pipeline does not return an answer. It
          returns a result flagged as <strong>needs review</strong>, with
          the failing check named and the data attached. The user sees the
          flag, not a wrong number dressed up as a right one.
        </p>

        <h2>Present results so they can be trusted</h2>
        <p>
          The pipeline isn&apos;t finished when the number is produced. The
          last job is presenting the result so a thoughtful person can
          decide whether to use it. Every number the user sees ships with
          its full lineage: the original question, the extracted intent and
          scope, the plan, the queries that ran, the sources they touched,
          a timestamp, and which QC checks passed. The user can click from
          any number back to the rows that produced it.
        </p>
        <p>
          Provenance is a first-class part of the surface, not a footnote.
          The reason is simple: people trust numbers they can trace. The
          fastest way to lose trust in an AI reporting layer is to give
          someone a number they can&apos;t defend in a meeting. The fastest
          way to build it is to give them the audit trail along with the
          answer.
        </p>

        <h2>One question, two pipelines</h2>
        <p>
          The difference between this and naive AI reporting is easiest to
          see on a single, ordinary request.
        </p>
      </Prose>

      <TwoColumn
        leftHeading="Naive one-shot AI"
        rightHeading="The five-step pipeline"
        left={
          <>
            <p>
              &ldquo;Which of our top-50 customers look at-risk heading into
              Q3?&rdquo;
            </p>
            <p>
              The model interprets the question, writes some SQL on the fly,
              and returns a confident-looking ranked list. No clarifying
              question on what &ldquo;at-risk&rdquo; means. No
              reconciliation. No way to tell why a given customer made the
              list — or which ones <em>should</em> have made the list and
              didn&apos;t.
            </p>
            <p>
              The user shares the list in a meeting. Someone asks how it was
              built. Nobody can answer. The list quietly stops being used.
            </p>
          </>
        }
        right={
          <>
            <p>
              Same question. The pipeline extracts intent, scope, and
              definition; surfaces one clarifying question (which signal
              gets the most weight); produces the plan above; runs each
              step through the approved metric layer; QCs the totals
              against finance, the helpdesk, and the GL; and returns a
              ranked list with each score traceable to the rows behind it.
            </p>
            <p>
              The user shares it in the meeting. Someone asks why a given
              customer made the list. The user clicks the score and shows
              them — usage decline, ticket spike, AR aging, weighted as
              agreed. The list gets used.
            </p>
          </>
        }
      />

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 220' preserveAspectRatio='none'%3E%3Crect width='800' height='220' fill='%23F5F7FA'/%3E%3Cg fill='%238B0A39'%3E%3Crect x='20'  y='80' width='130' height='60' rx='6'/%3E%3Crect x='180' y='80' width='130' height='60' rx='6'/%3E%3Crect x='340' y='80' width='130' height='60' rx='6'/%3E%3Crect x='500' y='80' width='130' height='60' rx='6'/%3E%3Crect x='660' y='80' width='130' height='60' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23ffffff' text-anchor='middle'%3E%3Ctext x='85'  y='106'%3EEnglish%3C/text%3E%3Ctext x='85'  y='124'%3Erequest%3C/text%3E%3Ctext x='245' y='115'%3EPlan%3C/text%3E%3Ctext x='405' y='106'%3EApproved%3C/text%3E%3Ctext x='405' y='124'%3Equeries%3C/text%3E%3Ctext x='565' y='106'%3EQC%3C/text%3E%3Ctext x='565' y='124'%3Echecks%3C/text%3E%3Ctext x='725' y='106'%3ETrusted%3C/text%3E%3Ctext x='725' y='124'%3Eresult%3C/text%3E%3C/g%3E%3Cg stroke='%238B0A39' stroke-width='2' fill='none'%3E%3Cpath d='M150 110 L 180 110' marker-end='url(%23arr)'/%3E%3Cpath d='M310 110 L 340 110' marker-end='url(%23arr)'/%3E%3Cpath d='M470 110 L 500 110' marker-end='url(%23arr)'/%3E%3Cpath d='M630 110 L 660 110' marker-end='url(%23arr)'/%3E%3C/g%3E%3Cdefs%3E%3Cmarker id='arr' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto'%3E%3Cpath d='M0 0 L 10 5 L 0 10 z' fill='%238B0A39'/%3E%3C/marker%3E%3C/defs%3E%3Ctext x='400' y='185' font-family='sans-serif' font-size='12' fill='%23263445' text-anchor='middle'%3EProvenance travels with every number from start to finish.%3C/text%3E%3C/svg%3E"
        alt="Five-stage pipeline diagram: English request, plan, approved queries, QC checks, trusted result"
        caption="The pipeline, end to end. Provenance travels alongside the data at every step."
        width={800}
        height={220}
      />

      <Callout variant="warning" title="Common mistakes">
        <p>The failure modes show up in roughly this order:</p>
        <ul>
          <li>
            <strong>Letting the model write SQL directly against raw
            tables.</strong> Removes every guardrail in one move. Any
            permission, masking, or definition that lived in the semantic
            layer is gone.
          </li>
          <li>
            <strong>Skipping the plan step.</strong> Going from English
            straight to execution means there&apos;s no artifact to review,
            no audit, and no way to ask &ldquo;why did it run that
            query?&rdquo; after the fact.
          </li>
          <li>
            <strong>Treating &ldquo;no error&rdquo; as
            &ldquo;correct.&rdquo;</strong> A query that runs without
            erroring can still be off by a decimal, miss a join, or filter
            the wrong dimension. Reconciliation is the check, not the
            absence of exceptions.
          </li>
          <li>
            <strong>Hiding the provenance.</strong> If the user can&apos;t
            see where the number came from, they won&apos;t trust it — and
            they shouldn&apos;t.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If you can&apos;t hand the AI&apos;s output to a new analyst and
          have them verify it in ten minutes, it isn&apos;t a report yet.
          It&apos;s a guess with a chart on top.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about this at RevenuePoint</h2>
        <p>
          The point of an AI reporting layer isn&apos;t the speed. The
          speed is a side effect. The point is that the pipeline underneath
          is more disciplined than what most analysts would manage under
          deadline: a real semantic layer, a written plan, clarifying
          questions, approved queries, automated reconciliation, and
          provenance attached to every number. Plan, pull, check, show your
          work. Done in that order, the result of the pipeline is something
          a user can take into a meeting and defend — which is the only
          definition of &ldquo;trusted&rdquo; that actually matters.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
