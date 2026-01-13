import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Product Explorer Dashboard",
  description: "Browse and explore products with filtering and favorites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
