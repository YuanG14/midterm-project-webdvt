import { LayoutDashboard, PieChart, PlusCircle, WalletCards } from "lucide-react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/add", label: "Add Transaction", icon: PlusCircle },
  { to: "/summary", label: "Summary", icon: PieChart },
];

function BrandMark() {
  return (
    <Link to="/" aria-label="Ledger dashboard" className="flex items-center gap-2.5 rounded-[var(--radius-control)]">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-primary)] shadow-[var(--shadow-xs)]">
        <WalletCards className="h-[18px] w-[18px] text-[var(--color-ink)]" strokeWidth={2.25} />
      </div>
      <div className="leading-tight">
        <span className="block font-display text-[15px] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">Ledger</span>
        <span className="hidden text-[10px] font-medium tracking-wide text-[var(--color-ink-faint)] sm:block">PERSONAL FINANCE</span>
      </div>
    </Link>
  );
}

function Navbar() {
  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--color-border-soft)] bg-[var(--color-surface)]/95">
        <div className="page-shell flex h-[68px] items-center justify-between">
        <BrandMark />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="flex items-center">
          <ThemeToggle compact />
        </div>
      </div>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-3 border-t border-[var(--color-border-soft)] bg-[var(--color-surface)] px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-8px_24px_-18px_rgba(20,33,43,0.35)] md:hidden"
      >
          {links.map((link) => (
          <NavItem key={link.to} {...link} variant="bottom" />
          ))}
      </nav>
    </>
  );
}

export default Navbar;
