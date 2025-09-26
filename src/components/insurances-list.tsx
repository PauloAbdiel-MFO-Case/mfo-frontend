import { InsuranceCard } from "./insurance-card";
import { Insurance } from "@/types/simulation.types"; // Importa o tipo

export function InsurancesList({ insurances }: { insurances: Insurance[] }) {
    return (
        <section>
            <h2 className="text-xl font-bold text-gray-200 mt-8 mb-4">Seguros</h2>
            <div className="flex flex-col md:flex-row gap-6">
                 {insurances.map((insurance) => (
                    <InsuranceCard 
                        key={insurance.id}
                        title={insurance.name}
                        details={`Prêmio: R$ ${insurance.monthlyPremium}/mês`}
                        value={`R$ ${insurance.insuredValue.toLocaleString('pt-BR')}`}
                    />
                ))}
            </div>
        </section>
    )
}