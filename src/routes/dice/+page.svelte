<script lang="ts">
  import type { DiceSet } from "$lib/types"
  import { getSlug } from "$lib/utils"

  export let data: { diceSets: DiceSet[] }
  $: {
    console.log("data", data)
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <a class="button" href="dice/{getSlug(set.name)}">{set.name}</a>
  {/each}
</div>
