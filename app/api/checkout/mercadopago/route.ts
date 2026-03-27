import { NextResponse } from "next/server";
import { getPreferenceClient } from "@/lib/mercadopago";
import { saveOrder } from "@/lib/orders";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      customer_name: string;
      customer_email: string;
      customer_phone: string;
      customer_address: string;
      items: Array<{ name: string; quantity: number; unitPrice: number; productId: string }>;
      subtotal: number;
    };

    if (!body.customer_email || !body.items?.length) {
      return NextResponse.json(
        { ok: false, message: "Faltan datos para iniciar el pago." },
        { status: 400 },
      );
    }

    const preferenceClient = getPreferenceClient();

    if (!preferenceClient) {
      return NextResponse.json(
        {
          ok: false,
          message: "Mercado Pago no esta configurado. Define MERCADOPAGO_ACCESS_TOKEN.",
        },
        { status: 500 },
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const preference = await preferenceClient.create({
      body: {
        items: body.items.map((item) => ({
          id: item.productId,
          title: item.name,
          quantity: item.quantity,
          currency_id: "ARS",
          unit_price: item.unitPrice,
        })),
        payer: {
          email: body.customer_email,
          name: body.customer_name,
        },
        back_urls: {
          success: `${appUrl}/orders`,
          failure: `${appUrl}/checkout`,
          pending: `${appUrl}/orders`,
        },
        auto_return: "approved",
      },
    });

    await saveOrder({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      customer_address: body.customer_address,
      payment_method: "mercadopago",
      items: body.items,
      subtotal: body.subtotal,
      status: "pending",
    });

    return NextResponse.json({
      ok: true,
      initPoint: preference.init_point,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "No se pudo crear preferencia de pago.",
      },
      { status: 500 },
    );
  }
}
