<script lang="ts">
  import type { Die } from "$lib/types"

  export let dice: {
    type: Die
    count: number
  }

  export let handleDeleteType: () => void
</script>

<div class="display-vertical editor-container">
  <label>Cantidad:<input type="number" min="1" bind:value={dice.count} /></label>
  <label>Caras:<input type="number" min="1" bind:value={dice.type.faces} /></label>
  <label>Nombre:<input type="text" maxlength="30" placeholder="(opcional)" bind:value={dice.type.name} /></label>
  <button type="button" on:click={handleDeleteType}>Delete</button>
</div>
