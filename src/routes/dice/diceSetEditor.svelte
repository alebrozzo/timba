<script lang="ts">
  import { addDieType, deleteDieType } from "$lib/diceUtils"
  import type { DiceSet } from "$lib/types"
  import DieTypeEditor from "./dieTypeEditor.svelte"

  export let set: DiceSet
</script>

{#each set.dice as dice}
  <DieTypeEditor bind:dice handleDeleteType={() => (set = deleteDieType(set, dice.type))} />
{/each}

<button type="button" on:click={() => (set = addDieType(set))}>Add die type</button>
