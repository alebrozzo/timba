<script lang="ts">
  import { saveNewDiceSet } from "$lib/storage"
  import type { DiceSet, Die } from "$lib/types"

  let die: Die = { faces: 6 }
  let set: DiceSet = { name: "", dice: [{ type: die, count: 1 }] }

  function handleSubmit() {
    saveNewDiceSet(set)
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<div class="display-vertical editor-container">
  <label>Nombre del set de dados:<input type="text" maxlength="30" bind:value={set.name} /></label>
  DADOS
  <label>Cantidad:<input type="number" min="1" bind:value={set.dice[0].count} /></label>
  <label>Caras:<input type="number" min="1" bind:value={die.faces} /></label>
  <label>Nombre:<input type="text" maxlength="30" placeholder="(opcional)" bind:value={die.name} /></label>
</div>

<button type="button" on:click={handleSubmit}>Add</button>
