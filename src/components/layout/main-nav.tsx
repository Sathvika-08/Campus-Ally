"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";

const studentNavItems = [
  { href: "/chatbot", label: "Chatbot" },
  { href: "/wellness", label: "Wellness" },
  { href: "/events", label: "Events" },
];

const adminNavItems = [
    { href: "/events", label: "Events" },
    { href: "/admin", label: "Admin" },
]

export function MainNav() {
  const pathname = usePathname();
  const { userData } = useAuth();
  const isAdmin = userData?.role === 'admin';

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary-foreground",
            pathname === item.href ? "text-primary-foreground" : "text-muted-foreground"
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
