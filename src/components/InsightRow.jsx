import { memo } from "react";

const TONES = {
  neutral: "bg-[var(--color-surface-sunken)] text-[var(--color-ink-soft)]",
  primary: "bg-[var(--color-success)]/10 text-[var(--color-success-dark)]",
  danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
};

function InsightRow({ icon: Icon, label, value, hint, tone = "neutral" }) {
  const toneClass = TONES[tone] ?? TONES.neutral;

  return (
    <div className="data-row flex-wrap">
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${toneClass}`}>
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>

      <p className="min-w-0 flex-1 truncate text-[13.5px] text-[var(--color-ink-soft)]">{label}</p>

      <div className="w-full pl-12 text-left sm:w-auto sm:pl-0 sm:text-right">
        <p className="truncate font-mono-tabular text-[14px] font-semibold text-[var(--color-ink)]">{value}</p>
        {hint && <p className="mt-0.5 truncate text-[12px] text-[var(--color-ink-soft)]">{hint}</p>}
      </div>
    </div>
  );
}

export default memo(InsightRow);
