import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
              Account
            </p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950">
              My Profile
            </h1>
            <p className="mt-2 text-slate-600">
              Manage your account and review your shopping activity.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Log out
          </button>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Name</p>
            <p className="mt-1 font-semibold text-slate-900">
              {user?.name || "No name saved"}
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-500">Email</p>
            <p className="mt-1 break-words font-semibold text-slate-900">
              {user?.email}
            </p>
          </div>
        </section>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/orders"
            className="rounded-lg bg-slate-900 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            View orders
          </Link>
          <Link
            to="/products"
            className="rounded-lg border border-slate-300 px-4 py-2 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
