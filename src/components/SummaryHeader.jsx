/**
 * Summary-only header. Same restrained scale as the Add Transaction
 * (Phase 4) and Transaction Detail (Phase 5) headers — accent-rule, a
 * modest heading, one line of supporting copy — rather than the old
 * icon-tile analytics-dashboard hero.
 */
function SummaryHeader() {
  return (
    <div className="mb-10">
      <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">Analytics</p>
      <h1 className="font-display text-[34px] font-extrabold tracking-[-0.045em] text-[var(--color-ink)] sm:text-[42px]">
        Financial summary
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        Understand where your money goes and spot the patterns that matter.
      </p>
    </div>
  );
}

export default SummaryHeader;
