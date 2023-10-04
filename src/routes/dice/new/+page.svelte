<script lang="ts">
  import { goto } from "$app/navigation"
  import { saveDiceSet } from "$lib/storage"
  import type { DiceSet } from "$lib/types"
  import { getNewSet } from "$lib/utils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  let set: DiceSet = getNewSet()

  function handleSaveSet(set: DiceSet) {
    const errors = saveDiceSet(set)
    if (errors.length > 0) {
      //TODO: show toast
      return
    }

    goto("/dice")
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<label>Dice set name:<input type="text" maxlength="30" bind:value={set.name} /></label>

<h2>Dice:</h2>

<DiceSetEditor bind:set />

<div><button type="button" on:click={() => handleSaveSet(set)}>Save</button></div>
