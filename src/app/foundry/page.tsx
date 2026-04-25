import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IndustryCard } from '@/components/ui/IndustryCard';
import { StepList } from '@/components/ui/StepList';
import { ComparisonTable } from '@/components/ui/ComparisonTable';
import { CTABanner } from '@/components/ui/CTABanner';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
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
import { PortalMockup } from '@/components/foundry/portal/PortalMockup';
import { PlatformModulesShowcase } from '@/components/foundry/PlatformModulesShowcase';

export const metadata = buildMetadata({
  title: 'Foundry — Managed Data & AI Platform',
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
        stroke="#0F2B4D"
        strokeWidth="1.4"
      />
      <circle
        cx="60"
        cy="24"
        r="11"
        fill="#ffffff"
        stroke="#0F2B4D"
        strokeWidth="1.4"
      />
      <rect
        x="98"
        y="12"
        width="18"
        height="24"
        rx="9"
        fill="#ffffff"
        stroke="#0F2B4D"
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
        stroke="#0F2B4D"
        strokeWidth="1.5"
      />
      <rect x="8" y="10" width="40" height="8" rx="3" fill="#0F2B4D" />
      <line x1="18" y1="6" x2="18" y2="14" stroke="#0F2B4D" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="38" y1="6" x2="38" y2="14" stroke="#0F2B4D" strokeWidth="1.8" strokeLinecap="round" />
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
        stroke="#0F2B4D"
        strokeWidth="1.4"
      />
      <polyline
        points="10,30 16,26 22,28 28,22 34,24 40,16 46,20"
        fill="none"
        stroke="#0F2B4D"
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
        eyebrow="REVENUEPOINT FOUNDRY"
        heading="Your data, connected. Agents that take action. Fully managed."
        body="Foundry connects your CRM, ERP, accounting — and every other system your business already runs on — into one orchestrated platform. Live dashboards for every role. AI reports written overnight. Agents that watch, decide, and act across your systems. Otto, your AI analyst, answers in plain English. Fully managed by RevenuePoint."
        ctas={[
          { label: 'Schedule a Demo →', href: '/contact/?interest=Foundry', variant: 'primary' },
          { label: 'View Pricing →', href: '/foundry/pricing/', variant: 'ghost' },
        ]}
        rightSlot={<PortalMockup />}
      />

      {/* The Problem */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Every system generates data. Nothing orchestrates it." />
          <p className="text-center text-mutedText -mt-6 mb-10 text-base">
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
              <div
                key={title}
                className="bg-white border border-border rounded-sm shadow-sm p-6 flex flex-col"
              >
                <Icon />
                <h3 className="text-base font-semibold text-navy mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-bodyText leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Proof strip — specific numbers instead of adjectives */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 border-t border-border pt-6 divide-y md:divide-y-0 md:divide-x divide-border">
            {[
              { value: '2 days/week', label: 'lost reconciling numbers across systems' },
              { value: '2+ weeks', label: 'typical lag from event to monthly report' },
              { value: '0', label: 'BI tools that take the next action for you' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-4 text-center">
                <p className="text-3xl font-bold font-mono text-navy">{s.value}</p>
                <p className="text-sm text-mutedText mt-1 leading-snug">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Bridge line into the next section */}
          <p className="text-center italic text-mutedText mt-8 text-base">
            This is the absence of orchestration. Foundry is the layer that fixes it.
          </p>
        </div>
      </section>

      {/* How Foundry Works */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Connect. Illuminate. Act." />
          <p className="text-center text-mutedText -mt-6 mb-10 text-base">
            The three layers of orchestration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Connect',
                promise: 'Every system you run, into one connected warehouse.',
                bullets: [
                  'CRM, ERP, accounting, fulfillment, support, telephony — 30+ integrations',
                  'Pipelines run on a managed schedule; when a source system changes, we handle it',
                  'One consistent view of your business across every connected system',
                ],
              },
              {
                title: 'Illuminate',
                promise: 'Analyze and visualize across every system at once.',
                bullets: [
                  'Live dashboards and metric trees for every role',
                  'AI-written analysis delivered overnight — specific numbers, clear next steps',
                  'Cross-system trends and anomalies no single tool sees',
                ],
              },
              {
                title: 'Act',
                promise: 'Orchestrate the repetitive work across your systems — automatically.',
                bullets: [
                  'Agents watch thresholds, process inbound work, and route cases around the clock',
                  'Otto executes changes in your systems on request, in plain English',
                  'Every action logged; every change reversible and auditable',
                ],
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="bg-white border border-border rounded-sm p-6 lg:p-7 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-crimson tracking-widest">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">{step.title}</h3>
                <p className="text-sm font-semibold text-navy mb-4 leading-snug">
                  {step.promise}
                </p>
                <ul className="space-y-2 mt-auto">
                  {step.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex gap-2 text-sm text-bodyText leading-snug"
                    >
                      <span className="text-crimson shrink-0 font-semibold">→</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-center italic text-mutedText mt-10 text-base">
            Below: each layer of the platform, up close.
          </p>
        </div>
      </section>

      {/* Product Suite */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight text-navy text-center mb-10">
            Foundry Platform
          </h2>
          <PlatformModulesShowcase />
        </div>
      </section>

      {/* Blueprint */}
      <section className="bg-navy py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <SectionHeader
                heading="Foundry knows your business."
                body="Foundry knows your business — not just your data. Blueprint maps how your objects connect across every system you run on: Customers, Orders, Invoices, Production Orders, Prescriptions, Donors. That's what makes Otto accurate, dashboards reliable, and agents precise. When a source system changes, Blueprint absorbs it. Everything downstream stays right."
                align="left"
                light
              />
              <ul className="space-y-3 mt-6">
                {[
                  'One consistent definition of your business — across every connected system',
                  'Otto answers in business terms — Customers, Orders, Invoices — not database tables',
                  'Every metric and report draws from the same business definitions',
                  'An interactive map shows exactly how Foundry understands your business',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-gray-300">
                    <svg
                      className="w-4 h-4 text-crimson shrink-0 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 lg:mt-0">
              <BlueprintDemo />
            </div>
          </div>

          {/* Integrations strip */}
          <div className="mt-12 lg:mt-16 pt-10 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-gray-400 text-center mb-6">
              Connects to the systems you already use
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
              {[
                // CRM
                'Salesforce',
                'HubSpot',
                'Microsoft Dynamics',
                // ERP
                'SAP',
                'SAP Business One',
                'NetSuite',
                // Accounting
                'QuickBooks',
                'Xero',
                // E-commerce + payments
                'Shopify',
                'Stripe',
                // Telephony / communication
                '8x8',
                'RingCentral',
                'Microsoft Teams',
                'Zoom',
                'Slack',
                // Marketing
                'Mailchimp',
                // Support
                'Zendesk',
                // HR / payroll
                'ADP',
                // Healthcare
                'PioneerRx',
              ].map((name) => (
                <div
                  key={name}
                  className="h-10 px-5 flex items-center justify-center rounded-sm border border-white/10 bg-white/[0.04]"
                >
                  <span className="text-sm font-medium text-gray-300">{name}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-gray-500 text-center mt-4">
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
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="ACTIONS"
            heading="Every action, fully auditable."
            body="Click through a few examples. Rationale, steps, data changes, and timeline — visible to approvers and to the audit log. Nothing happens off-book."
            align="center"
          />
          <div className="mt-10">
            <ActionDetailExplorer />
          </div>
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
          <p className="mt-6 text-center text-xs text-mutedText">
            Every card is an auditable change in a system of record. Nothing happens off-book.
          </p>
        </div>
      </section>

      {/* Lens Explorer */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="LENS"
            heading="See the work, not just the work logs."
            body="Agents produce work; Lens makes it visible. Dashboards, reports, metric trees, maps — the same warehouse data, rendered for the role that needs it."
            align="center"
          />
          <div className="mt-10">
            <LensExplorer />
          </div>
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
          <div className="mt-10">
            <OttoChatExplorer />
          </div>
        </div>
      </section>

      {/* Prism Explorer — last industry-aware section; sticky picker unsticks after this */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="PRISM"
            heading="AI-generated reports. Written overnight, ready by 8 AM."
            body="Pick a report template. Prism pulls the data, analyzes, writes the narrative, and renders the charts — delivered to your inbox as PDF. 30+ templates spanning Finance, Sales, Operations, Production, Supply Chain, and more."
            align="center"
          />
          <div className="mt-10">
            <PrismExplorer />
          </div>
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
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            heading="The only platform that orchestrates the full loop."
            body="No other platform in this category manages pipeline, warehouse, intelligence, agents, and action execution as a single service. ThoughtSpot costs $140,000/year and still requires a data engineering team to run it. Foundry starts at $2,500/month — fully managed by RevenuePoint."
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
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader heading="Live in 6 weeks. Here's how." />
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
        heading="Ready to see Foundry in action?"
        body="Schedule a personalized demo. We'll show you what Foundry looks like connected to systems just like yours."
        cta={{ label: 'Schedule a Demo →', href: '/contact/?interest=Foundry' }}
      />
    </>
  );
}
