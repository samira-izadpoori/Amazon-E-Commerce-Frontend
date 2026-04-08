import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products";
import { useCart } from "../pages/features/cart/CartContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">Loading product...</p>
        </div>
      </main>
    );
  }

  if (isError || !data) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-red-600">Product not found</h1>
          <div className="mt-4 flex justify-center gap-3">
            <button
              onClick={() => refetch()}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Try again
            </button>
            <Link
              to="/products"
              className="rounded-lg border px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Back to products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <Link
          to="/products"
          className="text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to products
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
            <img
              src={
                data.image ||
                `https://picsum.photos/seed/${encodeURIComponent(data.title)}/900/700`
              }
              alt={data.title}
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  `https://picsum.photos/seed/${encodeURIComponent(data.title)}/900/700`;
              }}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
              {data.category}
            </span>

            <span
              className={
                data.stock > 0
                  ? "rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700"
                  : "rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700"
              }
            >
              {data.stock > 0 ? `In stock: ${data.stock}` : "Out of stock"}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            {data.title}
          </h1>

          <p className="mt-4 leading-7 text-slate-600">{data.description}</p>

          <div className="mt-6 border-t pt-6">
            <p className="text-sm text-slate-500">Price</p>
            <p className="mt-1 text-3xl font-bold text-slate-900">
              {formatUSD(data.price)}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              disabled={data.stock <= 0}
              onClick={() =>
                addItem(
                  {
                    id: data.id,
                    title: data.title,
                    price: data.price,
                    image: data.image,
                  },
                  1,
                )
              }
              className={
                data.stock <= 0
                  ? "w-full rounded-lg bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-500"
                  : "w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              }
            >
              {data.stock <= 0 ? "Unavailable" : "Add to Cart"}
            </button>

            <Link
              to="/cart"
              className="w-full rounded-lg border px-5 py-3 text-center text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
