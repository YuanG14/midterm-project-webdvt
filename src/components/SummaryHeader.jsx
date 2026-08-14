/**
 * Summary-only header. Same restrained scale as the Add Transaction
 * (Phase 4) and Transaction Detail (Phase 5) headers — accent-rule, a
 * modest heading, one line of supporting copy — rather than the old
 * icon-tile analytics-dashboard hero.
 */
function SummaryHeader() {
  return (
    <div className="mb-8">
      <span className="accent-rule mb-3" aria-hidden="true" />
      <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--color-ink)] sm:text-[28px]">
        Summary
      </h1>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
        Review your spending and financial activity.
      </p>
    </div>
  );
}

export default SummaryHeader;
