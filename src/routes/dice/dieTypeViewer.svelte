<script lang="ts">
  import type { DieType } from "$lib/types"

  export let dieType: DieType
</script>

<div class="display-vertical editor-container">
  <p>Cantidad:{dieType.count}</p>
  <p>Caras:{dieType.faces}</p>
  <p>Nombre:{dieType.name ?? ""}</p>
</div>
