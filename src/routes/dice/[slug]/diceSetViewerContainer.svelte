<script lang="ts">
  import type { DiceSet } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  import DiceSetViewer from "../diceSetViewer.svelte"
  import { DICE_EDIT_MODE_CHANGE_EVENT, DICE_SET_DELETE_EVENT } from "../../../lib/diceUtils"

  const dispatch = createEventDispatcher()
  export let set: DiceSet

  function handleDeleteSet() {
    dispatch(DICE_SET_DELETE_EVENT)
  }

  function handleEditSet() {
    dispatch(DICE_EDIT_MODE_CHANGE_EVENT, { isEditing: true })
  }
</script>

{#each set.dice as dice}
  <DiceSetViewer {dice} />
{/each}

<div><button type="button" on:click={handleEditSet}>Edit</button></div>
<div><button type="button" on:click={handleDeleteSet}>Delete</button></div>
