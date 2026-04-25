'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { datadogRum } from '@datadog/browser-rum';
import { initObservability } from '@/lib/observability';
import { gtagPageview, GA_ID } from '@/lib/gtag';

export function Telemetry() {
  const pathname = usePathname();
  const initOk = useRef(false);

  useEffect(() => {
    initOk.current = initObservability();
  }, []);

  useEffect(() => {
    if (!pathname) return;
    if (initOk.current) {
      datadogRum.startView({ name: pathname });
    }
    if (GA_ID) {
      gtagPageview(pathname);
    }
  }, [pathname]);

  return null;
}
