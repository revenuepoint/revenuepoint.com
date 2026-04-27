import { Callout } from '@/components/insights/Callout';
import { CodeBlock } from '@/components/insights/CodeBlock';
import { Figure } from '@/components/insights/Figure';
import { Prose } from '@/components/insights/Prose';
import { PullQuote } from '@/components/insights/PullQuote';
import { TwoColumn } from '@/components/insights/TwoColumn';
import type { Post } from '@/types/insights';

const meta = {
  slug: 'what-orchestration-actually-means',
  title:
    "What orchestration actually means (and why it's the safe way to let AI act on your business)",
  excerpt:
    'A plain-English walkthrough of how AI agents, tools, and systems of record fit together — and why the human approval step is the whole reason this approach is safe.',
  date: '2025-07-15',
  author: {
    name: 'Thomas Jones',
    role: 'Managing Director, RevenuePoint',
    avatarInitials: 'TJ',
  },
  tags: ['Orchestration', 'AI', 'POV'],
  readingTime: '8 min read',
  cover: {
    src: '/img/insights/what-orchestration-actually-means.svg',
    alt: 'Three labeled stages: agent proposes, human approves, system executes',
    width: 1600,
    height: 900,
  },
};

function Body() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 lg:py-16">
      <Prose>
        <p>
          Every operator I talk to has the same setup: a CRM, an ERP, an
          accounting system, a support tool, a warehouse of some kind, and a
          layer of spreadsheets stitching the rest together. Every one of them
          has dashboards. Every one of them{' '}
          <strong>can see the problem</strong>. Very few of them have a way to{' '}
          <em>do something about it</em> without pulling a human off whatever
          else they were doing.
        </p>
        <p>
          This is the gap. Not a visibility gap — an{' '}
          <strong>action gap</strong>. A dashboard is a mirror; it reflects the
          past back at you. The orchestration layer is the thing that takes the
          next step on your behalf — and, done correctly, shows you exactly
          what that step will be before it happens.
        </p>

        <h2>What &ldquo;orchestration&rdquo; actually means</h2>
        <p>
          The word gets used loosely, so here is the definition we work from.
          An orchestration layer does four things, every day, without being
          asked:
        </p>
        <ul>
          <li>
            <strong>Connect</strong> — reach into every system of record you
            already run (CRM, ERP, accounting, support, email, warehouse) and
            read from them in a consistent way.
          </li>
          <li>
            <strong>Watch</strong> — run always-on agents that look for the
            signals that actually drive revenue, cash, and customer risk.
          </li>
          <li>
            <strong>Decide</strong> — when an agent finds something worth
            acting on, it assembles a specific proposal: what should change,
            in which system, and why.
          </li>
          <li>
            <strong>Act</strong> — once a human approves the proposal, the
            change is written back to the source system with a full audit
            trail.
          </li>
        </ul>
        <p>
          The fourth step is where most teams get nervous about AI, and they
          should. The next three sections are about why the middle steps —
          tools and proposals — are what make the last step safe.
        </p>

        <h2>What a &ldquo;tool&rdquo; is</h2>
        <p>
          When we say an agent has &ldquo;tools,&rdquo; we mean something
          specific. A tool is a declared, narrowly-scoped capability the agent
          is allowed to use. Something like{' '}
          <code>query_opportunities</code>, <code>draft_followup_email</code>,
          or <code>propose_credit_memo</code>. Each tool has a name, a
          description, and a strict schema for its inputs — no free-form
          calls, no shell access, no &ldquo;just figure it out.&rdquo;
        </p>
        <p>
          The important part: <strong>an agent cannot do anything that
          isn&apos;t a tool.</strong> If you haven&apos;t declared a tool for
          sending wire transfers, the agent physically cannot send a wire
          transfer. Tools are the allowlist. They are the safety boundary, and
          they are also the vocabulary an agent has for thinking about the
          business.
        </p>

        <h2>How tools connect to systems</h2>
        <p>
          Tools are typed contracts between the agent and the outside world.
          Each tool knows three things: which system of record it touches
          (Salesforce, NetSuite, Zendesk, Gmail, your warehouse), what fields
          it can read or change, and whether the change is reversible. That
          metadata travels with every tool call.
        </p>
        <p>
          Here&apos;s the subtle but critical design choice we make: agents do
          not execute tools directly against your source systems. They{' '}
          <strong>plan</strong> them. A tool call produces a structured
          proposal — a record of what the agent intends to do, with enough
          context for a human to evaluate it. That proposal is what lands in
          your queue. The source system doesn&apos;t see anything until a
          person approves.
        </p>
      </Prose>

      <PullQuote attribution="RevenuePoint design principle">
        The model doesn&apos;t get the keys to the system. It writes a
        proposal. The human turns the key.
      </PullQuote>

      <Prose>
        <h2>The anatomy of a proposed action</h2>
        <p>
          Abstractions aside, here&apos;s what one of these proposals actually
          looks like. Imagine an agent is watching for stalled opportunities —
          open deals with no recent activity — and it finds one worth
          following up on. It drafts a personalized email using everything in
          the CRM and the prior email thread. The proposal looks roughly like
          this:
        </p>
      </Prose>

      <CodeBlock
        language="json"
        code={`{
  "action": "send_followup_email",
  "target_system": "Gmail + Salesforce",
  "summary": "Follow up with Harborline on stalled Q2 expansion",
  "rationale": [
    "Opportunity open 52 days, no activity in 18",
    "Last thread: pricing question, unanswered since Mar 14",
    "Account expanded seat count 2x in last 12 months — healthy signal"
  ],
  "changes": [
    {
      "entity": "Email",
      "action": "send",
      "system": "Gmail",
      "to": "dana.ruiz@harborline.com",
      "subject": "Quick follow-up on the Q2 expansion pricing",
      "body_preview": "Hi Dana — circling back on the question you raised on Mar 14 about tiered pricing above 250 seats. Here's what we landed on..."
    },
    {
      "entity": "Opportunity",
      "action": "update",
      "system": "Salesforce",
      "fields": { "last_activity_date": "2026-04-19", "stage_notes": "Re-engaged via follow-up email" }
    }
  ],
  "risk": "low",
  "reversible": true,
  "approver": "James Chen",
  "audit_id": "act_2026_0419_0812Z"
}`}
      />

      <Prose>
        <p>
          Notice what&apos;s in there. The email body is written out in full —
          the approver sees the actual message before it sends, not a summary
          of it. The <strong>rationale</strong> explains why the agent thought
          this was worth doing. The <strong>changes</strong> array lists every
          downstream edit, in every system, as a typed record. The{' '}
          <strong>approver</strong> is named. And every proposal has an{' '}
          <code>audit_id</code> that finance or ops can pull up six months
          from now when someone asks &ldquo;why did we do this?&rdquo;.
        </p>

        <h2>Why this is a safe way to automate with AI</h2>
        <p>
          The reason this approach works — and the reason we believe it is the
          right default for any business considering AI-driven automation — is
          that it inverts the usual worry about agents. The concern with AI
          acting on your business is that the model might do something
          unexpected. The answer is not to make the model smarter. The answer
          is to make sure nothing the model produces touches your systems
          until a person has seen it and said yes.
        </p>
        <ul>
          <li>
            <strong>Nothing happens without a named approver.</strong> Every
            proposal routes to a human who owns that kind of decision — the AE
            for outbound email, the support lead for case replies, the
            controller for anything touching the ledger.
          </li>
          <li>
            <strong>Every action is a structured record, not free-form model
            output.</strong> The agent produces JSON with a defined schema.
            Unstructured text is never sent directly to a system of record.
          </li>
          <li>
            <strong>Every edit is reversible or logged.</strong> The
            proposal declares whether it can be undone, and the audit trail
            captures who approved what, when, and on the basis of which data.
          </li>
          <li>
            <strong>Tools are an allowlist.</strong> The model cannot invent
            new capabilities at runtime. If a tool for a given action
            doesn&apos;t exist, the action cannot happen, full stop.
          </li>
        </ul>
      </Prose>

      <Figure
        src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 320' preserveAspectRatio='none'%3E%3Crect width='800' height='320' fill='%23F5F7FA'/%3E%3Cg stroke='%23D4DDE8' stroke-width='1.5'%3E%3Cline x1='0' y1='80' x2='800' y2='80'/%3E%3Cline x1='0' y1='160' x2='800' y2='160'/%3E%3Cline x1='0' y1='240' x2='800' y2='240'/%3E%3C/g%3E%3Cg fill='%238B0A39'%3E%3Crect x='80' y='48' width='120' height='64' rx='6'/%3E%3Crect x='340' y='128' width='120' height='64' rx='6'/%3E%3Crect x='600' y='208' width='120' height='64' rx='6'/%3E%3C/g%3E%3Cg stroke='%238B0A39' stroke-width='2' fill='none'%3E%3Cpath d='M200 80 Q 270 80 270 128 T 340 128'/%3E%3Cpath d='M460 160 Q 530 160 530 208 T 600 208'/%3E%3C/g%3E%3Ctext x='140' y='85' font-family='sans-serif' font-size='14' font-weight='700' fill='%23fff' text-anchor='middle'%3EAgent proposes%3C/text%3E%3Ctext x='400' y='165' font-family='sans-serif' font-size='14' font-weight='700' fill='%23fff' text-anchor='middle'%3EHuman approves%3C/text%3E%3Ctext x='660' y='245' font-family='sans-serif' font-size='14' font-weight='700' fill='%23fff' text-anchor='middle'%3ESystem executes%3C/text%3E%3C/svg%3E"
        alt="Diagram: agent proposes, human approves, system executes — each hop logged"
        caption="Agents propose, humans approve, systems execute. Every hop is logged."
        width={800}
        height={320}
      />

      <Prose>
        <h2>Three places this already pays off</h2>
        <p>
          Orchestration isn&apos;t useful in the abstract. It&apos;s useful
          because a lot of work inside a mid-market business is
          pattern-recognition plus a well-written message — exactly the kind
          of work an agent can propose and a human can approve in thirty
          seconds. Three examples where the payoff shows up first:
        </p>
      </Prose>

      <TwoColumn
        leftHeading="Opportunity follow-ups"
        rightHeading="What the operator sees"
        left={
          <>
            <p>
              A watcher runs nightly across the CRM looking for open
              opportunities that have gone quiet. For each one, an agent
              reads the account record, the past email threads, and recent
              activity, then drafts a personalized follow-up.
            </p>
          </>
        }
        right={
          <>
            <p>
              The AE opens a queue in the morning with a dozen drafted
              emails, each with the reasoning and the full body visible.
              Approve, tweak, or skip. What used to be a &ldquo;I should
              follow up with those accounts this week&rdquo; task becomes
              ten minutes.
            </p>
          </>
        }
      />

      <TwoColumn
        leftHeading="Support case resolution"
        rightHeading="What the operator sees"
        left={
          <>
            <p>
              An agent reads each inbound case alongside the customer&apos;s
              history and the internal knowledge base. For cases that match
              known patterns, it proposes a reply and any record updates
              (e.g. resetting a flag, adjusting an entitlement).
            </p>
          </>
        }
        right={
          <>
            <p>
              The rep sees a drafted response with the reasoning and the
              referenced KB article. One click sends; one click hands it
              back. Tier-1 cases resolve in under a minute without
              sacrificing the human check.
            </p>
          </>
        }
      />

      <TwoColumn
        leftHeading="Invoice &amp; billing anomalies"
        rightHeading="What the operator sees"
        left={
          <>
            <p>
              An agent reconciles invoices against the underlying contract
              terms and received POs. When it spots a mismatch — the wrong
              rate applied, a missing discount, a duplicate line — it
              proposes the correction: a credit memo, a re-issue, or an
              adjustment.
            </p>
          </>
        }
        right={
          <>
            <p>
              Finance sees the proposal with the contract clause, the
              invoice line, and the proposed correction side-by-side. The
              approver has the full justification before any adjustment
              touches the ledger.
            </p>
          </>
        }
      />

      <Callout variant="warning" title="Anti-pattern to avoid">
        <p>
          Don&apos;t try to turn every human workflow into a fully-autonomous
          agent on day one. Start with <strong>proposal-only</strong> — every
          action routed to a human. Graduate individual, low-risk tools to
          auto-execute only after the approval queue has given you months of
          evidence that the proposals are consistently right. Trust is earned
          per tool, not granted to the agent as a whole.
        </p>
      </Callout>

      <Callout variant="tip" title="A useful litmus test">
        <p>
          After you see a signal in a dashboard, does your team still have to
          email someone to fix it? If yes, you don&apos;t have an
          orchestration layer — you have a rear-view mirror. The point of
          orchestration is that by the time you&apos;re looking, the proposed
          fix is already waiting for you to approve.
        </p>
      </Callout>

      <Prose>
        <h2>How we think about building it</h2>
        <p>
          This is the approach we take at RevenuePoint. Agents watch. Agents
          propose. Humans approve. Systems execute. Every step is typed,
          logged, and reversible where it can be. It isn&apos;t the fastest
          possible way to let AI act on a business — that would be to hand it
          the keys — but it is the one that an operator, a controller, and an
          auditor can all live with. If you&apos;re thinking about where to
          start with AI in your own operation, that&apos;s the shape we&apos;d
          recommend, regardless of whose software you use to get there.
        </p>
      </Prose>
    </article>
  );
}

export const post: Post = { meta, Body };
