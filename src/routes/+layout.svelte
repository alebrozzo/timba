<script lang="ts">
  import "../global.css"
  import Tab, { Icon, Label } from "@smui/tab"
  import TabBar from "@smui/tab-bar"
  import { goto } from "$app/navigation"
  import { base } from "$app/paths"

  export const prerender = true

  type TabEntry = {
    k: number
    icon: string
    label: string
    url?: string
  }
  const key = (tab: TabEntry) => tab.k

  let tabs: TabEntry[] = [
    {
      k: 1,
      icon: "🎲",
      label: "Dice",
      url: `${base}/dice`,
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

<TabBar {tabs} let:tab {key} bind:active>
  <Tab
    {tab}
    stacked
    tabIndicator$transition="fade"
    on:click={() => (tab.url ? handleClick(tab.url) : null)}
    disabled={!tab.url}
  >
    <Icon class="material-icons">{tab.icon}</Icon>
    <Label>{tab.label}</Label>
  </Tab>
</TabBar>

<main>
  <slot />
</main>
