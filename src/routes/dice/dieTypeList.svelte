<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import {
    DICE_SET_DIE_TYPE_ADD_EVENT,
    DICE_SET_DIE_TYPE_DELETE_EVENT,
    DICE_SET_DIE_TYPE_EDIT_EVENT,
  } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"

  export let set: DiceSet
  export let showEditMode = false

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
    return showEditMode ? "" : "readOnly"
  }
</script>

<table>
  <thead>
    <tr>
      <td>Faces</td><td>Count</td><td>Name</td><td class={getClass()} />
      <td class={getClass()}><button on:click={() => addDieType()}>Add</button></td>
    </tr>
  </thead>
  <tbody>
    {#each set.dice as dieType}
      <tr>
        <td>{dieType.faces}</td>
        <td>{dieType.count}</td>
        <td>{dieType.name ?? ""}</td>
        <td class={getClass()}><button on:click={() => editDieType(dieType)}>✏️</button></td>
        <td class={getClass()}><button on:click={() => deleteDieType(dieType)}>🗑️</button></td>
      </tr>
    {/each}
  </tbody>
</table>

<style>
  .readOnly {
    display: none;
  }
</style>
