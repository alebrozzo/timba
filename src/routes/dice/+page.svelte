<script lang="ts">
  import { onMount } from "svelte"
  import slugify from "slugify"
  import { emptyTimba, getAllTimba } from "$lib/storage"

  let data = emptyTimba
  onMount(async () => {
    data = getAllTimba()
  })
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <!-- TODO: use slug -->
    <a class="button" href="dice/{slugify(set.name, { lower: true })}">{set.name}</a>
  {/each}
</div>
