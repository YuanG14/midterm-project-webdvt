import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Layout;
