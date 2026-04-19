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
        heading: 'Managed Services',
        links: [
          { label: 'Salesforce Managed Services', href: '/salesforce/' },
          { label: 'SAP Managed Services', href: '/sap/' },
        ],
      },
      {
        heading: 'Salesforce Managed Services',
        links: [
          { label: 'Consulting', href: '/salesforce/consulting/' },
          { label: 'Health Check', href: '/salesforce/health-check/' },
          { label: 'Training', href: '/salesforce/training/' },
          { label: 'Pricing', href: '/salesforce/pricing/' },
        ],
      },
      {
        heading: 'SAP Managed Services',
        links: [
          { label: 'Overview', href: '/sap/' },
          { label: 'Pricing', href: '/sap/pricing/' },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/industries/',
    children: [
      { label: 'Manufacturing', href: '/industries/manufacturing/' },
      { label: 'Specialty Pharmacy & Compounding', href: '/industries/pharmacy/' },
      { label: 'Distribution & 3PL', href: '/industries/distribution/' },
      { label: 'Nonprofit & Social Services', href: '/industries/nonprofit/' },
      { label: 'Healthcare & Ambulatory Care', href: '/industries/healthcare/' },
      { label: 'Property Management & Real Estate', href: '/industries/property-management/' },
      { label: 'Professional Services', href: '/industries/professional-services/' },
      { label: 'Financial Services', href: '/industries/financial-services/' },
      { label: 'Food & Beverage', href: '/industries/food-beverage/' },
      { label: 'Construction & Contracting', href: '/industries/construction/' },
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
    label: 'Contact',
    href: '/contact/',
  },
];
