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
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-[var(--color-primary-dark)]">
            <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
            {today}
          </p>
          <h1 className="font-display text-[28px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)] sm:text-[34px]">
            Welcome back
          </h1>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)] sm:text-[14px]">
            Here’s a clear view of your money and recent activity.
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/add" className="btn btn-primary">
            <Plus className="h-4 w-4" strokeWidth={2.25} />
            Add Transaction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
