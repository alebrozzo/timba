// pnpm supabase gen types typescript --project-id jweexgzgaumlketmxyzp --schema public > src/lib/types.supabase.ts

import type { Database } from "./types.supabase"

export type DBDiceSet = Database["public"]["Tables"]["DiceSet"]["Row"]
export type DBDieType = Database["public"]["Tables"]["DieType"]["Row"]
