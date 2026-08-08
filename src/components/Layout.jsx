import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-canvas)] px-3 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-8">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[var(--radius-shell)] border border-[var(--color-border-soft)] bg-[var(--color-surface)] shadow-[var(--shadow-shell)]">
        <Navbar />
        <main className="page-shell py-8 sm:py-10 lg:py-12">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default Layout;
