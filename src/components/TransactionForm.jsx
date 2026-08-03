import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import FormField from "./FormField";
import TypeToggle from "./TypeToggle";
import FormActions from "./FormActions";
import {
  CATEGORIES_BY_TYPE,
  TITLE_MAX_LENGTH,
  NOTES_MAX_LENGTH,
  todayISO,
  validateTransactionForm,
} from "../utils/transactionFormShared";

function TransactionForm() {
  const { addTransaction } = useTransactions();
  const navigate = useNavigate();

  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(todayISO);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categoryOptions = useMemo(() => CATEGORIES_BY_TYPE[type] ?? [], [type]);

  function handleTypeChange(nextType) {
    setType(nextType);
    // Reset category if it doesn't belong to the newly selected type's list.
    setCategory((prevCategory) =>
      CATEGORIES_BY_TYPE[nextType]?.includes(prevCategory) ? prevCategory : ""
    );
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateTransactionForm({ title, amount, category, type, date });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSubmitting(true);
    addTransaction({
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      date,
      notes: notes.trim(),
    });

    navigate("/");
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <div className="flex flex-col gap-6">
        <FormField label="Transaction Type" error={errors.type}>
          <TypeToggle value={type} onChange={handleTypeChange} />
        </FormField>

        <FormField label="Title" htmlFor="title" error={errors.title}>
          <input
            id="title"
            type="text"
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Grocery run, Freelance payment"
            className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField label="Amount" htmlFor="amount" error={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[var(--color-ink-soft)]">
                ₱
              </span>
              <input
                id="amount"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                placeholder="0.00"
                className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] py-2.5 pl-7 pr-3.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              />
            </div>
          </FormField>

          <FormField label="Date" htmlFor="date" error={errors.date}>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
          </FormField>
        </div>

        <FormField label="Category" htmlFor="category" error={errors.category}>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full cursor-pointer rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          >
            <option value="">Select a category…</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Notes (optional)" htmlFor="notes" hint={`${notes.length}/${NOTES_MAX_LENGTH}`}>
          <textarea
            id="notes"
            rows={3}
            value={notes}
            maxLength={NOTES_MAX_LENGTH}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Any extra detail worth remembering…"
            className="w-full resize-none rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          />
        </FormField>

        <div className="mt-2 border-t border-[var(--color-border-soft)] pt-6">
          <FormActions onCancel={handleCancel} submitting={submitting} />
        </div>
      </div>
    </form>
  );
}

export default TransactionForm;
