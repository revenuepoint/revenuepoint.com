'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-rule">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b border-rule">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex items-center justify-between w-full py-5 text-left gap-6"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-[1.125rem] lg:text-[1.25rem] font-medium text-ink">
                {item.question}
              </span>
              <span
                className={`shrink-0 font-mono text-base text-crimson transition-transform duration-200 ${
                  isOpen ? 'rotate-45' : ''
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="pb-6 text-sm lg:text-base text-inkSoft leading-relaxed max-w-prose">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
