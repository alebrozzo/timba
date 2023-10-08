<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { deleteDiceSet } from "$lib/stores/supabase"
  import DiceSetEditorContainer from "./diceSetEditorContainer.svelte"
  import DiceSetViewerContainer from "./diceSetViewerContainer.svelte"

  const { slug } = $page.params

  let set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("#############set not found")
    // TODO: refresh does not work
    //goto("/oops")
  }

  let isEditMode = false

  function handleDeleteSet() {
    deleteDiceSet(set.id!)
    goto("/dice")
  }

  function handleEditingStatusChange(e: CustomEvent<{ isEditing: boolean }>) {
    isEditMode = e.detail.isEditing
  }

  $: {
    console.log("updated set!", set)
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<h2>{set.name}</h2>

<h3>Dice:</h3>

{#if isEditMode}
  <DiceSetEditorContainer bind:set on:DiceEditModeChanged={handleEditingStatusChange} />
{:else}
  <DiceSetViewerContainer
    {set}
    on:DiceSetDeleted={handleDeleteSet}
    on:DiceEditModeChanged={handleEditingStatusChange}
  />
{/if}
