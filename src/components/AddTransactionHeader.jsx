import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function AddTransactionHeader() {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--color-primary-dark)]">New ledger entry</p>
          <h1 className="font-display text-[34px] font-extrabold tracking-[-0.045em] text-[var(--color-ink)] sm:text-[42px]">
            Add a transaction
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            Record an income or expense and keep your balance accurate.
          </p>
        </div>

        <Link
          to="/"
          className="btn btn-secondary shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default AddTransactionHeader;
