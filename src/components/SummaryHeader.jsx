/**
 * Summary-only header. Same restrained scale as the Add Transaction
 * (Phase 4) and Transaction Detail (Phase 5) headers — accent-rule, a
 * modest heading, one line of supporting copy — rather than the old
 * icon-tile analytics-dashboard hero.
 */
function SummaryHeader() {
  return (
    <div className="mb-8">
      <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">Analytics</p>
      <h1 className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] sm:text-[34px]">
        Financial summary
      </h1>
      <p className="mt-1.5 max-w-xl text-[13.5px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[14px]">
        Understand where your money goes and spot the patterns that matter.
      </p>
    </div>
  );
}

export default SummaryHeader;
