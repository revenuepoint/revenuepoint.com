import { buildMetadata } from '@/lib/metadata';
import { Button } from '@/components/ui/Button';

export const metadata = buildMetadata({
  title: 'Security & vulnerability disclosure',
  description:
    'How to report a security vulnerability to RevenuePoint. Email security@revenuepoint.com — PGP-encrypted reports preferred. Public key available here and on GitHub.',
  path: '/security/',
});

const PGP_KEY = `-----BEGIN PGP PUBLIC KEY BLOCK-----

mQENBGXw+hgBCADw8fsywGEF8Rbbt7D1/vxcfYxPMxPZnlqY6+TU5/p8zgUWfx0t
g4zICh2X79JbDdnyPXQYY0vdE+kZNfG8VNxgBhyl7pQTmW8KrQXW2/7LRy7Ifg0C
gJPM74uxnhjttcuoT2AKHsypMNoswEMr++LAm6ryAoLybUcjd+EKayJa/AIbMJ4w
d+Gb22d2P+OuM9/0k9MAo52kHXQeANXPU3iUHagtR3P/C+Lm+jrT4xLKTEsOcaDT
FZGya03q/wtW+gXQ3EV8ELS/x8jDbfBPYIO2LQaktszqkiJeWCM2qpZypOryIuGZ
iKTzXUOzp/dIgccsr+zjcQgDE9aaFFCnpAzBABEBAAG0JlRob21hcyBKb25lcyA8
dGhvbWFzQHJldmVudWVwb2ludC5jb20+iQFUBBMBCgA+FiEEJDQ7vaDj6xH7CeYc
uiwE301XB2UFAmXw+hgCGwMFCQHhM4AFCwkIBwIGFQoJCAsCBBYCAwECHgECF4AA
CgkQuiwE301XB2UZHQf+KOKsH7W8+r+/Hn0JptHoVhizNSXNQ3q54ft9KqfBdC6J
/8FpzpF1isLlfKsg91uHIvlsi/s27L2BCCC5006HK0S6sLjsjhYo4opwrsu9Q3i+
/yXGlNenDO+PInwIwBTRkwvW05MxUssMSECDWnviiwipg06edkrGta/qoDzjsFIn
s3b+6y5zYHxxaoTKwwwfUVL/t/1dsfdVRwh+n5b3VCI9wOglVOzOiF+u2v60bL5K
4q6Xoz3m7z2wVokXoHy2ZX6AuYU4muRha3OOfx00PMHPgSJVxcvXsXEE/CQ8BjOJ
dkbu8MZ4TZl/JmVHIPjSu0TPvwVeHvlnI96Wxv5RJbkBDQRl8PoYAQgApAdcBNEd
eE6DvQnH56DMY0yLV7jpupqFK77CFwcGQ2X1yxOlOrXOlqZXVrQy96mV4WCKD4tH
owRuv0ZWCn4rEPOqVclFZ5HXsZemgV09AsePic/Oxh55hxa4TKq9f080yoT7amdL
oNUNM77JvEIgArCoxyrcZbXV8UkdTn2zqGqwOj/oRYqlIiJLURmZjADLji9lB9Xi
7+qEiN2XSxLQLg5RkLKIinc5xMEXVkJzq+ZnfFESgOvyM89GXEN9EAm5KSeldJI7
GVtmfPhyMWZ2+foFZT3FLmal/u9jBp8heGs+Kniwyx3SWrLlkI/miwcUdC/zbmNf
5z1gmujCLahK4wARAQABiQE8BBgBCgAmFiEEJDQ7vaDj6xH7CeYcuiwE301XB2UF
AmXw+hgCGwwFCQHhM4AACgkQuiwE301XB2WimQf/SvNxHG3NoeqTnDZ/89Xl0jTO
9/KDi1gd8J/TLH6bhQmHPk+hFoMP6wa0z16PE2n1ddXZYGmI4EGtsIDzO9gXIbJ+
xRfUVq9tM1SOo50TiFtTqF7RiU+pMlyHysb0+1fuheemBenkhR2rXKh5+Nwkr6oY
lr7gTPOREFTd23XkxXm5EQuDZ5ZLoUyWbTWj9L8AMd3uQ6Taw+2FReSHJFC6zcq7
eYQB7f1cPdhTELHMRIsYH09+RgtnpfqUxfV/QR3YMncPKbd6yXtpApAqjTeNe2Be
cjHs+UYFBNb7UfeH4WrRotvMJEfkjODBSDTJcQl/giCY1PYhLAUL2smJKAH3Mg==
=JvW7
-----END PGP PUBLIC KEY BLOCK-----`;

