import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function TransactionDetailHeader({ transaction }) {
  const isIncome = transaction.type === "income";
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-10">
      <Link
        to="/"
        className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-primary-dark)] transition-colors duration-200 hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to Transactions
      </Link>

      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">Transaction</p>
      <h1 className="font-display text-[34px] font-extrabold tracking-[-0.045em] text-[var(--color-ink)] sm:text-[42px]">
        {transaction.title || "Untitled transaction"}
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        {transaction.category || "Uncategorized"} · {isIncome ? "Income" : "Expense"} · {formattedDate}
      </p>
    </div>
  );
}

export default TransactionDetailHeader;
