import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-3 pb-10 pt-4 sm:px-4 lg:px-6">
        <Navbar />

        <main className="mt-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
