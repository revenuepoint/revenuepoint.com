'use client';

import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';
import { track, events } from '@/lib/analytics';

const sfLinks = [
  { label: 'Consulting', href: '/salesforce/' },
  { label: 'Managed Services', href: '/salesforce/managed-services/' },
  { label: 'Pricing', href: '/salesforce/managed-services/pricing/' },
  { label: 'Health Check', href: '/salesforce/health-check/' },
  { label: 'Training', href: '/salesforce/training/' },
];

const sapLinks = [
  { label: 'Overview', href: '/sap/' },
  { label: 'Pricing', href: '/sap/pricing/' },
];

const researchLinks = [
  { label: 'Intelligence Reports', href: '/research/intelligence-reports/' },
];

const foundryLinks = [
  { label: 'Platform Overview', href: '/foundry/' },
  { label: 'Pricing', href: '/foundry/pricing/' },
  { label: 'Request a Demo', href: '/contact/?interest=Foundry' },
  { label: 'Insights', href: '/insights/' },
];

const gatewayLinks = [
  { label: 'Platform Overview', href: '/gateway/' },
  { label: 'Use Cases', href: '/gateway/use-cases/' },
  { label: 'Connectors', href: '/gateway/connectors/' },
  { label: 'Pricing', href: '/gateway/pricing/' },
  { label: 'Request a Demo', href: '/contact/?interest=Gateway' },
];

const resourceLinks = [
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
];

type Group = { heading: string; links: { label: string; href: string }[] };
const groups: Group[] = [
  { heading: 'Salesforce', links: sfLinks },
  { heading: 'SAP S/4HANA + B1', links: sapLinks },
  { heading: 'Research', links: researchLinks },
  { heading: 'Foundry', links: foundryLinks },
  { heading: 'Gateway', links: gatewayLinks },
  { heading: 'Resources', links: resourceLinks },
];

export function Footer() {
  return (
    <footer className="bg-paper text-ink border-t-2 border-ink/90">
      {/* Crimson hairline at the very top */}
      <div className="h-px bg-crimson" />

      <div className="max-w-editorial mx-auto px-6 lg:px-8 pt-16 lg:pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12">
          {/* Wordmark + address */}
          <div className="md:col-span-4">
            <Wordmark size="md" tone="crimson" />
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-inkSoft max-w-prose">
              Fully managed pipelines that turn data into action — across CRM, ERP, accounting, data infrastructure, and AI.
            </p>
            <address className="mt-8 not-italic font-mono text-xs text-mute leading-relaxed space-y-1">
              <p className="text-ink">200 Vesey Street, 24th Floor</p>
              <p className="text-ink">New York, NY 10281</p>
              <p className="mt-3">
                <a href="tel:+13329001150" className="text-ink hover:text-crimson transition-colors">
                  +1 (332) 900-1150
                </a>
              </p>
              <p>
                <a href="mailto:team@revenuepoint.com" className="text-ink hover:text-crimson transition-colors">
                  team@revenuepoint.com
                </a>
              </p>
              <p className="mt-3">
                <a
                  href="https://github.com/revenuepoint"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-ink hover:text-crimson transition-colors"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
                  </svg>
                  github.com/revenuepoint
                </a>
              </p>
            </address>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 md:pt-3 grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {groups.map((group) => (
              <div key={group.heading}>
                <p className="eyebrow mb-5">{group.heading}</p>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() =>
                          track(events.footer_link_clicked, {
                            label: link.label,
                            href: link.href,
                            group: group.heading,
                          })
                        }
                        className="text-sm text-inkSoft hover:text-crimson transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rule">
        <div className="max-w-editorial mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-mute">
            &copy; {new Date().getFullYear()} RevenuePoint Inc., all rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <Link href="/brand/" className="text-mute hover:text-crimson transition-colors">
              Brand
            </Link>
            <Link href="/security/" className="text-mute hover:text-crimson transition-colors">
              Security
            </Link>
            <a
              href="https://revenuepoint.statuspage.datadoghq.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-mute hover:text-crimson transition-colors"
            >
              Status
            </a>
            <Link href="/legal/privacy/" className="text-mute hover:text-crimson transition-colors">
              Privacy
            </Link>
            <Link href="/legal/terms/" className="text-mute hover:text-crimson transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
