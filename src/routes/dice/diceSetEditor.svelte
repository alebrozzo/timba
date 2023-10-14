<script lang="ts">
  import Button, { Label } from "@smui/button"
  import IconButton from "@smui/icon-button"
  import Snackbar, { Actions, Label as SnackLabel } from "@smui/snackbar"
  import Textfield from "@smui/textfield"
  import { createEventDispatcher } from "svelte"
  import { validateDie } from "$lib/diceLogic"
  import { DICE_SET_CANCEL_EDIT_EVENT, DICE_SET_SAVE_EDIT_EVENT, getDefaultDie } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"
  import DieTypeEditor from "./dieTypeEditor.svelte"
  import DieTypeList from "./dieTypeList.svelte"

  export let set: DiceSet
  let editingSet: DiceSet = structuredClone(set)
  let editingDieType: DieType | null

  let toast: Snackbar
  let toastMessage: string = ""

  function handleDiceSetDieTypeSave(e: CustomEvent<{ dieType: DieType }>) {
    const receivedDieType = e.detail.dieType
    const errors = validateDie(receivedDieType)
    if (errors.length > 0) {
      console.error(errors)
      toastMessage = errors.join(". ")
      toast.open()
      return
    }

    const editedDieType = editingSet.dice.find((d) => d.id === receivedDieType.id)
    if (editedDieType) {
      editedDieType.faces = receivedDieType.faces
      editedDieType.count = receivedDieType.count
      editedDieType.name = receivedDieType.name
    } else {
      editingSet.dice.push(receivedDieType)
    }
    editingSet = structuredClone(editingSet)
    editingDieType = null
  }

  function handleDiceSetDieTypeDelete(e: CustomEvent<{ dieType: DieType }>) {
    editingSet.dice = editingSet.dice.filter((d) => d.id !== e.detail.dieType.id)
  }

  function handleDiceSetDieTypeAdd() {
    editingDieType = { ...getDefaultDie(), id: editingSet.dice.length.toString() }
  }

  function handleDiceSetDieTypeEdit(e: CustomEvent<{ dieType: DieType }>) {
    editingDieType = e.detail.dieType
  }

  const dispatch = createEventDispatcher()

  function handleSaveClick() {
    const errors = editingSet.dice.flatMap(validateDie)
    if (errors.length > 0) {
      console.error(errors)
      toastMessage = errors.join(". ")
      toast.open()
      return
    }

    dispatch(DICE_SET_SAVE_EDIT_EVENT, { diceSet: editingSet })
  }

  function handleCancelClick() {
    dispatch(DICE_SET_CANCEL_EDIT_EVENT)
  }

  function handleDieTypeCancel() {
    editingDieType = null
  }
</script>

<Textfield bind:value={editingSet.name} label="Die set name" required />

<DieTypeList
  showEditMode
  set={editingSet}
  on:DiceSetDieTypeAdd={handleDiceSetDieTypeAdd}
  on:DiceSetDieTypeEdit={handleDiceSetDieTypeEdit}
  on:DiceSetDieTypeDelete={handleDiceSetDieTypeDelete}
/>

{#if editingDieType}
  <DieTypeEditor
    dieType={editingDieType}
    on:DiceSetDieTypeSave={handleDiceSetDieTypeSave}
    on:DiceSetDieTypeCancel={handleDieTypeCancel}
  />
{/if}

<div class="display-vertical button-container gallery">
  <Button variant="raised" on:click={handleSaveClick}>
    <Label>Save</Label>
  </Button>
  <Button variant="raised" on:click={handleCancelClick}>
    <Label>Cancel</Label>
  </Button>
</div>

<Snackbar bind:this={toast} class="snackbar-error">
  <SnackLabel>{toastMessage}</SnackLabel>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>
