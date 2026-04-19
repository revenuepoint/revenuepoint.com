import type { Metadata } from 'next';
import Script from 'next/script';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RevenuePoint — Salesforce, SAP & Foundry for Mid-Market Business',
    template: '%s | RevenuePoint',
  },
  description:
    'Salesforce, SAP, and Foundry data platform — implemented and managed for mid-market businesses. White-glove service. No long-term contracts.',
  openGraph: {
    siteName: 'RevenuePoint',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-bodyText antialiased">
        <Navbar />
        <main className="pt-[63px] lg:pt-[75px]">{children}</main>
        <Footer />
        <Script
          src="https://www.google.com/recaptcha/api.js"
          strategy="lazyOnload"
        />
        {/* Analytics — uncomment one:
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}</Script>
        */}
      </body>
    </html>
  );
}
