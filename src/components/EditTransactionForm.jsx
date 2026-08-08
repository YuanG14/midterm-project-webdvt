import { useMemo, useState } from "react";
import { Calendar, Layers, Loader2, Pencil, Save, Tag, Trash2, TrendingUpDown, Wallet, X } from "lucide-react";
import FormSection from "./FormSection";
import InputField from "./InputField";
import TransactionTypeSelector from "./TransactionTypeSelector";
import CategorySelector from "./CategorySelector";
import {
  CATEGORIES_BY_TYPE,
  TITLE_MAX_LENGTH,
  NOTES_MAX_LENGTH,
  validateTransactionForm,
} from "../utils/transactionFormShared";

/**
 * Edit form for an existing transaction. Deliberately mirrors the Add
 * Transaction form's section order and field styling (Phase 3) — same
 * shared components (FormSection, InputField, TransactionTypeSelector,
 * CategorySelector), same field labels, same section grouping — so the
 * two forms feel like one consistent system rather than two separate
 * transaction-editing UIs.
 */
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

  const inputClasses =
    "w-full rounded-[var(--radius-control)] border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3.5 py-2.5 text-[14px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30";

  return (
    <div className="mt-6 animate-[fadeIn_0.4s_var(--ease-premium)]">
      <form
        onSubmit={handleSubmit}
        noValidate
        className="flex flex-col gap-8 rounded-[var(--radius-card-lg)] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] sm:p-8"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-canvas)] text-[var(--color-ink-soft)]">
            <Pencil className="h-4 w-4" strokeWidth={2} />
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-[0.08em] text-[var(--color-ink)]">
            Edit Transaction
          </h3>
        </div>

        {/* 1. Transaction type */}
        <FormSection
          icon={TrendingUpDown}
          title="Transaction Type"
          description="Is money coming in, or going out?"
        >
          <InputField label="Transaction Type" error={errors.type}>
            <TransactionTypeSelector value={type} onChange={handleTypeChange} />
          </InputField>
        </FormSection>

        <div className="border-t border-[var(--color-border-soft)]" />

        {/* 2. Financial information */}
        <FormSection
          icon={Wallet}
          title="Financial Information"
          description="What is this entry, and how much?"
        >
          <InputField label="Description" icon={Tag} htmlFor="edit-title" error={errors.title}>
            <input
              id="edit-title"
              type="text"
              value={title}
              maxLength={TITLE_MAX_LENGTH}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Grocery run, Freelance payment"
              className={inputClasses}
            />
          </InputField>

          <InputField label="Amount" htmlFor="edit-amount" error={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[var(--color-ink-soft)]">
                ₱
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
                className={`${inputClasses} pl-7`}
              />
            </div>
          </InputField>
        </FormSection>

        <div className="border-t border-[var(--color-border-soft)]" />

        {/* 3. Category / date / notes */}
        <FormSection
          icon={Layers}
          title="Details"
          description="Classify the entry so it shows up in the right places."
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InputField label="Category" icon={Tag} htmlFor="edit-category" error={errors.category}>
              <CategorySelector
                id="edit-category"
                value={category}
                onChange={setCategory}
                options={categoryOptions}
              />
            </InputField>

            <InputField label="Date" icon={Calendar} htmlFor="edit-date" error={errors.date}>
              <div className="relative">
                <Calendar
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]"
                  strokeWidth={2}
                />
                <input
                  id="edit-date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={`${inputClasses} pl-9`}
                />
              </div>
            </InputField>
          </div>

          <InputField
            label="Notes (optional)"
            htmlFor="edit-notes"
            hint={`${notes.length}/${NOTES_MAX_LENGTH}`}
          >
            <textarea
              id="edit-notes"
              rows={3}
              value={notes}
              maxLength={NOTES_MAX_LENGTH}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any extra detail worth remembering…"
              className={`${inputClasses} resize-none`}
            />
          </InputField>
        </FormSection>

        {/* Delete kept on the opposite side of the row from Cancel/Save so
            it's visually clear but not grouped with the primary actions. */}
        <div className="flex flex-col gap-3 border-t border-[var(--color-border-soft)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={onDeleteRequest}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-5 py-2.5 text-[13px] font-semibold text-[var(--color-danger)] transition-colors duration-200 hover:bg-[var(--color-danger)]/15 active:scale-[0.97]"
          >
            <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
            Delete Transaction
          </button>

          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-5 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)] active:scale-[0.97]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-raised)] active:scale-[0.97] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {submitting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
              ) : (
                <Save className="h-3.5 w-3.5" strokeWidth={2} />
              )}
              {submitting ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditTransactionForm;
