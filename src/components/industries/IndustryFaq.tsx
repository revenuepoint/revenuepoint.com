import { FAQAccordion } from '@/components/ui/FAQAccordion';
import type { FaqItem } from '@/types/industry';

export function IndustryFaq({ faqs }: { faqs: FaqItem[] }) {
  return (
    <section className="bg-offWhite border-t border-border">
      <div className="max-w-3xl mx-auto px-4 py-16 lg:py-20">
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-widest text-crimson mb-4">
            Common questions
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-navy">Before you book a session.</h2>
        </div>
        <FAQAccordion items={faqs.map((f) => ({ question: f.question, answer: f.answer }))} />
      </div>
    </section>
  );
}
