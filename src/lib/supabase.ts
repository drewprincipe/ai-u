import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string
          age: number
          user_type: string
          current_situation: string
          learning_goals: string
          time_commitment: string
          preferred_learning_style: string
          subjects: string[]
          timeline: string
          onboarding_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name: string
          age: number
          user_type: string
          current_situation: string
          learning_goals: string
          time_commitment: string
          preferred_learning_style: string
          subjects: string[]
          timeline: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string
          age?: number
          user_type?: string
          current_situation?: string
          learning_goals?: string
          time_commitment?: string
          preferred_learning_style?: string
          subjects?: string[]
          timeline?: string
          onboarding_completed?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}