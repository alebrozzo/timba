<script lang="ts">
  import type { Die } from "$lib/types"

  export let dice: {
    type: Die
    count: number
  }
</script>

<div class="display-vertical editor-container">
  <p>Cantidad:{dice.count}</p>
  <p>Caras:{dice.type.faces}</p>
  <p>Nombre:{dice.type.name ?? ""}</p>
</div>
