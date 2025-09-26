import { ChevronDown } from "lucide-react";

export function Header() {
    return (
        <header className="flex items-center gap-7">
            {/* Seletor de Cliente */}
            <div className="flex items-center gap-3 px-5 py-3 border border-white/10 rounded-full bg-gradient-to-b from-white/[.01] to-transparent cursor-pointer min-w-[250px]">
                <strong className="text-xl font-bold text-white">Matheus Silveira</strong>
                <ChevronDown size={20} className="ml-auto text-gray-400" />
            </div>

            {/* Patrimônio */}
            <div className="ml-5">
                <div className="text-sm text-gray-400">Patrimônio Líquido Total</div>
                <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold tracking-wide text-white">R$ 2.679.930,00</div>
                    <div className="font-bold text-cyan-400">+52,37%</div>
                </div>
            </div>
        </header>
    )
}