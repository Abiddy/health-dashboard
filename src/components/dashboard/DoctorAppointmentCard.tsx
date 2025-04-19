import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

interface DoctorAppointmentCardProps {
  doctorName: string;
  doctorAvatar: string;
  serviceId?: string;
}

export function DoctorAppointmentCard({ 
  doctorName, 
  doctorAvatar,
  serviceId = '263812af-97e6-49c1-ab43-d17f046d480d' // Default service ID if none provided
}: DoctorAppointmentCardProps) {
  return (
    <Card className="bg-black/20 border-0 p-4 sm:p-5 md:p-6 text-white w-full mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide mb-4 sm:mb-6 text-gray-400">Active Services</h2>
      
      <div className="space-y-4">
        {/* Doctor Appointment Service */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-800">
            <img
              src={doctorAvatar}
              alt={doctorName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-base sm:text-lg text-white">{doctorName.replace(', MD', '')}, MD</p>
            <p className="text-sm sm:text-base text-gray-400">Draw appointment</p>
          </div>
        </div>

        {/* Action Button */}
        <Button variant="outline" size="lg" className="w-full bg-black/30 hover:bg-black/40 text-white">
          <Link href={`/services/${serviceId}`} className="w-full flex items-center justify-center">
            Get started
          </Link>
        </Button>
      </div>
    </Card>
  )
} 