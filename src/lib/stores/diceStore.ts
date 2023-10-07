import { get, writable } from "svelte/store"
import { supabase } from "$lib/supabase"
import type { DiceSet, DieType } from "$lib/types"
import type { DBDiceSet, DBDieType } from "$lib/types.supabase.helpers"

export const diceSetStore = writable<DiceSet[]>([])

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
  console.log("getDiceSets")

  const { data, error } = await supabase.from("DiceSet").select("id, name, slug, DieType (id, faces, name, count)")
  if (error) {
    console.error(error)
    // TODO: handle error, return 404?
  }

  const diceSets = data ?? []
  diceSetStore.set(diceSets.map(toDiceSet))
  return get(diceSetStore)
}

export async function saveDiceSet(set: DiceSet): Promise<DiceSet[] | null> {
  // transactions are not supported by supabase yet and rpc requires does not accept multi params

  const diceSetValues = { name: set.name, slug: "" }
  if (!set.id) {
    console.log("about to insert")
    const { data, error } = await supabase.from("DiceSet").insert(diceSetValues).select().single()
    console.log("insertedSet", data, error)
    if (error) {
      console.error(error)
      // TODO: show toast. Raise event?
      return null
    }

    set.id = data.id
  } else {
    console.log("about to update")
    const { error } = await supabase.from("DiceSet").update(diceSetValues)
    if (error) {
      console.error(error)
      // TODO: show toast
      return null
    }
  }

  const dieTypeValues = set.dice.map((x) => ({ diceSetId: set.id!, faces: x.faces, count: x.count, name: x.name }))
  const { error } = await supabase.from("DieType").upsert(dieTypeValues)
  if (error) {
    console.error(error)
    // TODO: show toast
  }

  console.log("saveDiceSet done!!!")

  return await getDiceSets()
}

export async function deleteDiceSet(setId: /*DiceSet["id"]*/ string): Promise<DiceSet[]> {
  const { error } = await supabase.from("DiceSet").delete().eq("id", setId)
  if (error) {
    console.error(error)
  }

  return await getDiceSets()
}

export function getDiceSetBySlug(diceSetSlug: DiceSet["slug"]): DiceSet | null {
  const diceSets = get(diceSetStore)

  const set = get(diceSetStore).filter((x) => x.slug === diceSetSlug)
  if (set.length === 0) {
    console.log("getDiceSetBySlug!!!!!!!!!", diceSets)
    console.warn(diceSetSlug + " did not exist in the database")
    return null
  }

  if (set.length > 1) {
    console.warn(diceSetSlug + " exists twice in the database")
  }

  console.log("getDiceSetBySlug", set[0])

  return set[0]
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
