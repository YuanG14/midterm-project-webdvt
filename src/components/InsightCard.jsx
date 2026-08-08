import { memo } from "react";

const TONES = {
  neutral: "bg-[var(--color-canvas)] text-[var(--color-ink-soft)]",
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]",
  success: "bg-[var(--color-income)]/10 text-[var(--color-income-dark)]",
  danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
};

function InsightCard({ icon: Icon, label, value, hint, tone = "neutral" }) {
  const toneClass = TONES[tone] ?? TONES.neutral;

  return (
    <div className="group flex items-start gap-3 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card)]">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105 ${toneClass}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2} />
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
