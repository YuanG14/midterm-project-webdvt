import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ledger-transactions";

function generateId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `txn_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

function isValidTransaction(value) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.id === "string" &&
    typeof value.title === "string" &&
    typeof value.amount === "number" &&
    !Number.isNaN(value.amount) &&
    typeof value.category === "string" &&
    (value.type === "income" || value.type === "expense") &&
    typeof value.date === "string" &&
    typeof value.notes === "string"
  );
}

function readStoredTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isValidTransaction);
  } catch {
    return [];
  }
}

export function useTransactions() {
  const [transactions, setTransactions] = useState(readStoredTransactions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch {
    }
  }, [transactions]);

  const addTransaction = useCallback((data) => {
    const transaction = {
      id: generateId(),
      title: data?.title ?? "",
      amount: Number(data?.amount) || 0,
      category: data?.category ?? "",
      type: data?.type === "income" ? "income" : "expense",
      date: data?.date ?? new Date().toISOString().slice(0, 10),
      notes: data?.notes ?? "",
    };

    setTransactions((prev) => [...prev, transaction]);
    return transaction;
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updates, id: transaction.id } : transaction
      )
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
  }, []);

  const getTransaction = useCallback(
    (id) => transactions.find((transaction) => transaction.id === id),
    [transactions]
  );

  const clearTransactions = useCallback(() => {
    setTransactions([]);
  }, []);

  const incomeTotal = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions]
  );

  const expenseTotal = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0),
    [transactions]
  );

  const balance = useMemo(() => incomeTotal - expenseTotal, [incomeTotal, expenseTotal]);

  return {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getTransaction,
    clearTransactions,
    incomeTotal,
    expenseTotal,
    balance,
  };
}
