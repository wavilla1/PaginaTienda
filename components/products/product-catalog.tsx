"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/product-card";

interface ProductCatalogProps {
  initialCategory?: string;
  initialQuery?: string;
}

export function ProductCatalog({
  initialCategory = "all",
  initialQuery = "",
}: ProductCatalogProps) {
  const [search, setSearch] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState(300000);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchSearch =
        !search ||
        `${product.name} ${product.description} ${product.tags.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory = category === "all" || product.category === category;
      const matchPrice = product.price <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });
  }, [category, maxPrice, search]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2 text-slate-800">
          <SlidersHorizontal size={18} />
          <h2 className="text-lg font-bold">Filtros</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Buscar producto
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Ej: auriculares, teclado"
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-[#0f766e]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Categoria
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm font-normal outline-none transition focus:border-[#0f766e]"
            >
              <option value="all">Todas</option>
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Precio maximo: ${maxPrice.toLocaleString("es-AR")}
            <input
              type="range"
              min={30000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(event) => setMaxPrice(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200"
            />
          </label>
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {!filteredProducts.length ? (
        <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          No encontramos productos con esos filtros. Proba otra busqueda.
        </p>
      ) : null}
    </section>
  );
}
