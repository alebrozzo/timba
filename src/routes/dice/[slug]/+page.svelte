<script lang="ts">
  import Button, { Label } from "@smui/button"
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { deleteDiceSet, saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import DiceSetEditor from "../diceSetEditor.svelte"
  import DiceSetViewer from "../diceSetViewer.svelte"

  const { slug } = $page.params

  let isEditingMode = false

  let set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("#############set not found")
    // TODO: refresh does not work
    //goto("/oops")
  }

  async function handleSaveSet(e: CustomEvent<{ diceSet: DiceSet }>) {
    set = { ...e.detail.diceSet }

    const saveResult = await saveDiceSet(set)
    if (saveResult) {
      diceSetStore.set(saveResult)
      isEditingMode = false
    }

    // TODO: error toast
  }

  async function handleDeleteSet(setId: NonNullable<DiceSet["id"]>) {
    const deleteResult = await deleteDiceSet(setId)
    if (deleteResult) {
      diceSetStore.set(deleteResult)
      goto("/dice")
    }
    // TODO: error toast
  }

  $: {
    console.log("updated set!", set)
  }
</script>

{#if !isEditingMode}
  <div class="display-vertical button-container gallery">
    <Button href="{set.slug || set.id}/play" variant="outlined">
      <Label>Roll!</Label>
    </Button>
  </div>
  <DiceSetViewer
    {set}
    on:DiceSetStartEdit={() => (isEditingMode = true)}
    on:DiceSetDeleted={async () => handleDeleteSet(set.id ?? "")}
  />
{:else}
  <DiceSetEditor
    set={structuredClone(set)}
    on:DiceSetCancelEdit={() => (isEditingMode = false)}
    on:DiceSetSaveEdit={handleSaveSet}
  />
{/if}
