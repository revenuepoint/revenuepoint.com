import type { Metadata } from 'next';
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
