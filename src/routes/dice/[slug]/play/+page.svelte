<script lang="ts">
  import Button, { Label } from "@smui/button"
  import Tab, { Label as TabLabel } from "@smui/tab"
  import TabBar from "@smui/tab-bar"
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
  let active = allRolls[0]

  const markNewAsActive = () => {
    setTimeout(() => {
      active = allRolls[allRolls.length - 1]
    })
  }
</script>

<div class="display-vertical button-container gallery">
  <Button
    variant="outlined"
    on:click={() => {
      allRolls = [...allRolls, rollDice(set)]
      markNewAsActive()
    }}
  >
    <Label>Roll again</Label>
  </Button>
  <Button
    variant="outlined"
    on:click={() => {
      allRolls = [rollDice(set)]
      markNewAsActive()
    }}
  >
    <Label>Start over</Label>
  </Button>
</div>

<TabBar tabs={allRolls} let:tab bind:active>
  <Tab {tab} minWidth>
    <TabLabel>Roll #{allRolls.indexOf(tab)}</TabLabel>
  </Tab>
</TabBar>

{#each active as dieResult}
  <p>Die: {dieResult.dieType.name ?? dieResult.dieType.faces + " faces"}</p>
  {#each dieResult.results as die}
    <p>#{die.dieIndex}: {die.rolledValue}</p>
  {/each}
{/each}
