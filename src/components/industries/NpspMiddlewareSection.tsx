import Link from 'next/link';
import {
  NPSP_CONTACT_HREF,
  NPSP_GITHUB_URL,
  NPSP_MANAGED_PERIOD,
  NPSP_MANAGED_PRICE,
  npspFeatures,
  npspIntegrations,
  npspPremiumStack,
} from '@/data/npspMiddleware';

function GithubIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export function NpspMiddlewareSection() {
  return (
    <section className="bg-cream border-y border-rule">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-navySoft mb-4">
            RevenuePoint Open Source · NPSP Middleware
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">
            A modern donor experience on top of NPSP.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink">
            <span className="font-semibold text-navy">NPSP Middleware</span> is our open-source
            donor-facing checkout, member portal, and events platform — syncing directly into Salesforce
            NPSP. Self-host it for free, or let us run it end-to-end.
          </p>
        </div>

        {/* Baked-in features */}
        <div className="mb-10">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-mute mb-4">
            What&apos;s baked in (both tiers)
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {npspFeatures.map((f) => (
              <div key={f.title} className="border border-rule rounded-lg bg-white p-5">
                <div className="text-sm font-bold text-navy">{f.title}</div>
                <p className="mt-2 text-xs text-ink leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations chip strip */}
        <div className="mb-12">
          <p className="text-[10px] uppercase tracking-widest font-semibold text-mute mb-3">
            Integrations, wired in
          </p>
          <div className="flex flex-wrap gap-2">
            {npspIntegrations.map((i) => (
              <span
                key={i.name}
                className="text-xs font-semibold text-navy bg-white border border-rule rounded-full px-3 py-1.5"
                title={i.purpose}
              >
                {i.name}
              </span>
            ))}
          </div>
        </div>

        {/* Two delivery options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Open source */}
          <div className="border border-rule rounded-lg bg-white p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
                  Option 1
                </div>
                <div className="mt-1 text-xl font-bold text-navy">Open source</div>
              </div>
              <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
                Free · AGPL-3.0
              </span>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              Clone the repo, deploy to your own Heroku / Render / bare-metal. You get the full
              donor-facing checkout, member portal, events, and Salesforce sync. No license fees. No
              vendor lock-in.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink flex-1">
              <li className="flex gap-2"><span className="text-navySoft font-bold shrink-0">—</span>Full source under AGPL-3.0</li>
              <li className="flex gap-2"><span className="text-navySoft font-bold shrink-0">—</span>Docs + self-hosting guide</li>
              <li className="flex gap-2"><span className="text-navySoft font-bold shrink-0">—</span>Plugin API for your own integrations</li>
              <li className="flex gap-2"><span className="text-navySoft font-bold shrink-0">—</span>Provided as-is — no SLA, no on-call</li>
            </ul>
            <a
              href={NPSP_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:text-navySoft transition-colors"
            >
              <GithubIcon /> View on GitHub →
            </a>
          </div>

          {/* Managed tier */}
          <div className="border-2 border-crimson rounded-lg bg-crimsonTint p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-crimson font-semibold">
                  Option 2
                </div>
                <div className="mt-1 text-xl font-bold text-navy">Fully managed by RevenuePoint</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-navy">{NPSP_MANAGED_PRICE}</div>
                <div className="text-[11px] text-mute">{NPSP_MANAGED_PERIOD}</div>
              </div>
            </div>
            <p className="mt-4 text-sm text-ink leading-relaxed">
              We host it, monitor it, upgrade it, and bolt on a premium integration stack the
              open-source version does not ship. Built for newsrooms who need their donor-facing checkout
              to stay up and keep getting better.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-ink flex-1">
              {npspPremiumStack.map((p) => (
                <li key={p.name} className="flex gap-2">
                  <span className="text-crimson font-bold shrink-0">—</span>
                  <span>
                    <span className="font-semibold text-navy">{p.name}.</span>{' '}
                    <span className="text-ink">{p.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href={NPSP_CONTACT_HREF}
                className="inline-flex items-center px-5 py-2.5 rounded-sm bg-crimson text-white text-sm font-semibold hover:bg-crimsonDeep transition-colors"
              >
                Schedule a newsroom consultation →
              </Link>
              <Link
                href="/npsp-middleware/"
                className="inline-flex items-center text-sm font-semibold text-navy hover:text-navySoft transition-colors"
              >
                See the full page →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
