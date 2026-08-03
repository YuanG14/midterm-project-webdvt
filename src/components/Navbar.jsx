import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, PieChart, Wallet, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/add", label: "Add Transaction", icon: PlusCircle },
  { to: "/summary", label: "Summary", icon: PieChart },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] text-[var(--color-ink-soft)] transition-colors duration-200 hover:text-[var(--color-ink)] hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
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

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border-soft)] bg-[var(--color-surface)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)]">
            <Wallet className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <span className="font-display text-[15px] font-bold tracking-tight text-[var(--color-ink)]">
            Ledger
          </span>
        </div>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[var(--color-ink)] text-[var(--color-canvas)] shadow-sm"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] sm:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-[var(--color-border-soft)] px-5 py-3 sm:hidden">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-ink)] text-[var(--color-canvas)]"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)]"
                }`
              }
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
