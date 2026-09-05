import { memo } from "react";

const ACCENTS = {
  balance: {
    bar: "bg-[var(--color-accent)]",
    iconWrap: "bg-[var(--color-accent)]/10",
    iconColor: "text-[var(--color-accent)]",
  },
  income: {
    bar: "bg-[var(--color-primary)]",
    iconWrap: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary-dark)]",
  },
  expense: {
    bar: "bg-[var(--color-danger)]",
    iconWrap: "bg-[var(--color-danger)]/10",
    iconColor: "text-[var(--color-danger)]",
  },
  count: {
    bar: "bg-[var(--color-ink)]",
    iconWrap: "bg-[var(--color-ink)]/10",
    iconColor: "text-[var(--color-ink)]",
  },
};

function SummaryStatCard({ icon: Icon, label, value, hint, accent = "balance", style }) {
  const styles = ACCENTS[accent] ?? ACCENTS.balance;

  return (
    <div
      style={style}
      className="group relative animate-[fadeIn_0.5s_var(--ease-premium)_backwards] overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${styles.bar}`} aria-hidden="true" />

      <div className="relative flex items-start justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
            {label}
          </p>
          <p className="mt-2 truncate font-display font-mono-tabular text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-[28px]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap} transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`h-5 w-5 ${styles.iconColor}`} strokeWidth={2} />
        </div>
      </div>

      {hint && (
        <p className="relative mt-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">{hint}</p>
      )}
    </div>
  );
}

export default memo(SummaryStatCard);
