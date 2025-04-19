'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/auth-provider';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

interface UserService {
  id: string;
  service_id: string;
  status: string;
  appointment_date: string | null;
  notes: string | null;
  service: {
    id: string;
    title: string;
    description: string;
    image_url: string | null;
    tag?: string | null;
  };
}

export default function MyServicesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [services, setServices] = useState<UserService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    
    const fetchUserServices = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const supabase = createBrowserSupabaseClient();
        
        // Fetch user services with service details using a join
        const { data, error } = await supabase
          .from('user_services')
          .select(`
            id,
            service_id,
            status,
            appointment_date,
            notes,
            service:services(id, title, description, image_url, tag)
          `)
          .eq('user_id', user.id)
          .order('appointment_date', { ascending: true });
        
        if (error) {
          throw error;
        }
        
        setServices(data as UserService[]);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load your services. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchUserServices();
    }
  }, [user, authLoading, router]);
  
  // Format appointment date for display
  const formatAppointmentDate = (dateString: string | null) => {
    if (!dateString) return 'No date scheduled';
    
    // If dateString is a full ISO date
    if (dateString.includes('T')) {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      });
    }
    
    // If dateString is in custom format like "Tomorrow 11:30 AM"
    return dateString;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-light mb-8">My Services</h1>
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-light mb-8">My Services</h1>
          <div className="bg-red-900/30 text-red-400 p-6 rounded-lg text-center">
            <p>{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-900/50 hover:bg-red-900/70"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#111111] text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-light mb-8">My Services</h1>
        
        {services.length === 0 ? (
          <div className="bg-black/20 p-8 rounded-lg text-center">
            <h2 className="text-xl font-medium mb-4">No services selected yet</h2>
            <p className="text-gray-400 mb-6">Browse our services and select the ones you're interested in.</p>
            <Button asChild>
              <Link href="/services">Browse Services</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((userService) => (
              <Card key={userService.id} className="bg-black/20 border-0 overflow-hidden rounded-xl">
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white">
                      {userService.service.tag === 'Blood Test' ? (
                        <span className="text-red-500">🩸</span>
                      ) : (
                        <Calendar className="h-6 w-6" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-medium">{userService.service.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          userService.status === 'Active' 
                            ? 'bg-green-900/30 text-green-400' 
                            : 'bg-yellow-900/30 text-yellow-400'
                        }`}>
                          {userService.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-gray-400">Appointment</p>
                        <p className="font-medium">{formatAppointmentDate(userService.appointment_date)}</p>
                      </div>
                    </div>
                    
                    {userService.notes && (
                      <div className="bg-black/30 p-3 rounded-md">
                        <p className="text-gray-400 text-sm mb-1">Notes</p>
                        <p className="text-sm">{userService.notes}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      variant="outline"
                      className="text-white border-gray-700 bg-black/30 hover:bg-black/50"
                      asChild
                    >
                      <Link href={`/services/${userService.service_id}`}>
                        View Details
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="text-white border-gray-700 bg-black/30 hover:bg-black/50"
                    >
                      Reschedule
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 