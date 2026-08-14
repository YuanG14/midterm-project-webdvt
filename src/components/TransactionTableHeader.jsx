import { TRANSACTION_GRID_COLS } from "../utils/transactionTableGrid";

/**
 * Column labels for the desktop/tablet transaction table. Hidden below
 * `sm` — mobile rows use their own compact 2-line layout instead, so a
 * column header wouldn't line up with anything there.
 */
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
