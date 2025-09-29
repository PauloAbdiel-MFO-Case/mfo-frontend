import "@/app/globals.css"
import { QueryProvider } from "@/components/query-provider"
import { Toaster } from "sonner"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-[#0f0f0f] text-white flex h-screen w-screen overflow-hidden">
        <QueryProvider>
          <main className="flex flex-col flex-1">
            <div className="p-4 sm:p-6 overflow-y-auto">{children}</div>
          </main>
        </QueryProvider>
        <Toaster />
      </body>
    </html>
  )
}
