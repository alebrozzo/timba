<script lang="ts">
  import Button, { Label } from "@smui/button"
  import { createEventDispatcher } from "svelte"
  import { DICE_SET_DELETE_EVENT, DICE_SET_START_EDIT_EVENT } from "$lib/diceUtils"
  import type { DiceSet } from "$lib/types"
  import DieTypeList from "./dieTypeList.svelte"

  export let set: DiceSet

  const dispatch = createEventDispatcher()

  function handleEditClick() {
    dispatch(DICE_SET_START_EDIT_EVENT)
  }

  function handleDeleteClick() {
    dispatch(DICE_SET_DELETE_EVENT)
  }
</script>

<h1>{set.name}</h1>

<h2>Dice Types:</h2>

<DieTypeList {set} />

<div class="display-vertical button-container gallery">
  <Button variant="raised" on:click={handleEditClick}>
    <Label>Edit</Label>
  </Button>
  <Button variant="raised" on:click={handleDeleteClick}>
    <Label>Delete</Label>
  </Button>
</div>

<style>
  h1 {
    text-align: center;
  }
</style>
