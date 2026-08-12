import { NavLink } from "react-router-dom";

/**
 * Single navigation link. Two visual variants:
 * - "pill": compact rounded pill, used in the horizontal desktop/tablet bar
 * - "block": full-width row with a left accent bar, used in the mobile
 *   dropdown menu
 * Routing/active-state detection comes entirely from React Router's NavLink.
 */
function NavItem({ to, label, icon: Icon, end, onClick, variant = "pill" }) {
  if (variant === "block") {
    return (
      <NavLink
        to={to}
        end={end}
        onClick={onClick}
        className={({ isActive }) =>
          `group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-all duration-200 active:scale-[0.98] ${
            isActive
              ? "bg-[var(--color-canvas)] text-[var(--color-ink)] ring-1 ring-[var(--color-border-soft)]"
              : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              aria-hidden="true"
              className={`absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-[var(--color-primary)] transition-opacity duration-200 ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            />
            <Icon
              className={`h-4 w-4 shrink-0 ${isActive ? "text-[var(--color-primary)]" : "text-[var(--color-ink-soft)] group-hover:text-[var(--color-ink)]"}`}
              strokeWidth={2}
            />
            <span>{label}</span>
          </>
        )}
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-all duration-200 active:scale-[0.97] ${
          isActive
            ? "bg-[var(--color-canvas)] text-[var(--color-ink)] shadow-[var(--shadow-xs)] ring-1 ring-[var(--color-border-soft)]"
            : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`h-4 w-4 shrink-0 ${isActive ? "text-[var(--color-primary)]" : ""}`}
            strokeWidth={2}
          />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default NavItem;
