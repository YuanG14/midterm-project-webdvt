import { memo } from "react";
const ACCENTS = {
  balance: {
    iconWrap: "bg-[var(--color-accent)]/10",
    iconColor: "text-[var(--color-accent)]",
    glow: "from-[var(--color-accent)]/15",
  },
  income: {
    iconWrap: "bg-[var(--color-primary)]/10",
    iconColor: "text-[var(--color-primary-dark)]",
    glow: "from-[var(--color-primary)]/15",
  },
  expense: {
    iconWrap: "bg-[var(--color-danger)]/10",
    iconColor: "text-[var(--color-danger)]",
    glow: "from-[var(--color-danger)]/15",
  },
  count: {
    iconWrap: "bg-[var(--color-ink)]/10",
    iconColor: "text-[var(--color-ink)]",
    glow: "from-[var(--color-ink)]/10",
  },
};

function SummaryCard({ icon: Icon, label, value, hint, accent = "balance" }) {
  const styles = ACCENTS[accent] ?? ACCENTS.balance;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)]">
      <div
        className={`pointer-events-none absolute -right-6 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${styles.glow} to-transparent blur-2xl transition-opacity duration-300 group-hover:opacity-80`}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">
            {label}
          </p>
          <p className="mt-2 font-display font-mono-tabular text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-[28px]">
            {value}
          </p>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}>
          <Icon className={`h-5 w-5 ${styles.iconColor}`} strokeWidth={2} />
        </div>
      </div>

      {hint && (
        <p className="relative mt-3 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">{hint}</p>
      )}
    </div>
  );
}

// Memoized: rendered 3-4x on Dashboard/Summary and re-created via SummaryCard,
// Summary re-renders on every theme toggle even though card data is unchanged.
export default memo(SummaryCard);
