import { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Receipt,
  Flame,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  ArrowRight,
  Calculator,
  ChartSpline,
  Moon,
  PieChart,
  ListOrdered,
  Sparkles,
} from "lucide-react";
import SummaryHeader from "../components/SummaryHeader";
import SummaryStatCard from "../components/SummaryStatCard";
import SpendingChart from "../components/SpendingChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import InsightCard from "../components/InsightCard";
import InsightTransactionRow from "../components/InsightTransactionRow";
import InsightDetailRow from "../components/InsightDetailRow";
import EmptyState from "../components/EmptyState";
import ChartCard from "../components/ChartCard";
import AnalyticsSection from "../components/AnalyticsSection";
import { useTransactions } from "../hooks/useTransactions";
import { useTheme } from "../context/ThemeContext";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryColor } from "../utils/categoryColors";
import { formatShortDate, groupTransactionsByDay } from "../utils/insightFormatting";

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
    // Real transactions behind the "Largest Expense Category" card's
    // expanded panel — same category filter the chart/breakdown already use.
    const largestExpenseCategoryTransactions = largestExpenseCategory
      ? expenseTransactions
          .filter((transaction) => (transaction.category || "Other") === largestExpenseCategory.category)
          .sort((a, b) => b.amount - a.amount)
      : [];

    const highestExpense = expenseTransactions.reduce(
      (max, transaction) => (transaction.amount > (max?.amount ?? -Infinity) ? transaction : max),
      null
    );
    const smallestExpense = expenseTransactions.reduce(
      (min, transaction) => (transaction.amount < (min?.amount ?? Infinity) ? transaction : min),
      null
    );

    const incomeByCategory = new Map();
    for (const transaction of incomeTransactions) {
      const category = transaction.category || "Other";
      incomeByCategory.set(category, (incomeByCategory.get(category) ?? 0) + transaction.amount);
    }
    const largestIncomeSource = Array.from(incomeByCategory.entries()).sort((a, b) => b[1] - a[1])[0] ?? null;
    // Real transactions behind the "Largest Income Source" card's expanded
    // panel — same category filter used to compute largestIncomeSource above.
    const largestIncomeSourceTransactions = largestIncomeSource
      ? incomeTransactions
          .filter((transaction) => (transaction.category || "Other") === largestIncomeSource[0])
          .sort((a, b) => b.amount - a.amount)
      : [];

    // Most-recent-first lists for the Income/Expense Transactions cards'
    // activity breakdown.
    const recentIncomeTransactions = [...incomeTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const recentExpenseTransactions = [...expenseTransactions].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return {
      largestExpenseCategory,
      largestExpenseCategoryTransactions,
      highestExpense,
      smallestExpense,
      largestIncomeSource,
      largestIncomeSourceTransactions,
      incomeCount: incomeTransactions.length,
      expenseCount: expenseTransactions.length,
      recentIncomeTransactions,
      recentExpenseTransactions,
      averageExpense: expenseTransactions.length > 0 ? expenseTotal / expenseTransactions.length : 0,
      averageIncome: incomeTransactions.length > 0 ? incomeTotal / incomeTransactions.length : 0,
    };
  }, [categoryBreakdown, expenseTransactions, incomeTransactions, expenseTotal, incomeTotal]);

  const hasTransactions = transactions.length > 0;

  // Presentational only: picks a visual accent based on the already-computed
  // balance sign. Does not change the displayed value.
  const balanceAccent = balance >= 0 ? "balance" : "expense";

  return (
    <div>
      <SummaryHeader />

      {!hasTransactions ? (
        <EmptyState
          icon={ChartSpline}
          title="No financial data yet"
          message="Add a transaction to start seeing your balances, spending breakdown, and insights here."
          actionTo="/add"
          actionLabel="Add Transaction"
        />
      ) : (
        <div className="flex flex-col gap-8">
          {/* Financial Overview */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryStatCard
              icon={Wallet}
              label="Current Balance"
              value={formatCurrency(balance)}
              hint="Income minus expenses."
              accent={balanceAccent}
              style={{ animationDelay: "0ms" }}
            />
            <SummaryStatCard
              icon={TrendingUp}
              label="Total Income"
              value={formatCurrency(incomeTotal)}
              hint={`${insights.incomeCount} income transactions`}
              accent="income"
              style={{ animationDelay: "60ms" }}
            />
            <SummaryStatCard
              icon={TrendingDown}
              label="Total Expenses"
              value={formatCurrency(expenseTotal)}
              hint={`${insights.expenseCount} expense transactions`}
              accent="expense"
              style={{ animationDelay: "120ms" }}
            />
            <SummaryStatCard
              icon={Receipt}
              label="Total Transactions"
              value={String(transactions.length)}
              hint="All recorded activity."
              accent="count"
              style={{ animationDelay: "180ms" }}
            />
          </div>

          {/* Spending Breakdown — the visual centerpiece: a category donut
              paired with the full ranked category list, using real
              transaction data only. */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-ink)]/[0.06]">
                <PieChart className="h-3.5 w-3.5 text-[var(--color-ink-soft)]" strokeWidth={2.25} />
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-[var(--color-ink)]">Spending Breakdown</p>
                <p className="text-[12px] text-[var(--color-ink-soft)]">Where your money is going, by category.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
              <ChartCard className="md:col-span-2">
                <AnalyticsSection icon={PieChart} title="Expense Distribution">
                  {categoryBreakdown.length > 0 ? (
                    <SpendingChart data={categoryBreakdown} total={expenseTotal} />
                  ) : (
                    <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                      No expenses recorded yet.
                    </p>
                  )}
                </AnalyticsSection>
              </ChartCard>

              <ChartCard className="md:col-span-3">
                <AnalyticsSection
                  icon={ListOrdered}
                  title="Top Spending Categories"
                  hint={categoryBreakdown.length > 0 ? `${categoryBreakdown.length} categories` : undefined}
                >
                  {categoryBreakdown.length > 0 ? (
                    <CategoryBreakdown data={categoryBreakdown} />
                  ) : (
                    <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                      No expenses recorded yet.
                    </p>
                  )}
                </AnalyticsSection>
              </ChartCard>
            </div>
          </div>

          {/* Recent Insights */}
          <AnalyticsSection icon={Sparkles} title="Recent Insights">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {insights.largestExpenseCategory && (
                <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "0ms" }}>
                  <InsightCard
                    icon={Flame}
                    label="Largest Expense Category"
                    value={insights.largestExpenseCategory.category}
                    hint={formatCurrency(insights.largestExpenseCategory.amount)}
                    tone="danger"
                    details={
                      <div>
                        <p className="mb-2 text-[12px] font-medium text-[var(--color-ink-soft)]">
                          {insights.largestExpenseCategoryTransactions.length} transaction
                          {insights.largestExpenseCategoryTransactions.length === 1 ? "" : "s"}
                        </p>
                        <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                          {insights.largestExpenseCategoryTransactions.map((transaction) => (
                            <InsightTransactionRow
                              key={transaction.id}
                              title={transaction.title || "Untitled transaction"}
                              amount={transaction.amount}
                            />
                          ))}
                        </div>
                      </div>
                    }
                  />
                </div>
              )}
              {insights.highestExpense && (
                <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "50ms" }}>
                  <InsightCard
                    icon={Receipt}
                    label="Highest Individual Expense"
                    value={insights.highestExpense.title || "Untitled transaction"}
                    hint={formatCurrency(insights.highestExpense.amount)}
                    tone="danger"
                    details={
                      <div>
                        <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                          <InsightDetailRow
                            label="Category"
                            value={insights.highestExpense.category || "Uncategorized"}
                          />
                          <InsightDetailRow label="Date" value={formatShortDate(insights.highestExpense.date)} />
                          <InsightDetailRow label="Type" value="Expense" />
                          <InsightDetailRow
                            label="Description"
                            value={insights.highestExpense.title || "Untitled transaction"}
                          />
                        </div>
                        <Link
                          to={`/transaction/${insights.highestExpense.id}`}
                          className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-primary-dark)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                        >
                          View transaction
                          <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                        </Link>
                      </div>
                    }
                  />
                </div>
              )}
              {insights.largestIncomeSource && (
                <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "100ms" }}>
                  <InsightCard
                    icon={Briefcase}
                    label="Largest Income Source"
                    value={insights.largestIncomeSource[0]}
                    hint={formatCurrency(insights.largestIncomeSource[1])}
                    tone="success"
                    details={
                      <div>
                        <p className="mb-2 text-[12px] font-medium text-[var(--color-ink-soft)]">
                          {insights.largestIncomeSourceTransactions.length} transaction
                          {insights.largestIncomeSourceTransactions.length === 1 ? "" : "s"}
                        </p>
                        <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                          {insights.largestIncomeSourceTransactions.map((transaction) => (
                            <InsightTransactionRow
                              key={transaction.id}
                              title={transaction.title || "Untitled transaction"}
                              meta={formatShortDate(transaction.date)}
                              amount={transaction.amount}
                            />
                          ))}
                        </div>
                      </div>
                    }
                  />
                </div>
              )}
              <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "150ms" }}>
                <InsightCard
                  icon={ArrowUpRight}
                  label="Income Transactions"
                  value={String(insights.incomeCount)}
                  tone="success"
                  details={
                    insights.recentIncomeTransactions.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {groupTransactionsByDay(insights.recentIncomeTransactions).map((group) => (
                          <div key={group.label}>
                            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
                              {group.label}
                            </p>
                            <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                              {group.transactions.map((transaction) => (
                                <InsightTransactionRow
                                  key={transaction.id}
                                  title={transaction.title || "Untitled transaction"}
                                  amount={transaction.amount}
                                  signed
                                  isIncome
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--color-ink-soft)]">No income transactions yet.</p>
                    )
                  }
                />
              </div>
              <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "200ms" }}>
                <InsightCard
                  icon={ArrowDownRight}
                  label="Expense Transactions"
                  value={String(insights.expenseCount)}
                  tone="danger"
                  details={
                    insights.recentExpenseTransactions.length > 0 ? (
                      <div className="flex flex-col gap-3">
                        {groupTransactionsByDay(insights.recentExpenseTransactions).map((group) => (
                          <div key={group.label}>
                            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
                              {group.label}
                            </p>
                            <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                              {group.transactions.map((transaction) => (
                                <InsightTransactionRow
                                  key={transaction.id}
                                  title={transaction.title || "Untitled transaction"}
                                  amount={transaction.amount}
                                  signed
                                  isIncome={false}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--color-ink-soft)]">No expense transactions yet.</p>
                    )
                  }
                />
              </div>
              <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "250ms" }}>
                <InsightCard
                  icon={Calculator}
                  label="Average Expense"
                  value={formatCurrency(insights.averageExpense)}
                  tone="danger"
                  details={
                    insights.expenseCount > 0 ? (
                      <div>
                        <p className="mb-2 text-[12px] font-medium text-[var(--color-ink-soft)]">
                          Based on {insights.expenseCount} expense transaction
                          {insights.expenseCount === 1 ? "" : "s"}
                        </p>
                        <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                          <InsightTransactionRow title="Largest expense" amount={insights.highestExpense.amount} />
                          <InsightTransactionRow title="Smallest expense" amount={insights.smallestExpense.amount} />
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--color-ink-soft)]">No expense transactions yet.</p>
                    )
                  }
                />
              </div>
              <div className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards]" style={{ animationDelay: "300ms" }}>
                <InsightCard
                  icon={Calculator}
                  label="Average Income"
                  value={formatCurrency(insights.averageIncome)}
                  tone="success"
                  details={
                    insights.incomeCount > 0 ? (
                      <div>
                        <p className="mb-2 text-[12px] font-medium text-[var(--color-ink-soft)]">
                          Based on {insights.incomeCount} income transaction
                          {insights.incomeCount === 1 ? "" : "s"}
                        </p>
                        <div className="flex flex-col divide-y divide-[var(--color-border-soft)]">
                          {insights.recentIncomeTransactions.map((transaction) => (
                            <InsightTransactionRow
                              key={transaction.id}
                              title={transaction.title || "Untitled transaction"}
                              amount={transaction.amount}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[13px] text-[var(--color-ink-soft)]">No income transactions yet.</p>
                    )
                  }
                />
              </div>
            </div>
          </AnalyticsSection>

          {/* Theme reminder */}
          <div className="flex items-center gap-2.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-3 text-[12.5px] text-[var(--color-ink-soft)] shadow-[var(--shadow-xs)]">
            <Moon className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
            Currently viewing in {theme === "dark" ? "dark" : "light"} mode — toggle anytime from the navbar.
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
