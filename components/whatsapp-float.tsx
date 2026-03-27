"use client";

import { MessageCircle } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";

const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "5491112345678";

export function WhatsAppFloat() {
  const { whatsappMessage } = useCart();

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition hover:scale-105"
      aria-label="Comprar por WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
}
