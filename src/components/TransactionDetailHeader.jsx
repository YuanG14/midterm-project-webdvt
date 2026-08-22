import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Transaction-Detail-only header. A subtle back-link sits above a compact
 * eyebrow + heading, then the transaction's own identity (name, category,
 * type, date) — deliberately the same restrained scale as
 * AddTransactionHeader (Phase 4) rather than the old icon-tile hero, so the
 * two screens read as the same application.
 */
function TransactionDetailHeader({ transaction }) {
  const isIncome = transaction.type === "income";
  const formattedDate = new Date(transaction.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-8">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[var(--color-primary-dark)] transition-colors duration-200 hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
        Back to Transactions
      </Link>

      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">Transaction</p>
      <h1 className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] sm:text-[34px]">
        {transaction.title || "Untitled transaction"}
      </h1>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        {transaction.category || "Uncategorized"} · {isIncome ? "Income" : "Expense"} · {formattedDate}
      </p>
    </div>
  );
}

export default TransactionDetailHeader;
