'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import Link from 'next/link';
import type { ConsultingProduct } from '@/data/salesforceConsulting';

type SalesforceProductPickerProps = {
  products: ConsultingProduct[];
};

export function SalesforceProductPicker({ products }: SalesforceProductPickerProps) {
  const [activeId, setActiveId] = useState(products[0]?.id ?? '');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = products.find((p) => p.id === activeId) ?? products[0];

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') {
      return;
    }
    event.preventDefault();
    const delta = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : -1;
    const next = (index + delta + products.length) % products.length;
    const nextProduct = products[next];
    setActiveId(nextProduct.id);
    tabRefs.current[next]?.focus();
  };

  if (!active) return null;

  return (
    <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Salesforce products"
        className="flex flex-wrap gap-2 lg:flex-col lg:gap-2"
      >
        {products.map((product, index) => {
          const isActive = product.id === activeId;
          return (
            <button
              key={product.id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`product-panel-${product.id}`}
              id={`product-tab-${product.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(product.id)}
              onKeyDown={(e) => handleKey(e, index)}
              className={`group flex items-stretch text-left rounded-sm shadow-sm border transition-colors ${
                isActive
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy border-rule hover:border-navySoft'
              }`}
            >
              <span
                className={`w-1 shrink-0 rounded-l-sm ${
                  isActive ? 'bg-navySoft' : 'bg-navySoft/30 group-hover:bg-navySoft'
                }`}
                aria-hidden="true"
              />
              <span className="px-4 py-3 text-sm font-semibold whitespace-nowrap lg:whitespace-normal">
                {product.name}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`product-panel-${active.id}`}
        aria-labelledby={`product-tab-${active.id}`}
        className="mt-6 lg:mt-0 bg-white border border-rule rounded-sm shadow-sm p-6 lg:p-8 flex flex-col"
      >
        <h3 className="text-2xl font-semibold text-navy">{active.name}</h3>
        <p className="mt-4 text-base text-ink leading-relaxed">{active.overview}</p>

        <div className="mt-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-navySoft mb-3">
            What we do with it
          </p>
          <ul className="space-y-2.5">
            {active.whatWeDo.map((item) => (
              <li key={item} className="text-sm text-ink leading-relaxed flex gap-2">
                <span className="text-navySoft mt-0.5 shrink-0" aria-hidden="true">
                  &bull;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="#lead-form"
          className="mt-8 text-sm font-semibold text-crimson hover:text-crimsonDeep transition-colors inline-flex items-center gap-1 self-start"
        >
          Schedule a Salesforce scoping call <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </div>
  );
}
