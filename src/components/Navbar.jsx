import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, PlusCircle, PieChart, Wallet, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/add", label: "Add Transaction", icon: PlusCircle },
  { to: "/summary", label: "Summary", icon: PieChart },
];

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
                    ? "bg-[var(--color-ink)] text-white shadow-sm"
                    : "text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
                }`
              }
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-soft)] hover:bg-[var(--color-canvas)] sm:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
                    ? "bg-[var(--color-ink)] text-white"
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
