import { Link } from "react-router-dom";
import { HandCoins, PlusCircle } from "lucide-react";

/**
 * Dashboard-only empty state. Kept separate from the shared EmptyState
 * (used on Summary / Transaction Detail) so this redesign doesn't change
 * those other pages' look.
 */
function DashboardEmptyState() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[var(--shadow-xs)]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-transparent opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-accent)]/15">
        <HandCoins className="h-7 w-7 text-[var(--color-primary-dark)]" strokeWidth={1.75} />
      </div>

      <p className="relative font-display text-base font-semibold text-[var(--color-ink)]">No transactions yet</p>
      <p className="relative mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        Start tracking your money by adding your first transaction.
      </p>

      <Link
        to="/add"
        className="relative mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
      >
        <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />
        Add Transaction
      </Link>
    </div>
  );
}

export default DashboardEmptyState;
