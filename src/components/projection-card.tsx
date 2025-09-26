import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Graph } from "@/components/graph";

export function ProjectionCard() {
    return (
        <Card className="bg-gradient-to-b from-white/[.01] to-white/[.015] rounded-2xl p-2 sm:p-6 ring-1 ring-white/5 shadow-2xl shadow-black/60">
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-gray-200">Projeção Patrimonial</CardTitle>
                <div className="flex gap-4 text-sm font-semibold text-gray-400">
                    <span className="cursor-pointer hover:text-white">Ver com detalhes</span>
                    <span className="cursor-pointer hover:text-white">Ver como Tabela</span>
                </div>
            </CardHeader>
            <CardContent>
                <Graph />
                <div className="flex flex-wrap items-center gap-3 mt-4">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">Plano Original</Button>
                    <Button variant="outline" className="text-white border-green-500/50 bg-green-500/10 ring-2 ring-green-500/20 hover:bg-green-500/20">Situação atual 05/2025</Button>
                    <Button variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/10">Realizado</Button>
                    <Button variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/10">+ Adicionar Simulação</Button>
                </div>
            </CardContent>
        </Card>
    )
}