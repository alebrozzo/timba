<script lang="ts">
  import Button, { Label } from "@smui/button"
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
  <HelperText persistent slot="helper">How many faces per die?</HelperText>
</Textfield>
<Textfield label="Count" type="number" required bind:value={dieType.count}>
  <HelperText persistent slot="helper">How many dice of this type?</HelperText>
</Textfield>
<Textfield label="Name" input$maxlength={15} bind:value={dieType.name}>
  <HelperText persistent slot="helper">Optionally add a name for this die type</HelperText>
</Textfield>

<div class="minor-button-box" style="margin-top: 1rem;">
  <Button variant="raised" on:click={() => saveDieType(dieType)}>
    <Label class="timba-small-button">Save die type</Label>
  </Button>
  <Button variant="raised" on:click={() => saveDieType(dieType)}>
    <Label class="timba-small-button">Cancel</Label>
  </Button>
</div>

<style>
  .minor-button-box {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }
</style>
