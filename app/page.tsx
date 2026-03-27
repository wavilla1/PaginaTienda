import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { FeaturedProducts } from "@/components/products/featured-products";
import { CATEGORIES } from "@/lib/products";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-14 sm:px-6 lg:px-8 lg:pt-18">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#99f6e4] bg-white px-3 py-1 text-xs font-semibold text-[#0f766e]">
                <Sparkles size={14} />
                Ofertas dinamicas semanales
              </div>

              <h1 className="mt-6 max-w-2xl font-[var(--font-space-grotesk)] text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Tu ecommerce de tecnologia,
                <span className="text-[#0f766e]"> rapido y sin friccion.</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                Compra auriculares, wearables y accesorios premium con checkout optimizado para
                Vercel, pagos online y soporte inmediato por WhatsApp.
              </p>

              <form action="/products" className="mt-8 flex flex-col gap-3 sm:flex-row">
                <input
                  type="search"
                  name="q"
                  placeholder="Buscar productos..."
                  className="h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-[#0f766e]"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-5 text-sm font-semibold text-white transition hover:bg-[#115e59]"
                >
                  Buscar
                  <ArrowRight size={16} />
                </button>
              </form>

              <div className="mt-8 flex flex-wrap gap-2">
                {CATEGORIES.map((category) => (
                  <Link
                    key={category.value}
                    href={`/products?category=${category.value}`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 transition hover:border-[#5eead4] hover:text-slate-900"
                  >
                    {category.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#ccfbf1] via-[#f8fafc] to-[#fed7aa] p-6 shadow-xl">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                Beneficios NovaStore
              </p>
              <ul className="mt-5 space-y-4 text-sm text-slate-700">
                <li className="rounded-xl bg-white/80 p-4">Envios express a todo el pais.</li>
                <li className="rounded-xl bg-white/80 p-4">Mercado Pago + transferencia bancaria.</li>
                <li className="rounded-xl bg-white/80 p-4">
                  Catalogo optimizado con imagenes de alta calidad.
                </li>
              </ul>

              <Link
                href="/products"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
              >
                Explorar catalogo completo
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />
    </>
  );
}
