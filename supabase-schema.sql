create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  customer_address text not null,
  payment_method text not null check (payment_method in ('mercadopago', 'transfer')),
  items jsonb not null,
  subtotal numeric not null,
  status text not null,
  transfer_proof_url text
);

create index if not exists idx_orders_customer_email on public.orders(customer_email);
