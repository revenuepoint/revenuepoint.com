import Link from 'next/link';

const sfLinks = [
  { label: 'Overview', href: '/salesforce/' },
  { label: 'Consulting', href: '/salesforce/consulting/' },
  { label: 'Health Check', href: '/salesforce/health-check/' },
  { label: 'Training', href: '/salesforce/training/' },
  { label: 'Pricing', href: '/salesforce/pricing/' },
];

const sapLinks = [
  { label: 'Overview', href: '/sap/' },
  { label: 'Pricing', href: '/sap/pricing/' },
];

const foundryLinks = [
  { label: 'Platform Overview', href: '/foundry/' },
  { label: 'Pricing', href: '/foundry/pricing/' },
  { label: 'Request a Demo', href: '/contact/?interest=Foundry' },
];

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div>
            <div className="text-white font-bold text-xl tracking-tight mb-4">RevenuePoint</div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Full-service technology and intelligence partner for mid-market businesses.
            </p>
            <address className="text-sm text-gray-400 not-italic leading-relaxed space-y-1">
              <p>200 Vesey Street, 24th Floor</p>
              <p>New York, NY 10281</p>
              <p className="mt-3">
                <a href="tel:+13329001150" className="hover:text-white transition-colors">
                  +1 (332) 900-1150
                </a>
              </p>
              <p>
                <a href="mailto:hello@revenuepoint.com" className="hover:text-white transition-colors">
                  hello@revenuepoint.com
                </a>
              </p>
            </address>
          </div>

          {/* Salesforce */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Salesforce</h3>
            <ul className="space-y-2.5">
              {sfLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* SAP */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">SAP</h3>
            <ul className="space-y-2.5">
              {sapLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Foundry */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-4">Foundry</h3>
            <ul className="space-y-2.5">
              {foundryLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} RevenuePoint Inc.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy/" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/legal/terms/" className="hover:text-white transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
