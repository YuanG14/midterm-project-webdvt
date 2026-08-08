import { ArrowDownRight, ArrowUpRight, Calendar, StickyNote, Tag } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryIcon } from "../utils/categoryIcons";
import TransactionInfoItem from "./TransactionInfoItem";

/**
 * Premium read-only summary of a transaction: a hero section that puts the
 * amount front and center (colored + directional by type), followed by
 * grouped detail cards for category, date, and notes. Purely presentational
 * — receives the same `transaction` object the previous detail card did.
 */
function TransactionOverviewCard({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category) ?? Tag;

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="animate-[fadeIn_0.4s_var(--ease-premium)] overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-[var(--shadow-card)]">
      {/* Hero: amount is the visual focus */}
      <div
        className={`relative px-6 py-10 text-center sm:px-8 ${
          isIncome ? "bg-[var(--color-primary)]/5" : "bg-[var(--color-danger)]/5"
        }`}
      >
        <div
          className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
            isIncome
              ? "bg-[var(--color-primary)]/15 text-[var(--color-primary-dark)]"
              : "bg-[var(--color-danger)]/15 text-[var(--color-danger)]"
          }`}
        >
          {isIncome ? (
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.25} />
          ) : (
            <ArrowDownRight className="h-5 w-5" strokeWidth={2.25} />
          )}
        </div>

        <p
          className={`truncate font-mono-tabular text-[32px] font-bold tracking-tight sm:text-4xl md:text-5xl ${
            isIncome ? "text-[var(--color-primary-dark)]" : "text-[var(--color-danger)]"
          }`}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(Math.abs(transaction.amount))}
        </p>

        <h2 className="font-display mt-3 text-xl font-bold tracking-tight text-[var(--color-ink)] sm:text-2xl">
          {transaction.title || "Untitled transaction"}
        </h2>

        <span
          className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold ${
            isIncome
              ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]"
              : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
          }`}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </div>

      {/* Grouped detail cards */}
      <div className="grid grid-cols-1 gap-3 border-t border-[var(--color-border-soft)] p-6 sm:grid-cols-2 sm:p-8">
        <TransactionInfoItem icon={CategoryIcon} label="Category" value={transaction.category || "Uncategorized"} />
        <TransactionInfoItem icon={Calendar} label="Date" value={formattedDate} />

        {transaction.notes && (
          <div className="sm:col-span-2">
            <TransactionInfoItem icon={StickyNote} label="Notes" value={transaction.notes} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionOverviewCard;
