import Container from "@/components/container";
import { ModeToggle } from "@/components/mode-toggle";
import Nav from "@/components/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { IdCard } from "lucide-react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jetBrainsMono.className} antialiased md:px-0`}>
        <ThemeProvider>
          <header className="flex flex-row items-center justify-between border-b">
            <Container className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center gap-4 py-4 text-lg font-bold">
                <IdCard /> ET-NAMES
              </div>

              <Nav />

              <ModeToggle />
            </Container>
          </header>

          {children}

          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
