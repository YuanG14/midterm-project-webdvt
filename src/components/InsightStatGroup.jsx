import { memo } from "react";

const TONES = {
  neutral: "bg-[var(--color-canvas)] text-[var(--color-ink-soft)]",
  success: "bg-[var(--color-income)]/10 text-[var(--color-income-dark)]",
  danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
};

/**
 * One quiet row inside an InsightStatGroup. `layout="inline"` renders a
 * single line ("2 Income") for simple counts; `layout="stacked"` renders
 * a label above a dominant amount, for averages/totals.
 */
function StatRow({ icon: Icon, tone = "neutral", label, value, hint, layout = "inline" }) {
  const toneClass = TONES[tone] ?? TONES.neutral;

  return (
    <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneClass}`}>
        <Icon className="h-[15px] w-[15px]" strokeWidth={2.25} />
      </span>

      {layout === "inline" ? (
        <p className="min-w-0 truncate text-[13.5px] text-[var(--color-ink)]">
          <span className="font-mono-tabular font-bold">{value}</span> <span className="text-[var(--color-ink-soft)]">{label}</span>
        </p>
      ) : (
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12.5px] text-[var(--color-ink-soft)]">{label}</p>
          <p className="mt-0.5 truncate font-mono-tabular text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
            {value}
          </p>
        </div>
      )}

      {hint && <p className="ml-auto shrink-0 text-[12px] text-[var(--color-ink-soft)]">{hint}</p>}
    </div>
  );
}

/**
 * Secondary insight surface for the Summary page's "Recent Insights"
 * section — groups related lower-signal stats (transaction counts,
 * averages) under one titled card with quiet, divided rows instead of
 * giving each its own identical outlined tile.
 */
function InsightStatGroup({ icon: Icon, title, rows, style }) {
  return (
    <div
      style={style}
      className="flex animate-[fadeIn_0.4s_var(--ease-premium)_backwards] flex-col rounded-[var(--radius-card-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5"
    >
      <div className="mb-1 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-ink)]/[0.06]">
          <Icon className="h-3.5 w-3.5 text-[var(--color-ink-soft)]" strokeWidth={2.25} />
        </span>
        <p className="text-[13px] font-semibold text-[var(--color-ink)]">{title}</p>
      </div>

      <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
        {rows.map((row) => (
          <StatRow key={row.label} {...row} />
        ))}
      </div>
    </div>
  );
}

export default memo(InsightStatGroup);
