import type { DiceSet, Die } from "./types"
import type { Database } from "./types.supabase"

export function toDiceSet(rows: Database["public"]["Tables"]["DiceSet"]["Row"][]): DiceSet[] {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    dice: [],
  }))
}

export function toDie(rows: Database["public"]["Tables"]["Die"]["Row"][]): Die[] {
  return rows.map((row) => ({
    faces: row.faces,
    name: row.name ?? undefined,
  }))
}
