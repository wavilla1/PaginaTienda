import type { Metadata } from "next";
import { ProductCatalog } from "@/components/products/product-catalog";

export const metadata: Metadata = {
  title: "Catalogo | NovaStore",
  description: "Explora nuestro catalogo ecommerce con filtros por categoria y precio.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;

  return (
    <ProductCatalog
      initialCategory={params.category ?? "all"}
      initialQuery={params.q ?? ""}
    />
  );
}
