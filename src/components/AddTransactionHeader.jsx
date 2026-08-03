import { Link } from "react-router-dom";
import { ArrowLeft, ReceiptText } from "lucide-react";
import GradientMesh from "./GradientMesh";

/**
 * Premium Add-Transaction-only header. Kept separate from the shared
 * PageHeader (still used by Transaction Detail / Summary) so this redesign
 * doesn't change the appearance of those other pages.
 */
function AddTransactionHeader() {
  return (
    <div className="relative mb-10">
      <GradientMesh />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] shadow-[var(--shadow-xs)] sm:flex">
            <ReceiptText className="h-5.5 w-5.5 text-white" strokeWidth={2} />
          </div>
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
              New Entry
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
              Add Transaction
            </h1>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
              Track your income and expenses to better understand your finances.
            </p>
          </div>
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
  );
}

export default AddTransactionHeader;
