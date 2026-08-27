/**
 * A single labeled detail row used inside the Transaction Overview Card
 * (Description, Category, Type, Date). Flat label-over-value rows rather
 * than individually bordered/boxed cards — reads as a scannable financial
 * record instead of a grid of decorative tiles.
 */
function TransactionInfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <span className="flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
        {Icon && <Icon className="h-3.5 w-3.5" strokeWidth={2} />}
        {label}
      </span>
      <p className="max-w-[65%] break-words text-right text-[14px] font-semibold leading-snug text-[var(--color-ink)]">
        {value}
      </p>
    </div>
  );
}

export default TransactionInfoItem;
