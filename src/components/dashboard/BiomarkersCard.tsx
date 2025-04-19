import { Card } from "@/components/ui/card"

interface BiomarkersCardProps {
  biomarkersCount: number;
}

export function BiomarkersCard({ biomarkersCount }: BiomarkersCardProps) {
  return (
    <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light mb-2 md:mb-3">Biomarkers</h2>
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide mb-4 sm:mb-6 md:mb-8 text-white">
        {biomarkersCount} biomarkers tested
      </h1>
      
      {/* Bar Graph */}
      <div className="relative h-6 sm:h-7 md:h-8 bg-gray-900 overflow-hidden rounded-lg flex">
        {/* In range segments - darker green shades (approximately 80% width) */}
        <div className="h-full w-[25%] bg-[hsl(var(--progress-green-1))]"></div>
        <div className="h-full w-[20%] bg-[hsl(var(--progress-green-2))]"></div>
        <div className="h-full w-[15%] bg-[hsl(var(--progress-green-3))]"></div>
        <div className="h-full w-[20%] bg-[hsl(var(--progress-green-4))]"></div>
        
        {/* Out of range segments - darker red/pink shades (approximately 20% width) */}
        <div className="h-full w-[8%] bg-[hsl(var(--progress-red-1))]"></div>
        <div className="h-full w-[7%] bg-[hsl(var(--progress-red-2))]"></div>
        <div className="h-full w-[5%] bg-[hsl(var(--progress-red-3))]"></div>
        <div className="h-full w-[0%] bg-[hsl(var(--progress-red-4))]"></div>
      </div>
    </Card>
  )
} 