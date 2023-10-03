<script lang="ts">
  import { addDieType, deleteDieType } from "$lib/diceUtils"
  import type { DiceSet } from "$lib/types"
  import DiceTypeEditor from "./diceTypeEditor.svelte"

  export let set: DiceSet
</script>

{#each set.dice as dice}
  <DiceTypeEditor bind:dice handleDeleteType={() => (set = deleteDieType(set, dice.type))} />
{/each}

<button type="button" on:click={() => (set = addDieType(set))}>Add die type</button>
