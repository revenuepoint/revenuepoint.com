import { CTABanner } from '@/components/ui/CTABanner';

export function PostCTA({
  heading = 'Ready to see Foundry in your stack?',
  body = 'A 30-minute walkthrough, scoped to the systems you already run.',
  ctaLabel = 'Schedule a demo',
  ctaHref = '/contact/?interest=Foundry',
}: {
  heading?: string;
  body?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return <CTABanner heading={heading} body={body} cta={{ label: ctaLabel, href: ctaHref }} />;
}
