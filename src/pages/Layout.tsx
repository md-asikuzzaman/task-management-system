import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
