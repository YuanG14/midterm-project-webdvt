import { ArrowDownRight, ArrowUpRight, Calendar, StickyNote } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

function TransactionDetailCard({ transaction }) {
  const isIncome = transaction.type === "income";

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgba(16,21,28,0.04),0_8px_24px_-12px_rgba(16,21,28,0.08)] sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-[var(--color-ink)] sm:text-2xl">
            {transaction.title || "Untitled transaction"}
          </h2>
          <div className="mt-2.5 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-[var(--color-canvas)] px-2.5 py-1 text-[12px] font-semibold text-[var(--color-ink-soft)]">
              {transaction.category || "Uncategorized"}
            </span>
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                isIncome
                  ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]"
                  : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
              }`}
            >
              {isIncome ? (
                <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
              ) : (
                <ArrowDownRight className="h-3 w-3" strokeWidth={2.5} />
              )}
              {isIncome ? "Income" : "Expense"}
            </span>
          </div>
        </div>

        <p
          className={`font-mono-tabular text-2xl font-bold sm:text-3xl ${
            isIncome ? "text-[var(--color-primary-dark)]" : "text-[var(--color-danger)]"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1.5 border-t border-[var(--color-border-soft)] pt-5 text-[13px] text-[var(--color-ink-soft)]">
        <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
        {formattedDate}
      </div>

      {transaction.notes && (
        <div className="mt-3 flex items-start gap-1.5 text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
          <StickyNote className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          <p>{transaction.notes}</p>
        </div>
      )}
    </div>
  );
}

export default TransactionDetailCard;
