import { ListFilter, Tags, TrendingUpDown, X } from "lucide-react";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function Select({ value, onChange, options, label, fieldLabel, icon: Icon }) {
  const isActive = value !== "all";

  return (
    <label className="flex flex-1 flex-col gap-1.5 sm:flex-none">
      <span className="text-eyebrow" aria-hidden="true">
        {fieldLabel}
      </span>
      <span className="relative flex items-center">
        <span className="sr-only">{label}</span>
        <Icon
          className={`pointer-events-none absolute left-3.5 h-3.5 w-3.5 ${
            isActive ? "text-[var(--color-primary-dark)]" : "text-[var(--color-ink-soft)]"
          }`}
          strokeWidth={2}
        />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className={`field-select w-full min-w-0 cursor-pointer appearance-none pl-9 pr-9 text-[13px] font-medium sm:w-auto ${
            isActive ? "border-[var(--color-primary-dark)] bg-[var(--color-ice-surface)] text-[var(--color-ink)]" : ""
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          className={`pointer-events-none absolute right-3 h-3.5 w-3.5 ${
            isActive ? "text-[var(--color-primary-dark)]" : "text-[var(--color-ink-soft)]"
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
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
    <div className="flex flex-col gap-4 border-y border-[var(--color-border-soft)] bg-[var(--color-surface-sunken)]/45 px-4 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <Select
          label="Filter by category"
          fieldLabel="Category"
          icon={Tags}
          value={selectedCategory}
          onChange={onCategoryChange}
          options={categoryOptions}
        />
        <Select
          label="Filter by type"
          fieldLabel="Type"
          icon={TrendingUpDown}
          value={selectedType}
          onChange={onTypeChange}
          options={TYPE_OPTIONS}
        />

        {hasActiveFilter && (
          <button type="button" onClick={handleClear} className="btn btn-ghost btn-sm sm:mb-0.5">
            <X className="h-3.5 w-3.5" strokeWidth={2} />
            Clear
          </button>
        )}
      </div>

      <div className="hidden items-center gap-1.5 text-[12.5px] text-[var(--color-ink-soft)] sm:flex">
        <ListFilter className="h-3.5 w-3.5" strokeWidth={2} />
        Filters
      </div>
    </div>
  );
}

export default FilterBar;
