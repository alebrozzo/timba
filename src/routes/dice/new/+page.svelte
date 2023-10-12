<script lang="ts">
  import { goto } from "$app/navigation"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import { getNewSet } from "$lib/utils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  let set: DiceSet = getNewSet()

  async function handleSaveSet(e: CustomEvent<{ diceSet: DiceSet }>) {
    set = { ...e.detail.diceSet }
    const saveResult = await saveDiceSet(set)
    if (saveResult) {
      diceSetStore.set(saveResult)
    }

    // TODO: error toast
  }
</script>

<DiceSetEditor
  set={structuredClone(set)}
  on:DiceSetCancelEdit={() => goto("/dice")}
  on:DiceSetSaveEdit={handleSaveSet}
/>
