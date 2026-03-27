import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { formatPrice } from "@/lib/currency";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
            {product.category.replace("-", " ")}
          </p>
          <Link href={`/products/${product.slug}`} className="mt-1 block text-base font-semibold text-slate-900">
            {product.name}
          </Link>
        </div>

        <p className="line-clamp-2 text-sm text-slate-500">{product.description}</p>

        <div className="flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</p>
          <AddToCartButton productId={product.id} />
        </div>
      </div>
    </article>
  );
}
