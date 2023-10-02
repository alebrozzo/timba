<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { deleteDiceSet, getDiceSet } from "$lib/storage"
  import type { DiceSet } from "$lib/types"
  import SetViewer from "../diceSetViewer.svelte"

  const { slug } = $page.params

  let set: DiceSet = getDiceSet(slug)

  function handleDeleteSet() {
    deleteDiceSet(set.name)
    goto("/dice")
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<h2>{set.name}</h2>

<h3>SET</h3>

{#each set.dice as dice}
  <SetViewer {dice} />
{/each}

<div><button type="button" on:click={handleDeleteSet}>Delete</button></div>
