"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

export function CartButton() {
  const { totalItems, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#0f766e] text-white shadow-lg shadow-[#0f766e]/30 transition hover:scale-105 hover:bg-[#115e59]"
      aria-label="Abrir carrito"
    >
      <ShoppingBag size={22} />
      {totalItems > 0 ? (
        <span className="absolute -right-1 -top-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-[#f97316] px-1 text-xs font-bold text-white">
          {totalItems}
        </span>
      ) : null}
    </button>
  );
}
