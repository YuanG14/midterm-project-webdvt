import { AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import PageTransition from "./PageTransition";

function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Sidebar />
      <main className="lg:pl-60">
        <div className="page-shell py-8 sm:py-10">
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
