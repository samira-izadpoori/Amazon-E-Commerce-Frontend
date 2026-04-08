import { Link } from "react-router-dom";
import type { Product } from "../types/product";

type Props = {
  product: Product;
  onAddToCart: (p: Product) => void;
};

export default function ProductCard({ product, onAddToCart }: Props) {
  const outOfStock = product.stock <= 0;

  return (
    <article className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">
      <Link
        to={`/product/${product.title}`}
        className="block"
      >
        <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img src={product.image} className="h-full w-full object-cover" />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Category: {product.category}
          </p>

          <div className="mt-3 flex items-center justify-between">
            <span className="font-bold text-slate-900">{product.price}</span>
            <span className="text-sm text-slate-600">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </Link>

      <div className="border-t p-4">
        <button
          disabled={outOfStock}
          onClick={() => onAddToCart(product)}
          className={
            outOfStock
              ? "w-full cursor-not-allowed rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-600"
              : "w-full rounded-xl bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
          }
        >
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}