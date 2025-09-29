'use client';

import { useState } from 'react';
import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
  };

  return (
    <div className="flex gap-8 p-8 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f] min-h-screen text-gray-200">
      <Sidebar isMinimized={isSidebarMinimized} onToggle={toggleSidebar} />
      <main className="flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
}