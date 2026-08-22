import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TransactionDetailHeader from "../components/TransactionDetailHeader";
import TransactionOverviewCard from "../components/TransactionOverviewCard";
import TransactionNotFound from "../components/TransactionNotFound";
import EditTransactionForm from "../components/EditTransactionForm";
import ConfirmationModal from "../components/ConfirmationModal";
import { useTransactions } from "../hooks/useTransactions";

function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTransaction, updateTransaction, deleteTransaction } = useTransactions();
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  // View/edit is purely a presentation toggle — onSave/onDelete still call the
  // exact same hook functions they always did; this just decides whether the
  // read-only overview or the edit form is what's on screen right now.
  const [isEditing, setIsEditing] = useState(false);

  const transaction = getTransaction(id);

  if (!transaction) {
    return <TransactionNotFound />;
  }

  function handleSave(updates) {
    updateTransaction(transaction.id, updates);
    navigate("/", { state: { flash: { message: "Transaction updated.", tone: "success" } } });
  }

  function handleConfirmDelete() {
    deleteTransaction(transaction.id);
    navigate("/", { state: { flash: { message: "Transaction deleted.", tone: "danger" } } });
  }

  return (
    <div>
      <TransactionDetailHeader transaction={transaction} />

      {isEditing ? (
        <EditTransactionForm
          transaction={transaction}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <TransactionOverviewCard
          transaction={transaction}
          onEdit={() => setIsEditing(true)}
          onDeleteRequest={() => setConfirmingDelete(true)}
        />
      )}

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
