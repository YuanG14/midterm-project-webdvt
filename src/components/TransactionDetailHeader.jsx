import { Link } from "react-router-dom";
import { ArrowLeft, Tag } from "lucide-react";
import { getCategoryIcon } from "../utils/categoryIcons";

/**
 * Transaction-Detail-only header.
 */
function TransactionDetailHeader({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category) ?? Tag;

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:flex ${
              isIncome ? "bg-[var(--color-primary)]" : "bg-[var(--color-danger)]"
            }`}
          >
            <CategoryIcon className="h-5.5 w-5.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <span className="accent-rule mb-3" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
              Record
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              {transaction.title || "Untitled transaction"}
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
              {isIncome ? "Income" : "Expense"} • {transaction.category || "Uncategorized"}
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:border-[var(--color-ice-accent)] hover:bg-[var(--color-ice-accent)]/15 hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TransactionDetailHeader;
