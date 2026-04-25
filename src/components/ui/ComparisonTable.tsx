'use client';

type ComparisonTableProps = {
  headers: string[];
  rows: {
    label: string;
    cells: ('check' | 'cross' | string)[];
  }[];
  highlightCol?: number;
};

export function ComparisonTable({ headers, rows, highlightCol = 0 }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto -mx-4 px-4">
      <table className="w-full min-w-[640px] text-sm border-t-2 border-ink">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                className={`text-left py-4 px-4 align-bottom font-serif font-medium text-base ${
                  i === 0
                    ? 'sticky left-0 bg-paper z-10 text-ink'
                    : i === highlightCol
                    ? 'bg-crimsonTint text-crimson border-x border-crimson'
                    : 'text-ink'
                }`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr
              key={row.label}
              className={`border-b border-rule ${rowIdx % 2 === 0 ? 'bg-paper' : 'bg-cream'}`}
            >
              <td className="py-3 px-4 font-medium text-ink sticky left-0 bg-inherit z-10 border-r border-rule">
                {row.label}
              </td>
              {row.cells.map((cell, i) => (
                <td
                  key={i}
                  className={`py-3 px-4 text-center ${
                    i === highlightCol ? 'bg-crimsonTint border-x border-crimson' : ''
                  }`}
                >
                  {cell === 'check' ? (
                    <span
                      className="font-mono text-crimson font-semibold tabular-nums"
                      aria-label="included"
                    >
                      ✓
                    </span>
                  ) : cell === 'cross' ? (
                    <span
                      className="font-mono text-muteSoft tabular-nums"
                      aria-label="not included"
                    >
                      —
                    </span>
                  ) : (
                    <span className="text-ink">{cell}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
