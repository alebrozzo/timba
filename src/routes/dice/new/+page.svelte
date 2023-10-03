<script lang="ts">
  import { saveDiceSet } from "$lib/storage"
  import { getNewSet } from "$lib/utils"
  import { goto } from "$app/navigation"
  import type { DiceSet } from "$lib/types"
  import { addDieType, deleteDieType } from "../../../lib/diceUtils"
  import SetEditor from "../diceSetEditor.svelte"

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

{#each set.dice as dice}
  <SetEditor {dice} handleDeleteType={() => (set = deleteDieType(set, dice.type))} />
{/each}

<button type="button" on:click={() => (set = addDieType(set))}>Add die type</button>

<div><button type="button" on:click={() => handleSaveSet(set)}>Save</button></div>
