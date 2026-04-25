export type NavLink = {
  label: string;
  href: string;
};

export type NavGroup = {
  heading: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  badge?: string;
  children?: NavLink[];
  groups?: NavGroup[];
};

export const navItems: NavItem[] = [
  {
    label: 'Services',
    href: '/salesforce/',
    groups: [
      {
        heading: 'Salesforce',
        links: [
          { label: 'Consulting', href: '/salesforce/' },
          { label: 'Implementations', href: '/salesforce/implementations/' },
          { label: 'Health Check', href: '/salesforce/health-check/' },
          { label: 'Training', href: '/salesforce/training/' },
        ],
      },
      {
        heading: 'Managed Services',
        links: [
          { label: 'Salesforce Managed', href: '/salesforce/managed-services/' },
          { label: 'SAP Managed', href: '/sap/' },
        ],
      },
    ],
  },
  {
    label: 'Solutions',
    href: '/solutions/',
    children: [
      { label: 'Manufacturing', href: '/solutions/manufacturing/' },
      { label: 'Specialty Pharmacy & Compounding', href: '/solutions/pharmacy/' },
      { label: 'Distribution & 3PL', href: '/solutions/distribution/' },
      { label: 'Nonprofit & Social Services', href: '/solutions/nonprofit/' },
      { label: 'Healthcare & Ambulatory Care', href: '/solutions/healthcare/' },
      { label: 'Property Management & Real Estate', href: '/solutions/property-management/' },
      { label: 'Professional Services', href: '/solutions/professional-services/' },
      { label: 'Financial Services', href: '/solutions/financial-services/' },
      { label: 'Food & Beverage', href: '/solutions/food-beverage/' },
      { label: 'Construction & Contracting', href: '/solutions/construction/' },
    ],
  },
  {
    label: 'Foundry',
    href: '/foundry/',
    badge: 'NEW',
    children: [
      { label: 'Platform Overview', href: '/foundry/' },
      { label: 'Pricing', href: '/foundry/pricing/' },
      { label: 'Request a Demo', href: '/contact/?interest=Foundry' },
    ],
  },
  {
    label: 'Gateway',
    href: '/gateway/',
    badge: 'NEW',
    children: [
      { label: 'Platform Overview', href: '/gateway/' },
      { label: 'Use Cases', href: '/gateway/use-cases/' },
      { label: 'Connectors', href: '/gateway/connectors/' },
      { label: 'Pricing', href: '/gateway/pricing/' },
      { label: 'Request a Demo', href: '/contact/?interest=Gateway' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights/',
  },
  {
    label: 'Contact',
    href: '/contact/',
  },
];
