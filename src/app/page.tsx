import { HeroSection } from '@/components/ui/HeroSection';
import { LogoStrip } from '@/components/ui/LogoStrip';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { LeadForm } from '@/components/ui/LeadForm';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { SCHEDULE_URL } from '@/lib/links';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        byline="CRM + ERP + AI Orchestration"
        heading={
          <>
            Fully managed pipelines that turn <em>data into action</em>.
          </>
        }
        body="Report on, analyze, measure, audit, and act on data points from every system you run on — your single source of truth."
        ctas={[
          { label: 'Schedule a 30-minute demo', href: SCHEDULE_URL, variant: 'primary' },
          { label: 'Explore Foundry', href: '/foundry/', variant: 'secondary' },
        ]}
        sidenote={
          <a
            href="https://github.com/revenuepoint"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-navySoft transition-colors"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
            </svg>
            github.com/revenuepoint
          </a>
        }
        rightSlot={
          <div className="border border-rule bg-cream p-8 lg:p-10 lg:mt-12">
            <p className="eyebrow mb-4">The track record</p>
            <div className="mb-8 max-w-[40ch] space-y-3">
              <p className="serif-italic text-[1.0625rem] text-ink leading-snug">
                Built on a decade of implementing and managing enterprise systems end-to-end.
              </p>
              <p className="text-[0.875rem] text-inkSoft leading-relaxed">
                A decade of implementing and managing the systems growing businesses run on —
                Salesforce, SAP, accounting platforms, data infrastructure, and the AI layer
                that connects them.
              </p>
            </div>
            <ul className="divide-y divide-rule">
              {[
                { value: '$950M+', label: 'Revenue managed per year' },
                { value: '300+', label: 'Engagements delivered' },
                { value: '99.9%', label: 'Platform Uptime SLA' },
              ].map((stat) => (
                <li
                  key={stat.label}
                  className="grid grid-cols-[auto_1fr] gap-x-6 py-6 first:pt-0 last:pb-0 items-baseline"
                >
                  <span className="font-mono text-[2.25rem] font-semibold text-navySoft tabular-nums leading-none whitespace-nowrap">
                    {stat.value}
                  </span>
                  <p className="serif-italic text-[1.0625rem] text-ink leading-snug">{stat.label}</p>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Trust bar */}
      <LogoStrip
        heading="Trusted by leading organizations and nonprofits"
        logos={[
          // Heights tuned per logo for visual weight balance: square
          // logos a touch taller; wide wordmarks slightly shorter
          // (their rendered width compensates for visual presence).
          { name: 'WeWork', src: '/img/clients/logo-wework.svg', height: 24 },
          { name: 'Kinetik', src: '/img/clients/logo-kinetik.png', height: 30 },
          { name: 'Luster', src: '/img/clients/logo-luster.png', height: 32 },
          { name: 'Omya', src: '/img/clients/logo-omya.png', height: 36 },
          { name: 'Melio', src: '/img/clients/logo-melio.png', height: 28 },
          { name: 'Chemistry Rx', src: '/img/clients/logo-chemistry-rx.png', height: 28 },
          { name: 'Prive Therapeutics', src: '/img/clients/logo-prive-therapeutics.svg', height: 30 },
          { name: 'Studio Green', src: '/img/clients/logo-studio-green.svg', height: 32, breakBefore: true },
          { name: 'Green Line Ingredients', src: '/img/clients/logo-green-line-ingredients.png', height: 28 },
          { name: 'inewsource', src: '/img/clients/logo-inewsource.png', height: 28 },
          { name: 'VTDigger', src: '/img/clients/logo-vtdigger.png', height: 28 },
          { name: 'The Current', src: '/img/clients/logo-the-current.png', height: 26 },
          { name: 'Mississippi Today', src: '/img/clients/logo-mississippi-today.png', height: 26 },
        ]}
      />

      {/* The work — context for the pillars below */}
      <section className="bg-snow border-b border-rule">
        <div className="max-w-editorial mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <Eyebrow>The work</Eyebrow>
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <h2 className="lg:col-span-5 font-serif text-d2 font-medium text-ink leading-tight">
              Implementation. Management. <em>Intelligence</em>.
            </h2>
            <p className="lg:col-span-7 text-lede leading-[1.65] text-inkSoft max-w-prose">
              We don&rsquo;t just stand software up. We implement to your processes, manage the
              system as it evolves, and put your data to work across the business — five platforms,
              one partner, end-to-end.
            </p>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="bg-snow py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we do"
            heading={
              <>
                Implementation, operations, intelligence — across <em>five lines</em>.
              </>
            }
            align="left"
            body="Two-week sprints to ship the work. Operations under a single engagement. No long-term contract. The same model on every line."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-fr">
            <ServiceCard
              className="lg:col-span-2"
              title="Data Orchestration & Intelligence"
              body={
                <>
                  <strong className="font-medium text-ink">Foundry</strong> connects every system you run — CRM, ERP,
                  accounting, fulfillment, support, telephony — into your single source of truth, fully managed by
                  RevenuePoint. Live dashboards for every role. AI analysis on demand. Otto, your AI analyst, answers
                  in plain English. Agents watch, decide, and execute across your stack — every action logged,
                  attributed, reversible, and only on reviewer approval.
                  <br />
                  <br />
                  Fully managed by RevenuePoint. Foundry comes with the data team. Predictable monthly pricing.
                  Two-week sprints, milestone-paced.
                </>
              }
              cta={{ label: 'Explore Foundry', href: '/foundry/' }}
              badge="NEW"
              elevated
            />
            <ServiceCard
              title="AI Research & Diligence"
              body={
                <>
                  <strong className="font-medium text-ink">Intelligence Reports</strong> are bespoke research on any
                  entity worth knowing about — public records, enrichment APIs, the open web — generated by AI,
                  citation-backed, and reviewed by a senior analyst. Best for due diligence, account research, and
                  external context.
                </>
              }
              cta={{ label: 'Explore Intelligence Reports', href: '/research/intelligence-reports/' }}
              badge="NEW"
            />
            <ServiceCard
              title="Customer Relationship Management"
              body={
                <>
                  <strong className="font-medium text-ink">Salesforce</strong> Sales Cloud, Service Cloud, CPQ,
                  Marketing Cloud, Pardot, and Communities — implemented, configured, and managed to the way your
                  business actually works.
                </>
              }
              cta={{ label: 'Explore Salesforce', href: '/salesforce/' }}
            />
            <ServiceCard
              title="Enterprise Resource Management"
              body={
                <>
                  <strong className="font-medium text-ink">SAP Business One</strong> for growing companies and{' '}
                  <strong className="font-medium text-ink">S/4HANA</strong> for enterprise — implemented to your
                  processes and managed by your single point of contact, with a team that knows your operation. No
                  shared queues.
                </>
              }
              cta={{ label: 'Explore S/4HANA & SAP Business One', href: '/sap/' }}
            />
            <ServiceCard
              title="Customer & Partner Portals"
              body={
                <>
                  <strong className="font-medium text-ink">Gateway</strong> gives every customer, partner, dealer, or
                  location their own branded portal — wired into your CRM and ERP, with magic-link auth, code-defined
                  access rules, and tenant-level isolation. Fully managed.
                </>
              }
              cta={{ label: 'Explore Gateway', href: '/gateway/' }}
              badge="NEW"
            />
          </div>
        </div>
      </section>

      {/* What Makes RevenuePoint Different */}
      <section className="bg-cream py-section border-y border-ruleSoft">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="The model"
                heading={
                  <>
                    Direct accountability. <em>Fully</em> managed.
                  </>
                }
                align="left"
              />
              <p className="text-base text-inkSoft leading-[1.65] max-w-prose">
                We don&rsquo;t just stand software up. We implement to your processes, manage the system as it evolves, and put your data to work across the business. We scope every engagement around real value: discovery happens before the contract, and the engagements we take on get the team&rsquo;s full attention because the scope is right and the path is clear. Every client gets a single point of contact, with a team that knows their business. You call them directly.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-10 lg:mt-0">
              {[
                {
                  num: 'i',
                  title: 'Direct accountability',
                  desc: 'Your single point of contact, with a team that knows your business. You call them directly.',
                },
                {
                  num: 'ii',
                  title: 'No long-term contracts',
                  desc: 'Monthly and quarterly plans. We keep clients by delivering results, not lock-ins.',
                },
                {
                  num: 'iii',
                  title: 'Scoped around real value',
                  desc: 'Discovery happens before the contract. The engagements we take on get the team\'s full attention because the scope is right and the path is clear.',
                },
                {
                  num: 'iv',
                  title: 'End-to-end across the stack',
                  desc: 'One partner for CRM, ERP, accounting, data warehouses, and the AI layer that connects them. Five platforms, one partner, end-to-end.',
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="font-serif italic text-[1.5rem] text-navySoft leading-none">{item.num}</p>
                  <h3 className="mt-4 font-serif text-[1.25rem] text-ink leading-tight font-medium">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-inkSoft leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Foundry feature callout — dark exhibit panel */}
      <section className="bg-ink py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="byline text-paper/70 mb-5 [&::before]:bg-paper/70">New from RevenuePoint</p>
              <h2 className="text-d1 font-serif font-medium text-paper leading-tight">
                Meet Foundry. <em className="text-crimson">Your</em> data, fully managed.
              </h2>
              <p className="mt-6 text-lede text-paper/80 leading-[1.65] max-w-prose">
                Your business runs on a CRM, an ERP, an accounting system, and a dozen spreadsheets. None of them tell the same story. Foundry connects all of it into your single source of truth, fully managed by RevenuePoint, then delivers live dashboards, AI analysis on demand, and agents that propose, get approved, and execute — every action logged, attributed, and reversible.
              </p>
              <div className="mt-8">
                <Button variant="ghost" href="/foundry/">
                  Explore Foundry
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    eyebrow: 'I',
                    title: 'Connect',
                    desc: 'Every source system — CRM, ERP, accounting, billing, ticketing, ops tools — synced and reconciled continuously.',
                  },
                  {
                    eyebrow: 'II',
                    title: 'Illuminate',
                    desc: 'Live dashboards, metric trees, AI analysis on demand, and event-driven alerts built from your reconciled data.',
                  },
                  {
                    eyebrow: 'III',
                    title: 'Act',
                    desc: 'Agents that don\'t just observe — they propose plans, route to a reviewer for approval, and execute scoped actions across your systems.',
                  },
                ].map((item) => (
                  <div key={item.title} className="border-t border-paper/20 pt-5">
                    <span className="absolute -mt-5 h-px w-8 bg-crimson block" />
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/60">
                      {item.eyebrow}
                    </p>
                    <h3 className="mt-3 font-serif text-[1.25rem] text-paper font-medium">{item.title}</h3>
                    <p className="mt-2 text-sm text-paper/75 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-snow py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="How we work"
            heading={
              <>
                From execution to production in <em>weeks, not months</em>.
              </>
            }
            align="left"
            body="A repeatable four-step engagement model, 60+ Salesforce certifications across every cloud you might run on, and an AI-assisted delivery process that compresses the work — not the testing — into half the typical implementation timeline."
          />
          <StepList
            steps={[
              {
                number: 1,
                title: 'Discovery',
                description:
                  'We learn your business, systems, and goals before quoting. No surprise scope changes.',
              },
              {
                number: 2,
                title: 'Implementation',
                description:
                  'Certified admins configure and deploy to the published platform best practices for your industry — Salesforce CRM patterns, SAP MRP and posting-period rules, Foundry semantic-layer conventions — built around your actual processes.',
              },
              {
                number: 3,
                title: 'Handover & training',
                description:
                  'We train your team on the configured system. You get documentation, not just credentials.',
              },
              {
                number: 4,
                title: 'Ongoing management',
                description:
                  'Your single point of contact and a project manager manage your platform month-to-month. Regular audits, proactive recommendations, direct access.',
              },
            ]}
          />
        </div>
      </section>

      {/* Lead form */}
      <section className="bg-cream py-section border-t border-ruleSoft">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="Get in touch"
            heading="Schedule a 30-minute scoping call."
            body="We review every submission personally and respond within one business day. Tell us what you're trying to solve, and we'll come back with a path forward — or tell you we're not the right partner for it."
            align="left"
          />
          <LeadForm interest="General" />
        </div>
      </section>
    </>
  );
}
