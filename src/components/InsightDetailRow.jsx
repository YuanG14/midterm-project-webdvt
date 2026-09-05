function InsightDetailRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 first:pt-0 last:pb-0">
      <span className="text-[12.5px] text-[var(--color-ink-soft)]">{label}</span>
      <span className="truncate text-[13px] font-semibold text-[var(--color-ink)]">{value}</span>
    </div>
  );
}

export default InsightDetailRow;
