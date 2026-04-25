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

  useEffect(() => {
    const pageUrlField = document.getElementById('sf_page_url') as HTMLInputElement | null;
    if (pageUrlField) {
      pageUrlField.value = window.location.href;
    }
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
        value={`{"keyname":"reCAPTCHA_2","fallback":"true","orgId":"${process.env.NEXT_PUBLIC_SF_OID}","ts":""}`}
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
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          data-theme="light"
        />
      </div>

      <button
        type="submit"
        className="md:col-span-2 inline-flex items-center justify-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] py-3 px-8 hover:bg-crimsonTint transition-colors"
      >
        Get in touch <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
