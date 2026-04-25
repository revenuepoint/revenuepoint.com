import { trackEvent } from '@/lib/observability';
import { gtagEvent } from '@/lib/gtag';

export const events = {
  // CTAs
  schedule_clicked: 'schedule_clicked',
  explore_clicked: 'explore_clicked',
  nav_link_clicked: 'nav_link_clicked',
  footer_link_clicked: 'footer_link_clicked',

  // Lead form (Salesforce Web-to-Lead → /thank-you/)
  lead_form_started: 'lead_form_started',
  lead_form_submitted: 'lead_form_submitted',
  lead_form_completed: 'lead_form_completed',

  // Foundry product mockups
  foundry_module_selected: 'foundry_module_selected',
  industry_switched: 'industry_switched',
  otto_prompt_clicked: 'otto_prompt_clicked',
  prism_report_opened: 'prism_report_opened',
  lens_view_changed: 'lens_view_changed',
  action_inspected: 'action_inspected',
  blueprint_object_focused: 'blueprint_object_focused',

  // Security page
  pgp_key_clicked: 'pgp_key_clicked',
  security_email_clicked: 'security_email_clicked',

  // Insights (when blog goes live)
  insights_post_viewed: 'insights_post_viewed',
} as const;

export type EventName = (typeof events)[keyof typeof events];

type Props = Record<string, unknown>;

const isProd = process.env.NODE_ENV === 'production';

export function track(event: EventName, props: Props = {}) {
  if (!isProd) {
    console.info('[analytics]', event, props);
    return;
  }
  trackEvent(event, props);
  gtagEvent(event, props);
}
