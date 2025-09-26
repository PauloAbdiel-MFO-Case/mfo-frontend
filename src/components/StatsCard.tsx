import { Card, CardContent } from "@/components/ui/card"
import { Users, CheckCircle, Clock, XCircle } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  icon: React.ReactNode
}

export function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="bg-[#1b1b1b] rounded-2xl shadow-lg">
      <CardContent className="flex items-center gap-4 p-6">
        <div className="p-3 rounded-full bg-zinc-800 text-green-400">{icon}</div>
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
