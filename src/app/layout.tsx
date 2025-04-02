import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetBrainsMono = localFont({
  src: "../../public/fonts/JetBrainsMono-VariableFont.ttf",
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsMono.className} antialiased md:px-0`}>
        <ThemeProvider>
          {children}

          <Toaster richColors position="top-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
