import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Fraunces, JetBrains_Mono } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_URL = 'https://revenuepoint.com';
const DEFAULT_TITLE = 'RevenuePoint — CRM + ERP + Agentic Orchestration';
const DEFAULT_DESCRIPTION =
  'Your operating systems, fully managed. Five platforms — CRM, ERP, data and AI, customer portals, AI research — implementation, management, and intelligence end-to-end.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | RevenuePoint',
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    siteName: 'RevenuePoint',
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'RevenuePoint — CRM + ERP + Agentic Orchestration',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F4EFE6' },
    { media: '(prefers-color-scheme: dark)', color: '#1A1612' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-paper text-ink antialiased font-sans">
        <Navbar />
        <main className="pt-[63px] lg:pt-[75px]">{children}</main>
        <Footer />
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
