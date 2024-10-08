import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

import { Header } from "@/components/landingpage/header";
import { Footer } from "@/components/landingpage/footer";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className={`h-full ${inter.className}`}>{children}</body>;
}
