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

  const transaction = getTransaction(id);

  if (!transaction) {
    return <TransactionNotFound />;
  }

  function handleSave(updates) {
    updateTransaction(transaction.id, updates);
    navigate("/", { state: { flash: { message: "Transaction updated.", tone: "success" } } });
  }

  function handleCancel() {
    navigate("/");
  }

  function handleConfirmDelete() {
    deleteTransaction(transaction.id);
    navigate("/", { state: { flash: { message: "Transaction deleted.", tone: "danger" } } });
  }

  return (
    <div>
      <TransactionDetailHeader transaction={transaction} />

      <TransactionOverviewCard transaction={transaction} />

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
