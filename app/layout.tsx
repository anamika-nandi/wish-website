import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "react-data-grid/lib/styles.css";

import { Toaster } from "@/components/ui/sonner";
import { Provider } from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Local Board",
  description: "A place to buy and sell local products",
  icons: ["https://joo.world/favicon.ico"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
          <Toaster richColors theme="light" closeButton />
        </Provider>
      </body>
    </html>
  );
}
