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
      time_capsules: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string | null
          file_url: string | null
          unlock_date: string
          is_locked: boolean
          password: string
          attempts: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message?: string | null
          file_url?: string | null
          unlock_date: string
          is_locked?: boolean
          password: string
          attempts?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string | null
          file_url?: string | null
          unlock_date?: string
          is_locked?: boolean
          password?: string
          attempts?: number
          created_at?: string
        }
      }
    }
  }
}