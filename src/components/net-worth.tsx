interface NetWorthProps {
  value: number;
}

export function NetWorth({ value }: NetWorthProps) {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value);

    return (
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/[.015] to-transparent ring-1 ring-white/5">
            <p className="text-sm text-gray-400">Patrimônio Líquido Total</p>
            <div className="flex items-baseline gap-2 mt-1">
                <h2 className="text-3xl font-bold tracking-wide text-white">{formattedValue}</h2>
            </div>
        </div>
    )
}