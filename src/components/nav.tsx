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
            "text-gray-600 hover:text-black hover:underline",
            pathname === link.url ? "font-bold text-black" : "",
          )}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
