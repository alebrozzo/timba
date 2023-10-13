<script lang="ts">
  import Button, { Label } from "@smui/button"
  import IconButton from "@smui/icon-button"
  import { createEventDispatcher } from "svelte"
  import {
    DICE_SET_DIE_TYPE_ADD_EVENT,
    DICE_SET_DIE_TYPE_DELETE_EVENT,
    DICE_SET_DIE_TYPE_EDIT_EVENT,
  } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"

  export let set: DiceSet
  export let showEditMode = false

  const diceHaveNames = set.dice.some((d) => !!d.name)

  const dispatch = createEventDispatcher()

  function addDieType() {
    dispatch(DICE_SET_DIE_TYPE_ADD_EVENT)
  }

  function editDieType(dieType: DieType) {
    dispatch(DICE_SET_DIE_TYPE_EDIT_EVENT, { dieType })
  }

  function deleteDieType(dieType: DieType) {
    dispatch(DICE_SET_DIE_TYPE_DELETE_EVENT, { dieType })
  }

  function getClass() {
    return showEditMode ? "" : "hidden"
  }
</script>

<table>
  <thead>
    <tr>
      <th>Faces</th><th>Count</th><th class={diceHaveNames ? "" : "hidden"}>Name</th>
      <th colspan="2" class={getClass()}>
        <Button variant="raised" on:click={() => addDieType()}>
          <Label class="timba-small-button">Add die type</Label>
        </Button>
      </th>
    </tr>
  </thead>
  <tbody>
    {#each set.dice as dieType}
      <tr>
        <td class="center">{dieType.faces}</td>
        <td class="center">{dieType.count}</td>
        <td class={diceHaveNames ? "" : "hidden"}>{dieType.name ?? ""}</td>
        <td class={getClass()}>
          <div class="table-button-container">
            <IconButton class="material-icons" on:click={() => editDieType(dieType)}>edit</IconButton>
          </div>
        </td>
        <td class={getClass()}>
          <div class="table-button-container">
            <IconButton class="material-icons" on:click={() => deleteDieType(dieType)}>delete</IconButton>
          </div>
        </td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .hidden {
    display: none;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th,
  td {
    padding: 0.5rem;
  }

  .center {
    text-align: center;
  }

  .table-button-container {
    display: flex;
    justify-content: center;
  }
</style>
