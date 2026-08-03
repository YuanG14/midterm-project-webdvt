import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

/**
 * Theme switch. Behavior is untouched — it still just reads/calls
 * theme + toggleTheme from ThemeContext. Only the appearance (a labeled
 * track-style switch, sized for the sidebar footer) changed.
 */
function ThemeToggle({ compact = false }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  if (compact) {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)] hover:shadow-sm active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
      >
        <Sun
          className={`absolute h-4 w-4 transition-all duration-300 ease-out ${
            isDark ? "translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"
          }`}
          strokeWidth={2}
        />
        <Moon
          className={`absolute h-4 w-4 transition-all duration-300 ease-out ${
            isDark ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-6 -rotate-90 opacity-0"
          }`}
          strokeWidth={2}
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--color-border-soft)] bg-[var(--color-canvas)] px-3 py-2.5 text-left transition-colors duration-200 hover:border-[var(--color-ink-soft)]/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
    >
      <span className="flex items-center gap-2.5 text-[13px] font-medium text-[var(--color-ink-soft)]">
        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
          <Sun
            className={`absolute h-4 w-4 transition-all duration-300 ease-out ${
              isDark ? "-translate-y-4 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100 text-[var(--color-warning)]"
            }`}
            strokeWidth={2}
          />
          <Moon
            className={`absolute h-4 w-4 transition-all duration-300 ease-out ${
              isDark ? "translate-y-0 rotate-0 opacity-100 text-[var(--color-accent)]" : "translate-y-4 -rotate-90 opacity-0"
            }`}
            strokeWidth={2}
          />
        </span>
        {isDark ? "Dark mode" : "Light mode"}
      </span>

      {/* Track/thumb, purely visual — click target is the whole button above */}
      <span
        aria-hidden="true"
        className={`relative flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
          isDark ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-soft)]"
        }`}
      >
        <span
          className={`absolute h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-[var(--ease-premium)] ${
            isDark ? "translate-x-[18px]" : "translate-x-[3px]"
          }`}
        />
      </span>
    </button>
  );
}

export default ThemeToggle;
