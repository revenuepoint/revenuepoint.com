'use client';

import { useEffect } from 'react';

type LeadFormProps = {
  interest: string;
  id?: string;
};

const inputClass =
  'w-full border border-border rounded-sm px-4 py-3 text-sm text-bodyText placeholder:text-mutedText focus:outline-none focus:border-crimson focus:ring-1 focus:ring-crimson transition-colors';

export function LeadForm({ interest, id }: LeadFormProps) {
  useEffect(() => {
    const pageUrlField = document.getElementById('sf_page_url') as HTMLInputElement | null;
    if (pageUrlField) {
      pageUrlField.value = window.location.href;
    }
  }, []);

  return (
    <form
      id={id}
      action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8"
      method="POST"
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
        placeholder="First Name *"
        required
        maxLength={40}
        className={inputClass}
      />
      <input
        name="last_name"
        placeholder="Last Name *"
        required
        maxLength={80}
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        placeholder="Work Email *"
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
        placeholder="Company Name *"
        required
        maxLength={40}
        className={inputClass}
      />
      <input
        name="URL"
        type="url"
        placeholder="Company Website"
        maxLength={80}
        className={inputClass}
      />

      <select
        name={process.env.NEXT_PUBLIC_SF_REVENUE_FIELD_ID}
        className={`${inputClass} md:col-span-2`}
        defaultValue=""
      >
        <option value="" disabled>
          Annual Revenue (optional)
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

      {/* reCAPTCHA */}
      <div className="md:col-span-2">
        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        />
      </div>

      <button
        type="submit"
        className="md:col-span-2 bg-crimson text-white font-semibold py-3 px-8 rounded-sm hover:bg-crimsonDark transition-colors"
      >
        Get in Touch &rarr;
      </button>
    </form>
  );
}
