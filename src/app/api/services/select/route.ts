import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Define request type
interface ServiceRequest {
  serviceId: string;  // Camel case in the request
  appointmentDate?: string;  // Camel case in the request
  notes?: string;
  userId: string;  // Camel case in the request
}

export async function POST(request: Request) {
  try {
    // Log request details for debugging
    const requestText = await request.text();
    console.log("Raw request body:", requestText);
    
    // Parse the request body
    let body: ServiceRequest;
    try {
      body = JSON.parse(requestText) as ServiceRequest;
      console.log("Parsed request body:", body);
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    // Extract fields from the request body (camelCase)
    const { serviceId, appointmentDate, notes, userId } = body;
    
    // Validate required fields
    console.log(`Validating userId: "${userId}", serviceId: "${serviceId}"`);
    
    if (!serviceId) {
      return NextResponse.json(
        { error: 'Service ID is required' }, 
        { status: 400 }
      );
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' }, 
        { status: 400 }
      );
    }
    
    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    
    // Verify if the service exists
    console.log(`Checking if service "${serviceId}" exists`);
    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('id, title')
      .eq('id', serviceId)
      .single();
    
    if (serviceError) {
      console.error("Service lookup error:", serviceError);
      return NextResponse.json(
        { error: 'Service not found' }, 
        { status: 404 }
      );
    }
    
    if (!service) {
      return NextResponse.json(
        { error: 'Service not found' }, 
        { status: 404 }
      );
    }
    
    console.log(`Service found: "${service.title}"`);
    
    // Create the service record
    // IMPORTANT: Map camelCase request fields to snake_case database column names
    console.log(`Creating user_service record with user_id: "${userId}", service_id: "${serviceId}"`);
    const insertData = {
      user_id: userId,         // snake_case for database
      service_id: serviceId,   // snake_case for database
      status: 'Active',
      appointment_date: appointmentDate || null,  // snake_case for database
      notes: notes || null,
    };
    
    console.log("Insert data:", insertData);
    
    const { data: userService, error: insertError } = await supabase
      .from('user_services')
      .insert(insertData)
      .select()
      .single();
    
    if (insertError) {
      console.error('Error inserting user service:', insertError);
      return NextResponse.json(
        { error: `Failed to select service: ${insertError.message}` }, 
        { status: 500 }
      );
    }
    
    console.log("Service selection successful:", userService);
    
    return NextResponse.json({
      message: 'Service selected successfully',
      data: userService
    });
    
  } catch (error: any) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` }, 
      { status: 500 }
    );
  }
}
