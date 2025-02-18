"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", href: "/" },
  { label: "Random Name", href: "/random" },
  { label: "Add Name", href: "/add" },
  { label: "About", href: "/about" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-2">
      {items.map((item, index) => (
        <Link
          href={item.href}
          key={index}
          className={cn(
            "text-gray-600 hover:text-black hover:underline",
            pathname === item.href ? "font-bold text-black" : "",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
