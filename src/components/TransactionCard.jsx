import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

function TransactionCard({ transaction }) {
  const isIncome = transaction.type === "income";

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="group flex items-center gap-4 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-xs)] transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:shadow-[var(--shadow-raised)]"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isIncome ? "bg-[var(--color-primary)]/10" : "bg-[var(--color-danger)]/10"
        }`}
      >
        {isIncome ? (
          <ArrowUpRight className="h-5 w-5 text-[var(--color-primary-dark)]" strokeWidth={2} />
        ) : (
          <ArrowDownRight className="h-5 w-5 text-[var(--color-danger)]" strokeWidth={2} />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-[var(--color-ink)]">
          {transaction.title || "Untitled transaction"}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] text-[var(--color-ink-soft)]">
          <span className="inline-flex items-center rounded-full bg-[var(--color-canvas)] px-2 py-0.5 font-medium">
            {transaction.category || "Uncategorized"}
          </span>
          <span aria-hidden="true">·</span>
          <span>{formattedDate}</span>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={`font-mono-tabular text-[15px] font-bold ${
            isIncome ? "text-[var(--color-primary-dark)]" : "text-[var(--color-danger)]"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
      </div>

      <ChevronRight
        className="h-4 w-4 shrink-0 text-[var(--color-ink-soft)] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        strokeWidth={2}
      />
    </Link>
  );
}

// Memoized: Dashboard re-renders every TransactionCard whenever its filter
// state changes, even though most individual transaction objects haven't
// changed. Since `transaction` keeps the same object reference for entries
// that are unaffected by the filter, memo lets those skip re-rendering.
export default memo(TransactionCard);
