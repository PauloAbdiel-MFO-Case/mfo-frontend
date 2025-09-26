import { ClientSelector } from "@/components/client-selector";
import { InsurancesList } from "@/components/insurances-list";
import { MovementsList } from "@/components/movements-list";
import { NetWorth } from "@/components/net-worth";
import { OverviewCards } from "@/components/overview-cards";
import { ProjectionCard } from "@/components/projection-card";
import { StatusSelector } from "@/components/status-selector"; // <-- Importe
import { Suggestions } from "@/components/suggestions";
import { Timeline } from "@/components/timeline";

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center">
        <ClientSelector />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <NetWorth />
        </div>
        <div className="lg:col-span-2">
          <OverviewCards />
        </div>
      </div>
      
      {/* ADICIONADO AQUI */}
      <StatusSelector />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProjectionCard />
        </div>
        <div className="lg:col-span-1">
          <Suggestions />
        </div>
      </div>
     
      <Timeline />
      
      <div>
        <MovementsList />
        <InsurancesList />
      </div>
    </div>
  )
}