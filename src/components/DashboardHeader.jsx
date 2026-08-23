import { Link } from "react-router-dom";
import { CalendarDays, Plus } from "lucide-react";

/**
 * Dashboard-only header.
 */
function DashboardHeader() {
  const today = new Intl.DateTimeFormat("en-PH", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="mb-7 sm:mb-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-[var(--color-primary-dark)]">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
            {today}
          </p>
          <h1 className="max-w-3xl font-display text-[34px] font-extrabold leading-[1.06] tracking-[-0.045em] text-[var(--color-ink)] sm:text-[44px]">
            Your money, in focus.
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            Review your balance, understand your cash flow, and keep every transaction accounted for.
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/add" className="btn btn-primary btn-lg">
            <Plus className="h-4 w-4" strokeWidth={2.25} />
            Add Transaction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
