import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
