type IndustryCardProps = {
  name: string;
  items: string[];
};

export function IndustryCard({ name, items }: IndustryCardProps) {
  return (
    <div className="bg-white border border-border rounded-sm shadow-sm overflow-hidden">
      <div className="bg-navy px-6 py-4 border-t-[6px] border-t-crimson">
        <h3 className="text-white font-semibold">{name}</h3>
      </div>
      <ul className="p-6 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="text-sm text-bodyText leading-relaxed flex gap-2">
            <span className="text-crimson mt-0.5 shrink-0">&bull;</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
