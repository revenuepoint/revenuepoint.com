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
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                className={`text-left py-3 px-4 font-semibold ${
                  i === 0
                    ? 'sticky left-0 bg-offWhite z-10 text-navy'
                    : i === highlightCol
                    ? 'bg-crimson text-white'
                    : 'bg-navy text-white'
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
              className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-lightGray'}
            >
              <td className="py-3 px-4 font-medium text-navy sticky left-0 bg-inherit z-10 border-r border-border">
                {row.label}
              </td>
              {row.cells.map((cell, i) => (
                <td key={i} className="py-3 px-4 text-center">
                  {cell === 'check' ? (
                    <svg
                      className="w-5 h-5 text-green mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : cell === 'cross' ? (
                    <svg
                      className="w-5 h-5 text-red mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <span className="text-bodyText">{cell}</span>
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
