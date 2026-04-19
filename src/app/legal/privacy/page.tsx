import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'RevenuePoint Inc. privacy policy — how we collect, use, and protect your information.',
  path: '/legal/privacy/',
});

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight text-navy mb-8">Privacy Policy</h1>
        <div className="prose prose-sm max-w-none text-bodyText space-y-6 leading-relaxed">
          <p className="text-sm text-mutedText">Effective Date: January 1, 2024</p>

          <h2 className="text-xl font-semibold text-navy mt-8">Information Collection, Use, and Sharing</h2>
          <p>
            We are the sole owners of the information collected on this site. We only have access
            to/collect information that you voluntarily give us via email or other direct contact
            from you. We will not sell or rent this information to anyone.
          </p>
          <p>
            We will use your information to respond to you, regarding the reason you contacted us.
            We will not share your information with any third party outside of our organization,
            other than as necessary to fulfill your request, e.g. to process a service engagement.
          </p>
          <p>
            Unless you ask us not to, we may contact you via email in the future to tell you about
            specials, new products or services, or changes to this privacy policy.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Your Access to and Control Over Information</h2>
          <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address given on our website:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>See what data we have about you, if any</li>
            <li>Change/correct any data we have about you</li>
            <li>Have us delete any data we have about you</li>
            <li>Express any concern you have about our use of your data</li>
          </ul>

          <h2 className="text-xl font-semibold text-navy mt-8">Security</h2>
          <p>
            We take precautions to protect your information. When you submit sensitive information
            via the website, your information is protected both online and offline.
          </p>
          <p>
            Wherever we collect sensitive information (such as credit card data), that information
            is encrypted and transmitted to us in a secure way. You can verify this by looking for
            a lock icon in the address bar and looking for &quot;https&quot; at the beginning of the address
            of the Web page.
          </p>
          <p>
            While we use encryption to protect sensitive information transmitted online, we also
            protect your information offline. Only employees who need the information to perform a
            specific job (for example, billing or customer service) are granted access to
            personally identifiable information. The computers/servers in which we store personally
            identifiable information are kept in a secure environment.
          </p>

          <h2 className="text-xl font-semibold text-navy mt-8">Contact</h2>
          <p>
            If you feel that we are not abiding by this privacy policy, you should contact us
            immediately via email at{' '}
            <a href="mailto:hello@revenuepoint.com" className="text-crimson hover:text-crimsonDark transition-colors">
              hello@revenuepoint.com
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
