"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/currency";

export function CartDrawer() {
  const {
    cartItems,
    totalPrice,
    isDrawerOpen,
    closeDrawer,
    removeFromCart,
    updateQuantity,
  } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/35 transition ${
          isDrawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Carrito de compras"
      >
        <header className="flex items-center justify-between border-b border-slate-200 p-5">
          <h2 className="text-lg font-bold text-slate-900">Tu carrito</h2>
          <button
            type="button"
            onClick={closeDrawer}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Cerrar carrito"
          >
            <X size={18} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {!cartItems.length ? (
            <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              Tu carrito esta vacio.
            </div>
          ) : (
            <ul className="space-y-4">
              {cartItems.map((item) => (
                <li key={item.product.id} className="rounded-2xl border border-slate-200 p-4">
                  <p className="font-semibold text-slate-900">{item.product.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{formatPrice(item.product.price)}</p>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="inline-flex items-center rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-slate-600 hover:bg-slate-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-slate-600 hover:bg-slate-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id)}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-sm text-rose-600 transition hover:bg-rose-50"
                    >
                      <Trash2 size={14} />
                      Quitar
                    </button>
                  </div>

                  <p className="mt-3 text-right text-sm font-semibold text-slate-800">
                    Subtotal: {formatPrice(item.subtotal)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-slate-200 p-5">
          <div className="flex items-center justify-between text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={closeDrawer}
            className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#0f766e] px-4 py-3 font-semibold text-white transition hover:bg-[#115e59]"
          >
            Finalizar compra
          </Link>
        </footer>
      </aside>
    </>
  );
}
