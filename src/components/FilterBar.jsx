import { ListFilter, Tags, TrendingUpDown, X } from "lucide-react";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function Select({ value, onChange, options, label, icon: Icon }) {
  return (
    <label className="relative flex flex-1 items-center sm:flex-none">
      <span className="sr-only">{label}</span>
      <Icon
        className="pointer-events-none absolute left-3.5 h-3.5 w-3.5 text-[var(--color-ink-soft)]"
        strokeWidth={2}
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 cursor-pointer appearance-none rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] py-2.5 pl-9 pr-9 text-[13px] font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-primary)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 sm:w-auto"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-[var(--color-ink-soft)]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}

function FilterBar({ categories, selectedCategory, onCategoryChange, selectedType, onTypeChange }) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((category) => ({ value: category, label: category })),
  ];

  const hasActiveFilter = selectedCategory !== "all" || selectedType !== "all";

  function handleClear() {
    onCategoryChange("all");
    onTypeChange("all");
  }

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-xs)] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink)]">
        <ListFilter className="h-3.5 w-3.5 text-[var(--color-ink-soft)]" strokeWidth={2} />
        Filter transactions
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <Select
          label="Filter by category"
          icon={Tags}
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categoryOptions}
        />
        <Select
          label="Filter by type"
          icon={TrendingUpDown}
          value={selectedType}
          onChange={onTypeChange}
          options={TYPE_OPTIONS}
        />

        {hasActiveFilter && (
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-2.5 text-[12.5px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default FilterBar;
