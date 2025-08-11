"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import UserMenu from "../auth/user-menu";

export default function Header() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Create", href: "/post/create" },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link className="font-bold text-xl" href="/">
            Next JS 15 Blog
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary"
                )}
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block">{/* Placeholder for Search */}</div>
          {/* Placeholder for theme toggle */}
          <div className="flex items-center gap-2">
            {isPending ? null : session?.user ? (
              <UserMenu />
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => router.push("/auth")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
