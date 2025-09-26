import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function PaginationControls() {
    return (
        <div className="flex items-center justify-center gap-4 mt-8">
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-400">Página 1 de 10</span>
            <Button variant="outline" size="icon" className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}