import { memo } from "react";
import { formatCurrency } from "../utils/formatCurrency";

function CategoryBreakdown({ data }) {
  return (
    <ul className="flex flex-col gap-4">
      {data.map((entry) => (
        <li key={entry.category}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
            <span className="flex min-w-0 items-center gap-2 font-semibold text-[var(--color-ink)]">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: entry.color }}
                aria-hidden="true"
              />
              <span className="truncate">{entry.category}</span>
            </span>
            <span className="shrink-0 text-[var(--color-ink-soft)]">
              {formatCurrency(entry.amount)}
              <span className="ml-1.5 font-mono-tabular text-[12px] text-[var(--color-ink-soft)]">
                ({entry.percentage.toFixed(1)}%)
              </span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-canvas)]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${entry.percentage}%`, backgroundColor: entry.color }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

// Memoized: Summary re-renders on theme toggle; category data itself is stable.
export default memo(CategoryBreakdown);
