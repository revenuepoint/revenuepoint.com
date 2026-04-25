export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded border border-border bg-offWhite text-mutedText">
      {label}
    </span>
  );
}
