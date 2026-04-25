'use client';

import { useEffect } from 'react';
import { track, events } from '@/lib/analytics';

export function ThankYouTracker() {
  useEffect(() => {
    track(events.lead_form_completed, {
      page: typeof window !== 'undefined' ? window.location.pathname : '/thank-you/',
    });
  }, []);
  return null;
}
