import { diceSetStore } from "$lib/stores/diceStore"
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

//resolver con una vista?
export async function load() {
  const { data, error } = await supabase.from("DiceSet").select("id, name, slug, DieType (id, faces, name, count)")
  if (error) {
    console.error(error)
    // TODO: handle error, return 404?
  }
  console.log("333", data)

  const diceSets = data ?? []
  diceSetStore.set(diceSets.map(toDiceSet))
  return { diceSets }
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
