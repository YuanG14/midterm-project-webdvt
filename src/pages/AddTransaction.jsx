import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TransactionForm from "../components/TransactionForm";

function AddTransaction() {
  return (
    <div>
      <PageHeader
        eyebrow="New Entry"
        title="Add Transaction"
        description="Log a new income or expense entry to keep your ledger up to date."
        action={
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to Dashboard
          </Link>
        }
      />
      <TransactionForm />
    </div>
  );
}

export default AddTransaction;
