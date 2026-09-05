export function formatShortDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatRelativeDayLabel(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const startOfDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const dayDiff = Math.round((startOfToday - startOfDate) / 86_400_000);

  if (dayDiff === 0) return "Today";
  if (dayDiff === 1) return "Yesterday";

  return formatShortDate(dateString);
}

export function groupTransactionsByDay(transactions) {
  const groups = [];
  const indexByLabel = new Map();

  for (const transaction of transactions) {
    const label = formatRelativeDayLabel(transaction.date);
    if (!indexByLabel.has(label)) {
      indexByLabel.set(label, groups.length);
      groups.push({ label, transactions: [] });
    }
    groups[indexByLabel.get(label)].transactions.push(transaction);
  }

  return groups;
}
