type IndustryCardProps = {
  name: string;
  items: string[];
};

export function IndustryCard({ name, items }: IndustryCardProps) {
  return (
    <article className="relative bg-cream border border-ruleSoft flex flex-col">
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
      <div className="px-6 pt-6 pb-3 border-b border-ruleSoft">
        <h3 className="font-serif italic text-[1.25rem] text-ink">{name}</h3>
      </div>
      <ul className="p-6 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-ink leading-relaxed flex gap-3">
            <span className="text-crimson font-mono shrink-0" aria-hidden="true">→</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
