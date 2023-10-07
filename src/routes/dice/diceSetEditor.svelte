<script lang="ts">
  import { addDieType, deleteDieType } from "$lib/diceUtils"
  import type { DiceSet } from "$lib/types"
  import DieTypeEditor from "./dieTypeEditor.svelte"

  export let set: DiceSet
</script>

{#each set.dice as dieType}
  <DieTypeEditor bind:dieType handleDeleteType={() => (set = deleteDieType(set, dieType))} />
{/each}

<button type="button" on:click={() => (set = addDieType(set))}>Add die type</button>
