export type ManagedServicesActivity = {
  title: string;
  body: string;
  cta?: { label: string; href: string };
};

export const managedServicesActivities: ManagedServicesActivity[] = [
  {
    title: 'Configuration & Customization',
    body: 'Custom objects, fields, page layouts, validation rules, record types, flows, and process automation. The day-to-day changes that keep Salesforce matching the way your team actually works.',
  },
  {
    title: 'Bug Fixes & Issue Resolution',
    body: 'Flows that stopped firing. Reports returning the wrong numbers. Permissions that broke after a release. You report it, we diagnose, we fix — and we write it down so it doesn\'t happen again.',
  },
  {
    title: 'End-User Support',
    body: 'Your users open tickets with us directly. Login and permission issues, "how do I do X in Salesforce", one-off training questions — handled by a named admin who already knows your org.',
  },
  {
    title: 'Reports, Dashboards & Data Pulls',
    body: 'Ad-hoc list views, Monday-morning reports, leadership dashboards, and one-off data pulls for the CFO. We build them in Salesforce, not in a side spreadsheet that immediately goes stale.',
  },
  {
    title: 'Data Hygiene',
    body: 'Duplicate management, mass updates, field cleanup, and ongoing deduplication. We keep the database clean as your team uses it, not once a year when someone notices it has drifted.',
  },
  {
    title: 'Integrations Support',
    body: 'Vendor coordination, connector troubleshooting, and monitored pipelines for the systems already wired to Salesforce — ERP, accounting, marketing, telephony. When something breaks upstream, we chase it down.',
  },
  {
    title: 'Release Management',
    body: 'Three Salesforce releases a year. We review the release notes against your configuration, flag what will affect you, test in sandbox, and roll out updates without surprising your users.',
  },
  {
    title: 'Strategic Roadmap & Quarterly Audits',
    body: 'Every quarter we audit the instance against your business KPIs, surface the changes worth prioritizing, and update the backlog so the next sprints target outcomes — not tickets in isolation.',
  },
];

export type ManagedServicesEngagementStep = {
  number: number;
  title: string;
  description: string;
};

export const engagementSteps: ManagedServicesEngagementStep[] = [
  {
    number: 1,
    title: 'A named team',
    description:
      'One dedicated Salesforce administrator and one dedicated project manager — your single point of contact. No shared queues, no offshore routing, no rotating faces.',
  },
  {
    number: 2,
    title: 'A block of hours every month',
    description:
      '25 hours per month on the standard plan, sized to the scope of what you actually need to get done. Advanced development and supplemental hours billed at posted rates when you need more.',
  },
  {
    number: 3,
    title: 'Two-week sprints',
    description:
      'You queue requests; we plan, build, demo, and ship on a two-week cadence. Transparent backlog, predictable delivery, visible progress — not a black box.',
  },
  {
    number: 4,
    title: 'Month-to-month',
    description:
      'No long-term contract. No commitment beyond the current month. If the work is not landing, you can cancel. Most clients stay for years because the work lands.',
  },
];

export type AudienceSegment = {
  headline: string;
  body: string;
};

export const audienceSegments: AudienceSegment[] = [
  {
    headline: 'Organizations without a full-time admin',
    body: 'A full-time Salesforce admin runs $90K–$140K plus benefits. Managed services gives you the same coverage — often broader, since it is a team — for a fraction of that, and you can scale hours up or down as the work demands.',
  },
  {
    headline: 'Organizations that just finished an implementation',
    body: 'Salesforce instances drift the moment go-live ends. A managed services engagement keeps the configuration aligned with the way the business actually evolves, instead of letting two years of workarounds pile up before the next rebuild.',
  },
  {
    headline: 'Organizations replacing an admin who left',
    body: 'When an admin leaves, institutional knowledge walks out with them. We pick up the backlog, document what was undocumented, and keep Salesforce running while you decide whether to re-hire or stay outsourced.',
  },
  {
    headline: 'Organizations running multiple clouds',
    body: 'Sales Cloud plus Service Cloud plus CPQ plus Experience Cloud is more surface area than most in-house admins can cover well. Our Full Stack Administration plan covers the entire product suite with the same named team.',
  },
];

export type ManagedServicesFaq = {
  question: string;
  answer: string;
};

export const managedServicesFaqs: ManagedServicesFaq[] = [
  {
    question: 'What if we don\'t use all of our hours in a month?',
    answer:
      'Unused hours within a month do not automatically roll over. We work with you at quarterly reviews to right-size the plan so you are paying for what you actually need — if consistent usage is lower, we downsize; if higher, we either add a top-up block of hours or move you to the next plan.',
  },
  {
    question: 'How quickly can you start?',
    answer:
      'Most engagements kick off within two weeks of the signed statement of work. We spend the first sprint on org access, documentation of what exists today, and backlog intake — so the second sprint is already shipping work.',
  },
  {
    question: 'Do you work in our Salesforce org or in your own?',
    answer:
      'We work directly in your production org with a named user and documented access. Sandboxes are used for anything with risk of disruption. You retain full ownership and full audit trail of every change.',
  },
  {
    question: 'Can we keep our existing in-house admin and use you alongside?',
    answer:
      'Yes — and it is a common arrangement. Your admin owns day-to-day user support and the org they already know; we pick up the project work, advanced development, release management, and the specialties they do not have time for. We work from the same backlog.',
  },
  {
    question: 'How do you prioritize work each sprint?',
    answer:
      'At the start of every sprint, your project manager runs a 30-minute planning session with your stakeholder. Requests are ranked by impact and effort, then committed for the sprint. Anything urgent mid-sprint gets triaged into the current or next sprint depending on scope.',
  },
  {
    question: 'What happens during the three Salesforce releases each year?',
    answer:
      'We review release notes against your configuration, identify anything that could affect you (deprecated features, new defaults, permission model changes), test in sandbox, and coordinate the production push. You get a short briefing on anything that will change for your users — no surprises on release day.',
  },
  {
    question: 'Can we cancel at any time?',
    answer:
      'Yes. The engagement is month-to-month, with 30 days notice. No long-term contract, no termination fee. If the work is not landing for you, you are not locked in.',
  },
];
