'use client';

import { useState } from 'react';
import { MovementCard } from './movement-card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Movement } from '@/types/simulation.types';
import { Button } from './ui/button';
import { AddMovementModal } from './add-movement-modal';
import { EditMovementModal } from './edit-movement-modal';
import { useDeleteMovement } from '@/hooks/useDeleteMovement';
import { ConfirmationDialog } from './confirmation-dialog';

interface MovementsListProps {
  movements: Movement[];
  versionId: number | null;
}

export function MovementsList({ movements, versionId }: MovementsListProps) {
  const [activeFilter, setActiveFilter] = useState('financeira');
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [editingMovement, setEditingMovement] = useState<Movement | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [movementToDelete, setMovementToDelete] = useState<number | null>(null);

  const { mutate: deleteMovement } = useDeleteMovement();

  const handleDeleteClick = (movementId: number) => {
    setMovementToDelete(movementId);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!versionId || !movementToDelete) return;
    deleteMovement({ movementId: movementToDelete, versionId });
    setIsConfirmDeleteOpen(false);
    setMovementToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsConfirmDeleteOpen(false);
    setMovementToDelete(null);
  };

  const financialMovements = movements.filter(m => m.type === 'ENTRADA' || m.type === 'SAIDA');
  const immobilizedMovements = movements.filter(m => m.type === 'IMOBILIZADA');

  const filteredMovements = activeFilter === 'financeira'
    ? financialMovements
    : immobilizedMovements;

  return (
    <>
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-blue-400">Movimentações</h2>
            <Button size="sm" className="bg-green-500/10 hover:bg-green-500/20 text-green-400" onClick={() => setAddModalOpen(true)}>+</Button>
          </div>

          <ToggleGroup
            type="single"
            defaultValue="financeira"
            value={activeFilter}
            onValueChange={(value) => {
              if (value) setActiveFilter(value);
            }}
            className="bg-white/5 p-1 rounded-lg flex-wrap"
          >
            <ToggleGroupItem value="financeira" className="px-3 py-1 text-sm text-gray-300 rounded-md data-[state=on]:bg-[#1b1b1b] data-[state=on]:text-white">
              Financeiras
            </ToggleGroupItem>
            <ToggleGroupItem value="imobilizada" className="px-3 py-1 text-sm text-gray-300 rounded-md data-[state=on]:bg-[#1b1b1b] data-[state=on]:text-white">
              Imobilizadas
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMovements.map((movement) => (
            <MovementCard
              key={movement.id}
              type={movement.type === 'ENTRADA' ? 'credit' : movement.type === 'SAIDA' ? 'debit' : 'immobilized'}
              title={movement.description}
              details={`Frequência: ${movement.frequency}`}
              amount={`R$ ${movement.value.toLocaleString('pt-BR')}`}
              onEdit={() => setEditingMovement(movement)}
              onDelete={() => handleDeleteClick(movement.id)}
            />
          ))}
        </div>
      </section>
      <AddMovementModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        versionId={versionId}
      />
      <EditMovementModal
        isOpen={!!editingMovement}
        onClose={() => setEditingMovement(null)}
        movement={editingMovement}
        versionId={versionId}
      />
      <ConfirmationDialog
        isOpen={isConfirmDeleteOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar Exclusão"
        description="Tem certeza que deseja deletar esta movimentação? Esta ação não pode ser desfeita."
      />
    </>
  );
}