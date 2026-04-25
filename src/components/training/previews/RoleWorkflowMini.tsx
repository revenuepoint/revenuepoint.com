const tasks = [
  { time: '8:30', title: 'Review pipeline list view', detail: 'Opps closing this week, by stage' },
  { time: '9:00', title: 'Log calls + meeting notes', detail: 'Activity timeline on Opp + Account' },
  { time: '11:00', title: 'Advance opportunity stages', detail: 'Required-fields check before stage 4' },
  { time: '14:00', title: 'Update forecast category', detail: 'Commit / Best Case / Pipeline' },
];

export function RoleWorkflowMini() {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-mute font-semibold">
        AE · Day-in-the-life
      </div>
      <ol className="mt-3 space-y-2">
        {tasks.map((t) => (
          <li key={t.time} className="flex items-start gap-3">
            <span className="shrink-0 mt-0.5 inline-flex items-center justify-center min-w-[40px] px-1.5 py-0.5 rounded-sm bg-crimsonTint text-crimson text-[10px] font-bold tracking-wide">
              {t.time}
            </span>
            <div className="text-xs">
              <div className="font-semibold text-navy leading-snug">{t.title}</div>
              <div className="mt-0.5 text-[11px] text-ink leading-relaxed">{t.detail}</div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
