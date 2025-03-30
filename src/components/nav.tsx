"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "Browse",
      url: "/browse",
    },
    {
      label: "Submit",
      url: "/submit",
    },
    {
      label: "About",
      url: "/about",
    },
  ];

  return (
    <div className="space-x-4">
      {navItems.map((link, index) => (
        <Link
          href={link.url}
          key={index}
          className={cn(
            "text-muted-foreground hover:text-primary/80 hover:underline",
            pathname === link.url ? "text-primary font-bold" : "",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
