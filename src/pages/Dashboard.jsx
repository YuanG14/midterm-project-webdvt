import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  SearchX,
  PieChart,
  ListOrdered,
  History,
  ArrowRight,
  Receipt,
} from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import FinancialCard from "../components/FinancialCard";
import FilterBar from "../components/FilterBar";
import TransactionCard from "../components/TransactionCard";
import DashboardEmptyState from "../components/DashboardEmptyState";
import ChartCard from "../components/ChartCard";
import AnalyticsSection from "../components/AnalyticsSection";
import SpendingChart from "../components/SpendingChart";
import CategoryBreakdown from "../components/CategoryBreakdown";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryColor } from "../utils/categoryColors";
import { getCategoryIcon } from "../utils/categoryIcons";

/** Same "Today"/"Yesterday"/short-date formatting used by TransactionCard,
 * kept local to the compact recent-transactions rows below. */
function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round((startOfToday - startOfDate) / 86_400_000);

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

/**
 * Compact preview row for the "Recent Transactions" bento tile — uses the
 * shared `.data-row` primitive (hairline divider, quiet hover tint) so it
 * reads as a lighter-weight list than the full TransactionCard rows in the
 * main Transactions section below.
 */
function RecentTransactionRow({ transaction }) {
  const isIncome = transaction.type === "income";
  const CategoryIcon = getCategoryIcon(transaction.category);
  const Icon = CategoryIcon ?? (isIncome ? TrendingUp : TrendingDown);

  return (
    <Link to={`/transaction/${transaction.id}`} className="data-row rounded-xl px-2">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isIncome ? "bg-[var(--color-income)]/10" : "bg-[var(--color-danger)]/10"
        }`}
      >
        <Icon
          className={`h-4 w-4 ${isIncome ? "text-[var(--color-income-dark)]" : "text-[var(--color-danger)]"}`}
          strokeWidth={2}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13.5px] font-semibold text-[var(--color-ink)]">
          {transaction.title || "Untitled transaction"}
        </p>
        <p className="mt-0.5 truncate text-[12px] text-[var(--color-ink-soft)]">
          {transaction.category || "Uncategorized"} · {formatRelativeDate(transaction.date)}
        </p>
      </div>
      <p
        className={`shrink-0 font-mono-tabular text-[13px] font-bold ${
          isIncome ? "text-[var(--color-income-dark)]" : "text-[var(--color-danger)]"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(Math.abs(transaction.amount))}
      </p>
    </Link>
  );
}

function Dashboard() {
  const { transactions, incomeTotal, expenseTotal, balance } = useTransactions();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((transaction) => transaction.category).filter(Boolean));
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => categoryFilter === "all" || transaction.category === categoryFilter)
      .filter((transaction) => typeFilter === "all" || transaction.type === typeFilter)
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, categoryFilter, typeFilter]);

  // Expense-by-category split, for the "Spending Overview" donut and
  // "Category Summary" list tiles — same computation Summary already does
  // for its Expense Distribution / Top Spending Categories panels.
  const categoryBreakdown = useMemo(() => {
    const totalsByCategory = new Map();
    for (const transaction of transactions) {
      if (transaction.type !== "expense") continue;
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
  }, [transactions, expenseTotal]);

  // Most recent activity, for the "Recent Transactions" bento tile.
  const recentTransactions = useMemo(() => {
    return transactions
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  }, [transactions]);

  const hasTransactions = transactions.length > 0;
  const hasFilteredResults = filteredTransactions.length > 0;

  return (
    <div>
      <DashboardHeader />

      {/* Main financial area — Current Balance is the dominant tile, with
          compact Income / Expenses tiles alongside it. */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FinancialCard
          icon={Wallet}
          label="Current Balance"
          value={formatCurrency(balance)}
          hint="Income minus expenses, updated in real time."
          accent="balance"
          hero
          className="sm:col-span-2 lg:col-span-2"
          style={{ animationDelay: "0ms" }}
        />
        <FinancialCard
          icon={TrendingUp}
          label="Total Income"
          value={formatCurrency(incomeTotal)}
          hint="All money coming in."
          accent="income"
          style={{ animationDelay: "70ms" }}
        />
        <FinancialCard
          icon={TrendingDown}
          label="Total Expenses"
          value={formatCurrency(expenseTotal)}
          hint="All money going out."
          accent="expense"
          style={{ animationDelay: "140ms" }}
        />
      </div>

      {!hasTransactions && <DashboardEmptyState />}

      {hasTransactions && (
        <>
          {/* Secondary bento area — spending breakdown + recent activity. */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard>
              <AnalyticsSection icon={PieChart} title="Spending Overview">
                {categoryBreakdown.length > 0 ? (
                  <SpendingChart data={categoryBreakdown} total={expenseTotal} />
                ) : (
                  <p className="py-10 text-center text-[13px] text-[var(--color-ink-soft)]">
                    No expenses recorded yet.
                  </p>
                )}
              </AnalyticsSection>
            </ChartCard>

            <ChartCard>
              <AnalyticsSection
                icon={ListOrdered}
                title="Category Summary"
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

            <ChartCard>
              <AnalyticsSection icon={History} title="Recent Transactions">
                <div className="flex flex-col">
                  {recentTransactions.map((transaction) => (
                    <RecentTransactionRow key={transaction.id} transaction={transaction} />
                  ))}
                </div>
                <a
                  href="#all-transactions"
                  className="mt-3 inline-flex items-center gap-1 text-[12.5px] font-semibold text-[var(--color-primary-dark)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  View all transactions
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </a>
              </AnalyticsSection>
            </ChartCard>
          </div>

          {/* Full transaction list — required filtering + detail navigation
              behavior, unchanged from before this redesign. */}
          <section id="all-transactions" className="scroll-mt-24">
            <AnalyticsSection
              icon={Receipt}
              title="All Transactions"
              hint={`${filteredTransactions.length} of ${transactions.length}`}
            >
              <FilterBar
                categories={categories}
                selectedCategory={categoryFilter}
                onCategoryChange={setCategoryFilter}
                selectedType={typeFilter}
                onTypeChange={setTypeFilter}
              />

              {!hasFilteredResults && (
                <div className="rounded-[var(--radius-card-lg)] border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-12 text-center">
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-ink)]/5">
                    <SearchX className="h-5 w-5 text-[var(--color-ink-soft)]" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-medium text-[var(--color-ink)]">No matching transactions</p>
                  <p className="mt-1 text-[13px] text-[var(--color-ink-soft)]">
                    Try a different category or type filter.
                  </p>
                </div>
              )}

              {hasFilteredResults && (
                <div className="flex flex-col gap-3">
                  {filteredTransactions.map((transaction, index) => (
                    <div
                      key={transaction.id}
                      className="animate-[fadeIn_0.25s_ease-out_backwards]"
                      style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
                    >
                      <TransactionCard transaction={transaction} />
                    </div>
                  ))}
                </div>
              )}
            </AnalyticsSection>
          </section>
        </>
      )}
    </div>
  );
}

export default Dashboard;
