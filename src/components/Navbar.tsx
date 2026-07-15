import { Link } from "react-router-dom";
import { useCart } from "../features/cart/CartContext";
import { LayoutDashboard, ShoppingCart, User } from "lucide-react";
import { useAuth } from "../features/auth/AuthContext";

export default function Navbar() {
  const { totalItems } = useCart();
  const { isAuthed } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-6xl   items-center justify-between px-4 py-4">
        <Link to="/" className="text-3xl text-amber-500  font-blond">
          Amazon
        </Link>

        <nav className="flex items-center gap-5">
          {isAuthed && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-black"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          )}

          <Link
            to="/profile"
            className="text-slate-700 hover:text-black"
            aria-label="Profile"
          >
            <User size={22} />
          </Link>

          <Link
            to="/cart"
            className="relative flex items-right gap-2 text-slate-700 hover:text-black"
            aria-label="Cart"
          >
            <ShoppingCart size={22} />

            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
