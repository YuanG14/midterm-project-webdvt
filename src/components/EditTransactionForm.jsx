import { useMemo, useState } from "react";
import FormField from "./FormField";
import TypeToggle from "./TypeToggle";
import FormActions from "./FormActions";
import {
  CATEGORIES_BY_TYPE,
  TITLE_MAX_LENGTH,
  NOTES_MAX_LENGTH,
  validateTransactionForm,
} from "../utils/transactionFormShared";

function EditTransactionForm({ transaction, onSave, onCancel, onDeleteRequest }) {
  const [type, setType] = useState(transaction.type);
  const [title, setTitle] = useState(transaction.title);
  const [amount, setAmount] = useState(String(transaction.amount));
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date);
  const [notes, setNotes] = useState(transaction.notes ?? "");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const categoryOptions = useMemo(() => CATEGORIES_BY_TYPE[type] ?? [], [type]);

  function handleTypeChange(nextType) {
    setType(nextType);
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
    onSave({
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      date,
      notes: notes.trim(),
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mt-6 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_1px_2px_rgba(16,21,28,0.04),0_8px_24px_-12px_rgba(16,21,28,0.08)] sm:p-8"
    >
      <h3 className="mb-6 font-display text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
        Edit Transaction
      </h3>

      <div className="flex flex-col gap-6">
        <FormField label="Transaction Type" error={errors.type}>
          <TypeToggle value={type} onChange={handleTypeChange} />
        </FormField>

        <FormField label="Title" htmlFor="edit-title" error={errors.title}>
          <input
            id="edit-title"
            type="text"
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g. Grocery run, Freelance payment"
            className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          />
        </FormField>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField label="Amount" htmlFor="edit-amount" error={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] text-[var(--color-ink-soft)]">
                $
              </span>
              <input
                id="edit-amount"
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

          <FormField label="Date" htmlFor="edit-date" error={errors.date}>
            <input
              id="edit-date"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
          </FormField>
        </div>

        <FormField label="Category" htmlFor="edit-category" error={errors.category}>
          <select
            id="edit-category"
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

        <FormField label="Notes (optional)" htmlFor="edit-notes" hint={`${notes.length}/${NOTES_MAX_LENGTH}`}>
          <textarea
            id="edit-notes"
            rows={3}
            value={notes}
            maxLength={NOTES_MAX_LENGTH}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Any extra detail worth remembering…"
            className="w-full resize-none rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
          />
        </FormField>

        <div className="mt-2 border-t border-[var(--color-border-soft)] pt-6">
          <FormActions onCancel={onCancel} submitting={submitting} onDelete={onDeleteRequest} />
        </div>
      </div>
    </form>
  );
}

export default EditTransactionForm;
