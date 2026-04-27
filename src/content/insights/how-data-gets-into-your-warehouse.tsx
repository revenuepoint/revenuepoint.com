import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'how-data-gets-into-your-warehouse',
  title:
    'How data actually gets into your warehouse: batch, CDC, webhooks — and the DAGs that keep it all honest',
  excerpt:
    'Every warehouse is only as trustworthy as the pipelines feeding it. Here are the three patterns that move data from source systems into the warehouse, the tradeoffs between them, and how we use DAGs to orchestrate the whole thing — including moves between environments.',
  date: '2026-02-24',
  author: {
    name: 'Thomas Jones',
    role: 'Founder, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['Data Pipelines', 'Infrastructure', 'POV'],
  readingTime: '10 min read',
  cover: {
    src: '/img/insights/how-data-gets-into-your-warehouse.svg',
    alt: 'Sources flow through three pattern lanes — batch, CDC, webhooks — into a DAG, then to dev, staging, and prod warehouses with promotion arrows',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          Almost nobody asks the question out loud, but it&apos;s quietly
          behind every wrong decision made from a dashboard:{' '}
          <em>how fresh is this data?</em> A report built on numbers
          that&apos;s seven hours old is a different decision than one
          built on numbers seven minutes old. The answer to &ldquo;how
          fresh&rdquo; isn&apos;t decided by the dashboard. It&apos;s
          decided by the pipeline pattern underneath it, and most
          operators have never been told which pattern they&apos;re on.
        </p>
        <p>
          There are three patterns that do almost all the work of moving
          data from source systems into a warehouse, and one piece of
          orchestration that makes the whole thing safe to run. What
          follows is a walkthrough of each in plain English, when to
          reach for which, and how the DAGs that tie them together let
          us move that same pipeline cleanly between dev, staging, and
          prod.
        </p>

        <h2>Pattern 1 — Scheduled batch</h2>
        <p>
          The oldest pattern, and still the right answer more often than
          people assume. On a schedule — every hour, every night — a job
          extracts a chunk of data from the source, transforms it, and
          loads it into the warehouse. The unit of work is a{' '}
          <em>time window</em>: &ldquo;everything that changed since the
          last run.&rdquo; Classic ETL and ELT both live here; they
          differ on where the transform happens, not on the batching.
        </p>
        <p>
          <strong>Strengths.</strong> Simple to reason about. Cheap to
          run. Easy to make idempotent — a failed run is just re-run,
          and you get the same result. Matches well with the natural
          cadence of most business reporting, which is daily or hourly,
          not sub-minute.
        </p>
        <p>
          <strong>Weaknesses.</strong> Freshness is capped at the
          interval. A nightly job means the dashboard on top of it is
          up to 24 hours stale. Every schedule is a promise about
          freshness, and the promise is weaker than people tend to
          assume.
        </p>
        <p>
          <strong>When to reach for it.</strong> Data that changes
          slowly (products, price lists, chart-of-accounts). Analysis
          that doesn&apos;t need to-the-minute accuracy. Source systems
          that don&apos;t support streaming.
        </p>

        <h2>Pattern 2 — Change Data Capture (CDC)</h2>
        <p>
          Instead of re-querying the source on a schedule, read the
          source database&apos;s transaction log and stream every
          insert, update, and delete into the warehouse as it happens.
          The unit of work drops from &ldquo;a time window&rdquo; to
          &ldquo;a single row change.&rdquo;
        </p>
        <p>
          <strong>Strengths.</strong> Near-real-time freshness —
          seconds, not hours. Cheap on the source database, because
          you&apos;re reading the log rather than issuing repeated
          SELECTs. Captures <em>deletes</em> cleanly, which naive batch
          pulls almost always miss. A row that disappears from the
          source on a Tuesday will be missing from a weekly batch pull
          forever unless you go out of your way to detect it; CDC sees
          it the moment it happens.
        </p>
        <p>
          <strong>Weaknesses.</strong> More infrastructure to run. More
          moving parts to monitor. Ordering, exactly-once semantics, and
          schema changes are real problems that need real handling. When
          CDC works it feels effortless; when it breaks it tends to
          break quietly.
        </p>
        <p>
          <strong>When to reach for it.</strong> Databases you control,
          where freshness actually matters — operational dashboards,
          fraud and risk, inventory management, anything where the
          delta between &ldquo;now&rdquo; and &ldquo;an hour ago&rdquo;
          is the difference between catching a problem and missing it.
        </p>

        <h2>Pattern 3 — Webhooks and event streams</h2>
        <p>
          The third pattern inverts the polling relationship entirely.
          The source system decides what changed and pushes an event to
          you as it happens — &ldquo;order placed,&rdquo; &ldquo;ticket
          closed,&rdquo; &ldquo;invoice paid.&rdquo; You write an
          endpoint that receives these events and lands them in the
          warehouse.
        </p>
        <p>
          <strong>Strengths.</strong> The source does the work of
          knowing what changed. Near-real-time. Works across services
          you don&apos;t own — most modern SaaS tools publish webhooks
          or event streams, and that&apos;s often the only way to get
          their data without hammering their API.
        </p>
        <p>
          <strong>Weaknesses.</strong> You&apos;re on the receiving end
          of somebody else&apos;s retry logic. Duplicate events are
          common (providers retry on timeout). Out-of-order events are
          common. Missed events happen. Every webhook pipeline needs
          deduplication, ordering handling, and a reconciliation
          mechanism to catch what slipped through — typically a
          periodic batch pull against the same source to cross-check.
        </p>
        <p>
          <strong>When to reach for it.</strong> SaaS sources that
          publish webhooks (the CRM, the support tool, the ad
          platform). Product analytics and user-behavior events.
          Anything event-driven where the source system is the
          authority on what happened.
        </p>

        <h2>How they actually get mixed</h2>
        <p>
          Nobody uses just one. A working stack typically looks like
          this: batch for slow-changing reference data (products, price
          lists, employee rosters); CDC for the operational databases
          you own and care about most (orders, customers, payments);
          webhooks for external SaaS sources you don&apos;t own (CRM,
          ad platforms, support tool, ticketing). The warehouse is the
          place they all land and get reconciled into tables that are
          boring to query. The pattern you pick per source is driven by
          two questions: how fast does this data need to be, and what
          does the source system actually support?
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        The warehouse only gets to be the single source of truth if the
        pipelines feeding it are boring, predictable, and re-runnable.
      </PullQuote>

      <Prose>
        <h2>DAGs — the piece that makes it all work</h2>
        <p>
          Pipelines in isolation are scripts. A production data stack is
          many of them, with dependencies between them, and some of them
          have to wait for others to finish. The moment you have more
          than three jobs that depend on each other, cron stops being
          the right tool. What you want is a DAG.
        </p>
        <p>
          A <strong>DAG</strong> is a <em>directed acyclic graph</em> — a
          set of tasks with dependencies that can&apos;t loop back on
          themselves. Each node is a unit of work (&ldquo;extract orders
          from the CRM,&rdquo; &ldquo;rebuild the daily-revenue
          table&rdquo;). Each edge is a dependency (&ldquo;daily-revenue
          depends on orders finishing first&rdquo;). A scheduler walks
          the graph and runs each task once its dependencies complete.
        </p>

        <h3>Why DAGs, not cron</h3>
        <p>
          Cron runs a script at 3 AM whether or not the thing it depends
          on finished. DAGs don&apos;t. If the upstream extract fails,
          every downstream task that depends on it is held, not run on
          stale data. That alone is the difference between reports that
          are &ldquo;usually right&rdquo; and reports that either work
          or fail loudly. A partial failure in cron is invisible until a
          human notices the numbers look wrong. A partial failure in a
          DAG is a red node with a timestamp and a stack trace.
        </p>

        <h3>Idempotency and backfills</h3>
        <p>
          Every task has to be safe to re-run. If a task failed at 3 AM
          and you re-run it at 8 AM, you should get the same result
          either way. In practice, that means every task takes an
          explicit &ldquo;which window am I processing?&rdquo; input and
          writes its output in a way that can overwrite the previous
          version without corrupting anything downstream. This is what
          makes backfills — re-running a pipeline over the last ninety
          days because a metric definition changed — a routine
          operation rather than an emergency.
        </p>

        <h3>Observability</h3>
        <p>
          The DAG itself is the operations dashboard. Which task failed,
          which tasks are blocked by it, how long each one took, which
          downstream tables are now stale — you get all of that by
          looking at the graph. You don&apos;t need a second tool to
          tell you the state of the first tool.
        </p>

        <h2>Promoting the same DAG across environments</h2>
        <p>
          The same DAG definition runs in three environments — dev,
          staging, prod — each pointed at a different warehouse. The
          DAG file is the artifact that moves. The environment-specific
          bits (connection strings, schema names, credentials, feature
          flags) get injected at run time from config, not hardcoded
          into the graph.
        </p>
        <p>
          The promotion path works like code. A change is authored in
          dev and exercised against a dev warehouse, typically loaded
          with sampled or synthetic data so iteration is fast and
          nothing production-critical is touched. Once the pipeline
          passes in dev, the same DAG is promoted to staging, which
          runs against full-scale data but has no production consumers
          downstream — dashboards, agents, and alerts in staging are
          staging copies. Once it passes there, the exact same DAG is
          promoted to prod, where it runs against the real warehouse
          and feeds the consumers your operators actually look at.
        </p>
        <p>
          This is how &ldquo;it worked in dev&rdquo; gets to mean
          something. The pipeline isn&apos;t being rewritten between
          environments — the same code runs, just against a different
          warehouse. Bugs that are going to show up in prod tend to
          show up in staging first, on the way through.
        </p>
        <p>
          A minimal DAG definition that supports this pattern looks
          roughly like this:
        </p>
      </Prose>

      <CodeBlock
        language="python"
        code={`from datetime import timedelta

ENV   = get_env()                    # "dev" | "staging" | "prod"
CFG   = load_config(ENV)             # connection strings, schema names, credentials
DEFAULTS = {
    "retries":       3,
    "retry_delay":   timedelta(minutes=5),
    "on_failure":    alert("#data-ops"),
}

dag = DAG(
    dag_id   = "orders_daily",
    schedule = "0 2 * * *",          # nightly at 02:00
    defaults = DEFAULTS,
)

extract   = Task("extract_orders",   source=CFG.crm,        window="{{ ds }}")
transform = Task("transform_orders", warehouse=CFG.warehouse)
load      = Task("load_daily_revenue", warehouse=CFG.warehouse, table=f"{CFG.schema}.daily_revenue")
verify    = Task("verify_row_counts", warehouse=CFG.warehouse, expected_range=(800, 1500))

extract >> transform >> load >> verify`}
      />

      <Prose>
        <p>
          Three things to notice. The DAG takes its environment from a
          runtime variable; the same file runs in dev, staging, or
          prod. Every task is window-scoped (<code>{'{{ ds }}'}</code>),
          so re-running yesterday&apos;s failed extract yields
          yesterday&apos;s data, not today&apos;s. A{' '}
          <code>verify_row_counts</code> task runs last — a
          light-weight data-quality check, so the pipeline fails loudly
          if the output is outside the expected range rather than
          quietly loading a garbage-sized table.
        </p>
      </Prose>

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 820 400' preserveAspectRatio='none'%3E%3Crect width='820' height='400' fill='%23F5F7FA'/%3E%3Cg fill='%23D4DDE8'%3E%3Crect x='20' y='30'  width='110' height='36' rx='6'/%3E%3Crect x='20' y='90'  width='110' height='36' rx='6'/%3E%3Crect x='20' y='150' width='110' height='36' rx='6'/%3E%3Crect x='20' y='210' width='110' height='36' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23263445' text-anchor='middle'%3E%3Ctext x='75' y='54'%3ECRM%3C/text%3E%3Ctext x='75' y='114'%3EERP%3C/text%3E%3Ctext x='75' y='174'%3ESupport%3C/text%3E%3Ctext x='75' y='234'%3ESaaS%3C/text%3E%3C/g%3E%3Cg fill='%238B0A39'%3E%3Crect x='190' y='40'  width='140' height='34' rx='6'/%3E%3Crect x='190' y='100' width='140' height='34' rx='6'/%3E%3Crect x='190' y='160' width='140' height='34' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23ffffff' text-anchor='middle'%3E%3Ctext x='260' y='62'%3EBatch%3C/text%3E%3Ctext x='260' y='122'%3ECDC%3C/text%3E%3Ctext x='260' y='182'%3EWebhooks%3C/text%3E%3C/g%3E%3Crect x='390' y='80' width='150' height='120' rx='8' fill='%238B0A39'/%3E%3Cg font-family='sans-serif' font-size='13' font-weight='700' fill='%23ffffff' text-anchor='middle'%3E%3Ctext x='465' y='120'%3EDAG%3C/text%3E%3Ctext x='465' y='144'%3Eorchestrator%3C/text%3E%3Ctext x='465' y='170' font-size='11' font-weight='400'%3Eretries, backfills,%3C/text%3E%3Ctext x='465' y='184' font-size='11' font-weight='400'%3Edependencies%3C/text%3E%3C/g%3E%3Cg fill='%23D4DDE8'%3E%3Crect x='620' y='40'  width='170' height='54' rx='6'/%3E%3Crect x='620' y='115' width='170' height='54' rx='6'/%3E%3Crect x='620' y='190' width='170' height='54' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23263445' text-anchor='middle'%3E%3Ctext x='705' y='72'%3EDev warehouse%3C/text%3E%3Ctext x='705' y='147'%3EStaging warehouse%3C/text%3E%3Ctext x='705' y='222'%3EProd warehouse%3C/text%3E%3C/g%3E%3Cg stroke='%238B0A39' stroke-width='1.5' fill='none'%3E%3Cpath d='M130 48  C 165 48,  170 57, 190 57'/%3E%3Cpath d='M130 108 C 165 108, 170 117, 190 117'/%3E%3Cpath d='M130 168 C 165 168, 170 177, 190 177'/%3E%3Cpath d='M130 228 C 165 228, 170 177, 190 177'/%3E%3Cpath d='M330 57  C 360 57,  370 140, 390 140'/%3E%3Cpath d='M330 117 L 390 140'/%3E%3Cpath d='M330 177 C 360 177, 370 140, 390 140'/%3E%3Cpath d='M540 140 C 580 140, 590 67,  620 67'/%3E%3Cpath d='M540 140 L 620 142'/%3E%3Cpath d='M540 140 C 580 140, 590 217, 620 217'/%3E%3C/g%3E%3Cg stroke='%23263445' stroke-width='1.2' stroke-dasharray='4 3' fill='none'%3E%3Cpath d='M705 94  L 705 115' marker-end='url(%23prom)'/%3E%3Cpath d='M705 169 L 705 190' marker-end='url(%23prom)'/%3E%3C/g%3E%3Cdefs%3E%3Cmarker id='prom' viewBox='0 0 10 10' refX='8' refY='5' markerWidth='6' markerHeight='6' orient='auto'%3E%3Cpath d='M0 0 L 10 5 L 0 10 z' fill='%23263445'/%3E%3C/marker%3E%3C/defs%3E%3Ctext x='740' y='108' font-family='sans-serif' font-size='10' fill='%23263445'%3Epromote%3C/text%3E%3Ctext x='740' y='183' font-family='sans-serif' font-size='10' fill='%23263445'%3Epromote%3C/text%3E%3C/svg%3E"
        alt="Diagram: source systems feed three pattern lanes (batch, CDC, webhooks) into a central DAG orchestrator, which writes into three stacked warehouses (dev, staging, prod) with a promotion arrow between them"
        caption="Sources pick a pattern. The DAG orchestrates. The same DAG runs against dev, staging, and prod warehouses, with code promoted across environments the way application code is."
        width={820}
        height={400}
      />

      <Prose>
        <h2>Ad-hoc scripts vs. a real orchestrator</h2>
        <p>
          The contrast is easiest to see on a single ordinary question:
          what happens when the 3 AM extract fails?
        </p>
      </Prose>

      <TwoColumn
        leftHeading="Cron jobs and shell scripts"
        rightHeading="A DAG orchestrator"
        left={
          <>
            <p>
              The extract fails at 3:04 AM. The transform runs at 3:30
              AM anyway, against stale data, and writes a partial
              result. The load runs at 4:00 AM and overwrites the
              previous day&apos;s (correct) table with the partial
              result.
            </p>
            <p>
              Dashboards are now subtly wrong. Nobody knows. Someone
              notices three days later because a number in a weekly
              review looks off. An analyst spends a day figuring out
              what happened.
            </p>
          </>
        }
        right={
          <>
            <p>
              The extract fails at 3:04 AM. The DAG retries twice per
              the task config, then marks the task red. Transform and
              load don&apos;t run — they depend on the extract. The
              yesterday&apos;s (correct) table remains in place.
            </p>
            <p>
              A failure alert fires in the data-ops channel at 3:30 AM
              with a link to the failed task. Once the cause is fixed,
              the DAG is re-run from the failed task forward. The
              dashboards are never wrong; they&apos;re just pointed at
              yesterday&apos;s data until today&apos;s finishes.
            </p>
          </>
        }
      />

      <Callout variant="warning" title="Common mistakes">
        <ul>
          <li>
            <strong>Cron where a DAG belongs.</strong> Works fine for
            one task. Silently wrong the moment two tasks depend on each
            other.
          </li>
          <li>
            <strong>Non-idempotent tasks.</strong> If re-running
            corrupts data, nobody re-runs — so the first failure leaks
            forward forever.
          </li>
          <li>
            <strong>CDC without lag monitoring.</strong> The pipeline
            looks &ldquo;up&rdquo; while silently falling an hour
            behind. You need an explicit freshness SLO, not just a
            health check.
          </li>
          <li>
            <strong>Webhook endpoints without dedup.</strong> Every
            webhook provider retries on timeout. Without dedup on a
            stable event ID, you count the same event twice.
          </li>
          <li>
            <strong>Environment leakage.</strong> The same DAG running
            against dev and prod is the right pattern. A dev run
            accidentally writing to a prod table because the config was
            wrong is the nightmare nobody wants to debug. Isolate the
            connections at the boundary, not in the DAG body.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If the first thing your team does when a dashboard looks
          wrong is &ldquo;check if last night&apos;s pipeline ran,&rdquo;
          the pipeline isn&apos;t telling you anything until someone
          asks. A healthy pipeline layer surfaces its own failures. The
          dashboard being wrong should be the last place you find
          out — not the first.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about it at RevenuePoint</h2>
        <p>
          Data pipelines aren&apos;t the interesting part of a data
          stack, which is exactly why they have to be boring and
          reliable. Match the pattern to the shape of the data —
          scheduled batch for slow-moving reference, CDC for your own
          operational databases, webhooks for everything else — and
          orchestrate the whole thing as a DAG so dependencies,
          retries, and backfills are first-class. Promote the same
          DAG across dev, staging, and prod the way application code
          is promoted, so &ldquo;it worked in dev&rdquo; actually
          means something. Get that right and the warehouse on top
          earns the trust every layer above it is already assuming
          it has.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
