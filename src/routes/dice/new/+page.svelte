<script lang="ts">
  import { saveNewDiceSet } from "$lib/storage"
  import type { DiceSet, Die } from "$lib/types"
  import SetEditor from "../diceSetEditor.svelte"

  let die: Die = { faces: 6 }
  let set: DiceSet = { name: "", dice: [{ type: { ...die }, count: 1 }] }

  function handleAdd() {
    set = { ...set, dice: [...set.dice, { count: 1, type: { ...die } }] }
  }

  function handleSubmit() {
    saveNewDiceSet(set)
  }

  function handleDelete(ix: any) {
    set = { ...set, dice: set.dice.filter((x) => x !== ix) }
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<label>Nombre del set de dados:<input type="text" maxlength="30" bind:value={set.name} /></label>

<h2>DADOS:</h2>

{#each set.dice as dice, ix}
  <SetEditor {dice} handleDelete={() => handleDelete(dice)} />
{/each}

<button type="button" on:click={handleAdd}>Add die type</button>

<div><button type="button" on:click={handleSubmit}>Save</button></div>
