'use client';

import { useEffect } from 'react';

type EmailSignupProps = {
  heading?: string;
  body?: string;
  buttonLabel?: string;
  source?: string;
  id?: string;
};

const inputClass =
  'flex-1 border border-border rounded-sm px-4 py-3 text-sm text-bodyText placeholder:text-mutedText focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors bg-white';

export function EmailSignup({
  heading = 'Get new posts in your inbox',
  body = 'Occasional essays on orchestration, data infrastructure, and the work of running a modern business. No spam, unsubscribe anytime.',
  buttonLabel = 'Subscribe',
  source = 'Insights Email Signup',
  id,
}: EmailSignupProps) {
  useEffect(() => {
    const pageUrlField = document.getElementById(
      'sf_email_signup_page_url',
    ) as HTMLInputElement | null;
    if (pageUrlField) {
      pageUrlField.value = window.location.href;
    }
  }, []);

  return (
    <div className="rounded-md border border-border bg-offWhite px-6 py-8 lg:px-10 lg:py-10">
      <div className="max-w-xl">
        <h3 className="text-xl lg:text-2xl font-bold text-navy tracking-tight">
          {heading}
        </h3>
        <p className="mt-2 text-sm lg:text-base text-bodyText leading-relaxed">
          {body}
        </p>
      </div>

      <form
        id={id}
        action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
        method="POST"
        className="mt-5 flex flex-col sm:flex-row gap-3 max-w-xl"
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
          id="sf_email_signup_page_url"
          name={process.env.NEXT_PUBLIC_SF_PAGE_URL_FIELD_ID}
          value=""
        />
        <input
          type="hidden"
          name={process.env.NEXT_PUBLIC_SF_SOURCE_FIELD_ID}
          value={source}
        />

        {/* Salesforce requires first_name, last_name, and company on Lead records.
            We populate them with sentinel values so the email-only signup is valid. */}
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
          className="bg-crimson text-white font-semibold py-3 px-6 rounded-sm hover:bg-crimsonDark transition-colors whitespace-nowrap"
        >
          {buttonLabel} &rarr;
        </button>
      </form>

      <div className="mt-4 max-w-xl">
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />
      </div>
    </div>
  );
}
