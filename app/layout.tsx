import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Koala Bookstore | Your Cozy Reading Nook",
  description:
    "Discover curated bestsellers, indie gems, and handpicked literary treasures at Koala Bookstore.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
