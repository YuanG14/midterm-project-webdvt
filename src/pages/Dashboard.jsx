import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wallet, TrendingUp, TrendingDown, PlusCircle } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SummaryCard from "../components/SummaryCard";
import FilterBar from "../components/FilterBar";
import TransactionCard from "../components/TransactionCard";
import EmptyState from "../components/EmptyState";
import { useTransactions } from "../hooks/useTransactions";
import { formatCurrency } from "../utils/formatCurrency";

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

  const hasTransactions = transactions.length > 0;
  const hasFilteredResults = filteredTransactions.length > 0;

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="A quick snapshot of your balances, recent activity, and spending trends."
        action={
          <Link
            to="/add"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" strokeWidth={2} />
            Add Transaction
          </Link>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={Wallet}
          label="Current Balance"
          value={formatCurrency(balance)}
          hint="Income minus expenses, updated in real time."
          accent="balance"
        />
        <SummaryCard
          icon={TrendingUp}
          label="Total Income"
          value={formatCurrency(incomeTotal)}
          hint="All money coming in."
          accent="income"
        />
        <SummaryCard
          icon={TrendingDown}
          label="Total Expenses"
          value={formatCurrency(expenseTotal)}
          hint="All money going out."
          accent="expense"
        />
      </div>

      {hasTransactions && (
        <FilterBar
          categories={categories}
          selectedCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          selectedType={typeFilter}
          onTypeChange={setTypeFilter}
        />
      )}

      {!hasTransactions && (
        <EmptyState
          icon={Wallet}
          title="No transactions yet"
          message="No transactions yet. Start tracking your finances by adding your first transaction."
        />
      )}

      {hasTransactions && !hasFilteredResults && (
        <div className="rounded-2xl border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-12 text-center">
          <p className="text-sm font-medium text-[var(--color-ink)]">No matching transactions</p>
          <p className="mt-1 text-[13px] text-[var(--color-ink-soft)]">
            Try a different category or type filter.
          </p>
        </div>
      )}

      {hasTransactions && hasFilteredResults && (
        <div className="flex flex-col gap-3">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
