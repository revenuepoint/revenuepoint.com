import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'entity-resolution',
  title:
    'Entity resolution: why your CRM thinks you have three customers when you have one',
  excerpt:
    'Every business above a certain age has the same hidden bug: the same customer appears two or three times across systems, just different enough to look like separate records. Here’s what that costs you, and the disciplined way to fix it in the warehouse layer.',
  date: '2026-04-24',
  author: {
    name: 'Thomas Jones',
    role: 'Founder, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['Entity Resolution', 'Data Quality', 'POV'],
  readingTime: '8 min read',
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          Finance pulls up ARR and sees &ldquo;Acme, Inc.&rdquo; at $180,000.
          Marketing opens the pipeline report and sees &ldquo;ACME Inc&rdquo;
          with $60,000 in open opps. Support looks at the ticket board and
          sees &ldquo;acme inc.&rdquo; with eight open cases, two of them
          angry. It&apos;s the same company. Nobody has any way to know
          that.
        </p>
        <p>
          Every decision made from any one of those three views is wrong.
          Finance underestimates the account&apos;s importance. Marketing
          sends a cold outbound sequence to a customer who&apos;s mid-crisis
          in support. Renewal forecasting double-counts. None of this is a
          CRM hygiene problem. It&apos;s an <em>entity resolution</em>{' '}
          problem, and every business with more than one system of record
          has some version of it.
        </p>

        <h2>What entity resolution actually is</h2>
        <p>
          Entity resolution is the work of deciding, across records from
          many sources, which ones refer to the same real-world thing — a
          customer, an account, a person, a product — and collapsing them
          into one <strong>golden record</strong> that every downstream
          system can trust.
        </p>
        <p>
          It&apos;s not the same as deduplication. Deduplication looks for
          exact matches. Entity resolution handles the messy,
          contradictory, partial data that real businesses actually
          produce: abbreviations, typos, legal-entity suffixes that come
          and go, addresses that formatted differently, a phone number in
          one system and an email in another. The whole problem exists
          because the records are <em>almost</em> the same but not quite.
        </p>

        <h2>Why it&apos;s not a CRM hygiene problem</h2>
        <p>
          It&apos;s tempting to file this under &ldquo;we should clean up
          the CRM.&rdquo; That&apos;s not where the cost lives. The cost
          lives in every downstream number and every outbound action.
        </p>
        <ul>
          <li>
            <strong>Revenue reports</strong> that double-count or
            undercount an account depending on which spelling the query
            happened to catch.
          </li>
          <li>
            <strong>Credit-risk views</strong> that miss an account
            already 90 days past due under a slightly different name.
          </li>
          <li>
            <strong>Outbound sequences</strong> that email a customer in
            the middle of an escalated support case — because the outbound
            tool and the support tool are looking at different rows.
          </li>
          <li>
            <strong>Renewal forecasts</strong> built on a customer count
            that doesn&apos;t match reality in either direction.
          </li>
        </ul>
        <p>
          Cleaning up the CRM fixes one of those four places. Fixing the
          underlying entity-resolution problem fixes all of them at once.
        </p>

        <h2>Two methods, used together</h2>
        <p>
          There are really only two ways to match records, and every
          serious entity-resolution system uses both.
        </p>

        <h3>Deterministic matching</h3>
        <p>
          Hard rules on strong identifiers: same email domain, same tax
          ID, same customer number, same Dun &amp; Bradstreet ID. If two
          records share one of those, they&apos;re the same entity with
          near-zero ambiguity. Deterministic matching is fast, cheap, and
          near-zero false positive. Its weakness is that it has nothing to
          say when the strong identifier is missing — which, in the real
          world, is most of the time.
        </p>

        <h3>Probabilistic matching</h3>
        <p>
          Statistical scoring across multiple attributes. Name similarity
          (using something like Jaro-Winkler or Levenshtein distance,
          which measure how many edits separate two strings). Address
          similarity. Phone number. Domain. Each attribute contributes to
          a combined match score, and records above a threshold get
          merged. Probabilistic matching handles typos, abbreviations, and
          word-order swaps. Its weakness is the cost of being wrong:
          merging two accounts that shouldn&apos;t have been merged is a
          much harder problem to undo than failing to merge two that
          should have been.
        </p>

        <h2>The right answer is both — in tiers</h2>
        <p>
          Run deterministic first. Collapse the easy matches with strong
          identifiers in one pass: same email domain, same tax ID, same
          internal customer number. That eliminates most of the volume
          for almost no computational cost and no real risk of false
          positive.
        </p>
        <p>
          Then run probabilistic on what&apos;s left, and split the
          results into three tiers by confidence:
        </p>
        <ul>
          <li>
            <strong>High confidence (auto-merge)</strong> — above, say,
            0.90. Merge without review.
          </li>
          <li>
            <strong>Medium confidence (human review)</strong> — between
            0.70 and 0.90. Send to a review queue where a person confirms
            or rejects. These are cheap to review and expensive to get
            wrong.
          </li>
          <li>
            <strong>Low confidence (no action)</strong> — below 0.70.
            Leave as separate entities. The signal isn&apos;t strong
            enough to act on.
          </li>
        </ul>
        <p>
          The thresholds are not magic numbers. They&apos;re tuned over
          time, from the outcomes of the review queue and from how costly
          the false positives turn out to be for the specific business.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        The same customer appearing three times isn&apos;t a CRM problem.
        It&apos;s a reporting problem, a renewal problem, and an outbound
        problem wearing a CRM disguise.
      </PullQuote>

      <Prose>
        <h2>Where this belongs — in the warehouse, not in every tool</h2>
        <p>
          You could try to solve this in the CRM. Every CRM has some form
          of merge-duplicates tool. If you do the work there, you&apos;ve
          deduplicated the CRM — and exactly the CRM. The ERP still has
          three Acmes. So does support. So does the billing system.
        </p>
        <p>
          The right place to do entity resolution is the warehouse. One
          resolution pass, run on the union of records from every source,
          produces a golden-record table. Every tool that reads from the
          warehouse — every dashboard, every agent, every report — joins
          to that golden record. Resolve once, benefit everywhere. And
          critically, every golden record keeps a lineage back to the
          original source rows, so you can always answer &ldquo;which
          three records did this roll up from, and from which
          systems?&rdquo;
        </p>

        <h2>One customer, three records</h2>
        <p>
          Here&apos;s what this looks like with a concrete example. Three
          source rows, from three systems, about what a human would
          immediately recognize as the same company:
        </p>
      </Prose>

      <CodeBlock
        language="json"
        code={`// Source records

{ "system": "CRM",     "id": "0018X00002aKj9e", "name": "Acme, Inc.",   "domain": "acme.com",  "city": "Austin", "tax_id": null         }
{ "system": "ERP",     "id": "C-14821",         "name": "ACME Inc",     "domain": null,        "city": "Austin", "tax_id": "47-2081319" }
{ "system": "Support", "id": "cust_4f2a",       "name": "acme inc.",    "domain": "acme.com",  "city": "AUSTIN", "tax_id": null         }

// Match rules

rules:
  deterministic:
    - match if: same(tax_id)
    - match if: same(domain) AND domain is not null
  probabilistic:
    features:
      - name_similarity     (jaro_winkler)
      - city_match          (case_insensitive)
      - domain_match
    threshold:
      auto_merge: score >= 0.90
      review:     0.70 <= score < 0.90
      ignore:     score <  0.70

// Golden record

{
  "entity_id":       "ent_acme_austin_001",
  "display_name":    "Acme, Inc.",
  "canonical_domain":"acme.com",
  "city":            "Austin",
  "tax_id":          "47-2081319",
  "sources": [
    { "system": "CRM",     "id": "0018X00002aKj9e", "matched_via": "domain"       },
    { "system": "ERP",     "id": "C-14821",         "matched_via": "probabilistic (0.93)" },
    { "system": "Support", "id": "cust_4f2a",       "matched_via": "domain"       }
  ]
}`}
      />

      <Prose>
        <p>
          Deterministic rules matched the CRM and the support records via
          the shared domain. The ERP record had no domain, so it fell
          through to the probabilistic tier, scored 0.93 on name + city +
          indirect-domain signals, and auto-merged. The golden record
          inherits the tax ID from the ERP, the canonical display name
          from the CRM, and the lineage pointers back to all three. Every
          downstream join uses <code>entity_id</code>.
        </p>

        <h2>The hard cases that always show up</h2>
        <p>
          Any entity-resolution pipeline has to make deliberate choices
          about a handful of awkward situations that come up over and
          over:
        </p>
        <ul>
          <li>
            <strong>Parents and subsidiaries.</strong> Is a parent
            company the same entity as its subsidiary? For reporting,
            often yes. For billing, usually no. The right answer is to
            model the relationship rather than resolve it away — keep
            them as separate entities with a <code>parent_entity_id</code>
            link.
          </li>
          <li>
            <strong>Slowly changing attributes.</strong> An address
            changes. The entity is still the same entity. The resolution
            logic has to not treat address-change as evidence against
            being the same entity, while still flagging enough change to
            catch a record that&apos;s been repurposed.
          </li>
          <li>
            <strong>Same person, different companies.</strong> Contacts
            with the same email across two accounts aren&apos;t
            necessarily the same person at two jobs — they&apos;re
            sometimes a shared inbox. The resolution logic for contacts
            needs to be strictly less aggressive than for accounts.
          </li>
          <li>
            <strong>Decay.</strong> Records go stale. A customer closes,
            a contact leaves, a domain gets repossessed. The pipeline
            needs a re-resolution schedule, because what was one entity
            last year might legitimately be two this year.
          </li>
        </ul>
      </Prose>

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 320' preserveAspectRatio='none'%3E%3Crect width='800' height='320' fill='%23F5F7FA'/%3E%3Cg fill='%23D4DDE8'%3E%3Crect x='30' y='40'  width='140' height='50' rx='6'/%3E%3Crect x='30' y='130' width='140' height='50' rx='6'/%3E%3Crect x='30' y='220' width='140' height='50' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23263445' text-anchor='middle'%3E%3Ctext x='100' y='62'%3ECRM%3C/text%3E%3Ctext x='100' y='78'%3E&quot;Acme, Inc.&quot;%3C/text%3E%3Ctext x='100' y='152'%3EERP%3C/text%3E%3Ctext x='100' y='168'%3E&quot;ACME Inc&quot;%3C/text%3E%3Ctext x='100' y='242'%3ESupport%3C/text%3E%3Ctext x='100' y='258'%3E&quot;acme inc.&quot;%3C/text%3E%3C/g%3E%3Cg fill='%238B0A39'%3E%3Crect x='260' y='60'  width='150' height='48' rx='6'/%3E%3Crect x='260' y='130' width='150' height='48' rx='6'/%3E%3Crect x='260' y='200' width='150' height='48' rx='6'/%3E%3C/g%3E%3Cg font-family='sans-serif' font-size='12' font-weight='700' fill='%23ffffff' text-anchor='middle'%3E%3Ctext x='335' y='88'%3EDeterministic%3C/text%3E%3Ctext x='335' y='158'%3EProbabilistic%3C/text%3E%3Ctext x='335' y='228'%3EReview queue%3C/text%3E%3C/g%3E%3Crect x='540' y='115' width='210' height='90' rx='8' fill='%238B0A39'/%3E%3Cg font-family='sans-serif' font-size='13' font-weight='700' fill='%23ffffff' text-anchor='middle'%3E%3Ctext x='645' y='150'%3EGolden record%3C/text%3E%3Ctext x='645' y='172'%3Eent_acme_austin_001%3C/text%3E%3Ctext x='645' y='192' font-size='11' font-weight='400'%3E(lineage preserved)%3C/text%3E%3C/g%3E%3Cg stroke='%238B0A39' stroke-width='1.5' fill='none'%3E%3Cpath d='M170 65  C 220 65,  230 84,  260 84'/%3E%3Cpath d='M170 155 L 260 155'/%3E%3Cpath d='M170 245 C 220 245, 230 224, 260 224'/%3E%3Cpath d='M410 84  C 475 84,  500 160, 540 160'/%3E%3Cpath d='M410 154 L 540 160'/%3E%3Cpath d='M410 224 C 475 224, 500 160, 540 160'/%3E%3C/g%3E%3C/svg%3E"
        alt="Resolution pipeline: three source records on the left flow through deterministic, probabilistic, and review tiers, collapsing into a single golden record on the right"
        caption="Three source records, three matching tiers, one golden record with the lineage preserved."
        width={800}
        height={320}
      />

      <Callout variant="warning" title="Common mistakes">
        <ul>
          <li>
            <strong>Name-only matching.</strong> &ldquo;Acme, Inc.&rdquo;
            and &ldquo;Acme Inc&rdquo; look identical to a human and
            completely different to a naive string comparison. Use
            similarity metrics, not equality.
          </li>
          <li>
            <strong>Auto-merging on weak probabilistic matches.</strong>{' '}
            A false merge is much more painful to unwind than a missed
            merge. Err toward the review queue.
          </li>
          <li>
            <strong>Resolving in every tool separately.</strong> You end
            up with three different notions of &ldquo;the same
            customer.&rdquo; Resolve once, in the warehouse, and let
            every tool reference the result.
          </li>
          <li>
            <strong>One-time cleanup.</strong> Entity resolution
            isn&apos;t a project; it&apos;s a continuous process.
            Yesterday&apos;s golden record will pick up new sibling
            records tomorrow.
          </li>
          <li>
            <strong>Losing the lineage.</strong> After a merge, you should
            still be able to answer &ldquo;which original rows made this
            record?&rdquo; If you can&apos;t, you&apos;ve lost the ability
            to debug the pipeline when it&apos;s wrong.
          </li>
        </ul>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          If two of your teams can run &ldquo;how many customers do we
          have?&rdquo; and produce different numbers, you don&apos;t have
          a hygiene problem you can defer. You have an unresolved-entities
          problem, and every number in your business that touches
          customers is a little bit wrong.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about it at RevenuePoint</h2>
        <p>
          Entity resolution isn&apos;t the flashiest part of a data
          stack. It&apos;s rarely what anyone wants to talk about. But
          it&apos;s the thing that makes every downstream number honest —
          the revenue report, the renewal forecast, the outbound queue,
          the support load by account. Do it once, in the warehouse, with
          deterministic rules for the easy cases, probabilistic scoring
          for the hard ones, a review queue for the ambiguous middle, and
          the lineage preserved throughout. The rest of the stack spends
          the rest of its life benefiting from that one boring pass.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
