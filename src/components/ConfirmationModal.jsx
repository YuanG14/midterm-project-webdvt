import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";

function ConfirmationModal({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") onCancel();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-ink)]/40 px-4 backdrop-blur-sm"
      role="presentation"
      onClick={onCancel}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_-6px_rgba(16,21,28,0.25)] animate-[fadeIn_0.15s_ease-out]"
      >
        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-danger)]/10">
          <AlertTriangle className="h-5 w-5 text-[var(--color-danger)]" strokeWidth={2} />
        </div>

        <h2 id="confirmation-modal-title" className="font-display text-base font-semibold text-[var(--color-ink)]">
          {title}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">{message}</p>

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-4 py-2 text-[13px] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--color-border-soft)]/60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-danger)] px-4 py-2 text-[13px] font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
