import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="app-frame min-h-screen bg-[var(--color-canvas)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="relative pb-24 md:pb-0">
        <div className="page-shell py-8 sm:py-11 lg:py-14">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

export default Layout;
