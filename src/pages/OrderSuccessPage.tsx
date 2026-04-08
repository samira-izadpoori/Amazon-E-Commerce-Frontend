import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../api/orders";

export default function OrderSuccessPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <main className="mx-auto max-w-3xl px-4 py-6 text-slate-600">
        Loading order...
      </main>
    );
  if (isError || !data)
    return (
      <main className="mx-auto max-w-3xl px-4 py-6 text-red-700">
        Order not found.
      </main>
    );

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Order placed ✅</h1>
        <p className="mt-2 text-slate-600">
          Order ID: <span className="font-mono">{data.id}</span>
        </p>
        <p className="mt-1 text-slate-600">
          Status: <b className="text-slate-900">{data.status}</b>
        </p>
        <p className="mt-1 text-slate-600">
          Total: <b className="text-slate-900">{data.total}</b>
        </p>

        <h2 className="mt-5 font-semibold">Items</h2>
        <ul className="mt-2 space-y-2">
          {data.items.map((it: any) => (
            <li
              key={it.id}
              className="flex justify-between rounded-xl bg-slate-50 p-3"
            >
              <span>
                {it.title} × {it.quantity}
              </span>
              <span className="font-semibold">{it.price * it.quantity}</span>
            </li>
          ))}
        </ul>

        <Link
          to="/"
          className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}
