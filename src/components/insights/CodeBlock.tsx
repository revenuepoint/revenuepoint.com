export function CodeBlock({
  language,
  code,
}: {
  language?: string;
  code: string;
}) {
  return (
    <div className="my-8 border border-rule overflow-hidden bg-ink text-paper">
      {language && (
        <div className="px-4 py-2 border-b border-paper/10 bg-paper/5 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/60">
          {language}
        </div>
      )}
      <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}
