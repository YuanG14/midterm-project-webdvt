import { Link } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

/**
 * Premium "Transaction Not Found" state, shown when the :id in the route
 * doesn't match any stored transaction. Kept separate from the shared
 * EmptyState (still used by Dashboard/Summary) so this redesign doesn't
 * change the appearance of those other pages.
 */
function TransactionNotFound() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="accent-rule mb-3" />
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
              Record
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Transaction Detail
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
              We couldn't find the transaction you're looking for.
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="animate-[fadeIn_0.4s_var(--ease-premium)] rounded-2xl border border-dashed border-[var(--color-border-soft)] bg-[var(--color-surface)] px-6 py-16 text-center shadow-[var(--shadow-xs)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-danger)]/10">
          <SearchX className="h-6 w-6 text-[var(--color-danger)]" strokeWidth={1.75} />
        </div>
        <p className="font-display text-base font-semibold text-[var(--color-ink)]">Transaction Not Found</p>
        <p className="mx-auto mt-1.5 max-w-sm text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]">
          This transaction may have been removed, or the link you followed is no longer valid.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default TransactionNotFound;
