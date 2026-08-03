import { Link } from "react-router-dom";
import { PlusCircle, Sparkles } from "lucide-react";

/**
 * Summary-only empty state (premium finish: gradient icon badge, glow,
 * entrance animation). Kept separate from other pages' empty states so
 * this redesign only affects Summary.
 */
function EmptyState({
  icon: Icon = Sparkles,
  title = "No transactions yet",
  message = "Start tracking your finances by adding your first transaction.",
  actionTo = "/add",
  actionLabel = "Add Transaction",
}) {
  return (
    <div className="relative animate-[fadeIn_0.4s_var(--ease-premium)] overflow-hidden rounded-2xl border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[var(--shadow-xs)]">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-accent)]/20 opacity-70 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-accent)]/15">
        <Icon className="h-7 w-7 text-[var(--color-primary-dark)]" strokeWidth={1.75} />
      </div>
      <p className="relative font-display text-base font-semibold text-[var(--color-ink)]">{title}</p>
      <p className="relative mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        {message}
      </p>
      <Link
        to={actionTo}
        className="relative mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
      >
        <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />
        {actionLabel}
      </Link>
    </div>
  );
}

export default EmptyState;
