import { InsuranceCard } from "./insurance-card";

// Dados estáticos para o exemplo
const insurancesData = [
    { title: 'Seguro de Vida Familiar', details: 'Seguro de Vida • Duração: 15 anos • Prêmio: R$ 120/mês', value: 'R$ 500.000' },
    { title: 'Seguro de Invalidez', details: 'Seguro de Invalidez • Duração: 5 anos • Prêmio: R$ 300/mês', value: 'R$ 100.000' },
]

export function InsurancesList() {
    return (
        <section>
            <h2 className="text-xl font-bold text-blue-400 mt-8 mb-4">Seguros</h2>
            <div className="flex flex-col md:flex-row gap-6">
                 {insurancesData.map((insurance, index) => (
                    <InsuranceCard key={index} {...insurance} />
                ))}
            </div>
        </section>
    )
}