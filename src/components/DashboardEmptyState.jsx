import { Link } from "react-router-dom";
import { HandCoins, PlusCircle } from "lucide-react";

function DashboardEmptyState() {
  return (
    <div className="rounded-[var(--radius-card-lg)] border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-12 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius-card)] ice-surface">
        <HandCoins className="h-6 w-6 ice-icon" strokeWidth={1.75} />
      </div>

      <p className="font-display text-base font-semibold text-[var(--color-ink)]">No transactions yet</p>
      <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        Add your first income or expense to start tracking your finances.
      </p>

      <Link to="/add" className="btn btn-primary btn-sm mt-6">
        <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />
        Add Transaction
      </Link>
    </div>
  );
}

export default DashboardEmptyState;
