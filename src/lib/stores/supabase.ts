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

export async function getDiceSet(setId: NonNullable<DiceSet["id"]>): Promise<DiceSet | null> {
  const { data, error } = await supabase
    .from("DiceSet")
    .select("id, name, slug, DieType (id, faces, name, count)")
    .eq("id", setId)
    .single()

  if (!data) {
    return null
  }

  const diceSets = toDiceSet(data)
  console.log("getDiceSet loaded correctly", diceSets)
  return diceSets
}

export async function saveDiceSet(set: DiceSet): Promise<DiceSet[] | null> {
  // transactions are not supported by supabase yet and rpc does not accept multi params
  const diceSetValues = { name: set.name, slug: set.slug }
  const dbValues = !set.id ? null : await getDiceSet(set.id)
  if (!dbValues) {
    // insert
    const { data, error } = await supabase.from("DiceSet").insert(diceSetValues).select().single()
    if (error) {
      console.error(error)
      // TODO: show toast. Raise event?
      return null
    }

    // indicate the new Id for child records
    set.id = data.id
  } else {
    // update
    const { error } = await supabase.from("DiceSet").update(diceSetValues).eq("id", set.id!)
    if (error) {
      console.error(error)
      // TODO: show toast
      return null
    }
  }

  // TODO: move to GroupBy when browser support
  const dieTypeInserts = set.dice.filter((x) => !x.id).map((x) => ({ ...x, diceSetId: set.id! }))
  const dieTypeUpdates = set.dice.filter((x) => x.id).map((x) => ({ ...x, diceSetId: set.id! }))
  const dieTypeDeletes = dbValues?.dice.filter((x) => !set.dice.find((d) => d.id === x.id)).map((x) => x.id!) ?? []

  if (dieTypeInserts.length > 0) {
    const { error } = await supabase.from("DieType").insert(dieTypeInserts)
    if (error) {
      console.error(error)
      // TODO: show toast
      return null
    }
  }

  if (dieTypeUpdates.length > 0) {
    const { error } = await supabase.from("DieType").upsert(dieTypeUpdates)
    if (error) {
      console.error(error)
      // TODO: show toast
      return null
    }
  }

  if (dieTypeDeletes.length > 0) {
    const { error } = await supabase.from("DieType").delete().in("id", dieTypeDeletes)
    if (error) {
      console.error(error)
    }
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
