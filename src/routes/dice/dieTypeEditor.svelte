<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { DICE_SET_DIE_TYPE_SAVE_EVENT } from "$lib/diceUtils"
  import type { DieType } from "$lib/types"

  export let dieType: DieType

  const dispatch = createEventDispatcher()
  function saveDieType(dieType: DieType) {
    dispatch(DICE_SET_DIE_TYPE_SAVE_EVENT, { dieType })
  }
</script>

<div class="display-vertical editor-container">
  <label>Faces per die:<input type="number" min="1" bind:value={dieType.faces} /></label>
  <label>Dice count:<input type="number" min="1" bind:value={dieType.count} /></label>
  <label>Name:<input type="text" maxlength="30" placeholder="(opcional)" bind:value={dieType.name} /></label>
  <button type="button" on:click={() => saveDieType(dieType)}>Save die type</button>
</div>
