"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { PRODUCTS } from "@/lib/products";
import type { CartItem, Product } from "@/lib/types";

interface CartStateItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

interface CartContextValue {
  cartItems: CartStateItem[];
  totalItems: number;
  totalPrice: number;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  whatsappMessage: string;
}

const STORAGE_KEY = "pagina-tienda-cart";

const CartContext = createContext<CartContextValue | null>(null);

function hydrateItems(items: CartItem[]): CartStateItem[] {
  return items
    .map((item) => {
      const product = PRODUCTS.find((candidate) => candidate.id === item.productId);
      if (!product) {
        return null;
      }

      return {
        product,
        quantity: item.quantity,
        subtotal: product.price * item.quantity,
      };
    })
    .filter((item): item is CartStateItem => Boolean(item));
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [rawItems, setRawItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return [];
    }

    try {
      return JSON.parse(saved) as CartItem[];
    } catch {
      return [];
    }
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rawItems));
  }, [rawItems]);

  const cartItems = useMemo(() => hydrateItems(rawItems), [rawItems]);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.subtotal, 0),
    [cartItems],
  );

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setRawItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (!existing) {
        return [...prev, { productId, quantity }];
      }

      return prev.map((item) =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });

    setIsDrawerOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setRawItems((prev) => prev.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setRawItems((prev) => prev.filter((item) => item.productId !== productId));
      return;
    }

    setRawItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
    );
  }, []);

  const clearCart = useCallback(() => setRawItems([]), []);

  const whatsappMessage = useMemo(() => {
    if (!cartItems.length) {
      return "Hola, quiero consultar productos en su tienda.";
    }

    const lines = cartItems.map(
      (item) => `- ${item.product.name} x${item.quantity} ($${item.subtotal.toLocaleString("es-AR")})`,
    );

    return `Hola, quiero comprar estos productos:\n${lines.join("\n")}\n\nTotal: $${totalPrice.toLocaleString("es-AR")}`;
  }, [cartItems, totalPrice]);

  const value = useMemo<CartContextValue>(
    () => ({
      cartItems,
      totalItems,
      totalPrice,
      isDrawerOpen,
      openDrawer: () => setIsDrawerOpen(true),
      closeDrawer: () => setIsDrawerOpen(false),
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      whatsappMessage,
    }),
    [
      addToCart,
      cartItems,
      clearCart,
      isDrawerOpen,
      removeFromCart,
      totalItems,
      totalPrice,
      updateQuantity,
      whatsappMessage,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }

  return context;
}
