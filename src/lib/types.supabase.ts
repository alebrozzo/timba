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
      DiceSet_Die: {
        Row: {
          count: number
          createdAt: string
          diceSetId: string
          dieId: number
          id: number
          isActive: boolean
          updatedAt: string
        }
        Insert: {
          count?: number
          createdAt?: string
          diceSetId: string
          dieId: number
          id?: number
          isActive?: boolean
          updatedAt?: string
        }
        Update: {
          count?: number
          createdAt?: string
          diceSetId?: string
          dieId?: number
          id?: number
          isActive?: boolean
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "DiceSet_Die_diceSetId_fkey"
            columns: ["diceSetId"]
            referencedRelation: "DiceSet"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "DiceSet_Die_dieId_fkey"
            columns: ["dieId"]
            referencedRelation: "Die"
            referencedColumns: ["id"]
          }
        ]
      }
      Die: {
        Row: {
          createdAt: string
          faces: number
          id: number
          isActive: boolean
          name: string | null
          updatedAt: string
        }
        Insert: {
          createdAt?: string
          faces: number
          id?: number
          isActive?: boolean
          name?: string | null
          updatedAt?: string
        }
        Update: {
          createdAt?: string
          faces?: number
          id?: number
          isActive?: boolean
          name?: string | null
          updatedAt?: string
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
