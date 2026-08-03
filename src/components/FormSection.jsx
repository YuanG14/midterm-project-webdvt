/**
 * Groups related fields under a small labeled heading (e.g. "Transaction
 * Details", "Financial Information"). Presentational only — used by the
 * Add Transaction form to break the card into scannable sections.
 */
function FormSection({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2.5">
        {Icon && (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-canvas)] text-[var(--color-ink-soft)]">
            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        )}
        <div>
          <h3 className="font-display text-[12.5px] font-bold uppercase tracking-[0.08em] text-[var(--color-ink)]">
            {title}
          </h3>
          {description && <p className="text-[12px] text-[var(--color-ink-soft)]">{description}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

export default FormSection;
