import { MovementCard } from "./movement-card";

// Dados estáticos para o exemplo
const movementsData = [
    { type: 'credit', title: 'Herança', details: '09/07/23 - Frequência: Única', amount: 'R$ 220.000' },
    { type: 'debit', title: 'Custo do Filho', details: '09/07/23 - Frequência: Mensal', amount: 'R$ 1.500' },
    { type: 'credit', title: 'Comissão', details: '09/07/23 - Frequência: Anual', amount: 'R$ 500.000' },
    { type: 'debit', title: 'Compra de Imóvel', details: '09/07/23 - Frequência: Única', amount: 'R$ 1.500.000' },
]

export function MovementsList() {
    return (
        <section>
            <h2 className="text-xl font-bold text-blue-400 mb-4">Movimentações</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {movementsData.map((movement, index) => (
                    <MovementCard key={index} {...movement} />
                ))}
            </div>
        </section>
    )
}