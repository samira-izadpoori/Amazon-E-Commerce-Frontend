import { Link } from "react-router-dom";
import { useCart } from "../pages/features/cart/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl   items-center justify-between px-4 py-4">
        <Link to="/" className="text-3xl text-amber-500  font-blond">
          Amazon
        </Link>

        <Link
          to="/cart"
          className="relative flex items-right gap-2 text-slate-700 hover:text-black"
        >
          <ShoppingCart size={22} />

          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-black px-2 py-0.5 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}