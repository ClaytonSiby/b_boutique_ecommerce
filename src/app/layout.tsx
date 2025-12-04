import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/lib/fontawesome";
import LayoutWrapper from "@/components/LayoutWrapper";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import ToastContainer from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Benedetto Boutique | Trendy Fashion for Every Occasion",
  description: "Discover the latest in women's fashion at Benedetto Boutique. Shop dresses, accessories, and more. Fast shipping and new arrivals every week!",
  openGraph: {
    title: "Benedetto Boutique | Trendy Fashion for Every Occasion",
    description: "Discover the latest in man's and women's fashion at Benedetto Boutique. Shop dresses, Jeans, accessories, and more. Fast shipping and new arrivals every week!",
    url: "https://benedettoboutique.com/",
    siteName: "Benedetto Boutique",
    images: [
      {
        url: "https://storage.googleapis.com/b-boutique-uploads-benedetto-luxury-boutique/uploads/WhatsApp%20Image%202025-12-04%20at%2018.52.03%20(14).jpeg",
        width: 1200,
        height: 630,
        alt: "Benedetto Boutique - Trendy Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benedetto Boutique | Trendy Fashion for Every Occasion | Luxury Clothing Store",
    description: "Discover the latest in men’s, women’s, and kids’ fashion at Benedetto Luxury Boutique. Shop dresses, jeans, accessories, and more—with fast shipping and exciting new arrivals every week!",
    site: "@benedettoboutique",
    creator: "@benedettoboutique",
    images: ["https://storage.googleapis.com/b-boutique-uploads-benedetto-luxury-boutique/uploads/WhatsApp%20Image%202025-12-04%20at%2018.52.03%20(14).jpeg"],
  },
  keywords: [
    "fashion",
    "women's clothing",
    "men's clothing",
    "dresses",
    "jeans",
    "accessories",
    "style",
    "trendy clothes",
    "Benedetto",
    "boutique",
    "accessories",
    "online shopping",
    "Benedetto Boutique",
    "fashion store",
    "clothing shop",
    "latest fashion",
    "fashion trends",
    "shop online",
    "fashion collection",
    "seasonal fashion",
    "fashion deals",
    "e-commerce"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <CartProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
            <ToastContainer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
