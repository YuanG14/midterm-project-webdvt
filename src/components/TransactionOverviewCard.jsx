import { Calendar, Pencil, Tag, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import TransactionInfoItem from "./TransactionInfoItem";

function TransactionOverviewCard({ transaction, onEdit, onDeleteRequest }) {
  const isIncome = transaction.type === "income";

  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.4s_var(--ease-premium)]">
      <div className="card card-padded flex flex-col gap-6">
        
        <div>
          <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
            Amount
          </p>
          <p
            className={`font-mono-tabular mt-1 text-[34px] font-bold tracking-tight sm:text-[38px] ${
              isIncome ? "text-[var(--color-income-dark)]" : "text-[var(--color-danger)]"
            }`}
          >
            {isIncome ? "+" : "-"}
            {formatCurrency(Math.abs(transaction.amount))}
          </p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
              isIncome
                ? "bg-[var(--color-income)]/10 text-[var(--color-income-dark)]"
                : "bg-[var(--color-danger)]/10 text-[var(--color-danger)]"
            }`}
          >
            {isIncome ? <TrendingUp className="h-3 w-3" strokeWidth={2.25} /> : <TrendingDown className="h-3 w-3" strokeWidth={2.25} />}
            {isIncome ? "Income" : "Expense"}
          </span>
        </div>

        <div className="border-t border-[var(--color-border-soft)]" />

        
        <div>
          <h3 className="font-display mb-1 text-[12.5px] font-bold uppercase tracking-[0.08em] text-[var(--color-ink)]">
            Transaction Information
          </h3>
          <div className="divide-y divide-[var(--color-border-soft)]">
            <TransactionInfoItem icon={Tag} label="Category" value={transaction.category || "Uncategorized"} />
            <TransactionInfoItem
              icon={isIncome ? TrendingUp : TrendingDown}
              label="Type"
              value={isIncome ? "Income" : "Expense"}
            />
            <TransactionInfoItem icon={Calendar} label="Date" value={formattedDate} />
            {transaction.notes && (
              <TransactionInfoItem label="Description" value={transaction.notes} />
            )}
          </div>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border-soft)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onDeleteRequest} className="btn btn-danger">
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            Delete Transaction
          </button>
          <button type="button" onClick={onEdit} className="btn btn-primary">
            <Pencil className="h-3.5 w-3.5" strokeWidth={2} />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransactionOverviewCard;
