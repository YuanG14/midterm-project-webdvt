import { NavLink } from "react-router-dom";

/**
 * Single sidebar navigation link.
 * Purely presentational — all routing behavior comes from React Router's
 * NavLink, so active-state detection still follows normal route matching.
 */
function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200 ${
          isActive
            ? "text-[var(--color-ink)]"
            : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active background, cross-fades in/out rather than snapping */}
          <span
            aria-hidden="true"
            className={`absolute inset-0 rounded-xl bg-[var(--color-surface)] shadow-[var(--shadow-xs)] ring-1 ring-[var(--color-border-soft)] transition-opacity duration-200 ease-[var(--ease-premium)] ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Accent bar — the clear "you are here" marker */}
          <span
            aria-hidden="true"
            className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-[var(--color-primary)] to-[var(--color-accent)] transition-all duration-200 ease-[var(--ease-premium)] ${
              isActive ? "opacity-100" : "opacity-0"
            }`}
          />

          <Icon
            className={`relative h-4 w-4 shrink-0 transition-colors duration-200 ${
              isActive ? "text-[var(--color-primary)]" : "text-[var(--color-ink-soft)] group-hover:text-[var(--color-ink)]"
            }`}
            strokeWidth={2}
          />
          <span className="relative">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default NavItem;
