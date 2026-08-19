import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Add-Transaction-only header. Deliberately more restrained than
 * PageHeader/DashboardHeader/SummaryHeader (no icon tile, one step down in
 * type size, no eyebrow) since this is a single-task form screen rather than
 * a workspace landing page — but it keeps the same accent-rule + heading +
 * supporting-copy anatomy as those headers so it still reads as part of the
 * same app rather than a foreign screen.
 */
function AddTransactionHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-primary-dark)]">New entry</p>
          <h1 className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] sm:text-[34px]">
            Add Transaction
          </h1>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
            Record a new income or expense.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3.5 py-2 text-[12.5px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AddTransactionHeader;
