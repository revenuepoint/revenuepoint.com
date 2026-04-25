import type { RecordPageComponentBody, StatusTone } from '@/types/industry';

function toneClasses(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'text-navy';
    case 'at-risk':
      return 'text-amber';
    case 'off-track':
      return 'text-rust';
    default:
      return 'text-navy';
  }
}

function toneDot(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'bg-navy';
    case 'at-risk':
      return 'bg-amber';
    case 'off-track':
      return 'bg-rust';
    default:
      return 'bg-mute';
  }
}

function toneBar(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'bg-navy';
    case 'at-risk':
      return 'bg-amber';
    case 'off-track':
      return 'bg-rust';
    default:
      return 'bg-navy';
  }
}

export function ComponentBody({ body }: { body: RecordPageComponentBody }) {
  if (body.kind === 'kpi-tiles') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {body.tiles.map((t) => (
          <div key={t.label} className="border border-rule rounded-md bg-white p-3">
            <div className="text-[10px] uppercase tracking-widest text-mute">{t.label}</div>
            <div className={`mt-1 text-lg font-bold ${toneClasses(t.deltaTone)}`}>{t.value}</div>
            {t.delta && (
              <div className={`text-xs mt-0.5 ${toneClasses(t.deltaTone)}`}>{t.delta}</div>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (body.kind === 'bar-rows') {
    const max = Math.max(...body.rows.map((r) => r.value), 1);
    return (
      <div className="space-y-2.5">
        {body.rows.map((r) => (
          <div key={r.label} className="text-xs">
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-medium text-navy">{r.label}</span>
              <span className={`font-semibold ${toneClasses(r.tone)}`}>{r.valueLabel}</span>
            </div>
            <div className="h-2 bg-bone rounded-full overflow-hidden">
              <div
                className={`h-full ${toneBar(r.tone)} rounded-full`}
                style={{ width: `${Math.min(100, (r.value / max) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (body.kind === 'table') {
    return (
      <div className="overflow-hidden rounded-md border border-rule">
        <table className="w-full text-xs">
          <thead className="bg-cream">
            <tr>
              {body.headers.map((h) => (
                <th
                  key={h}
                  className="text-left px-3 py-2 text-[10px] uppercase tracking-widest text-mute font-semibold"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.rows.map((r, i) => (
              <tr key={i} className="border-t border-rule">
                {r.cells.map((c, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 ${j === 0 ? 'font-medium text-navy' : 'text-ink'} ${
                      j === r.cells.length - 1 ? toneClasses(r.tone) + ' font-semibold' : ''
                    }`}
                  >
                    {c}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (body.kind === 'timeline') {
    return (
      <ol className="space-y-3">
        {body.entries.map((e, i) => (
          <li key={i} className="flex items-start gap-3 text-xs">
            <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${toneDot(e.tone)}`} />
            <div className="min-w-0 flex-1">
              <div className={`font-semibold ${toneClasses(e.tone)}`}>{e.label}</div>
              <div className="text-mute">{e.sub}</div>
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (body.kind === 'field-list') {
    return (
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
        {body.fields.map((f) => (
          <div key={f.label}>
            <dt className="text-[10px] uppercase tracking-widest text-mute">{f.label}</dt>
            <dd className={`mt-0.5 font-semibold ${toneClasses(f.tone)}`}>{f.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
}
