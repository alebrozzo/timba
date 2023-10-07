<script lang="ts">
  import type { DiceSet } from "$lib/types"

  export let data: { diceSets: DiceSet[] }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <a class="button" href="dice/{set.slug}">{set.name}</a>
  {/each}
</div>
