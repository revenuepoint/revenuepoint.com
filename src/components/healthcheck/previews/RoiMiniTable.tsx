'use client';

import { useCrm } from '@/context/CrmContext';
import { healthCheckContent } from '@/data/healthCheckContent';

export function RoiMiniTable() {
  const { crmId } = useCrm();
  const rows = healthCheckContent[crmId].roi;
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mutedText font-semibold">
        Business case · line items
      </div>
      <table className="mt-3 w-full text-xs">
        <thead>
          <tr>
            <th className="text-left text-[10px] uppercase tracking-widest text-mutedText pb-2">
              Lever
            </th>
            <th className="text-right text-[10px] uppercase tracking-widest text-mutedText pb-2">
              Now
            </th>
            <th className="text-right text-[10px] uppercase tracking-widest text-mutedText pb-2">
              Invest
            </th>
            <th className="text-right text-[10px] uppercase tracking-widest text-crimson pb-2">
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-border">
              <td className="py-2 text-navy font-medium leading-snug pr-2">{r.label}</td>
              <td className="py-2 text-right text-red font-semibold whitespace-nowrap">{r.current}</td>
              <td className="py-2 text-right text-bodyText whitespace-nowrap">{r.invest}</td>
              <td className="py-2 text-right text-green font-semibold whitespace-nowrap">{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
