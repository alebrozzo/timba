<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import {
    DICE_SET_DIE_TYPE_ADD_EVENT,
    DICE_SET_DIE_TYPE_DELETE_EVENT,
    DICE_SET_DIE_TYPE_EDIT_EVENT,
  } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"

  export let set: DiceSet

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
</script>

<table>
  <thead
    ><td>Faces</td><td>Count</td><td>Name</td><td /><td><button on:click={() => addDieType()}>Add</button></td></thead
  >
  <tbody>
    {#each set.dice as dieType}
      <tr>
        <td>{dieType.faces}</td>
        <td>{dieType.count}</td>
        <td>{dieType.name ?? ""}</td>
        <td><button on:click={() => editDieType(dieType)}>✏️</button></td>
        <td><button on:click={() => deleteDieType(dieType)}>🗑️</button></td>
      </tr>
    {/each}
  </tbody>
</table>
