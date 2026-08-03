import { Link } from "react-router-dom";
import { PlusCircle, Sparkles } from "lucide-react";

function EmptyState({
  icon: Icon = Sparkles,
  title = "No transactions yet",
  message = "Start tracking your finances by adding your first transaction.",
  actionTo = "/add",
  actionLabel = "Add Transaction",
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[var(--shadow-xs)]">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
        <Icon className="h-6 w-6 text-[var(--color-primary-dark)]" strokeWidth={1.75} />
      </div>
      <p className="font-display text-base font-semibold text-[var(--color-ink)]">{title}</p>
      <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        {message}
      </p>
      <Link
        to={actionTo}
        className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
      >
        <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />
        {actionLabel}
      </Link>
    </div>
  );
}

export default EmptyState;
