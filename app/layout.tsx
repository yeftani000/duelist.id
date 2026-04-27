import "./globals.css"; // MUST BE LINE 1
import { Inter } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Duelist.id | YGO Price Aggregator",
  description: "Find the best Yu-Gi-Oh! card prices in Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="selection:bg-blue-500/30">
        {children}
      </body>
    </html>
  );
}
