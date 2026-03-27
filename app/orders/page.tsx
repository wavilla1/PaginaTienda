import type { Metadata } from "next";
import { OrdersClient } from "@/app/orders/orders-client";

export const metadata: Metadata = {
  title: "Mis pedidos | NovaStore",
  description: "Consulta tu historial de compras y estado de tus pedidos.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
