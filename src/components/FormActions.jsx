import { Save, Trash2, X } from "lucide-react";

function FormActions({ onCancel, submitting, onDelete, deleteLabel = "Delete Transaction" }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10 px-5 py-2.5 text-[13px] font-semibold text-[var(--color-danger)] transition-colors duration-200 hover:bg-[var(--color-danger)]/15"
        >
          <Trash2 className="h-3.5 w-3.5" strokeWidth={2} />
          {deleteLabel}
        </button>
      ) : (
        <span />
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
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
    </div>
  );
}

export default FormActions;
