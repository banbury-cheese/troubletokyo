import type { Metadata } from "next";
import "./globals.scss";
import { CartProvider } from "@/components/cart/cart-context";
import { CurrencyProvider } from "@/components/cart/currency-context";
import { getCart } from "@/lib/shopify";
import { Toaster } from "sonner";
import CartModal from "@/components/cart/modal/modal";
import LaunchTimer from "@/components/LaunchTimer/LaunchTimer";
// import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Trouble Tokyo",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Don't await the fetch, pass the Promise to the context provider
  const cart = getCart();

  return (
    <html lang="en">
      <body className={``}>
        <CurrencyProvider>
          <CartProvider cartPromise={cart}>
            <LaunchTimer />
            {children}
            <Toaster />
            <CartModal />
            {/* <Analytics /> */}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
