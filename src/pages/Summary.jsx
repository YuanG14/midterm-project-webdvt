import { useMemo, useState } from "react";
import { Briefcase, Calculator, ChartSpline, Flame, Receipt } from "lucide-react";
import SummaryHeader from "../components/SummaryHeader";
import SpendingChart from "../components/SpendingChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import InsightRow from "../components/InsightRow";
import EmptyState from "../components/EmptyState";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryColor } from "../utils/categoryColors";

function Summary() {
  const { transactions, incomeTotal, expenseTotal, balance } = useTransactions();

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

  // Shared hover state so the donut chart and the category list highlight
  // the same category together (see SpendingChart / CategoryBreakdown).
  // Purely interactive — doesn't touch any of the totals computed above.
  const [activeCategory, setActiveCategory] = useState(null);

  const hasTransactions = transactions.length > 0;
  const hasExpenses = categoryBreakdown.length > 0;
  const hasInsights = Boolean(
    insights.largestExpenseCategory || insights.highestExpense || insights.largestIncomeSource
  );

  // Presentational only: picks a visual accent based on the already-computed
  // balance sign. Does not change the displayed value.
  const balancePositive = balance >= 0;

  return (
    <div>
      <SummaryHeader />

      {!hasTransactions ? (
        <EmptyState
          icon={ChartSpline}
          title="No financial data yet"
          message="Add a transaction to start seeing your spending breakdown and insights here."
          actionTo="/add"
          actionLabel="Add Transaction"
        />
      ) : (
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* Primary spending overview — the page's focal surface */}
          <div className="card card-lg card-padded">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-display text-lg font-bold tracking-tight text-[var(--color-ink)] sm:text-xl">
                Spending breakdown
              </h2>
              <p className="mt-1 text-[13.5px] text-[var(--color-ink-soft)]">
                {hasExpenses
                  ? `${formatCurrency(expenseTotal)} across ${categoryBreakdown.length} ${
                      categoryBreakdown.length === 1 ? "category" : "categories"
                    }`
                  : "Where your spending goes, once you log an expense."}
              </p>
            </div>

            {hasExpenses ? (
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
                <div className="flex items-center justify-center lg:col-span-2 lg:border-r lg:border-[var(--color-border-soft)] lg:pr-8">
                  <SpendingChart
                    data={categoryBreakdown}
                    total={expenseTotal}
                    activeCategory={activeCategory}
                    onActiveCategoryChange={setActiveCategory}
                  />
                </div>
                <div className="lg:col-span-3">
                  <CategoryBreakdown
                    data={categoryBreakdown}
                    activeCategory={activeCategory}
                    onActiveCategoryChange={setActiveCategory}
                  />
                </div>
              </div>
            ) : (
              <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                No expenses recorded yet.
              </p>
            )}
          </div>

          {/* Financial overview — Balance leads with the strongest
              hierarchy; Income/Expenses/Total activity are secondary,
              smaller stats below it rather than four equal-weight tiles. */}
          <div className="card card-padded">
            <p className="text-eyebrow mb-1">Financial Overview</p>
            <p className="text-[12px] font-medium text-[var(--color-ink-soft)]">Balance</p>
            <p
              className={`font-display mt-1 text-[32px] font-extrabold tracking-tight sm:text-[36px] ${
                balancePositive ? "text-[var(--color-success-dark)]" : "text-[var(--color-danger)]"
              }`}
            >
              {formatCurrency(balance)}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-y-5 border-t border-[var(--color-border-soft)] pt-5 sm:grid-cols-3 sm:gap-x-8">
              <div>
                <p className="text-[12px] font-medium text-[var(--color-ink-soft)]">Income</p>
                <p className="text-value mt-1.5 text-lg text-[var(--color-success-dark)]">
                  {formatCurrency(incomeTotal)}
                </p>
                <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
                  {insights.incomeCount} {insights.incomeCount === 1 ? "transaction" : "transactions"}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[var(--color-ink-soft)]">Expenses</p>
                <p className="text-value mt-1.5 text-lg text-[var(--color-danger)]">
                  {formatCurrency(expenseTotal)}
                </p>
                <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
                  {insights.expenseCount} {insights.expenseCount === 1 ? "transaction" : "transactions"}
                </p>
              </div>
              <div>
                <p className="text-[12px] font-medium text-[var(--color-ink-soft)]">Total activity</p>
                <p className="text-value mt-1.5 text-lg">{transactions.length}</p>
                <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">transactions recorded</p>
              </div>
            </div>
          </div>

          {/* Key insights — a quiet, divided list rather than a grid of
              identical stat tiles. */}
          {hasInsights && (
            <div className="card card-padded">
              <p className="text-eyebrow mb-1">Key insights</p>
              <div className="flex flex-col">
                {insights.largestExpenseCategory && (
                  <InsightRow
                    icon={Flame}
                    label="Largest expense category"
                    value={insights.largestExpenseCategory.category}
                    hint={formatCurrency(insights.largestExpenseCategory.amount)}
                    tone="danger"
                  />
                )}
                {insights.highestExpense && (
                  <InsightRow
                    icon={Receipt}
                    label="Highest individual expense"
                    value={insights.highestExpense.title || "Untitled transaction"}
                    hint={formatCurrency(insights.highestExpense.amount)}
                    tone="danger"
                  />
                )}
                {insights.largestIncomeSource && (
                  <InsightRow
                    icon={Briefcase}
                    label="Largest income source"
                    value={insights.largestIncomeSource[0]}
                    hint={formatCurrency(insights.largestIncomeSource[1])}
                    tone="primary"
                  />
                )}
                {insights.expenseCount > 0 && (
                  <InsightRow
                    icon={Calculator}
                    label="Average expense"
                    value={formatCurrency(insights.averageExpense)}
                    tone="accent"
                  />
                )}
                {insights.incomeCount > 0 && (
                  <InsightRow
                    icon={Calculator}
                    label="Average income"
                    value={formatCurrency(insights.averageIncome)}
                    tone="accent"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Summary;
