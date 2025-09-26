import { Card, CardContent } from "@/components/ui/card";

interface InsuranceCardProps {
  title: string;
  details: string;
  value: string;
}

export function InsuranceCard({ title, details, value }: InsuranceCardProps) {
  return (
    <Card className="flex-1 bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
       <CardContent className="p-5">
         <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="text-xs text-gray-400">{details}</p>
            </div>
            <p className="text-xl font-bold text-fuchsia-400">{value}</p>
         </div>
       </CardContent>
    </Card>
  )
}