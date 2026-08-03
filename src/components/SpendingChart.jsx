import { memo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatCurrency } from "../utils/formatCurrency";

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const { name, value } = payload[0];

  return (
    <div className="rounded-lg border border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-2 text-[12.5px] shadow-[0_8px_20px_-8px_rgba(16,21,28,0.25)]">
      <p className="font-semibold text-[var(--color-ink)]">{name}</p>
      <p className="text-[var(--color-ink-soft)]">{formatCurrency(value)}</p>
    </div>
  );
}

function SpendingChart({ data }) {
  return (
    <div className="h-64 w-full sm:h-72">
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
          >
            {data.map((entry) => (
              <Cell key={entry.category} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// Memoized: the recharts PieChart is the most expensive render on the
// Summary page. Without memo it re-renders on every Summary re-render
// (e.g. a theme toggle) even though `data` hasn't changed.
export default memo(SpendingChart);
