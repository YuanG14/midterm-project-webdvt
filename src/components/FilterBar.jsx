import { Tags, TrendingUpDown, X } from "lucide-react";

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function Select({ value, onChange, options, label, icon: Icon }) {
  const isActive = value !== "all";

  return (
    <label className="relative inline-flex shrink-0 items-center">
      <span className="sr-only">{label}</span>
      <Icon
        className={`pointer-events-none absolute left-3 h-3.5 w-3.5 ${
          isActive ? "text-[var(--color-primary-dark)]" : "text-[var(--color-ink-soft)]"
        }`}
        strokeWidth={2}
      />
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`cursor-pointer appearance-none rounded-[var(--radius-pill)] border py-2 pl-8 pr-7 text-[12.5px] font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/25 ${
          isActive
            ? "border-[var(--color-primary)]/35 bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]"
            : "border-[var(--color-border-soft)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:border-[var(--color-border-strong)]"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        className={`pointer-events-none absolute right-2.5 h-3 w-3 ${
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
    </label>
  );
}

/**
 * Compact filter row for "All Transactions" — bare pill controls instead of
 * a padded, bordered container, so it reads as part of the section rather
 * than its own boxed widget. Active filters get a tinted, colored state;
 * inactive ones stay quiet.
 */
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
    <div className="mb-4 flex flex-wrap items-center gap-2">
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
          className="inline-flex items-center justify-center gap-1 rounded-[var(--radius-pill)] px-2.5 py-2 text-[12px] font-semibold text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)]"
        >
          <X className="h-3.5 w-3.5" strokeWidth={2} />
          Clear
        </button>
      )}
    </div>
  );
}

export default FilterBar;
