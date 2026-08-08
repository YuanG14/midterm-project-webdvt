import { ChartSpline } from "lucide-react";

/**
 * Premium Summary-only header. Kept separate from the shared PageHeader
 * so this redesign doesn't change the appearance of any other page.
 */
function SummaryHeader() {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-start gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] sm:flex">
          <ChartSpline className="h-5.5 w-5.5 text-white" strokeWidth={2} />
        </div>
        <div>
          <span className="accent-rule mb-3" />
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
            Insights
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
            Financial Summary
          </h1>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
            Understand your spending habits and track your financial progress, calculated from your
            transaction history.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SummaryHeader;
