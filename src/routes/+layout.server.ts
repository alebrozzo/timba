import { LoadDepends } from "$lib/const"
import { getDiceSets } from "$lib/stores/firestore"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ depends }) => {
  const diceSets = await getDiceSets()
  depends(LoadDepends.DiceSets)
  return { diceSets }
}
