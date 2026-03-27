import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/products/add-to-cart-button";
import { ProductGallery } from "@/app/products/[slug]/product-gallery";
import { formatPrice } from "@/lib/currency";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado | NovaStore",
    };
  }

  return {
    title: `${product.name} | NovaStore`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-5 text-sm text-slate-500">
        <Link href="/products" className="hover:text-slate-900">
          Catalogo
        </Link>
        <span className="mx-2">/</span>
        <span>{product.name}</span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">
            {product.category.replace("-", " ")}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{product.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{product.description}</p>

          <p className="mt-6 text-3xl font-black text-slate-900">{formatPrice(product.price)}</p>
          <p className="mt-2 text-sm text-slate-500">Stock disponible: {product.stock} unidades</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToCartButton productId={product.id} label="Agregar al carrito" />
            <Link
              href="/checkout"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Comprar ahora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
