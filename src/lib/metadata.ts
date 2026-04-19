import type { Metadata } from 'next';

const BASE_URL = 'https://revenuepoint.com';

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${BASE_URL}${path}`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'RevenuePoint',
      type: 'website',
    },
    alternates: {
      canonical: url,
    },
  };
}
