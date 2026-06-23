import { Link } from "react-router-dom";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
  onAddToCart: (product: Product) => void;
};

function formatUSD(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function getProductImage(product: Product) {
  return (
    product.image ||
    `https://picsum.photos/seed/${encodeURIComponent(product.title)}/700/520`
  );
}

export default function ProductCard({ product, onAddToCart }: Props) {
  const outOfStock = product.stock <= 0;

  return (
    <article className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-amber-50">
          <img
            src={getProductImage(product)}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/${encodeURIComponent(product.title)}/700/520`;
            }}
            className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/products/${product.id}`}
            className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-slate-900 hover:text-amber-700"
          >
            {product.title}
          </Link>

          <span
            className={
              outOfStock
                ? "shrink-0 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"
                : "shrink-0 rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700"
            }
          >
            {outOfStock ? "Sold out" : `${product.stock} left`}
          </span>
        </div>

        <p className="mt-3 line-clamp-2 min-h-10 text-sm leading-5 text-slate-600">
          {product.description}
        </p>
      </div>

      <div className="border-t p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xl font-bold text-slate-950">
            {formatUSD(product.price)}
          </span>
          <Link
            to={`/products/${product.id}`}
            className="text-sm font-semibold text-slate-500 hover:text-amber-700"
          >
            View details
          </Link>
        </div>

        <button
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className={
            outOfStock
              ? "w-full cursor-not-allowed rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-500"
              : "w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-slate-950 shadow-sm transition hover:bg-amber-400"
          }
        >
          {outOfStock ? "Out of stock" : "Add to cart"}
        </button>
      </div>
    </article>
  );
}
