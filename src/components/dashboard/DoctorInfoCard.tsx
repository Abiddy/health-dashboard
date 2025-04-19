import { Card } from "@/components/ui/card"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import * as React from "react"

interface DoctorInfoCardProps {
  doctorName: string;
  doctorTitle: string;
  doctorAvatar: string;
  biomarkersOutOfRange: number;
  biomarkersInRange: number;
}

export function DoctorInfoCard({ 
  doctorName,
  doctorTitle,
  doctorAvatar,
  biomarkersOutOfRange,
  biomarkersInRange
}: DoctorInfoCardProps) {
  // Prepare data for pie chart
  const biomarkerData = [
    { range: "out", count: biomarkersOutOfRange, fill: "hsl(var(--chart-1))" }, // Out of range - purple/red
    { range: "in", count: biomarkersInRange, fill: "hsl(var(--chart-3))" },  // In range - blue
  ];

  // Calculate total biomarkers
  const totalBiomarkers = React.useMemo(() => {
    return biomarkerData.reduce((acc, curr) => acc + curr.count, 0);
  }, [biomarkerData]);
  
  return (
    <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6 text-white-400">
      {/* Doctor Info */}
      <div className="flex items-center gap-3 md:gap-4 mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-700">
          <img
            src={doctorAvatar}
            alt={doctorName}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl">{doctorName}</h3>
          <p className="text-sm sm:text-base text-gray-400">{doctorTitle}</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
        {/* Left Column - Stats */}
        <div className="flex flex-col justify-center h-full pr-4">
          <div className="space-y-3">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight whitespace-nowrap">
              {biomarkersOutOfRange} out of range
            </p>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-gray-400">
              {biomarkersInRange} in range
            </p>
          </div>
        </div>

        {/* Right Column - Pie Chart and Indicators */}
        <div className="flex flex-col items-center sm:items-end">
          <div className="w-[220px] h-[220px] mb-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={biomarkerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  dataKey="count"
                  startAngle={90}
                  endAngle={-270}
                  strokeWidth={0}
                >
                  {biomarkerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} stroke="transparent" />
                  ))}
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF">
                    <tspan x="50%" y="47%" textAnchor="middle" fontSize="24px" fontWeight="300">
                      {totalBiomarkers}
                    </tspan>
                    <tspan x="50%" y="58%" textAnchor="middle" fontSize="12px" fill="#9CA3AF">
                      Total
                    </tspan>
                  </text>
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-end gap-8 w-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-1))]" />
              <span className="text-sm text-gray-400">Out of range</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--chart-3))]" />
              <span className="text-sm text-gray-400">In range</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
} 