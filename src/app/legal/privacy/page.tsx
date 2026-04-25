import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'RevenuePoint Inc. privacy policy — how we collect, use, and protect your information.',
  path: '/legal/privacy/',
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-paper py-section">
      <div className="max-w-narrow mx-auto px-6 lg:px-8">
        <p className="eyebrow mb-5">Legal · Privacy</p>
        <h1 className="text-d1 font-serif font-medium text-ink mb-8">RevenuePoint privacy policy.</h1>
        <div className="text-base leading-[1.75] text-inkSoft space-y-5 max-w-prose">
          <p>
            This privacy notice discloses the privacy practices for RevenuePoint. This privacy notice applies solely to information collected by this website. It will notify you of the following:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
            <li>What choices are available to you regarding the use of your data.</li>
            <li>The security procedures in place to protect the misuse of your information.</li>
            <li>How you can correct any inaccuracies in the information.</li>
          </ul>

          <h2 className="text-d3 font-serif font-medium text-ink mt-10">Information collection, use, and sharing.</h2>
          <p>
            We are the sole owners of the information collected on this site. We only have access to / collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.
          </p>
          <p>
            We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.
          </p>
          <p>
            Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.
          </p>

          <h2 className="text-d3 font-serif font-medium text-ink mt-10">Your access to and control over information.</h2>
          <p>
            You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address or phone number given on our website:
          </p>
          <ul className="list-disc pl-6 space-y-1.5">
            <li>See what data we have about you, if any.</li>
            <li>Change / correct any data we have about you.</li>
            <li>Have us delete any data we have about you.</li>
            <li>Express any concern you have about our use of your data.</li>
          </ul>

          <h2 className="text-d3 font-serif font-medium text-ink mt-10">Security.</h2>
          <p>
            We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.
          </p>
          <p>
            Wherever we collect sensitive information (such as credit card data), that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for &quot;https&quot; at the beginning of the address of the Web page.
          </p>
          <p>
            While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job (for example, billing or customer service) are granted access to personally identifiable information. The computers and servers in which we store personally identifiable information are kept in a secure environment.
          </p>
          <p>
            If you feel that we are not abiding by this privacy policy, you should contact us immediately via email at{' '}
            <a href="mailto:team@revenuepoint.com" className="text-crimson hover:text-crimsonDeep transition-colors">
              team@revenuepoint.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
