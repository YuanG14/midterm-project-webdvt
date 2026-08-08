import { memo, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const TONES = {
  neutral: "bg-[var(--color-canvas)] text-[var(--color-ink-soft)]",
  primary: "bg-[var(--color-primary)]/10 text-[var(--color-primary-dark)]",
  success: "bg-[var(--color-income)]/10 text-[var(--color-income-dark)]",
  danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
  accent: "bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
};

// Matches the --ease-premium cubic-bezier already used across the app so
// the expand/collapse transition feels consistent with existing motion.
const EASE_PREMIUM = [0.16, 1, 0.3, 1];

/**
 * A "Recent Insights" tile. Renders its default label/value/hint like
 * before; when `details` is provided, the whole card becomes a toggle
 * button that expands a small panel underneath revealing more of the
 * application's existing transaction data. Hover only offers a quiet
 * visual cue (surface/elevation/chevron) — the panel itself only opens on
 * click, Enter, or Space, via a real <button> so keyboard support and
 * focus states come for free and match the app's global focus-visible
 * treatment.
 */
function InsightCard({ icon: Icon, label, value, hint, tone = "neutral", details }) {
  const [expanded, setExpanded] = useState(false);
  const panelId = useId();
  const toneClass = TONES[tone] ?? TONES.neutral;
  const interactive = Boolean(details);

  return (
    <div
      className={`group overflow-hidden rounded-xl border bg-[var(--color-surface)] transition-all duration-200 ${
        expanded
          ? "border-[var(--color-primary)]/30 shadow-[var(--shadow-card)]"
          : "border-[var(--color-border-soft)] hover:border-[var(--color-primary)]/30 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5"
      }`}
    >
      <button
        type="button"
        onClick={interactive ? () => setExpanded((prev) => !prev) : undefined}
        aria-expanded={interactive ? expanded : undefined}
        aria-controls={interactive ? panelId : undefined}
        aria-label={`${label}: ${value}${hint ? `, ${hint}` : ""}${
          interactive ? `. ${expanded ? "Collapse" : "Expand"} details.` : ""
        }`}
        className={`flex w-full items-start gap-3 p-4 text-left ${interactive ? "" : "cursor-default"}`}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105 ${toneClass}`}
        >
          <Icon className="h-4 w-4" strokeWidth={2} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--color-ink-soft)]">
            {label}
          </p>
          <p className="mt-0.5 truncate font-display text-[14.5px] font-semibold text-[var(--color-ink)]">
            {value}
          </p>
          {hint && <p className="mt-0.5 text-[12px] text-[var(--color-ink-soft)]">{hint}</p>}
        </div>
        {interactive && (
          <ChevronDown
            className={`mt-1 h-3.5 w-3.5 shrink-0 text-[var(--color-ink-soft)] opacity-0 transition-all duration-200 group-hover:opacity-100 ${
              expanded ? "rotate-180 opacity-100" : ""
            }`}
            strokeWidth={2.25}
          />
        )}
      </button>

      {interactive && (
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: EASE_PREMIUM }}
              className="overflow-hidden"
            >
              <div className="border-t border-[var(--color-border-soft)] px-4 pb-4 pt-3">{details}</div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}

// Memoized: multiple InsightCard instances render per Summary render; their
// props are stable across unrelated Summary re-renders (e.g. theme toggle).
export default memo(InsightCard);
