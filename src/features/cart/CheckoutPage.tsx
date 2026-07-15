
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createOrder } from "../../api/orders";
import { useCart } from "./CartContext";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!items.length) {
      setError("Your cart is empty.");
      return;
    }

    if (!name || !email || !address) {
      setError("Please fill Name, Email, and Address.");
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder({
        customer: {
          name,
          email,
          address,
          city,
          country,
        },
        items: items.map((it) => ({
          productId: it.id,
          title: it.title,
          price: it.price,
          quantity: it.quantity,
          image: it.image,
        })),
      });

      clearCart();
      navigate(`/order-success/${order.id}`);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ?? "Checkout failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Checkout</h1>
          <p className="mt-1 text-sm text-slate-600">
            Total: {totalPrice}
          </p>
        </div>

        <Link
          to="/cart"
          className="rounded-xl border px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          ← Back to cart
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            className="rounded-xl border px-3 py-2"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="rounded-xl border px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            className="rounded-xl border px-3 py-2"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            className="rounded-xl border px-3 py-2"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button
          disabled={loading}
          className={
            loading
              ? "w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-600"
              : "w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          }
        >
          {loading ? "Placing order..." : "Place Order"}
        </button>
      </form>
    </main>
  );
}
