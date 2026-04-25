import type { RecordPageComponentBody, StatusTone } from '@/types/industry';

type Variant = 'editorial' | 'salesforce';

/* ----- Tone palettes ----------------------------------------------------- */

function toneTextEditorial(tone?: StatusTone): string {
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

function toneTextSalesforce(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'text-[#2E844A]';
    case 'at-risk':
      return 'text-[#FE9339]';
    case 'off-track':
      return 'text-[#C23934]';
    default:
      return 'text-[#181818]';
  }
}

function toneText(variant: Variant, tone?: StatusTone): string {
  return variant === 'salesforce' ? toneTextSalesforce(tone) : toneTextEditorial(tone);
}

function toneBarEditorial(tone?: StatusTone): string {
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

function toneBarSalesforce(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'bg-[#2E844A]';
    case 'at-risk':
      return 'bg-[#FE9339]';
    case 'off-track':
      return 'bg-[#C23934]';
    default:
      return 'bg-[#0070D2]';
  }
}

function toneBar(variant: Variant, tone?: StatusTone): string {
  return variant === 'salesforce' ? toneBarSalesforce(tone) : toneBarEditorial(tone);
}

function toneDotEditorial(tone?: StatusTone): string {
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

function toneDotSalesforce(tone?: StatusTone): string {
  switch (tone) {
    case 'on-track':
      return 'bg-[#2E844A]';
    case 'at-risk':
      return 'bg-[#FE9339]';
    case 'off-track':
      return 'bg-[#C23934]';
    default:
      return 'bg-[#747474]';
  }
}

function toneDot(variant: Variant, tone?: StatusTone): string {
  return variant === 'salesforce' ? toneDotSalesforce(tone) : toneDotEditorial(tone);
}

/* ----- Surface tokens ---------------------------------------------------- */

const PALETTE: Record<
  Variant,
  {
    cardBg: string;
    cardBorder: string;
    trackBg: string;
    thBg: string;
    rowAltBg: string;
    rowHover: string;
    labelColor: string;
    labelMicro: string;
    primaryText: string;
    bodyText: string;
  }
> = {
  editorial: {
    cardBg: 'bg-white',
    cardBorder: 'border-rule',
    trackBg: 'bg-bone',
    thBg: 'bg-cream',
    rowAltBg: '',
    rowHover: '',
    labelColor: 'text-mute',
    labelMicro: 'text-[10px] uppercase tracking-widest text-mute font-semibold',
    primaryText: 'text-navy',
    bodyText: 'text-ink',
  },
  salesforce: {
    cardBg: 'bg-white',
    cardBorder: 'border-[#DDDBDA]',
    trackBg: 'bg-[#ECEBEA]',
    thBg: 'bg-[#FAFAF9]',
    rowAltBg: 'odd:bg-white even:bg-[#FAFAF9]',
    rowHover: 'hover:bg-[#F3F3F3]',
    labelColor: 'text-[#514F4D]',
    labelMicro: 'text-[10px] uppercase tracking-wider text-[#514F4D] font-semibold',
    primaryText: 'text-[#181818]',
    bodyText: 'text-[#181818]',
  },
};

/* ----- ComponentBody ----------------------------------------------------- */

export function ComponentBody({
  body,
  variant = 'editorial',
}: {
  body: RecordPageComponentBody;
  variant?: Variant;
}) {
  const p = PALETTE[variant];

  if (body.kind === 'kpi-tiles') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {body.tiles.map((t) => (
          <div key={t.label} className={`border ${p.cardBorder} rounded-md ${p.cardBg} p-3`}>
            <div className={p.labelMicro}>{t.label}</div>
            <div className={`mt-1 text-lg font-bold ${toneText(variant, t.deltaTone)}`}>
              {t.value}
            </div>
            {t.delta && (
              <div className={`text-xs mt-0.5 ${toneText(variant, t.deltaTone)}`}>{t.delta}</div>
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
              <span className={`font-medium ${p.primaryText}`}>{r.label}</span>
              <span className={`font-semibold ${toneText(variant, r.tone)}`}>{r.valueLabel}</span>
            </div>
            <div className={`h-2 ${p.trackBg} rounded-full overflow-hidden`}>
              <div
                className={`h-full ${toneBar(variant, r.tone)} rounded-full`}
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
      <div className={`overflow-hidden rounded-md border ${p.cardBorder}`}>
        <table className="w-full text-xs">
          <thead className={p.thBg}>
            <tr>
              {body.headers.map((h) => (
                <th key={h} className={`text-left px-3 py-2 ${p.labelMicro}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.rows.map((r, i) => (
              <tr
                key={i}
                className={`border-t ${p.cardBorder} ${variant === 'salesforce' ? p.rowAltBg : ''} ${p.rowHover}`}
              >
                {r.cells.map((c, j) => (
                  <td
                    key={j}
                    className={`px-3 py-2 ${
                      j === 0 ? `font-medium ${p.primaryText}` : p.bodyText
                    } ${
                      j === r.cells.length - 1 ? toneText(variant, r.tone) + ' font-semibold' : ''
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
            <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${toneDot(variant, e.tone)}`} />
            <div className="min-w-0 flex-1">
              <div className={`font-semibold ${toneText(variant, e.tone)}`}>{e.label}</div>
              <div className={p.labelColor}>{e.sub}</div>
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
            <dt className={p.labelMicro}>{f.label}</dt>
            <dd className={`mt-0.5 font-semibold ${toneText(variant, f.tone)}`}>{f.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
}
