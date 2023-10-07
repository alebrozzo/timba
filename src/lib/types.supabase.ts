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
      DiceSet: {
        Row: {
          createdAt: string
          id: string
          isActive: boolean
          isPublic: boolean
          name: string
          slug: string
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          id?: string
          isActive?: boolean
          isPublic?: boolean
          name: string
          slug: string
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          id?: string
          isActive?: boolean
          isPublic?: boolean
          name?: string
          slug?: string
          updatedAt?: string
        }
        Relationships: []
      }
      DieType: {
        Row: {
          count: number
          createdAt: string
          diceSetId: string
          faces: number
          id: string
          name: string | null
          updatedAt: string
          userId: string | null
        }
        Insert: {
          count?: number
          createdAt?: string
          diceSetId: string
          faces?: number
          id?: string
          name?: string | null
          updatedAt?: string
          userId?: string | null
        }
        Update: {
          count?: number
          createdAt?: string
          diceSetId?: string
          faces?: number
          id?: string
          name?: string | null
          updatedAt?: string
          userId?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "DieType_diceSetId_fkey"
            columns: ["diceSetId"]
            referencedRelation: "DiceSet"
            referencedColumns: ["id"]
          }
        ]
      }
      members: {
        Row: {
          team_id: number
          user_id: number
        }
        Insert: {
          team_id: number
          user_id: number
        }
        Update: {
          team_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "members_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "members_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      teams: {
        Row: {
          id: number
          team_name: string | null
        }
        Insert: {
          id?: number
          team_name?: string | null
        }
        Update: {
          id?: number
          team_name?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      slugify: {
        Args: {
          value: string
        }
        Returns: string
      }
      unaccent: {
        Args: {
          "": string
        }
        Returns: string
      }
      unaccent_init: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
