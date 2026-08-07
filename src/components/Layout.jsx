import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Navbar />
      <main className="page-shell py-10 sm:py-14">
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
