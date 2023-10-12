<script lang="ts">
  import Button, { Label } from "@smui/button"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { rollDice } from "$lib/diceLogic"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"

  const { slug } = $page.params
  const set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("PLAY set not found")
    goto("/oops")
  }

  let allRolls = [rollDice(set)]
</script>

<div class="display-vertical button-container gallery">
  <Button
    variant="outlined"
    on:click={() => {
      allRolls = [...allRolls, rollDice(set)]
    }}
  >
    <Label>Roll again</Label>
  </Button>
  <Button
    variant="outlined"
    on:click={() => {
      allRolls = [rollDice(set)]
    }}
  >
    <Label>Start over</Label>
  </Button>
</div>

<h2>Roll results:</h2>

{#each allRolls as roll}
  <hr />
  Roll #{allRolls.indexOf(roll) + 1}
  {#each roll as dieResult}
    <p>Die: {dieResult.dieType.name ?? dieResult.dieType.faces + " faces"}</p>
    {#each dieResult.results as die}
      <p>#{die.dieIndex}: {die.rolledValue}</p>
    {/each}
  {/each}
{/each}
