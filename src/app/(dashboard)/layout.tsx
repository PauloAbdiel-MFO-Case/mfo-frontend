import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8 p-8 bg-gradient-to-b from-[#0b0b0b] to-[#0f0f0f] min-h-screen text-gray-200">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}