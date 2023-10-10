<script lang="ts">
  import { goto } from "$app/navigation"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import { getNewSet } from "$lib/utils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  let set: DiceSet = getNewSet()

  async function handleSaveSet(set: DiceSet) {
    const saveResult = await saveDiceSet(set)
    if (saveResult) {
      diceSetStore.set(saveResult)
      goto("/dice")
      // TODO: redirect to slug page
    }

    // TODO: error toast
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<DiceSetEditor bind:set />

<div><button type="button" on:click={async () => handleSaveSet(set)}>Save</button></div>
