'use client';

import { useEffect, useRef } from 'react';
import { track, events } from '@/lib/analytics';
import { identifyUserFromForm } from '@/lib/observability';

type LeadFormProps = {
  interest: string;
  id?: string;
};

const inputClass =
  'w-full bg-paper border border-rule px-4 py-3 text-sm text-ink placeholder:text-muteSoft focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors';

export function LeadForm({ interest, id }: LeadFormProps) {
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const captchaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageUrlField = document.getElementById('sf_page_url') as HTMLInputElement | null;
    if (pageUrlField) {
      pageUrlField.value = window.location.href;
    }
    let widgetId: number | null = null;
    const renderCaptcha = () => {
      const el = captchaRef.current;
      const grecaptcha = (window as unknown as { grecaptcha?: { render?: (e: HTMLElement, o: object) => number } }).grecaptcha;
      if (!el || el.childElementCount > 0 || !grecaptcha?.render) return false;
      try {
        widgetId = grecaptcha.render(el, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
          theme: 'light',
        });
        return true;
      } catch {
        return false;
      }
    };
    let pollId: number | undefined;
    if (!renderCaptcha()) {
      pollId = window.setInterval(() => {
        if (renderCaptcha()) window.clearInterval(pollId);
      }, 200);
    }
    const tick = () => {
      const form = formRef.current;
      if (!form) return;
      const response = form.querySelector<HTMLTextAreaElement>('textarea[name="g-recaptcha-response"]');
      if (response && response.value.trim() !== '') return;
      const settings = form.querySelector<HTMLInputElement>('input[name="captcha_settings"]');
      if (!settings) return;
      try {
        const obj = JSON.parse(settings.value);
        obj.ts = JSON.stringify(Date.now());
        settings.value = JSON.stringify(obj);
      } catch {}
    };
    const tickId = window.setInterval(tick, 500);
    return () => {
      window.clearInterval(tickId);
      if (pollId !== undefined) window.clearInterval(pollId);
      void widgetId;
    };
  }, []);

  const handleFirstFocus = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    track(events.lead_form_started, {
      interest,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  };

  const handleFieldBlur = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    identifyUserFromForm({
      firstName: fd.get('first_name')?.toString(),
      lastName: fd.get('last_name')?.toString(),
      email: fd.get('email')?.toString(),
      phone: fd.get('phone')?.toString(),
      company: fd.get('company')?.toString(),
    });
  };

  const handleSubmit = () => {
    track(events.lead_form_submitted, {
      interest,
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
  };

  return (
    <form
      ref={formRef}
      id={id}
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      method="POST"
      onFocusCapture={handleFirstFocus}
      onBlurCapture={handleFieldBlur}
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* Salesforce hidden fields */}
      <input type="hidden" name="oid" value={process.env.NEXT_PUBLIC_SF_OID} />
      <input type="hidden" name="retURL" value="https://revenuepoint.com/thank-you/" />
      <input type="hidden" name="lead_source" value="Web" />
      <input
        type="hidden"
        name="captcha_settings"
        value={`{"keyname":"RevenuePoint_v2_Checkbox","fallback":"true","orgId":"${process.env.NEXT_PUBLIC_SF_OID}","ts":""}`}
      />
      <input
        type="hidden"
        id="sf_page_url"
        name={process.env.NEXT_PUBLIC_SF_PAGE_URL_FIELD_ID}
        value=""
      />

      {/* Visible fields */}
      <input
        name="first_name"
        placeholder="First name *"
        required
        maxLength={40}
        className={inputClass}
      />
      <input
        name="last_name"
        placeholder="Last name *"
        required
        maxLength={80}
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Work email *"
        required
        maxLength={80}
        className={inputClass}
      />
      <input
        name="phone"
        type="tel"
        placeholder="Phone"
        maxLength={40}
        className={inputClass}
      />
      <input
        name="company"
        placeholder="Company name *"
        required
        maxLength={40}
        className={inputClass}
      />
      <input
        name="URL"
        type="url"
        placeholder="Company website"
        maxLength={80}
        className={inputClass}
      />

      <select
        name={process.env.NEXT_PUBLIC_SF_REVENUE_FIELD_ID}
        className={`${inputClass} md:col-span-2`}
        defaultValue=""
      >
        <option value="" disabled>
          Annual revenue (optional)
        </option>
        <option value="Under $1M">Under $1M</option>
        <option value="$1M–$5M">$1M–$5M</option>
        <option value="$5M–$20M">$5M–$20M</option>
        <option value="$20M+">$20M+</option>
      </select>

      <input
        name={process.env.NEXT_PUBLIC_SF_SOURCE_FIELD_ID}
        placeholder="How did you hear about us?"
        maxLength={255}
        className={`${inputClass} md:col-span-2`}
      />

      <div className="md:col-span-2 pt-2">
        <div ref={captchaRef} />
      </div>

      <button
        type="submit"
        className="md:col-span-2 inline-flex items-center justify-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] py-3 px-8 hover:bg-crimsonTint transition-colors"
      >
        Schedule a call <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
