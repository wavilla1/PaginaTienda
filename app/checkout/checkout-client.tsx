"use client";

import { FormEvent, useMemo, useState } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/currency";

interface ApiResponse {
  ok: boolean;
  message?: string;
  initPoint?: string;
}

export function CheckoutClient() {
  const { cartItems, totalPrice, clearCart } = useCart();

  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"mercadopago" | "transfer">("mercadopago");
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string>("");

  const payloadItems = useMemo(
    () =>
      cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        unitPrice: item.product.price,
        quantity: item.quantity,
      })),
    [cartItems],
  );

  async function submitTransferOrder() {
    let transferProofUrl: string | undefined;

    if (proofFile) {
      const formData = new FormData();
      formData.append("proof", proofFile);

      const uploadResponse = await fetch("/api/upload-proof", {
        method: "POST",
        body: formData,
      });

      const uploadData = (await uploadResponse.json()) as ApiResponse & {
        url?: string;
      };

      if (!uploadResponse.ok || !uploadData.url) {
        throw new Error(uploadData.message ?? "No pudimos subir el comprobante");
      }

      transferProofUrl = uploadData.url;
    }

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        payment_method: "transfer",
        items: payloadItems,
        subtotal: totalPrice,
        status: "waiting_transfer",
        transfer_proof_url: transferProofUrl,
      }),
    });

    const data = (await response.json()) as ApiResponse;

    if (!response.ok) {
      throw new Error(data.message ?? "No se pudo crear el pedido");
    }

    setMessage("Pedido creado. Recibimos tus datos para validar la transferencia.");
    clearCart();
  }

  async function submitMercadoPagoOrder() {
    const response = await fetch("/api/checkout/mercadopago", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customer_name: fullName,
        customer_email: email,
        customer_phone: phone,
        customer_address: address,
        items: payloadItems,
        subtotal: totalPrice,
      }),
    });

    const data = (await response.json()) as ApiResponse;

    if (!response.ok || !data.initPoint) {
      throw new Error(data.message ?? "No se pudo iniciar Mercado Pago");
    }

    window.location.href = data.initPoint;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!cartItems.length) {
      setMessage("Tu carrito esta vacio.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      if (paymentMethod === "transfer") {
        await submitTransferOrder();
      } else {
        await submitMercadoPagoOrder();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ocurrio un error inesperado");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
      <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Checkout</h1>
        <p className="mt-1 text-sm text-slate-500">Completa tus datos para finalizar tu compra.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
            Nombre completo
            <input
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#0f766e]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700 sm:col-span-2">
            Direccion
            <input
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#0f766e]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Telefono
            <input
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#0f766e]"
            />
          </label>

          <label className="space-y-2 text-sm font-semibold text-slate-700">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#0f766e]"
            />
          </label>
        </div>

        <div className="mt-6 space-y-3 rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-700">Metodo de pago</p>

          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="radio"
              checked={paymentMethod === "mercadopago"}
              onChange={() => setPaymentMethod("mercadopago")}
            />
            Mercado Pago (tarjeta, saldo o cuotas)
          </label>

          <label className="flex items-start gap-2 text-sm text-slate-700">
            <input
              type="radio"
              checked={paymentMethod === "transfer"}
              onChange={() => setPaymentMethod("transfer")}
            />
            Transferencia bancaria
          </label>
        </div>

        {paymentMethod === "transfer" ? (
          <div className="mt-4 rounded-xl border border-[#99f6e4] bg-[#f0fdfa] p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Datos bancarios</p>
            <p>Banco: Banco Ejemplo</p>
            <p>CBU: 0000003100000000000012</p>
            <p>Alias: NOVASTORE.PAGOS</p>

            <label className="mt-3 block space-y-2 font-semibold">
              Subir comprobante (opcional)
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setProofFile(event.target.files?.[0] ?? null)}
                className="block w-full text-sm font-normal"
              />
            </label>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#0f766e] px-4 py-3 font-semibold text-white transition hover:bg-[#115e59] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Procesando..." : "Confirmar compra"}
        </button>

        {message ? <p className="mt-4 text-sm text-slate-700">{message}</p> : null}
      </form>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Resumen</h2>
        <ul className="mt-4 space-y-3">
          {cartItems.map((item) => (
            <li key={item.product.id} className="flex items-center justify-between gap-3 text-sm text-slate-700">
              <span>
                {item.product.name} x{item.quantity}
              </span>
              <span className="font-semibold text-slate-900">{formatPrice(item.subtotal)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
          Total: {formatPrice(totalPrice)}
        </div>
      </aside>
    </section>
  );
}
