import { LoadDepends } from "$lib/const"
import { getDiceSets } from "$lib/stores/firestore"
import type { LayoutLoad } from "./$types"

// let's make this a SPA for now
export const ssr = false

export const load: LayoutLoad = async ({ depends }) => {
  const diceSets = await getDiceSets()
  depends(LoadDepends.DiceSets)
  return { diceSets }
}
