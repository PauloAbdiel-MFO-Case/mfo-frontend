import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovementCardProps {
  type: 'credit' | 'debit';
  title: string;
  details: string;
  amount: string;
}

export function MovementCard({ type, title, details, amount }: MovementCardProps) {
  const isCredit = type === 'credit';

  return (
    <Card className={cn(
      "bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5",
      isCredit && "ring-green-500/30"
    )}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-white">{title}</p>
            <p className="text-xs text-gray-400">{details}</p>
          </div>
          <div className="flex items-center gap-2">
            {isCredit 
              ? <ArrowUpCircle size={20} className="text-green-400" /> 
              : <ArrowDownCircle size={20} className="text-red-400" />
            }
            <p className={cn(
              "text-lg font-bold",
              isCredit ? "text-green-400" : "text-red-400"
            )}>
              {amount}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}