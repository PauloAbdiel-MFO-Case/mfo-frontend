"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function ClientNavTabs() {
  const pathname = usePathname();

  const tabs = [
    { name: "Alocações", href: "/alocacoes" },
    { name: "Projeção", href: "/" }, 
    { name: "Histórico", href: "/historico" },
  ];

  return (
    <nav className="flex items-center gap-8 border-b border-white/10">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={cn(
            "py-4 text-sm font-semibold text-gray-400 border-b-2 border-transparent hover:text-white",
            (pathname === tab.href || (tab.href === "/" && pathname.startsWith("/(dashboard)"))) && "text-white border-b-white"
          )}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}