import { Card } from "@/components/ui/card"

interface BiologicalAgeCardProps {
  biologicalAge: number;
  yearsDifference: number;
}

export function BiologicalAgeCard({ biologicalAge, yearsDifference }: BiologicalAgeCardProps) {
  return (
    <Card className="relative overflow-hidden bg-[#8B4513] border-0 rounded-3xl w-full mx-auto h-[300px] sm:h-[350px] md:h-[400px] text-white">
      <div className="p-6 sm:p-7 md:p-8 relative z-10 h-full flex flex-col">
        <h2 className="text-2xl sm:text-2xl md:text-3xl font-light tracking-wide mb-auto text-white">Biological age</h2>
        <div className="space-y-2 md:space-y-4">
          <div className="text-5xl sm:text-6xl md:text-[80px] font-light leading-none text-white">
            {biologicalAge}
          </div>
          <div className="space-y-0 md:space-y-1">
            <p className="text-xl sm:text-xl md:text-2xl font-light tracking-wide text-white">
              {Math.abs(yearsDifference)} years {yearsDifference < 0 ? 'younger' : 'older'}
            </p>
            <p className="text-xl sm:text-xl md:text-2xl font-light tracking-wide text-white">
              than chronological age
            </p>
          </div>
        </div>
      </div>

      {/* Silhouette Shadow Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Main head and upper body silhouette */}
        <div className="absolute right-[10%] top-[5%] w-[90%] h-[120%] 
                       bg-black/30 blur-[50px] rounded-[40%]">
        </div>
        
        {/* Secondary shadow for depth */}
        <div className="absolute right-[5%] top-[20%] w-[70%] h-[60%] 
                       bg-black/20 blur-[60px]">
        </div>
        
        {/* Background color gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4513] via-[#8B4513]/90 to-[#654321]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
      </div>
    </Card>
  )
} 