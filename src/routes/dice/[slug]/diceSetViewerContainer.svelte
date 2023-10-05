<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { DICE_EDIT_MODE_CHANGE_EVENT, DICE_SET_DELETE_EVENT } from "$lib/diceUtils"
  import type { DiceSet } from "$lib/types"
  import { getSlug } from "$lib/utils"
  import DieTypeViewer from "../dieTypeViewer.svelte"

  const dispatch = createEventDispatcher()
  export let set: DiceSet

  function handleDeleteSet() {
    dispatch(DICE_SET_DELETE_EVENT)
  }

  function handleEditSet() {
    dispatch(DICE_EDIT_MODE_CHANGE_EVENT, { isEditing: true })
  }
</script>

<div><a class="button" href="{getSlug(set.name)}/play">Roll!</a></div>

{#each set.dice as dice}
  <DieTypeViewer {dice} />
{/each}

<div><button type="button" on:click={handleEditSet}>Edit</button></div>
<div><button type="button" on:click={handleDeleteSet}>Delete</button></div>
