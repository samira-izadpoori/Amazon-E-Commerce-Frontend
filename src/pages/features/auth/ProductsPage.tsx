import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../api/products";
import type { Product } from "../../../types/product";
import { useCart } from "../cart/CartContext";

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ProductsPage() {
  const { addItem } = useCart();

  const { data, isLoading, isError, refetch } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-3 text-slate-600">Loading products...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-red-600">
            Failed to load products
          </h1>
          <button
            onClick={() => refetch()}
            className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Products</h1>
        <p className="mt-1 text-slate-600">Browse our latest items</p>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      product.image ||
                      `https://picsum.photos/seed/${encodeURIComponent(product.title)}/600/400`
                    }
                    alt={product.title}
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        `https://picsum.photos/seed/${encodeURIComponent(product.title)}/600/400`;
                    }}
                    className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link
                      to={`/products/${product.id}`}
                      className="line-clamp-1 text-lg font-semibold text-slate-900 hover:underline"
                    >
                      {product.title}
                    </Link>
                    <p className="mt-1 text-sm text-slate-500">
                      {product.category}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
                    Stock: {product.stock}
                  </span>
                </div>

                <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                  {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">
                    {formatUSD(product.price)}
                  </span>

                  <button
                    disabled={product.stock <= 0}
                    onClick={() =>
                      addItem(
                        {
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image,
                        },
                        1,
                      )
                    }
                    className={
                      product.stock <= 0
                        ? "rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500"
                        : "rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                    }
                  >
                    {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
