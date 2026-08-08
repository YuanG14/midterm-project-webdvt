import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { LayoutDashboard, Menu, PieChart, PlusCircle, Wallet, X } from "lucide-react";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/add", label: "Add Transaction", icon: PlusCircle },
  { to: "/summary", label: "Summary", icon: PieChart },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]">
        <Wallet className="h-4.5 w-4.5 text-white" strokeWidth={2} />
      </div>
      <span className="font-display text-base font-bold tracking-tight text-[var(--color-ink)]">
        Cashflow
      </span>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Close the mobile menu automatically whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="border-b border-[var(--color-border-soft)]">
      <div className="page-shell flex items-center justify-between py-4 sm:py-5">
        <BrandMark />

        {/* Desktop / tablet: inline links, housed in a segmented pill bar */}
        <nav className="hidden items-center gap-1 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-canvas)] p-1 md:flex">
          {links.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ThemeToggle compact />
          </div>

          {/* Mobile: hamburger toggle */}
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[var(--color-ink-soft)] transition-colors hover:bg-[var(--color-canvas)] hover:text-[var(--color-ink)] md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile: dropdown panel, pushes content down rather than overlaying it */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-[var(--ease-premium)] md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 border-t border-[var(--color-border-soft)] px-5 py-3 sm:px-8">
          {links.map((link) => (
            <NavItem key={link.to} {...link} variant="block" onClick={() => setOpen(false)} />
          ))}
          <div className="mt-2 border-t border-[var(--color-border-soft)] pt-3">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
