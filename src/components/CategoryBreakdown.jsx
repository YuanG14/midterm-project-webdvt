import { memo } from "react";
import { Tag } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { getCategoryIcon } from "../utils/categoryIcons";

function CategoryBreakdown({ data }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {data.map((entry, index) => {
        const Icon = getCategoryIcon(entry.category) ?? Tag;
        return (
          <li
            key={entry.category}
            style={{ animationDelay: `${index * 45}ms` }}
            className="animate-[fadeIn_0.4s_var(--ease-premium)_backwards] rounded-xl p-2.5 transition-colors duration-200 hover:bg-[var(--color-canvas)]"
          >
            <div className="mb-2 flex items-center justify-between gap-3 text-[13px]">
              <span className="flex min-w-0 items-center gap-2.5 font-semibold text-[var(--color-ink)]">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: `${entry.color}1a` }}
                  aria-hidden="true"
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: entry.color }} strokeWidth={2.25} />
                </span>
                <span className="truncate">{entry.category}</span>
              </span>
              <span className="shrink-0 text-right text-[var(--color-ink-soft)]">
                <span className="font-mono-tabular font-medium text-[var(--color-ink)]">
                  {formatCurrency(entry.amount)}
                </span>
                <span className="ml-1.5 font-mono-tabular text-[12px]">
                  {entry.percentage.toFixed(1)}%
                </span>
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-canvas)]">
              <div
                className="h-full rounded-full transition-all duration-700 ease-[var(--ease-premium)]"
                style={{ width: `${entry.percentage}%`, backgroundColor: entry.color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// Memoized: Summary re-renders on theme toggle; category data itself is stable.
export default memo(CategoryBreakdown);
