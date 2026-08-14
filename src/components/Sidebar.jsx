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

  // Close the mobile drawer automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    if (open) {
      const previous = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previous;
      };
    }
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
            onClick={() => setOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <Menu className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile drawer + backdrop */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-30 bg-black/35 transition-opacity duration-300 ease-[var(--ease-premium)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[80vw] flex-col border-r border-[var(--color-border-soft)] bg-[var(--color-surface)] px-4 py-6 shadow-[var(--shadow-float)] transition-transform duration-300 ease-[var(--ease-premium)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <BrandMark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)]"
            aria-label="Close navigation menu"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="mt-8 flex-1">
          <NavList onNavigate={() => setOpen(false)} />
        </div>

        <div className="mt-4">
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
