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
