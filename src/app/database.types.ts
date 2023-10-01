export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cases: {
        Row: {
          client_initials: string | null
          client_location: string | null
          country: string | null
          id: string
          interest_ids: Json | null
          is_remote: boolean | null
          languages: Json | null
          legal_server_id: number | null
          needs_interpreter: boolean | null
          program: string | null
          summary: string | null
          time_to_complete: string | null
          upcoming_hearing_date: string | null
        }
        Insert: {
          client_initials?: string | null
          client_location?: string | null
          country?: string | null
          id?: string
          interest_ids?: Json | null
          is_remote?: boolean | null
          languages?: Json | null
          legal_server_id?: number | null
          needs_interpreter?: boolean | null
          program?: string | null
          summary?: string | null
          time_to_complete?: string | null
          upcoming_hearing_date?: string | null
        }
        Update: {
          client_initials?: string | null
          client_location?: string | null
          country?: string | null
          id?: string
          interest_ids?: Json | null
          is_remote?: boolean | null
          languages?: Json | null
          legal_server_id?: number | null
          needs_interpreter?: boolean | null
          program?: string | null
          summary?: string | null
          time_to_complete?: string | null
          upcoming_hearing_date?: string | null
        }
        Relationships: []
      }
      interests: {
        Row: {
          form_response: Json | null
          id: string
          listing_id: string
          listing_type: string | null
          user_id: string | null
        }
        Insert: {
          form_response?: Json | null
          id?: string
          listing_id?: string
          listing_type?: string | null
          user_id?: string | null
        }
        Update: {
          form_response?: Json | null
          id?: string
          listing_id?: string
          listing_type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          accreditations: Json | null
          bar_number: string | null
          hours_per_week: number | null
          id: string
          immigration_law_experience: string | null
          interest_ids: Json | null
          languages: Json | null
          roles: Json | null
          start_date: string | null
        }
        Insert: {
          accreditations?: Json | null
          bar_number?: string | null
          hours_per_week?: number | null
          id?: string
          immigration_law_experience?: string | null
          interest_ids?: Json | null
          languages?: Json | null
          roles?: Json | null
          start_date?: string | null
        }
        Update: {
          accreditations?: Json | null
          bar_number?: string | null
          hours_per_week?: number | null
          id?: string
          immigration_law_experience?: string | null
          interest_ids?: Json | null
          languages?: Json | null
          roles?: Json | null
          start_date?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
