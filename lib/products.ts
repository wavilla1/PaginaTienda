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
    id: "p-aurora-buds",
    slug: "aurora-buds-pro",
    name: "Aurora Buds Pro",
    description:
      "Auriculares in-ear con cancelacion activa, sonido espacial y bateria para todo el dia.",
    price: 189999,
    stock: 25,
    category: "audio",
    tags: ["bluetooth", "anc", "deporte"],
    images: ["/products/aurora-buds-1.svg", "/products/aurora-buds-2.svg"],
    featured: true,
    popularScore: 92,
  },
  {
    id: "p-pulse-max",
    slug: "pulse-max-watch",
    name: "Pulse Max Watch",
    description:
      "Smartwatch premium con GPS dual, pantalla AMOLED y monitoreo avanzado de salud.",
    price: 259000,
    stock: 18,
    category: "wearables",
    tags: ["salud", "running", "amoled"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    popularScore: 97,
  },
  {
    id: "p-neon-pad",
    slug: "neon-pad-rgb",
    name: "Neon Pad RGB",
    description:
      "Mousepad gamer XL con iluminacion perimetral, superficie de alta precision y USB-C.",
    price: 49999,
    stock: 40,
    category: "gaming",
    tags: ["rgb", "esports", "xl"],
    images: [
      "https://images.unsplash.com/photo-1616628182509-6f4bb8f4f6f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1610563166150-b34df4f3bcd6?auto=format&fit=crop&w=1200&q=80",
    ],
    popularScore: 77,
  },
  {
    id: "p-orbit-speaker",
    slug: "orbit-smart-speaker",
    name: "Orbit Smart Speaker",
    description:
      "Parlante inteligente con asistentes de voz, audio 360 y automatizaciones para tu casa.",
    price: 149500,
    stock: 30,
    category: "smart-home",
    tags: ["wifi", "asistente", "hogar"],
    images: [
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    popularScore: 88,
  },
  {
    id: "p-airstand",
    slug: "airstand-magsafe",
    name: "AirStand MagSafe",
    description:
      "Base magnetica 3 en 1 para cargar telefono, reloj y auriculares al mismo tiempo.",
    price: 84500,
    stock: 16,
    category: "accesorios",
    tags: ["magsafe", "escritorio", "carga"],
    images: [
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?auto=format&fit=crop&w=1200&q=80",
    ],
    popularScore: 84,
  },
  {
    id: "p-katana-keys",
    slug: "katana-keys-75",
    name: "Katana Keys 75",
    description:
      "Teclado mecanico hot-swap 75% con switches lineales y keycaps PBT premium.",
    price: 132900,
    stock: 22,
    category: "gaming",
    tags: ["teclado", "mecanico", "rgb"],
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595044426077-d36d9236d5fd?auto=format&fit=crop&w=1200&q=80",
    ],
    featured: true,
    popularScore: 95,
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
