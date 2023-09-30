<script lang="ts">
  import { onMount } from "svelte"
  import { emptyTimba, getAllTimba } from "$lib/storage"
  import type { Timba } from "$lib/types"

  let data = emptyTimba
  onMount(async () => {
    data = getAllTimba()
  })
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <a class="button" href="dice/{set.name}">(TODO: existing)</a>
  {/each}
</div>
