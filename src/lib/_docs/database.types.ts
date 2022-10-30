export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      member: {
        Row: {
          member_id: string
          first_name: string | null
          last_name: string | null
        }
        Insert: {
          member_id: string
          first_name?: string | null
          last_name?: string | null
        }
        Update: {
          member_id?: string
          first_name?: string | null
          last_name?: string | null
        }
      }
      post: {
        Row: {
          post_id: string
          space_id: string | null
          member_id: string
          body: string | null
        }
        Insert: {
          post_id: string
          space_id?: string | null
          member_id: string
          body?: string | null
        }
        Update: {
          post_id?: string
          space_id?: string | null
          member_id?: string
          body?: string | null
        }
      }
      role: {
        Row: {
          role_id: string
          role_type: Database["public"]["Enums"]["role_type"]
          member_id: string
          space_id: string
        }
        Insert: {
          role_id: string
          role_type: Database["public"]["Enums"]["role_type"]
          member_id: string
          space_id: string
        }
        Update: {
          role_id?: string
          role_type?: Database["public"]["Enums"]["role_type"]
          member_id?: string
          space_id?: string
        }
      }
      space: {
        Row: {
          space_id: string
          owner_id: string
          icon: string | null
          name: string | null
          space_type: Database["public"]["Enums"]["space_type"]
        }
        Insert: {
          space_id: string
          owner_id: string
          icon?: string | null
          name?: string | null
          space_type?: Database["public"]["Enums"]["space_type"]
        }
        Update: {
          space_id?: string
          owner_id?: string
          icon?: string | null
          name?: string | null
          space_type?: Database["public"]["Enums"]["space_type"]
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      echo: {
        Args: { phrase: string; delay: number }
        Returns: string
      }
    }
    Enums: {
      role_type: "owner" | "admin" | "member"
      space_type: "public" | "private"
    }
  }
}

