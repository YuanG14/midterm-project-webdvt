const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Formats a number as currency, e.g. formatCurrency(12500) -> "₱12,500.00".
 * Used everywhere an amount is displayed so formatting stays consistent
 * across the whole app.
 */
export function formatCurrency(amount) {
  const value = Number(amount);
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}
