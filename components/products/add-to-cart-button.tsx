"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

interface AddToCartButtonProps {
  productId: string;
  label?: string;
}

export function AddToCartButton({
  productId,
  label = "Agregar al carrito",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      type="button"
      onClick={() => addToCart(productId, 1)}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f766e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#115e59]"
    >
      <ShoppingCart size={16} />
      {label}
    </button>
  );
}
