import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

export default function CartPage() {
  const { items, totalItems, totalPrice, setQuantity, removeItem, clearCart } =
    useCart();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <p className="mt-1 text-sm text-slate-600">Items: {totalItems}</p>
        </div>

        <Link
          to="/"
          className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ← Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-6 rounded-2xl border bg-white p-6">
          <p className="text-slate-700">Your cart is empty.</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Items */}
          <section className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <div
                key={it.id}
                className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm"
              >
                <div className="h-24 w-28 overflow-hidden rounded-xl bg-slate-100">
                  {it.image ? (
                    <img
                      src={it.image}
                      alt={it.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {it.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        Price: {it.price}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(it.id)}
                      className="rounded-xl border px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-sm text-slate-600">Quantity</span>

                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) =>
                        setQuantity(it.id, Number(e.target.value))
                      }
                      className="w-20 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                    />

                    <span className="text-sm text-slate-600">
                      Subtotal:{" "}
                      <b className="text-slate-900">{it.price * it.quantity}</b>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Summary */}
          <aside className="h-fit rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold">Summary</h2>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-slate-700">
                <span>Total items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Total</span>
                <span className="font-bold text-slate-900">{totalPrice}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="mt-5 block w-full rounded-xl bg-slate-900 px-4 py-2 text-center font-semibold text-white hover:bg-slate-800"
            >
              Go to Checkout →
            </Link>

            <button
              onClick={clearCart}
              className="mt-3 w-full rounded-xl border px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Clear cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
