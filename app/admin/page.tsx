import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Panel admin | NovaStore",
  description: "Panel basico para gestionar productos en NovaStore.",
};

export default function AdminPage() {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Panel admin basico</h1>
      <p className="mt-2 text-slate-600">
        Este panel puede conectarse facilmente a Supabase para ABM de productos. Se incluye como
        base inicial para extender autenticacion y roles.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-700">
          Sugerencia: crear tabla <strong>products</strong> en Supabase y consumirla desde API
          routes para habilitar alta, baja y modificacion.
        </p>
      </div>
    </section>
  );
}
