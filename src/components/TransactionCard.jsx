import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryIcon } from "../utils/categoryIcons";
import { TRANSACTION_GRID_COLS } from "../utils/transactionTableGrid";

/**
 * Absolute short date ("Aug 14, 2026") — every row in the table uses the
 * same format, so scanning the Date column stays consistent (no mixing
 * "Today"/"Yesterday" with absolute dates). Purely a display concern,
 * the underlying transaction.date is untouched.
 */
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * A single transaction row. Renders as a `.data-row` (hairline divider,
 * quiet hover tint) laid out on the same grid template as
 * TransactionTableHeader so columns line up exactly from `sm` up.
 * Below `sm`, the grid collapses to 3 auto-placed columns (icon / name
 * +meta / amount) — the Category/Type/Date cells are `hidden`, which
 * removes them from grid placement entirely rather than leaving gaps.
 */
function TransactionCard({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category);
  const Icon = CategoryIcon ?? (isIncome ? ArrowUpRight : ArrowDownRight);
  const formattedDate = formatDate(transaction.date);
  const typeLabel = isIncome ? "Income" : "Expense";

  return (
    <Link
      to={`/transaction/${transaction.id}`}
      className={`group data-row grid grid-cols-[auto_1fr_auto] items-center gap-3 sm:gap-4 ${TRANSACTION_GRID_COLS}`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isIncome ? "bg-[var(--color-success)]/10" : "bg-[var(--color-danger)]/10"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${isIncome ? "text-[var(--color-success-dark)]" : "text-[var(--color-danger)]"}`}
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold text-[var(--color-ink)]">
          {transaction.title || "Untitled transaction"}
        </p>
        {/* Mobile-only combined meta line — the dedicated Category/Type/Date
            cells below take over this job from `sm` up. */}
        <p className="mt-0.5 truncate text-[12.5px] text-[var(--color-ink-soft)] sm:hidden">
          {transaction.category || "Uncategorized"} · {typeLabel} · {formattedDate}
        </p>
      </div>

      <span className="hidden truncate text-[13px] text-[var(--color-ink-soft)] sm:block">
        {transaction.category || "Uncategorized"}
      </span>

      <span
        className={`badge hidden w-fit sm:inline-flex ${isIncome ? "badge-success" : "badge-danger"}`}
      >
        {typeLabel}
      </span>

      <span className="hidden whitespace-nowrap text-[13px] text-[var(--color-ink-soft)] sm:block">
        {formattedDate}
      </span>

      <p
        className={`shrink-0 justify-self-end font-mono-tabular text-[14.5px] font-bold ${
          isIncome ? "text-[var(--color-success-dark)]" : "text-[var(--color-danger)]"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>
    </Link>
  );
}

// Memoized: Dashboard re-renders every TransactionCard whenever its filter
// state changes, even though most individual transaction objects haven't
// changed. Since `transaction` keeps the same object reference for entries
// that are unaffected by the filter, memo lets those skip re-rendering.
export default memo(TransactionCard);
