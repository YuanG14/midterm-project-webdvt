import { memo } from "react";
function InsightCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 transition-colors duration-200 hover:border-[var(--color-primary)]/30">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-canvas)]">
        <Icon className="h-4 w-4 text-[var(--color-ink-soft)]" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
          {label}
        </p>
        <p className="mt-0.5 truncate font-display text-[14.5px] font-semibold text-[var(--color-ink)]">
          {value}
        </p>
        {hint && <p className="mt-0.5 text-[12px] text-[var(--color-ink-soft)]">{hint}</p>}
      </div>
    </div>
  );
}

// Memoized: multiple InsightCard instances render per Summary render; their
// props are stable across unrelated Summary re-renders (e.g. theme toggle).
export default memo(InsightCard);
