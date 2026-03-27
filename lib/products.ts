import type { Product, ProductCategory } from "@/lib/types";

export const CATEGORIES: Array<{ value: ProductCategory; label: string }> = [
  { value: "audio", label: "Audio" },
  { value: "gaming", label: "Gaming" },
  { value: "wearables", label: "Wearables" },
  { value: "smart-home", label: "Smart Home" },
  { value: "accesorios", label: "Accesorios" },
];

export const PRODUCTS: Product[] = [
  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },
  
  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },

  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },

  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },

  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },

  {
    id: "Bambulab-A1-combo",
    slug: "Bambulab-A1-combo",
    name: "Bambulab A1 combo",
    description:
      "Impresora 3D bambulab A1 con cama caliente, extrusor de alta precision y pantalla tactil a color.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/BambulabA1.jpg", "/products/BambulabA1.jpg"],
    featured: true,
    popularScore: 92,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((product) => product.featured).sort(
    (a, b) => b.popularScore - a.popularScore,
  );
}

export function getSuggestedProducts(limit = 4): Product[] {
  return [...PRODUCTS].sort((a, b) => b.popularScore - a.popularScore).slice(0, limit);
}
