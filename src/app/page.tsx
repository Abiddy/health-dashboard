"use client"

import * as React from "react"
import { TrendingUp, ArrowRight } from "lucide-react"
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import Image from "next/image"
import { ServiceCard } from "@/components/ui/service-card"
import { previewServices } from "@/lib/data"

const biomarkerData = [
  { range: "out", count: 15, fill: "hsl(var(--chart-1))" }, // Out of range - purple/red
  { range: "in", count: 72, fill: "hsl(var(--chart-3))" },  // In range - blue
]

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-3))"];

const chartConfig = {
  count: {
    label: "Biomarkers",
  },
  out: {
    label: "Out of range",
    color: "hsl(var(--chart-1))",
  },
  in: {
    label: "In range",
    color: "hsl(var(--chart-3))",
  },
}

export default function Home() {
  // Calculate total biomarkers
  const totalBiomarkers = React.useMemo(() => {
    return biomarkerData.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  // Simplified pie chart and indicator rendering
  const renderPieChart = () => {
    return (
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
    );
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
        {/* Left Section - 2 columns wide */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
          <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-400 font-light mb-2 md:mb-3">Biomarkers</h2>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide mb-4 sm:mb-6 md:mb-8 text-white">312 biomarkers tested</h1>
            
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

          <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6 text-white-400">
            {/* Doctor Info */}
            <div className="flex items-center gap-3 md:gap-4 mb-8">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-700">
                <img
                  src="/doctor.png"
                  alt="Dr. Aarav Lingmoor"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl">Dr. Aarav Lingmoor, MD</h3>
                <p className="text-sm sm:text-base text-gray-400">Supervisory Longevity Physician</p>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
              {/* Left Column - Stats */}
              <div className="flex flex-col justify-center h-full pr-4">
                <div className="space-y-3">
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight whitespace-nowrap">15 out of range</p>
                  <p className="text-3xl sm:text-4xl lg:text-5xl font-medium leading-tight text-gray-400">72 in range</p>
                </div>
              </div>

              {/* Right Column - Pie Chart and Indicators */}
              {renderPieChart()}
            </div>
          </Card>
        </div>

        {/* Right Section - 1 column wide */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {/* Biological Age Card */}
          <Card className="relative overflow-hidden bg-[#8B4513] border-0 rounded-3xl w-full mx-auto h-[300px] sm:h-[350px] md:h-[400px] text-white">
            <div className="p-6 sm:p-7 md:p-8 relative z-10 h-full flex flex-col">
              <h2 className="text-2xl sm:text-2xl md:text-3xl font-light tracking-wide mb-auto text-white">Biological age</h2>
              <div className="space-y-2 md:space-y-4">
                <div className="text-5xl sm:text-6xl md:text-[80px] font-light leading-none text-white">26</div>
                <div className="space-y-0 md:space-y-1">
                  <p className="text-xl sm:text-xl md:text-2xl font-light tracking-wide text-white">15 years younger</p>
                  <p className="text-xl sm:text-xl md:text-2xl font-light tracking-wide text-white">than chronological age</p>
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

          {/* Active Services Card */}
          <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6 text-white w-full mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-4 sm:mb-6 text-gray-400">Services</h2>
            
            <div className="space-y-4">
              {/* Doctor Appointment Service */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-800">
                  <img
                    src="/doctor.png"
                    alt="Dr. Aarav Lingmoor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-base sm:text-lg text-white">Aarav Lingmoor, MD</p>
                  <p className="text-sm sm:text-base text-gray-400">Draw appointment</p>
                </div>
              </div>

              {/* Action Button */}
              <Button variant="outline" size="lg" className="w-full bg-black/30 hover:bg-black/40 text-white">
                <Link href={`/services/3`} className="w-full flex items-center justify-center">
                  Get started
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Featured Services Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-light text-white">Services</h2>
          <Link href="/services">
            <Button variant="ghost" className="text-white hover:text-white hover:bg-black/30">
              View my services
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {previewServices.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              subtext={service.subtext}
              showArrow={service.showArrow}
              href={`/services/${service.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}