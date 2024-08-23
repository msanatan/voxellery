import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Voxellery",
  description: "The premier gallery for Voxel art lovers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col">
          <NavBar />
        </div>
        <main className="flex-grow px-4 sm:px-6 py-3">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
