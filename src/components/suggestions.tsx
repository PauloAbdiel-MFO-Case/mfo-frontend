import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";

export function Suggestions() {
    return (
        <aside className="space-y-4">
            <Card className="bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
                <CardContent className="p-4">
                    <p className="text-xs font-bold text-green-400 uppercase">Sugestão</p>
                    <p className="mt-1 text-white">Economize R$ 4.110 por 24 meses para voltar ao plano original</p>
                    <Button  variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/40" size="sm">Aceitar</Button>
                </CardContent>
            </Card>
             <Card className="bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
                <CardContent className="p-4">
                    <p className="text-xs font-bold text-green-400 uppercase">Sugestão</p>
                    <p className="mt-1 text-white">Adie sua aposentadoria em 2 anos para voltar ao plano original</p>
                    <Button  variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/40" size="sm">Aceitar</Button>
                </CardContent>
            </Card>
        </aside>
    )
}