'use client';

import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { IndustryTabs } from '@/components/foundry/IndustryTabs';
import { IndustryIntro } from '@/components/foundry/IndustryIntro';

/**
 * Renders the top of the industry-aware region:
 *   - non-sticky eyebrow + heading
 *   - sticky tabs bar (stays pinned while the parent industry-aware wrapper is in view)
 *   - in-module intro content (cross-fades on industry change)
 *
 * This component does NOT contain the downstream sections — it lives at the
 * top of the <IndustryProvider> wrapper in page.tsx. The sticky behavior
 * extends through all sibling sections inside the same parent <div>.
 */
export function IndustrySwitcher() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    // Navbar is ~75px tall; sentinel is considered "past" when it leaves the area below the navbar.
    const obs = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-75px 0px 0px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Eyebrow + heading (scrolls away normally) */}
      <section className="bg-offWhite pt-16 pb-6 lg:pt-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader
            eyebrow="INDUSTRY"
            heading="Built for your industry."
            body="Foundry is built around your business objects and workflows — not a generic data model. Select your industry to see how it operates in your world."
            align="center"
          />
        </div>
      </section>

      {/* Sentinel — when it leaves the viewport, the sticky bar is "stuck" */}
      <div ref={sentinelRef} aria-hidden="true" style={{ height: 1 }} />

      {/* Sticky tab bar — pins below the fixed Navbar (63px mobile, 75px desktop) */}
      <div
        className={`sticky top-[63px] lg:top-[75px] z-30 bg-offWhite/95 backdrop-blur border-y border-border transition-shadow ${
          isStuck ? 'shadow-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <IndustryTabs />
        </div>
      </div>

      {/* Intro content (in-module, changes per industry) */}
      <section className="bg-offWhite pt-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4">
          <IndustryIntro />
        </div>
      </section>
    </>
  );
}
