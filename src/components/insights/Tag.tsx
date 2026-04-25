export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 border border-rule bg-cream text-mute">
      {label}
    </span>
  );
}
