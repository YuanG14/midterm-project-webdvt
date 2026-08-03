/**
 * Consistent section heading for the Summary analytics dashboard —
 * an icon chip, a title, and an optional trailing hint (e.g. a count).
 * Purely presentational; used to replace the repeated ad-hoc <p> labels
 * that previously sat above each Summary section.
 */
function AnalyticsSection({ icon: Icon, title, hint, children, className = "" }) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {Icon && (
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-ink)]/[0.06]">
              <Icon className="h-3.5 w-3.5 text-[var(--color-ink-soft)]" strokeWidth={2.25} />
            </span>
          )}
          <p className="font-display text-sm font-semibold text-[var(--color-ink)]">{title}</p>
        </div>
        {hint && (
          <span className="text-[12px] font-medium text-[var(--color-ink-soft)]">{hint}</span>
        )}
      </div>
      {children}
    </section>
  );
}

export default AnalyticsSection;
