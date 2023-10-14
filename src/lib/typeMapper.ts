import type { DiceSet, DieType } from "./types"
import type { Database } from "./types.supabase"

export function toDiceSet(rows: Database["public"]["Tables"]["DiceSet"]["Row"][]): DiceSet[] {
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    name: row.name,
    dice: [],
  }))
}

export function toDie(rows: Database["public"]["Tables"]["DieType"]["Row"][]): DieType[] {
  return rows.map((row) => ({
    id: row.id,
    faces: row.faces,
    count: row.count,
    name: row.name ?? "",
  }))
}
