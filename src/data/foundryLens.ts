export type LensView = 'dashboard' | 'report' | 'metric-tree' | 'map';

export type LensItem = {
  id: LensView;
  name: string;
  tagline: string;
  description: string;
};

export const lensItems: LensItem[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    tagline: 'KPIs at a glance',
    description: 'Cards, sparklines, charts — the daily briefing for operations.',
  },
  {
    id: 'report',
    name: 'Report',
    tagline: 'AI-generated, narrative',
    description: 'Prism writes long-form analysis from warehouse data — delivered as PDF.',
  },
  {
    id: 'metric-tree',
    name: 'Metric Tree',
    tagline: 'Business logic, visible',
    description: 'Revenue ← Orders × AOV ← Production Throughput ← OEE. See the chain.',
  },
  {
    id: 'map',
    name: 'Map',
    tagline: 'Locations, in 3D',
    description: 'Customers, routes, and locations on a dark 3D base map.',
  },
];
