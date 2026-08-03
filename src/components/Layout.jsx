import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="min-h-screen bg-[var(--color-canvas)]">
      <Sidebar />
      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14 lg:ml-64 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
