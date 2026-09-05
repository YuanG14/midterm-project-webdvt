import { TRANSACTION_GRID_COLS } from "../utils/transactionTableGrid";

function TransactionTableHeader() {
  return (
    <div
      className={`hidden items-center gap-4 px-1 pb-3 sm:grid ${TRANSACTION_GRID_COLS}`}
    >
      <span aria-hidden="true" />
      <span className="text-eyebrow">Transaction</span>
      <span className="text-eyebrow">Category</span>
      <span className="text-eyebrow">Type</span>
      <span className="text-eyebrow">Date</span>
      <span className="text-eyebrow text-right">Amount</span>
    </div>
  );
}

export default TransactionTableHeader;
