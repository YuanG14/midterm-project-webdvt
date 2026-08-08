import { memo } from "react";

const ACCENTS = {
  balance: {
    bar: "bg-[var(--color-primary)]",
    iconWrap: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary-dark)]",
  },
  income: {
    bar: "bg-[var(--color-income)]",
    iconWrap: "bg-[var(--color-income)]/10",
    iconColor: "text-[var(--color-income-dark)]",
  },
  expense: {
    bar: "bg-[var(--color-danger)]",
    iconWrap: "bg-[var(--color-danger)]/10",
    iconColor: "text-[var(--color-danger)]",
  },
};

/**
 * Dashboard-only financial stat card. A richer take on the shared
 * SummaryCard (used on the Summary page) — kept as its own component so
 * this redesign doesn't change Summary's look.
 *
 * `hero` is used for the wider Current Balance tile in the bento grid —
 * it only affects width via `className`; padding/type match the compact
 * cards so all three tiles stay aligned on the same grid lines.
 */
function FinancialCard({ icon: Icon, label, value, hint, accent = "balance", hero = false, style, className = "" }) {
  const styles = ACCENTS[accent] ?? ACCENTS.balance;

  return (
    <div
      style={style}
      className={`group relative flex h-full animate-[fadeIn_0.5s_var(--ease-premium)_backwards] flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <div className={`absolute inset-x-0 top-0 h-1 ${styles.bar}`} aria-hidden="true" />

      <div className="relative flex items-start justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">{label}</p>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap} transition-transform duration-300 group-hover:scale-105`}
        >
          <Icon className={`h-[18px] w-[18px] ${styles.iconColor}`} strokeWidth={2} />
        </div>
      </div>

      <div className="relative mt-3 min-w-0">
        <p className="truncate font-display font-mono-tabular font-bold tracking-tight text-[var(--color-ink)] text-[24px] sm:text-[26px] lg:text-[30px]">
          {value}
        </p>
        {hint && <p className="mt-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">{hint}</p>}
      </div>
    </div>
  );
}

// Memoized: Dashboard re-renders these 3 cards whenever filter state
// changes, even though balance/income/expense values are unaffected by
// category or type filters.
export default memo(FinancialCard);
