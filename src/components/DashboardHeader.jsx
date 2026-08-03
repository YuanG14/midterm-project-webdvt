import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import GradientMesh from "./GradientMesh";

/**
 * Premium Dashboard-only header. Kept separate from the shared PageHeader
 * (used by Add Transaction / Transaction Detail / Summary) so this redesign
 * doesn't change those other pages.
 */
function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="relative mb-10">
      <GradientMesh />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
            {today}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Welcome back
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            Here's your financial overview — balances, recent activity, and spending trends, all in one place.
          </p>
        </div>
        <div className="shrink-0">
          <Link
            to="/add"
            className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-ink)] px-4 py-2.5 text-[13px] font-semibold text-[var(--color-canvas)] shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
          >
            <PlusCircle className="h-4 w-4" strokeWidth={2} />
            Add Transaction
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DashboardHeader;
