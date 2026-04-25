import { HeroSection } from '@/components/ui/HeroSection';
import { LogoStrip } from '@/components/ui/LogoStrip';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { LeadForm } from '@/components/ui/LeadForm';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      {/* Hero — Issue 01 */}
      <HeroSection
        byline="Issue 01 · Spring 2026"
        heading={
          <>
            The technology partner mid-market businesses <em>trust</em>.
          </>
        }
        body="We implement, manage, and optimize CRM and ERP for growing companies — and put your data to work with Foundry, our managed data and AI platform. One partner for your entire technology stack."
        ctas={[
          { label: 'Schedule a call', href: '/contact/', variant: 'primary' },
          { label: 'Explore Foundry', href: '/foundry/', variant: 'secondary' },
        ]}
        issue="01"
        sidenote={
          <>
            Fully managed by RevenuePoint · Live in 6 weeks · No long-term contracts.
          </>
        }
        rightSlot={
          <div className="border border-rule bg-cream p-8">
            <p className="eyebrow mb-5">From the field</p>
            <p className="serif-italic text-[1.4rem] leading-snug text-ink">
              &ldquo;The first dashboard was live in two weeks. The board reviewed it that month.&rdquo;
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-mute">
              CFO · 60-plant manufacturer
            </p>
            <hr className="my-6 border-t border-rule" />
            <ul className="divide-y divide-rule">
              {[
                { value: '$214K', label: 'Cash recovered, Q1', attribution: 'Foundry · finance' },
                { value: '6 wks', label: 'Live in production', attribution: 'Median engagement' },
                { value: '60+', label: 'Salesforce certifications', attribution: 'Heritage' },
              ].map((stat) => (
                <li
                  key={stat.label}
                  className="grid grid-cols-[auto_1fr] gap-x-5 py-4 first:pt-0 last:pb-0 items-baseline"
                >
                  <span className="font-mono text-[1.75rem] font-semibold text-crimson tabular-nums leading-none whitespace-nowrap">
                    {stat.value}
                  </span>
                  <div>
                    <p className="serif-italic text-[1rem] text-ink leading-snug">{stat.label}</p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-mute mt-1">
                      {stat.attribution}
                    </p>
                  </div>
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
          { name: 'Kinetik' },
          { name: 'Luster' },
          { name: 'Omya' },
          { name: 'Melio' },
          { name: 'Partner' },
          { name: 'Partner' },
        ]}
      />

      {/* Three Service Pillars */}
      <section className="bg-paper py-section">
        <div className="max-w-editorial mx-auto px-6 lg:px-8">
          <SectionHeader
            eyebrow="What we do"
            heading={
              <>
                Three ways we help your business <em>grow</em>.
              </>
            }
            align="left"
            body="The same operating model — named accountability, fully managed, no surprises — across every platform we run."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServiceCard
              title="Salesforce"
              body="Sales Cloud, Service Cloud, CPQ, Marketing Cloud, Pardot, and Communities — implemented, configured, and managed to the way your business actually works."
              cta={{ label: 'Continue', href: '/salesforce/' }}
            />
            <ServiceCard
              title="SAP"
              body="Business One for growing companies and S/4HANA for enterprise — implemented to your processes and managed by a dedicated team. No shared queues, no offshore handoffs."
              cta={{ label: 'Continue', href: '/sap/' }}
            />
            <ServiceCard
              title="Foundry"
              body="Connect every system into a single clean data warehouse. Live dashboards, AI-generated analysis, named agents that take action — fully managed."
              cta={{ label: 'Explore Foundry', href: '/foundry/' }}
              badge="NEW"
              elevated
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
