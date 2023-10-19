<script lang="ts">
  import "../global.css"
  import Tab, { Icon, Label } from "@smui/tab"
  import TabBar from "@smui/tab-bar"
  import { goto } from "$app/navigation"
  import { diceSetStore } from "$lib/stores/diceStore"
  import type { PageData } from "./dice/$types"

  type TabEntry = {
    k: number
    icon: string
    label: string
    url?: string
  }

  export let data: PageData
  $: {
    diceSetStore.set(data.diceSets)
  }

  let tabs: TabEntry[] = [
    {
      k: 1,
      icon: "🎲",
      label: "Dice",
      url: "/dice",
    },
    {
      k: 2,
      icon: "♠",
      label: "Cards",
    },
    {
      k: 3,
      icon: "🔢",
      label: "Numbers",
    },
  ]
  let active = tabs[0]

  function handleClick(url: string) {
    goto(url)
  }
</script>

<TabBar {tabs} let:tab bind:active>
  <Tab {tab} stacked tabIndicator$transition="fade" on:click={() => handleClick(tab.url ?? "/")} disabled={!tab.url}>
    <Icon class="material-icons">{tab.icon}</Icon>
    <Label>{tab.label}</Label>
  </Tab>
</TabBar>

<main>
  <slot />
</main>
