'use client';

import { useEffect, useRef } from 'react';
import { identifyUserFromForm } from '@/lib/observability';

type EmailSignupProps = {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  source?: string;
  id?: string;
};

const inputClass =
  'flex-1 border border-rule px-4 py-3 text-sm text-ink placeholder:text-muteSoft focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors bg-paper';

export function EmailSignup({
  heading = 'Get new posts in your inbox.',
  body = 'Occasional essays on orchestration, data infrastructure, and the work of running a modern business. No spam — unsubscribe anytime.',
  buttonLabel = 'Subscribe',
  source = 'Insights Email Signup',
  id,
}: EmailSignupProps) {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const pageUrlField = document.getElementById(
      'sf_email_signup_page_url',
    ) as HTMLInputElement | null;
    if (pageUrlField) {
      pageUrlField.value = window.location.href;
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
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, []);

  const handleFieldBlur = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    identifyUserFromForm({
      email: fd.get('email')?.toString(),
    });
  };

  return (
    <div className="border border-rule bg-cream px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-xl">
        <p className="eyebrow mb-4">Newsletter · monthly</p>
        <h3 className="font-serif text-[1.5rem] lg:text-[1.75rem] font-medium text-ink leading-tight">
          {heading}
        </h3>
        <p className="mt-3 text-sm lg:text-base text-inkSoft leading-relaxed">{body}</p>
      </div>

      <form
        ref={formRef}
        id={id}
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
        method="POST"
        onBlurCapture={handleFieldBlur}
        className="mt-6 flex flex-col sm:flex-row gap-3 max-w-xl"
      >
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
          id="sf_email_signup_page_url"
          name={process.env.NEXT_PUBLIC_SF_PAGE_URL_FIELD_ID}
          value=""
        />
        <input
          type="hidden"
          name={process.env.NEXT_PUBLIC_SF_SOURCE_FIELD_ID}
          value={source}
        />
        <input type="hidden" name="first_name" value="Insights" />
        <input type="hidden" name="last_name" value="Subscriber" />
        <input type="hidden" name="company" value="Newsletter Signup" />

        <input
          name="email"
          type="email"
          placeholder="you@company.com"
          required
          maxLength={80}
          className={inputClass}
          aria-label="Work email"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 border border-crimson text-crimson font-serif italic text-[15px] py-3 px-6 hover:bg-crimsonTint transition-colors whitespace-nowrap"
        >
          {buttonLabel} <span aria-hidden="true">→</span>
        </button>
      </form>

      <div className="mt-4 max-w-xl">
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          data-theme="light"
        />
      </div>
    </div>
  );
}
