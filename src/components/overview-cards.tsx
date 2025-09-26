import { Card, CardContent } from "@/components/ui/card";

interface OverviewCardProps {
    title: string;
    value: string;
    barColor: string;
}

function OverviewCard({ title, value, barColor }: OverviewCardProps) {
    return (
        <Card className="p-4 bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
            <CardContent className="p-0">
                <p className="text-sm text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
                <div className="h-2 mt-2 rounded-full bg-black/20 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '75%', background: barColor }} />
                </div>
            </CardContent>
        </Card>
    )
}

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <OverviewCard title="Patrimônio Atual" value="R$ 2.67M" barColor="linear-gradient(90deg, #34d1ff, #5e3bff)" />
        <OverviewCard title="Projeção 10a" value="R$ 3.17M" barColor="linear-gradient(90deg, #2de27a, #1fb2ff)" />
        <OverviewCard title="Aposentadoria" value="65 anos" barColor="linear-gradient(90deg, #8f61ff, #ff6b6b)" />
        {/* Você pode adicionar mais cards aqui se precisar */}
    </div>
  );
}