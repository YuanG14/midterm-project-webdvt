import { memo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../utils/formatCurrency";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: entry } = payload[0];

  return (
    <div className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-2 text-[12.5px] shadow-[var(--shadow-float)]">
      <p className="flex items-center gap-1.5 font-semibold text-[var(--color-ink)]">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: entry?.color }}
          aria-hidden="true"
        />
        {name}
      </p>
      <p className="mt-0.5 text-[var(--color-ink-soft)]">
        {formatCurrency(value)}
        {typeof entry?.percentage === "number" && (
          <span className="ml-1.5 font-mono-tabular text-[12px]">
            ({entry.percentage.toFixed(1)}%)
          </span>
        )}
      </p>
    </div>
  );
}

/**
 * Renders the expense-by-category donut. `total` is only used to render
 * the center label — it does not affect how the chart itself is computed.
 *
 * `activeCategory` / `onActiveCategoryChange` let this chart and the
 * adjacent CategoryBreakdown list highlight the same category together:
 * hovering a slice here dims the others (handled below), and hovering a
 * row in the list dims slices here too, via the same shared state living
 * in the Summary page. Purely visual — doesn't touch chart data/calcs.
 */
function SpendingChart({ data, total, activeCategory, onActiveCategoryChange }) {
  return (
    <div className="relative h-64 w-full sm:h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            innerRadius="62%"
            outerRadius="90%"
            paddingAngle={2}
            stroke="var(--color-surface)"
            strokeWidth={2}
            animationDuration={700}
            animationEasing="ease-out"
            onMouseEnter={(entry) => onActiveCategoryChange?.(entry?.payload?.category ?? entry?.category)}
            onMouseLeave={() => onActiveCategoryChange?.(null)}
          >
            {data.map((entry) => (
              <Cell
                key={entry.category}
                fill={entry.color}
                opacity={activeCategory && activeCategory !== entry.category ? 0.35 : 1}
                style={{ transition: "opacity 150ms ease-out" }}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {typeof total === "number" && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--color-ink-soft)]">
            Total Spent
          </p>
          <p className="mt-1 font-display font-mono-tabular text-lg font-bold text-[var(--color-ink)]">
            {formatCurrency(total)}
          </p>
        </div>
      )}
    </div>
  );
}

// Memoized: the recharts PieChart is the most expensive render on the
// Summary page. Without memo it re-renders on every Summary re-render
// (e.g. a theme toggle) even though `data` hasn't changed.
export default memo(SpendingChart);
