'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/app/auth-provider';
import { useRouter } from 'next/navigation';

type DateOption = {
  date: string;
  slots: string[];
};

interface ServiceSelectionFormProps {
  serviceId: string;
  availableDates: DateOption[];
}

export default function ServiceSelectionForm({ serviceId, availableDates }: ServiceSelectionFormProps) {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();

  // Debug: Log user ID whenever it changes
  useEffect(() => {
    console.log("Current user ID:", user?.id);
  }, [user]);
  
  // Form state
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Get time slots for the selected date
  const timeSlots = selectedDate 
    ? availableDates.find(d => d.date === selectedDate)?.slots || []
    : availableDates[0]?.slots || [];
  
  const handleSubmit = async () => {
    // Check if user is authenticated
    if (!user || !user.id) {
      console.error("No user ID available:", user);
      setError('You must be logged in to select a service');
      setTimeout(() => router.push('/auth/login'), 1500);
      return;
    }

    console.log("Submitting with user ID:", user.id);
    
    if (!selectedDate || !selectedTime) {
      setError('Please select both a date and time');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const appointmentDate = `${selectedDate} ${selectedTime}`;

      // Prepare request body
      const requestBody = {
        serviceId,
        appointmentDate,
        notes: notes.trim() || null,
        userId: user.id // Safe to use here since we checked above
      };
      
      console.log("Sending request with data:", JSON.stringify(requestBody));
      
      const response = await fetch('/api/services/select', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include'
      });
      
      console.log("Response status:", response.status);
      
      // Handle non-OK responses
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error || 'Failed to select service');
      }
      
      // Handle success
      const responseData = await response.json();
      console.log("Success response:", responseData);
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Error details:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Show login prompt if not authenticated
  if (!authLoading && !user) {
    return (
      <div className="space-y-6">
        <div className="bg-amber-900/30 text-amber-400 p-4 rounded-lg text-center">
          Please log in to book an appointment
        </div>
        <Button 
          onClick={() => router.push('/auth/login')}
          className="w-full bg-white text-black hover:bg-gray-200 mt-4"
          size="lg"
        >
          Sign In
        </Button>
      </div>
    );
  }
  
  if (success) {
    return (
      <div className="bg-green-900/30 text-green-400 p-4 rounded-lg text-center">
        Service successfully selected! We will be in touch shortly regarding your appointment.
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* User ID debug info */}
      <div className="text-xs text-gray-400 mb-2">
        User ID: {user?.id ? user.id.substring(0, 8) + '...' : 'Not available'}
      </div>
      
      {/* Date Selection */}
      <div>
        <h3 className="text-lg font-medium mb-3">Available Dates</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {availableDates.map((dateOption) => (
            <button
              key={dateOption.date}
              type="button"
              className={`p-4 rounded-lg border ${
                selectedDate === dateOption.date
                  ? 'border-white bg-white/10'
                  : 'border-gray-700 bg-black/30 hover:bg-black/50'
              } focus:outline-none focus:ring-2 focus:ring-white/20`}
              onClick={() => setSelectedDate(dateOption.date)}
            >
              {dateOption.date}
            </button>
          ))}
        </div>
      </div>
      
      {/* Time Selection */}
      <div>
        <h3 className="text-lg font-medium mb-3">Available Times</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              className={`p-4 rounded-lg border ${
                selectedTime === time
                  ? 'border-white bg-white/10'
                  : 'border-gray-700 bg-black/30 hover:bg-black/50'
              } focus:outline-none focus:ring-2 focus:ring-white/20`}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
      
      {/* Notes */}
      <div>
        <h3 className="text-lg font-medium mb-3">Additional Notes</h3>
        <textarea 
          className="w-full p-3 rounded-lg bg-black/30 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20" 
          rows={3}
          placeholder="Any additional information we should know about your appointment..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      
      {/* Submit Button */}
      <Button 
        onClick={handleSubmit}
        disabled={isLoading || !selectedDate || !selectedTime || !user?.id}
        className="w-full bg-white text-black hover:bg-gray-200 mt-4"
        size="lg"
      >
        {isLoading ? 'Processing...' : 'Select This Service'}
      </Button>
      
      {/* Error message */}
      {error && (
        <div className="mt-3 bg-red-900/30 text-red-400 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
} 