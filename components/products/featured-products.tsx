import { getSuggestedProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedProducts() {
  const products = getSuggestedProducts(4);

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Productos mas buscados
        </h2>
        <span className="rounded-full bg-[#ccfbf1] px-3 py-1 text-xs font-semibold text-[#115e59]">
          Sugeridos dinamicamente
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
