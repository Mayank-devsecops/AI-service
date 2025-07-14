import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  phone: string
  service: string
  call_date: string
  call_time: string
  message?: string
  newsletter: boolean
  created_at?: string
  status?: "pending" | "contacted" | "completed"
}
