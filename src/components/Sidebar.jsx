import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, PlusCircle, PieChart, Wallet, Menu, X } from "lucide-react";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/add", label: "Add Transaction", icon: PlusCircle },
  { to: "/summary", label: "Summary", icon: PieChart },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5 px-1">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-primary)]">
        <Wallet className="h-4 w-4 text-[var(--color-primary-dark)]" strokeWidth={2} />
      </div>
      <div className="min-w-0 leading-tight">
        <p className="font-display truncate text-[14px] font-bold tracking-tight text-[var(--color-ink)]">
          Ledger
        </p>
        <p className="truncate text-[11px] font-medium text-[var(--color-ink-soft)]">
          Personal Finance
        </p>
      </div>
    </div>
  );
}

function NavList({ onNavigate }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {links.map((link) => (
        <NavItem key={link.to} {...link} onClick={onNavigate} variant="block" />
      ))}
    </nav>
  );
}

function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on Escape, same as any dismissible popover.
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      {/* Desktop / tablet-landscape: persistent sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 shrink-0 flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-surface)] px-3 py-6 lg:flex">
        <BrandMark />

        <div className="mt-8 flex-1">
          <NavList />
        </div>

        <div className="mt-4">
          <ThemeToggle />
        </div>
      </aside>

      {/* Mobile / tablet-portrait: slim top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[var(--color-border-soft)] bg-[var(--color-surface)] px-5 py-3.5 lg:hidden">
        <BrandMark />

        <div className="flex items-center gap-2">
          <ThemeToggle compact />
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>

        {/* Transparent click-catcher to close on outside tap — no dark
            scrim, so the dashboard behind stays fully visible (and
            scrollable) rather than being blocked by the menu. */}
        <div
          aria-hidden="true"
          className={`fixed inset-0 z-10 ${open ? "block" : "hidden"}`}
          onClick={() => setOpen(false)}
        />

        {/* Compact dropdown menu, anchored under the hamburger button —
            sized to its own content instead of covering the screen, so it
            reads as a lightweight menu rather than a blocking modal. */}
        <div
          aria-label="Navigation menu"
          className={`absolute right-4 top-full z-20 mt-2 w-56 origin-top-right rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-2 shadow-[var(--shadow-float)] transition-all duration-200 ease-[var(--ease-premium)] ${
            open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0"
          }`}
        >
          <NavList onNavigate={() => setOpen(false)} />
        </div>
      </header>
    </>
  );
}

export default Sidebar;
