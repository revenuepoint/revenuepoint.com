export function CodeBlock({
  language,
  code,
}: {
  language?: string;
  code: string;
}) {
  return (
    <div className="my-8 rounded-md border border-border overflow-hidden bg-navy text-white">
      {language && (
        <div className="px-4 py-1.5 border-b border-white/10 bg-white/5 text-[10px] uppercase tracking-widest text-white/60 font-mono">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
