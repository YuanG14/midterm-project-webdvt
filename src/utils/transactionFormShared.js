export const CATEGORIES_BY_TYPE = {
  expense: ["Food", "Transportation", "Shopping", "Bills", "Entertainment", "Education", "Healthcare", "Other"],
  income: ["Salary", "Freelance", "Business", "Investments", "Gift", "Other"],
};

export const TITLE_MAX_LENGTH = 60;
export const NOTES_MAX_LENGTH = 200;

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Shared validation rules for the Add and Edit transaction forms.
 * amount is expected as a string (raw input value).
 */
export function validateTransactionForm({ title, amount, category, type, date }) {
  const errors = {};

  if (!title.trim()) {
    errors.title = "Title cannot be empty.";
  }

  const numericAmount = Number(amount);
  if (amount.trim() === "" || Number.isNaN(numericAmount)) {
    errors.amount = "Amount is required.";
  } else if (numericAmount <= 0) {
    errors.amount = "Amount must be greater than zero.";
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
