import { NavLink } from "react-router-dom";

export default function DashboardSidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "rounded-md bg-gray-900 px-4 py-2 text-white"
      : "rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100";

  return (
    <aside className="w-64 border-r bg-white p-6">
      <h2 className="mb-8 text-2xl font-bold">Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard" end className={linkClass}>
          Overview
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          My Profile
        </NavLink>

        <NavLink to="/dashboard/orders" className={linkClass}>
          My Orders
        </NavLink>

        <NavLink to="/dashboard/wishlist" className={linkClass}>
          Wishlist
        </NavLink>

        <NavLink to="/dashboard/settings" className={linkClass}>
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
