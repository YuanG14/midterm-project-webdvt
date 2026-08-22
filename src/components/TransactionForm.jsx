import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTransactions } from "../hooks/useTransactions";
import { Calendar, FileText, Loader2, Notebook, PlusCircle, Tag } from "lucide-react";
import FormSection from "./FormSection";
import InputField from "./InputField";
import TransactionTypeSelector from "./TransactionTypeSelector";
import CategorySelector from "./CategorySelector";
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

    navigate("/", { state: { flash: { message: "Transaction added.", tone: "success" } } });
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <div className="mx-auto max-w-2xl animate-[fadeIn_0.4s_var(--ease-premium)]">
      <form onSubmit={handleSubmit} noValidate className="card card-padded flex flex-col gap-6">
        <FormSection
          icon={FileText}
          title="Transaction Details"
          description="What is this entry, and how much?"
        >
          <InputField label="Title" icon={FileText} htmlFor="title" error={errors.title}>
            <input
              id="title"
              type="text"
              value={title}
              maxLength={TITLE_MAX_LENGTH}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Grocery run, Freelance payment"
              className={`field-input ${errors.title ? "field-error-state" : ""}`}
            />
          </InputField>

          <InputField label="Amount" htmlFor="amount" error={errors.amount}>
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[var(--color-ink-soft)]">
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
                className={`field-input pl-7 font-mono-tabular text-[15px] font-semibold ${
                  errors.amount ? "field-error-state" : ""
                }`}
              />
            </div>
          </InputField>
        </FormSection>

        <div className="border-t border-[var(--color-border-soft)]" />

        <FormSection
          icon={Tag}
          title="Financial Information"
          description="Classify the entry so it shows up in the right places."
        >
          <InputField label="Transaction Type" error={errors.type}>
            <TransactionTypeSelector value={type} onChange={handleTypeChange} />
          </InputField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <InputField label="Category" icon={Tag} htmlFor="category" error={errors.category}>
              <CategorySelector
                id="category"
                value={category}
                onChange={setCategory}
                options={categoryOptions}
              />
            </InputField>

            <InputField label="Date" icon={Calendar} htmlFor="date" error={errors.date}>
              <div className="relative">
                <Calendar
                  className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-ink-soft)]"
                  strokeWidth={2}
                />
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className={`field-input pl-9 ${errors.date ? "field-error-state" : ""}`}
                />
              </div>
            </InputField>
          </div>
        </FormSection>

        <div className="border-t border-[var(--color-border-soft)]" />

        <FormSection icon={Notebook} title="Additional Notes" description="Optional — anything worth remembering.">
          <InputField
            label="Notes (optional)"
            icon={Notebook}
            htmlFor="notes"
            hint={`${notes.length}/${NOTES_MAX_LENGTH}`}
          >
            <textarea
              id="notes"
              rows={3}
              value={notes}
              maxLength={NOTES_MAX_LENGTH}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Any extra detail worth remembering…"
              className="field-textarea"
            />
          </InputField>
        </FormSection>

        <div className="flex flex-col-reverse gap-3 border-t border-[var(--color-border-soft)] pt-6 sm:flex-row sm:justify-end">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn btn-primary">
            {submitting ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2} />
            ) : (
              <PlusCircle className="h-3.5 w-3.5" strokeWidth={2} />
            )}
            {submitting ? "Saving…" : "Save Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
