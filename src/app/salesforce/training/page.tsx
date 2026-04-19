import { buildMetadata } from '@/lib/metadata';
import { HeroSection } from '@/components/ui/HeroSection';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { LeadForm } from '@/components/ui/LeadForm';

export const metadata = buildMetadata({
  title: 'Salesforce Training — Custom Training for Your Org',
  description:
    'Salesforce training built for your configuration, not a generic demo org. End-user, administrator, onboarding, and custom workshops.',
  path: '/salesforce/training/',
});

const trainingOptions = [
  {
    title: 'End-User Training',
    body: 'Role-specific sessions for sales reps, service agents, and other end users. Focused on daily workflows in your actual org.',
  },
  {
    title: 'Administrator Training',
    body: 'For internal admins managing and evolving the instance. Covers configuration, automation, reporting, and data management.',
  },
  {
    title: 'New Hire Onboarding',
    body: 'Structured Salesforce onboarding for new team members. Delivered live or recorded for async use.',
  },
  {
    title: 'Custom Workshops',
    body: 'Topic-specific sessions on any Salesforce feature or process — reporting, CPQ, automation, integrations, or anything else your team needs.',
  },
];

export default function SalesforceTrainingPage() {
  return (
    <>
      <HeroSection
        eyebrow="SALESFORCE TRAINING"
        heading="Salesforce training built for your configuration, not a generic demo org"
        body="Generic Salesforce training teaches people the platform. Our training teaches your team the platform as you've configured it — your fields, your processes, your reports. The result is actual adoption."
        variant="light"
      />

      {/* Training Options */}
      <section className="bg-offWhite py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trainingOptions.map((option) => (
              <ServiceCard
                key={option.title}
                title={option.title}
                body={option.body}
                cta={{ label: 'Get Started', href: '#lead-form' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader heading="Tell us about your training needs" />
          <LeadForm interest="Salesforce Training" id="lead-form" />
        </div>
      </section>
    </>
  );
}
