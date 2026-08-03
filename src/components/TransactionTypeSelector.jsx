import { Check, TrendingDown, TrendingUp } from "lucide-react";

const OPTIONS = [
  { value: "income", label: "Income", caption: "Money coming in", icon: TrendingUp },
  { value: "expense", label: "Expense", caption: "Money going out", icon: TrendingDown },
];

/**
 * Visual Income/Expense picker for the Add Transaction form. Purely a
 * richer presentation of the same two values the existing TypeToggle
 * uses — onChange still just receives "income" | "expense", so it drops
 * straight into the existing form state and validation.
 */
function TransactionTypeSelector({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Transaction type" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {OPTIONS.map(({ value: optionValue, label, caption, icon: Icon }) => {
        const isSelected = value === optionValue;
        const isIncome = optionValue === "income";

        return (
          <button
            key={optionValue}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(optionValue)}
            className={`group relative flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all duration-200 ${
              isSelected
                ? isIncome
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 shadow-[var(--shadow-xs)]"
                  : "border-[var(--color-danger)] bg-[var(--color-danger)]/10 shadow-[var(--shadow-xs)]"
                : "border-[var(--color-border-soft)] bg-[var(--color-canvas)] hover:border-[var(--color-ink-soft)]/40 hover:-translate-y-0.5"
            }`}
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 ${
                isSelected
                  ? isIncome
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[var(--color-danger)] text-white"
                  : "bg-[var(--color-surface)] text-[var(--color-ink-soft)]"
              }`}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2} />
            </span>

            <span className="min-w-0">
              <span className="block text-[13.5px] font-semibold text-[var(--color-ink)]">{label}</span>
              <span className="block truncate text-[12px] text-[var(--color-ink-soft)]">{caption}</span>
            </span>

            {isSelected && (
              <Check
                className={`ml-auto h-4 w-4 shrink-0 ${
                  isIncome ? "text-[var(--color-primary)]" : "text-[var(--color-danger)]"
                }`}
                strokeWidth={2.5}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default TransactionTypeSelector;
