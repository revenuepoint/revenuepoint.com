import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'the-semantic-layer',
  title:
    "The semantic layer: where 'revenue' gets defined exactly once (and why AI can't work reliably without it)",
  excerpt:
    'Five teams. Five definitions of “revenue.” Five different numbers in five different reports. The semantic layer is the layer that fixes this — and the reason an AI on top of your warehouse goes from confidently wrong to defensibly right.',
  date: '2025-11-18',
  author: {
    name: 'Thomas Jones',
    role: 'Managing Director, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['Semantic Layer', 'AI', 'POV'],
  readingTime: '9 min read',
  cover: {
    src: '/img/insights/the-semantic-layer.svg',
    alt: 'A semantic layer band sits between warehouse tables at the bottom and dashboards, reports, agents, and AI chat at the top — every consumer reads through the layer, not the tables',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          Finance pulls revenue and gets one number. Sales pulls revenue
          and gets another. The ad-spend dashboard&apos;s
          &ldquo;revenue&rdquo; is yet a third. Each is correct against
          some reasonable definition. None of them are the same number.
          Multiply this across thirty business terms — <em>active
          customer</em>, <em>renewal</em>, <em>cohort</em>, <em>MRR</em>,
          <em> churn</em> — and you get a quiet drag on every meeting where
          leadership tries to make a decision from a chart.
        </p>
        <p>
          The fix isn&apos;t a better dashboard. It isn&apos;t a smarter
          AI. It&apos;s a layer between the warehouse and everything that
          reads from it where each of those terms gets defined exactly
          once, in writing, with an owner. That layer is the{' '}
          <strong>semantic layer</strong>. It&apos;s the difference
          between a warehouse that promises a single source of truth and a
          warehouse that actually delivers one.
        </p>

        <h2>What a semantic layer actually is</h2>
        <p>
          A semantic layer is a thin layer that sits between the raw
          warehouse tables and everything that reads from them —
          dashboards, scheduled reports, watcher agents, AI chat,
          embedded analytics. It maps the messy physical structure
          underneath (column names, joins across five tables, filters
          everyone forgets) to business-friendly named concepts:{' '}
          <em>revenue, customer, product line, cohort, churn rate</em>.
        </p>
        <p>
          Every consumer queries the named concept. The semantic layer
          translates the query into SQL against the right tables with
          the right joins and the right filters. Define once, consume
          everywhere.
        </p>

        <h2>The three building blocks</h2>
        <p>
          Every semantic-layer system uses the same three primitives,
          regardless of which technology implements it.
        </p>
        <ul>
          <li>
            <strong>Dimensions</strong> — the things you slice by.
            Region, product line, signup month, customer segment.
            Hierarchies live here too: product → product family →
            category.
          </li>
          <li>
            <strong>Measures</strong> — the raw quantities you can
            aggregate. Order total, login count, support-ticket count.
            Always tied to a specific column on a specific table.
          </li>
          <li>
            <strong>Metrics</strong> — a measure with a defined
            aggregation, a set of expected dimensions, optional filters,
            and a name. <em>Monthly recurring revenue. Net new customers.
            Gross margin by product line.</em> This is the unit
            consumers actually query.
          </li>
        </ul>

        <h2>What lives in a semantic layer beyond the formula</h2>
        <p>
          The formula is the obvious part. The rest of what belongs in
          a semantic layer is what makes it actually work for a real
          business — and what makes it usable for AI.
        </p>
        <ul>
          <li>
            <strong>Entity definitions.</strong> What <em>is</em> a
            customer? Is a deactivated trial still one? Does a parent
            account roll up its subsidiaries? The semantic layer
            answers this once, in writing, and every metric that
            references &ldquo;customer&rdquo; uses the same answer.
          </li>
          <li>
            <strong>Synonyms and acronyms.</strong> &ldquo;ARR,&rdquo;
            &ldquo;annual recurring revenue,&rdquo; and &ldquo;subscription
            revenue&rdquo; all point to the same metric. Without an
            explicit map, a model fielding a real user&apos;s question
            has to guess.
          </li>
          <li>
            <strong>Natural-language descriptions.</strong> A short,
            plain-English description of every metric and dimension. A
            model uses these to ground a question; without them it
            hallucinates an interpretation that sounds confident.
          </li>
          <li>
            <strong>Joins and filters baked in.</strong> Every metric
            carries the joins it requires and the filters that define
            it (exclude internal test accounts; exclude churned
            customers from MRR). Consumers never re-derive these.
          </li>
          <li>
            <strong>Access controls.</strong> Row-level and column-level
            rules that travel with the metric. A user querying
            &ldquo;revenue by customer&rdquo; only sees the customers
            they&apos;re entitled to.
          </li>
          <li>
            <strong>Certification status.</strong> Which metrics are
            <em> trusted</em>, which are <em>experimental</em>, which
            are <em>deprecated</em>. Surfaces in the catalog so
            consumers know what to use and what to avoid.
          </li>
          <li>
            <strong>Ownership and tests.</strong> Each metric has a
            named owner and a small set of automated tests — should
            never go negative, should reconcile against the GL within
            1%, should match the prior period within a sane band.
            Ownership is what keeps the layer from rotting; tests are
            how you find out when it has.
          </li>
        </ul>

        <h2>The principle underneath: canonicalization</h2>
        <p>
          The semantic layer is, more precisely, the{' '}
          <strong>canonical</strong> layer — the place where every
          business term has exactly one official version. Where entity
          resolution makes the <em>record</em> canonical (one Acme,
          Inc., not three), the semantic layer makes the{' '}
          <em>definition</em> canonical (one &ldquo;active
          customer,&rdquo; not five). Both are flavors of the same
          discipline: pick THE version, write it down, route every
          consumer through it. A warehouse without canonical records
          and canonical definitions is a warehouse that has the data
          but can&apos;t be trusted to answer a question the same way
          twice.
        </p>

        <h2>The anatomy of a metric definition</h2>
        <p>
          The thing all of this collapses into is a small, version-
          controlled file. One metric, fully specified, looks roughly
          like this:
        </p>
      </Prose>

      <CodeBlock
        language="yaml"
        code={`metric: revenue_net
label: Net Revenue
description: |
  Recognized revenue from external customers, net of discounts,
  refunds, and credits. Excludes internal test accounts and any
  order with status='void'. Reconciles to the GL within $1 by
  the second business day of each month.

source_model: fct_orders

measure:
  column: order_total_net
  aggregation: sum

default_dimensions:
  - product_line
  - region
  - signup_cohort

time:
  column: order_date
  default_grain: day
  supported_grains: [day, week, month, quarter, year]

filters:
  - "customer_segment <> 'internal_test'"
  - "order_status <> 'void'"

synonyms:
  - revenue
  - net revenue
  - net rev
  - recognized revenue

owner: finance-data@revenuepoint
certification: trusted
deprecated: false

tests:
  - name: never_negative
    assert: "{{ metric }} >= 0"
  - name: reconciles_to_gl
    assert: "abs({{ metric }} - {{ ref('gl_revenue') }}) < 1.00"
  - name: weekly_within_band
    assert: "abs({{ metric }} - lag({{ metric }}, 7)) < 0.40 * {{ metric }}"`}
      />

      <Prose>
        <p>
          That single file is what every dashboard, every scheduled
          report, every agent, and every AI assistant reads from when
          someone asks a question that involves &ldquo;net revenue&rdquo;
          (or any of its synonyms). Change the filter set; the change
          propagates to every consumer the next time they query.
        </p>

        <h2>Why this changes everything for AI</h2>
        <p>
          A model writing SQL against undecorated warehouse tables is
          guessing at every step. Which <code>revenue</code> column —
          there are five? Which join, given that two tables have a
          plausible <code>customer_id</code>? Which filters, given that
          the upstream team excludes test accounts but the downstream
          team doesn&apos;t? The model will produce an answer.
          Industry testing in 2026 puts that answer correct around 40%
          of the time. The remaining 60% is confidently wrong, which is
          worse than a refusal.
        </p>
        <p>
          A model grounded in a semantic layer doesn&apos;t write SQL.
          It picks from a curated catalog of named metrics, with
          descriptions and synonyms attached, and the layer compiles
          the SQL. The same testing that scored raw-table accuracy at
          ~40% scored semantic-layer-grounded accuracy at ~83%. Same
          model. Same warehouse. The layer is the variable.
        </p>
        <p>
          The mechanism is the same allowlist principle that makes
          agentic action safe to automate: the model can ask things on
          the menu, and only things on the menu. The semantic layer is
          the menu — for questions instead of for actions.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        A model that has to guess what &ldquo;revenue&rdquo; means is
        going to guess. The semantic layer is the file that tells it
        the answer — once, in writing, with an owner.
      </PullQuote>

      <Prose>
        <h2>Define once, consume everywhere</h2>
        <p>
          The single biggest practical benefit of the semantic layer
          is that it gets queried by every consumer of the data, not
          just one. The same definition of <em>active customer</em>{' '}
          backs the dashboard the CFO checks, the email the renewals
          team gets every Monday, the watcher agent that flags churn
          risk overnight, and the chat box the operator types into when
          they want to know which accounts are quiet this week.
        </p>
        <p>
          When the definition changes — say, finance decides
          &ldquo;active&rdquo; now requires a login in the last 30 days
          instead of 60 — every consumer changes at once. Nobody
          chases down five copies in five tools. Nobody discovers, two
          quarters later, that the renewals email has been quietly
          using the old definition.
        </p>

        <h2>Where the semantic layer should live</h2>
        <p>
          Not in the BI tool. A definition that lives in a single
          consumer is trapped there; every other consumer ends up
          re-inventing it, badly. Not in a thousand SQL views nobody
          owns, scattered across a warehouse — the same problem at
          larger scale.
        </p>
        <p>
          The right place is the platform itself, version-controlled
          alongside the warehouse models, exposed to every consumer
          through an open API. Definitions belong where data, access
          policies, audit history, and tests already live. That&apos;s
          the only configuration where &ldquo;single source of
          truth&rdquo; can be more than a slogan.
        </p>
      </Prose>

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 380' preserveAspectRatio='none'%3E%3Crect width='800' height='380' fill='%23F4EFE6'/%3E%3Cg font-family='Georgia, serif'%3E%3Crect x='40' y='30' width='130' height='40' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1.2'/%3E%3Ctext x='105' y='56' font-size='13' font-style='italic' fill='%231A1612' text-anchor='middle'%3EDashboards%3C/text%3E%3Crect x='200' y='30' width='130' height='40' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1.2'/%3E%3Ctext x='265' y='56' font-size='13' font-style='italic' fill='%231A1612' text-anchor='middle'%3EReports%3C/text%3E%3Crect x='360' y='30' width='130' height='40' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1.2'/%3E%3Ctext x='425' y='56' font-size='13' font-style='italic' fill='%231A1612' text-anchor='middle'%3EAgents%3C/text%3E%3Crect x='520' y='30' width='130' height='40' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1.2'/%3E%3Ctext x='585' y='56' font-size='13' font-style='italic' fill='%231A1612' text-anchor='middle'%3EAI chat%3C/text%3E%3Cg stroke='%231A1612' stroke-width='1' fill='none'%3E%3Cline x1='105' y1='70' x2='105' y2='130'/%3E%3Cline x1='265' y1='70' x2='265' y2='130'/%3E%3Cline x1='425' y1='70' x2='425' y2='130'/%3E%3Cline x1='585' y1='70' x2='585' y2='130'/%3E%3C/g%3E%3Crect x='40' y='130' width='720' height='110' fill='%238B0A39'/%3E%3Ctext x='56' y='154' font-size='11' letter-spacing='3' font-weight='700' fill='%23F4EFE6'%3ESEMANTIC LAYER%3C/text%3E%3Cg font-family='Georgia, serif'%3E%3Crect x='90' y='170' width='180' height='52' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1'/%3E%3Ctext x='180' y='200' font-size='14' font-style='italic' fill='%231A1612' text-anchor='middle'%3Erevenue_net%3C/text%3E%3Crect x='310' y='170' width='180' height='52' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1'/%3E%3Ctext x='400' y='200' font-size='14' font-style='italic' fill='%231A1612' text-anchor='middle'%3Eactive_customers%3C/text%3E%3Crect x='530' y='170' width='180' height='52' fill='%23FAF6EC' stroke='%231A1612' stroke-width='1'/%3E%3Ctext x='620' y='200' font-size='14' font-style='italic' fill='%231A1612' text-anchor='middle'%3Egross_margin%3C/text%3E%3C/g%3E%3Cg stroke='%231A1612' stroke-width='1' stroke-dasharray='3 3' fill='none'%3E%3Cline x1='105' y1='240' x2='105' y2='300'/%3E%3Cline x1='265' y1='240' x2='265' y2='300'/%3E%3Cline x1='425' y1='240' x2='425' y2='300'/%3E%3Cline x1='585' y1='240' x2='585' y2='300'/%3E%3C/g%3E%3Cg fill='%23DCD4C0' stroke='%23C4BCA8' stroke-width='1'%3E%3Crect x='60' y='300' width='100' height='32'/%3E%3Crect x='180' y='300' width='100' height='32'/%3E%3Crect x='300' y='300' width='100' height='32'/%3E%3Crect x='420' y='300' width='100' height='32'/%3E%3Crect x='540' y='300' width='100' height='32'/%3E%3Crect x='660' y='300' width='100' height='32'/%3E%3C/g%3E%3Cg font-family='Georgia, serif' font-size='12' font-style='italic' fill='%232D261E' text-anchor='middle'%3E%3Ctext x='110' y='321'%3Eorders%3C/text%3E%3Ctext x='230' y='321'%3Ecustomers%3C/text%3E%3Ctext x='350' y='321'%3Eproducts%3C/text%3E%3Ctext x='470' y='321'%3Eprices%3C/text%3E%3Ctext x='590' y='321'%3Eaccounts%3C/text%3E%3Ctext x='710' y='321'%3Etouches%3C/text%3E%3C/g%3E%3Ctext x='40' y='292' font-family='Georgia, serif' font-size='11' letter-spacing='3' font-weight='700' fill='%231A1612'%3EWAREHOUSE%3C/text%3E%3C/g%3E%3C/svg%3E"
        alt="The semantic layer sits between warehouse tables and the consumers above; every consumer reads through the layer, not directly from the tables"
        caption="Every consumer reads from the named metrics in the middle band. The layer compiles each query into SQL against the warehouse tables underneath."
        width={800}
        height={380}
      />

      <Prose>
        <h2>Without and with — same question, two pipelines</h2>
        <p>
          Easiest to see on a single ordinary question, asked by an
          operator using an AI assistant.
        </p>
      </Prose>

      <TwoColumn
        leftHeading="Without a semantic layer"
        rightHeading="With a semantic layer"
        left={
          <>
            <p>
              The operator asks: &ldquo;What was our revenue by product
              line last quarter?&rdquo;
            </p>
            <p>
              The model writes SQL against three raw tables. It picks
              the gross-with-discounts <code>revenue</code> column
              (there are five candidates), forgets to exclude internal
              test accounts, and joins on a customer ID that drops
              orders without a contact record. The number comes back
              fast, and is off by 8%.
            </p>
            <p>
              The operator has no way to tell. The number lands in a
              QBR deck. Two weeks later, finance notices in
              reconciliation.
            </p>
          </>
        }
        right={
          <>
            <p>
              Same question. The model picks the metric{' '}
              <code>revenue_net</code> from the catalog, joined to the{' '}
              <code>product_line</code> dimension, filtered for the
              requested quarter. The semantic layer compiles the SQL —
              correct columns, correct joins, baked-in test-account
              exclusion.
            </p>
            <p>
              The number reconciles to the GL within $1, the same way
              every other consumer of <code>revenue_net</code> does.
              The query saves as a re-runnable dashboard. The next
              quarter&apos;s answer comes from the same definition,
              automatically.
            </p>
          </>
        }
      />

      <Callout variant="warning" title="Common mistakes">
        <ul>
          <li>
            <strong>Defining metrics in the BI tool, not the semantic
            layer.</strong> Traps the definitions inside one consumer.
            Every other consumer re-invents them, slightly differently.
          </li>
          <li>
            <strong>No descriptions on metrics or dimensions.</strong>{' '}
            A name with no description is a name an AI has to guess at.
            Descriptions are the grounding that makes natural-language
            queries actually work.
          </li>
          <li>
            <strong>No synonyms.</strong> Half the questions a real
            user asks come in with the wrong word —
            &ldquo;subs&rdquo; for subscription revenue, &ldquo;reps&rdquo;
            for sales reps. Synonyms are not optional.
          </li>
          <li>
            <strong>Skipping tests.</strong> A silent change in an
            upstream table breaks every metric that depends on it.
            Without tests, the first you hear is a wrong number in a
            board deck.
          </li>
          <li>
            <strong>No deprecation discipline.</strong> Metrics added
            by a long-departed analyst quietly multiply. Ownership and
            a deprecation flag are how you stop the catalog from
            rotting into folklore.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If two of your teams can ask &ldquo;what was our revenue last
          quarter?&rdquo; and produce different numbers, you don&apos;t
          have a semantic-layer problem you can defer. You have one
          you&apos;re already paying for, in every meeting where
          someone has to ask which version is right.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about it at RevenuePoint</h2>
        <p>
          The semantic layer is the unglamorous layer between the data
          and everything that reads from it. It is not the place
          anyone&apos;s ever excited to invest in, which is exactly
          why most warehouses don&apos;t have a real one. Get it right
          and dashboards stop disagreeing, AI starts answering, and the
          warehouse finally earns the &ldquo;single source of
          truth&rdquo; line that&apos;s been on someone&apos;s slide
          for the last five years. Skip it and every layer above pays
          the cost — in meetings, in reconciliations, in confidently
          wrong AI answers — for as long as the warehouse exists.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
