import { NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { cookies } from 'next/headers';

// GET handler for patient summary data
export async function GET() {
  try {
    const supabase = createServerClient();
    
    // Get current user from session
    const cookieStore = cookies();
    const supabaseAuth = createServerClient();
    const { data: { session } } = await supabaseAuth.auth.getSession();
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'You must be logged in to access this resource' }, 
        { status: 401 }
      );
    }

    const userId = session.user.id;
    
    // Get patient info for current user
    const { data: patientInfo, error } = await supabase
      .from('patient_info')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching patient info:', error);
      return NextResponse.json(
        { error: 'Failed to fetch patient data' }, 
        { status: 500 }
      );
    }
    
    if (!patientInfo) {
      return NextResponse.json(
        { error: 'Patient information not found' }, 
        { status: 404 }
      );
    }
    
    // Get doctor information if available
    let doctorInfo = null;
    if (patientInfo.doctor_id) {
      const { data: doctor } = await supabase
        .from('users')
        .select('id, full_name, display_name, avatar_url')
        .eq('id', patientInfo.doctor_id)
        .single();
      
      if (doctor) {
        doctorInfo = doctor;
      }
    }
    
    return NextResponse.json({
      biomarkers: {
        tested: patientInfo.biomarkers_tested,
        inRange: patientInfo.biomarkers_in_range,
        outOfRange: patientInfo.biomarkers_out_range,
      },
      age: {
        biological: patientInfo.biological_age,
        chronological: patientInfo.chronological_age,
        difference: patientInfo.years_difference,
      },
      doctor: {
        name: patientInfo.doctor_name,
        title: patientInfo.doctor_title,
        avatar: patientInfo.doctor_avatar,
      }
    });
    
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' }, 
      { status: 500 }
    );
  }
} 