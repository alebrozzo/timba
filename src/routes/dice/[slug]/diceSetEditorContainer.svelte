<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { saveDiceSet } from "$lib/stores/diceStore"
  import type { DiceSet } from "$lib/types"
  import { DICE_EDIT_MODE_CHANGE_EVENT } from "../../../lib/diceUtils"
  import DiceSetEditor from "../diceSetEditor.svelte"

  export let set: DiceSet

  const dispatch = createEventDispatcher()
  let editingSet = structuredClone(set)

  function closeEditor() {
    dispatch(DICE_EDIT_MODE_CHANGE_EVENT, { isEditing: false })
  }
</script>

<DiceSetEditor bind:set={editingSet} />
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
    on:click={async () => {
      const saveResult = await saveDiceSet(editingSet)
      if (saveResult) {
        set = editingSet
        closeEditor()
      }
    }}>Save</button
  >
</div>
