import { TrendingDown, TrendingUp } from "lucide-react";

const OPTIONS = [
  { value: "expense", label: "Expense", icon: TrendingDown },
  { value: "income", label: "Income", icon: TrendingUp },
];

function TypeToggle({ value, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Transaction type"
      className="grid grid-cols-2 gap-1.5 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] p-1.5"
    >
      {OPTIONS.map(({ value: optionValue, label, icon: Icon }) => {
        const isSelected = value === optionValue;
        const isIncome = optionValue === "income";

        return (
          <button
            key={optionValue}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(optionValue)}
            className={`flex items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-all duration-200 active:scale-[0.97] ${
              isSelected
                ? isIncome
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "bg-[var(--color-danger)] text-white shadow-sm"
                : "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]"
            }`}
          >
            <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default TypeToggle;
