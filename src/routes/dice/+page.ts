import { getDiceSets } from "$lib/stores/supabase"
import type { DiceSet } from "$lib/types"

type PageData = {
  diceSets: DiceSet[]
}

export async function load(): Promise<PageData> {
  console.log("#### load")

  const diceSets = await getDiceSets()
  return { diceSets }
}

//4708	E.M.VOLEIBOL MJV 16-17 6 A 10 AÑOS	01/10/2023	30/06/2024	25	3	Actividad de iniciación a la modalidad deportiva, según rango de edad.
//2385	E.M.SQUASH ELOLA LXV 17-19	01/10/2023	30/06/2024	25	9	Actividad de iniciación a la modalidad deportiva, según rango de edad.
