import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import PageHeader from "../components/PageHeader";
import TransactionDetailCard from "../components/TransactionDetailCard";
import EditTransactionForm from "../components/EditTransactionForm";
import ConfirmationModal from "../components/ConfirmationModal";
import EmptyState from "../components/EmptyState";
import { useTransactions } from "../hooks/useTransactions";

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const transaction = getTransaction(id);

  const backButton = (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
    >
      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
      Back to Dashboard
    </Link>
  );

  if (!transaction) {
    return (
      <div>
        <PageHeader
          eyebrow="Record"
          title="Transaction Detail"
          description="We couldn't find the transaction you're looking for."
          action={backButton}
        />
        <EmptyState
          icon={SearchX}
          title="Transaction Not Found"
          message="This transaction may have been deleted, or the link you followed is no longer valid."
          actionTo="/"
          actionLabel="Back to Dashboard"
        />
      </div>
    );
  }

  function handleSave(updates) {
    updateTransaction(transaction.id, updates);
    navigate("/");
  }

  function handleCancel() {
    navigate("/");
  }

  function handleConfirmDelete() {
    deleteTransaction(transaction.id);
    navigate("/");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Record"
        title="Transaction Detail"
        description="Review the full record, make changes, or remove this transaction."
        action={backButton}
      />

      <TransactionDetailCard transaction={transaction} />

      <EditTransactionForm
        transaction={transaction}
        onSave={handleSave}
        onCancel={handleCancel}
        onDeleteRequest={() => setConfirmingDelete(true)}
      />

      <ConfirmationModal
        open={confirmingDelete}
        title="Delete this transaction?"
        message="Are you sure you want to delete this transaction? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}

export default TransactionDetail;
