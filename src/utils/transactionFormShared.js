export const CATEGORIES_BY_TYPE = {
  expense: ["Food", "Transportation", "Shopping", "Bills", "Entertainment", "Education", "Healthcare", "Other"],
  income: ["Salary", "Freelance", "Business", "Investments", "Gift", "Other"],
};

export const TITLE_MAX_LENGTH = 60;
export const NOTES_MAX_LENGTH = 200;
export const MAX_TRANSACTION_AMOUNT = 999_999_999.99;
export const MIN_TRANSACTION_AMOUNT = 0.01;

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function validateAmount(amount) {
  const rawAmount = String(amount ?? "").trim();

  if (!rawAmount) {
    return "Amount is required.";
  }

  if (!/^\d+(?:\.\d{0,2})?$/.test(rawAmount)) {
    return "Enter a valid amount with up to 2 decimal places.";
  }

  const numericAmount = Number(rawAmount);

  if (!Number.isFinite(numericAmount)) {
    return "Enter a valid amount.";
  }

  if (numericAmount < MIN_TRANSACTION_AMOUNT) {
    return `Amount must be at least ₱${MIN_TRANSACTION_AMOUNT.toFixed(2)}.`;
  }

  if (numericAmount > MAX_TRANSACTION_AMOUNT) {
    return "Amount cannot exceed ₱999,999,999.99.";
  }

  return "";
}

export function validateTransactionForm({ title, amount, category, type, date }) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Title cannot be empty.";
  }

  const amountError = validateAmount(amount);
  if (amountError) {
    errors.amount = amountError;
  }

  if (!category) {
    errors.category = "Please select a category.";
  }

  if (type !== "income" && type !== "expense") {
    errors.type = "Please select a transaction type.";
  }

  if (!date || Number.isNaN(new Date(date).getTime())) {
    errors.date = "Please enter a valid date.";
  }

  return errors;
}
