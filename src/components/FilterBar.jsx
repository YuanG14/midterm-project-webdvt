import { ChevronDown, ListFilter } from "lucide-react";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function Select({ value, onChange, options, label }) {
  return (
    <label className="relative flex items-center">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="peer w-full cursor-pointer appearance-none rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] py-2 pl-4 pr-9 text-[13px] font-medium text-[var(--color-ink)] transition-colors duration-200 hover:border-[var(--color-primary)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-[var(--color-ink-soft)]"
        strokeWidth={2}
      />
    </label>
  );
}

function FilterBar({ categories, selectedCategory, onCategoryChange, selectedType, onTypeChange }) {
  const categoryOptions = [
    { value: "all", label: "All Categories" },
    ...categories.map((category) => ({ value: category, label: category })),
  ];

  return (
    <div className="mb-6 flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[var(--color-ink-soft)]">
        <ListFilter className="h-3.5 w-3.5" strokeWidth={2} />
        Filter
      </div>
      <Select
        label="Filter by category"
        value={selectedCategory}
        onChange={onCategoryChange}
        options={categoryOptions}
      />
      <Select
        label="Filter by type"
        value={selectedType}
        onChange={onTypeChange}
        options={TYPE_OPTIONS}
      />
    </div>
  );
}

export default FilterBar;
