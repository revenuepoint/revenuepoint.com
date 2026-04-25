import Link from 'next/link';
import { Wordmark } from '@/components/brand/Wordmark';

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
  { label: 'Intelligence Reports', href: '/research/intelligence-reports/' },
  { label: 'Brand Guide', href: '/brand/' },
  { label: 'Security', href: '/security/' },
  { label: 'Contact', href: '/contact/' },
];

type Group = { heading: string; links: { label: string; href: string }[] };
const groups: Group[] = [
  { heading: 'Salesforce', links: sfLinks },
  { heading: 'SAP', links: sapLinks },
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
              Full-service technology and intelligence partner for mid-market businesses.
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
            </address>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 grid grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
            {groups.map((group) => (
              <div key={group.heading}>
                <h3 className="serif-italic text-[0.95rem] mb-4 text-ink">{group.heading}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
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
            &copy; {new Date().getFullYear()} RevenuePoint Inc. — Fully managed by RevenuePoint.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em]">
            <Link href="/brand/" className="text-mute hover:text-crimson transition-colors">
              Brand
            </Link>
            <Link href="/security/" className="text-mute hover:text-crimson transition-colors">
              Security
            </Link>
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
