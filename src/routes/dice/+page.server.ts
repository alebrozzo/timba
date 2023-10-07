import { getDiceSets } from "$lib/stores/diceStore"

export async function load() {
  console.log("#### load")

  const diceSets = await getDiceSets()
  return { diceSets }
}