const FINGERPRINT = '2434 3BBD A0E3 EB11 FB09  E61C BA2C 04DF 4D57 0765';
const KEY_REPO = 'github.com/revenuepoint/security';
const KEY_FILE_URL = 'https://github.com/revenuepoint/security/blob/main/pgp-key.asc';

export default function SecurityPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-paper overflow-hidden border-b border-rule">
        <div className="relative max-w-editorial mx-auto px-6 lg:px-8 pt-20 lg:pt-32 pb-16 lg:pb-20">
          <p className="byline mb-5">Security · Responsible disclosure</p>
          <h1 className="text-d0 font-serif font-semibold text-ink leading-tight">
            Security &amp; vulnerability <em>disclosure</em>.
          </h1>
          <p className="mt-6 text-lede leading-[1.65] text-inkSoft max-w-prose">
            If you&rsquo;ve found a security issue in RevenuePoint or anything we run, here&rsquo;s how to reach us
            safely. We take every report seriously, respond fast, and credit researchers who help us ship a fix.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="primary"
              href="mailto:security@revenuepoint.com?subject=Security%20vulnerability%20report"
            >
              Email security@revenuepoint.com
            </Button>
            <Button variant="secondary" href={KEY_FILE_URL}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
              </svg>
              Get our PGP key
            </Button>
          </div>
          <p className="mt-6 pt-4 border-t border-ruleSoft font-mono text-[11px] uppercase tracking-[0.14em] text-mute max-w-prose">
            Acknowledgement within 1 business day · triage within 5 · fix coordinated end-to-end.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-paper py-section">
        <div className="max-w-narrow mx-auto px-6 lg:px-8 space-y-12 text-base text-inkSoft leading-[1.7]">
          {/* How to report */}
          <div>
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">
              How to report a vulnerability.
            </h2>
            <p>
              Email{' '}
              <a
                href="mailto:security@revenuepoint.com?subject=Security%20vulnerability%20report"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                security@revenuepoint.com
              </a>
              . Encrypt with our PGP key if you can — it&rsquo;s below. Plain email is fine if you can&rsquo;t.
              Don&rsquo;t use{' '}
              <span className="font-mono text-ink">team@revenuepoint.com</span> for security reports; that
              inbox isn&rsquo;t monitored for vulnerabilities.
            </p>
          </div>

          {/* PGP key */}
          <div id="pgp" className="scroll-mt-24">
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">PGP public key.</h2>
            <p>
              Use this key to encrypt sensitive details. The same key is published at{' '}
              <a
                href={KEY_FILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                {KEY_REPO}
              </a>
              . Verify the fingerprint matches before you trust this copy.
            </p>

            <dl className="mt-6 grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-x-6 gap-y-3 text-sm border-y border-rule py-5">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Fingerprint</dt>
              <dd className="font-mono text-[12.5px] tabular-nums text-ink break-all">{FINGERPRINT}</dd>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Identity</dt>
              <dd className="text-ink">
                Thomas Jones &lt;<span className="font-mono">thomas@revenuepoint.com</span>&gt;
              </dd>
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-mute">Mirror</dt>
              <dd>
                <a
                  href={KEY_FILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12.5px] text-crimson hover:text-crimsonDeep underline underline-offset-2"
                >
                  {KEY_REPO}/pgp-key.asc
                </a>
              </dd>
            </dl>

            <pre className="mt-6 border border-rule bg-cream p-5 font-mono text-[11.5px] leading-[1.55] text-ink overflow-x-auto whitespace-pre">
              <code>{PGP_KEY}</code>
            </pre>
          </div>

          {/* What to include */}
          <div>
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">What to include.</h2>
            <ul className="space-y-2">
              {[
                'A clear description of the issue and why it matters.',
                'Reproduction steps — URLs, payloads, headers, or accounts you used. Screenshots are welcome.',
                'Impact — what an attacker could do (data exposure, account takeover, code execution, etc.).',
                'The affected surface (revenuepoint.com, Foundry Portal, Gateway tenant, NPSP middleware, …).',
                'Optional: a minimal proof of concept. Please don’t exfiltrate live customer data.',
                'How you’d like to be credited — name, handle, or anonymous.',
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-crimson font-mono shrink-0 mt-0.5" aria-hidden="true">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to expect */}
          <div>
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">What to expect from us.</h2>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0 mt-0.5" aria-hidden="true">→</span>
                <span>
                  <span className="text-ink font-medium">Within 1 business day</span> — a real human
                  acknowledges your report. No auto-replies.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0 mt-0.5" aria-hidden="true">→</span>
                <span>
                  <span className="text-ink font-medium">Within 5 business days</span> — triage, severity
                  assessment, and a target window for the fix.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0 mt-0.5" aria-hidden="true">→</span>
                <span>
                  <span className="text-ink font-medium">Through to resolution</span> — a status note at least
                  every 7 days while we work the fix.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="text-crimson font-mono shrink-0 mt-0.5" aria-hidden="true">→</span>
                <span>
                  <span className="text-ink font-medium">Coordinated disclosure</span> — default 90 days from
                  initial report or fix release, whichever comes first. Credit goes to researchers who follow
                  this policy.
                </span>
              </li>
            </ul>
          </div>

          {/* Scope */}
          <div>
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">Scope.</h2>
            <p className="mb-4">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-navy mr-2">In scope</span>
              revenuepoint.com and subdomains; Foundry surfaces; Gateway and shipped
              connectors (Salesforce, SAP, custom REST); <span className="font-mono text-ink">npsp-middleware</span> on our supplied images; public APIs at
              api.revenuepoint.com; authentication, authorisation, tenant isolation, and audit-log integrity;
              anything that affects customer data confidentiality, integrity, or availability.
            </p>
            <p>
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-rust mr-2">
                Out of scope
              </span>
              volumetric DoS or stress testing; social engineering of staff or customers; physical attacks;
              spam/phishing without security impact; vulnerabilities in third-party services we depend on
              (Salesforce, SAP, Stripe, etc.) — please report those to the respective vendor; best-practice
              findings without demonstrated exploitability (missing headers, version disclosure).
            </p>
          </div>

          {/* Safe harbor */}
          <div>
            <h2 className="text-d2 font-serif font-medium text-ink mb-4">Safe harbor.</h2>
            <blockquote className="border-l-2 border-crimson pl-5 font-serif italic text-[1.25rem] text-ink leading-snug max-w-prose">
              We will not pursue legal action against researchers who make a good-faith effort to follow this
              policy.
            </blockquote>
            <p className="mt-5">
              That means: report through{' '}
              <span className="font-mono text-ink">security@revenuepoint.com</span>; don&rsquo;t access more
              data than necessary to demonstrate the issue; don&rsquo;t exfiltrate or publicly disclose
              customer data; don&rsquo;t degrade service for our customers; give us a reasonable window to
              ship the fix before publishing.
            </p>
            <p className="mt-3">
              This policy is intended to be compatible with{' '}
              <a
                href="https://hackerone.com/security?type=team"
                target="_blank"
                rel="noopener noreferrer"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                HackerOne&rsquo;s safe-harbor language
              </a>{' '}
              and{' '}
              <a
                href="https://www.rfc-editor.org/rfc/rfc9116.html"
                target="_blank"
                rel="noopener noreferrer"
                className="text-crimson hover:text-crimsonDeep underline underline-offset-2"
              >
                RFC 9116 (security.txt)
              </a>
              . If you&rsquo;re unsure whether something is in scope, ask first.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
