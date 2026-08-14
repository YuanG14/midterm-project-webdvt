import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import BalanceOverview from "../components/BalanceOverview";
import FilterBar from "../components/FilterBar";
import TransactionCard from "../components/TransactionCard";
import DashboardEmptyState from "../components/DashboardEmptyState";
import Toast from "../components/Toast";
import { useTransactions } from "../hooks/useTransactions";

function Dashboard() {
  const { transactions, incomeTotal, expenseTotal, balance } = useTransactions();
  const location = useLocation();
  const navigate = useNavigate();

  // Add/Edit/Delete land back here with a one-time `flash` message in
  // router state (see TransactionForm and TransactionDetail). Read it once
  // into local state, then clear it from history so refreshing or using
  // the browser's back/forward buttons doesn't replay the toast.
  const [flash, setFlash] = useState(location.state?.flash ?? null);

  useEffect(() => {
    if (location.state?.flash) {
      navigate(location.pathname, { replace: true, state: {} });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

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
      <DashboardHeader />

      <BalanceOverview balance={balance} incomeTotal={incomeTotal} expenseTotal={expenseTotal} />

      {hasTransactions && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-[15px] font-semibold text-[var(--color-ink)]">All Transactions</h2>
          <span className="text-[12.5px] text-[var(--color-ink-soft)]">
            {filteredTransactions.length} {filteredTransactions.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      )}

      {hasTransactions && (
        <FilterBar
          categories={categories}
          selectedCategory={categoryFilter}
          onCategoryChange={setCategoryFilter}
          selectedType={typeFilter}
          onTypeChange={setTypeFilter}
        />
      )}

      {!hasTransactions && <DashboardEmptyState />}

      {hasTransactions && !hasFilteredResults && (
        <div className="rounded-[var(--radius-card-lg)] border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-10 text-center">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-ink)]/5">
            <SearchX className="h-5 w-5 text-[var(--color-ink-soft)]" strokeWidth={1.75} />
          </div>
          <p className="text-sm font-medium text-[var(--color-ink)]">No matching transactions</p>
          <p className="mt-1 text-[13px] text-[var(--color-ink-soft)]">
            Try a different category or type filter.
          </p>
        </div>
      )}

      {hasTransactions && hasFilteredResults && (
        <div className="card card-padded">
          {filteredTransactions.map((transaction) => (
            <TransactionCard key={transaction.id} transaction={transaction} />
          ))}
        </div>
      )}

      <Toast message={flash?.message} tone={flash?.tone} onDismiss={() => setFlash(null)} />
    </div>
  );
}

export default Dashboard;
