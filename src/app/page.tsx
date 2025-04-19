"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { ServiceCard } from "@/components/ui/service-card"
import { useAuth } from "@/app/auth-provider"
import { createBrowserSupabaseClient } from "@/lib/supabase"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  BiomarkersCard,
  DoctorInfoCard,
  BiologicalAgeCard,
  DoctorAppointmentCard
} from "@/components/dashboard"

// Interface for patient info data structure
interface PatientInfo {
  id: string;
  user_id: string;
  biomarkers_tested: number;
  biomarkers_in_range: number;
  biomarkers_out_range: number;
  biological_age: number;
  chronological_age: number;
  years_difference: number;
  doctor_name: string;
  doctor_title: string;
  doctor_avatar: string;
  created_at?: string;
}

// Interface for database service
interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tag?: string;
  subtext?: string;
  show_arrow?: boolean;
  created_at?: string;
}

export default function Home() {
  const { user } = useAuth();
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch patient data and services
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createBrowserSupabaseClient();
        
        // Fetch patient info if user is logged in
        if (user) {
          const { data: patientData, error: patientError } = await supabase
            .from('patient_info')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
            
          if (patientError) {
            console.error('Error fetching patient info:', patientError);
          } else {
            setPatientInfo(patientData);
          }
        }
        
        // Fetch services (regardless of user login status)
        const { data: servicesData, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .limit(4); // Just get first 4 for homepage preview
          
        if (servicesError) {
          console.error('Error fetching services:', servicesError);
        } else if (servicesData && servicesData.length > 0) {
          setServices(servicesData);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);

  // If loading, show loading state with skeleton UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
          {/* Left Section Skeleton - 2 columns wide */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            {/* Biomarkers Card Skeleton */}
            <div className="bg-black/20 rounded-lg p-4 sm:p-5 md:p-6">
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-12 w-2/3 mb-8" />
              <Skeleton className="h-8 w-full" />
            </div>

            {/* Doctor Info Card Skeleton */}
            <div className="bg-black/20 rounded-lg p-4 sm:p-5 md:p-6">
              <div className="flex items-center gap-3 md:gap-4 mb-8">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex justify-center">
                  <Skeleton className="w-48 h-48 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Section Skeleton - 1 column wide */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Biological Age Card Skeleton */}
            <div className="relative bg-[#8B4513]/30 border-0 rounded-3xl w-full mx-auto h-[300px] sm:h-[350px] md:h-[400px] p-6">
              <div className="h-full flex flex-col">
                <Skeleton className="h-8 w-40 mb-auto" />
                <div className="space-y-4">
                  <Skeleton className="h-16 w-20" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-6 w-36" />
                  </div>
                </div>
              </div>
            </div>

            {/* Services Card Skeleton */}
            <div className="bg-black/20 rounded-lg p-4 sm:p-5 md:p-6">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Services Section Skeleton */}
        <div className="max-w-7xl mx-auto mt-12">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-black/20 rounded-lg overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-5 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
        {/* Left Section - 2 columns wide */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
          {/* Biomarkers Card */}
          <BiomarkersCard 
            biomarkersCount={patientInfo?.biomarkers_tested || 312}
          />

          {/* Doctor Info Card */}
          <DoctorInfoCard 
            doctorName={patientInfo?.doctor_name || "Dr. Aarav Lingmoor, MD"}
            doctorTitle={patientInfo?.doctor_title || "Supervisory Longevity Physician"}
            doctorAvatar={patientInfo?.doctor_avatar || "/doctor.png"}
            biomarkersOutOfRange={patientInfo?.biomarkers_out_range || 15}
            biomarkersInRange={patientInfo?.biomarkers_in_range || 72}
          />
        </div>

        {/* Right Section - 1 column wide */}
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          {/* Biological Age Card */}
          <BiologicalAgeCard 
            biologicalAge={patientInfo?.biological_age || 26}
            yearsDifference={patientInfo?.years_difference || -15}
          />

          {/* Doctor Appointment Card */}
          <DoctorAppointmentCard 
            doctorName={patientInfo?.doctor_name || "Dr. Aarav Lingmoor, MD"}
            doctorAvatar={patientInfo?.doctor_avatar || "/doctor.png"}
            serviceId={3}
          />
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
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                imageSrc={service.image_url || '/doctor.png'}
                subtext={service.subtext}
                tag={service.tag}
                showArrow={Boolean(service.show_arrow)}
                href={`/services/${service.id}`}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-8 bg-black/20 rounded-lg">
              <p className="text-gray-400 mb-2">No services available</p>
              <p className="text-sm text-gray-500">Services will appear here once they are added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}