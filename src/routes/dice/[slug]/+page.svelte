<script lang="ts">
  import { goto } from "$app/navigation"
  import { page } from "$app/stores"
  import { getDiceSetBySlug } from "$lib/diceUtils"
  import { diceSetStore } from "$lib/stores/diceStore"
  import { deleteDiceSet, saveDiceSet } from "$lib/stores/firestore"
  import type { DiceSet } from "$lib/types"
  import DiceSetEditor from "../diceSetEditor.svelte"

  const { slug } = $page.params

  let set = getDiceSetBySlug($diceSetStore, slug)!
  if (!set) {
    console.log("#############set not found")
    // TODO: refresh does not work
    //goto("/oops")
  }

  async function handleSaveSet(set: DiceSet) {
    const saveResult = await saveDiceSet(set)
    if (saveResult) {
      diceSetStore.set(saveResult)
      goto("/dice")
      // TODO: redirect to slug page
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

<div class="button-container">
  <a class="button" href="/">Home</a>
  <a class="button" href="/dice">Back</a>
</div>

<DiceSetEditor bind:set />

<div><button type="button" on:click={async () => handleSaveSet(set)}>Save</button></div>
<div><button type="button" on:click={async () => handleDeleteSet(set.id ?? "")}>Delete</button></div>

<div><a class="button" href="{set.slug || set.id}/play">Roll!</a></div>
