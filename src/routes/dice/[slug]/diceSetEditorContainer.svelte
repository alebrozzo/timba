<script lang="ts">
  import type { DiceSet } from "$lib/types"
  import { createEventDispatcher } from "svelte"
  import { DICE_EDIT_MODE_CHANGE_EVENT, deleteDieType } from "../../../lib/diceUtils"
  import DiceSetEditor from "../diceSetEditor.svelte"
  import { saveDiceSet } from "$lib/storage"

  export let set: DiceSet

  const dispatch = createEventDispatcher()
  let editingSet = structuredClone(set)

  function closeEditor() {
    dispatch(DICE_EDIT_MODE_CHANGE_EVENT, { isEditing: false })
  }
</script>

{#each editingSet.dice as dice}
  <DiceSetEditor {dice} handleDeleteType={() => (editingSet = deleteDieType(editingSet, dice.type))} />
{/each}

<div>
  <button
    type="button"
    on:click={() => {
      closeEditor()
    }}>Cancel</button
  >
</div>
<div>
  <button
    type="button"
    on:click={() => {
      const errors = saveDiceSet(editingSet)

      if (errors.length > 0) {
        console.log(errors)
        // TODO: toast errors
        return
      }

      set = editingSet
      closeEditor()
    }}>Save</button
  >
</div>
