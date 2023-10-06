import { diceSetStore } from "$lib/stores/diceStore"
import { supabase } from "$lib/supabase"
import { toDiceSet } from "$lib/typeMapper"

export async function load() {
  const { data, error } = await supabase.from("DiceSet").select()
  if (error) {
    console.error(error)
    // TODO: handle error, return 404?
  }

  const diceSets = toDiceSet(data ?? [])
  diceSetStore.set(diceSets)
  return { diceSets }
}
