<script lang="ts">
  import { getDefaultDie } from "$lib/diceUtils"
  import type { DiceSet, DieType } from "$lib/types"
  import DieTypeEditor from "./dieTypeEditor.svelte"
  import DieTypeList from "./dieTypeList.svelte"

  export let set: DiceSet
  let editingDieType: DieType | null

  function handleDiceSetDieTypeSave(e: CustomEvent<{ dieType: DieType }>) {
    const editedDieType = set.dice.find((d) => d.id === e.detail.dieType.id)
    if (editedDieType) {
      editedDieType.faces = e.detail.dieType.faces
      editedDieType.count = e.detail.dieType.count
      editedDieType.name = e.detail.dieType.name
    } else {
      set.dice.push(e.detail.dieType)
    }
    set = { ...set }
    editingDieType = null
  }

  function handleDiceSetDieTypeAdd() {
    editingDieType = { ...getDefaultDie(), id: set.dice.length.toString() }
  }

  function handleDiceSetDieTypeEdit(e: CustomEvent<{ dieType: DieType }>) {
    //editingDieType = set.dice.filter((d) => d.id === e.detail.dieType.id)
    editingDieType = e.detail.dieType
  }

  function handleDiceSetDieTypeDelete(e: CustomEvent<{ dieType: DieType }>) {
    set.dice = set.dice.filter((d) => d.id !== e.detail.dieType.id)
    set = { ...set }
  }

  $: {
    console.log("updated set!", set)
  }
</script>

<label>Dice set name:<input type="text" maxlength="30" bind:value={set.name} /></label>

<h2>Dice:</h2>

<DieTypeList
  {set}
  on:DiceSetDieTypeAdd={handleDiceSetDieTypeAdd}
  on:DiceSetDieTypeEdit={handleDiceSetDieTypeEdit}
  on:DiceSetDieTypeDelete={handleDiceSetDieTypeDelete}
/>
{#if editingDieType}
  <DieTypeEditor dieType={editingDieType} on:DiceSetDieTypeSave={handleDiceSetDieTypeSave} />
{/if}
