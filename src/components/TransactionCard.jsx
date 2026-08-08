import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryIcon } from "../utils/categoryIcons";

/**
 * Formats a date as "Today", "Yesterday", or a short absolute date —
 * purely a display concern, the underlying transaction.date is untouched.
 */
function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round((startOfToday - startOfDate) / 86_400_000);

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/**
 * Single row in the "All Transactions" activity feed. Deliberately flat —
 * a hairline top divider (via `.data-row`) and a quiet hover tint instead
 * of a bordered card per row, so a long list reads as one continuous
 * premium ledger rather than a stack of boxes. Only the Income/Expense
 * word carries color; category and date stay muted so the eye lands on
 * type + amount first.
 */
function TransactionCard({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category);
  const Icon = CategoryIcon ?? (isIncome ? ArrowUpRight : ArrowDownRight);
  const formattedDate = formatRelativeDate(transaction.date);
  const directionColor = isIncome ? "text-[var(--color-income-dark)]" : "text-[var(--color-danger)]";

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className="data-row group -mx-1 rounded-lg px-1 sm:-mx-2 sm:px-2"
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105 ${
          isIncome ? "bg-[var(--color-income)]/10" : "bg-[var(--color-danger)]/10"
        }`}
      >
        <Icon className={`h-[15px] w-[15px] ${directionColor}`} strokeWidth={2.25} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-[13.5px] font-semibold text-[var(--color-ink)]">
          {transaction.title || "Untitled transaction"}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-[var(--color-ink-soft)]">
          <span className={`font-semibold ${directionColor}`}>{isIncome ? "Income" : "Expense"}</span>
          {" · "}
          {transaction.category || "Uncategorized"}
          {" · "}
          {formattedDate}
        </p>
      </div>

      <p className={`shrink-0 font-mono-tabular text-[13.5px] font-bold sm:text-[14.5px] ${directionColor}`}>
        {isIncome ? "+" : "-"}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>

      <ChevronRight
        className="hidden h-4 w-4 shrink-0 text-[var(--color-ink-soft)] opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100 sm:block"
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
