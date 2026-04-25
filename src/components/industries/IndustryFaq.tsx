import { FAQAccordion } from '@/components/ui/FAQAccordion';
import type { FaqItem } from '@/types/industry';

export function IndustryFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="bg-cream border-t border-rule">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-section">
        <div className="mb-10">
          <p className="eyebrow mb-4">Common questions</p>
          <h2 className="text-d2 font-serif font-medium text-ink">
            Before you book a <em>session</em>.
          </h2>
        </div>
        <FAQAccordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      </div>
    </section>
  );
}
