<script lang="ts">
  import Button, { Label } from "@smui/button"
  import type { PageData } from "./$types"

  export let data: PageData
</script>

<div class="display-vertical button-container gallery">
  <Button href="dice/new" variant="raised">
    <Label>New</Label>
  </Button>

  {#each data.diceSets as set}
    <Button href="dice/{set.slug || set.id}" variant="outlined">
      <Label>{set.name}</Label>
    </Button>
  {/each}
</div>
