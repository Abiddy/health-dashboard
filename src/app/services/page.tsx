"use client"

import { ServiceCard } from "@/components/ui/service-card"
import { Button } from "@/components/ui/button"
import { services } from "@/lib/data"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with view all services button */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-light">Services</h1>
          <Button variant="ghost" className="text-white hover:text-white hover:bg-black/30">
            View my services
          </Button>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map(service => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              imageSrc={service.imageSrc}
              tag={service.tag}
              subtext={service.subtext}
              showArrow={service.id === "1"}
              href={`/services/${service.id}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 