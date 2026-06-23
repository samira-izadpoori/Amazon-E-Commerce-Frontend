import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api/products";
import type { Product } from "../../types/product";
import { useCart } from "../cart/CartContext";
import ProductCard from "./ProductCard";

export default function ProductsPage() {
  const { addItem } = useCart();

  const { data, isLoading, isError, refetch } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="mt-3 text-slate-600">Loading products...</p>
        </div>
      </main>
    );
  }

  if (isError) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
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
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-7 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
            Fresh picks
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">Products</h1>
          <p className="mt-1 text-slate-600">
            Clean product cards with clear images and fast shopping.
          </p>
        </div>

        <span className="text-sm font-medium text-slate-500">
          {data?.length ?? 0} items
        </span>
      </div>

      {!data || data.length === 0 ? (
        <div className="rounded-lg border bg-white p-8 text-center shadow-sm">
          <p className="text-slate-600">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(item) =>
                addItem(
                  {
                    id: item.id,
                    title: item.title,
                    price: item.price,
                    image: item.image,
                  },
                  1,
                )
              }
            />
          ))}
        </div>
      )}
    </main>
  );
}
