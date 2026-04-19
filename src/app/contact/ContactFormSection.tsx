'use client';

import { useSearchParams } from 'next/navigation';
import { LeadForm } from '@/components/ui/LeadForm';

export function ContactFormSection() {
  const searchParams = useSearchParams();
  const interest = searchParams.get('interest') || 'General';

  return <LeadForm interest={interest} />;
}
