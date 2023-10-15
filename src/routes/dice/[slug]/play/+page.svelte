<script lang="ts">
  import Button, { Label } from "@smui/button"
  import Tab, { Label as TabLabel } from "@smui/tab"
  import TabBar from "@smui/tab-bar"
  import { tick } from "svelte"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { rollDice, type RollResult } from "$lib/diceLogic"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"

  const { slug } = $page.params
  const set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("PLAY set not found")
    goto("/oops")
  }

  let allRolls = [rollDice(set)]
  let active = allRolls[0]

  function startOver(): void {
    allRolls = []
    addNewRoll()
  }

  async function addNewRoll() {
    allRolls = [...allRolls, rollDice(set)]
    await tick()
    active = allRolls[allRolls.length - 1]
  }

  function getDieName(dieType: RollResult["dieType"]) {
    return !dieType.name ? "Die with " + dieType.faces + " faces" : dieType.name
  }

  function getSingleDieSingleResultValue(roll: RollResult) {
    const dieName = getDieName(roll.dieType)
    const rolledValue = roll.results[0].rolledValue
    return dieName + " rolled a " + rolledValue
  }
</script>

<div class="display-vertical button-container gallery">
  <Button variant="outlined" on:click={addNewRoll}>
    <Label>Roll again</Label>
  </Button>
  <Button variant="outlined" on:click={startOver}>
    <Label>Start over</Label>
  </Button>
</div>

<TabBar tabs={allRolls} let:tab bind:active>
  <Tab {tab} minWidth>
    <TabLabel>Roll #{allRolls.indexOf(tab) + 1}</TabLabel>
  </Tab>
</TabBar>

{#each active as dieResult}
  {#if dieResult.results.length === 1}
    <p>
      {getSingleDieSingleResultValue(dieResult)}
    </p>
  {:else}
    <p>{getDieName(dieResult.dieType)} rolled</p>
    <ul>
      {#each dieResult.results as die}
        <li>#{die.dieIndex}: &nbsp;&nbsp;&nbsp;{die.rolledValue}</li>
      {/each}
    </ul>
  {/if}
{/each}
