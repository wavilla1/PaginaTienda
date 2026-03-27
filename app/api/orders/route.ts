import { NextResponse } from "next/server";
import { getOrdersByEmail, saveOrder } from "@/lib/orders";
import type { OrderRecord } from "@/lib/types";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { ok: false, message: "Debes indicar un email." },
      { status: 400 },
    );
  }

  const { data, error, persisted } = await getOrdersByEmail(email);

  if (error) {
    return NextResponse.json(
      { ok: false, message: error.message ?? "No se pudieron obtener pedidos." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, persisted, orders: data });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRecord;

    if (!body.customer_name || !body.customer_email || !body.items?.length) {
      return NextResponse.json(
        { ok: false, message: "Datos de pedido incompletos." },
        { status: 400 },
      );
    }

    const { data, error, persisted } = await saveOrder(body);

    if (error) {
      return NextResponse.json(
        { ok: false, message: error.message ?? "No pudimos guardar el pedido." },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, persisted, order: data });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        message: error instanceof Error ? error.message : "Error al procesar pedido.",
      },
      { status: 500 },
    );
  }
}
