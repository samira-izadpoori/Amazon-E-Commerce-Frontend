import { Link } from "react-router-dom";

export default function OrderHistoryPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Order History</h1>
        <p className="mt-2 text-slate-600">
          Your previous orders will appear here.
        </p>

        <Link
          to="/products"
          className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Browse products
        </Link>
      </div>
    </main>
  );
}
