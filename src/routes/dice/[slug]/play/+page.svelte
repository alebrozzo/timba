<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { rollDice } from "$lib/diceLogic"
  import { getDiceSetBySlug } from "$lib/stores/diceStore"

  const { slug } = $page.params
  const set = getDiceSetBySlug(slug)!
  if (!set) {
    console.log("PLAY set not found")
    goto("/oops")
  }

  let allRolls = [rollDice(set)]
</script>

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="../">Back</a>
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

<button
  type="button"
  on:click={() => {
    allRolls = [...allRolls, rollDice(set)]
  }}>Roll again!</button
>
