import { getDiceSets } from "$lib/stores/firestore"
import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async () => {
  console.log("### load")

  const diceSets = await getDiceSets()
  return { diceSets }
}

// export async function load(): LayoutServerLoad {
//   return await getDiceSets()
// }
