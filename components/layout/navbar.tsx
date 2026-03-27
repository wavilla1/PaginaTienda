import Link from "next/link";
import { Search } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-black tracking-tight text-slate-900">
          Willi<span className="text-[#0f766e]">Store</span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          {CATEGORIES.map((category) => (
            <Link
              key={category.value}
              href={`/products?category=${category.value}`}
              className="transition hover:text-slate-900"
            >
              {category.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <Search size={15} />
            Buscar
          </Link>
        </div>
      </div>
    </header>
  );
}
