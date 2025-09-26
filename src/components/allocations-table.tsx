"use client"

import { Card, CardContent } from "@/components/ui/card"

const allocations = [
  { cliente: "Empresa A", projeto: "Sistema Web", status: "Ativo" },
  { cliente: "Empresa B", projeto: "App Mobile", status: "Pendente" },
  { cliente: "Empresa C", projeto: "Consultoria", status: "Encerrado" },
]

export function AllocationsTable() {
  return (
    <Card className="bg-[#1b1b1b] rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <table className="w-full text-sm text-left text-zinc-400">
          <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-700">
            <tr>
              <th className="px-4 py-2">Cliente</th>
              <th className="px-4 py-2">Projeto</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((row, idx) => (
              <tr key={idx} className="border-b border-zinc-800">
                <td className="px-4 py-3">{row.cliente}</td>
                <td className="px-4 py-3">{row.projeto}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      row.status === "Ativo"
                        ? "bg-green-500/20 text-green-400"
                        : row.status === "Pendente"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
