import { LogOut, ShoppingBag, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthContext";

export default function DashboardHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4">
      <div>
        <p className="text-sm font-medium text-gray-500">Welcome back</p>
        <h1 className="text-2xl font-semibold text-gray-900">
          {user?.name || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <ShoppingBag size={18} />
          Shop
        </Link>

        <Link
          to="/profile"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="Profile"
        >
          <User size={18} />
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          aria-label="Log out"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
