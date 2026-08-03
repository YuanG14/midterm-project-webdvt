import { memo } from "react";

const ACCENTS = {
  balance: {
    gradient: "from-[var(--color-accent)] to-[var(--color-accent)]/60",
    iconWrap: "bg-[var(--color-accent)]/10",
    iconColor: "text-[var(--color-accent)]",
    glow: "from-[var(--color-accent)]/20",
  },
  income: {
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-dark)]",
    iconWrap: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary-dark)]",
    glow: "from-[var(--color-primary)]/20",
  },
  expense: {
    gradient: "from-[var(--color-danger)] to-[var(--color-danger)]/70",
    iconWrap: "bg-[var(--color-danger)]/10",
    iconColor: "text-[var(--color-danger)]",
    glow: "from-[var(--color-danger)]/20",
  },
};

/**
 * Dashboard-only financial stat card. A richer, more "hero" take on the
 * shared SummaryCard (used on the Summary page) — kept as its own
 * component so this redesign doesn't change Summary's look.
 */
function FinancialCard({ icon: Icon, label, value, hint, accent = "balance" }) {
  const styles = ACCENTS[accent] ?? ACCENTS.balance;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]">
      <div
        className={`pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${styles.glow} to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-90`}
        aria-hidden="true"
      />
      <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.gradient} opacity-80`} aria-hidden="true" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">{label}</p>
          <p className="mt-2 font-display font-mono-tabular text-[26px] font-bold tracking-tight text-[var(--color-ink)] sm:text-[30px]">
            {value}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-5 w-5 ${styles.iconColor}`} strokeWidth={2} />
        </div>
      </div>

      {hint && <p className="relative mt-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">{hint}</p>}
    </div>
  );
}

// Memoized: Dashboard re-renders these 3 cards whenever filter state
// changes, even though balance/income/expense values are unaffected by
// category or type filters.
export default memo(FinancialCard);
