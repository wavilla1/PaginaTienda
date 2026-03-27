import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { CartButton } from "@/components/cart/cart-button";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { CartProvider } from "@/components/providers/cart-provider";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: {
    default: "NovaStore | Ecommerce Moderno",
    template: "%s | NovaStore",
  },
  description:
    "Tienda ecommerce moderna con checkout serverless, Mercado Pago y experiencia mobile-first.",
  keywords: ["ecommerce", "nextjs", "mercado pago", "tienda online", "vercel"],
  openGraph: {
    title: "NovaStore",
    description:
      "Descubre productos de tecnologia con checkout moderno y optimizado para Vercel.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${sora.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--surface)] text-slate-900">
        <CartProvider>
          <div className="relative flex min-h-screen flex-col overflow-x-clip">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <CartButton />
            <CartDrawer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
