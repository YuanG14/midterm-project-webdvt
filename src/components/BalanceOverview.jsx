import { memo } from "react";
import { ArrowDownRight, ArrowUpRight, Landmark, TrendingDown, TrendingUp } from "lucide-react";
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
    <section aria-label="Financial overview" className="balance-overview mb-9 grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="balance-hero relative overflow-hidden rounded-[var(--radius-card-lg)] p-6 sm:p-8 lg:col-span-3">
        <div className="balance-grid" aria-hidden="true" />
        <div className="relative z-10 flex h-full min-h-56 flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] font-semibold tracking-[0.04em] text-white/70">CURRENT BALANCE</p>
              <p className="mt-2 text-[14px] text-white/68">Available across your ledger</p>
            </div>
            <span className="ledger-index">01 / OVERVIEW</span>
          </div>
          <p className="mt-10 break-words font-display text-[clamp(36px,8vw,58px)] font-extrabold leading-none tracking-[-0.055em] text-white">
            {formatCurrency(balance)}
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[13px] font-medium text-white/72">
              <Landmark className="h-4 w-4" strokeWidth={2} />
              Updated from all transactions
            </p>
            <div className="w-full sm:max-w-48">
              <div className="mb-2 flex items-center justify-between text-[12px] font-semibold text-white/65">
                <span>INCOME USED</span>
                <span>{incomeTotal > 0 ? `${spentPercentage.toFixed(1)}%` : "—"}</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/12">
                <span className="block h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${Math.min(spentPercentage, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cashflow-panel card card-lg lg:col-span-2">
        <div className="cashflow-heading">
          <div>
            <p className="text-eyebrow">Cash flow</p>
            <p className="mt-1.5 text-[14px] text-[var(--color-ink-soft)]">Money moving through your ledger</p>
          </div>
          <span className="ledger-index text-[var(--color-ink-faint)]">02 / FLOW</span>
        </div>

        <div className="cashflow-row">
          <span className="cashflow-icon bg-[var(--color-success)]/10 text-[var(--color-success-dark)]">
            <ArrowUpRight className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[var(--color-ink-soft)]">Income</p>
            <p className="text-value mt-1 break-words text-[clamp(21px,5vw,28px)] text-[var(--color-success-dark)]">{formatCurrency(incomeTotal)}</p>
          </div>
          <TrendingUp className="h-4 w-4 text-[var(--color-success-dark)]" strokeWidth={2} />
        </div>

        <div className="cashflow-row">
          <span className="cashflow-icon bg-[var(--color-danger)]/10 text-[var(--color-danger)]">
            <ArrowDownRight className="h-5 w-5" strokeWidth={2.2} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-[var(--color-ink-soft)]">Expenses</p>
            <p className="text-value mt-1 break-words text-[clamp(21px,5vw,28px)] text-[var(--color-danger)]">{formatCurrency(expenseTotal)}</p>
          </div>
          <TrendingDown className="h-4 w-4 text-[var(--color-danger)]" strokeWidth={2} />
        </div>
      </div>
    </section>
  );
}

// Memoized for the same reason the old FinancialCard was: Dashboard
// re-renders on every filter change, but balance/income/expense totals
// are unaffected by category or type filters.
export default memo(BalanceOverview);
