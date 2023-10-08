<script lang="ts">
  import { onMount } from "svelte"
  import { diceSetStore } from "$lib/stores/diceStore"
  import type { PageData } from "./$types"

  export let data: PageData
  onMount(() => {
    diceSetStore.set(data.diceSets)
  })
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="dice/new">New</a>

  {#each data.diceSets as set}
    <a class="button" href="dice/{set.slug}">{set.name}</a>
  {/each}
</div>
