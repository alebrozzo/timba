<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { deleteDiceSet, getDiceSet } from "$lib/storage"
  import type { DiceSet } from "$lib/types"
  import DiceSetEditorContainer from "./diceSetEditorContainer.svelte"
  import DiceSetViewerContainer from "./diceSetViewerContainer.svelte"

  const { slug } = $page.params

  let set: DiceSet = getDiceSet(slug)

  let isEditMode = false

  function handleDeleteSet() {
    deleteDiceSet(set.name)
    goto("/dice")
  }

  function handleEditingStatusChange(e: CustomEvent<{ isEditing: boolean }>) {
    isEditMode = e.detail.isEditing
  }
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<h2>{set.name}</h2>

<h3>SET</h3>

{#if isEditMode}
  <DiceSetEditorContainer {set} on:DiceEditModeChanged={handleEditingStatusChange} />
{:else}
  <DiceSetViewerContainer
    {set}
    on:DiceSetDeleted={handleDeleteSet}
    on:DiceEditModeChanged={handleEditingStatusChange}
  />
{/if}
