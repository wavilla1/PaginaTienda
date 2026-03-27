import type { OrderRecord } from "@/lib/types";
import { getSupabaseAdmin } from "@/lib/supabase";

const TABLE_NAME = "orders";

export async function saveOrder(order: OrderRecord) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: { ...order, id: `local-${Date.now()}` },
      persisted: false,
      error: null,
    };
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(order)
    .select("id, created_at, customer_name, customer_email, payment_method, subtotal, status")
    .single();

  return {
    data,
    persisted: !error,
    error,
  };
}

export async function getOrdersByEmail(email: string) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return {
      data: [],
      persisted: false,
      error: null,
    };
  }

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, created_at, customer_name, customer_email, payment_method, subtotal, status")
    .eq("customer_email", email)
    .order("created_at", { ascending: false });

  return {
    data: data ?? [],
    persisted: !error,
    error,
  };
}
