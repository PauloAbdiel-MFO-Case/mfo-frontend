"use client"; 

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  History,
  UserPlus,
  ArrowRightLeft,
  BookUser,
  BadgeDollarSign,
  Landmark,
  ChevronDown,
} from "lucide-react";

export function Sidebar() {
  const [openMenu, setOpenMenu] = useState("clientes"); // Controla qual menu está aberto

  return (
    <aside className="sticky top-8 h-[calc(100vh-64px)] w-[280px] rounded-2xl bg-gradient-to-b from-white/[.015] to-white/[.01] p-6 shadow-2xl shadow-black/60 ring-1 ring-white/5">

        <div className="flex justify-center mb-5">
          {/* Div "Pai" com o fundo em gradiente e padding */}
          <div className="p-[2px] rounded-full bg-[linear-gradient(96.19deg,_#FA4515_65.3%,_#D6A207_82.48%,_#94290C_107.43%)]">
            {/* Div "Filho" com o fundo real e o conteúdo */}
            <div className="px-5 py-2 text-lg font-bold tracking-wider text-orange-400 rounded-full bg-gradient-to-r from-[#181818] to-[#0f0f0f]">
              ✧ Anka
            </div>
          </div>
        </div>  

      <nav className="flex flex-col gap-2 mt-2">
        {/* Clientes */}
        <div
          className="flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer text-gray-300 hover:bg-white/5"
          onClick={() => setOpenMenu(openMenu === "clientes" ? "" : "clientes")}
        >
          <Users size={20} />
          <span className="text-lg font-semibold">Clientes</span>
          <ChevronDown size={18} className="ml-auto transition-transform duration-300" style={{ transform: openMenu === 'clientes' ? 'rotate(180deg)' : 'none' }} />
        </div>
        {openMenu === "clientes" && (
          <div className="flex flex-col gap-2 pl-11">
            <Link href="/" className="px-2 py-2 text-gray-400 rounded-md hover:bg-white/5 hover:text-white">Dashboard</Link>
            <Link href="/alocacoes" className="px-2 py-2 text-gray-400 rounded-md hover:bg-white/5 hover:text-white">Projeção</Link>
            <Link href="/historico" className="px-2 py-2 text-gray-400 rounded-md hover:bg-white/5 hover:text-white">Histórico</Link>
          </div>
        )}

        {/* Outros Itens */}
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300">
            <UserPlus size={20} /> <span className="text-lg font-semibold">Prospects</span><ChevronDown size={18} className="ml-auto" />
        </div>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300">
            <ArrowRightLeft size={20} /> <span className="text-lg font-semibold">Consolidação</span><ChevronDown size={18} className="ml-auto" />
        </div>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300">
            <BookUser size={20} /> <span className="text-lg font-semibold">CRM</span><ChevronDown size={18} className="ml-auto" />
        </div>
         <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300">
            <BadgeDollarSign size={20} /> <span className="text-lg font-semibold">Captação</span><ChevronDown size={18} className="ml-auto" />
        </div>
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl text-gray-300">
            <Landmark size={20} /> <span className="text-lg font-semibold">Financeiro</span><ChevronDown size={18} className="ml-auto" />
        </div>
      </nav>
      
      <div className="mt-auto text-xs text-center text-gray-600">© Anka</div>
    </aside>
  );
}