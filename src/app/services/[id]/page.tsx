"use client"

import React from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Mock service data that would normally come from an API
const servicesData = [
  {
    id: "1",
    title: "Health goals",
    description: "Health goals selected by Dr. Vinjamoori for you",
    longDescription: "Our health goals program provides personalized recommendations tailored to your specific health needs. Dr. Vinjamoori will create a customized plan to help you achieve optimal health based on your biomarker results and health history.",
    imageSrc: "/images/1.png",
    price: "$150",
    duration: "60 min",
    availableDates: [
      { date: "Tomorrow", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
      { date: "Wednesday", slots: ["10:00 AM", "1:30 PM", "4:00 PM"] },
      { date: "Thursday", slots: ["9:30 AM", "12:00 PM", "3:30 PM"] }
    ]
  },
  {
    id: "2",
    title: "RoVR Blood Panel",
    description: "Measure silent killers and potential aging markers",
    longDescription: "Our comprehensive blood panel identifies key biomarkers related to aging, inflammation, cardiovascular health, and metabolic function. Early detection of these 'silent killers' can help prevent serious health issues before symptoms appear.",
    imageSrc: "/images/2.png",
    price: "$299",
    duration: "30 min",
    availableDates: [
      { date: "Tomorrow", slots: ["8:30 AM", "10:30 AM", "3:00 PM"] },
      { date: "Wednesday", slots: ["9:00 AM", "12:30 PM", "4:30 PM"] },
      { date: "Friday", slots: ["8:00 AM", "11:00 AM", "2:30 PM"] }
    ]
  },
  {
    id: "3",
    title: "Drawsrvort",
    description: "Draw account",
    longDescription: "Our dedicated draw account service provides convenient access to phlebotomy professionals. Our team will collect your blood samples for testing in a comfortable and efficient manner.",
    imageSrc: "/images/3.png",
    price: "$75",
    duration: "15 min",
    availableDates: [
      { date: "Today", slots: ["1:00 PM", "3:30 PM", "5:00 PM"] },
      { date: "Tomorrow", slots: ["9:30 AM", "11:00 AM", "2:30 PM"] },
      { date: "Thursday", slots: ["10:30 AM", "1:00 PM", "4:30 PM"] }
    ]
  },
  // Additional services with the same structure would be defined here
]

export default function ServiceDetailsPage() {
  const params = useParams()
  const serviceId = params.id as string
  
  // Find the service with the matching ID
  const service = servicesData.find(s => s.id === serviceId) || servicesData[0]
  
  // State for selected date and time
  const [selectedDate, setSelectedDate] = React.useState<string | null>(null)
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null)
  
  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to dashboard
        </Link>
        
        <Card className="bg-black/20 border-0 overflow-hidden rounded-xl">
          {/* Service image header */}
          <div className="relative h-[240px] w-full">
            <Image 
              src={service.imageSrc} 
              alt={service.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="p-6 sm:p-8">
            {/* Service info */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl sm:text-3xl font-medium">{service.title}</h1>
                <div className="text-lg font-medium text-white">{service.price}</div>
              </div>
              
              <p className="text-gray-400 mb-4">{service.description}</p>
              <p className="text-white/80 mb-4">{service.longDescription}</p>
              
              <div className="flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{service.duration}</span>
              </div>
            </div>
            
            {/* Available dates */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Available Dates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {service.availableDates.map(dateInfo => (
                  <Button 
                    key={dateInfo.date}
                    variant={selectedDate === dateInfo.date ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => {
                      setSelectedDate(dateInfo.date)
                      setSelectedTime(null)
                    }}
                  >
                    {dateInfo.date}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Available times */}
            {selectedDate && (
              <div className="mb-8">
                <h2 className="text-xl font-medium mb-4">Available Times</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {service.availableDates
                    .find(d => d.date === selectedDate)?.slots
                    .map(time => (
                      <Button 
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className="w-full"
                        onClick={() => setSelectedTime(time)}
                      >
                        {time}
                      </Button>
                    ))
                  }
                </div>
              </div>
            )}
            
            {/* Book appointment button */}
            <Button 
              size="lg" 
              className="w-full mt-4"
              disabled={!selectedDate || !selectedTime}
            >
              Book Appointment
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
} 