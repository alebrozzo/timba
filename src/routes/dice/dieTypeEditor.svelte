<script lang="ts">
  import Textfield from "@smui/textfield"
  import HelperText from "@smui/textfield/helper-text"
  import { createEventDispatcher } from "svelte"
  import { DICE_SET_DIE_TYPE_SAVE_EVENT } from "$lib/diceUtils"
  import type { DieType } from "$lib/types"

  export let dieType: DieType

  const dispatch = createEventDispatcher()
  function saveDieType(dieType: DieType) {
    dispatch(DICE_SET_DIE_TYPE_SAVE_EVENT, { dieType })
  }
</script>

<Textfield label="Faces" type="number" required bind:value={dieType.faces}>
  <HelperText>How many faces per die?</HelperText>
</Textfield>
<Textfield label="Count" type="number" required bind:value={dieType.count}>
  <HelperText>How many dice of this type?</HelperText>
</Textfield>
<Textfield label="Name" input$maxlength={15} bind:value={dieType.name}>
  <HelperText>Optionally add a name for this die type</HelperText>
</Textfield>

<div class="display-vertical editor-container">
  <button type="button" on:click={() => saveDieType(dieType)}>Save die type</button>
</div>
