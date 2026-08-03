import { memo } from "react";

const ACCENTS = {
  balance: {
    gradient: "from-[var(--color-accent)] to-[var(--color-accent)]/60",
    iconWrap: "bg-[var(--color-accent)]/10",
    iconColor: "text-[var(--color-accent)]",
    glow: "from-[var(--color-accent)]/15",
  },
  income: {
    gradient: "from-[var(--color-primary)] to-[var(--color-primary-dark)]",
    iconWrap: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary-dark)]",
    glow: "from-[var(--color-primary)]/15",
  },
  expense: {
    gradient: "from-[var(--color-danger)] to-[var(--color-danger)]/70",
    iconWrap: "bg-[var(--color-danger)]/10",
    iconColor: "text-[var(--color-danger)]",
    glow: "from-[var(--color-danger)]/15",
  },
  count: {
    gradient: "from-[var(--color-ink)] to-[var(--color-ink)]/50",
    iconWrap: "bg-[var(--color-ink)]/10",
    iconColor: "text-[var(--color-ink)]",
    glow: "from-[var(--color-ink)]/10",
  },
};

/**
 * Premium Summary-only stat card (balance / income / expenses / transaction
 * count). Displays exactly the value/hint it's given — no calculations
 * happen here, only presentation.
 */
function SummaryStatCard({ icon: Icon, label, value, hint, accent = "balance", style }) {
  const styles = ACCENTS[accent] ?? ACCENTS.balance;

  return (
    <div
      style={style}
      className="group relative animate-[fadeIn_0.5s_var(--ease-premium)_backwards] overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card-hover)]"
    >
      <div
        className={`pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-gradient-to-br ${styles.glow} to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-90`}
        aria-hidden="true"
      />
      <div
        className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${styles.gradient} opacity-80`}
        aria-hidden="true"
      />

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
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap} transition-transform duration-300 group-hover:scale-110`}
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

// Memoized: Summary re-renders on every theme toggle even though card
// data (label/value/hint/accent) is unaffected by the theme.
export default memo(SummaryStatCard);
