import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/products"
        className="mt-6 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
      >
        Back to products
      </Link>
    </main>
  );
}
