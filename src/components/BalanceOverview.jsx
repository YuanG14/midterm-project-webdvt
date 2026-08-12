import { memo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";

/**
 * Dashboard's primary financial figure. Replaces the previous three
 * equal-weight stat cards (balance / income / expense, all the same
 * size) with a single panel that gives balance the visual weight it
 * actually has in a personal budget — a large hero figure — while
 * income and expense sit underneath as smaller, secondary data,
 * separated by a hairline rule rather than their own card chrome.
 */
function BalanceOverview({ balance, incomeTotal, expenseTotal }) {
  return (
    <div className="card card-padded mb-8">
      <p className="text-eyebrow">Current Balance</p>
      <p className="text-value-hero mt-2 text-[clamp(28px,13vw_-_14px,42px)] leading-none sm:text-[52px]">
        {formatCurrency(balance)}
      </p>
      <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        Income minus expenses, updated in real time.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--color-border-soft)] pt-6 sm:grid-cols-2 sm:gap-12">
        <div>
          <div className="flex items-center gap-1.5 text-eyebrow text-[var(--color-ink-soft)]">
            <TrendingUp className="h-3.5 w-3.5 text-[var(--color-success-dark)]" strokeWidth={2} />
            Total Income
          </div>
          <p className="text-value mt-1.5 text-xl text-[var(--color-success-dark)] sm:text-2xl">
            {formatCurrency(incomeTotal)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 text-eyebrow text-[var(--color-ink-soft)]">
            <TrendingDown className="h-3.5 w-3.5 text-[var(--color-danger)]" strokeWidth={2} />
            Total Expenses
          </div>
          <p className="text-value mt-1.5 text-xl text-[var(--color-danger)] sm:text-2xl">
            {formatCurrency(expenseTotal)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Memoized for the same reason the old FinancialCard was: Dashboard
// re-renders on every filter change, but balance/income/expense totals
// are unaffected by category or type filters.
export default memo(BalanceOverview);
