/**
 * A single labeled detail row (icon + label + value) used inside the
 * Transaction Overview Card — e.g. Category, Date, Notes.
 */
function TransactionInfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-ink-soft)] shadow-[var(--shadow-xs)]">
        {Icon && <Icon className="h-4 w-4" strokeWidth={2} />}
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">{label}</p>
        <p className="mt-0.5 break-words text-[14px] font-semibold leading-snug text-[var(--color-ink)]">{value}</p>
      </div>
    </div>
  );
}

export default TransactionInfoItem;
