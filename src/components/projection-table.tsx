import { useState } from 'react';
import { ProjectionResult } from '@/types/projection.types';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface ProjectionTableProps {
  projectionData: ProjectionResult[] | undefined;
  projectionDataWithoutInsurance?: ProjectionResult[] | undefined;
  isLoading: boolean;
  isError: boolean;
}

export function ProjectionTable({
  projectionData,
  projectionDataWithoutInsurance,
  isLoading,
  isError,
}: ProjectionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  if (isLoading) {
    return <div className="h-[250px] w-full flex items-center justify-center text-gray-400">Carregando projeção...</div>;
  }

  if (isError) {
    return <div className="h-[250px] w-full flex items-center justify-center text-red-400">Erro ao carregar dados.</div>;
  }

  if (!projectionData || projectionData.length === 0) {
    return <div className="h-[250px] w-full flex items-center justify-center text-orange-400">Aguardando seleção ou dados indisponíveis...</div>;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = projectionData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(projectionData.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableCaption>Projeção Patrimonial Anual</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ano</TableHead>
            <TableHead>Patrimônio Financeiro</TableHead>
            <TableHead>Patrimônio Não Financeiro</TableHead>
            <TableHead className="text-right">Patrimônio Total</TableHead>
            {projectionDataWithoutInsurance && <TableHead className="text-right">Total s/ Seguros</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((data, index) => (
            <TableRow key={data.year}>
                          <TableCell className="font-medium text-white">{data.year}</TableCell>
                          <TableCell className="text-white">{data.financialPatrimony.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                          <TableCell className="text-white">{data.nonFinancialPatrimony.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                          <TableCell className="text-right text-white">{data.totalPatrimony.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                          {projectionDataWithoutInsurance && (
                            <TableCell className="text-right text-white">
                              {projectionDataWithoutInsurance[indexOfFirstItem + index]?.totalPatrimony.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </TableCell>
                          )}            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end space-x-2">
        <Button onClick={handlePreviousPage} disabled={currentPage === 1} variant="outline" size="sm">
          Anterior
        </Button>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline" size="sm">
          Próxima
        </Button>
      </div>
    </div>
  );
}
