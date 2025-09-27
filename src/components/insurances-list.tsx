import { useState } from 'react';
import { InsuranceCard } from "./insurance-card";
import { Insurance } from "@/types/simulation.types";
import { Button } from './ui/button';
import { AddInsuranceModal } from './add-insurance-modal';
import { EditInsuranceModal } from './edit-insurance-modal';
import { useDeleteInsurance } from '@/hooks/useDeleteInsurance';

interface InsurancesListProps {
    insurances: Insurance[];
    versionId: number | null;
}

export function InsurancesList({ insurances, versionId }: InsurancesListProps) {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [editingInsurance, setEditingInsurance] = useState<Insurance | null>(null);

    const { mutate: deleteInsurance } = useDeleteInsurance();

    const handleDelete = (insuranceId: number) => {
        if (!versionId) return;
        if (confirm('Tem certeza que deseja deletar este seguro?')) {
            deleteInsurance({ insuranceId, versionId });
        }
    };

    return (
        <>
            <section>
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-xl font-bold text-fuchsia-400 mt-8">Seguros</h2>
                    <Button size="sm" className="bg-fuchsia-500/10 hover:bg-fuchsia-500/20 text-fuchsia-400 mt-8" onClick={() => setAddModalOpen(true)}>+</Button>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    {insurances.map((insurance) => (
                        <InsuranceCard 
                            key={insurance.id}
                            title={insurance.name}
                            details={`Prêmio: R$ ${insurance.monthlyPremium}/mês`}
                            value={`R$ ${insurance.insuredValue.toLocaleString('pt-BR')}`}
                            onEdit={() => setEditingInsurance(insurance)}
                            onDelete={() => handleDelete(insurance.id)}
                        />
                    ))}
                </div>
            </section>
            <AddInsuranceModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                versionId={versionId}
            />
            <EditInsuranceModal
                isOpen={!!editingInsurance}
                onClose={() => setEditingInsurance(null)}
                insurance={editingInsurance}
                versionId={versionId}
            />
        </>
    )
}