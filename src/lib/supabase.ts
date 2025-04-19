import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

// Environment variables are automatically loaded from .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a client for server components - only use in server components!
export const createServerClient = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  })
}

// Create a client for use in the browser
export const createBrowserSupabaseClient = () => 
  createBrowserClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  })

// Type for a selected service
export type SelectedService = {
  id: string
  title?: string
  status: 'pending' | 'active' | 'completed' | 'canceled'
  selected_at: string
  appointment_date?: string | null
  notes?: string | null
}

// Types for our database schema
export type Tables = {
  users: {
    id: string
    full_name: string | null
    email: string | null
    avatar_url: string | null
    created_at: string
  }
  patient_info: {
    id: string
    user_id: string
    biomarkers_tested: number
    biomarkers_in_range: number
    biomarkers_out_range: number
    biological_age: number | null
    chronological_age: number | null
    years_difference: number | null
    doctor_name: string | null
    doctor_title: string | null
    doctor_avatar: string | null
  }
  services: {
    id: string
    title: string
    description: string
    image_url: string | null
    subtext: string | null
    show_arrow: boolean | null
    tag: string | null
  }
  user_services: {
    id: string
    user_id: string
    service_id: string
    status: string | null
    appointment_date: string | null
    notes: string | null
  }
} 