import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';

let initialized = false;

declare global {
  interface Window {
    __DD_RUM_OK?: boolean;
  }
}

export function initObservability(): boolean {
  if (initialized) return true;
  if (typeof window === 'undefined') return false;
  if (process.env.NODE_ENV !== 'production') return false;

  const applicationId = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
  const clientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
  const site = process.env.NEXT_PUBLIC_DATADOG_SITE;
  const service = process.env.NEXT_PUBLIC_DATADOG_SERVICE ?? 'revenuepoint-com';
  const env = process.env.NEXT_PUBLIC_DATADOG_ENV ?? 'production';
  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? 'dev';

  if (!applicationId || !clientToken || !site) {
    const missing = [
      !applicationId && 'NEXT_PUBLIC_DATADOG_APPLICATION_ID',
      !clientToken && 'NEXT_PUBLIC_DATADOG_CLIENT_TOKEN',
      !site && 'NEXT_PUBLIC_DATADOG_SITE',
    ].filter(Boolean);
    console.warn(`[observability] Datadog RUM not initialized — missing: ${missing.join(', ')}`);
    window.__DD_RUM_OK = false;
    return false;
  }

  datadogRum.init({
    applicationId,
    clientToken,
    site,
    service,
    env,
    version,
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackUserInteractions: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'allow',
  });

  datadogLogs.init({
    clientToken,
    site,
    service,
    env,
    version,
    forwardErrorsToLogs: false,
    sessionSampleRate: 100,
  });

  initialized = true;
  window.__DD_RUM_OK = true;
  console.info(
    `[observability] initialized — app:${applicationId.slice(0, 8)} env:${env} service:${service} version:${version}`,
  );
  return true;
}

export function trackEvent(name: string, context: Record<string, unknown> = {}) {
  if (!initialized) return;
  datadogRum.addAction(name, context);
}

export function setRumContext(key: string, value: unknown) {
  if (!initialized) return;
  datadogRum.setGlobalContextProperty(key, value);
  datadogLogs.setGlobalContextProperty(key, value);
}

/**
 * Progressive identification from the lead form (pre-submit).
 *
 * Called on blur of name/email/phone/company so RUM sessions get tagged with
 * the prospect's identity even when they never complete the lead form. Makes
 * support triage possible — find an in-flight session by @usr.email or
 * @usr.company in Sessions Explorer.
 *
 * Fires only when email is non-empty and passes a minimal regex (invalid
 * email = visitor isn't really identifying yet, skip the call). Deduplicates
 * on a fingerprint of {email,name,phone,company} so spamming blur events
 * doesn't create repeat setUser calls.
 */
interface FormIdentity {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  company?: string;
}

let lastFormIdentityFingerprint: string | null = null;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function identifyUserFromForm(form: FormIdentity): void {
  if (!initialized) return;
  const email = form.email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) return;

  const name = `${form.firstName ?? ''} ${form.lastName ?? ''}`.trim();
  const phone = form.phone?.trim() || undefined;
  const company = form.company?.trim() || undefined;

  const fingerprint = `${email}|${name}|${phone ?? ''}|${company ?? ''}`;
  if (fingerprint === lastFormIdentityFingerprint) return;
  lastFormIdentityFingerprint = fingerprint;

  datadogRum.setUser({
    id: email,
    email,
    ...(name ? { name } : {}),
    ...(phone ? { phone } : {}),
    ...(company ? { company } : {}),
  });
}

export function clearUser() {
  if (!initialized) return;
  datadogRum.clearUser();
  lastFormIdentityFingerprint = null;
}
