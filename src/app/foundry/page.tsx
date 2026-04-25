import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { CTABanner } from '@/components/ui/CTABanner';
import { ProductViewport } from '@/components/ui/ProductViewport';
import { BlueprintDemo } from '@/components/foundry/BlueprintDemo';
import { AgentTypeStrip } from '@/components/foundry/AgentTypeStrip';
import { OrchestrationFlow } from '@/components/foundry/OrchestrationFlow';
import { ActionsKanban } from '@/components/foundry/ActionsKanban';
import { ActionDetailExplorer } from '@/components/foundry/ActionDetailExplorer';
import { LensExplorer } from '@/components/foundry/LensExplorer';
import { OttoChatExplorer } from '@/components/foundry/OttoChatExplorer';
import { PrismExplorer } from '@/components/foundry/PrismExplorer';
import { EmbeddedInTools } from '@/components/foundry/EmbeddedInTools';
import { IndustryProvider } from '@/context/IndustryContext';
import { IndustrySwitcher } from '@/components/foundry/IndustrySwitcher';
import { AgentsSection } from '@/components/foundry/AgentsSection';
import { SecuritySection } from '@/components/foundry/SecuritySection';
import { HeroAgentMockup } from '@/components/foundry/HeroAgentMockup';
import { PlatformModulesShowcase } from '@/components/foundry/PlatformModulesShowcase';
import { SCHEDULE_URL } from '@/lib/links';

export const metadata = buildMetadata({
  title: 'Foundry',
  description:
    'The only fully managed data and AI platform for mid-market. Dashboards, AI agents, automated workflows — starting at $2,500/month.',
  path: '/foundry/',
});

/* ----- Inline SVGs for the Problem section ----- */

function FragmentationIcon() {
  return (
    <svg
      viewBox="0 0 120 48"
      className="h-12 w-28 mb-4"
      aria-hidden="true"
    >
      {/* Broken dashed connectors — the fragmentation is the visual */}
      <path
        d="M 22 24 L 46 24"
        stroke="#C3CED9"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
      <path
        d="M 74 24 L 98 24"
        stroke="#C3CED9"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
      {/* "Break" mark in the middle */}
      <line
        x1="56"
        y1="16"
        x2="64"
        y2="32"
        stroke="#8B0A39"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Three disconnected shapes */}
      <rect
        x="4"
        y="12"
        width="18"
        height="24"
        rx="3"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.4"
      />
      <circle
        cx="60"
        cy="24"
        r="11"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.4"
      />
      <rect
        x="98"
        y="12"
        width="18"
        height="24"
        rx="9"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function LatencyIcon() {
  return (
    <svg
      viewBox="0 0 56 56"
      className="h-12 w-12 mb-4"
      aria-hidden="true"
    >
      {/* Calendar page */}
      <rect
        x="8"
        y="10"
        width="40"
        height="40"
        rx="3"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.5"
      />
      <rect x="8" y="10" width="40" height="8" rx="3" fill="#0F1A2B" />
      <line x1="18" y1="6" x2="18" y2="14" stroke="#0F1A2B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="38" y1="6" x2="38" y2="14" stroke="#0F1A2B" strokeWidth="1.8" strokeLinecap="round" />
      {/* Grid dots */}
      <g fill="#C3CED9">
        <circle cx="18" cy="28" r="1.3" />
        <circle cx="28" cy="28" r="1.3" />
        <circle cx="38" cy="28" r="1.3" />
        <circle cx="18" cy="36" r="1.3" />
        <circle cx="28" cy="36" r="1.3" />
        <circle cx="38" cy="36" r="1.3" />
        <circle cx="18" cy="44" r="1.3" />
        <circle cx="28" cy="44" r="1.3" />
      </g>
      {/* "LATE" diagonal stripe */}
      <g transform="rotate(-18 28 36)">
        <rect
          x="4"
          y="30"
          width="48"
          height="12"
          rx="2"
          fill="#8B0A39"
          opacity="0.92"
        />
        <text
          x="28"
          y="39"
          textAnchor="middle"
          fontSize="8"
          fontWeight="800"
          fill="#ffffff"
          letterSpacing="1.5"
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
        >
          LATE
        </text>
      </g>
    </svg>
  );
}

function NoHandoffIcon() {
  return (
    <svg
      viewBox="0 0 120 48"
      className="h-12 w-28 mb-4"
      aria-hidden="true"
    >
      {/* Tiny dashboard panel with sparkline + alert dot */}
      <rect
        x="4"
        y="8"
        width="48"
        height="32"
        rx="3"
        fill="#ffffff"
        stroke="#0F1A2B"
        strokeWidth="1.4"
      />
      <polyline
        points="10,30 16,26 22,28 28,22 34,24 40,16 46,20"
        fill="none"
        stroke="#0F1A2B"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Alert dot */}
      <circle cx="40" cy="16" r="3" fill="#8B0A39" />
      {/* Trailing dotted arrow that fades to nothing */}
      <g stroke="#C3CED9" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <line x1="56" y1="24" x2="62" y2="24" strokeDasharray="2 3" />
        <line x1="66" y1="24" x2="74" y2="24" strokeDasharray="2 4" opacity="0.7" />
        <line x1="78" y1="24" x2="88" y2="24" strokeDasharray="2 5" opacity="0.45" />
        <line x1="92" y1="24" x2="104" y2="24" strokeDasharray="2 6" opacity="0.2" />
      </g>
      {/* Arrow head — ghosted */}
      <path
        d="M 104 20 L 112 24 L 104 28"
        stroke="#C3CED9"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.25"
      />
    </svg>
  );
}

