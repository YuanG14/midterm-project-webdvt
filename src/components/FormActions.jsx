import { Save, X } from "lucide-react";

function FormActions({ onCancel, submitting }) {
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
      <button
        type="button"
        onClick={onCancel}
        className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-5 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
        Cancel
      </button>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Save className="h-3.5 w-3.5" strokeWidth={2} />
        Save Transaction
      </button>
    </div>
  );
}

export default FormActions;
