'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AllocationRecord } from '@/types/simulation.types';
import { Button } from './ui/button';
import { AddAllocationRecordModal } from './add-allocation-record-modal';
import { EditAllocationRecordModal } from './edit-allocation-record-modal';
import { useDeleteAllocationRecord } from '@/hooks/useDeleteAllocationRecord';
import { MoreVertical } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

interface AllocationsTableProps {
  allocations: AllocationRecord[];
  versionId: number | null;
}

export function AllocationsTable({ allocations, versionId }: AllocationsTableProps) {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<AllocationRecord | null>(null);
  const [selectedAllocationId, setSelectedAllocationId] = useState<number | null>(null);

  const { mutate: deleteRecord } = useDeleteAllocationRecord();

  const groupedAllocations = allocations.reduce((acc, record) => {
    const key = record.allocation.name;
    if (!acc[key]) {
      acc[key] = {
        ...record.allocation,
        records: [],
      };
    }
    acc[key].records.push(record);
    return acc;
  }, {} as Record<string, { records: AllocationRecord[] } & AllocationRecord['allocation']>);

  const handleOpenAddModal = (allocationId: number) => {
    setSelectedAllocationId(allocationId);
    setAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setAddModalOpen(false);
    setSelectedAllocationId(null);
  };

  const handleDelete = (recordId: number) => {
    if (!versionId) return;
    if (confirm('Tem certeza que deseja deletar este registro?')) {
      deleteRecord({ recordId, versionId });
    }
  };

  return (
    <>
      <Card className="bg-[#1b1b1b] rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-blue-400">Alocações</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {Object.values(groupedAllocations).map((group) => (
              <div key={group.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-white">{group.name} ({group.type})</h3>
                  <Button size="sm" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400" onClick={() => handleOpenAddModal(group.id)}>+ Adicionar Registro</Button>
                </div>
                <table className="w-full text-sm text-left text-zinc-400">
                  <thead className="text-xs uppercase text-zinc-500 border-b border-zinc-700">
                    <tr>
                      <th className="px-4 py-2">Data</th>
                      <th className="px-4 py-2">Valor</th>
                      <th className="px-4 py-2 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.records.map((record) => (
                      <tr key={record.id} className="border-b border-zinc-800">
                        <td className="px-4 py-3">{new Date(record.date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">R$ {record.value.toLocaleString('pt-BR')}</td>
                        <td className="px-4 py-3 text-right">
                           <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#1b1b1b] border-white/10 text-white">
                              <DropdownMenuItem onSelect={() => setEditingRecord(record)} className="focus:bg-white/10">
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => handleDelete(record.id)} className="text-red-400 focus:bg-red-500/10 focus:text-red-400">
                                Deletar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <AddAllocationRecordModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        allocationId={selectedAllocationId}
        versionId={versionId}
      />
      <EditAllocationRecordModal
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        record={editingRecord}
        versionId={versionId}
      />
    </>
  );
}
