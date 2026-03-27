export type ProductCategory =
  | "audio"
  | "gaming"
  | "wearables"
  | "smart-home"
  | "accesorios";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: ProductCategory;
  tags: string[];
  images: string[];
  featured?: boolean;
  popularScore: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CustomerData {
  fullName: string;
  address: string;
  phone: string;
  email: string;
}

export type PaymentMethod = "mercadopago" | "transfer";

export interface OrderRecord {
  id?: string;
  created_at?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  payment_method: PaymentMethod;
  items: Array<{ productId: string; name: string; unitPrice: number; quantity: number }>;
  subtotal: number;
  status: "pending" | "paid" | "waiting_transfer";
  transfer_proof_url?: string | null;
}
