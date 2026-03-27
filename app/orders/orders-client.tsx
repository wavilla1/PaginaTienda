"use client";

import { FormEvent, useState } from "react";
import { formatPrice } from "@/lib/currency";

interface OrderRow {
  id: string;
  created_at: string;
  payment_method: string;
  subtotal: number;
  status: string;
}

export function OrdersClient() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`);
      const data = (await response.json()) as { orders?: OrderRow[]; message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "No pudimos obtener tus pedidos");
      }

      setOrders(data.orders ?? []);
      if (!data.orders?.length) {
        setMessage("No encontramos pedidos para ese email.");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-black tracking-tight text-slate-900">Historial de pedidos</h1>
      <p className="mt-2 text-sm text-slate-500">Consulta tus compras ingresando tu email.</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          required
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="tu@email.com"
          className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none transition focus:border-[#0f766e]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#0f766e] px-4 py-2.5 font-semibold text-white transition hover:bg-[#115e59] disabled:opacity-60"
        >
          {loading ? "Buscando..." : "Ver pedidos"}
        </button>
      </form>

      {message ? <p className="mt-5 text-sm text-slate-600">{message}</p> : null}

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Pago</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-slate-200 text-slate-700">
                <td className="px-4 py-3 font-mono text-xs">{order.id}</td>
                <td className="px-4 py-3">
                  {new Date(order.created_at).toLocaleDateString("es-AR")}
                </td>
                <td className="px-4 py-3">{order.payment_method}</td>
                <td className="px-4 py-3">{order.status}</td>
                <td className="px-4 py-3 text-right font-semibold">{formatPrice(order.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
