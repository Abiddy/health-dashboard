'use client';

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar } from 'lucide-react'
import { Card } from '@/components/ui/card'
import ServiceSelectionForm from './ServiceSelectionForm'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function ServicePage() {
  const params = useParams();
  const id = params.id as string;
  
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Mock data for available dates and times (in a real app, this could come from another table)
  const availableDates = [
    { date: "Tomorrow", slots: ["9:00 AM", "11:30 AM", "2:00 PM"] },
    { date: "Wednesday", slots: ["10:00 AM", "1:30 PM", "4:00 PM"] },
    { date: "Thursday", slots: ["9:30 AM", "12:00 PM", "3:30 PM"] }
  ];
  
  // Mock price and duration (in a real app, these could be fields in your services table)
  const price = "$150";
  const duration = "60 min";
  
  useEffect(() => {
    async function fetchService() {
      setIsLoading(true);
      try {
        const supabase = createBrowserSupabaseClient();
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          notFound();
        }
        
        setService(data);
      } catch (err) {
        console.error('Error fetching service:', err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchService();
  }, [id]);
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show error state
  if (error || !service) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/30 text-red-400 p-6 rounded-lg text-center">
            <h2 className="text-xl font-medium mb-2">Error Loading Service</h2>
            <p>The requested service could not be found.</p>
            <Link href="/services" className="inline-block mt-4 text-white hover:text-white underline">
              Return to services
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link href="/services" className="inline-flex items-center text-gray-400 hover:text-white mb-6">
          ← Back to services
        </Link>
        
        <Card className="bg-black/20 border-0 overflow-hidden rounded-xl">
          {/* Service image header */}
          {service.image_url && (
            <div className="relative h-[240px] w-full">
              <Image 
                src={service.image_url} 
                alt={service.title}
                fill
                className="object-cover"
              />
              {service.tag && (
                <span className="absolute top-4 left-4 bg-[#8B4513]/90 text-white text-xs px-3 py-1 rounded-full">
                  {service.tag}
                </span>
              )}
            </div>
          )}
          
          <div className="p-6 sm:p-8">
            {/* Service info */}
            <div className="mb-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-2xl sm:text-3xl font-medium">{service.title}</h1>
                <div className="text-lg font-medium text-white">{price}</div>
              </div>
              
              <p className="text-gray-400 mb-4">{service.description}</p>
              {service.subtext && (
                <p className="text-white/80 mb-4">{service.subtext}</p>
              )}
              
              <div className="flex items-center text-gray-400">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{duration}</span>
              </div>
            </div>
            
            {/* Service selection form section */}
            <div className="mb-8">
              <h2 className="text-xl font-medium mb-4">Select This Service</h2>
              <p className="text-gray-400 mb-6">
                Select this service to add it to your account. Choose a date and time for your appointment.
              </p>
              
              <ServiceSelectionForm serviceId={service.id} availableDates={availableDates} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
} 