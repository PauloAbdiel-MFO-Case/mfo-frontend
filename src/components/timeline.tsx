import { Card, CardContent } from "@/components/ui/card";

export function Timeline() {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-blue-400 mb-4">Timeline</h2>
      <Card className="bg-transparent ring-1 ring-white/5">
        <CardContent className="p-8 relative">
          
          {/* Container Principal da Timeline */}
          <div className="flex flex-col justify-between h-40 relative">

            {/* --- EIXO SUPERIOR (SALÁRIO) --- */}
            <div className="relative w-full">
              {/* Informações de Salário (acima) */}
              <div className="absolute -top-6 w-full">
                <span className="absolute text-xs text-gray-400" style={{ left: '0%' }}>CLT: R$ 15.000</span>
                <span className="absolute text-xs text-gray-400" style={{ left: '25%' }}>CLT: R$ 19.000</span>
                <span className="absolute text-xs text-gray-400" style={{ left: '50%' }}>Autônomo: R$ 35.000</span>
                <span className="absolute text-xs font-bold text-gray-300" style={{ right: '0%' }}>Aposentadoria</span>
              </div>
              {/* Linha do Eixo */}
              <div className="h-px w-full bg-white/20" />
              {/* Ticks Verdes */}
              <div className="absolute w-3 h-3 -mt-[5px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '0%' }} />
              <div className="absolute w-3 h-3 -mt-[5px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '25%' }} />
              <div className="absolute w-3 h-3 -mt-[5px] bg-green-400 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '50%' }} />
            </div>

          {/* --- LEGENDAS DE ANO/IDADE (EMBAIXO DE TUDO) --- */}
          <div className="flex justify-between mt-12 font-semibold text-center text-gray-400">
              <div><p>2025</p><p className="text-xs text-gray-500">45 anos</p></div>
              <div><p>2035</p><p className="text-xs text-gray-500">55 anos</p></div>
              <div><p>2045</p><p className="text-xs text-gray-500">65 anos</p></div>
              <div><p>2060</p><p className="text-xs text-gray-500">80 anos</p></div>
          </div>

            {/* --- EIXO INFERIOR (CUSTO DE VIDA) --- */}
            <div className="relative w-full">
               {/* Linha do Eixo */}
              <div className="h-px w-full bg-white/20" />
              {/* Ticks Vermelhos */}
              <div className="absolute w-3 h-3 -mt-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '12.5%' }} />
              <div className="absolute w-3 h-3 -mt-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '37.5%' }} />
              <div className="absolute w-3 h-3 -mt-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '62.5%' }} />
              <div className="absolute w-3 h-3 -mt-[5px] bg-red-500 rounded-full ring-4 ring-[#0f0f0f]" style={{ left: '87.5%' }} />
              {/* Informações de Custo (abaixo) */}
              <div className="absolute top-4 w-full">
                <span className="absolute text-xs text-gray-400" style={{ left: '12.5%' }}>R$ 8.000</span>
                <span className="absolute text-xs text-gray-400" style={{ left: '37.5%' }}>R$ 12.000</span>
                <span className="absolute text-xs text-gray-400" style={{ left: '62.5%' }}>R$ 20.000</span>
                <span className="absolute text-xs text-gray-400" style={{ left: '87.5%' }}>R$ 15.000</span>
              </div>
            </div>

            {/* --- EIXO VERTICAL TRACEJADO (NO MEIO) --- */}
            <div className="absolute top-0 bottom-0 flex justify-between w-full">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex flex-col items-center w-px h-full">
                        <div className="w-px h-full border-l border-dashed border-white/10"></div>
                    </div>
                ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}