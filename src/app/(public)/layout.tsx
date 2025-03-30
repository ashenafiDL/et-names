import Container from "@/components/container";
import Footer from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import Nav from "@/components/nav";
import UserAvatar from "@/components/user-avatar";
import { Analytics } from "@vercel/analytics/react";
import { IdCard } from "lucide-react";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <header className="flex flex-row items-center justify-between border-b">
        <Container className="flex flex-row items-center justify-between">
          <Link
            href="/"
            className="flex flex-row items-center gap-4 py-4 text-lg font-bold"
          >
            <IdCard /> ET-NAMES
          </Link>

          <Nav />

          <div className="flex flex-row items-center gap-4">
            <UserAvatar />
            <ModeToggle />
          </div>
        </Container>
      </header>

      {children}

      <Footer />

      <Analytics />
    </div>
  );
}
