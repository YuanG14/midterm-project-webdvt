import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";
import DashboardHeader from "../components/DashboardHeader";
import BalanceOverview from "../components/BalanceOverview";
import FilterBar from "../components/FilterBar";
import TransactionTableHeader from "../components/TransactionTableHeader";
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

      {!hasTransactions && <DashboardEmptyState />}

      {hasTransactions && (
        <section className="card card-lg overflow-hidden" aria-labelledby="transactions-heading">
          <div className="flex items-center justify-between gap-4 px-4 py-5 sm:px-6">
            <div>
              <h2 id="transactions-heading" className="font-display text-[16px] font-bold tracking-tight text-[var(--color-ink)]">
                All transactions
              </h2>
              <p className="mt-0.5 text-[12.5px] text-[var(--color-ink-soft)]">Your latest income and spending activity</p>
            </div>
            <span className="badge badge-neutral shrink-0">
              {filteredTransactions.length} {filteredTransactions.length === 1 ? "entry" : "entries"}
            </span>
          </div>

          <FilterBar
            categories={categories}
            selectedCategory={categoryFilter}
            onCategoryChange={setCategoryFilter}
            selectedType={typeFilter}
            onTypeChange={setTypeFilter}
          />

          {!hasFilteredResults ? (
            <div className="px-6 py-12 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-ink)]/5">
                <SearchX className="h-5 w-5 text-[var(--color-ink-soft)]" strokeWidth={1.75} />
              </div>
              <p className="text-sm font-semibold text-[var(--color-ink)]">No transactions found</p>
              <p className="mt-1 text-[13px] text-[var(--color-ink-soft)]">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="px-4 pb-2 pt-4 sm:px-6">
              <TransactionTableHeader />
              {filteredTransactions.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          )}
        </section>
      )}

      <Toast message={flash?.message} tone={flash?.tone} onDismiss={() => setFlash(null)} />
    </div>
  );
}

export default Dashboard;
