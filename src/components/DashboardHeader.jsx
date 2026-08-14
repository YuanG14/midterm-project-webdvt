import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

/**
 * Dashboard-only header.
 */
function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="accent-rule mb-3" />
          <h1 className="font-display text-[26px] font-bold tracking-tight text-[var(--color-ink)] sm:text-[28px]">
            Dashboard
          </h1>
          <p className="mt-1.5 text-[14px] text-[var(--color-ink-soft)]">
            Your financial overview at a glance.
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/add" className="btn btn-primary">
            <PlusCircle className="h-4 w-4" strokeWidth={2} />
            Add Transaction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
