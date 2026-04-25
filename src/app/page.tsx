import { HeroSection } from '@/components/ui/HeroSection';
import { LogoStrip } from '@/components/ui/LogoStrip';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { LeadForm } from '@/components/ui/LeadForm';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        byline="Implementation · management · intelligence"
        heading={
          <>
            Your operating systems, <em>fully managed</em>.
          </>
        }
        body="CRM, ERP, data and AI, multi-tenant portals, AI research — five platforms, one partner. Implemented, configured, and run by a named team end-to-end."
        ctas={[
          { label: 'Explore Foundry', href: '/foundry/', variant: 'primary' },
          { label: 'Explore Customer Relationship Management', href: '/salesforce/', variant: 'secondary' },
          { label: 'Explore Enterprise Resource Management', href: '/sap/', variant: 'secondary' },
        ]}
        sidenote={
          <>
            A named administrator and project manager on every engagement.
          </>
        }
        rightSlot={
          <div className="border border-rule bg-cream p-8 lg:p-10 lg:mt-24">
            <p className="eyebrow mb-4">The track record</p>
            <div className="mb-8 max-w-[40ch] space-y-3">
              <p className="serif-italic text-[1.0625rem] text-ink leading-snug">
                Built on a decade of running operating systems end-to-end.
              </p>
              <p className="text-[0.875rem] text-inkSoft leading-relaxed">
                Implementation, management, and intelligence under one engagement — one partner,
                every step.
              </p>
            </div>
            <ul className="divide-y divide-rule">
              {[
                { value: '$950M+', label: 'Revenue managed per year' },
                { value: '300+', label: 'Engagements delivered' },
                { value: '12+', label: 'Years of experience' },
              ].map((stat) => (
                <li
                  key={stat.label}
                  className="grid grid-cols-[auto_1fr] gap-x-6 py-6 first:pt-0 last:pb-0 items-baseline"
                >
                  <span className="font-mono text-[2.25rem] font-semibold text-crimson tabular-nums leading-none whitespace-nowrap">
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
        heading="Trusted by operators across North America"
        logos={[
          { name: 'Kinetik', src: '/img/clients/logo-kinetik.png', height: 32 },
          { name: 'Luster', src: '/img/clients/logo-luster.png', height: 36 },
          { name: 'Omya', src: '/img/clients/logo-omya.png', height: 36 },
          { name: 'Melio', src: '/img/clients/logo-melio.png', height: 26 },
          { name: 'inewsource', src: '/img/clients/logo-inewsource.png', height: 24 },
          { name: 'VTDigger', src: '/img/clients/logo-vtdigger.png', height: 28 },
          { name: 'The Current', src: '/img/clients/logo-the-current.png', height: 36 },
          { name: 'Mississippi Today', src: '/img/clients/logo-mississippi-today.png', height: 24 },
        ]}
      />

      {/* The work — context for the pillars below */}
      <section className="bg-paper border-b border-rule">
        <div className="max-w-editorial mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-baseline">
            <div className="lg:col-span-5">
              <Eyebrow>The work</Eyebrow>
              <h2 className="mt-3 font-serif text-d2 font-medium text-ink leading-tight">
                Implementation. Management. <em>Intelligence</em>.
              </h2>
            </div>
            <p className="lg:col-span-7 text-lede leading-[1.65] text-inkSoft max-w-prose">
              We don&rsquo;t just stand software up. We implement to your processes, manage the
              system as it evolves, and put your data to work across the business — five platforms,
              one partner, end-to-end.
            </p>
          </div>
        </div>
      </section>

      {/* Service Pillars */}
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we do"
            heading={
              <>
                Five ways we help your business <em>grow</em>.
              </>
            }
            align="left"
            body="The same operating model — named accountability, fully managed, no surprises — across every platform we run."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:auto-rows-fr">
            <ServiceCard
              className="lg:col-span-2"
              title="Data Orchestration & Intelligence"
              body={
                <>
                  <strong className="font-medium text-ink">Foundry</strong> connects every system you run — CRM, ERP,
                  accounting, fulfillment, support, telephony — into one orchestrated warehouse. Live dashboards for
                  every role. AI-written analysis delivered overnight. Otto, your AI analyst, answers in plain English.
                  Named agents watch, decide, and execute across your stack — every action auditable, every change
                  reversible.
                  <br />
                  <br />
                  Fully managed by RevenuePoint. No data engineers required. No six-figure BI contract. Live in 6
                  weeks.
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
                  citation-backed, and reviewed by a named analyst. Best for due diligence, account research, and
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
                  processes and managed by a dedicated team. No shared queues, no offshore handoffs.
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
                    White-glove service. <em>Real</em> accountability.
                  </>
                }
                align="left"
              />
              <p className="text-base text-inkSoft leading-[1.65] max-w-prose">
                Most firms implement software and disappear. We vet every client before signing — not to be exclusive, but because we only take engagements where we&rsquo;re confident we can deliver measurable ROI. Every client gets a named administrator and project manager. You call them directly.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 mt-10 lg:mt-0">
              {[
                {
                  num: 'i',
                  title: 'Named administrator',
                  desc: 'One dedicated admin for your instance. You know who to call.',
                },
                {
                  num: 'ii',
                  title: 'No long-term contracts',
                  desc: 'Monthly and quarterly plans. We keep clients by delivering results, not lock-ins.',
                },
                {
                  num: 'iii',
                  title: 'Vetted engagements',
                  desc: 'We decline clients where we don\'t see a clear path to ROI. This keeps quality high for everyone.',
                },
                {
                  num: 'iv',
                  title: 'Full-stack coverage',
                  desc: 'Salesforce, SAP, and Foundry — one partner who understands how it all fits together.',
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="font-serif italic text-[1.5rem] text-crimson leading-none">{item.num}</p>
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
                Your business runs on a CRM, an ERP, an accounting system, and a dozen spreadsheets. None of them talk to each other. Foundry connects all of it into a single clean warehouse, then delivers live dashboards, AI-generated analysis, and named agents that take action. Fully managed by RevenuePoint.
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
                    desc: 'Every source system — CRM, ERP, accounting, billing, ticketing, ops tools — synced and reconciled overnight.',
                  },
                  {
                    eyebrow: 'II',
                    title: 'Illuminate',
                    desc: 'Live dashboards, metric trees, AI-generated reports, and event-driven alerts built from your reconciled data.',
                  },
                  {
                    eyebrow: 'III',
                    title: 'Act',
                    desc: 'Named agents that don\'t just observe — they execute approvals, post journal entries, alert the right people.',
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
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="How we work"
            heading={
              <>
                From signed contract to live platform in <em>weeks</em>.
              </>
            }
            align="left"
            body="A four-step engagement model. The same path every time, so nothing surprises anyone."
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
                  'Certified admins configure and deploy to industry best practices, built around your actual processes.',
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
                  'A named admin and PM manage your platform month-to-month. Regular audits, proactive recommendations, direct access.',
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
            heading={
              <>
                Ready to find out if we&rsquo;re a <em>good fit</em>?
              </>
            }
            body="We review every submission personally and respond within one business day. Tell us about your business and what you're trying to solve."
            align="left"
          />
          <LeadForm interest="General" />
        </div>
      </section>
    </>
  );
}
