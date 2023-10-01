<script lang="ts">
  import { saveNewDiceSet } from "$lib/storage"
  import type { DiceSet, Die } from "$lib/types"
  import SetEditor from "../diceSetEditor.svelte"

  let die: Die = { faces: 6 }
  let set: DiceSet = { name: "", dice: [{ type: { ...die }, count: 1 }] }

  function handleAddDieType() {
    set = { ...set, dice: [...set.dice, { count: 1, type: { ...die } }] }
  }

  function handleDeleteDieType(ix: any) {
    set = { ...set, dice: set.dice.filter((x) => x !== ix) }
  }

  function handleSaveSet() {
    saveNewDiceSet(set)
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<label>Nombre del set de dados:<input type="text" maxlength="30" bind:value={set.name} /></label>

<h2>DADOS:</h2>

{#each set.dice as dice}
  <SetEditor {dice} handleDelete={() => handleDeleteDieType(dice)} />
{/each}

<button type="button" on:click={handleAddDieType}>Add die type</button>

<div><button type="button" on:click={handleSaveSet}>Save</button></div>
