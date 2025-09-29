import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
import Link from "next/link";

// Using `any` here because the full backend type is not defined yet in a shared location.
// This should be replaced with a proper type import later.
interface Version extends Record<string, any> {
  id: number;
  version: number;
  createdAt: string;
  finalPatrimony: number;
}

interface HistoryCardProps {
  simulationName: string;
  versions: Version[];
}

export function HistoryCard({ simulationName, versions }: HistoryCardProps) {

  const formattedValue = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);
  }

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
                  <TableCell className="font-medium text-white">{new Date(v.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-white">{formattedValue(v.finalPatrimony)}</TableCell>
                  <TableCell className="text-white">65</TableCell>
                  <TableCell className="text-white">{v.version}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/?versionId=${v.id}`}>
                      <Button variant="outline" size="sm" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">Ver no gráfico</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">Nenhuma versão encontrada para esta simulação.</p>
        )}
      </CardContent>
    </Card>
  );
}