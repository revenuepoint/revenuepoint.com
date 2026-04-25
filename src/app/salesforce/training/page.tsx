import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StepList } from '@/components/ui/StepList';
import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { LeadForm } from '@/components/ui/LeadForm';
import { ScreenshotPlaceholder } from '@/components/ui/ScreenshotPlaceholder';
import { PlaybookWalkthrough } from '@/components/training/PlaybookWalkthrough';

export const metadata = buildMetadata({
  title: 'Salesforce Training & Custom Playbook',
  description:
    'Instructor-led Salesforce training, in-person or virtual, that produces a custom Playbook embedded inside your Salesforce — so the knowledge persists for every user.',
  path: '/salesforce/training/',
});

const engagementSteps = [
  {
    number: 1,
    title: 'Discovery',
    description:
      "We meet your admins and process owners, review the parts of Salesforce that matter to your business, and confirm the team we'll be training.",
  },
  {
    number: 2,
    title: 'Custom curriculum & live training',
    description:
      'We author a curriculum keyed to your configuration and deliver instructor-led sessions — in-person, virtual, or hybrid, recorded for async replay.',
  },
  {
    number: 3,
    title: 'Playbook build & Salesforce embed',
    description:
      'Every walkthrough becomes a section in your Playbook — written to your fields, your reports, your automations — and deployed inside Salesforce so every user can reach it.',
  },
  {
    number: 4,
    title: 'Group rollout sessions',
    description:
      "We run group session(s) anchored on the Playbook to bring the broader team onto the same source of truth — no separate decks, no diverging notes.",
  },
];

const faqs = [
  {
    question: 'Can we run training in-person, virtually, or both?',
    answer:
      "All three. Most engagements run virtually with one or two in-person days for the core team, but we'll deliver fully on-site or fully remote based on what works for your org. Virtual sessions are recorded by default for new-hire replay.",
  },
  {
    question: 'Where exactly does the Playbook live inside Salesforce?',
    answer:
      'Wherever your users actually look. Most commonly the Playbook ships as a Lightning component on key record pages plus a utility-bar item that opens it from anywhere, with deep links from related lists. Salesforce Knowledge is an option for orgs already using it. The right surface is part of the discovery conversation.',
  },
  {
    question: 'Who owns the Playbook after delivery? Can we edit it ourselves?',
    answer:
      'You own it. The Playbook is delivered as content inside your org, editable by your admins. We hand off with a structure your team can extend section by section as the org evolves.',
  },
  {
    question: 'Do you refresh the Playbook when our configuration changes?',
    answer:
      'Yes — refresh cycles are part of our managed services engagement. As you add objects, change automations, or onboard new teams, we update the Playbook so it stays the source of truth instead of going stale.',
  },
  {
    question: 'Is this a fit if we already have an internal admin team?',
    answer:
      'Especially then. Internal admins are often the people who feel the documentation gap most — every onboarding is a re-explanation of the same patterns. The Playbook gives your admin team back the time they spend answering the same questions, and the engagement formalizes the institutional knowledge they already carry.',
  },
];

export default function SalesforceTrainingPage() {
  return (
    <>
      <HeroSection
        byline="Salesforce · Training & Playbook"
        heading={
          <>
            Salesforce training that leaves a <em>Playbook</em> embedded in your org.
          </>
        }
        body="Generic Salesforce training fades the week after the workshop because it teaches the platform, not your configuration. Ours doesn't — every engagement produces a custom Playbook authored to your fields, processes, and reports, then embedded inside Salesforce where the work happens. Live training delivers it. The Playbook keeps it."
        sidenote="Custom Playbook · embedded in Salesforce · authored to your config."
        ctas={[
          { label: 'Schedule a training scoping call', href: '#lead-form', variant: 'primary' },
        ]}
        rightSlot={
          <ScreenshotPlaceholder
            label="Playbook open in the Salesforce utility bar"
            width={520}
            height={360}
          />
        }
        variant="light"
      />

      <section className="bg-cream py-16 lg:py-24 border-y border-rule">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="How the engagement works"
            heading="Four steps. Live training first, embedded Playbook second, group rollout last."
            body="We compress the live work into one to two weeks of training and curriculum, then take another two to three weeks to author and embed the Playbook before the broader rollout."
          />
          <StepList steps={engagementSteps} />
        </div>
      </section>

      <PlaybookWalkthrough />

      <section className="bg-white py-16 lg:py-24 border-t border-rule">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Frequently asked"
            heading="What teams ask before they engage"
          />
          <FAQAccordion items={faqs} />
          <p className="mt-8 text-sm text-ink leading-relaxed">
            Not sure where to start?{' '}
            <Link href="/salesforce/health-check/" className="text-crimson font-semibold hover:text-crimsonDeep">
              A CRM Health Check
            </Link>{' '}
            often surfaces the gaps that seed the first Playbook sections — many engagements
            start there.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-24 border-t border-rule">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            heading="Tell us about your Salesforce training and Playbook needs"
            body="We will confirm fit, scope the engagement, and send a statement of work."
          />
          <LeadForm interest="Salesforce Training" id="lead-form" />
        </div>
      </section>
    </>
  );
}
