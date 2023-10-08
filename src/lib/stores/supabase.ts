import { supabase } from "$lib/supabase"
import type { DiceSet, DieType } from "$lib/types"
import type { DBDiceSet, DBDieType } from "$lib/types.supabase.helpers"

type ApiResponseDieTypeRow = {
  id: DBDieType["id"]
  count: DBDieType["count"]
  faces: DBDieType["faces"]
  name: DBDieType["name"]
}

type ApiResponseDiceSetRow = {
  id: DBDiceSet["id"]
  name: DBDiceSet["name"]
  slug: DBDiceSet["slug"]
  DieType: ApiResponseDieTypeRow[]
}

export async function getDiceSets(): Promise<DiceSet[]> {
  const { data, error } = await supabase.from("DiceSet").select("id, name, slug, DieType (id, faces, name, count)")
  if (error) {
    console.error(error)
    // TODO: handle error, return 404?
  }

  const diceSets = data?.map(toDiceSet) ?? []
  console.log("getDiceSets loaded correctly", diceSets)
  return diceSets
}

export async function saveDiceSet(set: DiceSet): Promise<DiceSet[] | null> {
  // transactions are not supported by supabase yet and rpc does not accept multi params

  const diceSetValues = { name: set.name, slug: set.slug }
  if (!set.id) {
    const { data, error } = await supabase.from("DiceSet").insert(diceSetValues).select().single()
    if (error) {
      console.error(error)
      // TODO: show toast. Raise event?
      return null
    }

    set.id = data.id
  } else {
    const { error } = await supabase.from("DiceSet").update(diceSetValues).eq("id", set.id)
    if (error) {
      console.error(error)
      // TODO: show toast
      return null
    }
  }

  const dieTypeValues = set.dice.map((x) => ({
    diceSetId: set.id!,
    faces: x.faces,
    count: x.count,
    name: x.name,
  }))
  //const dieTypeValues = set.dice.map((x) => ({ ...x, diceSetId: set.id! }))
  const { error } = await supabase.from("DieType").upsert(dieTypeValues)
  if (error) {
    console.error(error)
    // TODO: show toast
    return null
  }

  return await getDiceSets()
}

export async function deleteDiceSet(setId: /*DiceSet["id"]*/ string): Promise<DiceSet[]> {
  const { error } = await supabase.from("DiceSet").delete().eq("id", setId)
  if (error) {
    console.error(error)
  }

  return await getDiceSets()
}

function toDiceSet(apiResult: ApiResponseDiceSetRow): DiceSet {
  return {
    id: apiResult.id,
    name: apiResult.name,
    slug: apiResult.slug,
    dice: apiResult.DieType.map(toDieType),
  }
}

function toDieType(apiResult: ApiResponseDieTypeRow): DieType {
  return {
    id: apiResult.id,
    faces: apiResult.faces,
    count: apiResult.count,
    name: apiResult.name ?? undefined,
  }
}
