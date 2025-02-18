import Sidebar from "@/components/sidebar";
import { IdCard } from "lucide-react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "et-names",
  description: "Collection of Ethiopian names",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      href: "https://github.com/ashenafiDL/et-names",
      label: "GitHub",
    },
  ];
  return (
    <html lang="en">
      <body
        className={`${jetBrainsMono.className} container mx-auto px-4 antialiased md:px-0`}
      >
        <header className="flex flex-row items-center justify-between border-b">
          <div className="flex flex-row items-center gap-4 py-6 text-lg font-bold">
            <IdCard /> ET-NAMES
          </div>

          <div>
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className="text-lg text-gray-600 duration-200 hover:text-black hover:underline"
                target="_blank"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 gap-8 py-6 sm:grid-cols-5">
          <Sidebar />

          <main className="col-span-3">{children}</main>
        </div>
      </body>
    </html>
  );
}
