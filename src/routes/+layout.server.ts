import { getDiceSets } from "$lib/stores/firestore"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async () => {
  const diceSets = await getDiceSets()
  return { diceSets }
}
