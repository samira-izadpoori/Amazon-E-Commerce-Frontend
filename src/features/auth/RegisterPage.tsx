import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";
import { useAuth } from "./AuthContext";

export default function RegisterPage() {
  const nav = useNavigate();
  const { setSession } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await register(email, password, name || undefined);
      setSession(res.token, res.user);
      nav("/products");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Create account</h1>
      <p className="mt-1 text-sm text-slate-600">Register to continue.</p>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="mt-6 space-y-3 rounded-2xl border bg-white p-5 shadow-sm"
      >
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-xl border px-3 py-2"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className={
            loading
              ? "w-full rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-600"
              : "w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          }
        >
          {loading ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link className="text-slate-900 underline" to="/login">
          Sign in
        </Link>
      </p>
    </main>
  );
}
