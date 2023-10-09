<script lang="ts">
  import { goto } from "$app/navigation"
  import { saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import { getNewSet } from "$lib/utils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  let set: DiceSet = getNewSet()

  async function handleSaveSet(set: DiceSet) {
    const saveResult = await saveDiceSet(set)
    if (saveResult) {
      goto("/dice")
    }
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<label>Dice set name:<input type="text" maxlength="30" bind:value={set.name} /></label>

<h2>Dice:</h2>

<DiceSetEditor bind:set />

<div><button type="button" on:click={async () => handleSaveSet(set)}>Save</button></div>
