// Single source of truth for the transaction table's column layout, so
// TransactionTableHeader and TransactionCard can never drift out of
// alignment with each other. Mobile (below sm) intentionally isn't part
// of this grid — rows collapse to a simple 3-column [icon / name+meta /
// amount] layout there instead, handled locally in each component.
export const TRANSACTION_GRID_COLS =
  "sm:grid-cols-[40px_minmax(0,2fr)_minmax(0,1fr)_88px_104px_112px]";
