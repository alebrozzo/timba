<script lang="ts">
  import Button, { Label } from "@smui/button"
  import IconButton from "@smui/icon-button"
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { deleteDiceSet, saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import DiceSetEditor from "../diceSetEditor.svelte"
  import DiceSetViewer from "../diceSetViewer.svelte"

  const { slug } = $page.params

  let isEditingMode = false
  let errorToast: Snackbar
  let errorToastMessage: string = ""
  let confirmToast: Snackbar
  let confirmToastMessage: string = ""

  let set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("#############set not found")
    // TODO: refresh does not work
    //goto("/oops")
  }

  async function handleSaveSet(e: CustomEvent<{ diceSet: DiceSet }>) {
    set = { ...e.detail.diceSet }

    const saveResult = await saveDiceSet(set)
    if (!saveResult) {
      errorToastMessage = "Oops! Something went wrong but I'm not sure what! Please try again later."
      errorToast.open()
      return
    }

    diceSetStore.set(saveResult)
    isEditingMode = false
  }

  function handleDeleteSet() {
    // show toast confirmation
    confirmToastMessage = `Are you sure you want to delete ${set.name}?`
    confirmToast.open()
  }

  async function handleDeleteConfirmed(e: CustomEvent<{ reason: string | undefined }>) {
    const deleteResult = await deleteDiceSet(set.id!)
    if (!deleteResult) {
      errorToastMessage = "Oops! Something went wrong but I'm not sure what! Please try again later."
      errorToast.open()
      return
    }

    diceSetStore.set(deleteResult)
    goto("/dice")
  }

  $: {
    console.log("updated set!", set)
  }
</script>

{#if !isEditingMode}
  <div class="display-vertical button-container gallery">
    <Button href="{set.slug || set.id}/play" variant="outlined">
      <Label>Roll!</Label>
    </Button>
  </div>
  <DiceSetViewer {set} on:DiceSetStartEdit={() => (isEditingMode = true)} on:DiceSetDeleted={handleDeleteSet} />
{:else}
  <DiceSetEditor
    set={structuredClone(set)}
    on:DiceSetCancelEdit={() => (isEditingMode = false)}
    on:DiceSetSaveEdit={handleSaveSet}
  />
{/if}

<Snackbar bind:this={errorToast} class="snackbar-error">
  <SnackLabel>{errorToastMessage}</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<Snackbar variant="stacked" class="snackbar-warning" bind:this={confirmToast}>
  <SnackLabel>{confirmToastMessage}</SnackLabel>
  <Actions>
    <Button on:click={handleDeleteConfirmed}>Accept</Button>
    <Button>Cancel</Button>
  </Actions>
</Snackbar>
