import { Button } from '@/components/ui/Button';

export function HealthCheckHero() {
  return (
    <section className="bg-navy">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-widest text-white mb-4">
            CRM Health Check
          </p>
          <div className="w-10 h-[3px] mb-6 bg-crimson" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Is your CRM working for you, or against you?
          </h1>
          <p className="mt-6 text-lg leading-relaxed max-w-2xl text-gray-300">
            Bad data, broken automations, reports that disagree, license spend nobody can explain.
            A CRM Health Check gives you a structured audit and a prioritized action plan in two
            weeks — for Salesforce, HubSpot, Dynamics, or a custom system.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" href="#request">
              Request a Health Check
            </Button>
            <Button variant="ghost" href="#walkthrough">
              See what you&apos;ll receive
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
