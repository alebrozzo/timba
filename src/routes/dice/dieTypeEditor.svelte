<script lang="ts">
  import type { DieType } from "$lib/types"

  export let dieType: DieType

  export let handleDeleteType: () => void
</script>

<div class="display-vertical editor-container">
  <label>Cantidad:<input type="number" min="1" bind:value={dieType.count} /></label>
  <label>Caras:<input type="number" min="1" bind:value={dieType.faces} /></label>
  <label>Nombre:<input type="text" maxlength="30" placeholder="(opcional)" bind:value={dieType.name} /></label>
  <button type="button" on:click={handleDeleteType}>Delete</button>
</div>
