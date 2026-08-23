import { formatCurrency } from "../utils/formatCurrency";

/**
 * One compact row inside an expanded InsightCard panel — a transaction's
 * title (+ optional meta, e.g. a date) on the left and its amount on the
 * right. `signed` prefixes +/- and colors the amount by direction, for
 * contexts (activity breakdowns) where both income and expense rows can
 * appear together; category/average breakdowns that are already scoped to
 * one direction leave it off to match the app's existing quiet-number
 * treatment elsewhere.
 */
function InsightTransactionRow({ title, amount, meta, signed = false, isIncome = false }) {
  const directionColor = signed
    ? isIncome
      ? "text-[var(--color-income-dark)]"
      : "text-[var(--color-danger)]"
    : "text-[var(--color-ink)]";

  return (
    <div className="flex items-center gap-3 py-2 first:pt-0 last:pb-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-[var(--color-ink)]">{title}</p>
        {meta && <p className="mt-0.5 truncate text-[12px] text-[var(--color-ink-soft)]">{meta}</p>}
      </div>
      <p className={`shrink-0 font-mono-tabular text-[13px] font-bold ${directionColor}`}>
        {signed && (isIncome ? "+" : "-")}
        {formatCurrency(Math.abs(amount))}
      </p>
    </div>
  );
}

export default InsightTransactionRow;
