import { memo } from "react";
import { ArrowDownRight, ArrowUpRight, Landmark, TrendingDown, TrendingUp, Wallet } from "lucide-react";
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
  const spentPercentage = incomeTotal > 0 ? Math.min((expenseTotal / incomeTotal) * 100, 999) : 0;

  return (
    <section aria-label="Financial overview" className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="balance-card relative overflow-hidden rounded-[var(--radius-card-lg)] border border-[var(--color-border-soft)] p-5 shadow-[var(--shadow-card)] sm:p-6 lg:col-span-1">
        <div className="relative z-10 flex h-full min-h-44 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-eyebrow">Current balance</p>
              <p className="mt-1.5 text-[12.5px] text-[var(--color-ink-soft)]">Available across your ledger</p>
            </div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-primary)] text-[var(--color-ink)]">
              <Wallet className="h-[18px] w-[18px]" strokeWidth={2.1} />
            </div>
          </div>
          <p className="text-value-hero mt-7 break-words text-[clamp(27px,8vw,38px)] leading-none sm:text-[40px] lg:text-[34px] xl:text-[40px]">
            {formatCurrency(balance)}
          </p>
          <p className="mt-3 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-ink-soft)]">
            <Landmark className="h-3.5 w-3.5" strokeWidth={2} />
            Updated from all transactions
          </p>
        </div>
      </div>

      <div className="card card-lg card-padded flex min-h-44 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-eyebrow">Income</p>
            <p className="text-value mt-3 break-words text-[clamp(22px,7vw,30px)] text-[var(--color-success-dark)]">
            {formatCurrency(incomeTotal)}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-success)]/10 text-[var(--color-success-dark)]">
            <ArrowUpRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-success-dark)]">
          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2} /> Money coming in
        </p>
      </div>

      <div className="card card-lg card-padded flex min-h-44 flex-col justify-between">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-eyebrow">Expenses</p>
            <p className="text-value mt-3 break-words text-[clamp(22px,7vw,30px)] text-[var(--color-danger)]">
              {formatCurrency(expenseTotal)}
            </p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
            <ArrowDownRight className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
        </div>
        <p className="mt-6 flex items-center gap-1.5 text-[12px] font-medium text-[var(--color-danger)]">
          <TrendingDown className="h-3.5 w-3.5" strokeWidth={2} />
          {incomeTotal > 0 ? `${spentPercentage.toFixed(1)}% of income used` : "Money going out"}
        </p>
      </div>
    </section>
  );
}

// Memoized for the same reason the old FinancialCard was: Dashboard
// re-renders on every filter change, but balance/income/expense totals
// are unaffected by category or type filters.
export default memo(BalanceOverview);
