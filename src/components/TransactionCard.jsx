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
 * A single row in the transaction list. Renders as a `.data-row` — a
 * hairline divider above it and a quiet background tint on hover —
 * rather than its own bordered/shadowed card. Meant to be rendered as
 * a direct child inside a single containing `.card`, the way `.data-row`
 * is designed to be used (see index.css).
 */
function TransactionCard({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category);
  const Icon = CategoryIcon ?? (isIncome ? ArrowUpRight : ArrowDownRight);
  const formattedDate = formatRelativeDate(transaction.date);

  return (
    <Link to={`/transaction/${transaction.id}`} className="group data-row">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          isIncome ? "bg-[var(--color-success)]/10" : "bg-[var(--color-danger)]/10"
        }`}
      >
        <Icon
          className={`h-4.5 w-4.5 ${isIncome ? "text-[var(--color-success-dark)]" : "text-[var(--color-danger)]"}`}
          strokeWidth={2}
        />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-sm font-semibold text-[var(--color-ink)]">
          {transaction.title || "Untitled transaction"}
        </p>
        <p className="mt-0.5 truncate text-[12.5px] text-[var(--color-ink-soft)]">
          {transaction.category || "Uncategorized"} · {formattedDate}
        </p>
      </div>

      <p
        className={`shrink-0 font-mono-tabular text-[14.5px] font-bold ${
          isIncome ? "text-[var(--color-success-dark)]" : "text-[var(--color-danger)]"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>

      {/* Quiet clickability hint — fades in on hover/focus, doesn't shift
          layout (reserved width, not inserted). Purely visual; navigation
          already works from anywhere in the row via the surrounding Link. */}
      <ChevronRight
        aria-hidden="true"
        className="hidden h-4 w-4 shrink-0 text-[var(--color-ink-soft)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
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
