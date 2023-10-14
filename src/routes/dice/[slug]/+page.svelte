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
  let toast: Snackbar
  let toastMessage: string = ""

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
      toastMessage = "Oops! Something went wrong but I'm not sure what! Please try again later."
      toast.open()
      return
    }

    diceSetStore.set(saveResult)
    isEditingMode = false
  }

  async function handleDeleteSet(setId: NonNullable<DiceSet["id"]>) {
    const deleteResult = await deleteDiceSet(setId)
    if (!deleteResult) {
      toastMessage = "Oops! Something went wrong but I'm not sure what! Please try again later."
      toast.open()
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
  <DiceSetViewer
    {set}
    on:DiceSetStartEdit={() => (isEditingMode = true)}
    on:DiceSetDeleted={async () => handleDeleteSet(set.id ?? "")}
  />
{:else}
  <DiceSetEditor
    set={structuredClone(set)}
    on:DiceSetCancelEdit={() => (isEditingMode = false)}
    on:DiceSetSaveEdit={handleSaveSet}
  />
{/if}

<Snackbar bind:this={toast} class="snackbar-error">
  <SnackLabel>{toastMessage}</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