export default function FoundryPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        byline="RevenuePoint Foundry"
        heading={
          <>
            Your data, connected. Agents that <em>take action</em>. Fully managed.
          </>
        }
        body="Foundry connects your CRM, ERP, accounting — and every other system your business already runs on — into one orchestrated platform. Live dashboards for every role. AI reports written overnight. Agents that watch, decide, and act across your systems. Otto, your AI analyst, answers in plain English. Fully managed by RevenuePoint."
        ctas={[
          { label: 'Schedule a demo', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'View pricing', href: '/foundry/pricing/', variant: 'secondary' },
        ]}
        sidenote="Live in 6 weeks · Named admin and PM · No data engineers required."
        rightSlot={<div className="lg:mt-16"><HeroAgentMockup /></div>}
      />

      {/* The Problem */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="The pain"
            heading={
              <>
                Every system generates data. <em>Nothing orchestrates it</em>.
              </>
            }
            align="left"
          />
          <p className="serif-italic text-center text-base text-mute -mt-6 mb-12">
            Three problems. One missing layer.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Systems don't speak to each other.",
                body: "CRM says one number. ERP says another. Accounting says a third. Teams lose two days a week reconciling spreadsheets that still don't agree.",
                Icon: FragmentationIcon,
              },
              {
                title: 'The numbers arrive too late to act on.',
                body: 'Monthly reports land two weeks into the following month. By the time a problem surfaces, the window to do anything about it has closed.',
                Icon: LatencyIcon,
              },
              {
                title: 'Dashboards describe. Nothing acts.',
                body: 'Every BI tool shows the scrap-rate spike, the churned customer, the past-due invoice — then leaves you to email someone. Seeing it and fixing it are still two different jobs.',
                Icon: NoHandoffIcon,
              },
            ].map(({ title, body, Icon }) => (
              <article
                key={title}
                className="relative bg-paper border border-ruleSoft p-6 flex flex-col"
              >
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
                <div className="mt-3"><Icon /></div>
                <h3 className="font-serif text-[1.125rem] font-medium text-ink mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-inkSoft leading-relaxed">{body}</p>
              </article>
            ))}
          </div>

          {/* Proof strip */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 border-t-2 border-ink pt-8 gap-8">
            {[
              { value: '2 days/wk', label: 'lost reconciling numbers across systems' },
              { value: '2+ weeks', label: 'typical lag from event to monthly report' },
              { value: '0', label: 'BI tools that take the next action for you' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-mono text-[2rem] font-semibold tabular-nums text-navySoft leading-none">{s.value}</p>
                <p className="serif-italic text-base text-ink mt-3 leading-snug max-w-[28ch] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bridge line */}
          <p className="serif-italic text-center text-base text-mute mt-12">
            This is the absence of orchestration. Foundry is the layer that fixes it.
          </p>
        </div>
      </section>

      {/* How Foundry Works */}
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Three layers"
            heading={
              <>
                Connect. Illuminate. <em>Act</em>.
              </>
            }
            align="left"
            body="The three layers of orchestration. The whole platform is one service, fully managed."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Connect',
                roman: 'I',
                promise: 'Every system you run, into one connected warehouse.',
                bullets: [
                  'CRM, ERP, accounting, fulfillment, support, telephony — 30+ integrations',
                  'Pipelines run on a managed schedule; when a source system changes, we handle it',
                  'One consistent view of your business across every connected system',
                ],
              },
              {
                title: 'Illuminate',
                roman: 'II',
                promise: 'Analyze and visualize across every system at once.',
                bullets: [
                  'Live dashboards and metric trees for every role',
                  'AI-written analysis delivered overnight — specific numbers, clear next steps',
                  'Cross-system trends and anomalies no single tool sees',
                ],
              },
              {
                title: 'Act',
                roman: 'III',
                promise: 'Orchestrate the repetitive work across your systems — automatically.',
                bullets: [
                  'Agents watch thresholds, process inbound work, and route cases around the clock',
                  'Otto executes changes in your systems on request, in plain English',
                  'Every action logged; every change reversible and auditable',
                ],
              },
            ].map((step) => (
              <article key={step.title} className="bg-cream border border-ruleSoft p-6 lg:p-7 flex flex-col relative">
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
                <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-navySoft" />
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute mt-3">
                  Layer {step.roman}
                </p>
                <h3 className="font-serif text-[1.5rem] text-ink mt-2 font-medium leading-tight">
                  {step.title}
                </h3>
                <p className="serif-italic text-base text-ink mt-3 leading-snug">{step.promise}</p>
                <ul className="space-y-2 mt-5 mt-auto">
                  {step.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-inkSoft leading-snug">
                      <span className="text-navySoft font-mono shrink-0" aria-hidden="true">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="text-center italic text-mute mt-10 text-base">
            Below: each layer of the platform, up close.
          </p>
        </div>
      </section>

      {/* Product Suite */}
      <section className="bg-cream py-section border-y border-ruleSoft">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="The platform"
            heading={
              <>
                Foundry, in <em>five</em> modules.
              </>
            }
            align="left"
            body="Each module solves one piece of the orchestration problem. The whole platform is one service, fully managed."
          />
          <ProductViewport
            figureNumber="Fig. 02"
            caption="Foundry Platform — module showcase"
            attribution="Interactive · pick a module to explore"
          >
            <PlatformModulesShowcase />
          </ProductViewport>
        </div>
      </section>

      {/* Blueprint */}
      <section className="bg-ink py-section text-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/70 inline-flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-crimson" />
                Blueprint · the business map
              </p>
              <h2 className="text-d1 font-serif font-medium text-paper leading-tight">
                Foundry knows your <em className="text-crimson">business</em>.
              </h2>
              <p className="mt-5 text-lede leading-[1.65] text-paper/80 max-w-prose">
                Foundry knows your business — not just your data. Blueprint maps how your objects connect across every system you run on: Customers, Orders, Invoices, Production Orders, Prescriptions, Donors. That&rsquo;s what makes Otto accurate, dashboards reliable, and agents precise. When a source system changes, Blueprint absorbs it. Everything downstream stays right.
              </p>
              <ul className="space-y-3 mt-6">
                {[
                  'One consistent definition of your business — across every connected system',
                  'Otto answers in business terms — Customers, Orders, Invoices — not database tables',
                  'Every metric and report draws from the same business definitions',
                  'An interactive map shows exactly how Foundry understands your business',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-paper/80 leading-relaxed">
                    <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12 lg:mt-0">
              <BlueprintDemo />
            </div>
          </div>

          {/* Integrations strip */}
          <div className="mt-16 lg:mt-20 pt-10 border-t border-paper/15">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60 text-center mb-8">
              Connects to the systems you already use
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                'Salesforce', 'HubSpot', 'Microsoft Dynamics',
                'SAP', 'SAP Business One', 'NetSuite',
                'QuickBooks', 'Xero',
                'Shopify', 'Stripe',
                '8x8', 'RingCentral', 'Microsoft Teams', 'Zoom', 'Slack',
                'Mailchimp', 'Zendesk', 'ADP', 'PioneerRx',
              ].map((name, i, arr) => (
                <li key={name} className="flex items-center gap-x-8">
                  <span className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper/85">
                    {name}
                  </span>
                  {i < arr.length - 1 && (
                    <span aria-hidden="true" className="hidden lg:block w-px h-4 bg-paper/20 -ml-4" />
                  )}
                </li>
              ))}
            </ul>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-paper/40 text-center mt-6">
              + REST, GraphQL, SFTP, webhooks, and custom connectors for anything else.
            </p>
          </div>
        </div>
      </section>

      {/* INDUSTRY-AWARE WRAPPER — sticky industry tabs stay pinned from here through Prism */}
      <IndustryProvider>
        <div className="relative">
          <IndustrySwitcher />

      {/* Home Feed Preview */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="AGENTS"
            heading="Your morning briefing. Automatically."
            body="Foundry agents watch your systems overnight, process inbound work, run scheduled reports, and respond to events in seconds. By the time your team logs in, the Home Feed already has the answers."
            align="center"
          />
          <AgentTypeStrip />
          <AgentsSection />
        </div>
      </section>

      {/* Actions Explorer */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="ACTIONS"
            heading="Every action, fully auditable."
            body="Click through a few examples. Rationale, steps, data changes, and timeline — visible to approvers and to the audit log. Nothing happens off-book."
            align="center"
          />
          <ProductViewport
            figureNumber="Fig. 04"
            caption="Actions Explorer — every step recorded"
            attribution="Interactive · pick an example to walk through"
          >
            <ActionDetailExplorer />
          </ProductViewport>
        </div>
      </section>

      {/* Orchestration — Actions kanban */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="ORCHESTRATION"
            heading="From detection to done. Every action, end to end."
            body="Agents propose the work. Humans gate the risky changes. Foundry executes step-by-step across SAP, Salesforce, QuickBooks, PioneerRx — with full revision, rejection, and expiry handling, and an auditable trail for every change."
            align="center"
          />
          <OrchestrationFlow />
          <div className="mt-10">
            <ActionsKanban />
          </div>
          <p className="mt-6 text-center text-xs text-mute">
            Every card is an auditable change in a system of record. Nothing happens off-book.
          </p>
        </div>
      </section>

      {/* Lens Explorer */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="LENS"
            heading="See the work, not just the work logs."
            body="Agents produce work; Lens makes it visible. Dashboards, reports, metric trees, maps — the same warehouse data, rendered for the role that needs it."
            align="center"
          />
          <ProductViewport
            figureNumber="Fig. 06"
            caption="Lens — dashboards, reports, metric trees"
            attribution="Interactive · sample data shown"
          >
            <LensExplorer />
          </ProductViewport>
        </div>
      </section>

      {/* Otto Chat Explorer */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="OTTO"
            heading="Ask Otto anything."
            body="Otto is your AI analyst, plugged into every business object in Blueprint. It reasons, cites, renders — and proposes the next action. Pick a prompt to see it run."
            align="center"
          />
          <ProductViewport
            figureNumber="Fig. 07"
            caption="Otto — AI analyst, plugged into Blueprint"
            attribution="Interactive · pick a prompt to run"
          >
            <OttoChatExplorer />
          </ProductViewport>
        </div>
      </section>

      {/* Prism Explorer — last industry-aware section; sticky picker unsticks after this */}
      <section className="bg-cream py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="PRISM"
            heading="AI-generated reports. Written overnight, ready by 8 AM."
            body="Pick a report template. Prism pulls the data, analyzes, writes the narrative, and renders the charts — delivered to your inbox as PDF. 30+ templates spanning Finance, Sales, Operations, Production, Supply Chain, and more."
            align="center"
          />
          <ProductViewport
            figureNumber="Fig. 08"
            caption="Prism — overnight AI reports, by template"
            attribution="30+ templates · Finance · Sales · Ops · Production · Supply Chain"
          >
            <PrismExplorer />
          </ProductViewport>
        </div>
      </section>
        </div>
      </IndustryProvider>

      {/* Embedded in your tools — universal capability, not industry-specific */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="EMBEDDED"
            heading="Foundry lives inside the tools you already use."
            body="No second login. No new workflow. Agents, Otto, reports, and alerts surface natively inside Salesforce, Microsoft Dynamics, Teams, and Slack — where your team already works. The intelligence comes to them."
            align="center"
          />
          <div className="mt-10">
            <EmbeddedInTools />
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <SecuritySection />

      {/* Competitive Comparison */}
      <section className="bg-cream border-y border-ruleSoft py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Category gap"
            heading={
              <>
                The only platform that orchestrates the <em>full loop</em>.
              </>
            }
            body="No other platform in this category manages pipeline, warehouse, intelligence, agents, and action execution as a single service. ThoughtSpot costs $140,000/year and still requires a data engineering team to run it. Foundry starts at $2,500/month — fully managed by RevenuePoint."
            align="left"
          />
          <ComparisonTable
            headers={['Capability', 'Foundry', 'Domo', 'ThoughtSpot', 'DataSelf', 'BI Consultant']}
            highlightCol={1}
            rows={[
              { label: 'Data warehouse & pipeline', cells: ['check', 'check', 'cross', 'check', 'Varies'] },
              { label: 'Dashboards & analytics', cells: ['check', 'check', 'check', 'check', 'Varies'] },
              { label: 'AI chat & natural language', cells: ['check', 'check', 'check', 'cross', 'cross'] },
              { label: 'AI-generated analysis reports', cells: ['check', 'cross', 'cross', 'cross', 'cross'] },
              { label: 'Automated agents', cells: ['check', 'Limited', 'cross', 'cross', 'cross'] },
              { label: 'Action execution in systems', cells: ['check', 'cross', 'cross', 'cross', 'cross'] },
              { label: 'Anomaly detection', cells: ['check', 'Limited', 'check', 'cross', 'cross'] },
              { label: 'Fully managed service', cells: ['check', 'cross', 'cross', 'cross', 'Partial'] },
              { label: 'Predictable flat-fee pricing', cells: ['check', 'cross', 'cross', 'check', 'check'] },
            ]}
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Engagement"
            heading={
              <>
                Live in <em>6 weeks</em>. Here&rsquo;s how.
              </>
            }
            align="left"
          />
          <StepList
            steps={[
              { number: 1, title: 'Discover', description: 'Before the contract, we learn your systems, goals, and data sources. No scope surprises — we quote based on what\'s actually there.' },
              { number: 2, title: 'Build', description: 'We connect your sources, map your business objects in Blueprint, and configure dashboards, reports, and your initial agent library. You provide context; we do the work.' },
              { number: 3, title: 'Launch', description: 'Your team gets Foundry Portal access. We walk through every capability live. From this point forward, RevenuePoint manages everything.' },
              { number: 4, title: 'Evolve', description: 'A named administrator and PM handle ongoing improvements — new dashboards, new agents, monthly review calls. Foundry grows as your business does.' },
            ]}
          />
        </div>
      </section>

      {/* Demo CTA */}
      <CTABanner
        eyebrow="Schedule a working session"
        heading={
          <>
            Ready to see Foundry <em>in action</em>?
          </>
        }
        body="Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours."
        cta={{ label: 'Schedule a demo', href: SCHEDULE_URL }}
      />
    </>
  );
}
