import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Tag } from "lucide-react";
import { getCategoryIcon } from "../utils/categoryIcons";

/**
 * Visual category picker. Fully controlled — value/onChange still carry
 * the exact same category string the plain <select> did, so it drops
 * straight into the existing form state, validation, and submitted data.
 */
function CategorySelector({ id, value, onChange, options, placeholder = "Select a category…" }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handlePointerDown(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close whenever the option list changes (e.g. transaction type flipped).
  useEffect(() => {
    setOpen(false);
  }, [options]);

  const SelectedIcon = value ? getCategoryIcon(value) ?? Tag : Tag;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex w-full items-center justify-between gap-2 rounded-[var(--radius-control)] border bg-[var(--color-canvas)] px-3.5 py-2.5 text-left text-[14px] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 ${
          open ? "border-[var(--color-primary)]" : "border-[var(--color-border-soft)]"
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <SelectedIcon className="h-4 w-4 shrink-0 text-[var(--color-ink-soft)]" strokeWidth={2} />
          <span className={`truncate ${value ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)]/70"}`}>
            {value || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[var(--color-ink-soft)] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Category"
          tabIndex={-1}
          className="absolute z-10 mt-1.5 max-h-60 w-full overflow-auto rounded-[var(--radius-control)] border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-1.5 shadow-[var(--shadow-card-hover)] animate-[fadeIn_0.15s_ease-out]"
        >
          {options.map((option) => {
            const OptionIcon = getCategoryIcon(option) ?? Tag;
            const isSelected = option === value;

            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13.5px] font-medium transition-colors duration-150 ${
                    isSelected
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]"
                      : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  <OptionIcon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  <span className="truncate">{option}</span>
                  {isSelected && <Check className="ml-auto h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CategorySelector;
