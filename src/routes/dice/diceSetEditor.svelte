<script lang="ts">
  import Button, { Label } from "@smui/button"
  import Textfield from "@smui/textfield"
  import { createEventDispatcher } from "svelte"
  import { DICE_SET_CANCEL_EDIT_EVENT, DICE_SET_SAVE_EDIT_EVENT, getDefaultDie } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"
  import DieTypeEditor from "./dieTypeEditor.svelte"
  import DieTypeList from "./dieTypeList.svelte"

  export let set: DiceSet
  let editingDieType: DieType | null

  function handleDiceSetDieTypeSave(e: CustomEvent<{ dieType: DieType }>) {
    const editedDieType = set.dice.find((d) => d.id === e.detail.dieType.id)
    if (editedDieType) {
      editedDieType.faces = e.detail.dieType.faces
      editedDieType.count = e.detail.dieType.count
      editedDieType.name = e.detail.dieType.name
    } else {
      set.dice.push(e.detail.dieType)
    }
    set = { ...set }
    editingDieType = null
  }

  function handleDiceSetDieTypeAdd() {
    editingDieType = { ...getDefaultDie(), id: set.dice.length.toString() }
  }

  function handleDiceSetDieTypeEdit(e: CustomEvent<{ dieType: DieType }>) {
    //editingDieType = set.dice.filter((d) => d.id === e.detail.dieType.id)
    editingDieType = e.detail.dieType
  }

  function handleDiceSetDieTypeDelete(e: CustomEvent<{ dieType: DieType }>) {
    set.dice = set.dice.filter((d) => d.id !== e.detail.dieType.id)
    set = { ...set }
  }

  const dispatch = createEventDispatcher()

  function handleSaveClick() {
    dispatch(DICE_SET_SAVE_EDIT_EVENT, { diceSet: set })
  }

  function handleCancelClick() {
    dispatch(DICE_SET_CANCEL_EDIT_EVENT)
  }
</script>

<Textfield bind:value={set.name} label="Die set name" required />

<DieTypeList
  showEditMode
  {set}
  on:DiceSetDieTypeAdd={handleDiceSetDieTypeAdd}
  on:DiceSetDieTypeEdit={handleDiceSetDieTypeEdit}
  on:DiceSetDieTypeDelete={handleDiceSetDieTypeDelete}
/>

{#if editingDieType}
  <DieTypeEditor dieType={editingDieType} on:DiceSetDieTypeSave={handleDiceSetDieTypeSave} />
{/if}

<div class="display-vertical button-container gallery">
  <Button variant="raised" on:click={handleSaveClick}>
    <Label>Save</Label>
  </Button>
  <Button variant="raised" on:click={handleCancelClick}>
    <Label>Cancel</Label>
  </Button>
</div>
