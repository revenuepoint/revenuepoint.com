const rows = [
  { score: 5, label: 'Optimized', desc: 'Industry-leading, automated, continuously improved' },
  { score: 4, label: 'Managed', desc: 'Documented, measured, proactively governed' },
  { score: 3, label: 'Defined', desc: 'Standardized but reactive' },
  { score: 2, label: 'Repeatable', desc: 'Inconsistent; tribal knowledge' },
  { score: 1, label: 'Ad hoc', desc: 'No process; high risk' },
];

export function RubricTable() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        Maturity rubric
      </div>
      <table className="mt-3 w-full text-xs">
        <tbody>
          {rows.map((r) => (
            <tr key={r.score} className="border-b border-rule last:border-b-0">
              <td className="py-2 w-6">
                <span className="inline-flex w-5 h-5 rounded-full bg-navy text-white text-[10px] font-bold items-center justify-center">
                  {r.score}
                </span>
              </td>
              <td className="py-2 font-semibold text-navy whitespace-nowrap pr-3">{r.label}</td>
              <td className="py-2 text-ink">{r.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-3 text-[10px] uppercase tracking-widest">
        <span className="inline-flex items-center gap-1.5 text-rust">
          <span className="w-2 h-2 rounded-full bg-rust" /> Critical
        </span>
        <span className="inline-flex items-center gap-1.5 text-amber">
          <span className="w-2 h-2 rounded-full bg-amber" /> Material
        </span>
        <span className="inline-flex items-center gap-1.5 text-navy">
          <span className="w-2 h-2 rounded-full bg-navy" /> Advisory
        </span>
      </div>
    </div>
  );
}
