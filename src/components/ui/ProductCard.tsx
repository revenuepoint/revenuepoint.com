type ProductCardProps = {
  name: string;
  description: string;
};

export function ProductCard({ name, description }: ProductCardProps) {
  return (
    <article className="relative bg-cream border border-ruleSoft p-6 lg:p-8">
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-full bg-rule" />
      <span aria-hidden="true" className="absolute left-0 top-0 h-px w-8 bg-crimson" />
      <h3 className="mt-3 font-serif text-[1.25rem] font-medium text-ink">{name}</h3>
      <p className="mt-3 text-sm text-inkSoft leading-relaxed">{description}</p>
    </article>
  );
}
