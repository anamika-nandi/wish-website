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
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <body className={`h-full ${inter.className}`}>
      <div className="flex flex-col w-full h-full ">
        <div className="absolute inset-0 bg-gradient-to-b from-lightBlue to-stone-50 opacity-70 -z-10"></div>
        <Header user={user} />
        <main className="flex-auto">{children}</main>
      </div>
      <Footer />
    </body>
  );
}
