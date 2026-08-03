import { useMemo } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  Flame,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  Calculator,
  ChartSpline,
  Moon,
} from "lucide-react";
import PageHeader from "../components/PageHeader";
import SummaryCard from "../components/SummaryCard";
import SpendingChart from "../components/SpendingChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import InsightCard from "../components/InsightCard";
import EmptyState from "../components/EmptyState";
import { useTransactions } from "../hooks/useTransactions";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryColor } from "../utils/categoryColors";

function Summary() {
  const { transactions, incomeTotal, expenseTotal, balance } = useTransactions();
  const { theme } = useTheme();

  const expenseTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "expense"),
    [transactions]
  );
  const incomeTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === "income"),
    [transactions]
  );

  const categoryBreakdown = useMemo(() => {
    const totalsByCategory = new Map();
    for (const transaction of expenseTransactions) {
      const category = transaction.category || "Other";
      totalsByCategory.set(category, (totalsByCategory.get(category) ?? 0) + transaction.amount);
    }

    return Array.from(totalsByCategory.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: expenseTotal > 0 ? (amount / expenseTotal) * 100 : 0,
        color: getCategoryColor(category),
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenseTransactions, expenseTotal]);

  const insights = useMemo(() => {
    const largestExpenseCategory = categoryBreakdown[0] ?? null;

    const highestExpense = expenseTransactions.reduce(
      (max, transaction) => (transaction.amount > (max?.amount ?? -Infinity) ? transaction : max),
      null
    );

    const incomeByCategory = new Map();
    for (const transaction of incomeTransactions) {
      const category = transaction.category || "Other";
      incomeByCategory.set(category, (incomeByCategory.get(category) ?? 0) + transaction.amount);
    }
    const largestIncomeSource = Array.from(incomeByCategory.entries()).sort((a, b) => b[1] - a[1])[0] ?? null;

    return {
      largestExpenseCategory,
      highestExpense,
      largestIncomeSource,
      incomeCount: incomeTransactions.length,
      expenseCount: expenseTransactions.length,
      averageExpense: expenseTransactions.length > 0 ? expenseTotal / expenseTransactions.length : 0,
      averageIncome: incomeTransactions.length > 0 ? incomeTotal / incomeTransactions.length : 0,
    };
  }, [categoryBreakdown, expenseTransactions, incomeTransactions, expenseTotal, incomeTotal]);

  const hasTransactions = transactions.length > 0;

  return (
    <div>
      <PageHeader
        eyebrow="Insights"
        title="Summary"
        description="Category breakdowns and spending trends, calculated from your transaction history."
      />

      {!hasTransactions ? (
        <EmptyState
          icon={ChartSpline}
          title="Nothing to summarize yet"
          message="Add a transaction to start seeing your balances, spending breakdown, and insights here."
          actionTo="/add"
          actionLabel="Add Transaction"
        />
      ) : (
        <div className="flex flex-col gap-8">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              icon={Wallet}
              label="Current Balance"
              value={formatCurrency(balance)}
              hint="Income minus expenses."
              accent="balance"
            />
            <SummaryCard
              icon={TrendingUp}
              label="Total Income"
              value={formatCurrency(incomeTotal)}
              hint={`${insights.incomeCount} income transactions`}
              accent="income"
            />
            <SummaryCard
              icon={TrendingDown}
              label="Total Expenses"
              value={formatCurrency(expenseTotal)}
              hint={`${insights.expenseCount} expense transactions`}
              accent="expense"
            />
            <SummaryCard
              icon={Receipt}
              label="Total Transactions"
              value={String(transactions.length)}
              hint="All recorded activity."
              accent="count"
            />
          </div>

          {/* Spending Breakdown + Chart */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
            <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgba(16,21,28,0.04),0_8px_24px_-12px_rgba(16,21,28,0.08)] lg:col-span-2">
              <p className="mb-4 font-display text-sm font-semibold text-[var(--color-ink)]">
                Expense Distribution
              </p>
              {categoryBreakdown.length > 0 ? (
                <SpendingChart data={categoryBreakdown} />
              ) : (
                <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                  No expenses recorded yet.
                </p>
              )}
            </div>

            <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgba(16,21,28,0.04),0_8px_24px_-12px_rgba(16,21,28,0.08)] lg:col-span-3">
              <p className="mb-4 font-display text-sm font-semibold text-[var(--color-ink)]">
                Top Spending Categories
              </p>
              {categoryBreakdown.length > 0 ? (
                <CategoryBreakdown data={categoryBreakdown} />
              ) : (
                <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                  No expenses recorded yet.
                </p>
              )}
            </div>
          </div>

          {/* Recent Insights */}
          <div>
            <p className="mb-4 font-display text-sm font-semibold text-[var(--color-ink)]">Recent Insights</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {insights.largestExpenseCategory && (
                <InsightCard
                  icon={Flame}
                  label="Largest Expense Category"
                  value={insights.largestExpenseCategory.category}
                  hint={formatCurrency(insights.largestExpenseCategory.amount)}
                />
              )}
              {insights.highestExpense && (
                <InsightCard
                  icon={Receipt}
                  label="Highest Individual Expense"
                  value={insights.highestExpense.title || "Untitled transaction"}
                  hint={formatCurrency(insights.highestExpense.amount)}
                />
              )}
              {insights.largestIncomeSource && (
                <InsightCard
                  icon={Briefcase}
                  label="Largest Income Source"
                  value={insights.largestIncomeSource[0]}
                  hint={formatCurrency(insights.largestIncomeSource[1])}
                />
              )}
              <InsightCard
                icon={ArrowUpRight}
                label="Income Transactions"
                value={String(insights.incomeCount)}
              />
              <InsightCard
                icon={ArrowDownRight}
                label="Expense Transactions"
                value={String(insights.expenseCount)}
              />
              <InsightCard
                icon={Calculator}
                label="Average Expense"
                value={formatCurrency(insights.averageExpense)}
              />
              <InsightCard
                icon={Calculator}
                label="Average Income"
                value={formatCurrency(insights.averageIncome)}
              />
            </div>
          </div>

          {/* Theme reminder */}
          <div className="flex items-center gap-2.5 rounded-xl border border-dashed border-[var(--color-border-soft)] px-4 py-3 text-[12.5px] text-[var(--color-ink-soft)]">
            <Moon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Currently viewing in {theme === "dark" ? "dark" : "light"} mode — toggle anytime from the navbar.
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
