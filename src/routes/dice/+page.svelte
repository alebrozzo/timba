<script lang="ts">
  import { onMount } from "svelte"
  import { getEmptyTimba, getAllTimba } from "$lib/storage"
  import { getSlug } from "$lib/utils"

  let data = getEmptyTimba()
  onMount(async () => {
    data = getAllTimba()
  })
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <!-- TODO: use slug -->
    <a class="button" href="dice/{getSlug(set.name)}">{set.name}</a>
  {/each}
</div>
