import { Link, useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../api/orders";
import { fetchProduct } from "../../api/products";

type OrderItem = {
  id?: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

export default function OrderSuccessPage() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder(id!),
    enabled: !!id,
  });

  const productQueries = useQueries({
    queries: ((data?.items ?? []) as OrderItem[]).map((item) => ({
      queryKey: ["product", item.productId],
      queryFn: () => fetchProduct(item.productId),
      enabled: Boolean(item.productId),
    })),
  });

  const productImages = new Map(
    productQueries
      .map((query) => query.data)
      .filter(Boolean)
      .map((product) => [product!.id, product!.image]),
  );

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6 text-slate-600">
        Loading order...
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-6 text-red-700">
        Order not found.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">Order placed</h1>
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
        <ul className="mt-3 space-y-3">
          {(data.items as OrderItem[]).map((item) => {
            const image = item.image || productImages.get(item.productId);

            return (
              <li
                key={item.id ?? item.productId}
                className="flex gap-4 rounded-xl bg-slate-50 p-3"
              >
                <div className="flex h-20 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                  {image ? (
                    <img
                      src={image}
                      alt={item.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="h-full w-full object-contain p-2"
                    />
                  ) : (
                    <span className="px-2 text-center text-xs font-medium text-slate-400">
                      No image
                    </span>
                  )}
                </div>

                <div className="flex flex-1 items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 font-semibold text-slate-900">
                    {item.price * item.quantity}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <Link
          to="/products"
          className="mt-5 inline-block rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
        >
          Back to products
        </Link>
      </div>
    </main>
  );
}
