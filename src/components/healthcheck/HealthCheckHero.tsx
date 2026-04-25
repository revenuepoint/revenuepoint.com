import { Button } from '@/components/ui/Button';

export function HealthCheckHero() {
  return (
    <section className="relative bg-paper overflow-hidden">
      <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-16 lg:pt-28 pb-16 lg:pb-24">
        <div className="max-w-3xl">
          <p className="byline mb-5">CRM · Health Check</p>
          <h1 className="text-d0 font-serif font-semibold text-ink leading-tight">
            Is your CRM working for you, <em>or against you</em>?
          </h1>
          <p className="mt-6 text-lede leading-[1.65] max-w-lede text-inkSoft">
            Bad data, broken automations, reports that disagree, license spend nobody can explain. A CRM Health Check gives you a structured audit and a prioritized action plan in two weeks — for Salesforce, HubSpot, Dynamics, or a custom system.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="primary" href="#request">
              Request a Health Check
            </Button>
            <Button variant="secondary" href="#walkthrough">
              See what you&rsquo;ll receive
            </Button>
          </div>
          <p className="mt-6 pt-4 border-t border-ruleSoft font-mono text-[11px] uppercase tracking-[0.14em] text-mute max-w-prose">
            Two-week structured audit · Salesforce · HubSpot · Dynamics · custom systems.
          </p>
        </div>
      </div>
    </section>
  );
}
