import type { Metadata } from "next";
import { CheckoutClient } from "@/app/checkout/checkout-client";

export const metadata: Metadata = {
  title: "Checkout | NovaStore",
  description: "Finaliza tu compra con Mercado Pago o transferencia bancaria.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
