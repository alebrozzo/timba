<script lang="ts">
  import IconButton from "@smui/icon-button"
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar"
  import { tick } from "svelte"
  import { goto, invalidate } from "$app/navigation"
  import { LoadDepends } from "$lib/const"
  import { saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import { getNewSet } from "$lib/utils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  let toast: Snackbar
  let toastMessage: string = ""

  let set: DiceSet = getNewSet()

  async function handleSaveSet(e: CustomEvent<{ diceSet: DiceSet }>) {
    set = { ...e.detail.diceSet }
    const saveResult = await saveDiceSet(set)
    if (!saveResult) {
      toastMessage = "Oops! Something went wrong but I'm not sure what! Please try again later."
      toast.open()
      return
    }

    await invalidate(LoadDepends.DiceSets)
    await tick()
    goto("/dice")
  }
</script>

<DiceSetEditor
  set={structuredClone(set)}
  on:DiceSetCancelEdit={() => goto("/dice")}
  on:DiceSetSaveEdit={handleSaveSet}
/>

<Snackbar bind:this={toast} class="snackbar-error">
  <SnackLabel>{toastMessage}</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
