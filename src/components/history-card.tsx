import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";

interface Version {
  date: string;
  finalPatrimony: string;
  retirementAge: number;
  version: number;
}

interface HistoryCardProps {
  simulationName: string;
  versions: Version[];
}

export function HistoryCard({ simulationName, versions }: HistoryCardProps) {
  return (
    <Card className="bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
      <CardHeader>
        <CardTitle className="text-gray-200 text-xl">{simulationName}</CardTitle>
      </CardHeader>
      <CardContent>
        {versions && versions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow className="border-b-white/10">
                <TableHead className="text-gray-400">Data</TableHead>
                <TableHead className="text-gray-400">Patrimônio final</TableHead>
                <TableHead className="text-gray-400">Idade Aposentadoria</TableHead>
                <TableHead className="text-gray-400">Versão</TableHead>
                <TableHead className="text-right text-gray-400">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {versions.map((v, index) => (
                <TableRow key={index} className="border-b-white/10">
                  <TableCell className="font-medium text-white">{v.date}</TableCell>
                  <TableCell className="text-white">{v.finalPatrimony}</TableCell>
                  <TableCell className="text-white">{v.retirementAge}</TableCell>
                  <TableCell className="text-white">{v.version}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">Ver no gráfico</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex justify-end">
             <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">Ver no gráfico</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}