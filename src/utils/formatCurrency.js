const currencyFormatter = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(amount) {
  const value = Number(amount);
  return currencyFormatter.format(Number.isFinite(value) ? value : 0);
}
