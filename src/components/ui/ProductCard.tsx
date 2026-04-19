type ProductCardProps = {
  name: string;
  description: string;
};

export function ProductCard({ name, description }: ProductCardProps) {
  return (
    <div className="bg-white border border-border rounded-sm shadow-sm flex">
      <div className="w-1 bg-crimson rounded-l-sm shrink-0" />
      <div className="p-6">
        <h3 className="text-lg font-semibold text-navy mb-2">{name}</h3>
        <p className="text-sm text-bodyText leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
