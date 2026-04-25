import { DocSectionPreview } from '@/components/ui/DocSectionPreview';
import { ObjectWalkthroughMini } from './previews/ObjectWalkthroughMini';
import { RoleWorkflowMini } from './previews/RoleWorkflowMini';
import { ReportGuideMini } from './previews/ReportGuideMini';
import { AutomationRefMini } from './previews/AutomationRefMini';
import { IntegrationMapMini } from './previews/IntegrationMapMini';
import { OnboardingTrackMini } from './previews/OnboardingTrackMini';

export function PlaybookWalkthrough() {
  return (
    <div id="playbook">
      <section className="bg-cream border-b border-rule">
        <div className="max-w-7xl mx-auto px-4 py-14 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-navySoft mb-4">
              The Playbook, section by section
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-navy">
              Your org&apos;s instruction manual, embedded where the work happens.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink">
              Every Playbook follows the same six-section structure so anyone in your org
              can find what they need in seconds. The contents are custom to your
              configuration — your objects, your stages, your reports, your automations —
              and the document lives inside Salesforce, not on a shared drive nobody opens.
            </p>
          </div>
        </div>
      </section>

      <DocSectionPreview
        index={1}
        eyebrow="Object & process walkthroughs"
        title="Every standard and custom object, every lifecycle, in plain English."
        description="The opening section walks through how records move through your org — Lead to Opportunity to Order, Case lifecycles, Account hierarchies. Each stage is documented with the fields that matter, who owns the transition, and what the downstream effects are. Written so a new hire can read it before their first deal."
        exampleLabel="Sales lifecycle — sample entry"
        example={
          <span>
            <span className="font-semibold text-navy">Stage 4 → Stage 5</span> requires a signed
            order form attached to the Opportunity. The transition fires the NetSuite handoff;
            do not advance until the form is on file.
          </span>
        }
        preview={<ObjectWalkthroughMini />}
      />

      <DocSectionPreview
        index={2}
        eyebrow="Role-based workflows"
        title="Day-in-the-life walkthroughs for every role you train."
        description="One section per role — AE, SDR, Sales Manager, CSM, Service Agent, Admin — each with the daily and weekly motions in your Salesforce. Tasks are timestamped, list views are linked, and required fields are called out. Replaces the tribal knowledge that walks out the door when someone leaves."
        exampleLabel="AE workflow — sample"
        example={
          <span>
            Morning ritual: open <span className="font-semibold text-navy">My Pipeline · This Week</span>,
            log activity on every Opp touched yesterday, advance any stage with the close-date
            check before the 9:30 standup.
          </span>
        }
        preview={<RoleWorkflowMini />}
        alt
      />

      <DocSectionPreview
        index={3}
        eyebrow="Reports & dashboards guide"
        title="What every saved report means and when to use it."
        description="An indexed catalog of the reports and dashboards that matter — what each one is measuring, who reads it, what to do with the answer, and which folder it lives in. Eliminates the report sprawl problem where teams build the same view three times because nobody knew it already existed."
        exampleLabel="Forecast report — sample"
        example={
          <span>
            <span className="font-semibold text-navy">Forecast Roll-up</span> reads from the
            forecast category, not stage. This is the source of truth on the weekly call —
            if it disagrees with your gut, the data wins or you change the category.
          </span>
        }
        preview={<ReportGuideMini />}
      />

      <DocSectionPreview
        index={4}
        eyebrow="Automation reference"
        title="Flows, triggers, validation rules — explained for humans."
        description="The automation section translates your declarative and code automation into plain language. Every Flow, trigger, and validation rule gets a human-readable explanation of what it does, when it fires, and what blocks it. So when someone asks &ldquo;why can&rsquo;t I save?&rdquo; the answer is one click away."
        exampleLabel="Validation rule — sample"
        example={
          <span>
            <span className="font-semibold text-navy">Required_Close_Reason</span> blocks save
            on Closed Lost until a reason is selected. The rule exists to keep the loss-reason
            report honest; do not work around it with a generic value.
          </span>
        }
        preview={<AutomationRefMini />}
        alt
      />

      <DocSectionPreview
        index={5}
        eyebrow="Integration map"
        title="Connected systems, what flows where, who owns the connector."
        description="A map of every system Salesforce talks to — ERP, marketing automation, billing, support, custom apps — with the direction of data flow, the trigger, and the owner of the connector. So when a sync breaks, the team knows where to look and who to call instead of opening five tickets."
        exampleLabel="NetSuite sync — sample"
        example={
          <span>
            <span className="font-semibold text-navy">Closed-Won → NetSuite Sales Order</span>{' '}
            fires within five minutes of stage change. Owner: RevOps. If the SO doesn&rsquo;t
            appear, check the integration log before re-saving the Opp.
          </span>
        }
        preview={<IntegrationMapMini />}
      />

      <DocSectionPreview
        index={6}
        eyebrow="Onboarding tracks"
        title="Day-1, Week-1, Month-1 paths for every new hire."
        description="Each role gets a structured ramp — what to log in to on Day 1, what to shadow in Week 1, what to own by the end of Month 1, and what the admin sign-off looks like at each gate. Turns onboarding from a calendar invite into a curriculum, and gives managers a checklist instead of a vibe."
        exampleLabel="AE ramp — sample"
        example={
          <span>
            By <span className="font-semibold text-navy">end of Week 1</span> a new AE has logged
            their first ten activities, run the pipeline report unaided, and shadowed three live
            deals end-to-end. Admin signs off before territory assignment.
          </span>
        }
        preview={<OnboardingTrackMini />}
        alt
      />
    </div>
  );
}
